import { galleryCategories, galleryItems } from './gallery-data.js'

const galleryBySource = new Map(galleryItems.map((item) => [item.sourcePath, item]))

function sourceImage(sourcePath) {
  const item = galleryBySource.get(sourcePath)
  if (!item) throw new Error(`项目图片未进入完整索引：${sourcePath}`)
  return item.image
}

const paths = {
  monsoraLibrary: 'OUTPUT管理/output相关材料/02_Monsora产品/001_DOCX_Monsora/004_BASE_Monsora 产品需求池/05_记录附件/002_image.png',
  monsoraProjects: 'OUTPUT管理/output相关材料/02_Monsora产品/001_DOCX_Monsora/004_BASE_Monsora 产品需求池/05_记录附件/003_image.png',
  monsoraProfile: 'OUTPUT管理/output相关材料/02_Monsora产品/001_DOCX_Monsora/004_BASE_Monsora 产品需求池/05_记录附件/004_image.png',
  monsoraGraph: 'OUTPUT管理/output相关材料/13_个人云文档_开头截图/01_产品与Monsora_Orbix/022_Monsora 知识图谱最终视觉设计_资产星图_开头.png',
  monsoraIndex: 'OUTPUT管理/Monsora/MonsoraV2/diagrams/2026-07-17T180000-phase3/c06-c07-index-search.png',
  film1888: 'OUTPUT管理/output相关材料/01_AI知识库/004_DOCX_OUTPUT stuio项目案例⭐/04_项目案例入口文档/002_1888年的春夏秋/01_封面附件/image.png',
  withHerEyes: 'OUTPUT管理/output相关材料/01_AI知识库/004_DOCX_OUTPUT stuio项目案例⭐/04_项目案例入口文档/005_自制AI网剧《带上她的眼睛》/01_封面附件/image.png',
  hidreamSample: 'OUTPUT管理/output相关材料/01_AI知识库/004_DOCX_OUTPUT stuio项目案例⭐/04_项目案例入口文档/008_Lisa mv 二创短片/01_封面附件/Back view of woman in @freedom789_.jpg',
  liminalSteam: 'AIGC视频&互动影游戏/惊悚乐园/steam封面.jpg',
  aigcWorkflow: 'AIGC视频&互动影游戏/科幻科普片/编写aigc工作流.jpg',
  aigcCover: 'AIGC视频&互动影游戏/科幻科普片/科幻.png',
  aigcMillion: 'AIGC视频&互动影游戏/科幻科普片/播放破百万.jpg',
  customsPublic: '海关总署立项/被上海市公共数据开放平台录用.jpg',
  customsProductDetail: '海关总署立项/录用产品详情.jpg',
  customsMeeting: '海关总署立项/与报关协会开会.jpg',
  customsRecommendation: '海关总署立项/海关总署司长推荐信.jpg',
  customsAssociation: '海关总署立项/中国海关协会.jpg',
  customsProjectConnection: '海关总署立项/海关项目对接.jpg',
  baiduPoster: '实习:项目经历/百度和中国计算机学会项目.jpg',
  baiduApproval: '实习:项目经历/项目立项.jpg',
  classTeaching: '创赛商业化/授课课堂.jpg',
  organizationTraining: '创赛商业化/受机构邀请进行ai培训.jpg',
  pkuPitch: '创赛商业化/北大临港大赛路演.jpg',
  graduateTeaching: '创赛商业化/给研究生上课.jpg',
  summitTalk: '创赛商业化/峰会分享.jpg',
  galleryCover: 'AIGC视频&互动影游戏/科幻科普片/科普.png',
}

