import { Fragment as e, useCallback as t, useEffect as n, useMemo as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/themes/tokens.ts
var l = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\"", u = {
	"t-white": {
		surface: "rgba(255,255,255,0.95)",
		text: "rgba(17,24,39,0.9)",
		headingFont: l,
		heading: "rgba(15,23,42,0.94)",
		strong: "rgba(2,6,23,0.9)",
		em: "rgba(31,41,55,0.88)",
		link: "rgba(37,99,235,0.92)",
		linkHover: "rgba(29,78,216,0.98)",
		linkDecoration: "underline",
		quoteBg: "rgba(2,6,23,0.05)",
		quoteBorder: "rgba(37,99,235,0.7)",
		quoteText: "rgba(15,23,42,0.84)",
		listMarker: "rgba(37,99,235,0.85)",
		inlineCodeBg: "rgba(2,6,23,0.06)",
		inlineCodeBorder: "rgba(2,6,23,0.1)",
		inlineCodeText: "rgba(15,23,42,0.86)",
		codeBg: "#0d1117",
		codeBorder: "rgba(0,0,0,0.12)",
		codeText: "rgba(201,209,217,0.94)",
		body: "14px",
		line: "1.78",
		h1: "26px",
		h2: "21px",
		h3: "18px",
		h4: "16px",
		h5: "15px",
		h6: "14px"
	},
	"t-juejin": {
		surface: "rgba(248,244,255,0.96)",
		text: "rgba(30,23,43,0.9)",
		headingFont: l,
		heading: "rgba(79,27,118,0.95)",
		strong: "rgba(64,18,98,0.96)",
		em: "rgba(88,57,122,0.92)",
		link: "rgba(126,34,206,0.92)",
		linkHover: "rgba(107,33,168,0.98)",
		linkDecoration: "underline",
		quoteBg: "rgba(126,34,206,0.08)",
		quoteBorder: "rgba(126,34,206,0.62)",
		quoteText: "rgba(58,18,91,0.86)",
		listMarker: "rgba(126,34,206,0.78)",
		inlineCodeBg: "rgba(126,34,206,0.08)",
		inlineCodeBorder: "rgba(126,34,206,0.16)",
		inlineCodeText: "rgba(58,18,91,0.9)",
		codeBg: "#0d1117",
		codeBorder: "rgba(0,0,0,0.12)",
		codeText: "rgba(201,209,217,0.94)",
		body: "14px",
		line: "1.78",
		h1: "28px",
		h2: "22px",
		h3: "18px",
		h4: "16px",
		h5: "15px",
		h6: "14px"
	},
	"t-wechat-dark": {
		surface: "rgba(255,244,248,0.96)",
		text: "rgba(74,29,45,0.9)",
		headingFont: l,
		heading: "rgba(190,24,93,0.95)",
		strong: "rgba(136,19,55,0.96)",
		em: "rgba(214,31,105,0.9)",
		link: "rgba(219,39,119,0.92)",
		linkHover: "rgba(190,24,93,0.98)",
		linkDecoration: "underline",
		quoteBg: "rgba(219,39,119,0.08)",
		quoteBorder: "rgba(219,39,119,0.62)",
		quoteText: "rgba(94,33,54,0.88)",
		listMarker: "rgba(219,39,119,0.82)",
		inlineCodeBg: "rgba(219,39,119,0.08)",
		inlineCodeBorder: "rgba(219,39,119,0.16)",
		inlineCodeText: "rgba(88,35,52,0.92)",
		codeBg: "#0d1117",
		codeBorder: "rgba(0,0,0,0.12)",
		codeText: "rgba(201,209,217,0.94)",
		body: "14px",
		line: "1.78",
		h1: "28px",
		h2: "22px",
		h3: "18px",
		h4: "16px",
		h5: "15px",
		h6: "14px"
	},
	"t-tech-blue": {
		surface: "rgba(236,252,255,0.94)",
		text: "rgba(10,32,46,0.9)",
		headingFont: l,
		heading: "rgba(8,78,130,0.96)",
		strong: "rgba(4,55,92,0.96)",
		em: "rgba(6,95,138,0.9)",
		link: "rgba(2,132,199,0.92)",
		linkHover: "rgba(3,105,161,0.98)",
		linkDecoration: "underline",
		quoteBg: "rgba(2,132,199,0.08)",
		quoteBorder: "rgba(2,132,199,0.62)",
		quoteText: "rgba(8,78,130,0.88)",
		listMarker: "rgba(2,132,199,0.82)",
		inlineCodeBg: "rgba(2,132,199,0.08)",
		inlineCodeBorder: "rgba(2,132,199,0.16)",
		inlineCodeText: "rgba(8,78,130,0.9)",
		codeBg: "#0d1117",
		codeBorder: "rgba(0,0,0,0.12)",
		codeText: "rgba(201,209,217,0.94)",
		body: "14px",
		line: "1.78",
		h1: "28px",
		h2: "22px",
		h3: "18px",
		h4: "16px",
		h5: "15px",
		h6: "14px"
	},
	"t-vintage-orange": {
		surface: "rgba(255,248,238,0.95)",
		text: "rgba(52,28,14,0.9)",
		headingFont: "ui-serif, Georgia, \"Times New Roman\", Times, serif",
		heading: "rgba(124,45,18,0.95)",
		strong: "rgba(88,40,18,0.96)",
		em: "rgba(120,53,15,0.92)",
		link: "rgba(234,88,12,0.92)",
		linkHover: "rgba(194,65,12,0.98)",
		linkDecoration: "underline",
		quoteBg: "rgba(234,88,12,0.08)",
		quoteBorder: "rgba(234,88,12,0.62)",
		quoteText: "rgba(88,40,18,0.86)",
		listMarker: "rgba(234,88,12,0.82)",
		inlineCodeBg: "rgba(234,88,12,0.08)",
		inlineCodeBorder: "rgba(234,88,12,0.16)",
		inlineCodeText: "rgba(88,40,18,0.9)",
		codeBg: "#0d1117",
		codeBorder: "rgba(0,0,0,0.12)",
		codeText: "rgba(201,209,217,0.94)",
		body: "15px",
		line: "1.82",
		h1: "30px",
		h2: "24px",
		h3: "20px",
		h4: "18px",
		h5: "16px",
		h6: "15px"
	}
};
//#endregion
//#region src/preview/Preview.tsx
function d(e, t) {
	let n = e.replaceAll("\r\n", "\n").split("\n"), r = [], i = 0, a = () => {
		for (; i < n.length && n[i].trim() === "";) i += 1;
	}, o = () => {
		let e = (n[i] ?? "").trim().slice(3).trim();
		i += 1;
		let t = [];
		for (; i < n.length && !n[i].trim().startsWith("```");) t.push(n[i]), i += 1;
		i < n.length && (i += 1), r.push({
			type: "code",
			lang: e,
			code: t.join("\n")
		});
	}, s = (e) => {
		let t = [];
		for (; i < n.length;) {
			let r = n[i] ?? "", a = e ? r.match(/^\s*\d+\.\s+(.*)$/) : r.match(/^\s*[-*+]\s+(.*)$/);
			if (!a) break;
			t.push(a[1] ?? ""), i += 1;
		}
		r.push({
			type: e ? "ol" : "ul",
			items: t
		});
	}, c = () => {
		let e = [];
		for (; i < n.length;) {
			let t = (n[i] ?? "").match(/^\s*>\s?(.*)$/);
			if (!t) break;
			e.push(t[1] ?? ""), i += 1;
		}
		r.push({
			type: "blockquote",
			lines: e
		});
	}, l = () => {
		let e = [];
		for (; i < n.length;) {
			let t = n[i] ?? "";
			if (t.trim() === "" || t.trim().startsWith("```") || /^\s*#{1,6}\s+/.test(t) || /^\s*>\s?/.test(t) || /^\s*[-*+]\s+/.test(t) || /^\s*\d+\.\s+/.test(t)) break;
			e.push(t), i += 1;
		}
		let a = e.join(" ");
		t && /<[^>]+>/.test(a) ? r.push({
			type: "html",
			html: a
		}) : r.push({
			type: "paragraph",
			text: a
		});
	};
	for (; i < n.length && (a(), !(i >= n.length));) {
		let e = n[i] ?? "";
		if (e.trim().startsWith("```")) {
			o();
			continue;
		}
		let t = e.match(/^(#{1,6})\s+(.*)$/);
		if (t) {
			r.push({
				type: "heading",
				level: t[1].length,
				text: t[2] ?? ""
			}), i += 1;
			continue;
		}
		if (/^\s*>\s?/.test(e)) {
			c();
			continue;
		}
		if (/^\s*[-*+]\s+/.test(e)) {
			s(!1);
			continue;
		}
		if (/^\s*\d+\.\s+/.test(e)) {
			s(!0);
			continue;
		}
		l();
	}
	return r;
}
function f(e) {
	let t = e ?? "";
	t = t.replace(/<script[\s\S]*?<\/script>/gi, ""), t = t.replace(/<style[\s\S]*?<\/style>/gi, ""), t = t.replace(/<iframe[\s\S]*?<\/iframe>/gi, ""), t = t.replace(/\s+on[a-z]+=(["']).*?\1/gi, ""), t = t.replace(/\s+href=(["'])\s*javascript:[\s\S]*?\1/gi, ""), t = t.replace(/\s+src=(["'])\s*javascript:[\s\S]*?\1/gi, "");
	let n = /^(p|br|div|span|strong|em|u|s|blockquote|ul|ol|li|pre|code|a|h[1-6])$/i;
	return t = t.replace(/<\s*(\/)?\s*([a-z0-9-]+)([^>]*)>/gi, (e, t, r, i) => {
		let a = !!t;
		if (!n.test(r)) return e.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		if (/^a$/i.test(r)) {
			let e = i.match(/\s+href=(["'])([\s\S]*?)\1/i), t = e ? ` href="${e[2]}"` : "";
			return a ? `</${r}>` : `<${r}${t}>`;
		}
		return a ? `</${r}>` : `<${r}>`;
	}), t;
}
function p(e) {
	let t = !!e.allowHtml, n = r(() => d(e.markdown, t), [e.markdown, t]), i = (e.viewport || e.defaultViewport || "mobile") === "mobile", a = e.showToolbar !== !1, o = u[e.themeId || "t-white"], l = {
		"--t-surface": o.surface,
		"--t-text": o.text,
		"--t-heading": o.heading,
		"--t-heading-font": o.headingFont,
		"--t-strong": o.strong,
		"--t-em": o.em,
		"--t-link": o.link,
		"--t-link-hover": o.linkHover,
		"--t-link-decoration": o.linkDecoration,
		"--t-quote-bg": o.quoteBg,
		"--t-quote-border": o.quoteBorder,
		"--t-quote-text": o.quoteText,
		"--t-list-marker": o.listMarker,
		"--t-inline-code-bg": o.inlineCodeBg,
		"--t-inline-code-border": o.inlineCodeBorder,
		"--t-inline-code-text": o.inlineCodeText,
		"--t-code-bg": o.codeBg,
		"--t-code-border": o.codeBorder,
		"--t-code-text": o.codeText,
		"--t-body": o.body,
		"--t-line": o.line,
		"--t-h1": o.h1,
		"--t-h2": o.h2,
		"--t-h3": o.h3,
		"--t-h4": o.h4,
		"--t-h5": o.h5,
		"--t-h6": o.h6
	};
	return /* @__PURE__ */ s("div", {
		style: {
			position: "relative",
			width: "100%",
			display: "flex",
			justifyContent: "center"
		},
		children: /* @__PURE__ */ s("div", {
			style: {
				display: "grid",
				placeItems: "center",
				width: "100%"
			},
			children: /* @__PURE__ */ c("div", {
				style: {
					width: i ? 380 : 820,
					maxWidth: "100%",
					borderRadius: i ? 44 : 22,
					border: "1px solid rgba(0,0,0,0.1)",
					background: "var(--t-surface)",
					padding: i ? 14 : 12,
					position: "relative",
					boxShadow: "0 26px 80px rgba(0,0,0,0.12)",
					transition: "all 0.5s ease",
					overflowX: "auto",
					...l
				},
				children: [i ? /* @__PURE__ */ s("div", { style: {
					position: "absolute",
					top: 10,
					left: "50%",
					transform: "translateX(-50%)",
					width: 132,
					height: 28,
					borderRadius: 999,
					background: "rgba(0,0,0,0.12)",
					border: "1px solid rgba(0,0,0,0.08)"
				} }) : null, /* @__PURE__ */ c("div", {
					style: {
						borderRadius: i ? 32 : 16,
						border: "1px solid rgba(0,0,0,0.08)",
						overflow: "hidden"
					},
					children: [a ? /* @__PURE__ */ s("div", {
						style: {
							position: "sticky",
							top: 0,
							display: "flex",
							justifyContent: "center",
							padding: "8px 0",
							background: "rgba(0,0,0,0.04)",
							borderBottom: "1px solid rgba(0,0,0,0.08)"
						},
						children: e.toolbar
					}) : null, /* @__PURE__ */ s("div", {
						style: {
							padding: 16,
							fontSize: "var(--t-body)",
							lineHeight: "var(--t-line)",
							color: "var(--t-text)",
							transition: "color 240ms ease"
						},
						children: n.map((e, t) => e.type === "heading" ? /* @__PURE__ */ c(`h${e.level}`, {
							style: {
								color: "var(--t-heading)",
								fontFamily: "var(--t-heading-font)",
								fontSize: `var(--t-h${e.level})`,
								letterSpacing: .2,
								transition: "color 240ms ease",
								display: "flex",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ s("span", { style: {
								width: "4px",
								height: "1.2em",
								background: "var(--t-link)",
								marginRight: "12px",
								borderRadius: "2px"
							} }), h(e.text, o)]
						}, t) : e.type === "blockquote" ? /* @__PURE__ */ s("blockquote", {
							style: {
								margin: "12px 0",
								padding: "10px 12px",
								borderLeft: "4px solid var(--t-quote-border)",
								background: "var(--t-quote-bg)",
								borderRadius: 10,
								color: "var(--t-quote-text)",
								transition: "background 240ms ease, color 240ms ease, border-color 240ms ease"
							},
							children: e.lines.map((e, t) => /* @__PURE__ */ s("p", {
								style: {
									margin: 0,
									lineHeight: 1.6
								},
								children: h(e, o)
							}, t))
						}, t) : e.type === "ul" ? /* @__PURE__ */ s("ul", {
							style: {
								margin: "10px 0",
								paddingLeft: 20,
								color: "var(--t-list-marker)"
							},
							children: e.items.map((e, t) => /* @__PURE__ */ s("li", {
								style: {
									margin: "6px 0",
									color: "var(--t-text)"
								},
								children: h(e, o)
							}, t))
						}, t) : e.type === "ol" ? /* @__PURE__ */ s("ol", {
							style: {
								margin: "10px 0",
								paddingLeft: 20,
								color: "var(--t-list-marker)"
							},
							children: e.items.map((e, t) => /* @__PURE__ */ s("li", {
								style: {
									margin: "6px 0",
									color: "var(--t-text)"
								},
								children: h(e, o)
							}, t))
						}, t) : e.type === "code" ? /* @__PURE__ */ s("div", {
							style: {
								margin: "12px 0",
								padding: 12,
								borderRadius: 10,
								background: "#1e1e1e",
								border: "1px solid rgba(0,0,0,0.12)",
								overflow: "auto"
							},
							children: /* @__PURE__ */ s("pre", {
								style: {
									margin: 0,
									whiteSpace: "pre",
									fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
									fontSize: 12.5,
									color: "#e6e6e6",
									background: "#1e1e1e"
								},
								children: m(e.code, e.lang)
							})
						}, t) : e.type === "html" ? /* @__PURE__ */ s("div", { dangerouslySetInnerHTML: { __html: f(e.html) } }, t) : /* @__PURE__ */ s("p", {
							style: { margin: "10px 0" },
							children: h(e.text, o)
						}, t))
					})]
				})]
			})
		})
	});
}
function m(t, n) {
	let r = [], i = 0, a = 0, c = (t) => {
		t && r.push(/* @__PURE__ */ s(e, { children: t }, `t-${a++}`));
	}, l = (t) => {
		r.push(/* @__PURE__ */ s(e, { children: t }, `n-${a++}`));
	};
	if (n === "js" || n === "ts" || n === "javascript" || n === "typescript" || n === "tsx" || n === "jsx") {
		i = 0;
		let e = /\b(const|let|var|function|return|if|else|for|while|switch|case|default|class|export|import|from|async|await|try|catch|finally|type|interface|enum|namespace|module|public|private|protected|static|readonly)\b/g;
		e.lastIndex = 0;
		let n;
		for (; n = e.exec(t);) {
			let e = n.index;
			e > i && c(t.slice(i, e)), l(/* @__PURE__ */ s("span", {
				style: { color: "#569cd6" },
				children: n[0]
			})), i = e + n[0].length;
		}
		let r = /('([^'\\]|\\.)*')|("([^"\\]|\\.)*")|(`([^`\\]|\\.)*`)/g;
		for (r.lastIndex = 0; n = r.exec(t);) {
			let e = n.index;
			e > i && c(t.slice(i, e)), l(/* @__PURE__ */ s("span", {
				style: { color: "#ce9178" },
				children: n[0]
			})), i = e + n[0].length;
		}
		let a = /\/\/.*$/gm;
		for (a.lastIndex = 0; n = a.exec(t);) {
			let e = n.index;
			e > i && c(t.slice(i, e)), l(/* @__PURE__ */ s("span", {
				style: { color: "#6a9955" },
				children: n[0]
			})), i = e + n[0].length;
		}
		let o = /\b\d+(\.\d+)?\b/g;
		for (o.lastIndex = 0; n = o.exec(t);) {
			let e = n.index;
			e > i && c(t.slice(i, e)), l(/* @__PURE__ */ s("span", {
				style: { color: "#b5cea8" },
				children: n[0]
			})), i = e + n[0].length;
		}
	}
	return i < t.length && c(t.slice(i)), /* @__PURE__ */ s(o, { children: r });
}
function h(t, n) {
	let r = [], i = t ?? "", a = 0, c = 0, l = (t) => {
		t && r.push(/* @__PURE__ */ s(e, { children: t }, `t-${c++}`));
	}, u = (t) => {
		r.push(/* @__PURE__ */ s(e, { children: t }, `n-${c++}`));
	}, d = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g, f;
	for (; f = d.exec(i);) {
		let e = f.index;
		e > a && l(i.slice(a, e)), f[1] ? u(/* @__PURE__ */ s("strong", {
			style: { color: n.strong },
			children: f[1]
		})) : f[2] ? u(/* @__PURE__ */ s("em", {
			style: { color: n.em },
			children: f[2]
		})) : f[3] ? u(/* @__PURE__ */ s("span", {
			style: {
				background: "var(--t-inline-code-bg)",
				border: "1px solid var(--t-inline-code-border)",
				color: "var(--t-inline-code-text)",
				borderRadius: 8,
				padding: "2px 6px",
				fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
				fontSize: "0.95em"
			},
			children: f[3]
		})) : f[4] && f[5] && u(/* @__PURE__ */ s("a", {
			href: f[5],
			target: "_blank",
			rel: "noreferrer",
			style: {
				color: "var(--t-link)",
				textDecoration: "var(--t-link-decoration)",
				textUnderlineOffset: 3
			},
			children: f[4]
		})), a = e + f[0].length;
	}
	return a < i.length && l(i.slice(a)), /* @__PURE__ */ s(o, { children: r });
}
//#endregion
//#region src/toolbar/Toolbar.tsx
var g = [
	{
		id: "t-white",
		name: "简约白",
		swatch: "linear-gradient(135deg,#ffffff,#e5e7eb)"
	},
	{
		id: "t-juejin",
		name: "掘金酱紫",
		swatch: "linear-gradient(135deg,#a855f7,#7c3aed)"
	},
	{
		id: "t-wechat-dark",
		name: "樱花粉",
		swatch: "linear-gradient(135deg,#fecdd3,#f472b6)"
	},
	{
		id: "t-tech-blue",
		name: "科技蓝",
		swatch: "linear-gradient(135deg,#0ea5e9,#22d3ee)"
	},
	{
		id: "t-vintage-orange",
		name: "复古橙",
		swatch: "linear-gradient(135deg,#fb923c,#ea580c)"
	}
];
function _(e) {
	let [t, o] = a(!1), l = i(null), u = r(() => {
		let t = e.themeId || g[0].id;
		return g.find((e) => e.id === t) || g[0];
	}, [e.themeId]);
	n(() => {
		let e = (e) => {
			e.key === "Escape" && o(!1);
		}, t = (e) => {
			let t = l.current;
			t && (t.contains(e.target) || o(!1));
		};
		return document.addEventListener("keydown", e), document.addEventListener("click", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("click", t);
		};
	}, []);
	let d = e.viewport || "mobile", f = () => {
		let t = d === "mobile" ? "desktop" : "mobile";
		e.onViewportChange && e.onViewportChange(t);
	};
	return /* @__PURE__ */ c("div", {
		ref: l,
		style: {
			position: "relative",
			zIndex: 10
		},
		children: [/* @__PURE__ */ c("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 8,
				padding: 8,
				border: "1px solid rgba(0,0,0,0.08)",
				background: "rgba(255,255,255,0.9)",
				borderRadius: 999,
				boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
			},
			children: [
				/* @__PURE__ */ c("button", {
					onClick: () => o((e) => !e),
					"aria-haspopup": "listbox",
					"aria-expanded": t,
					style: {
						cursor: "pointer",
						border: "1px solid rgba(0,0,0,0.08)",
						borderRadius: 999,
						padding: "8px 12px",
						background: "rgba(255,255,255,0.85)",
						display: "inline-flex",
						alignItems: "center"
					},
					title: "主题",
					children: [
						/* @__PURE__ */ s("span", {
							style: { fontSize: 16 },
							children: "🌈"
						}),
						/* @__PURE__ */ s("span", {
							style: {
								marginLeft: 8,
								fontWeight: 700
							},
							children: u.name
						}),
						/* @__PURE__ */ s("span", {
							style: {
								marginLeft: 6,
								opacity: .7
							},
							children: "▾"
						})
					]
				}),
				/* @__PURE__ */ s("button", {
					onClick: f,
					"aria-pressed": d === "desktop",
					style: {
						cursor: "pointer",
						border: "1px solid rgba(0,0,0,0.08)",
						borderRadius: 999,
						padding: "8px 12px",
						background: "rgba(255,255,255,0.85)",
						display: "inline-flex",
						alignItems: "center"
					},
					title: "视图切换",
					children: /* @__PURE__ */ s("span", {
						style: { fontSize: 16 },
						children: d === "mobile" ? "📱" : "💻"
					})
				}),
				/* @__PURE__ */ s("button", {
					onClick: () => e.onCopy && e.onCopy(),
					style: {
						cursor: "pointer",
						border: "1px solid rgba(0,0,0,0.08)",
						borderRadius: 999,
						padding: "8px 12px",
						background: "rgba(255,255,255,0.85)",
						display: "inline-flex",
						alignItems: "center"
					},
					title: "复制",
					children: /* @__PURE__ */ s("span", {
						style: { fontSize: 16 },
						children: "📋"
					})
				})
			]
		}), t && /* @__PURE__ */ s("div", {
			role: "listbox",
			style: {
				marginTop: 8,
				border: "1px solid rgba(0,0,0,0.08)",
				background: "rgba(255,255,255,0.92)",
				borderRadius: 12,
				padding: 8,
				width: 320,
				position: "absolute",
				left: "50%",
				transform: "translateX(-50%)"
			},
			children: g.map((t) => /* @__PURE__ */ c("button", {
				role: "option",
				"aria-selected": t.id === u.id,
				onClick: () => {
					e.onThemeChange && e.onThemeChange(t.id), o(!1);
				},
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					padding: "10px 12px",
					marginBottom: 6,
					borderRadius: 8,
					border: "1px solid rgba(0,0,0,0.08)",
					background: "rgba(255,255,255,0.9)",
					cursor: "pointer"
				},
				children: [/* @__PURE__ */ c("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 10
					},
					children: [/* @__PURE__ */ s("span", { style: {
						width: 18,
						height: 18,
						borderRadius: 6,
						background: t.swatch,
						border: "1px solid rgba(0,0,0,0.1)"
					} }), /* @__PURE__ */ s("span", {
						style: { fontWeight: 650 },
						children: t.name
					})]
				}), /* @__PURE__ */ s("span", {
					style: {
						fontSize: 12,
						opacity: .8
					},
					children: t.id === u.id ? "当前" : "切换"
				})]
			}, t.id))
		})]
	});
}
//#endregion
//#region src/export/index.ts
var v = new Set([
	"p",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"blockquote",
	"ul",
	"ol",
	"li",
	"a",
	"code",
	"pre",
	"br",
	"strong",
	"em",
	"img"
]), y = new Set([
	"href",
	"target",
	"rel",
	"src",
	"alt",
	"style"
]);
function b({ markdown: e, theme: t, viewport: n = "desktop", options: r = {} }) {
	let { allowExternalLinks: i = !1, maxImageWidth: a = "100%" } = r, o = u[t], s = "", c = e.split("\n"), l = 0;
	for (; l < c.length;) {
		let e = c[l]?.trim() || "";
		if (e.startsWith("#")) {
			let t = e.match(/^#+/);
			if (t) {
				let n = t[0].length, r = e.slice(n).trim();
				s += `<h${n}>${r}</h${n}>`;
			}
		} else if (e.startsWith("```")) {
			e.slice(3).trim(), l++;
			let t = [];
			for (; l < c.length && !c[l].trim().startsWith("```");) t.push(c[l]), l++;
			l < c.length && l++;
			let n = t.join("\n");
			s += `<pre><code>${x(n)}</code></pre>`;
		} else if (e.startsWith(">")) {
			let e = [];
			for (; l < c.length && c[l]?.trim().startsWith(">");) e.push(c[l].trim().slice(1).trim()), l++;
			let t = e.join("\n");
			s += `<blockquote>${t}</blockquote>`;
			continue;
		} else if (e.match(/^\d+\.\s/)) {
			let e = [];
			for (; l < c.length && c[l]?.trim().match(/^\d+\.\s/);) e.push(c[l].trim().replace(/^\d+\.\s/, "")), l++;
			s += "<ol>";
			for (let t of e) s += `<li>${t}</li>`;
			s += "</ol>";
			continue;
		} else if (e.match(/^[-*+]\s/)) {
			let e = [];
			for (; l < c.length && c[l]?.trim().match(/^[-*+]\s/);) e.push(c[l].trim().replace(/^[-*+]\s/, "")), l++;
			s += "<ul>";
			for (let t of e) s += `<li>${t}</li>`;
			s += "</ul>";
			continue;
		} else if (e !== "") {
			let t = e;
			t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"), t = t.replace(/\*(.+?)\*/g, "<em>$1</em>"), t = t.replace(/`(.+?)`/g, "<code>$1</code>"), t = t.replace(/\[(.+?)\]\((.+?)\)/g, (e, t, n) => i || n.startsWith("https://mp.weixin.qq.com") ? `<a href="${n}" target="_blank" rel="noreferrer">${t}</a>` : `<span style="color: ${o.link}; text-decoration: ${o.linkDecoration}; text-underline-offset: 3px;">${t}</span>`), t = t.replace(/!\[(.+?)\]\((.+?)\)/g, (e, t, n) => n.startsWith("https://") ? `<img src="${n}" alt="${t}" style="max-width: ${a}; height: auto; margin: 10px 0;" />` : `[图片: ${t}]`), s += `<p>${t}</p>`;
		}
		l++;
	}
	return r.sanitize !== !1 && (s = S(s)), r.inlineStyle !== !1 && (s = C(s, o)), s;
}
function x(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function S(e) {
	let t = e;
	return Array.from(v).join("|"), t = t.replace(/<([a-z][a-z0-9]*)[^>]*>(.*?)<\/\1>/gi, (e, t, n) => {
		if (v.has(t.toLowerCase())) {
			let r = `<${t}`, i = e.match(/([a-z][a-z0-9]*)(?:\s*=\s*["']([^"']*)["'])?/gi);
			if (i) for (let e of i) {
				let t = e.match(/([a-z][a-z0-9]*)(?:\s*=\s*["']([^"']*)["'])?/i);
				t && y.has(t[1].toLowerCase()) && (r += ` ${t[1]}`, t[2] && (r += `="${t[2]}"`));
			}
			return r += `>${n}</${t}>`, r;
		} else return n;
	}), t = t.replace(/<([a-z][a-z0-9]*)[^>]*\/>/gi, (e, t) => v.has(t.toLowerCase()) ? e : ""), t = t.replace(/<script[^>]*>.*?<\/script>/gi, ""), t = t.replace(/on\w+\s*=\s*["'][^"']*["']/gi, ""), t = t.replace(/(class|id)\s*=\s*["'][^"']*["']/gi, ""), t;
}
function C(e, t) {
	let n = e;
	n = n.replace(/<p>(.*?)<\/p>/g, `<p style="font-size: ${t.body}; line-height: ${t.line}; color: ${t.text}; margin: 10px 0;">$1</p>`);
	for (let e = 1; e <= 6; e++) n = n.replace(RegExp(`<h${e}>(.*?)<\\/h${e}>`, "g"), `<h${e} style="font-size: ${t[`h${e}`]}; font-family: ${t.headingFont}; color: ${t.heading}; margin-top: 16px; margin-bottom: 8px; font-weight: 700;">$1</h${e}>`);
	return n = n.replace(/<blockquote>(.*?)<\/blockquote>/g, `<blockquote style="background: ${t.quoteBg}; border-left: 4px solid ${t.quoteBorder}; padding: 12px; margin: 12px 0; color: ${t.quoteText}; border-radius: 8px;">$1</blockquote>`), n = n.replace(/<ul>(.*?)<\/ul>/g, "<ul style=\"margin: 10px 0; padding-left: 20px;\">$1</ul>"), n = n.replace(/<ol>(.*?)<\/ol>/g, "<ol style=\"margin: 10px 0; padding-left: 24px;\">$1</ol>"), n = n.replace(/<li>(.*?)<\/li>/g, `<li style="margin: 4px 0; color: ${t.text};">$1</li>`), n = n.replace(/<a href="(.*?)" target="_blank" rel="noreferrer">(.*?)<\/a>/g, `<a href="$1" target="_blank" rel="noreferrer" style="color: ${t.link}; text-decoration: ${t.linkDecoration}; text-underline-offset: 3px;">$2</a>`), n = n.replace(/<code>(.*?)<\/code>/g, `<code style="background: ${t.inlineCodeBg}; border: 1px solid ${t.inlineCodeBorder}; color: ${t.inlineCodeText}; border-radius: 4px; padding: 2px 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; font-size: 0.9em;">$1</code>`), n = n.replace(/<pre><code>(.*?)<\/code><\/pre>/g, `<pre style="background: ${t.inlineCodeBg}; border: 1px solid ${t.inlineCodeBorder}; border-radius: 8px; padding: 12px; margin: 12px 0; overflow-x: auto;"><code style="color: ${t.inlineCodeText}; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; font-size: 12.5px; line-height: 1.4;">$1</code></pre>`), n = n.replace(/<strong>(.*?)<\/strong>/g, `<strong style="color: ${t.strong}; font-weight: 700;">$1</strong>`), n = n.replace(/<em>(.*?)<\/em>/g, `<em style="color: ${t.em}; font-style: italic;">$1</em>`), n;
}
async function w(e) {
	try {
		if (navigator.clipboard && navigator.clipboard.write) {
			let t = new Blob([e], { type: "text/html" }), n = new ClipboardItem({ "text/html": t });
			return await navigator.clipboard.write([n]), !0;
		}
		if (document.execCommand) {
			let t = document.createElement("div");
			t.innerHTML = e, t.style.position = "fixed", t.style.left = "-9999px", t.style.top = "-9999px", document.body.appendChild(t);
			let n = document.createRange();
			n.selectNodeContents(t);
			let r = window.getSelection();
			if (r) {
				r.removeAllRanges(), r.addRange(n);
				let e = document.execCommand("copy");
				return document.body.removeChild(t), e;
			}
			document.body.removeChild(t);
		}
		if (navigator.clipboard && navigator.clipboard.writeText) {
			let t = document.createElement("div");
			t.innerHTML = e;
			let n = t.textContent || t.innerText || "";
			return await navigator.clipboard.writeText(n), !0;
		}
		return !1;
	} catch (e) {
		return console.error("复制到剪贴板失败:", e), !1;
	}
}
//#endregion
//#region src/hooks/useViewMode.ts
function T(e = "mobile") {
	let [n, r] = a(e);
	return {
		viewMode: n,
		setViewMode: r,
		toggleViewMode: t(() => {
			r((e) => e === "mobile" ? "desktop" : "mobile");
		}, []),
		setMobile: t(() => {
			r("mobile");
		}, []),
		setDesktop: t(() => {
			r("desktop");
		}, []),
		isMobile: n === "mobile",
		isDesktop: n === "desktop"
	};
}
//#endregion
//#region src/components/ViewModeToggle.tsx
function E({ viewMode: e, onViewModeChange: t, className: n, style: r, theme: i }) {
	let a = i?.link || "#667eea", o = i?.surface || "white", l = i?.text || "#333";
	return /* @__PURE__ */ c("div", {
		className: n,
		style: {
			display: "flex",
			gap: "0",
			...r
		},
		children: [/* @__PURE__ */ s("button", {
			className: `viewportButton ${e === "mobile" ? "active" : ""}`,
			onClick: () => t("mobile"),
			style: {
				padding: "8px 16px",
				borderRadius: "4px 0 0 4px",
				border: "1px solid rgba(0,0,0,0.1)",
				background: e === "mobile" ? a : o,
				color: e === "mobile" ? "white" : l,
				fontSize: "14px",
				cursor: "pointer",
				transition: "all 0.2s ease"
			},
			children: "📱 手机"
		}), /* @__PURE__ */ s("button", {
			className: `viewportButton ${e === "desktop" ? "active" : ""}`,
			onClick: () => t("desktop"),
			style: {
				padding: "8px 16px",
				borderRadius: "0 4px 4px 0",
				border: "1px solid rgba(0,0,0,0.1)",
				borderLeft: "none",
				background: e === "desktop" ? a : o,
				color: e === "desktop" ? "white" : l,
				fontSize: "14px",
				cursor: "pointer",
				transition: "all 0.2s ease"
			},
			children: "💻 桌面"
		})]
	});
}
//#endregion
//#region src/index.tsx
function D(e) {
	let t = r(() => e.markdown.trim().slice(0, 120), [e.markdown]);
	return /* @__PURE__ */ c("div", {
		style: {
			padding: 12,
			border: "1px solid #e5e7eb",
			borderRadius: 12
		},
		children: [/* @__PURE__ */ s("div", {
			style: {
				fontWeight: 700,
				marginBottom: 8
			},
			children: "md-wx-renderer"
		}), /* @__PURE__ */ s("div", {
			style: {
				fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
				fontSize: 12
			},
			children: t || "(empty markdown)"
		})]
	});
}
//#endregion
export { D as PlaceholderPreview, p as Preview, u as THEME_TOKENS, _ as Toolbar, E as ViewModeToggle, w as copyToClipboard, b as exportToWechatHtml, T as useViewMode };
