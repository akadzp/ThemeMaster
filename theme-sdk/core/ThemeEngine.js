// --------------------------------------------------------
// 📂 FILE: core/ThemeEngine.js
// --------------------------------------------------------
import { ColorUtils } from './ColorUtils.js';

export class ThemeEngine {
    constructor() { /* Ready */ }

    resolve(state, config, colorResult) {
        const { tokens } = colorResult;
        const fam = state.activeFamily;
        const isDark = state.isDark;
        const opts = state.activeOptions || [];
        
        // 1. Hitung Warna Bayangan (Shadow Colors)
        let sDark, sLight;
        if (fam === 'fam_clay') {
            sDark = ColorUtils.mix(tokens.accent, isDark ? '#000' : '#fff', isDark ? 0.3 : 0.7);
            sLight = ColorUtils.tone(tokens.surface, 20);
        } else if (fam === 'fam_retro' || fam === 'fam_brutal') {
            sDark = isDark ? '#ffffff' : '#000000';
            sLight = 'transparent';
        } else {
            sDark = ColorUtils.tone(tokens.canvas, isDark ? -30 : -15);
            sLight = ColorUtils.tone(tokens.canvas, isDark ? 10 : 15);
        }

        // 2. Pilih & Jalankan Rumus Fisika
        const formulaStr = state.themeTag || 'ELEVATED_DUAL';
        const formula = config.FORMULAS[formulaStr] || config.FORMULAS['ELEVATED_DUAL'];
        const phys = formula(tokens.canvas, sDark, sLight, state.themeParams || {});

        // 3. Mapping Hasil
        let finalShadow = phys.shadow;
        let finalInset = phys.insetShadow;
        let finalBorder = phys.border;
        let finalBackdrop = phys.backdrop;
        
        let rCard = phys.shadow, rBtn = phys.shadow, rInput = phys.insetShadow, rNav = phys.shadow;

        // 4. Family Signatures
        const signatures = config.SIGNATURES || {};
        const activeSig = signatures[fam] || {};

        if (activeSig.border && phys.border === 'none') finalBorder = activeSig.border;
        if (fam === 'fam_outline') finalBorder = `2px solid ${tokens.textPrimary}`;
        if (fam === 'fam_brutal') { 
            finalBorder = `3px solid ${tokens.textPrimary}`; 
            rBtn = `4px 4px 0px ${tokens.textPrimary}`; 
        }
        if (fam === 'fam_retro') { 
            rCard = `4px 4px 0px ${sDark}`; 
            rBtn = `2px 2px 0px ${sDark}`; 
        }

        // 5. Universal Slots & Customizers
        let uBase = rCard, uSub = finalInset, uAction = rBtn, uField = rInput, uNav = rNav;

        if (fam === 'fam_neu') {
            if (opts.includes('base_sink')) uBase = finalInset;
            if (opts.includes('info_pop')) uSub = finalShadow;
            if (opts.includes('act_sink')) uAction = finalInset;
        }
        if (fam === 'fam_glass') {
            if (opts.includes('glass_clear')) { 
                finalBackdrop = 'none'; 
                if(tokens) tokens.s1_override = 'rgba(255,255,255,0.05)'; 
                uBase = 'none'; 
            }
            if (opts.includes('glass_glow')) uAction = `0 0 15px ${tokens.accent}`;
        }
        if (fam === 'fam_clay') {
            if (opts.includes('clay_solid')) { 
                finalBackdrop = 'none'; 
                if(tokens) tokens.s1_override = tokens.canvas; 
            }
        }
        if (fam === 'fam_clean') {
            if (opts.includes('clean_border')) { finalBorder = `1px solid ${tokens.accent}`; uBase = 'none'; }
            if (opts.includes('clean_fill')) { uAction = 'none'; if(tokens) tokens.roleBtnOverride = 'none'; }
        }

        // 6. Geometry & Density
        let rawShape = state.shapeStrategy;
        if (!rawShape || rawShape === 'default') rawShape = 'md';
        const radiusMap = { sharp: '0px', sm: '8px', md: '16px', xl: '24px', pill: '50px', organic: '30px 20px 30px 25px / 25px 30px 20px 30px' };
        
        const behaviors = config.BEHAVIORS || {};
        const density = state.currentOverrides?.density || behaviors[fam]?.density || 'comfort';
        const scale = activeSig.gapScale || 1.0;
        
        let gap = (12 * scale);
        if(density === 'tight') gap = 6 * scale;
        if(density === 'loose') gap = 15 * scale;

        return {
            vars: {
                shadow: finalShadow, insetShadow: finalInset, border: finalBorder, backdrop: finalBackdrop,
                roleCard: rCard, roleBtn: tokens.roleBtnOverride || rBtn, roleInput: rInput, roleNav: rNav,
                uBase, uSub, uAction, uField, uNav,
                radius: radiusMap[rawShape] || '16px',
                gap: gap + 'px'
            }
        };
    }
}