// --------------------------------------------------------
// 📂 FILE: core/ColorEngine.js
// --------------------------------------------------------
import { ColorUtils } from './ColorUtils.js';

export class ColorEngine {
    constructor() { /* Ready */ }

    resolve(state, configDNA) {
        // 1. Ekstrak State
        const fam = state.activeFamily;
        const brandBase = state.mainColor || '#000000';
        const isDark = state.isDark;
        const mode = state.mode;

        // 2. Ambil DNA
        const dna = configDNA[fam] || configDNA['default'];

        // 3. Proses Chroma Dasar
        const dnaBrand = ColorUtils.chroma(brandBase, dna.chroma.sat);
        let canvas;

        // --- STEP A: RESOLVE CANVAS ---
        if (mode === 'WORLD_COLOR') {
            let lMod = isDark ? -30 : (dna.chroma.tint * 10 - 10);
            canvas = ColorUtils.tone(dnaBrand, lMod);
        } else {
            const baseNeutral = isDark ? '#0f172a' : '#f8fafc';
            if (dna.chroma.tint > 0) canvas = ColorUtils.mix(baseNeutral, dnaBrand, dna.chroma.tint);
            else canvas = baseNeutral;
        }

        // Family Specific Overrides
        if (fam === 'fam_neu') {
            const h = ColorUtils.hexToHsl(brandBase).h;
            canvas = ColorUtils.hslToHex(h, 0.15, isDark ? 0.15 : 0.92);
        }
        if (fam === 'fam_brutal' || fam === 'fam_terminal') {
            canvas = isDark ? '#000000' : '#ffffff';
        }
        if (fam === 'fam_paper' && !isDark && mode !== 'WORLD_COLOR') {
            canvas = '#fdfbf7';
        }

        // --- STEP B: RESOLVE SURFACE ---
        let surface;
        if (fam === 'fam_neu') {
            surface = canvas;
        } else if (fam === 'fam_clay') {
            surface = isDark ? ColorUtils.tone(canvas, 15) : '#ffffff';
        } else if (fam === 'fam_material') {
            surface = isDark ? ColorUtils.tone(canvas, 8) : '#ffffff';
        } else if (fam === 'fam_brutal') {
            surface = canvas;
        } else if (fam === 'fam_glass' || fam === 'fam_fluent' || fam === 'fam_aura') {
            const alpha = isDark ? 0.6 : 0.7;
            const baseRGB = isDark ? '30, 41, 59' : '255, 255, 255';
            surface = `rgba(${baseRGB}, ${alpha})`;
        } else {
            if (dna.lum.surfaceLift !== 0) {
                const lift = isDark ? (dna.lum.surfaceLift * 100) : -(dna.lum.surfaceLift * 100);
                surface = ColorUtils.tone(canvas, lift);
            } else {
                surface = canvas;
            }
        }

        // --- STEP C: RESOLVE ACCENT ---
        let accent;
        if (fam === 'fam_terminal' || fam === 'fam_cyber') {
            accent = ColorUtils.chroma(brandBase, 2.0);
            if (ColorUtils.getLuminance(accent) < 0.2) accent = ColorUtils.tone(accent, 40);
        } else if (fam === 'fam_neu') {
            const bgLum = ColorUtils.getLuminance(canvas);
            accent = bgLum > 0.5 ? ColorUtils.tone(brandBase, -10) : ColorUtils.tone(brandBase, 20);
        } else {
            accent = ColorUtils.tone(dnaBrand, dna.accent.lift);
        }

        // --- STEP D: RESOLVE TEXT ---
        let textPrimary = ColorUtils.resolveText(canvas, dna.txt.mode);
        if (fam === 'fam_brutal') textPrimary = isDark ? '#ffffff' : '#000000';

        // --- STEP E: FINAL TOKEN ASSEMBLY ---
        const tokens = {
            canvas, surface,
            s2: isDark ? ColorUtils.tone(canvas, 5) : ColorUtils.tone(canvas, -3),
            s3: canvas,
            accent,
            onAccent: (fam === 'fam_brutal') ? (isDark ? '#000000' : '#ffffff') : ColorUtils.resolveText(accent, 'hard'),
            textPrimary,
            textSec: ColorUtils.mix(textPrimary, canvas, 0.4),
            textDis: ColorUtils.mix(textPrimary, canvas, 0.7),
            line: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
        };

        if (fam === 'fam_terminal') {
            tokens.textPrimary = accent;
            tokens.textSec = ColorUtils.tone(accent, -30);
            tokens.line = ColorUtils.tone(accent, -70);
        }
        if (fam === 'fam_neu') tokens.line = 'transparent';
        if (fam === 'fam_brutal') tokens.line = textPrimary;

        const flatFamilies = ['fam_brutal', 'fam_retro', 'fam_outline', 'fam_terminal', 'fam_paper'];
        if (flatFamilies.includes(fam)) {
            tokens.gradMain = accent;
        } else {
            const accHsl = ColorUtils.hexToHsl(accent);
            const gradSec = ColorUtils.hslToHex((accHsl.h + 20) % 360, accHsl.s, accHsl.l);
            tokens.gradMain = `linear-gradient(135deg, ${accent}, ${gradSec})`;
        }

        const resolveStatus = (type) => {
            const base = { success: '#22c55e', warning: '#f59e0b', error: '#ef4444' }[type];
            if (dna.txt.mode === 'neon') return ColorUtils.chroma(base, 1.5);
            if (dna.txt.mode === 'soft') return ColorUtils.mix(base, canvas, 0.2);
            return base;
        };
        tokens.cSuccess = resolveStatus('success');
        tokens.cWarning = resolveStatus('warning');
        tokens.cError = resolveStatus('error');
        
        return { tokens, dna };
    }
}
