import { chromium } from '@playwright/test';

async function testNavbar() {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const artifactDir = 'C:/Users/fauza/.gemini/antigravity/brain/804d6308-88df-4ee3-8f72-65699ae69e26';

  let hasErrors = false;

  const testRoutes = [
    { url: 'http://localhost:3000/', expectedActive: 'Beranda' },
    { url: 'http://localhost:3000/pemerintahan', expectedActive: 'Pemerintahan' },
    { url: 'http://localhost:3000/pemerintahan/struktur', expectedActive: 'Pemerintahan' },
    { url: 'http://localhost:3000/profil/sejarah', expectedActive: 'Profil Desa' },
    { url: 'http://localhost:3000/informasi/berita', expectedActive: 'Informasi' },
    { url: 'http://localhost:3000/kontak', expectedActive: 'Kontak' },
  ];

  console.log('=== 1. Active State Verification Across Routes ===');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  for (const route of testRoutes) {
    await page.goto(route.url, { waitUntil: 'networkidle' });
    
    // Check which item has the active green pill class
    const activeElements = await page.$$eval(
      'nav[aria-label="Navigasi Utama"] a, nav[aria-label="Navigasi Utama"] button',
      (els) => els.filter((el) => el.className.includes('bg-[#0B4625]')).map((el) => el.textContent.trim())
    );

    console.log(`Route [${route.url}]: Active highlighted items =`, activeElements);

    const matchesExpected = activeElements.some((text) => text.includes(route.expectedActive));
    if (!matchesExpected) {
      console.error(`  ERROR: Expected active item "${route.expectedActive}" not highlighted at ${route.url}!`);
      hasErrors = true;
    } else {
      console.log(`  PASSED: "${route.expectedActive}" is correctly highlighted with solid green pill!`);
    }
  }

  // Screenshot on /pemerintahan/struktur at 1440, 1366, 1280
  const viewports = [
    { width: 1440, height: 900, name: '1440' },
    { width: 1366, height: 768, name: '1366' },
    { width: 1280, height: 800, name: '1280' },
  ];

  console.log('\n=== 2. Responsiveness & Fit on /pemerintahan/struktur ===');
  for (const vp of viewports) {
    const vpPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await vpPage.goto('http://localhost:3000/pemerintahan/struktur', { waitUntil: 'networkidle' });

    const searchInput = await vpPage.$('input[placeholder="Cari..."]');
    const box = await searchInput?.boundingBox();

    if (box) {
      const isClipped = (box.x + box.width) > vp.width;
      const rightMargin = vp.width - (box.x + box.width);
      console.log(`[Viewport ${vp.name}px on /pemerintahan/struktur] Right Margin: ${rightMargin.toFixed(1)}px. Clipped: ${isClipped}`);
      if (isClipped) {
        console.error(`  ERROR: Search input is clipped at ${vp.name}px on /pemerintahan/struktur!`);
        hasErrors = true;
      }
    }

    await vpPage.screenshot({
      path: `${artifactDir}/navbar_pemerintahan_${vp.name}.png`,
      clip: { x: 0, y: 0, width: vp.width, height: 140 },
    });
    await vpPage.close();
  }

  await page.close();
  await browser.close();

  if (hasErrors) {
    console.error('\nVerification completed WITH ERRORS!');
    process.exit(1);
  } else {
    console.log('\nAll active navbar highlights and responsive checks PASSED!');
  }
}

testNavbar().catch((err) => {
  console.error(err);
  process.exit(1);
});
