// --------------------------------------------------------
// 📂 FILE: config/color.js
// --------------------------------------------------------
export const DNA = {
    fam_neu: { chroma: { sat: 0.6, tint: 1.0 }, lum: { surfaceLift: 0.0 }, accent: { lift: -20, clamp: true }, txt: { mode: 'soft' }, bg_strat: 'plain' },
    fam_clay: { chroma: { sat: 0.8, tint: 0.1 }, lum: { surfaceLift: 0.15 }, accent: { lift: 10, clamp: false }, txt: { mode: 'contrast' }, bg_strat: 'plain' },
    fam_glass: { chroma: { sat: 1.1, tint: 0.5 }, lum: { surfaceLift: -0.1 }, accent: { lift: 30, clamp: false }, txt: { mode: 'white_force' }, bg_strat: 'blobs' },
    fam_cyber: { chroma: { sat: 2.0, tint: 0.05 }, lum: { surfaceLift: 0.0 }, accent: { lift: 50, clamp: false }, txt: { mode: 'neon' }, bg_strat: 'grid' },
    fam_clean: { chroma: { sat: 0.1, tint: 0.02 }, lum: { surfaceLift: 0.05 }, accent: { lift: 0, clamp: false }, txt: { mode: 'sharp' }, bg_strat: 'plain' },
    fam_retro: { chroma: { sat: 0.9, tint: 0.0 }, lum: { surfaceLift: 0.0 }, accent: { lift: -10, clamp: false }, txt: { mode: 'sharp' }, bg_strat: 'plain' },
    fam_brutal: { chroma: {sat:1, tint:0}, lum: {surfaceLift:0}, accent: {lift:0}, txt: {mode:'hard'}, bg_strat: 'plain' },
    fam_terminal: { chroma: {sat:0, tint:0}, lum: {surfaceLift:0}, accent: {lift:0}, txt: {mode:'terminal'}, bg_strat: 'plain' },
    fam_ios: { chroma: {sat:1, tint:0.02}, lum: {surfaceLift:0.05}, accent: {lift:10}, txt: {mode:'standard'}, bg_strat: 'plain' },
    fam_material: { chroma: {sat:0.9, tint:0.08}, lum: {surfaceLift:0}, accent: {lift:10}, txt: {mode:'standard'}, bg_strat: 'plain' },
    fam_outline: { chroma: {sat:1.0, tint:0}, lum: {surfaceLift:0.05}, accent: {lift:0}, txt: {mode:'sharp'}, bg_strat: 'plain' },
    fam_paper: { chroma: {sat:0.5, tint:0.05}, lum: {surfaceLift:0.1}, accent: {lift:0}, txt: {mode:'ink'}, bg_strat: 'plain' },
    fam_fluent: { chroma: {sat:1.0, tint:0.3}, lum: {surfaceLift:0.0}, accent: {lift:20}, txt: {mode:'standard'}, bg_strat: 'blobs' },
    fam_aura: { chroma: {sat:1.5, tint:0.2}, lum: {surfaceLift:-0.1}, accent: {lift:40}, txt: {mode:'glow'}, bg_strat: 'blobs' },
    default: { chroma: {sat:1, tint:0.1}, lum: {surfaceLift:0}, accent: {lift:0}, txt: {mode:'standard'}, bg_strat: 'plain' }
};

