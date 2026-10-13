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
  await browser.close();
  if (!state.rootText || state.rootText.trim().length < 15 || errors.some(x => /Uncaught|TypeError|ReferenceError|SyntaxError/.test(x))) {
    console.error('FAILED: React page did not render correctly');
    process.exitCode = 1;
  } else console.log('PASSED: rendered content found');
})().catch(error => { console.error(error.stack || String(error)); process.exit(1); });
