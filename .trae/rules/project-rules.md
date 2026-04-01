# 项目开发规则（精简版 ≤1000字）

## 1) 技术栈
- TS + React（Hooks），Vite；Node LTS 18/20；现代浏览器。

## 2) 包管理
- 统一 npm + workspaces；仅提交 package-lock.json。
- 脚本：dev/build/build:lib/build:play/lint/typecheck。
- CI 用 npm ci；发布前须 lint/typecheck/build。

## 3) 目录与边界
- packages/md-wx-renderer/src：index.ts、preview/toolbar/themes/markdown/codeblock/export/sanitizer/clipboard/types/utils。
- apps/playground；docs/。
- 仅从 src/index.ts 导出公共 API；按领域划分，禁止深路径引用。

## 4) 代码与样式
- TS 严格（strict、无隐式 any、esModuleInterop）。
- 受/非受控：defaultX 与 x/onXChange；单一状态源管理主题/视图/复制。
- 主题以 --t-* token 驱动，可映射到内联样式。
- 预览可用现代 CSS，但避免复制端不可表达的布局；不引入外部字体。

## 5) 安全与复制
- 默认不直出任意 HTML；统一经 Sanitizer 过滤。
- 白名单标签：p/br/div/span、h1–h6、strong/em/u/s、blockquote、ul/ol/li、pre/code、img、a、table/tr/td/th。
- 内联样式仅限：颜色/字号/行高/字重/字形/对齐/装饰/基础边距与边框；禁用 position/float/flex/grid/transform/animation/filter。
- 链接：默认降级为样式文本；可选仅保留 mp.weixin.qq.com href。
- 图片：仅 https；保留 alt；限制最大宽度。
- 代码块复制：内容纯文本优先；装饰可移除；高亮不可用时降级等宽单色。
- 剪贴板：text/html + text/plain 兜底，提示成功/失败。

## 6) 主题与视图
- 主题：t-white、t-juejin、t-wechat-dark（樱花粉）、t-tech-blue、t-vintage-orange。
- 影响：标题/引用/列表标记/strong/em/链接/行内代码/代码块。
- 视图：mobile 默认 / desktop，仅改版心与尺度。

## 7) Toolbar 与导出
- 内置 🌈/📱💻/📋；支持键盘与 Esc/外部点击。
- 导出按钮能力（单/组合）与内置共用状态；showToolbar 默认 true。

## 8) 质量与验收
- 每步须在 playground 可见；执行 npm run lint、typecheck、build。
- 对照 requirement_analysis 与 设计指南 验收；复制在公众号编辑器抽样验证。

## 9) 版本与发布
- semver；React/ReactDOM 为 peerDependencies。
- 流程：npm ci → lint → typecheck → build:lib → npm version → npm publish。

## 10) 任务执行协议
- 必须引用 task_breakdown 任务编号。
- 严格按该任务范围执行；完成即停，等待确认；不要自动进行下一步。
- 如需清理超范围代码，按指令执行；收到“停止/不要自动下一步”必须停止。
- 有疑问先询问，不自行决定。
