// --------------------------------------------------------
// 📂 FILE: core/MotionEngine.js
// --------------------------------------------------------
export class MotionEngine {
    constructor() { /* Ready */ }

    resolve(state, configMotion) {
        if (state.a11y && state.a11y.reducedMotion) {
            return { reduced: true, cssBlock: `* { transition: none !important; animation: none !important; }` };
        }
        
        const fam = state.activeFamily;
        const profileKey = configMotion.FAMILY_MAP[fam] || 'standard';
        const profile = configMotion.PROFILES[profileKey];

        const cssGlobals = `
            :root { --motion-dur: ${profile.dur}; --motion-curve: ${profile.curve}; }
            body, .view-section, .l4-card, .saldo-card, .home-header, .btn-action { transition: all var(--motion-dur) var(--motion-curve); }
        `;

        let keyframes = '';
        if (profile.entrance === 'pop') {
            keyframes = `@keyframes pageIn { 0% { transform: scale(0.9); opacity:0; } 100% { transform: scale(1); opacity:1; } } .view-section.active { animation: pageIn var(--motion-dur) var(--motion-curve) forwards; }`;
        } else if (profile.entrance === 'slide') {
            keyframes = `@keyframes pageIn { 0% { transform: translateY(20px); opacity:0; } 100% { transform: translateY(0); opacity:1; } } .view-section.active { animation: pageIn var(--motion-dur) var(--motion-curve) forwards; }`;
        } else if (profile.entrance === 'glitch') {
            keyframes = `@keyframes pageIn { 0% { opacity:0; clip-path: inset(50% 0 30% 0); } 20% { clip-path: inset(10% 0 60% 0); } 40% { opacity:1; clip-path: inset(0 0 0 0); } } .view-section.active { animation: pageIn 0.2s steps(2, start) forwards; }`;
        } else {
            keyframes = `@keyframes pageIn { from { opacity:0; } to { opacity:1; } } .view-section.active { animation: pageIn var(--motion-dur) ease forwards; }`;
        }

        return { reduced: false, cssBlock: cssGlobals + keyframes };
    }
}