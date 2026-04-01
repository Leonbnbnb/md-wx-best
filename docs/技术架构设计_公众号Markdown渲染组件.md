# 技术架构设计：面向微信公众号排版的通用 Markdown 渲染组件

## 1. 文档目的与输入

- 文档目的：在不进入代码实现的前提下，定义组件的技术架构、目录结构规范、编码规范，以及“复制为微信公众号格式”的兼容方案，作为后续实现与验收的统一依据。
- 输入需求文档：当前仓库中需求文档为 [需求分析_公众号Markdown渲染组件.md](file:///c:/Users/gc/Desktop/project/md-wx/docs/%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90_%E5%85%AC%E4%BC%97%E5%8F%B7Markdown%E6%B8%B2%E6%9F%93%E7%BB%84%E4%BB%B6.md)（等价于 requirement_analysis.md 的内容来源）。

## 2. 技术选型（约束：React + Vite）

### 2.1 运行与构建

- UI 框架：React（以函数组件与 Hooks 为主）
- 构建工具：Vite（同时承担本地开发与库模式构建）
- 语言与类型：TypeScript（导出完整的类型定义，降低接入成本）

### 2.2 关键能力选型原则

- Markdown 渲染链路需支持扩展：至少覆盖标题、列表、表格、代码块、引用、图片、链接等，并允许后续增加自定义语法或渲染规则。
- 主题与复制需“同源”：预览用到的主题 token 必须可以无损映射到“公众号可接受的内联样式”，避免出现“预览一致、复制丢样式”。
- 复制能力以兼容性优先：默认输出严格的 HTML/属性/style 白名单子集；对不确定可用的能力一律降级。

### 2.3 包管理策略（统一 npm）

- 单一包管理器：统一使用 npm，禁止 yarn/pnpm 混用；仓库仅提交 package-lock.json。
- Node 版本：采用 LTS（建议 18/20），在 package.json 的 engines 字段声明；团队工具链遵循。
- Workspace：使用 npm workspaces 管理 packages（组件库）与 apps（playground）。
- 安装与一致性：本地开发使用 npm install，CI 使用 npm ci（基于 package-lock 保证可重复）。
- 脚本约定（根级统一聚合）：
  - 格式化与质量：npm run lint、npm run typecheck、npm run test（如后续引入）
  - 构建：npm run build（聚合库与示例），npm run build:lib（仅库），npm run build:play（仅示例）
  - 开发：npm run dev（playground 本地调试）
- 发布约定（仅库）：npm version patch/minor/major → npm publish。发布前必须通过 lint、typecheck、build。

## 3. 总体架构

### 3.1 模块分层

- 领域层（Domain）
  - Theme：主题模型、主题 token、主题切换策略
  - Viewport：手机/桌面视图模型与切换策略
  - Export：将 Markdown/渲染树导出为“公众号兼容 HTML”的规则集合
- 渲染层（UI）
  - Preview：Markdown 预览组件（受控输入，实时渲染）
  - Toolbar：顶部设置按钮（内置）与导出按钮（外置）
- 基础设施层（Infra）
  - Markdown Engine：Markdown 解析/渲染适配
  - Clipboard：复制到剪贴板（text/html + text/plain）
  - Sanitizer：HTML、属性、样式过滤与规范化（白名单）

### 3.2 数据流（关键链路）

- 预览链路
  - Markdown 文本（外部输入）→ Markdown Engine → 渲染模型（AST/Token）→ React 组件树 → 主题/视图适配 → 预览 UI
- 复制链路（公众号兼容）
  - Markdown 文本（外部输入）→ Markdown Engine → 导出渲染模型 → Export 规则生成 HTML → Sanitizer 白名单过滤与归一化 → Clipboard 写入（HTML + 纯文本兜底）

## 4. 组件与模块设计

### 4.1 Preview（预览组件）

- 核心职责
  - 接收外部 Markdown 字符串并实时渲染
  - 支持主题切换与视图切换（受控或非受控）
  - 可配置是否显示内置顶部设置按钮（默认显示）
- 关键约束
  - 默认不执行任意 HTML（防止 XSS）；如需支持原生 HTML，必须经过 Sanitizer 统一过滤后再渲染/导出。

### 4.2 Toolbar（设置按钮：内置 + 导出）

- 内置 Toolbar
  - 默认位于预览区域顶部居中对齐
  - 滚动内容不影响 Toolbar 的可见与交互（固定在预览容器顶部）
  - 图标形态呈现（主题、视图、复制等）
- 导出 Toolbar（外置能力）
  - 以“可复用按钮组件/控制器能力”的形式导出
  - 接入方可自定义按钮的位置、排列、组合方式（例如只用复制按钮）
  - 外置与内置的状态保持一致（同一份 Theme/View/Copy 状态源）

### 4.3 Theme（主题系统）

- 内置 5 个主题（与需求一致）
  1) WeChat Classic（经典微信）
  2) Fresh Minimal（清新简约）
  3) Elegant Serif（典雅衬线）
  4) Comfort Green（护眼墨绿）
  5) Dark Night（暗夜深邃）