// --------------------------------------------------------
// 📂 FILE: config/theme.js
// --------------------------------------------------------
export const FORMULAS = {
    ELEVATED_DUAL: (bg, sDark, sLight, p) => { const m = p._micro || 0; let d = (p.depth === 'sharp') ? 3 + m : 9 + m; let b = (p.depth === 'sharp') ? 6 + m : 18 + (m * 2); if (p.depth === 'flat') { d=0; b=0; } const dPx = `${d}px`; const bPx = `${b}px`; if(d===0) return { shadow: 'none', insetShadow: 'none', border: 'none', backdrop: 'none' }; return { shadow: `${dPx} ${dPx} ${bPx} ${sDark}, -${dPx} -${dPx} ${bPx} ${sLight}`, insetShadow: `inset ${dPx} ${dPx} ${bPx} ${sDark}, inset -${dPx} -${dPx} ${bPx} ${sLight}`, border: 'none', backdrop: 'none' }; },
    VOLUMETRIC_SOFT: (bg, sDark, sLight, p) => { const m = p._micro || 0; let off, blur, inset; if (p.vol === 'low') { off = 5; blur = 10; inset = 3; } else if (p.vol === 'high') { off = 15+m; blur = 30+(m*2); inset = 8; } else { off = 10+m; blur = 20+(m*2); inset = 5; } return { shadow: `${off}px ${off}px ${blur}px ${sDark}`, insetShadow: `inset -${inset}px -${inset}px ${inset*2}px ${sDark}, inset ${inset}px ${inset}px ${inset*2}px ${sLight}`, border: 'none', backdrop: 'none' }; },
    TRANSLUCENT_BLUR: (bg, sDark, sLight, p) => { const m = p._micro || 0; let baseBlur = parseInt(p.blur ?? 12) + (m * 2); let bOp = (p.style === 'crystal') ? 0.6 : (p.style === 'ghost') ? 0.05 : 0.2; let sh = (p.style === 'crystal') ? '0 15px 35px rgba(0,0,0,0.1)' : '0 8px 32px rgba(0,0,0,0.1)'; if(p.style === 'ghost') sh = 'none'; return { shadow: sh, insetShadow: 'none', backdrop: `blur(${baseBlur}px) saturate(180%)`, border: `1px solid rgba(255,255,255,${bOp})` }; },
    FLAT_FLOATING: (bg, sDark, sLight, p) => { const m = p._micro || 0; let sh = 'none'; let bd = '1px solid rgba(0,0,0,0.08)'; if (p.shadow === 'raised') { sh = `0 ${4+m}px ${12+(m*2)}px rgba(0,0,0,0.08)`; bd = 'none'; } else if (p.border === 'thick') { bd = `2px solid ${sDark}`; } return { shadow: sh, insetShadow: 'none', border: bd, backdrop: 'none' }; },
    OUTLINE_GEOMETRIC: (bg, sDark, sLight, p) => { let w = (p.weight === 'thin') ? '1px' : (p.weight === 'thick') ? '3px' : '2px'; let s = (p.style === 'dashed') ? 'dashed' : 'solid'; return { shadow: 'none', insetShadow: 'none', border: `${w} ${s} ${sDark}`, backdrop: 'none' }; },
    SOLID_HARD: (bg, sDark, sLight, p) => { const m = p._micro || 0; let off = (p.depth === 'deep') ? 8+m : (p.depth === 'flat') ? 0 : 4+m; const sh = off > 0 ? `${off}px ${off}px 0px ${sDark}` : 'none'; return { shadow: sh, insetShadow: 'none', border: `2px solid ${sDark}`, backdrop: 'none' }; }
};

export const CATEGORIES = [ { id: 'depth', label: '3D & DEPTH' }, { id: 'glass', label: 'GLASS & BLUR' }, { id: 'flat', label: 'FLAT & CLEAN' }, { id: 'art', label: 'ARTISTIC' }, { id: 'sys', label: 'SYSTEM OS' } ];

