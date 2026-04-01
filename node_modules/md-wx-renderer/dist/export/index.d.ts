import { ThemeId } from '../themes/tokens';
interface ExportOptions {
    sanitize?: boolean;
    inlineStyle?: boolean;
    allowExternalLinks?: boolean;
    maxImageWidth?: string;
}
interface ExportToWechatHtmlProps {
    markdown: string;
    theme: ThemeId;
    viewport?: 'mobile' | 'desktop';
    options?: ExportOptions;
}
export declare function exportToWechatHtml({ markdown, theme, viewport, options }: ExportToWechatHtmlProps): string;
export declare function copyToClipboard(html: string): Promise<boolean>;
export {};
