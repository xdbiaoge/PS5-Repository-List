const { chromium } = require('/tmp/ps5-browser/node_modules/playwright-core');

(async () => {
  const errors = [], failed = [], responses = [];
  const browser = await chromium.launch({
    headless: true, executablePath: process.env.CHROME_PATH,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  page.on('pageerror', error => errors.push(error.stack || String(error)));
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') errors.push('CONSOLE ' + msg.type() + ': ' + msg.text());
  });
  page.on('requestfailed', request => failed.push(request.url() + ': ' + request.failure()?.errorText));
  page.on('response', response => {
    if (response.status() >= 400) responses.push(response.status() + ' ' + response.url());
  });
  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(8000);
  const state = await page.evaluate(() => ({
    documentTitle: document.title,
    htmlLang: document.documentElement.lang,
    rootPresent: !!document.querySelector('#root'),
    rootText: document.querySelector('#root')?.innerText?.slice(0, 350),
    rootHtml: document.querySelector('#root')?.innerHTML?.slice(0, 600),
    scripts: Array.from(document.querySelectorAll('script[src]')).map(el => el.src)
  }));
  console.log('STATE', JSON.stringify(state, null, 2));
  console.log('PAGE ERRORS', JSON.stringify(errors, null, 2));
  console.log('FAILED REQUESTS', JSON.stringify(failed, null, 2));
  console.log('HTTP ERRORS', JSON.stringify(responses, null, 2));
  await page.screenshot({ path: '/tmp/ps5-v2-smoke.png', fullPage: true });

  // Exercise the actual dashboard, not only the initial document shell.
  const categoryIsChinese = await page.locator('#root').innerText().then(t => t.includes('PS5 金手指工具'));
  console.log('CHINESE CATEGORY VISIBLE', categoryIsChinese);
  if (!categoryIsChinese) errors.push('Chinese category not visible on desktop');
  const settings = page.getByRole('button', { name: /选项设置/ }).first();
  console.log('SETTINGS BUTTON COUNT', await settings.count());
  if (await settings.count()) {
    await settings.click();
    await page.waitForTimeout(350);
    const english = page.getByRole('button', { name: /English/ }).first();
    console.log('ENGLISH SWITCH COUNT', await english.count());
    if (await english.count()) {
      await english.click();
      await page.waitForTimeout(1800);
      const enInfo = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        textLength: document.querySelector('#root')?.innerText?.length || 0
      }));
      console.log('ENGLISH MODE', JSON.stringify(enInfo));
      if (enInfo.lang !== 'en' || enInfo.textLength < 50) errors.push('Switching to English failed');
      const chinese = page.getByRole('button', { name: /中文/ }).first();
      console.log('CHINESE SWITCH COUNT', await chinese.count());
      if (await chinese.count()) {
        await chinese.click();
        await page.waitForTimeout(1800);
        const zhInfo = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          visibleChinese: document.querySelector('#root')?.innerText?.includes('PS5 金手指工具'),
          textLength: document.querySelector('#root')?.innerText?.length || 0
        }));
        console.log('CHINESE RESTORE', JSON.stringify(zhInfo));
        if (zhInfo.lang !== 'zh-CN' || !zhInfo.visibleChinese || zhInfo.textLength < 50)
          errors.push('Switching back to Chinese failed');
      } else errors.push('Chinese button missing');
    } else errors.push('English language button missing');
  } else errors.push('Settings button missing');

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on('pageerror', error => errors.push('MOBILE ' + (error.stack || String(error))));
  await mobile.goto('http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded' });
  await mobile.waitForTimeout(3500);
  const mobileTextLength = await mobile.locator('#root').innerText().then(t => t.length);
  console.log('MOBILE ROOT TEXT LENGTH', mobileTextLength);
  if (mobileTextLength < 50) errors.push('Mobile layout is blank');
  await mobile.screenshot({ path: '/tmp/ps5-v2-mobile.png', fullPage: true });
  await mobile.close();

  console.log('FINAL ERRORS', JSON.stringify(errors, null, 2));
  await browser.close();
  if (!state.rootText || state.rootText.trim().length < 15 || errors.length > 0 && errors.some(x => !x.includes('CONSOLE error: Failed to load resource: the server responded with a status of 404'))) {
    console.error('FAILED: React page did not render correctly');
    process.exitCode = 1;
  } else console.log('PASSED: rendered content found');
})().catch(error => { console.error(error.stack || String(error)); process.exit(1); });
