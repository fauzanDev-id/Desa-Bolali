import { chromium } from '@playwright/test';

async function testNavbar() {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const viewports = [
    { width: 1280, height: 800, name: '1280' },
    { width: 1366, height: 768, name: '1366' },
    { width: 1440, height: 900, name: '1440' },
    { width: 1600, height: 900, name: '1600' },
    { width: 1920, height: 1080, name: '1920' },
  ];

  const artifactDir = 'C:/Users/fauza/.gemini/antigravity/brain/804d6308-88df-4ee3-8f72-65699ae69e26';

  let hasErrors = false;

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const brand = await page.$('a[href="/"]');
    const nav = await page.$('nav[aria-label="Navigasi Utama"]');
    const searchForm = await page.$('form');
    const searchInput = await page.$('input[placeholder="Cari..."]');

    const brandBox = await brand?.boundingBox();
    const navBox = await nav?.boundingBox();
    const searchBox = await searchForm?.boundingBox();
    const inputBox = await searchInput?.boundingBox();

    console.log(`\n=== Viewport ${vp.name}px ===`);
    console.log(`  Brand: width=${brandBox?.width.toFixed(1)}px (x=${brandBox?.x.toFixed(1)})`);
    console.log(`  Nav: width=${navBox?.width.toFixed(1)}px (x=${navBox?.x.toFixed(1)})`);
    console.log(`  Search: width=${searchBox?.width.toFixed(1)}px (x=${searchBox?.x.toFixed(1)})`);
    
    if (inputBox) {
      const isClipped = (inputBox.x + inputBox.width) > vp.width;
      const rightMargin = vp.width - (inputBox.x + inputBox.width);
      console.log(`  Input right edge: ${(inputBox.x + inputBox.width).toFixed(1)}px / Viewport: ${vp.width}px. Margin: ${rightMargin.toFixed(1)}px. Clipped: ${isClipped}`);
      if (isClipped) {
        hasErrors = true;
        console.error(`  ERROR: Search input is clipped at ${vp.name}px!`);
      }
    }

    // Screenshot top
    await page.screenshot({ path: `${artifactDir}/navbar_${vp.name}_top.png`, clip: { x: 0, y: 0, width: vp.width, height: 140 } });

    // Slow scroll test: step by 2px from 0 to 60px
    let jitterDetected = false;
    let prevY = 0;
    for (let scrollTarget = 2; scrollTarget <= 60; scrollTarget += 2) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollTarget);
      await page.waitForTimeout(20);
      const actualY = await page.evaluate(() => window.scrollY);
      if (actualY < prevY) {
        jitterDetected = true;
        console.error(`  JITTER DETECTED at target ${scrollTarget}px: actualY went backwards from ${prevY} to ${actualY}`);
      }
      prevY = actualY;
    }

    if (!jitterDetected) {
      console.log(`  Slow scroll test PASSED: smooth 60fps compositor scroll, 0 jitter.`);
    } else {
      hasErrors = true;
    }

    // Screenshot while scrolled at 50px
    await page.evaluate(() => window.scrollTo(0, 50));
    await page.waitForTimeout(100);
    await page.screenshot({ path: `${artifactDir}/navbar_${vp.name}_scrolled.png`, clip: { x: 0, y: 0, width: vp.width, height: 100 } });

    await page.close();
  }

  await browser.close();

  if (hasErrors) {
    console.error('\nVerification completed WITH ERRORS!');
    process.exit(1);
  } else {
    console.log('\nAll navbar tests PASSED across all viewports!');
  }
}

testNavbar().catch((err) => {
  console.error(err);
  process.exit(1);
});
