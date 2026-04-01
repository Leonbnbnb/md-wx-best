import { useState, useEffect } from 'react'
import { Preview, type ThemeId, exportToWechatHtml, copyToClipboard, THEME_TOKENS, useViewMode, ViewModeToggle } from 'md-wx-renderer'
import './App.css'

function App() {
  const [markdown, setMarkdown] = useState(`# md-wx 组件演示

这是一个专为微信公众号优化的 Markdown 渲染组件。

## 功能特性

- 实时预览
- 多主题切换
- 响应式设计
- 代码高亮
- 一键复制到公众号

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, md-wx!');
}
\`\`\`
`)

  const [themeId, setThemeId] = useState<ThemeId>('t-white')
  const [activeTab, setActiveTab] = useState<'preview' | 'export'>('preview')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [copySuccess, setCopySuccess] = useState(false)
  
  // 使用 useViewMode Hook 管理视图模式
  const { viewMode, setViewMode } = useViewMode('mobile')
  
  // 计算是否需要使用上下布局
  const [isVerticalLayout, setIsVerticalLayout] = useState(window.innerWidth < 1024 || (viewMode === 'desktop' && window.innerWidth < 1200))
  const [isAnimating, setIsAnimating] = useState(false)
  
  // 监听窗口大小变化，使用防抖函数确保平滑过渡
  useEffect(() => {
    let resizeTimer: number
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, 100)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])
  
  // 监听窗口大小和视图模式变化，更新布局状态
  useEffect(() => {
    const shouldBeVertical = windowWidth < 1024 || (viewMode === 'desktop' && windowWidth < 1200)
    if (shouldBeVertical !== isVerticalLayout) {
      setIsAnimating(true)
      setIsVerticalLayout(shouldBeVertical)
      // 动画结束后，设置 isAnimating 为 false
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }
  }, [windowWidth, viewMode, isVerticalLayout])
  
  // 获取当前主题
  const currentTheme = THEME_TOKENS[themeId]

  // 获取默认背景颜色（跟预览块颜色一样的蓝色）
  const getThemeBackground = () => {
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  // 处理复制到剪贴板
  const handleCopy = async () => {
    const html = exportToWechatHtml({ markdown, theme: themeId, viewport: viewMode })
    const success = await copyToClipboard(html)
    if (success) {
      setCopySuccess(true)
      // 3秒后隐藏成功提示
      setTimeout(() => {
        setCopySuccess(false)
      }, 3000)
    }
  };

  return (
    <div className="app" style={{ background: getThemeBackground() }}>
      <header className="header">
        <div className="headerContent">
          <div className="themeSelector">
            <label>主题</label>
            <select 
              value={themeId} 
              onChange={(e) => setThemeId(e.target.value as ThemeId)}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                background: 'white',
                color: '#333',
                fontSize: '14px',
                zIndex: 1000
              }}
            >
              <option value="t-white">简约白</option>
              <option value="t-juejin">掘金酱紫</option>
              <option value="t-wechat-dark">樱花粉</option>
              <option value="t-tech-blue">科技蓝</option>
              <option value="t-vintage-orange">复古橙</option>
            </select>
          </div>
          <div className="viewportSelector">
            <label style={{ color: currentTheme.text }}>视图模式</label>
            <div style={{ marginLeft: '8px', display: 'inline-block' }}>
              <ViewModeToggle
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                theme={currentTheme}
              />
            </div>
          </div>
          <div className="tabContainer">
            <button 
              className={`tabButton ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
              style={activeTab === 'preview' ? { 
                background: currentTheme.link, 
                color: 'white', 
                borderColor: currentTheme.link 
              } : {}}
            >
              预览
            </button>
            <button 
              className={`tabButton ${activeTab === 'export' ? 'active' : ''}`}
              onClick={() => setActiveTab('export')}
              style={activeTab === 'export' ? { 
                background: currentTheme.link, 
                color: 'white', 
                borderColor: currentTheme.link 
              } : {}}
            >
              导出预览
            </button>
          </div>
        </div>
        <div className="title">Markdown 微信预览器</div>
        <div className="subtitle">实时预览你的 Markdown 内容在微信中的显示效果</div>
      </header>

      <main className="grid" style={{ 
        display: 'flex',
        flexDirection: isVerticalLayout ? 'column' : 'row',
        gap: '16px',
        overflow: 'hidden',
        padding: '0 24px',
        boxSizing: 'border-box',
        transition: 'all 0.5s ease'
      }}>
        <section className="panel" style={{ 
          background: currentTheme.surface, 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '20px', 
          borderRadius: '12px',
          flex: isVerticalLayout ? '1' : (viewMode === 'desktop' ? 1 : 1),
          transition: 'all 0.5s ease',
          maxWidth: '100%',
          boxSizing: 'border-box',
          transform: isVerticalLayout ? 'translateX(0%)' : 'translateX(0%)',
          animation: isAnimating && isVerticalLayout ? 'slideRight 0.5s ease forwards' : 'none'
        }}>
          <div className="panelTitle" style={{ background: 'transparent', color: currentTheme.heading, marginBottom: '16px', padding: 0 }}>Markdown 输入</div>
          <textarea 
            className="textarea" 
            value={markdown} 
            onChange={(e) => setMarkdown(e.target.value)} 
            spellCheck={false} 
            style={{
              borderRadius: '10px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              padding: '20px',
              flex: 1
            }}
          />
        </section>

        <section className="panel" style={{ 
          background: currentTheme.surface, 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '20px', 
          borderRadius: '12px',
          flex: isVerticalLayout ? '1' : (viewMode === 'desktop' ? 1.8 : 1),
          transition: 'all 0.5s ease',
          maxWidth: '100%',
          boxSizing: 'border-box',
          transform: isVerticalLayout ? 'translateY(0%) scale(1)' : 'translateY(0%) scale(1)',
          animation: isAnimating && isVerticalLayout ? 'slideDownAndGrow 0.5s ease forwards' : 'none'
        }}>
          <div className="panelTitle" style={{ background: 'transparent', color: currentTheme.heading, marginBottom: '16px', padding: 0 }}>预览</div>
          <div className="preview" style={{ 
            flex: 1, 
            padding: 0, 
            display: 'flex', 
            justifyContent: 'center',
            overflowX: 'auto',
            transition: 'all 0.5s ease'
          }}>
            {activeTab === 'preview' ? (
              <Preview
                markdown={markdown}
                showToolbar={false}
                themeId={themeId}
                viewport={viewMode}
                onViewportChange={setViewMode}
              />
            ) : (
              <div className="exportPreview" style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative', gap: '12px' }}>
                  <button
                    onClick={handleCopy}
                    style={{
                      background: currentTheme.link,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      minWidth: '120px'
                    }}
                  >
                    复制到剪贴板
                  </button>
                  <a
                    href="https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token="
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: currentTheme.link,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textDecoration: 'none',
                      minWidth: '140px',
                      textAlign: 'center'
                    }}
                  >
                    去微信公众号编辑器
                  </a>
                  {copySuccess && (
                    <span style={{ position: 'absolute', right: '300px', top: '50%', transform: 'translateY(-50%)', color: 'green', fontSize: '14px', whiteSpace: 'nowrap' }}>
                      复制成功！
                    </span>
                  )}
                </div>
                <pre className="exportCode" style={{ flex: 1, overflow: 'auto', padding: '12px', background: '#f5f5f5', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
                  {exportToWechatHtml({ markdown, theme: themeId, viewport: viewMode })}
                </pre>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
