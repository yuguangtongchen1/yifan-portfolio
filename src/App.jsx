import { useEffect, useMemo, useRef, useState } from 'react'
import { archiveFolders, archiveItemCount, articles, selectedEvidence } from './data.js'

function Arrow({ direction = 'up-right', size = 18 }) {
  const path = direction === 'right' ? 'M5 12h14M14 7l5 5-5 5' : 'M6 18 18 6M8 6h10v10'
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={path} stroke="currentColor" strokeWidth="1.6" /></svg>
}

function FolderGlyph({ open = false }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" aria-hidden="true">
      <path d="M4 15h27l7-9h38v48H4V15Z" fill="currentColor" opacity=".24" />
      <path d="M4 18h72v36H4V18Z" fill="currentColor" opacity={open ? '.92' : '.68'} />
      <path d="M4 18h72M4 54h72V6H38l-7 9H4v39Z" stroke="currentColor" strokeWidth="1.5" />
      {open && <path d="m4 24 8 30h56l8-30H4Z" fill="currentColor" />}
    </svg>
  )
}

function Header({ onOpenArchive }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="返回首页">
        <span className="brand-cn">张一帆</span><span className="brand-en">YIFAN ZHANG · AI PRODUCT</span>
      </a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? '关闭菜单' : '打开菜单'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
      <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="主导航">
        <a href="#archive" onClick={closeMenu}>项目档案</a><a href="#evidence" onClick={closeMenu}>项目证据</a><a href="#writing" onClick={closeMenu}>研究写作</a><a href="#contact" onClick={closeMenu}>联系方式</a>
        <button type="button" onClick={() => { closeMenu(); onOpenArchive() }}>浏览全部资料 <Arrow direction="right" size={15} /></button>
      </nav>
    </header>
  )
}

function ArchiveKey({ onClick }) {
  return (
    <button className="archive-key" type="button" onClick={onClick} aria-label="浏览完整项目档案">
      <span className="archive-key-tab">PORTFOLIO ARCHIVE</span>
      <span className="archive-key-icon"><FolderGlyph open /></span>
      <span className="archive-key-copy"><strong>浏览完整项目档案</strong><small>{String(archiveFolders.length).padStart(2, '0')} FOLDERS · {String(archiveItemCount).padStart(2, '0')} RECORDS</small></span>
      <span className="archive-key-arrow"><Arrow direction="right" size={24} /></span>
    </button>
  )
}

function Hero({ onOpenArchive }) {
  return (
    <section className="hero" id="top">
      <div className="hero-intro">
        <div className="hero-kicker"><span>AI PRODUCT · AGENT SYSTEMS</span><span>SHANGHAI / 2024—2026</span></div>
        <h1>让 Agent 从能力演示，<br />走向<span>真实业务</span>。</h1>
        <p>张一帆，AI 产品经理。聚焦 Agent 系统、AIGC 内容生产与行业知识工程，负责问题定义、产品架构、评测体系与跨团队交付。</p>
        <ArchiveKey onClick={onOpenArchive} />
        <div className="hero-footnote"><span>PRODUCT / AGENT / KNOWLEDGE ENGINEERING</span><span>SELECTED WORK 2024—2026 ↓</span></div>
      </div>
      <div className="hero-visual" aria-label="张一帆的真实项目现场影像">
        <figure className="hero-photo-main"><img src="./assets/hero-lab.jpg" alt="张一帆在实验室进行移液操作" /><figcaption><span>项目现场 / 实验室研究</span><small>FIELD NOTE · 2025</small></figcaption></figure>
        <span className="hero-visual-note">AI PRODUCT · FIELD RESEARCH</span>
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title, meta }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2>{meta && <p>{meta}</p>}</div>
}