export const articles = [
  { id: 'hidream-o1', title: 'HiDream-O1-Image-1.5 刷新国产图像生成模型纪录：砍掉 VAE，是图像模型的未来吗？', category: '生成视觉', href: 'https://mp.weixin.qq.com/s/mhMZe2_-VJBAdCue1K4mPQ', image: './articles/hidream-o1.jpg' },
  { id: 'kimi-k27', title: 'Kimi K2.7 Code 有多能打？找 Bug，写 3D 游戏，2000 行代码砍掉 55%', category: '模型评测', href: 'https://mp.weixin.qq.com/s/87Fvkapo430j5_RpZDl6oQ', image: './articles/kimi-k27.jpg' },
  { id: 'openclaw', title: '看屏幕、用键鼠，我的 OpenClaw「睁眼」了', category: '智能体', href: 'https://mp.weixin.qq.com/s/2PZC5PV5Zv-w1clNFcyptw', image: './articles/openclaw.jpg' },
  { id: 'minimax-m3', title: 'MiniMax M3 实测：第一流的模型，已经对执行层动手了', category: '模型评测', href: 'https://mp.weixin.qq.com/s/2TDwOL5LcJWBti93EoORrg', image: './articles/minimax-m3.jpg' },
  { id: 'hidream-open', title: '文生图开源第一易主，但 HiDream-O1-Image 为什么褒贬不一？', category: '生成视觉', href: 'https://mp.weixin.qq.com/s?__biz=MzA5ODEzMjIyMA==&mid=2247735607&idx=1&sn=f2d592f49d7f0f48a6f8c37ffa159766&scene=21#wechat_redirect', image: sourceImage(paths.hidreamSample) },
  { id: 'genflow', title: 'GenFlow 4.0，终于挖开百度网盘的富矿', category: 'AI 产品', href: 'https://mp.weixin.qq.com/s/1MdvRjIO6hj2k1mQzcppaA', image: './articles/genflow.jpg' },
]

const articleItems = articles.map((article) => ({
  ...article,
  type: `AI 科技评论 / ${article.category}`,
  summary: '基于产品实测、资料研究与行业观察形成公开分析，重点讨论模型能力边界、技术路径及其产品化价值。',
  imageAlt: `${article.title}文章封面`,
  facts: [article.category, 'AI 科技评论', '原创署名文章'],
  linkLabel: '阅读原文',
  public: true,
}))