export const FAMILIES = [
    { id: 'fam_neu', cat: 'depth', label: 'Neumorph' }, { id: 'fam_clay', cat: 'depth', label: 'Clay/Bio' }, 
    { id: 'fam_glass', cat: 'glass', label: 'Frosted' }, { id: 'fam_fluent', cat: 'glass', label: 'Acrylic' }, 
    { id: 'fam_clean', cat: 'flat', label: 'Minimalist' }, { id: 'fam_outline', cat: 'flat', label: 'Outline' }, 
    { id: 'fam_paper', cat: 'flat', label: 'Paper Lo-Fi' }, { id: 'fam_brutal', cat: 'art', label: 'Neo-Brutal' }, 
    { id: 'fam_retro', cat: 'art', label: 'Retro Pop' }, { id: 'fam_cyber', cat: 'art', label: 'Futuristic' }, 
    { id: 'fam_terminal', cat: 'art', label: 'Terminal' }, { id: 'fam_material', cat: 'sys', label: 'Material 3' }, 
    { id: 'fam_ios', cat: 'sys', label: 'Cupertino' }, { id: 'fam_aura', cat: 'glass', label: 'Aura Glow' }
];

export const VARIANTS = [
    { id: 'neu_soft', fam: 'fam_neu', label: 'Soft', icon: 'fas fa-circle', mode: 'WORLD_COLOR', tag: 'ELEVATED_DUAL', p: { depth: 'soft' }, customizers: ['base_sink', 'info_pop', 'act_sink'] },
    { id: 'neu_crisp', fam: 'fam_neu', label: 'Crisp', icon: 'fas fa-square', mode: 'WORLD_COLOR', tag: 'ELEVATED_DUAL', p: { depth: 'sharp' }, overrides: { density: 'compact' }, customizers: ['base_sink', 'info_pop'] },
    { id: 'neu_flat', fam: 'fam_neu', label: 'Surface', icon: 'fas fa-layer-group', mode: 'WORLD_COLOR', tag: 'ELEVATED_DUAL', p: { depth: 'flat' }, overrides: { surf: 'flat' }, customizers: [] },
    { id: 'clay_puff', fam: 'fam_clay', label: 'Puffy', icon: 'fas fa-cloud', mode: 'WORLD_COLOR', tag: 'VOLUMETRIC_SOFT', p: { vol: 'std' }, customizers: ['clay_solid'] },
    { id: 'clay_float', fam: 'fam_clay', label: 'Floating', icon: 'fas fa-parachute-box', mode: 'WORLD_COLOR', tag: 'VOLUMETRIC_SOFT', p: { vol: 'high' }, overrides: { density: 'loose' }, customizers: ['clay_solid'] },
    { id: 'clay_matte', fam: 'fam_clay', label: 'Matte', icon: 'fas fa-tint-slash', mode: 'WORLD_COLOR', tag: 'VOLUMETRIC_SOFT', p: { vol: 'low' }, customizers: [] },
    { id: 'gls_frost', fam: 'fam_glass', label: 'Frost', icon: 'fas fa-wind', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '12', style: 'std' }, customizers: ['glass_clear', 'glass_glow'] },
    { id: 'gls_crys', fam: 'fam_glass', label: 'Crystal', icon: 'far fa-gem', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '5', style: 'crystal' }, overrides: { surf: 'floating' }, customizers: ['glass_glow'] },
    { id: 'gls_deep', fam: 'fam_glass', label: 'Deep', icon: 'fas fa-water', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '30', style: 'ghost' }, customizers: [] },
    { id: 'flu_acrylic', fam: 'fam_fluent', label: 'Acrylic', icon: 'fas fa-paint-brush', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '20', style: 'crystal' }, customizers: ['glass_glow'] },
    { id: 'flu_mica', fam: 'fam_fluent', label: 'Mica', icon: 'fas fa-dice-d20', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '40', style: 'ghost' }, customizers: [] },
    { id: 'flu_solid', fam: 'fam_fluent', label: 'Opaque', icon: 'fas fa-stop', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '0', style: 'std' }, customizers: [] },
    { id: 'cln_pure', fam: 'fam_clean', label: 'Pure', icon: 'fas fa-circle-notch', mode: 'ACCENT_DOMINANT', tag: 'FLAT_FLOATING', p: { shadow: 'none', border: 'thin' }, customizers: ['clean_border', 'clean_fill'] },
    { id: 'cln_raised', fam: 'fam_clean', label: 'Raised', icon: 'fas fa-box-open', mode: 'ACCENT_DOMINANT', tag: 'FLAT_FLOATING', p: { shadow: 'raised', border: 'none' }, overrides: { density: 'loose' }, customizers: ['clean_fill'] },
    { id: 'cln_lined', fam: 'fam_clean', label: 'Bordered', icon: 'far fa-square', mode: 'ACCENT_DOMINANT', tag: 'FLAT_FLOATING', p: { shadow: 'none', border: 'thick' }, customizers: ['clean_fill'] },
    { id: 'out_thin', fam: 'fam_outline', label: 'Hairline', icon: 'fas fa-minus', mode: 'ACCENT_DOMINANT', tag: 'OUTLINE_GEOMETRIC', p: { weight: 'thin' }, customizers: ['out_bold', 'out_fill'] },
    { id: 'out_bold', fam: 'fam_outline', label: 'Bold', icon: 'fas fa-pen-nib', mode: 'ACCENT_DOMINANT', tag: 'OUTLINE_GEOMETRIC', p: { weight: 'thick' }, customizers: ['out_fill'] },
    { id: 'out_tech', fam: 'fam_outline', label: 'Tech', icon: 'fas fa-code', mode: 'ACCENT_DOMINANT', tag: 'OUTLINE_GEOMETRIC', p: { weight: 'thin', style: 'dashed' }, customizers: ['out_fill'] },
    { id: 'ppr_sheet', fam: 'fam_paper', label: 'Sheet', icon: 'far fa-file-alt', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'flat' }, customizers: ['paper_tex'] },
    { id: 'ppr_card', fam: 'fam_paper', label: 'Cardboard', icon: 'fas fa-box', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'deep' }, customizers: ['paper_tex'] },
    { id: 'ppr_draft', fam: 'fam_paper', label: 'Draft', icon: 'fas fa-pencil-ruler', mode: 'FIXED', tag: 'OUTLINE_GEOMETRIC', p: { weight: 'thin', style: 'dashed' }, customizers: [] },
    { id: 'bru_hard', fam: 'fam_brutal', label: 'Hard', icon: 'fas fa-cube', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'std' }, customizers: ['brut_noshadow'] },
    { id: 'bru_pop', fam: 'fam_brutal', label: 'Pop', icon: 'fas fa-star', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'deep' }, overrides: { colStrat: 'CANVAS_BRAND' }, customizers: [] },
    { id: 'bru_flat', fam: 'fam_brutal', label: 'Mono', icon: 'fas fa-ban', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'flat' }, customizers: [] },
    { id: 'ret_8bit', fam: 'fam_retro', label: '8-Bit', icon: 'fas fa-gamepad', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'flat' }, customizers: ['retro_hard'] },
    { id: 'ret_console', fam: 'fam_retro', label: 'Console', icon: 'fas fa-tv', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'std' }, overrides: { density: 'compact' }, customizers: [] },
    { id: 'ret_voxel', fam: 'fam_retro', label: 'Voxel', icon: 'fas fa-cubes', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'deep' }, customizers: [] },
    { id: 'cyb_neon', fam: 'fam_cyber', label: 'Neon', icon: 'fas fa-bolt', mode: 'FIXED', tag: 'OUTLINE_GEOMETRIC', p: { style: 'solid' }, customizers: [] },
    { id: 'cyb_matrix', fam: 'fam_cyber', label: 'Matrix', icon: 'fas fa-terminal', mode: 'FIXED', tag: 'OUTLINE_GEOMETRIC', p: { style: 'dashed' }, customizers: [] },
    { id: 'cyb_stealth', fam: 'fam_cyber', label: 'Stealth', icon: 'fas fa-user-secret', mode: 'FIXED', tag: 'FLAT_FLOATING', p: { shadow: 'none', border: 'thick' }, customizers: [] },
    { id: 'trm_cmd', fam: 'fam_terminal', label: 'CMD', icon: 'fas fa-angle-right', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'flat' }, customizers: ['term_blink'] },
    { id: 'trm_bash', fam: 'fam_terminal', label: 'Bash', icon: 'fas fa-dollar-sign', mode: 'FIXED', tag: 'OUTLINE_GEOMETRIC', p: { weight: 'thin' }, customizers: ['term_blink'] },
    { id: 'trm_power', fam: 'fam_terminal', label: 'Power', icon: 'fas fa-plug', mode: 'FIXED', tag: 'SOLID_HARD', p: { depth: 'deep' }, customizers: [] },
    { id: 'mat_surf', fam: 'fam_material', label: 'Surface', icon: 'fas fa-layer-group', mode: 'ACCENT_DOMINANT', tag: 'FLAT_FLOATING', p: { shadow: 'none' }, customizers: ['mat_flat', 'mat_float'] },
    { id: 'mat_std', fam: 'fam_material', label: 'Standard', icon: 'fab fa-android', mode: 'ACCENT_DOMINANT', tag: 'FLAT_FLOATING', p: { shadow: 'raised' }, customizers: ['mat_float'] },
    { id: 'mat_high', fam: 'fam_material', label: 'Elevated', icon: 'fas fa-box-open', mode: 'ACCENT_DOMINANT', tag: 'VOLUMETRIC_SOFT', p: { vol: 'low' }, customizers: ['mat_float'] },
    { id: 'ios_light', fam: 'fam_ios', label: 'Light', icon: 'fab fa-apple', mode: 'ACCENT_DOMINANT', tag: 'FLAT_FLOATING', p: { shadow: 'none', border: 'thin' }, customizers: ['ios_blur'] },
    { id: 'ios_glass', fam: 'fam_ios', label: 'Glassy', icon: 'fas fa-mobile-alt', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '20', style: 'std' }, customizers: ['ios_blur'] },
    { id: 'ios_depth', fam: 'fam_ios', label: 'Depth', icon: 'fas fa-sort-amount-up', mode: 'ACCENT_DOMINANT', tag: 'FLAT_FLOATING', p: { shadow: 'raised', border: 'none' }, customizers: ['ios_blur'] },
    { id: 'aur_dream', fam: 'fam_aura', label: 'Dream', icon: 'fas fa-cloud-moon', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '20', style: 'crystal' }, customizers: ['aura_neon'] },
    { id: 'aur_night', fam: 'fam_aura', label: 'Night', icon: 'fas fa-moon', mode: 'ACCENT_DOMINANT', tag: 'TRANSLUCENT_BLUR', p: { blur: '40', style: 'ghost' }, customizers: ['aura_neon'] },
    { id: 'aur_solar', fam: 'fam_aura', label: 'Solar', icon: 'fas fa-sun', mode: 'ACCENT_DOMINANT', tag: 'VOLUMETRIC_SOFT', p: { vol: 'high' }, customizers: [] }
];

