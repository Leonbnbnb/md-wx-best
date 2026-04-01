export type ThemeId = 't-white' | 't-juejin' | 't-wechat-dark' | 't-tech-blue' | 't-vintage-orange'

export interface ThemeTokens {
  surface: string
  text: string
  headingFont: string
  heading: string
  strong: string
  em: string
  link: string
  linkHover: string
  linkDecoration: 'none' | 'underline'
  quoteBg: string
  quoteBorder: string
  quoteText: string
  listMarker: string
  inlineCodeBg: string
  inlineCodeBorder: string
  inlineCodeText: string
  codeBg: string
  codeBorder: string
  codeText: string
  body: string
  line: string
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string
}

const sans =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans"'

export const THEME_TOKENS: Record<ThemeId, ThemeTokens> = {
  't-white': {
    surface: 'rgba(255,255,255,0.95)',
    text: 'rgba(17,24,39,0.9)',
    headingFont: sans,
    heading: 'rgba(15,23,42,0.94)',
    strong: 'rgba(2,6,23,0.9)',
    em: 'rgba(31,41,55,0.88)',
    link: 'rgba(37,99,235,0.92)',
    linkHover: 'rgba(29,78,216,0.98)',
    linkDecoration: 'underline',
    quoteBg: 'rgba(2,6,23,0.05)',
    quoteBorder: 'rgba(37,99,235,0.7)',
    quoteText: 'rgba(15,23,42,0.84)',
    listMarker: 'rgba(37,99,235,0.85)',
    inlineCodeBg: 'rgba(2,6,23,0.06)',
    inlineCodeBorder: 'rgba(2,6,23,0.1)',
    inlineCodeText: 'rgba(15,23,42,0.86)',
    codeBg: '#0d1117',
    codeBorder: 'rgba(0,0,0,0.12)',
    codeText: 'rgba(201,209,217,0.94)',
    body: '14px',
    line: '1.78',
    h1: '26px',
    h2: '21px',
    h3: '18px',
    h4: '16px',
    h5: '15px',
    h6: '14px',
  },
  't-juejin': {
    surface: 'rgba(248,244,255,0.96)',
    text: 'rgba(30,23,43,0.9)',
    headingFont: sans,
    heading: 'rgba(79,27,118,0.95)',
    strong: 'rgba(64,18,98,0.96)',
    em: 'rgba(88,57,122,0.92)',
    link: 'rgba(126,34,206,0.92)',
    linkHover: 'rgba(107,33,168,0.98)',
    linkDecoration: 'underline',
    quoteBg: 'rgba(126,34,206,0.08)',
    quoteBorder: 'rgba(126,34,206,0.62)',
    quoteText: 'rgba(58,18,91,0.86)',
    listMarker: 'rgba(126,34,206,0.78)',
    inlineCodeBg: 'rgba(126,34,206,0.08)',
    inlineCodeBorder: 'rgba(126,34,206,0.16)',
    inlineCodeText: 'rgba(58,18,91,0.9)',
    codeBg: '#0d1117',
    codeBorder: 'rgba(0,0,0,0.12)',
    codeText: 'rgba(201,209,217,0.94)',
    body: '14px',
    line: '1.78',
    h1: '28px',
    h2: '22px',
    h3: '18px',
    h4: '16px',
    h5: '15px',
    h6: '14px',
  },
  't-wechat-dark': {
    surface: 'rgba(255,244,248,0.96)',
    text: 'rgba(74,29,45,0.9)',
    headingFont: sans,
    heading: 'rgba(190,24,93,0.95)',
    strong: 'rgba(136,19,55,0.96)',
    em: 'rgba(214,31,105,0.9)',
    link: 'rgba(219,39,119,0.92)',
    linkHover: 'rgba(190,24,93,0.98)',
    linkDecoration: 'underline',
    quoteBg: 'rgba(219,39,119,0.08)',
    quoteBorder: 'rgba(219,39,119,0.62)',
    quoteText: 'rgba(94,33,54,0.88)',
    listMarker: 'rgba(219,39,119,0.82)',
    inlineCodeBg: 'rgba(219,39,119,0.08)',
    inlineCodeBorder: 'rgba(219,39,119,0.16)',
    inlineCodeText: 'rgba(88,35,52,0.92)',
    codeBg: '#0d1117',
    codeBorder: 'rgba(0,0,0,0.12)',
    codeText: 'rgba(201,209,217,0.94)',
    body: '14px',
    line: '1.78',
    h1: '28px',
    h2: '22px',
    h3: '18px',
    h4: '16px',
    h5: '15px',
    h6: '14px',
  },
  't-tech-blue': {
    surface: 'rgba(236,252,255,0.94)',
    text: 'rgba(10,32,46,0.9)',
    headingFont: sans,
    heading: 'rgba(8,78,130,0.96)',
    strong: 'rgba(4,55,92,0.96)',
    em: 'rgba(6,95,138,0.9)',
    link: 'rgba(2,132,199,0.92)',
    linkHover: 'rgba(3,105,161,0.98)',
    linkDecoration: 'underline',
    quoteBg: 'rgba(2,132,199,0.08)',
    quoteBorder: 'rgba(2,132,199,0.62)',
    quoteText: 'rgba(8,78,130,0.88)',
    listMarker: 'rgba(2,132,199,0.82)',
    inlineCodeBg: 'rgba(2,132,199,0.08)',
    inlineCodeBorder: 'rgba(2,132,199,0.16)',
    inlineCodeText: 'rgba(8,78,130,0.9)',
    codeBg: '#0d1117',
    codeBorder: 'rgba(0,0,0,0.12)',
    codeText: 'rgba(201,209,217,0.94)',
    body: '14px',
    line: '1.78',
    h1: '28px',
    h2: '22px',
    h3: '18px',
    h4: '16px',
    h5: '15px',
    h6: '14px',
  },
  't-vintage-orange': {
    surface: 'rgba(255,248,238,0.95)',
    text: 'rgba(52,28,14,0.9)',
    headingFont: 'ui-serif, Georgia, "Times New Roman", Times, serif',
    heading: 'rgba(124,45,18,0.95)',
    strong: 'rgba(88,40,18,0.96)',
    em: 'rgba(120,53,15,0.92)',
    link: 'rgba(234,88,12,0.92)',
    linkHover: 'rgba(194,65,12,0.98)',
    linkDecoration: 'underline',
    quoteBg: 'rgba(234,88,12,0.08)',
    quoteBorder: 'rgba(234,88,12,0.62)',
    quoteText: 'rgba(88,40,18,0.86)',
    listMarker: 'rgba(234,88,12,0.82)',
    inlineCodeBg: 'rgba(234,88,12,0.08)',
    inlineCodeBorder: 'rgba(234,88,12,0.16)',
    inlineCodeText: 'rgba(88,40,18,0.9)',
    codeBg: '#0d1117',
    codeBorder: 'rgba(0,0,0,0.12)',
    codeText: 'rgba(201,209,217,0.94)',
    body: '15px',
    line: '1.82',
    h1: '30px',
    h2: '24px',
    h3: '20px',
    h4: '18px',
    h5: '16px',
    h6: '15px',
  },
}