- 主题表达方式（架构约束）
  - 预览侧：允许用 CSS 变量/样式表表达（便于交互与复用）
  - 导出侧：必须能从主题 token 生成等价的“内联 style 串”，且只使用公众号可接受的样式子集（见第 7 节）

### 4.4 Viewport（手机/桌面视图）

- 模型：mobile / desktop 两档
- 默认：mobile
- 行为：影响内容区宽度、字号与间距尺度，不改变语义结构与主题选择

### 4.5 Code Block（代码块样式）

- 目标形态
  - 代码块顶部包含 Mac 风格装饰图标（视觉元素）
  - 默认代码配色为 github-dark 风格
- 复制约束
  - 复制后的代码块必须保持可读性（等宽字体、背景、边距/内边距、换行策略明确）
  - 装饰图标在复制输出中允许降级：保留或移除均可，但不能影响代码内容本身的复制正确性

## 5. 对外 API 形态（需求层级的接口定义）

### 5.1 Preview 组件输入

- 必需
  - markdown：Markdown 文本（string）
- 可选（建议维度）
  - defaultTheme：默认主题（默认 WeChat Classic）
  - theme：受控主题（由接入方控制）
  - onThemeChange：主题变化回调
  - defaultViewport：默认视图（默认 mobile）
  - viewport：受控视图
  - onViewportChange：视图变化回调
  - showToolbar：是否显示内置 Toolbar（默认 true）
  - onCopyResult：复制结果回调（成功/失败/原因）

### 5.2 导出能力

- Toolbar 相关
  - ExportedToolbar：可直接渲染的一组按钮（主题/视图/复制）
  - ExportedButtons：单个按钮（仅复制、仅主题等），便于自由组合
- Copy 相关
  - exportToWechatHtml：导出“公众号兼容 HTML”
  - exportToPlainText：导出纯文本（作为复制兜底与日志/审计输出）

## 6. 目录结构规范（库 + 演示/调试）

### 6.1 结构原则

- package（组件库）与 playground（示例/调试）分离，避免将业务逻辑混入库代码
- 按“领域能力”拆分而非按页面拆分，确保组件库可复用、可测试
- 导出面（public API）集中在单一入口，避免深层路径导入导致的破坏性变更

### 6.2 建议目录树

- packages/
  - md-wx-renderer/（NPM 包：组件库）
    - src/
      - index.ts（对外导出入口）
      - preview/（预览组件与布局）
      - toolbar/（内置 Toolbar + 导出按钮）
      - themes/（5 套主题与 token）
      - markdown/（解析/渲染适配层）
      - codeblock/（代码块装饰与样式映射）
      - export/（导出为公众号 HTML 的规则与序列化）
      - sanitizer/（白名单过滤与样式归一化）
      - clipboard/（剪贴板写入与兼容兜底）
      - types/（公共类型）
      - utils/（无业务依赖的工具函数）
- apps/
  - playground/（Vite + React 示例，用于本地调试与手动验收）
- docs/
  - 需求与设计文档

## 7. 编码规范

### 7.1 TypeScript 与 API 稳定性