export const SIGNATURES = {
    'fam_neu': { border: 'none', gapScale: 1.0 }, 'fam_clay': { border: 'none', gapScale: 1.2 }, 'fam_glass': { border: '1px solid rgba(255,255,255, 0.25)', gapScale: 1.0 },
    'fam_fluent': { border: '1px solid rgba(255,255,255, 0.1)', gapScale: 0.9 }, 'fam_clean': { border: '1px solid rgba(0,0,0, 0.08)', gapScale: 1.1 },
    'fam_outline': { border: '2px solid currentColor', gapScale: 1.0 }, 'fam_brutal': { border: '3px solid #000000', gapScale: 1.0 },
    'fam_retro': { border: '2px solid #000000', gapScale: 1.0 }, 'fam_cyber': { border: '1px solid var(--accent)', gapScale: 0.8 },
    'fam_material': { border: 'none', gapScale: 1.0 }, 'fam_paper': { border: '1px solid #333', gapScale: 1.0 },
    'fam_ios': { border: 'none', gapScale: 0.8 }, 'fam_terminal': { border: '1px solid var(--accent)', gapScale: 1.0 }, 'fam_aura': { border: '1px solid rgba(255,255,255,0.4)', gapScale: 1.1 }
};

export const BEHAVIORS = {
    'fam_neu': { density: 'comfort',  surf: 'merged',   colStrat: 'ACCENT_ONLY' }, 'fam_clay': { density: 'loose',    surf: 'merged',   colStrat: 'CANVAS_BRAND' },
    'fam_glass': { density: 'comfort',  surf: 'floating', colStrat: 'CANVAS_BRAND' }, 'fam_fluent': { density: 'compact',  surf: 'floating', colStrat: 'ACCENT_ONLY' },
    'fam_clean': { density: 'comfort',  surf: 'layered',  colStrat: 'ACCENT_ONLY' }, 'fam_outline': { density: 'tight',    surf: 'layered',  colStrat: 'ACCENT_ONLY' },
    'fam_brutal': { density: 'compact',  surf: 'solid',    colStrat: 'SURFACE_BRAND' }, 'fam_retro': { density: 'compact',  surf: 'solid',    colStrat: 'ACCENT_ONLY' },
    'fam_cyber': { density: 'tight',    surf: 'solid',    colStrat: 'CANVAS_BRAND' }, 'fam_material': { density: 'comfort',  surf: 'layered',  colStrat: 'SURFACE_BRAND' },
    'fam_paper': { density: 'comfort',  surf: 'solid',    colStrat: 'ACCENT_ONLY' }, 'fam_ios': { density: 'compact',  surf: 'layered',  colStrat: 'ACCENT_ONLY' },
    'fam_terminal': { density: 'tight',    surf: 'solid',    colStrat: 'CANVAS_BRAND' }, 'fam_aura': { density: 'loose',    surf: 'floating', colStrat: 'CANVAS_BRAND' }
};