const pressDefinitions = [
  ['shanghai-education-project', '新闻报道/上海教育报道人工智能项目.png', '教育媒体 / 项目', '上海教育：人工智能项目实践报道', '上海教育对人工智能项目的方案、实践过程与育人成果进行公开报道。', ['市级教育媒体', '人工智能项目', '公开报道']],
  ['shanghai-education-team', '新闻报道/上海教育报道项目组.png', '教育媒体 / 团队', '上海教育：跨专业项目团队报道', '报道呈现项目组的跨专业协作方式，以及学生团队参与真实项目的实践过程。', ['项目团队', '跨专业协作', '实践育人']],
  ['customs-college-overview', '新闻报道/上海海关学院报道.jpg', '高校媒体 / 项目', '上海海关学院：关务 AI 项目报道', '学校官方渠道报道关务 AI 项目的立项背景、实践进展与阶段性成果。', ['学校官方报道', '关务 AI', '项目立项']],
  ['customs-college-product', '新闻报道/上海海关学院报道产品.jpg', '高校媒体 / 产品', '上海海关学院：关务产品成果展示', '学校官方报道聚焦关务产品形态与面向业务场景的成果转化。', ['产品成果', '行业应用', '成果转化']],
  ['customs-college-recommendation', '新闻报道/上海海关学院报道企业推荐产品.jpg', '高校媒体 / 产业', '上海海关学院：企业推荐与产品应用', '报道记录企业与行业机构对关务产品方案的评价与推荐。', ['企业推荐', '产业协同', '外部验证']],
  ['customs-college-team', '新闻报道/上海海关学院报道团队.jpg', '高校媒体 / 团队', '上海海关学院：项目团队与协作机制', '报道呈现项目团队分工、跨组织协作与阶段成果。', ['团队协作', '项目推进', '官方报道']],
  ['eastday', '新闻报道/东方网报道.jpg', '综合媒体', '东方网：青年 AI 创新实践报道', '东方网对青年团队开展 AI 产品实践与创新活动进行公开报道。', ['东方网', '青年创新', 'AI 实践']],
  ['strait-investment', '新闻报道/海峡人才报报道政府招商引资.jpg', '行业媒体 / 招商', '海峡人才报：政府招商与项目交流', '海峡人才报记录项目参与地方产业交流与招商对接的过程。', ['海峡人才报', '招商交流', '产业对接']],
  ['strait-collaboration', '新闻报道/海峡人才报报道项目合作.jpg', '行业媒体 / 合作', '海峡人才报：项目合作报道', '报道聚焦项目团队与地方机构围绕应用场景展开合作。', ['项目合作', '机构协同', '公开报道']],
  ['strait-connection', '新闻报道/海峡人才报报道项目对接.jpg', '行业媒体 / 对接', '海峡人才报：项目需求对接', '报道记录项目方案、产业需求与合作资源的现场对接。', ['需求对接', '产业资源', '项目交流']],
  ['strait-result', '新闻报道/海峡人才报报道项目对接成功.jpg', '行业媒体 / 结果', '海峡人才报：项目对接达成阶段成果', '报道记录项目对接取得阶段性成果，并进入进一步合作沟通。', ['阶段成果', '合作推进', '外部验证']],
  ['pudong-event', '新闻报道/浦东促就报道联动字节跳动活动.jpg', '公共服务 / 活动', '浦东促就：联动字节跳动开展 AI 活动', '公共就业服务机构报道团队联动字节跳动生态开展 AI 主题活动。', ['浦东促就', '字节跳动生态', 'AI 活动']],
  ['pudong-event-detail', '新闻报道/浦东就促报道联动字节跳动举办活动.jpg', '公共服务 / 纪实', '浦东就促：AI 主题活动现场纪实', '报道补充呈现活动组织、现场分享与参与者交流情况。', ['活动纪实', '组织协作', '公共服务']],
  ['cctv-public-service', '新闻报道/cctv报道ai活动.jpg', '媒体报道 / 公益', 'CCTV 公益之声：AI 公益活动报道', '媒体报道团队参与的 AI 公益实践，呈现技术在公共议题中的应用。', ['AI 公益', '媒体报道', '公共实践']],
  ['waytoagi-feature', '新闻报道/waytoagi报道.png', '行业社区 / 报道', 'WaytoAGI：AIGC 实践案例报道', 'AI 行业社区对 AIGC 内容生产实践与工作流经验进行报道。', ['WaytoAGI', 'AIGC 实践', '行业社区']],
  ['waytoagi-knowledge', '新闻报道/waytoagi飞书知识库.png', '行业社区 / 知识库', 'WaytoAGI：实践内容进入公开知识库', '相关 AIGC 方法与实践资料被收录至行业社区公开知识库。', ['知识库收录', '方法沉淀', '公开传播']],
  ['ai-tech-review', '新闻报道/ai科技评论发表文章.jpg', '专业媒体 / 署名', 'AI 科技评论：原创署名文章发表', '原创模型评测与 AI 产品分析文章发表于专业科技媒体。', ['原创署名', '模型评测', '专业媒体']],
  ['external-instructor', '新闻报道/学校外聘报道.jpg', '高校媒体 / 教学', '高校报道：受聘创新创业项目指导教师', '学校官方渠道报道参与创新创业教学与项目指导的经历。', ['外聘教师', '创新创业', '项目指导']],
  ['incubator', '新闻报道/炬甄孵化器报道.jpg', '机构媒体 / 孵化', '炬甄孵化器：创新创业实践报道', '孵化机构报道团队参与创业项目辅导、路演与成果转化实践。', ['孵化器', '创业实践', '成果转化']],
]

const pressItems = pressDefinitions.map(([id, sourcePath, type, title, summary, facts]) => ({
  id,
  type,
  title,
  summary,
  image: sourceImage(sourcePath),
  imageAlt: `${title}的报道页面`,
  facts,
  public: true,
}))

