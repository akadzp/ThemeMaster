// --------------------------------------------------------
// 📂 FILE: renderer/DOMRenderer.js
// --------------------------------------------------------
/**
 * Module ini KHUSUS untuk Browser. 
 * Memisahkan logika aplikasi dari manipulasi DOM.
 */
import { ColorUtils } from '../core/ColorUtils.js'; // Optional, jika butuh helper di renderer

export const DOMRenderer = {
    apply(output, state) {
        const root = document.documentElement.style;
        const t = output.tokens.tokens; // Note: output.tokens berisi {tokens, dna}
        const v = output.vars.vars;
        const layoutRes = output.layout;
        const contextRes = output.overrides;
        const motionRes = output.motion;
        const dna = output.tokens.dna;

        // --- A. Apply Colors ---
        root.setProperty('--bg', t.canvas); 
        root.setProperty('--s-1', t.s1_override || t.surface);
        root.setProperty('--s-2', t.s2); 
        root.setProperty('--s-3', t.s3);
        root.setProperty('--accent', t.accent); 
        root.setProperty('--on-accent', t.onAccent);
        root.setProperty('--text', t.textPrimary); 
        root.setProperty('--text-sec', t.textSec);
        root.setProperty('--text-dis', t.textDis); 
        root.setProperty('--line', t.line);
        root.setProperty('--c-success', t.cSuccess); 
        root.setProperty('--c-warning', t.cWarning);
        root.setProperty('--c-error', t.cError); 
        root.setProperty('--grad-main', t.gradMain);

        // --- B. Apply Theme Vars ---
        root.setProperty('--shadow', v.shadow); 
        root.setProperty('--inset-shadow', v.insetShadow);
        root.setProperty('--border', v.border); 
        root.setProperty('--backdrop', v.backdrop);
        root.setProperty('--role-card', v.roleCard); 
        root.setProperty('--role-btn', v.roleBtn);
        root.setProperty('--role-input', v.roleInput); 
        root.setProperty('--role-nav', v.roleNav);
        root.setProperty('--u-base', v.uBase); 
        root.setProperty('--u-sub', v.uSub);
        root.setProperty('--u-action', v.uAction); 
        root.setProperty('--u-field', v.uField);
        root.setProperty('--u-nav', v.uNav); 
        root.setProperty('--radius', v.radius);
        root.setProperty('--gap', v.gap);

        // --- C. Apply Layout Classes ---
        const setCls = (id, cls) => { const el = document.getElementById(id); if(el) el.className = cls; };
        Object.entries(layoutRes).forEach(([key, val]) => {
            if (key === 'commonAction') document.querySelectorAll('.ci-btn-cek, .qa-btn').forEach(e => e.className = val);
            else if (key === 'commonInput') document.querySelectorAll('.ci-input-wrap, .hp-slider').forEach(e => e.className = val);
            else if (key === 'saldoCard') setCls('saldo-card', val);
            else setCls(key, val);
        });

        // --- D. Apply Contextual Overrides ---
        if (contextRes) {
            if (contextRes.resetList && Array.isArray(contextRes.resetList)) {
                contextRes.resetList.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.style.removeProperty('background'); el.style.removeProperty('color');
                        el.style.removeProperty('border-color'); el.style.removeProperty('box-shadow');
                        if (state.activeFamily === 'fam_outline') el.querySelectorAll('i').forEach(i => i.style.removeProperty('color'));
                    }
                });
            }
            if (contextRes.overrides) {
                Object.entries(contextRes.overrides).forEach(([id, styles]) => {
                    const el = document.getElementById(id);
                    if (el) {
                        Object.entries(styles).forEach(([prop, val]) => {
                            if (prop === '--icon-color') el.querySelectorAll('i').forEach(i => i.style.color = val);
                            else el.style.setProperty(prop, val, 'important');
                        });
                    }
                });
            }
        }

        // --- E. Background Strategy ---
        const workspace = document.querySelector('.preview-workspace');
        if (workspace) {
            const bgStrat = dna ? dna.bg_strat : 'plain';
            workspace.setAttribute('data-env', state.environment);
            if (bgStrat === 'blobs') {
                const blobColor1 = ColorUtils.chroma(ColorUtils.tone(t.accent, 20), 0.8);
                const blobColor2 = ColorUtils.hslToHex((ColorUtils.hexToHsl(t.accent).h + 40) % 360, 0.8, 0.4);
                const alpha = state.isDark ? 0.3 : 0.15;
                workspace.style.backgroundImage = `radial-gradient(at 0% 0%, ${blobColor1}${Math.floor(alpha*255).toString(16)} 0, transparent 50%), radial-gradient(at 100% 100%, ${blobColor2}${Math.floor(alpha*255).toString(16)} 0, transparent 50%)`;
                workspace.style.backgroundSize = "cover";
            } else if (bgStrat === 'grid') {
                const gridCol = ColorUtils.chroma(t.accent, 1.0);
                workspace.style.backgroundImage = `linear-gradient(0deg, transparent 24%, ${gridCol}11 25%, ${gridCol}11 26%, transparent 27%, transparent 74%, ${gridCol}11 75%, ${gridCol}11 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${gridCol}11 25%, ${gridCol}11 26%, transparent 27%, transparent 74%, ${gridCol}11 75%, ${gridCol}11 76%, transparent 77%, transparent)`;
                workspace.style.backgroundSize = "50px 50px";
            } else {
                workspace.style.backgroundImage = "none";
            }
        }

        // --- F. Motion & A11y ---
        const fam = state.activeFamily;
        if(fam === 'fam_terminal' || fam === 'fam_retro') document.body.style.fontFamily = "'Courier New', monospace";
        else document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";

        let a11yStyle = document.getElementById('engine-a11y-style');
        if (!a11yStyle) { a11yStyle = document.createElement('style'); a11yStyle.id = 'engine-a11y-style'; document.head.appendChild(a11yStyle); }
        a11yStyle.innerHTML = `${motionRes.cssBlock} *:focus-visible { outline: 3px solid ${t.accent} !important; outline-offset: 2px !important; border-radius: 4px !important; }`;
    }
};
