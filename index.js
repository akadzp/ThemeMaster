// --------------------------------------------------------
// 📂 FILE: index.js (PUBLIC API ENTRY POINT)
// --------------------------------------------------------
export { ThemeSDK } from './core/ThemeSDK.js';
export { DOMRenderer } from './renderer/DOMRenderer.js';
export * as ColorUtils from './core/ColorUtils.js';

// Export Configs untuk memudahkan Consumer
import { DNA } from './config/color.js';
import { FORMULAS, SIGNATURES, BEHAVIORS, OPTIONS, CATEGORIES, FAMILIES, VARIANTS } from './config/theme.js';
import { DB as LAYOUT_DB, SHAPES } from './config/layout.js';
import { ROLE_MAP, PERMISSIONS, MENU_MAP } from './config/context.js';
import { PROFILES, FAMILY_MAP as MOTION_FAMILY_MAP } from './config/motion.js';

export const Config = {
    COLOR: { DNA },
    THEME: { FORMULAS, SIGNATURES, BEHAVIORS, OPTIONS, CATEGORIES, FAMILIES, VARIANTS },
    LAYOUT: { DB: LAYOUT_DB, SHAPES },
    CONTEXT: { ROLE_MAP, PERMISSIONS, MENU_MAP },
    MOTION: { PROFILES, FAMILY_MAP: MOTION_FAMILY_MAP }
};