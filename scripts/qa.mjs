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

  if (width <= 900) {
    await page.getByRole('button', { name: '打开菜单' }).click()
    await page.getByRole('link', { name: '项目档案' }).click()
  }

  await page.getByRole('button', { name: '浏览完整项目档案' }).click()
  await page.getByRole('button', { name: /研究与写作 RESEARCH & WRITING/ }).click()
  await page.getByRole('button', { name: /看屏幕、用键鼠/ }).click()
  await page.waitForTimeout(350)

  const dialogAudit = await page.locator('.archive-window').evaluate((element) => ({
    overflow: Math.max(0, element.scrollWidth - element.clientWidth),
    hasOpenClaw: element.textContent.includes('看屏幕、用键鼠'),
    hasArticleLink: element.textContent.includes('阅读原文'),
  }))
  if (width === 390) await page.screenshot({ path: 'preview-archive-mobile.png', fullPage: false })
  if (width === 1440) await page.screenshot({ path: 'preview-archive.png', fullPage: false })
  await page.getByRole('button', { name: /项目影像索引 PROJECT IMAGE INDEX/ }).click()
  await page.getByLabel('搜索项目影像').fill('image')
  await page.waitForTimeout(150)
  const galleryGridAudit = await page.locator('.archive-window').evaluate((element) => ({
    hasGalleryTitle: element.textContent.includes('项目影像索引'),
    totalCount: element.textContent.includes('349'),
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

  const pageAudit = await page.evaluate(() => ({
    overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
    folderCount: document.querySelectorAll('.folder-card').length,
    articleCount: document.querySelectorAll('.article-index a').length,
  }))

  if (width === 1440) await page.screenshot({ path: 'preview.png', fullPage: true })
  if (width === 390) await page.screenshot({ path: 'preview-mobile.png', fullPage: true })

  results.push({ width, height, pageAudit, dialogAudit, galleryGridAudit, galleryPreviewAudit, errors })
  await page.close()
}

await audit(1440, 1000)
await audit(390, 844)
await audit(360, 800)
await browser.close()
process.stdout.write(`${JSON.stringify(results, null, 2)}\n`)
