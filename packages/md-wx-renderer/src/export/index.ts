import { ThemeId, THEME_TOKENS } from '../themes/tokens'

// 白名单标签，基于微信公众平台支持的标签
const ALLOWED_TAGS = new Set([
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'ul',
  'ol',
  'li',
  'a',
  'code',
  'pre',
  'br',
  'strong',
  'em',
  'img'
])

// 白名单属性
const ALLOWED_ATTRIBUTES = new Set([
  'href',
  'target',
  'rel',
  'src',
  'alt',
  'style'
])

interface ExportOptions {
  sanitize?: boolean
  inlineStyle?: boolean
  allowExternalLinks?: boolean
  maxImageWidth?: string
}

interface ExportToWechatHtmlProps {
  markdown: string
  theme: ThemeId
  viewport?: 'mobile' | 'desktop'
  options?: ExportOptions
}

export function exportToWechatHtml({
  markdown,
  theme,
  viewport = 'desktop',
  options = {}
}: ExportToWechatHtmlProps): string {
  const {
    allowExternalLinks = false,
    maxImageWidth = '100%'
  } = options
  // 获取主题 tokens
  const themeTokens = THEME_TOKENS[theme]
  
  // 简单的 Markdown 解析和 HTML 生成
  // 注意：这是一个简化的实现，实际项目中可能需要更复杂的解析
  let html = ''
  const lines = markdown.split('\n')
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i]?.trim() || ''
    
    // 处理标题
    if (line.startsWith('#')) {
      const match = line.match(/^#+/)
      if (match) {
        const level = match[0].length
        const text = line.slice(level).trim()
        html += `<h${level}>${text}</h${level}>`
      }
    }
    // 处理代码块
    else if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      i++
      const codeLines: string[] = []
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      const code = codeLines.join('\n')
      html += `<pre><code>${escapeHtml(code)}</code></pre>`
    }
    // 处理引用
    else if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i]?.trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().slice(1).trim())
        i++
      }
      const quote = quoteLines.join('\n')
      html += `<blockquote>${quote}</blockquote>`
      continue
    }
    // 处理列表
    else if (line.match(/^\d+\.\s/)) {
      // 有序列表
      const listItems: string[] = []
      while (i < lines.length && lines[i]?.trim().match(/^\d+\.\s/)) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      html += '<ol>'
      for (const item of listItems) {
        html += `<li>${item}</li>`
      }
      html += '</ol>'
      continue
    }
    else if (line.match(/^[-*+]\s/)) {
      // 无序列表
      const listItems: string[] = []
      while (i < lines.length && lines[i]?.trim().match(/^[-*+]\s/)) {
        listItems.push(lines[i].trim().replace(/^[-*+]\s/, ''))
        i++
      }
      html += '<ul>'
      for (const item of listItems) {
        html += `<li>${item}</li>`
      }
      html += '</ul>'
      continue
    }
    // 处理空行
    else if (line === '') {
      // 空行，跳过
    }
    // 处理普通段落
    else {
      // 处理行内元素（粗体、斜体、行内代码、链接、图片）
      let paragraph = line
      // 处理粗体
      paragraph = paragraph.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // 处理斜体
      paragraph = paragraph.replace(/\*(.+?)\*/g, '<em>$1</em>')
      // 处理行内代码
      paragraph = paragraph.replace(/`(.+?)`/g, '<code>$1</code>')
      // 处理链接
      paragraph = paragraph.replace(/\[(.+?)\]\((.+?)\)/g, (match, text, url) => {
        if (allowExternalLinks || url.startsWith('https://mp.weixin.qq.com')) {
          return `<a href="${url}" target="_blank" rel="noreferrer">${text}</a>`
        } else {
          // 降级为样式化文本
          return `<span style="color: ${themeTokens.link}; text-decoration: ${themeTokens.linkDecoration}; text-underline-offset: 3px;">${text}</span>`
        }
      })
      // 处理图片
      paragraph = paragraph.replace(/!\[(.+?)\]\((.+?)\)/g, (match, alt, url) => {
        if (url.startsWith('https://')) {
          return `<img src="${url}" alt="${alt}" style="max-width: ${maxImageWidth}; height: auto; margin: 10px 0;" />`
        } else {
          // 降级为文本
          return `[图片: ${alt}]`
        }
      })
      html += `<p>${paragraph}</p>`
    }
    
    i++
  }
  
  // 应用白名单过滤
  if (options.sanitize !== false) {
    html = sanitizeHtml(html)
  }
  
  // 应用内联样式
  if (options.inlineStyle !== false) {
    html = applyInlineStyles(html, themeTokens)
  }
  
  return html
}

// 转义 HTML 特殊字符
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 白名单过滤和归一化
function sanitizeHtml(html: string): string {
  // 更完善的白名单过滤实现
  let sanitized = html
  
  // 移除不允许的标签
  const allowedTagsPattern = Array.from(ALLOWED_TAGS).join('|')
  // 匹配所有标签，然后只保留允许的标签
  sanitized = sanitized.replace(/<([a-z][a-z0-9]*)[^>]*>(.*?)<\/\1>/gi, (match, tag, content) => {
    if (ALLOWED_TAGS.has(tag.toLowerCase())) {
      // 保留允许的标签，但需要过滤属性
      let filteredTag = `<${tag}`
      // 提取并过滤属性
      const attributes = match.match(/([a-z][a-z0-9]*)(?:\s*=\s*["']([^"']*)["'])?/gi)
      if (attributes) {
        for (const attr of attributes) {
          const attrMatch = attr.match(/([a-z][a-z0-9]*)(?:\s*=\s*["']([^"']*)["'])?/i)
          if (attrMatch && ALLOWED_ATTRIBUTES.has(attrMatch[1].toLowerCase())) {
            filteredTag += ` ${attrMatch[1]}`
            if (attrMatch[2]) {
              filteredTag += `="${attrMatch[2]}"`
            }
          }
        }
      }
      filteredTag += `>${content}</${tag}>`
      return filteredTag
    } else {
      // 移除不允许的标签，只保留内容
      return content
    }
  })
  
  // 移除不允许的自闭合标签
  sanitized = sanitized.replace(/<([a-z][a-z0-9]*)[^>]*\/>/gi, (match, tag) => {
    if (ALLOWED_TAGS.has(tag.toLowerCase())) {
      return match
    } else {
      return ''
    }
  })
  
  // 移除 script 标签和内容
  sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '')
  
  // 移除事件属性
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
  
  // 移除 class 和 id 属性
  sanitized = sanitized.replace(/(class|id)\s*=\s*["'][^"']*["']/gi, '')
  
  return sanitized
}

