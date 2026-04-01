# md-wx-renderer

一个专为微信公众号优化的 Markdown 渲染组件，支持实时预览、多主题切换、响应式设计和一键复制到公众号功能。

## 功能特性

- **实时预览**：输入 Markdown 内容时实时显示预览效果
- **多主题切换**：内置 5 种主题，支持自定义主题
- **响应式设计**：自动适配不同屏幕尺寸
- **代码高亮**：支持 GitHub Dark 风格的代码块高亮
- **一键复制到公众号**：将 Markdown 内容转换为微信公众号兼容的 HTML 格式
- **链接与图片策略**：支持外部链接和图片的处理
- **代码块复制降级**：确保代码块在复制到公众号后仍保持良好的可读性

## 安装

```bash
npm install md-wx-renderer
```

## 快速开始

### 基本使用

```jsx
import { Preview, useViewMode } from 'md-wx-renderer'

function App() {
  const [markdown, setMarkdown] = useState('# Hello, md-wx!')
  const { viewMode, setViewMode } = useViewMode('mobile')

  return (
    <div>
      <textarea 
        value={markdown} 
        onChange={(e) => setMarkdown(e.target.value)} 
      />
      <Preview
        markdown={markdown}
        themeId="t-white"
        viewport={viewMode}
        onViewportChange={setViewMode}
      />
    </div>
  )
}
```

### 导出为微信公众号格式

```jsx
import { exportToWechatHtml, copyToClipboard } from 'md-wx-renderer'

async function handleCopy() {
  const html = exportToWechatHtml({
    markdown: '# Hello, md-wx!',
    theme: 't-white',
    viewport: 'desktop'
  })
  const success = await copyToClipboard(html)
  if (success) {
    alert('复制成功！')
  }
}
```

## 组件 API

### Preview 组件

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| markdown | string | Markdown 内容 | '' |
| themeId | ThemeId | 主题 ID | 't-white' |
| viewport | 'mobile' \| 'desktop' | 视图模式 | 'mobile' |
| showToolbar | boolean | 是否显示工具栏 | true |
| onViewportChange | (viewport: 'mobile' \| 'desktop') => void | 视图模式变化回调 | undefined |

### 主题

内置主题：
- `t-white`：简约白
- `t-juejin`：掘金酱紫
- `t-wechat-dark`：樱花粉
- `t-tech-blue`：科技蓝
- `t-vintage-orange`：复古橙

### 导出 API

#### exportToWechatHtml

```typescript
function exportToWechatHtml({
  markdown: string,
  theme: ThemeId,
  viewport?: 'mobile' | 'desktop',
  options?: {
    sanitize?: boolean,
    inlineStyle?: boolean,
    allowExternalLinks?: boolean,
    maxImageWidth?: string
  }
}): string
```

#### copyToClipboard

```typescript
async function copyToClipboard(html: string): Promise<boolean>
```

## 开发

### 启动开发服务器

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 运行测试

```bash
npm run test
```

## 项目结构

```
md-wx-renderer/
├── packages/
│   └── md-wx-renderer/
│       ├── src/
│       │   ├── components/       # 组件
│       │   ├── export/           # 导出功能
│       │   ├── hooks/            # 自定义 Hook
│       │   ├── preview/          # 预览组件
│       │   ├── themes/           # 主题定义
│       │   └── toolbar/          # 工具栏组件
│       └── package.json
├── apps/
│   └── playground/               #  playground 应用
└── docs/                         # 文档
```

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT
