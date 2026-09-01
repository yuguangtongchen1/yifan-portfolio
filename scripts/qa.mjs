import { chromium } from 'playwright-core'

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const baseUrl = process.env.QA_URL || 'http://127.0.0.1:4173/'
const browser = await chromium.launch({ executablePath: chromePath, headless: true })
const results = []

async function audit(width, height) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })

  if (width === 1440) {
    const commercializationCard = page.getByRole('button', { name: /创业商业化与教学实践/ })
    await commercializationCard.scrollIntoViewIfNeeded()
    await page.waitForFunction(() => {
      const image = [...document.querySelectorAll('.folder-card img')].find((item) => item.src.includes('commercialization-cover-v2'))
      return image?.complete && image.naturalWidth > 0
    })
    await commercializationCard.screenshot({ path: 'preview-commercialization-card.png' })
  }

  if (width <= 900) {
    await page.getByRole('button', { name: '打开菜单' }).click()
    await page.getByRole('link', { name: '项目档案' }).click()
  }

  await page.getByRole('button', { name: '浏览完整项目档案' }).click()
  await page.getByRole('button', { name: /中国银行 · 星念织网 XINGNIAN WEAVE/ }).click()
  await page.getByRole('button', { name: /《CLAUDE 模板》运行时台账与状态机/ }).click()
  const bankAudit = await page.locator('.archive-window').evaluate((element) => ({
    hasXingnian: element.textContent.includes('星念织网'),
    hasLoop: element.textContent.includes('谋主 Loop'),
    hasLedger: element.textContent.includes('47 项产物台账'),
    ledgerLink: element.querySelector('.preview-copy a')?.getAttribute('href'),
    previewLoaded: element.querySelector('.preview-media img')?.naturalWidth > 0,
  }))
  await page.getByRole('button', { name: /汇丰 VC 方案交流：从专家 Agent 到 Agent 网络/ }).click()
  const hsbcAudit = await page.locator('.archive-window').evaluate((element) => ({
    hasHsbcRecord: element.textContent.includes('汇丰 VC 方案交流'),
    hasPageCount: element.textContent.includes('17 页交流材料'),
    hasDisclosureNote: element.textContent.includes('融资测算和运营成本不在网页展开'),
    previewLoaded: element.querySelector('.preview-media img')?.naturalWidth > 0,
  }))
  await page.waitForTimeout(350)
  if (width === 1440) await page.screenshot({ path: 'preview-hsbc.png', fullPage: false })
  if (width === 390) await page.screenshot({ path: 'preview-hsbc-mobile.png', fullPage: false })
  await page.getByRole('button', { name: /AI 科技评论 PUBLISHED AI ANALYSIS/ }).click()
  await page.getByRole('button', { name: /看屏幕、用键鼠/ }).click()
  await page.waitForTimeout(350)

  const dialogAudit = await page.locator('.archive-window').evaluate((element) => ({
    overflow: Math.max(0, element.scrollWidth - element.clientWidth),
    hasOpenClaw: element.textContent.includes('看屏幕、用键鼠'),
    hasArticleLink: element.textContent.includes('阅读原文'),
  }))
  if (width === 390) await page.screenshot({ path: 'preview-archive-mobile.png', fullPage: false })
  if (width === 1440) await page.screenshot({ path: 'preview-archive.png', fullPage: false })
  await page.getByRole('button', { name: /完整项目影像库 COMPLETE PROJECT IMAGE LIBRARY/ }).click()
  await page.getByLabel('搜索项目影像').fill('image')
  await page.waitForTimeout(150)
  const galleryGridAudit = await page.locator('.archive-window').evaluate((element) => ({
    hasGalleryTitle: element.textContent.includes('完整项目影像库'),
    totalCount: element.textContent.includes('443'),
    visibleRecords: element.querySelectorAll('.gallery-tile').length,
    hasSourceFilter: Boolean(element.querySelector('select')),
  }))
  if (width === 1440) await page.screenshot({ path: 'preview-gallery.png', fullPage: false })
  if (width === 390) await page.screenshot({ path: 'preview-gallery-mobile.png', fullPage: false })
  await page.locator('.gallery-tile').first().click()
  const galleryPreviewAudit = await page.locator('.gallery-inspector').evaluate((element) => ({
    hasImage: element.querySelector('img')?.naturalWidth > 0,
    hasOriginalPath: element.textContent.includes('OUTPUT管理/'),
    hasCloseAction: Boolean(element.querySelector('.gallery-inspector-close')),
  }))
  await page.getByRole('button', { name: '关闭影像预览' }).click()
  await page.getByRole('button', { name: '关闭作品档案' }).click()

  await page.locator('img').evaluateAll((images) => images.forEach((image) => { image.loading = 'eager' }))
  await page.waitForFunction(() => [...document.images].every((image) => image.complete))

  const pageAudit = await page.evaluate(() => ({
    overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
    folderCount: document.querySelectorAll('.folder-card').length,
    articleCount: document.querySelectorAll('.article-index a').length,
  }))

  if (width === 1440) await page.screenshot({ path: 'preview.png', fullPage: true })
  if (width === 390) await page.screenshot({ path: 'preview-mobile.png', fullPage: true })

  results.push({ width, height, pageAudit, bankAudit, hsbcAudit, dialogAudit, galleryGridAudit, galleryPreviewAudit, errors })
  await page.close()
}

await audit(1440, 1000)
await audit(390, 844)
await audit(360, 800)
await browser.close()
process.stdout.write(`${JSON.stringify(results, null, 2)}\n`)
