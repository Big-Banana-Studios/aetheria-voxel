/**
 * screenshot.mjs — drive the running dev server with headless Chrome and
 * capture the three regimes + the Lo Shu cube hero view. Dev/verification only.
 *
 * Run: node scripts/screenshot.mjs   (dev server must be serving on :5173)
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'http://localhost:5173';
const OUT = 'docs/shots';
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--window-size=1280,720',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
// Wait for the game to boot.
await page.waitForFunction('window.aetheria !== undefined', { timeout: 30000 });
await sleep(2500); // first chunk mesh + render

await page.screenshot({ path: `${OUT}/01-boot-gut.png` });

const goto = async (i, name, label) => {
  await page.evaluate((idx) => { try { window.aetheria.gotoLevel(idx); } catch (e) { /* pointer-lock in headless */ } }, i);
  await sleep(2500); // worker meshing + render
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`  shot ${name} (level ${i} — ${label})`);
};

await goto(0, '02-gut-volcanic', 'GUT Volcanic Core');
await goto(10, '03-heart-garden', 'HEART river garden');
await goto(20, '04-head-cosmic', 'HEAD cosmic platforms');

// Open the Lo Shu cube hero view.
await page.evaluate(() => { try { window.aetheria.gotoLevel(13); } catch (e) {} }, );
await sleep(2000);
await page.keyboard.press('c');
await sleep(800);
await page.screenshot({ path: `${OUT}/05-cube-hero.png` });
console.log('  shot 05-cube-hero (Lo Shu cube, level 13 = SOURCE/HEART-5)');

console.log(errors.length ? `PAGE ERRORS:\n  ${errors.slice(0, 8).join('\n  ')}` : 'No page errors.');
await browser.close();
