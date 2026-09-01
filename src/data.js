import { galleryCategories, galleryItems } from './gallery-data.js'

export const articles = [
  { id: 'hidream-o1', title: 'HiDream-O1-Image-1.5 刷新国产图像生成模型纪录：砍掉 VAE，是图像模型的未来吗？', category: '生成视觉', href: 'https://mp.weixin.qq.com/s/mhMZe2_-VJBAdCue1K4mPQ' },
  { id: 'kimi-k27', title: 'Kimi K2.7 Code 有多能打？找 Bug，写 3D 游戏，2000 行代码砍掉 55%', category: '模型评测', href: 'https://mp.weixin.qq.com/s/87Fvkapo430j5_RpZDl6oQ' },
  { id: 'openclaw', title: '看屏幕、用键鼠，我的 OpenClaw「睁眼」了', category: '智能体', href: 'https://mp.weixin.qq.com/s/2PZC5PV5Zv-w1clNFcyptw' },
  { id: 'minimax-m3', title: 'MiniMax M3 实测：第一流的模型，已经对执行层动手了', category: '模型评测', href: 'https://mp.weixin.qq.com/s/2TDwOL5LcJWBti93EoORrg' },
  { id: 'hidream-open', title: '文生图开源第一易主，但 HiDream-O1-Image 为什么褒贬不一？', category: '生成视觉', href: 'https://mp.weixin.qq.com/s?__biz=MzA5ODEzMjIyMA==&mid=2247735607&idx=1&sn=f2d592f49d7f0f48a6f8c37ffa159766&scene=21#wechat_redirect' },
  { id: 'genflow', title: 'GenFlow 4.0，终于挖开百度网盘的富矿', category: 'AI 产品', href: 'https://mp.weixin.qq.com/s/1MdvRjIO6hj2k1mQzcppaA' },
]

const articleItems = articles.map((article) => ({
  ...article,
  type: 'PUBLISHED ARTICLE',
  summary: '发表于《AI 科技评论》。文章基于产品实测与资料研究，分析模型能力、技术路径和应用价值。',
  image: './archive/ai-review-proof.jpg',
  imageAlt: '张一帆发表于 AI 科技评论的文章页面',
  facts: [article.category, 'AI 科技评论', '公开文章'],
  linkLabel: '阅读原文',
  public: true,
}))

