/**
 * smoke-cabi.mjs — verify the adaptive CABI walk: 110-step order, the tone-free
 * baseline window (tone silent then revived), the neuro fusion readout, and that
 * completions advance/auto-advance through a SOURCE repeat without rewinding.
 */
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = process.env.URL || 'http://localhost:5178';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);
let failures = 0;
const check = (name, ok, extra = '') => { log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  ' + extra : ''}`); if (!ok) failures++; };

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1280,720'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
await page.evaluate(() => { try { localStorage.setItem('aetheria_disclaimer_v1', '1'); localStorage.setItem('aetheria_onboarded_v1', '1'); } catch {} });
await page.reload({ waitUntil: 'networkidle2' });
await page.waitForFunction('window.aetheria !== undefined', { timeout: 30000 });
await sleep(2000);

// Reset to a non-adaptive walk first so entering CABI reliably opens a fresh
// tone-free baseline window (guards against persisted CABI state from a prior run).
await page.evaluate(() => window.aetheria.devSetWalk(0, 0));
await sleep(500);
// Jump to the adaptive CABI walk.
await page.evaluate(() => window.aetheria.devSetWalk(4, 0));
await sleep(600);
const ws = await page.evaluate(() => window.aetheria.walkState());
log('  CABI walkState:', JSON.stringify(ws));
check('walk is CABI', ws.walk === 'CABI');
check('CABI has 110 steps', ws.total === 110);
check('CABI is adaptive', ws.adaptive === true);

// Tone-free baseline: tone should be muted at CABI entry.
const mutedAtEntry = await page.evaluate(() => window.aetheria['audio'].isToneMuted);
check('tone-free baseline: tone muted on entering CABI', mutedAtEntry === true);

// After the ~12s baseline window, the tone should revive.
log('  waiting out the tone-free baseline window (~13s)…');
await sleep(13000);
const mutedAfter = await page.evaluate(() => window.aetheria['audio'].isToneMuted);
check('tone revived after baseline window', mutedAfter === false);

// Neuro fusion readout present (headless has no sensors → behaviour fallback).
const wsn = await page.evaluate(() => window.aetheria.walkState());
check('neuro readout has a source', typeof wsn.neuroSources === 'string' && wsn.neuroSources.length > 0, `sources=${wsn.neuroSources}`);
check('neuro readiness is a number 0..1', wsn.neuroReadiness >= 0 && wsn.neuroReadiness <= 1, `readiness=${wsn.neuroReadiness.toFixed(3)}`);

// SOURCE-repeat safety: jump to a CABI step that lands on SOURCE (HEART-5=idx13)
// and complete it — the step must advance forward, never rewind to an earlier
// SOURCE occurrence.
await page.evaluate(() => window.aetheria.devSetWalk(4, 81)); // step 82 (1-idx) = Ouroboros SOURCE start
await sleep(13500); // clear its baseline window too (re-entered adaptive resets? no — same walk)
const bSrc = await page.evaluate(() => window.aetheria.walkState());
await page.evaluate(() => window.aetheria.devComplete());
await sleep(400);
const aSrc = await page.evaluate(() => window.aetheria.walkState());
log('  SOURCE step before:', JSON.stringify(bSrc), 'after:', JSON.stringify(aSrc));
check('completing a SOURCE step advances forward (no rewind)', aSrc.step === bSrc.step + 1, `${bSrc.step}→${aSrc.step}`);

log(errors.length ? `\nPAGE ERRORS:\n  ${errors.slice(0, 10).join('\n  ')}` : '\nNo page errors.');
log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
await browser.close();
process.exit(failures === 0 ? 0 : 1);
