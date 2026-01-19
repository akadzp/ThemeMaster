// --------------------------------------------------------
// 📂 FILE: config/motion.js
// --------------------------------------------------------
export const PROFILES = {
    'standard': { dur: '0.3s', curve: 'ease', entrance: 'fade' },
    'smooth':   { dur: '0.4s', curve: 'cubic-bezier(0.4, 0.0, 0.2, 1)', entrance: 'slide' },
    'bouncy':   { dur: '0.5s', curve: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', entrance: 'pop' },
    'instant':  { dur: '0s',   curve: 'linear', entrance: 'none' },
    'tech':     { dur: '0.15s', curve: 'steps(4, end)', entrance: 'glitch' }
};

export const FAMILY_MAP = {
    'fam_neu': 'standard', 'fam_clay': 'bouncy', 'fam_glass': 'smooth', 'fam_fluent': 'smooth', 'fam_clean': 'standard',
    'fam_outline': 'instant', 'fam_brutal': 'instant', 'fam_retro': 'instant', 'fam_cyber': 'tech', 'fam_terminal': 'tech',
    'fam_ios': 'smooth', 'fam_aura': 'smooth', 'default': 'standard'
};