- 对外导出的类型必须显式声明，避免隐式 any 与推导变化引发的破坏性升级
- 公共类型统一存放并从入口导出，禁止业务侧依赖内部类型文件路径
- 以“可演进”为目标：新增能力优先走可选配置；破坏性变更需通过主版本升级

### 7.2 React 组件规范

- 默认函数组件 + Hooks；避免类组件
- Props 设计遵循：
  - 默认非受控（提供 defaultX）
  - 支持受控（提供 x + onXChange）
  - 不同能力的 props 分组清晰（主题/视图/复制/Toolbar）
- 状态单一数据源：主题、视图、复制策略统一由“控制器层”管理，内置与导出 Toolbar 共享同源状态

### 7.3 样式规范（与复制策略对齐）

- 预览样式允许现代 CSS，但不得依赖“复制时不可表达”的关键布局
- 主题以 token 驱动：
  - token 必须可映射到内联样式（导出链路）
  - token 命名统一（颜色、字号、行高、间距、边框、代码块等）
- 不在主题中引入外部字体资源（导出到公众号后不可控）

### 7.4 安全规范

- 默认禁止 Markdown 中的任意 HTML 直出（防 XSS）
- 所有导出到 clipboard 的 HTML 必须先经过 Sanitizer（白名单）
- 禁止在控制台输出用户内容的完整 HTML（避免泄漏与注入风险）

## 8. “复制为微信公众号格式”的兼容方案（重点）

### 8.1 微信公众号编辑器的关键限制（用于制定策略）

- 样式来源限制：编辑器环境对样式存在过滤，通常不支持 `<style>` 样式块与外部 CSS，实践中以“内联 style”为主要可靠方式。[^wechat-inline-style]
- 脚本与高危标签限制：JavaScript、iframe 等可执行/嵌入类标签不被支持。[^wechat-no-script]
- 列表层级限制：部分工具与实践经验表明，微信对列表层级支持有限，常见约束为最多二级列表。[^wechat-list-level]
- 链接与图片限制（需保守处理）：
  - 部分排版工具指出链接支持存在平台侧限制，建议默认对外链做降级策略。[^wechat-link-limit]
  - 图片粘贴通常要求 https，且粘贴后会走平台侧上传与重写链接流程。[^wechat-image-https]

> 设计原则：由于“公众号编辑器过滤规则可能随版本变化且存在灰度差异”，复制方案必须默认保守；对不确定可用的标签/属性/style 一律降级，确保“完全兼容”优先于“视觉还原”。

### 8.2 复制输出的 HTML 白名单（建议）

- 允许的结构标签（优先选择最基础、普遍可用者）
  - 文本结构：p、br、div、span
  - 标题：h1-h6（如编辑器过滤，降级为 p + 字号/粗体）
  - 强调：strong、em、u、s
  - 引用：blockquote
  - 列表：ul、ol、li（超过二级的嵌套列表降级为“段落 + 缩进”）
  - 代码：pre、code（必要时降级为 pre 内纯文本）
  - 表格：table、tr、td、th（如出现兼容问题，提供降级为“段落/列表”的策略开关）
  - 图片与链接：img、a（链接按策略降级，见 8.4）
- 禁止的标签
  - style、script、iframe、object、embed、link、meta 等
  - 任意 form 相关元素（input、button、textarea 等）
- 属性白名单（最小集合）
  - 通用：style（仅内联）、title
  - 链接：href（按策略过滤/降级）、target（默认移除）、rel（默认移除）
  - 图片：src、alt、width、height（width/height 用于稳定展示，避免某些端异常）
  - 表格：cellpadding、cellspacing、border（如被过滤则不依赖）

### 8.3 内联 style 的属性白名单（建议）

- 文本与排版（优先保留）
  - color、background-color
  - font-size、font-weight、font-style、font-family（仅系统字体集合）
  - line-height、letter-spacing
  - text-align、text-decoration
- 盒模型（谨慎使用）
  - margin、padding（建议只用上/下方向的间距，避免复杂布局）
  - border、border-radius
- 代码块（可读性优先）
  - background-color、color、padding、border-radius、font-family、font-size、line-height、white-space
- 不采用或默认移除（高风险/易被过滤/跨端不一致）
  - position、float、display:flex/grid、transform、animation、filter、backdrop-filter
  - 复杂选择器依赖的 class/id（统一移除）

