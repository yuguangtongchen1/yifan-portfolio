import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const articles = [
  ['hidream-o1', 'https://mp.weixin.qq.com/s/mhMZe2_-VJBAdCue1K4mPQ'],
  ['kimi-k27', 'https://mp.weixin.qq.com/s/87Fvkapo430j5_RpZDl6oQ'],
  ['openclaw', 'https://mp.weixin.qq.com/s/2PZC5PV5Zv-w1clNFcyptw'],
  ['minimax-m3', 'https://mp.weixin.qq.com/s/2TDwOL5LcJWBti93EoORrg'],
  ['hidream-open', 'https://mp.weixin.qq.com/s?__biz=MzA5ODEzMjIyMA==&mid=2247735607&idx=1&sn=f2d592f49d7f0f48a6f8c37ffa159766&scene=21#wechat_redirect'],
  ['genflow', 'https://mp.weixin.qq.com/s/1MdvRjIO6hj2k1mQzcppaA'],
]

const outputDirectory = path.resolve('public/articles')
const headers = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36',
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

await mkdir(outputDirectory, { recursive: true })
const fingerprints = new Set()

for (const [id, articleUrl] of articles) {
  const pageResponse = await fetch(articleUrl, { headers })
  if (!pageResponse.ok) throw new Error(`${id}: article request failed (${pageResponse.status})`)
  const html = await pageResponse.text()
  const coverMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)
  if (!coverMatch) {
    process.stdout.write(`${id}\tSKIPPED\tarticle source requires WeChat verification\n`)
    continue
  }

  const coverUrl = decodeHtml(coverMatch[1])
  const imageResponse = await fetch(coverUrl, { headers: { ...headers, referer: articleUrl } })
  if (!imageResponse.ok) throw new Error(`${id}: cover request failed (${imageResponse.status})`)
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())
  const fingerprint = createHash('sha256').update(imageBuffer).digest('hex')
  if (fingerprints.has(fingerprint)) throw new Error(`${id}: duplicate article cover returned by source`)
  fingerprints.add(fingerprint)

  await writeFile(path.join(outputDirectory, `${id}.jpg`), imageBuffer)
  process.stdout.write(`${id}\t${Math.round(imageBuffer.length / 1024)} KB\t${fingerprint.slice(0, 10)}\n`)
}