export const archiveFolders = [
  {
    id: 'monsora', code: '01', title: 'Monsora 产品系统', en: 'LOCAL-FIRST AI ASSET PLATFORM', accent: '#315eff',
    description: '0→1 负责本地优先的创意资产与 Agent 上下文平台，覆盖需求定义、信息架构、产品验证与技术交付。',
    cover: sourceImage(paths.monsoraLibrary),
    items: [
      {
        id: 'monsora-workspace', type: 'PRODUCT SYSTEM / 2025—2026', title: '创意资产项目库与语义检索工作台',
        summary: '以 Asset–Variant–Version 为核心对象组织项目资产，使创作者能够追踪素材版本、来源、关系与使用状态。',
        image: sourceImage(paths.monsoraProjects), imageAlt: 'Monsora 项目资产库与语义搜索界面',
        facts: ['77 条需求', '32 条内测反馈', '22 个 GWT 用户故事'],
        href: 'https://github.com/yuguangtongchen1/output-code', linkLabel: '查看公开原型', public: true,
      },
      {
        id: 'monsora-graph', type: 'INFORMATION ARCHITECTURE', title: '资产星图与可信关系图谱',
        summary: '用 Vault、Capsule 与资产血缘表达跨文件关系，并保留来源、版本和版权信息，为人和 Agent 提供可解释的上下文。',
        image: sourceImage(paths.monsoraGraph), imageAlt: 'Monsora 资产星图与知识图谱视觉设计',
        facts: ['Vault / Capsule', '资产血缘', '来源与版权追踪'],
      },
      {
        id: 'monsora-local-index', type: 'AGENT INFRASTRUCTURE', title: '本地索引、搜索与 Agent 接口',
        summary: '围绕本地 Daemon 设计索引与检索链路，并以 CLI、MCP 与 Skill 接口让 Agent 在授权范围内读取创意上下文。',
        image: sourceImage(paths.monsoraIndex), imageAlt: 'Monsora 本地索引与搜索链路图',
        facts: ['Local-first', 'CLI / MCP / Skill', 'Run–Candidate–Confirm'],
      },
    ],
  },
  {
    id: 'aigc-production', code: '02', title: 'AIGC 内容生产体系', en: 'AIGC CONTENT PRODUCTION', accent: '#7a5cff',
    description: '在 OUTPUT 参与三部公开作品，并将模型路由、成本记录与长叙事一致性经验沉淀为可复用流程。',
    cover: './archive/liminal-production.png',
    items: [
      {
        id: 'with-her-eyes', type: 'AI FILM / PUBLIC RELEASE', title: '《带上她的眼睛》AIGC 科幻短片',
        summary: '参与脚本拆解、分镜规划、角色一致性与后期合成，在 30 天内完成约 7 分钟长叙事作品。',
        image: sourceImage(paths.withHerEyes), imageAlt: '带上她的眼睛 AIGC 科幻短片主视觉',
        facts: ['约 7 分钟', '30 天交付', '累计播放近 1000 万'],
      },
      {
        id: 'spring-1888', type: 'AI FILM / PUBLIC RELEASE', title: '《1888 年的春夏秋》AI 影像项目',
        summary: '参与视觉风格定义、镜头生产与内容交付，在两周内完成公开作品并接受平台传播验证。',
        image: sourceImage(paths.film1888), imageAlt: '1888 年的春夏秋 AI 影像项目主视觉',
        facts: ['两周交付', '累计播放约 500 万', '平台奖项'],
      },
      {
        id: 'liminal-within', type: 'INTERACTIVE NARRATIVE', title: '《惊悚乐园 / LIMINAL: Within》互动叙事',
        summary: '围绕角色设定、分支叙事与交互机制推进 AI 原生游戏内容，并完成公开页面与发布素材。',
        image: sourceImage(paths.liminalSteam), imageAlt: 'LIMINAL Within 的 Steam 商店主视觉',
        facts: ['首发 48 小时播放 100 万+', 'B 站奖项', 'Steam 页面'],
      },
      {
        id: 'model-routing', type: 'PRODUCTION OPERATIONS', title: '模型路由、成本记录与生产复盘',
        summary: '为不同镜头任务建立模型选择与验收依据，通过连续记录生成成本、返工原因和模型表现提升制作可控性。',
        image: sourceImage(paths.aigcWorkflow), imageAlt: 'AIGC 内容生产工作流与模型使用记录',
        facts: ['23 类模型与 API', '200+ 笔成本记录', '可复用工作流'],
      },
    ],
  },
  {
    id: 'bank-agent', code: '03', title: '中国银行 · 星念织网', en: 'XINGNIAN WEAVE · EXPERT AGENT', accent: '#9f1d34',
    description: '面向复杂金融服务任务设计专家 Agent 方法系统，以六阶段 Loop、状态守卫和运行时台账组织推理、执行与复盘。',
    cover: './archive/xingnian-weave-cover.svg',
    items: [
      {
        id: 'xingnian-system', type: 'AGENT SYSTEM / BANKING / 2024', title: '星念织网：复杂任务决策与执行系统',
        summary: '把复杂任务拆分为可检查的阶段、产物与转移条件，使 Agent 能够在长链路工作中保持目标、证据、风险和执行状态的一致性。',
        image: './archive/xingnian-system-map.svg', imageAlt: '星念织网复杂任务决策与执行系统总览',
        facts: ['6 阶段任务闭环', '47 项运行时产物', '状态机与转移守卫'],
      },
      {
        id: 'xingnian-loop', type: 'PROCESS ARCHITECTURE', title: '《谋主 Loop》六阶段闭环',
        summary: '以接令、联想、研究、规划、指挥、复盘构成完整循环；每次转移由阶段产物守卫，复盘后的 CARRY 指针将未了事项带入下一轮。',
        image: './archive/xingnian-strategy-loop.svg', imageAlt: '谋主 Loop 六阶段任务闭环图',
        facts: ['接令 → 复盘', '产物守卫', 'CARRY 闭环'],
        href: './documents/xingnian-strategy-loop.md', linkLabel: '查看完整《谋主 Loop》', public: true,
      },
      {
        id: 'xingnian-ledger', type: 'RUNTIME SPECIFICATION', title: '《CLAUDE 模板》运行时台账与状态机',
        summary: '用稳定 ID、状态指针和 47 项产物台账保存运行时上下文；所有输入要求溯源，重大风险立即阻塞，连续三次失败触发熔断。',
        image: './archive/xingnian-runtime-ledger.svg', imageAlt: 'CLAUDE 运行时台账与状态机结构',
        facts: ['47 项产物台账', '输入与产物溯源', 'STUCK 3/3 熔断'],
        href: './documents/xingnian-runtime-ledger.md', linkLabel: '查看完整《CLAUDE 模板》', public: true,
      },
    ],
  },
  {
    id: 'customs-agent', code: '04', title: '关务 Agent 与知识工程', en: 'CUSTOMS AGENT & KNOWLEDGE', accent: '#db493c',
    description: '海关总署立项项目：将关务规则、术语与专家判断工程化，完成产品研发、行业验证和成果转化。',
    cover: sourceImage(paths.customsProductDetail),
    items: [
      {
        id: 'customs-public-platform', type: 'PUBLIC PLATFORM', title: '关务产品进入上海市公共数据开放平台',
        summary: '将关务知识产品从项目方案推进到公共数据应用场景，完成公开平台录用与产品展示。',
        image: sourceImage(paths.customsPublic), imageAlt: '关务产品入选上海市公共数据开放平台',
        facts: ['公共平台录用', '关务知识服务', '公开成果'],
      },
      {
        id: 'customs-co-creation', type: 'DOMAIN RESEARCH', title: '海关业务专家与报关协会共创',
        summary: '通过专家访谈、业务评审与行业会议校准术语、规则语境及办事流程，降低通用模型的业务理解偏差。',
        image: sourceImage(paths.customsAssociation), imageAlt: '与海关业务机构开展关务产品交流',
        facts: ['专家访谈', '业务评审', '行业共创'],
      },
      {
        id: 'customs-recommendation', type: 'EXTERNAL VALIDATION', title: '行业主管部门推荐与业务验证',
        summary: '项目获得海关业务与行业机构的外部反馈，用于验证需求真实性、产品价值与后续应用方向。',
        image: sourceImage(paths.customsRecommendation), imageAlt: '海关总署业务专家对项目的推荐材料',
        facts: ['行业推荐', '业务验证', '成果转化'],
      },
      {
        id: 'customs-patent', type: 'PATENT / KNOWLEDGE AS CODE', title: '关务知识工程与发明专利',
        summary: '采用 MDX 与 RAG 组织可维护的规则知识，并围绕关务语言模型部署与业务流程形成发明专利成果。',
        image: './assets/customs-platform.jpg', imageAlt: '关务大模型产品工作台',
        facts: ['MDX + RAG', 'CN120449898A', '发明专利'],
        href: './documents/patent-examination-notice.pdf', linkLabel: '查看公开专利材料', public: true,
      },
    ],
  },
  {
    id: 'baidu-field-ai', code: '05', title: '百度多模态养殖项目', en: 'BAIDU MULTIMODAL FIELD AI', accent: '#f0b94a',
    description: '在真实养殖场景中设计图像与声音采集方案，并以专家判断为基准评估多模态模型的辅助决策价值。',
    cover: sourceImage(paths.baiduPoster),
    items: [
      {
        id: 'baidu-field-study', type: 'FIELD AI / 2025', title: '「养猪吧少年」真实场景调研与采集',
        summary: '围绕猪只健康与状态识别设计样本、采集与标注方案，把模型能力放入真实生产环境中验证。',
        image: sourceImage(paths.baiduPoster), imageAlt: '百度与中国计算机学会多模态养殖项目海报',
        facts: ['100 只猪样本', '图像与声音采集', '真实养殖场景'],
      },
      {
        id: 'baidu-evaluation', type: 'MODEL EVALUATION', title: '多模态模型与专家判断一致性评测',
        summary: '以业务专家结论为参照建立 Top-K 一致性口径，并同步定义 PRD、数据字典和验收标准。',
        image: sourceImage(paths.baiduApproval), imageAlt: '百度多模态项目立项与公开项目页面',
        facts: ['Top-K 一致性', 'PRD 与数据字典', '专家基准'],
      },
    ],
  },
  {
    id: 'commercialization', code: '06', title: '创业商业化与教学实践', en: 'COMMERCIALIZATION & TEACHING', accent: '#9d6b43',
    description: '面向创业团队、高校与公共服务机构开展产品辅导、课程交付和路演验证，连接方法、市场与组织协作。',
    cover: sourceImage(paths.summitTalk),
    items: [
      {
        id: 'entrepreneurship-course', type: 'PRODUCT TRAINING', title: 'AI 产品与创新创业课程交付',
        summary: '以真实项目为案例讲解问题定义、用户验证、模型选择与交付评估，形成结构化训练内容。',
        image: sourceImage(paths.classTeaching), imageAlt: 'AI 产品与创新创业课程现场',
        facts: ['高校课堂', '案例教学', '产品方法'],
      },
      {
        id: 'institutional-training', type: 'INSTITUTIONAL PROGRAM', title: '公共机构 AI 创业培训项目',
        summary: '受机构邀请参与 AI 创业培训，将产品工具与行业案例转化为面向创业者的可执行课程。',
        image: sourceImage(paths.organizationTraining), imageAlt: '受机构邀请开展 AI 创业培训',
        facts: ['机构委托', '创业者培训', '课程交付'],
      },
      {
        id: 'startup-pitch', type: 'COMMERCIAL VALIDATION', title: 'AI 创业项目路演与商业验证',
        summary: '围绕用户价值、产品方案和商业路径完成赛事路演，并将评审反馈用于迭代项目定位。',
        image: sourceImage(paths.pkuPitch), imageAlt: 'AI 创业项目决赛路演现场',
        facts: ['公开路演', '商业模式', '评审验证'],
      },
    ],
  },
  {
    id: 'writing', code: '07', title: 'AI 科技评论', en: 'PUBLISHED AI ANALYSIS', accent: '#315eff',
    description: '六篇原创署名文章，基于实测与研究分析生成视觉、编程模型、智能体和 AI 产品。每篇使用独立文章封面。',
    cover: './archive/ai-review-proof.jpg',
    items: articleItems,
  },
  {
    id: 'press', code: '08', title: '新闻与机构报道', en: 'PRESS & INSTITUTIONAL COVERAGE', accent: '#db493c',
    description: '完整收录现有 19 条媒体与机构报道，覆盖关务项目、AIGC 实践、创业教学与公共活动。',
    cover: sourceImage('新闻报道/上海教育报道人工智能项目.png'),
    items: pressItems,
  },
  {
    id: 'gallery', code: '09', title: '完整项目影像库', en: 'COMPLETE PROJECT IMAGE LIBRARY', accent: '#8696b8',
    description: `收录正式作品资料目录中的 ${galleryItems.length} 张原始项目图片，按来源目录检索并保留文件名；视频不在本网页范围内。`,
    cover: sourceImage(paths.galleryCover),
    categories: galleryCategories,
    items: galleryItems,
  },
]

export const archiveItemCount = archiveFolders.reduce((total, folder) => total + folder.items.length, 0)

export const selectedEvidence = [
  { image: sourceImage(paths.monsoraProfile), label: '产品系统', title: 'Monsora 资产详情与关系视图' },
  { image: sourceImage(paths.aigcMillion), label: '公开传播', title: 'AIGC 科幻科普累计播放破百万' },
  { image: sourceImage(paths.customsProjectConnection), label: '行业验证', title: '与海关业务机构开展项目对接' },
  { image: sourceImage(paths.graduateTeaching), label: '教学实践', title: '面向研究生分享 AI 产品方法' },
]