### 8.4 链接处理策略（“完全兼容”优先）

- 默认策略（保守）
  - 将链接渲染为“带链接样式的文本”，不输出可点击 href；同时在文本中保留 URL（例如括号附带）以保证信息不丢失
- 可选策略（由接入方开启）
  - 仅允许特定域名（例如 mp.weixin.qq.com）保留 href；其余降级为文本
  - 允许全部 https 链接保留 href（但明确标注：存在平台侧过滤/跳转限制的风险）

### 8.5 图片处理策略

- 渲染侧与复制侧统一使用 img 标签输出
- 复制侧要求：
  - src 仅允许 https（或 data: 直接降级为提示文本/占位）
  - 保留 alt，便于可访问性与异常兜底
  - 对过宽图片增加安全的内联样式约束（例如最大宽度、块级展示），避免粘贴后破版

### 8.6 代码块复制策略（与“github-dark + Mac 装饰”协同）

- 预览侧可包含装饰结构
- 复制侧输出采用“结构稳定优先”
  - code 内容必须为纯文本（不含行号 DOM、按钮 DOM）
  - 若高亮 token（span 包裹）在公众号端被过滤或导致样式丢失，则降级为“单色等宽文本 + 背景/边框”
  - Mac 装饰图标：
    - 默认可保留为纯装饰的 span（仅 background-color + border-radius + size）
    - 如出现过滤，允许降级为无装饰

### 8.7 Sanitizer 与归一化（架构要求）

- 任何来源（渲染生成、用户输入原生 HTML、第三方扩展）在进入复制输出前都必须通过 Sanitizer
- Sanitizer 的输出必须满足：
  - 仅使用允许标签/属性/style 白名单
  - 移除 class/id/on* 事件属性
  - 样式归一化（单位、颜色格式、重复属性合并），确保复制后稳定

### 8.8 兼容性验收清单（用于实现后验证）

- 内容维度
  - 标题层级、段落、粗斜体、引用、分割线、列表（含二级嵌套）、表格、图片、链接、代码块（多语言）
  - 超长文章（多图、多表、多代码块）复制粘贴后不崩溃、不大面积丢样式
- 平台维度
  - 公众号后台编辑器（PC）粘贴结果
  - 手机端预览效果（重点：行高、字号、图片适配、代码块可读性）

## 9. 版本与发布策略（架构层面）

- NPM 包发布原则
  - React 与 ReactDOM 作为 peerDependencies，避免重复打包导致的多实例问题
  - 产物包含 ESM/CJS 与类型定义（d.ts）
  - 主题、导出、Sanitizer 规则的变更属于高风险变更，需明确记录并遵循语义化版本

### 9.1 Workspace 与发布流程（基于 npm）

- Workspace 结构：根 package.json 声明 "workspaces": ["packages/*", "apps/*"]，各包独立 scripts 并由根 scripts 聚合。
- 锁文件策略：仅使用 package-lock.json；禁止提交 yarn.lock 或 pnpm-lock.yaml。
- 发布流程（库包）
  - npm ci → npm run lint → npm run typecheck → npm run build:lib → npm version x → npm publish（必要时带 tag）。
  - 发布后同步更新变更日志并在 docs 中记录兼容性注意事项（尤其导出与 Sanitizer 规则）。

---

[^wechat-inline-style]: https://blog.csdn.net/u013688181/article/details/109171307 （实践说明公众号环境通常仅可靠内联样式，`<style>` 样式块不稳定/被过滤）
[^wechat-no-script]: https://docs.pingcode.com/ask/ask-ask/228898.html （提及 JavaScript、iframe 等不予支持）
[^wechat-list-level]: https://markdown.com.cn/editor/ （提及“由于微信原因，最多支持到二级列表”）
[^wechat-link-limit]: https://markdown.com.cn/editor/ （提及“仅支持公众号文章链接… mp.weixin.qq.com”，用于制定默认保守的降级策略）
[^wechat-image-https]: https://markdown.com.cn/editor/ （提及仅支持 https 图片、粘贴到微信会自动上传微信服务器）