export const archiveFolders = [
  {
    id: 'product', code: '01', title: 'AI 产品项目', en: 'AI PRODUCT PROJECTS', accent: '#315eff',
    description: '四个进入实际场景的 AI 产品项目，覆盖需求分析、方案设计、工程协作与效果验证。',
    cover: './assets/monsora-search.jpg',
    items: [
      {
        id: 'monsora', type: '0→1 PRODUCT / 2025—2026', title: 'Monsora 创意资产智能引擎',
        summary: '面向创意生产团队设计本地优先的数字资产系统，使用户与 Agent 能够识别素材的版本、来源、关系和权限。',
        image: './assets/monsora-search.jpg', imageAlt: 'Monsora 创意资产搜索工作台',
        facts: ['77 条需求', '32 条内测反馈', '22 个 GWT 用户故事'],
        href: 'https://github.com/yuguangtongchen1/output-code', linkLabel: '查看公开原型', public: true,
      },
      {
        id: 'aigc-routing', type: 'AI PRODUCTION / 2025—2026', title: 'AIGC 内容生产与模型路由',
        summary: '将模型测试、成本记录和制作经验整理为可复用、可评测、可迭代的内容生产流程。',
        image: './assets/aigc-with-her-eyes.png', imageAlt: 'AIGC 生产与角色设定工作台',
        facts: ['3 部公开作品', '23 类模型与 API', '200+ 笔成本记录'], note: '过程 PRD 与生产记录仅在面试中展示',
      },
      {
        id: 'customs-agent', type: 'INDUSTRY AGENT / 2024—2026', title: '关务 Agent 与行业知识工程',
        summary: '将关务术语、法规语境和专家判断过程转化为可维护、可检索、可解释的行业智能体。',
        image: './archive/customs-platform-public.jpg', imageAlt: '关务产品入选上海市公共数据开放平台',
        facts: ['MDX + RAG', '公共平台录用', '国家发明专利'],
        href: './documents/patent-examination-notice.pdf', linkLabel: '查看公开专利材料', public: true,
      },
      {
        id: 'baidu-pig', type: 'FIELD AI / 2025—2026', title: '百度「养猪吧少年」多模态项目',
        summary: '在真实养殖场景中采集图像与声音数据，并以专家判断为基准验证多模态模型的辅助决策能力。',
        image: './archive/baidu-field.jpg', imageAlt: '百度与中国计算机学会 AI 猪界看相师项目海报',
        facts: ['100 只猪样本', '多模态采集', 'Top-K 一致性评测'], note: '完整 PRD 与数据字典仅在面试中展示',
      },
    ],
  },
  {
    id: 'creative', code: '02', title: 'AIGC 内容与互动', en: 'AIGC & INTERACTION', accent: '#7a5cff',
    description: 'AIGC 影像、互动叙事与空间体验项目，展示从内容策划、制作流程到公开发布的实践。',
    cover: './archive/liminal-steam.jpg',
    items: [
      {
        id: 'with-her-eyes', type: 'AI FILM', title: '《带上她的眼睛》AIGC 科幻短片',
        summary: '负责脚本拆解、分镜规划、视觉一致性和后期合成，建立长叙事 AIGC 内容的完整制作流程。',
        image: './assets/aigc-with-her-eyes.png', imageAlt: 'AIGC 角色设定与生产文档', facts: ['7 分钟长片', '30 天交付', 'VACAT 入围'],
      },
      {
        id: 'liminal-within', type: 'INTERACTIVE NARRATIVE', title: '《惊悚乐园 / LIMINAL: Within》',
        summary: '围绕角色设定、分支叙事和交互机制推进 AI 原生游戏项目，并完成 Steam 商店页面展示。',
        image: './archive/liminal-steam.jpg', imageAlt: 'LIMINAL Within 的 Steam 商店页面', facts: ['Steam 页面', '角色多视图', '分支叙事'],
      },
      {
        id: 'language-museum', type: 'SPATIAL INTERACTION', title: '世界语言博物馆交互体验',
        summary: '结合语言语料、空间装置和数字交互，使观众能够通过手势与界面探索语言和地域信息。',
        image: './archive/language-museum.jpg', imageAlt: '世界语言博物馆交互装备现场', facts: ['空间装置', '触控交互', '高校合作'],
      },
      {
        id: 'science-channel', type: 'CONTENT OPERATION', title: '科幻科普内容矩阵',
        summary: '通过模型工作流与内容实验开展科幻科普传播，并持续记录作品数据与制作复盘。',
        image: './archive/aigc-million.jpg', imageAlt: '科幻科普账号累计播放量突破一百万', facts: ['累计播放 100 万+', '工作流复盘', '公开传播'],
      },
    ],
  },
  {
    id: 'writing', code: '03', title: '技术研究与写作', en: 'RESEARCH & WRITING', accent: '#25a780',
    description: '六篇发表于《AI 科技评论》的技术文章，基于实测分析生成模型、Agent 与 AI 产品。',
    cover: './archive/ai-review-proof.jpg', items: articleItems,
  },
  {
    id: 'industry', code: '04', title: '行业项目与公共实践', en: 'INDUSTRY PRACTICE', accent: '#db493c',
    description: '关务、银行、农业和公共服务领域的项目经历，重点呈现业务调研、组织协作与成果转化。',
    cover: './archive/customs-award.jpg',
    items: [
      {
        id: 'public-data', type: 'PUBLIC PLATFORM', title: '上海市公共数据开放平台录用',
        summary: '关务智能产品进入公共数据开放平台应用目录，完成从产品方案到公共场景应用的成果转化。',
        image: './archive/customs-platform-public.jpg', imageAlt: '产品在上海市公共数据开放平台展示', facts: ['公开应用', '关务知识', '成果转化'],
      },
      {
        id: 'customs-collab', type: 'INSTITUTIONAL COLLABORATION', title: '海关业务专家与行业协会共创',
        summary: '通过专家访谈、业务评审和现场共创，将规则、术语与实际办事流程纳入产品定义。',
        image: './archive/customs-meeting.jpg', imageAlt: '与报关协会进行项目会议', facts: ['专家访谈', '业务评审', '场景共创'],
      },
      {
        id: 'recognition', type: 'PROJECT RECOGNITION', title: '项目表彰与成果认可',
        summary: '组织跨专业学生团队推进 AI 项目，并在学院项目表彰中获得成果认可。',
        image: './archive/customs-award.jpg', imageAlt: '学院项目表彰大会现场', facts: ['项目立项', '组织协作', '成果认可'],
      },
    ],
  },
  {
    id: 'proof', code: '05', title: '荣誉、报道与知识产权', en: 'HONORS & PRESS', accent: '#f0b94a',
    description: '收录竞赛成绩、媒体报道、专利和组织认可，用于说明项目成果及其外部影响。',
    cover: './archive/huawei-final.jpg',
    items: [
      {
        id: 'huawei-final', type: 'NATIONAL FINAL', title: '昇腾 AI 创新大赛全国总决赛',
        summary: '参加昇腾 AI 创新大赛全国总决赛，并围绕 AI 产品方案完成现场答辩与评审。',
        image: './archive/huawei-final.jpg', imageAlt: '昇腾 AI 创新大赛全国总决赛现场', facts: ['全国总决赛', '产品答辩', '产业评审'],
      },
      {
        id: 'cctv-report', type: 'MEDIA COVERAGE', title: 'CCTV 公益之声报道 AI 公益活动',
        summary: '参与组织的 AI 公益活动获得媒体报道，呈现 AIGC 技术在公共议题中的应用。',
        image: './archive/cctv-report.jpg', imageAlt: 'CCTV 公益之声关于 AI 公益活动的报道', facts: ['媒体报道', 'AI 公益', '社团组织'],
      },
      {
        id: 'innovation-award', type: 'PERSONAL HONOR', title: '优秀科创个人',
        summary: '基于持续参与学生科技创新项目及成果产出，获评学院优秀科创个人。',
        image: './archive/innovation-certificate.jpg', imageAlt: '优秀科创个人荣誉证书', facts: ['科创实践', '个人荣誉', '2025'],
      },
      {
        id: 'patent', type: 'PATENT', title: '大模型关务产品发明专利',
        summary: '围绕关务语言模型部署与业务流程形成技术成果，相关发明专利已进入实质审查阶段。',
        image: './assets/customs-platform.jpg', imageAlt: '关务大模型产品界面', facts: ['CN120449898A', '发明专利', '实质审查'],
        href: './documents/patent-examination-notice.pdf', linkLabel: '查看公开文件', public: true,
      },
    ],
  },
  {
    id: 'sharing', code: '06', title: '教学分享与合作', en: 'TEACHING & COLLABORATION', accent: '#9d6b43',
    description: '面向高校课堂、学生社群和创新创业活动开展 AI 产品方法分享与跨机构合作。',
    cover: './archive/graduate-teaching.jpg',
    items: [
      {
        id: 'graduate-class', type: 'TEACHING', title: '面向研究生的 AI 产品分享',
        summary: '以实际项目为案例，讲解从问题定义、模型选择到产品落地与评测迭代的方法。',
        image: './archive/graduate-teaching.jpg', imageAlt: '面向研究生进行 AI 产品课程分享', facts: ['高校课堂', '产品方法', '案例教学'],
      },
      {
        id: 'pku-pitch', type: 'STARTUP PITCH', title: '大学生 AI 创业大赛决赛路演',
        summary: '在创新创业赛事中完成产品价值、用户场景和商业路径的公开路演。',
        image: './archive/pku-pitch.jpg', imageAlt: '大学生 AI 创业大赛路演现场', facts: ['公开路演', '商业化', '团队协作'],
      },
      {
        id: 'campus-sharing', type: 'COMMUNITY', title: 'AI 社团与跨机构分享',
        summary: '组织 AI 社群、工作坊与跨机构活动，将工具使用经验整理为可复用的实践方法。',
        image: './assets/teaching.jpg', imageAlt: 'AI 产品与项目方法分享现场', facts: ['社群组织', '工作坊', '机构合作'],
      },
    ],
  },
  {
    id: 'gallery', code: '07', title: '项目影像索引', en: 'PROJECT IMAGE INDEX', accent: '#8696b8',
    description: `收录原始作品资料中的 ${galleryItems.length} 张图片，按来源目录分类，并保留原始文件名与路径信息。`,
    cover: galleryItems[0]?.image,
    categories: galleryCategories,
    items: galleryItems,
  },
]

export const archiveItemCount = archiveFolders.reduce((total, folder) => total + folder.items.length, 0)

export const selectedEvidence = [
  { image: './archive/language-museum.jpg', label: '空间交互', title: '世界语言博物馆' },
  { image: './assets/monsora-search.jpg', label: '产品系统', title: 'Monsora' },
  { image: './archive/pku-pitch.jpg', label: '创业路演', title: 'AI 产品公开答辩' },
  { image: './archive/cctv-report.jpg', label: '媒体报道', title: 'AI 公益实践' },
]
