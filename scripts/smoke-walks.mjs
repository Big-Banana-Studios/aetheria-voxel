/**
 * smoke-walks.mjs — headless verification of the new systems:
 * disclaimer gate, walk progression, dose fade-out + auto-advance, and the
 * regime builds with scattered crystals. Dev server must be on :5173.
 */
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = process.env.URL || 'http://localhost:5173';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);
let failures = 0;
const check = (name, ok) => { log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}`); if (!ok) failures++; };

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1280,720'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

// Fresh state (no disclaimer/onboarding flags).
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
await page.evaluate(() => { try { localStorage.clear(); } catch {} });
await page.reload({ waitUntil: 'networkidle2' });
await page.waitForFunction('window.aetheria !== undefined', { timeout: 30000 });
await sleep(2500);

// 1. Disclaimer gate should be visible on first launch (before the welcome).
const disclaimerText = await page.evaluate(() => document.body.innerText);
check('disclaimer shows on first launch', /Before you begin/i.test(disclaimerText));
check('disclaimer is honest (not medical)', /not a medical device/i.test(disclaimerText));

// 2. Walk starts at Vortex (GUT-5 / 528 Hz = index 4).
const ws0 = await page.evaluate(() => window.aetheria.walkState());
log('  walkState@boot:', JSON.stringify(ws0));
check('starts on Vortex walk', ws0.walk === 'Vortex');
check('Vortex has 27 steps', ws0.total === 27);
check('Vortex first node is GUT-5 (index 4)', ws0.nextNode === 4);

// 3. gotoLevel across regimes builds without error (new EnvironmentBuilder).
for (const [i, name] of [[0, 'GUT'], [10, 'HEART'], [20, 'HEAD']]) {
  await page.evaluate((idx) => { try { window.aetheria.gotoLevel(idx); } catch {} }, i);
  await sleep(1500);
}
check('regime builds produced no page errors so far', errors.length === 0);

// 4. Walk indicator renders in the HUD.
const hudText = await page.evaluate(() => document.getElementById('hud')?.innerText || '');
check('HUD shows a walk indicator', /Vortex|Ascent|Pillar|Ouroboros|CABI/.test(hudText));

// 5. Dose fade-out + auto-advance: force a completion, tone should mute, walk step advances.
await page.evaluate(() => { try { window.aetheria.gotoLevel(4); } catch {} }); // GUT-5, walk step 0
await sleep(1200);
const before = await page.evaluate(() => window.aetheria.walkState());
await page.evaluate(() => window.aetheria.devComplete());
await sleep(500);
const toneMuted = await page.evaluate(() => window.aetheria['audio'].isToneMuted);
const after = await page.evaluate(() => window.aetheria.walkState());
log('  before:', JSON.stringify(before), 'after:', JSON.stringify(after));
check('tone muted on dose-met', toneMuted === true);
check('walk step advanced after completion', after.step === before.step + 1);
check('next node changed to the walk successor', after.nextNode !== before.nextNode);

// 6. Auto-advance actually loads the next node (wait past the 9s timer).
const lvlBefore = await page.evaluate(() => window.aetheria['level'].levelIndex);
log('  waiting for auto-advance (~9s)…');
await sleep(10000);
const lvlAfter = await page.evaluate(() => window.aetheria['level'].levelIndex);
const toneRevived = await page.evaluate(() => window.aetheria['audio'].isToneMuted);
log(`  level ${lvlBefore} -> ${lvlAfter}, toneMuted now ${toneRevived}`);
check('auto-advanced to a new node', lvlAfter !== lvlBefore);
check('tone revived on the next node', toneRevived === false);

log(errors.length ? `\nPAGE ERRORS:\n  ${errors.slice(0, 10).join('\n  ')}` : '\nNo page errors.');
log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
await browser.close();
process.exit(failures === 0 ? 0 : 1);
