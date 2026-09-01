import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(scriptDirectory, '..')
const sourceRoot = path.resolve(siteRoot, '..')
const galleryDirectory = path.join(siteRoot, 'public', 'gallery')
const dataFile = path.join(siteRoot, 'src', 'gallery-data.js')
const converterScript = path.join(scriptDirectory, 'convert-gallery-image.py')
const imagePattern = /\.(?:jpe?g|png|webp|gif)$/i

const categoryLabels = new Map([
  ['OUTPUT管理', 'OUTPUT 产品与内容运营'],
  ['AIGC视频&互动影游戏', 'AIGC 影像与互动叙事'],
  ['创赛商业化', '创新创业与商业化'],
  ['海关总署立项', '关务产品项目'],
  ['学科竞赛获奖情况', '竞赛与荣誉'],
  ['新闻报道', '新闻与媒体报道'],
  ['实习:项目经历', '实习与项目经历'],
  ['专利软著', '知识产权'],
])

const categoryOrder = [...categoryLabels.keys()]
const allFiles = execFileSync('rg', ['--files'], { cwd: sourceRoot, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)

const sourceImages = allFiles
  .filter((file) => imagePattern.test(file) && categoryLabels.has(file.split('/')[0]))
  .sort((left, right) => {
    const leftCategory = categoryOrder.indexOf(left.split('/')[0])
    const rightCategory = categoryOrder.indexOf(right.split('/')[0])
    return leftCategory - rightCategory || left.localeCompare(right, 'zh-CN', { numeric: true })
  })

rmSync(galleryDirectory, { recursive: true, force: true })
mkdirSync(galleryDirectory, { recursive: true })

const galleryItems = []
for (const [index, relativePath] of sourceImages.entries()) {
  const sourcePath = path.join(sourceRoot, relativePath)
  const id = `gallery-image-${String(index + 1).padStart(4, '0')}`
  const outputName = `${id}.webp`
  const outputPath = path.join(galleryDirectory, outputName)
  const category = relativePath.split('/')[0]
  const categoryLabel = categoryLabels.get(category) ?? category
  const extension = path.extname(relativePath).slice(1).toUpperCase()
  const title = path.basename(relativePath, path.extname(relativePath))

  const conversion = spawnSync('python3', [converterScript, sourcePath, outputPath], { stdio: 'ignore' })

  if (conversion.status !== 0) {
    throw new Error(`无法生成网页图片：${relativePath}`)
  }

  galleryItems.push({
    id,
    type: categoryLabel,
    title,
    summary: `来源文件：${relativePath}`,
    image: `./gallery/${outputName}`,
    imageAlt: `${categoryLabel}项目资料：${title}`,
    facts: [categoryLabel, `${extension} 原图`, '网页优化副本'],
    sourceCategory: category,
    sourcePath: relativePath,
    public: true,
  })
}

const galleryCategories = categoryOrder
  .map((id) => ({
    id,
    label: categoryLabels.get(id),
    count: galleryItems.filter((item) => item.sourceCategory === id).length,
  }))
  .filter((category) => category.count > 0)

const output = `// 此文件由 scripts/sync-gallery.mjs 自动生成，请勿手动编辑。\n\nexport const galleryCategories = ${JSON.stringify(galleryCategories, null, 2)}\n\nexport const galleryItems = ${JSON.stringify(galleryItems, null, 2)}\n`
writeFileSync(dataFile, output)

const optimizedBytes = galleryItems.reduce((total, item) => {
  return total + statSync(path.join(siteRoot, 'public', item.image.replace('./', ''))).size
}, 0)

process.stdout.write(`已建立 ${galleryItems.length} 张图片的网页索引（${(optimizedBytes / 1024 / 1024).toFixed(2)} MB）。\n`)