export const OPTIONS = {
    'base_sink': { id: 't_base', label: 'Base: Tenggelam', icon: 'fas fa-vector-square' },
    'info_pop': { id: 't_sub', label: 'Info: Timbul', icon: 'fas fa-info-circle' },
    'act_sink': { id: 't_action', label: 'Action: Tenggelam', icon: 'far fa-circle' },
    'mat_flat': { id: 't_base', label: 'Card: Flat Mode', icon: 'fas fa-stop' },
    'mat_float': { id: 't_action', label: 'Btn: High Float', icon: 'fas fa-paper-plane' },
    'clay_solid': { id: 't_base', label: 'Base: Solid', icon: 'fas fa-tint-slash' },
    'glass_clear': { id: 't_base', label: 'Base: Clear', icon: 'fas fa-fill-drip' },
    'glass_glow': { id: 't_action', label: 'Action: Glow', icon: 'fas fa-lightbulb' },
    'clean_border': { id: 't_base', label: 'Base: Bordered', icon: 'far fa-square' },
    'clean_fill': { id: 't_action', label: 'Action: Filled', icon: 'fas fa-fill' },
    'brut_noshadow': { id: 't_base', label: 'Base: No Shadow', icon: 'fas fa-stop' },
    'out_bold': { id: 't_base', label: 'Bold Lines', icon: 'fas fa-pen' },
    'out_fill': { id: 't_action', label: 'Action: Fill', icon: 'fas fa-fill' },
    'retro_hard': { id: 't_base', label: 'Hard Shadow', icon: 'fas fa-th-large' },
    'paper_tex': { id: 't_base', label: 'Texture', icon: 'fas fa-scroll' },
    'ios_blur': { id: 't_nav', label: 'Blurry Nav', icon: 'fas fa-tint' },
    'term_blink': { id: 't_action', label: 'Blink Cursor', icon: 'fas fa-i-cursor' },
    'aura_neon': { id: 't_action', label: 'Neon Mode', icon: 'fas fa-lightbulb' }
};
