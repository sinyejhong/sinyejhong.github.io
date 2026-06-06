import type { Lang } from "./config";

// UI string dictionary (flat keys). Proper nouns / international identifiers
// stay English per project policy; only interface wording is translated.
// Extended phase-by-phase as more pages are localized.
export const ui = {
  // --- Navigation ---
  "nav.home": { en: "Home", zh: "首頁" },
  "nav.about": { en: "About PI", zh: "主持人簡介" },
  "nav.research": { en: "Research", zh: "研究領域" },
  "nav.publications": { en: "Publications", zh: "學術著作" },
  "nav.awards": { en: "Lab & Student Awards", zh: "實驗室與學生獲獎" },
  "nav.projects": { en: "Projects", zh: "研究計畫" },
  "nav.members": { en: "Members", zh: "實驗室成員" },
  "nav.teaching": { en: "Teaching", zh: "教學課程" },
  "nav.joinus": { en: "Join Us", zh: "加入我們" },

  // --- Footer ---
  "footer.labFullName": {
    en: "Autonomous Systems and Intelligent Interaction Laboratory",
    zh: "自主系統與智慧互動實驗室",
  },
  "footer.institute": {
    en: "Graduate Institute of Intelligent Manufacturing Technology",
    zh: "智慧製造科技研究所",
  },
  "footer.university": {
    en: "National Taiwan University of Science and Technology",
    zh: "國立臺灣科技大學",
  },
  "footer.quickLinks": { en: "Quick Links", zh: "快速連結" },
  "footer.contact": { en: "Contact", zh: "聯絡資訊" },
  "footer.rights": { en: "All rights reserved.", zh: "版權所有。" },

  // --- Common UI / a11y ---
  "ui.skipToContent": { en: "Skip to main content", zh: "跳至主要內容" },
  "ui.toggleMenu": { en: "Toggle menu", zh: "切換選單" },
  "ui.emailCopied": {
    en: "Email copied to clipboard!",
    zh: "Email 已複製到剪貼簿！",
  },

  // --- Common (cross-page) ---
  "common.showMore": { en: "Show More", zh: "了解更多" },
  "common.viewFullProfile": { en: "View Full Profile", zh: "查看完整簡介" },
  "common.piTitleShort": {
    en: "Assistant Professor, GIMT, NTUST",
    zh: "助理教授，智慧製造科技研究所，國立臺灣科技大學",
  },

  // --- Home page ---
  "home.heroTagline": {
    en: "Pioneering research in Computer Vision, Deep Learning, Robot Perception, and Human-Robot Interaction",
    zh: "在 Computer Vision、Deep Learning、Robot Perception 與 Human-Robot Interaction 領域開創前沿研究",
  },
  "home.exploreResearch": { en: "Explore Research", zh: "探索研究" },
  "home.joinTeam": { en: "Join Our Team", zh: "加入團隊" },
  "home.director": { en: "Director", zh: "主持人" },
  "home.statPublications": { en: "Publications", zh: "學術論文" },
  "home.statProjects": { en: "Projects", zh: "研究計畫" },
  "home.statAwards": { en: "Awards", zh: "獲獎紀錄" },
  "home.statMembers": { en: "Team Members", zh: "團隊成員" },
} as const;

export type UIKey = keyof typeof ui;

export function t(key: UIKey, lang: Lang): string {
  return ui[key][lang];
}