// 应用内联样式
function applyInlineStyles(html: string, themeTokens: typeof THEME_TOKENS[keyof typeof THEME_TOKENS]): string {
  // 内联样式生成，将主题 token 映射为每类元素的内联 style
  let styled = html
  
  // 应用段落样式
  styled = styled.replace(/<p>(.*?)<\/p>/g, `<p style="font-size: ${themeTokens.body}; line-height: ${themeTokens.line}; color: ${themeTokens.text}; margin: 10px 0;">$1</p>`)
  
  // 应用标题样式
  for (let i = 1; i <= 6; i++) {
    styled = styled.replace(
      new RegExp(`<h${i}>(.*?)<\\/h${i}>`, 'g'),
      `<h${i} style="font-size: ${themeTokens[`h${i}` as keyof typeof themeTokens]}; font-family: ${themeTokens.headingFont}; color: ${themeTokens.heading}; margin-top: 16px; margin-bottom: 8px; font-weight: 700;">$1</h${i}>`
    )
  }
  
  // 应用引用样式
  styled = styled.replace(/<blockquote>(.*?)<\/blockquote>/g, `<blockquote style="background: ${themeTokens.quoteBg}; border-left: 4px solid ${themeTokens.quoteBorder}; padding: 12px; margin: 12px 0; color: ${themeTokens.quoteText}; border-radius: 8px;">$1</blockquote>`)
  
  // 应用无序列表样式
  styled = styled.replace(/<ul>(.*?)<\/ul>/g, `<ul style="margin: 10px 0; padding-left: 20px;">$1</ul>`)
  
  // 应用有序列表样式
  styled = styled.replace(/<ol>(.*?)<\/ol>/g, `<ol style="margin: 10px 0; padding-left: 24px;">$1</ol>`)
  
  // 应用列表项样式
  styled = styled.replace(/<li>(.*?)<\/li>/g, `<li style="margin: 4px 0; color: ${themeTokens.text};">$1</li>`)
  
  // 应用链接样式
  styled = styled.replace(/<a href="(.*?)" target="_blank" rel="noreferrer">(.*?)<\/a>/g, `<a href="$1" target="_blank" rel="noreferrer" style="color: ${themeTokens.link}; text-decoration: ${themeTokens.linkDecoration}; text-underline-offset: 3px;">$2</a>`)
  
  // 应用行内代码样式
  styled = styled.replace(/<code>(.*?)<\/code>/g, `<code style="background: ${themeTokens.inlineCodeBg}; border: 1px solid ${themeTokens.inlineCodeBorder}; color: ${themeTokens.inlineCodeText}; border-radius: 4px; padding: 2px 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; font-size: 0.9em;">$1</code>`)
  
  // 应用代码块样式
  styled = styled.replace(/<pre><code>(.*?)<\/code><\/pre>/g, `<pre style="background: ${themeTokens.inlineCodeBg}; border: 1px solid ${themeTokens.inlineCodeBorder}; border-radius: 8px; padding: 12px; margin: 12px 0; overflow-x: auto;"><code style="color: ${themeTokens.inlineCodeText}; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; font-size: 12.5px; line-height: 1.4;">$1</code></pre>`)
  
  // 应用粗体样式
  styled = styled.replace(/<strong>(.*?)<\/strong>/g, `<strong style="color: ${themeTokens.strong}; font-weight: 700;">$1</strong>`)
  
  // 应用斜体样式
  styled = styled.replace(/<em>(.*?)<\/em>/g, `<em style="color: ${themeTokens.em}; font-style: italic;">$1</em>`)
  
  return styled
}

// 剪贴板写入（text/html + text/plain 兜底）
export async function copyToClipboard(html: string): Promise<boolean> {
  try {
    // 尝试使用 Clipboard API 写入 HTML
    if (navigator.clipboard && navigator.clipboard.write) {
      const blob = new Blob([html], { type: 'text/html' })
      const item = new ClipboardItem({ 'text/html': blob })
      await navigator.clipboard.write([item])
      return true
    }
    
    // 降级方案 1：使用 document.execCommand('copy')
    if (document.execCommand) {
      // 创建一个临时的 div 元素
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      tempDiv.style.position = 'fixed'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '-9999px'
      document.body.appendChild(tempDiv)
      
      // 选择并复制内容
      const range = document.createRange()
      range.selectNodeContents(tempDiv)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
        const success = document.execCommand('copy')
        document.body.removeChild(tempDiv)
        return success
      }
      document.body.removeChild(tempDiv)
    }
    
    // 降级方案 2：复制纯文本
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // 提取纯文本
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      const text = tempDiv.textContent || tempDiv.innerText || ''
      await navigator.clipboard.writeText(text)
      return true
    }
    
    return false
  } catch (error) {
    console.error('复制到剪贴板失败:', error)
    return false
  }
}