function FolderCollection({ onOpenFolder }) {
  return (
    <section className="folder-section" id="archive">
      <SectionTitle eyebrow="PROJECT ARCHIVE" title="沿着简历主线，查看项目与证据。" meta="六个核心项目按职责、成果与证据组织；原创文章、新闻报道和完整影像库分别归档，避免不同叙事混在一起。" />
      <div className="folder-grid">
        {archiveFolders.map((folder) => (
          <button className={folder.id === 'gallery' ? 'folder-card folder-card-gallery' : 'folder-card'} type="button" key={folder.id} style={{ '--folder-accent': folder.accent }} onClick={() => onOpenFolder(folder.id)}>
            <span className="folder-card-cover"><img src={folder.cover} alt="" decoding="async" /><small>{String(folder.items.length).padStart(2, '0')} RECORDS</small></span>
            <span className="folder-card-body"><span className="folder-card-tab">{folder.en}</span><strong>{folder.title}</strong><span className="folder-card-description">{folder.description}</span><span className="folder-card-action">查看资料 <Arrow direction="right" /></span></span>
          </button>
        ))}
      </div>
      <div className="archive-policy"><span>ARCHIVE SCOPE</span><p>代表项目依据简历经历策展，图片不重复承担同一叙事；“完整项目影像库”另行收录正式资料目录中的全部 443 张图片并保留来源路径。视频文件不在本网页范围内。</p></div>
    </section>
  )
}

function Evidence({ onOpenArchive }) {
  return (
    <section className="evidence-section" id="evidence">
      <SectionTitle eyebrow="SELECTED EVIDENCE" title="用可核验材料说明项目结果。" meta="产品界面、现场照片、公开路演、媒体报道与知识产权文件，共同构成项目成果证据。" />
      <div className="evidence-mosaic">
        {selectedEvidence.map((item, index) => <figure className={`evidence-card evidence-card-${index + 1}`} key={item.title}><img src={item.image} alt={item.title} loading="lazy" /><figcaption><span>{item.label}</span><strong>{item.title}</strong></figcaption></figure>)}
        <button className="evidence-open" type="button" onClick={onOpenArchive}><span>查看完整项目档案</span><Arrow size={28} /></button>
      </div>
    </section>
  )
}

function Practice() {
  const cases = [
    ['2025.03—2026.09', 'OUTPUT', 'AIGC 产品实习生 → AI 产品负责人', '内容生产、模型路由、Monsora 创意资产与 Agent 上下文产品'],
    ['2024.11—2026.01', '海关总署立项项目', '关务 Agent 产品落地负责人', '知识建模、产品研发、公共平台录用与发明专利'],
    ['2024.08—2024.11', '中国银行', '数字化产品实习生', '星念织网专家 Agent、六阶段任务 Loop；相关方法后续用于汇丰 VC 方案交流'],
  ]
  return (
    <section className="practice-section">
      <div className="practice-thesis"><span>PRODUCT PRINCIPLE</span><blockquote>AI 产品工作的核心，是把不确定的模型能力转化为可定义、可评测、可交付的产品系统。</blockquote></div>
      <div className="practice-list">{cases.map(([period, company, role, summary]) => <article key={company}><time>{period}</time><div><h3>{company}</h3><strong>{role}</strong></div><p>{summary}</p></article>)}</div>
    </section>
  )
}

function Writing() {
  return (
    <section className="writing-section" id="writing">
      <div className="writing-heading">
        <SectionTitle eyebrow="AI 科技评论 / PUBLISHED WRITING" title="持续研究模型能力，形成产品判断。" meta="六篇公开文章，覆盖生成视觉、模型评测、智能体和 AI 产品，均可阅读原文。" />
        <figure><img src="./archive/ai-review-proof.jpg" alt="AI 科技评论文章页面" loading="lazy" /><figcaption>PUBLICATION PROOF / 2026</figcaption></figure>
      </div>
      <div className="article-index">{articles.map((article, index) => <a href={article.href} target="_blank" rel="noreferrer" key={article.id}><span>{String(index + 1).padStart(2, '0')}</span><small>{article.category}</small><span className="article-cover"><img src={article.image} alt="" loading="lazy" decoding="async" /></span><h3>{article.title}</h3><Arrow /></a>)}</div>
    </section>
  )
}

function Footer({ onOpenArchive }) {
  return (
    <footer id="contact">
      <div className="footer-main"><span className="footer-eyebrow">CONTACT</span><h2>期待围绕 AI 产品、Agent 与 AIGC 应用展开交流。</h2><div className="footer-actions"><a href="mailto:13290348758@163.com">发送邮件 <Arrow /></a><a href="./zhang-yifan-resume.pdf" target="_blank" rel="noreferrer">查看简历 PDF <Arrow /></a><button type="button" onClick={onOpenArchive}>浏览项目档案 <Arrow /></button></div></div>
      <div className="footer-bottom"><span>张一帆 / YIFAN ZHANG</span><span>AI PRODUCT · AGENT · AIGC</span><span>SHANGHAI · 2026</span></div>
    </footer>
  )
}

function GalleryWorkspace({ folder }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(60)
  const [previewId, setPreviewId] = useState(null)
  const matchingItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('zh-CN')
    return folder.items.filter((item) => {
      const matchesCategory = category === 'all' || item.sourceCategory === category
      const matchesQuery = !normalizedQuery || `${item.title} ${item.sourcePath}`.toLocaleLowerCase('zh-CN').includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, folder.items, query])
  const visibleItems = matchingItems.slice(0, limit)
  const previewItem = folder.items.find((item) => item.id === previewId)
  const updateCategory = (event) => { setCategory(event.target.value); setLimit(60) }
  const updateQuery = (event) => { setQuery(event.target.value); setLimit(60) }

  return (
    <section className="gallery-workspace" aria-labelledby="gallery-index-title">
      <header className="gallery-index-heading">
        <div><span>COMPLETE PROJECT IMAGE LIBRARY</span><h2 id="gallery-index-title">完整项目影像库</h2><p>按正式项目资料的原始目录组织，保留文件名与来源路径。代表项目已经过策展；本入口用于完整检索和材料核验。</p></div>
        <div className="gallery-index-count"><strong>{folder.items.length}</strong><span>IMAGES<br />{folder.categories.length} SOURCE GROUPS</span></div>
      </header>
      <div className="gallery-index-toolbar">
        <label><span>搜索</span><input type="search" value={query} onChange={updateQuery} placeholder="输入文件名或项目名称" aria-label="搜索项目影像" /></label>
        <label><span>资料来源</span><select value={category} onChange={updateCategory} aria-label="筛选影像目录"><option value="all">全部目录 · {folder.items.length}</option>{folder.categories.map((item) => <option value={item.id} key={item.id}>{item.label} · {item.count}</option>)}</select></label>
        <span className="gallery-result-count">显示 {visibleItems.length} / {matchingItems.length}</span>
      </div>
      {visibleItems.length > 0 ? <div className="gallery-contact-sheet">
        {visibleItems.map((item) => {
          const itemIndex = folder.items.findIndex((record) => record.id === item.id) + 1
          return <button type="button" className="gallery-tile" key={item.id} onClick={() => setPreviewId(item.id)} aria-label={`查看影像：${item.title}，来源 ${item.sourcePath}`}>
            <span className="gallery-tile-media"><img src={item.image} alt="" loading="lazy" decoding="async" /></span>
            <span className="gallery-tile-meta"><small>{String(itemIndex).padStart(3, '0')}</small><em>{item.type}</em></span>
            <strong>{item.title}</strong>
          </button>
        })}
      </div> : <p className="gallery-index-empty">未找到匹配的影像。请调整搜索词或资料来源。</p>}
      {visibleItems.length < matchingItems.length && <div className="gallery-index-more"><button type="button" onClick={() => setLimit((value) => value + 60)}>继续加载</button><button type="button" onClick={() => setLimit(matchingItems.length)}>显示全部 {matchingItems.length} 张</button></div>}
      {previewItem && <div className="gallery-inspector-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewId(null) }}>
        <article className="gallery-inspector" role="dialog" aria-modal="true" aria-label={`影像详情：${previewItem.title}`}>
          <button className="gallery-inspector-close" type="button" onClick={() => setPreviewId(null)} aria-label="关闭影像预览">关闭</button>
          <figure><img src={previewItem.image} alt={previewItem.imageAlt} /></figure>
          <div className="gallery-inspector-copy"><span>{previewItem.type}</span><h2>{previewItem.title}</h2><p>{previewItem.sourcePath}</p><ul>{previewItem.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><small>PROJECT IMAGE ARCHIVE / YIFAN ZHANG</small></div>
        </article>
      </div>}
    </section>
  )
}

function ArchiveDialog({ open, folderId, onFolderChange, onClose }) {
  const activeFolder = useMemo(() => archiveFolders.find((folder) => folder.id === folderId) || archiveFolders[0], [folderId])
  const [itemId, setItemId] = useState(activeFolder.items[0].id)
  const closeRef = useRef(null)
  const isGallery = activeFolder.id === 'gallery'
  useEffect(() => { setItemId(activeFolder.items[0].id) }, [activeFolder])
  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKeyDown)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKeyDown) }
  }, [open, onClose])
  if (!open) return null
  const activeItem = activeFolder.items.find((item) => item.id === itemId) || activeFolder.items[0]
  return (
    <div className="archive-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="archive-window" role="dialog" aria-modal="true" aria-labelledby="archive-title">
        <header className="archive-window-header"><div className="archive-window-brand" aria-hidden="true"><strong>ZYF</strong><span>PROJECT ARCHIVE</span></div><div className="archive-path"><span>项目档案</span><b>/</b><strong id="archive-title">{activeFolder.title}</strong></div><button ref={closeRef} type="button" onClick={onClose} aria-label="关闭作品档案">关闭 · ESC</button></header>
        <div className={isGallery ? 'archive-layout archive-layout-gallery' : 'archive-layout'}>
          <aside className="archive-sidebar" aria-label="作品文件夹">
            <div className="archive-profile"><span>ZYF</span><div><strong>张一帆</strong><small>AI PRODUCT PORTFOLIO</small></div></div>
            <nav>{archiveFolders.map((folder) => <button type="button" className={folder.id === activeFolder.id ? 'is-active' : ''} key={folder.id} onClick={() => onFolderChange(folder.id)}><FolderGlyph open={folder.id === activeFolder.id} /><span><strong>{folder.title}</strong><small>{folder.en}</small></span><em>{String(folder.items.length).padStart(2, '0')}</em></button>)}</nav>
            <p>按简历项目主线策展。完整影像库保留来源目录与文件名；视频未纳入。</p>
          </aside>
          {isGallery ? <GalleryWorkspace folder={activeFolder} /> : <><div className="archive-records">
            <div className="records-heading"><div><span>FOLDER {activeFolder.code}</span><h2>{activeFolder.title}</h2></div><small>{activeFolder.items.length} RECORDS</small></div>
            <p className="records-description">{activeFolder.description}</p>
            <div className="record-list">{activeFolder.items.map((item, index) => {
              const status = item.href ? '公开原文 ↗' : '档案'
              return <button type="button" className={item.id === activeItem.id ? 'record is-active' : 'record'} onClick={() => setItemId(item.id)} key={item.id}><span className="record-index">{String(index + 1).padStart(2, '0')}</span><span className="record-thumb"><img src={item.image} alt="" loading="lazy" decoding="async" /></span><span className="record-copy"><small>{item.type}</small><strong>{item.title}</strong></span><span className="record-status">{status}</span></button>
            })}</div>
          </div>
          <article className="archive-preview" key={activeItem.id}>
            <div className="preview-media"><img src={activeItem.image} alt={activeItem.imageAlt} /><span>PROJECT PREVIEW</span></div>
            <div className="preview-copy"><small>{activeItem.type}</small><h2>{activeItem.title}</h2><p>{activeItem.summary}</p><ul>{activeItem.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>{activeItem.note && <div className="private-note">补充说明 · {activeItem.note}</div>}{activeItem.href ? <a href={activeItem.href} target="_blank" rel="noreferrer">{activeItem.linkLabel} <Arrow /></a> : <span className="preview-no-link">项目摘要 / 无独立公开链接</span>}</div>
          </article>
          </>}
        </div>
      </section>
    </div>
  )
}

export default function App() {
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [folderId, setFolderId] = useState(archiveFolders[0].id)
  const openArchive = (nextFolderId = archiveFolders[0].id) => { setFolderId(nextFolderId); setArchiveOpen(true) }
  return <><Header onOpenArchive={() => openArchive()} /><main><Hero onOpenArchive={() => openArchive()} /><FolderCollection onOpenFolder={openArchive} /><Evidence onOpenArchive={() => openArchive()} /><Practice /><Writing /></main><Footer onOpenArchive={() => openArchive()} /><ArchiveDialog open={archiveOpen} folderId={folderId} onFolderChange={setFolderId} onClose={() => setArchiveOpen(false)} /></>
}
