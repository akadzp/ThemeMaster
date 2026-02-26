// --- 1. IMPORT CONFIGS & DATA ---
// Sesuaikan nama file dan path-nya jika berbeda
import { CONFIG_TOKEN_MAP } from '../configs/tokens.js';
import { COLOR_DNA, T_GRP, worldColor } from '../configs/color.js';
import { THEME_DNA, worldTheme, CONFIG_THEME } from '../configs/theme.js';
import { CONFIG_MOTION } from '../configs/motion.js'; // jika ada
import { CONFIG_FONT} from '../configs/font.js';
import { CONFIG_CONTEXT } from '../config/context.js';

// --- 2. IMPORT ENGINES ---
import ColorEngine from '../engines/Color.js';
import ThemeEngine from '../engines/Theme.js';
import FontEngine from '../engines/Font.js';
import IconEngine from '../engines/IconE.js';
import LayoutEngine from '../engines/Layout.js';
import ContextEngine from '../engines/Context.js';
import MotionEngine from '../engines/Motion.js';
import SoundEngine from '../engines/Sound.js';
import VoiceEngine from '../engines/Voice.js';
import LanguageEngine from '../engines/Lang.js';
import AiEngine from '../engines/Ai.js';

// --- 3. IMPORT RENDERERS ---
import DOMPainter from '../renderers/DOMPainter.js';
import ColorRenderer from '../renderers/Color.js';
import ThemeRenderer from '../renderers/Theme.js';
import FontRenderer from '../renderers/Font.js';
import LayoutRenderer from '../renderers/Layout.js';
import ContextRenderer from '../renderers/Context.js';
import IconRenderer from '../renderers/Icon.js';
import MotionRenderer from '../renderers/Motion.js';




// Pastikan variabel state ini ada di file Anda
const InitialState = {
    environment: 'preview', 
    viewport: 'sm', 
    a11y: { reducedMotion: false },
    activeStyleId: 'neu_soft', 
    activeFamily: 'fam_neu', 
    activeDNA: 'wdna_standard',
    activeColorDNA: 'cdna_vibrant',
    activeWorldColor: 'wc_c',
    mode: 'worldColor', 
    themeTag: 'ELEVATED_DUAL', 
    themeParams: { depth: 'soft' },
    activeOptions: [], 
    shapeStrategy: 'md',
    currentColor: '#3b82f6', 
    isDark: false, 
    isBgFilled: true,
    activeIconPack: 'solar', 
    activeFont: 'Plus Jakarta Sans',
    activePage: 'home', 
    motion: { activeProfile: 'standard' },
    layout: { homeHeader: 'hhstyle_a1', homeBody: 'bhstyle_a1' },
    currentOverrides: {}, 
    contextOverrides: {}, 
    layoutOverrides: {}
};

let _state = JSON.parse(JSON.stringify(InitialState));

class UISDK {
    constructor() { this.pipeline = []; }
    register(name, instance, config) { this.pipeline.push({ name, instance, config }); return this; }
}

const sdk = new UISDK();

// [PERBAIKAN 1]: Rantai pertama ditutup dengan titik koma (;)
sdk.register('color', new ColorEngine(), { 
        worldColor: worldColor, 
        COLOR_DNA: COLOR_DNA,
        COLOR_DNA_PROFILES: (typeof COLOR_DNA_PROFILES !== 'undefined') ? COLOR_DNA_PROFILES : {},
        FAMILIES: CONFIG_THEME.FAMILIES,
        PALETTE: CONFIG_THEME.PALETTE,
        VARIANTS: CONFIG_THEME.VARIANTS,
        worldTheme: worldTheme
   })
   .register('theme', new ThemeEngine(), { 
        worldTheme: worldTheme, 
        DNA: THEME_DNA,
        DNA_PROFILES: (typeof THEME_DNA_PROFILES !== 'undefined') ? THEME_DNA_PROFILES : {},
        THEME_DNA_PROFILES: (typeof THEME_DNA_PROFILES !== 'undefined') ? THEME_DNA_PROFILES : {},
        FAMILIES: CONFIG_THEME.FAMILIES,
        VARIANTS: CONFIG_THEME.VARIANTS,
        OPTIONS: CONFIG_THEME.OPTIONS
   })
   .register('motion', new MotionEngine(), CONFIG_MOTION)
   .register('font', new FontEngine(), { ...CONFIG_FONT, TYPOGRAPHY: CONFIG_THEME.TYPOGRAPHY });

// Setelah rantai ditutup, baru boleh menjalankan logika variabel
const dynamicLayouts = {};
if (window.UniverseStudio && window.UniverseStudio.Registry) {
    Object.keys(window.UniverseStudio.Registry).forEach(key => {
        dynamicLayouts[key] = window.UniverseStudio.Registry[key].config;
    });
}

// Lanjutkan rantai register untuk engine sisanya
sdk.register('layout', new LayoutEngine(), { LAYOUT: dynamicLayouts })
   .register('context', new ContextEngine(), CONFIG_CONTEXT)
   .register('icon', new IconEngine(), CONFIG_ICON)
   .register('sound', new SoundEngine(), {})
   .register('voice', new VoiceEngine(), {})
   .register('lang', new LanguageEngine(), {})
   .register('ai', new AiEngine(), {});

const painter = new DOMPainter()
    .setTokenMap(CONFIG_TOKEN_MAP)
    .registerRenderer('color', new ColorRenderer())
    .registerRenderer('theme', new ThemeRenderer())
    .registerRenderer('font', new FontRenderer())
    .registerRenderer('layout', new LayoutRenderer())
    .registerRenderer('context', new ContextRenderer())
    .registerRenderer('icon', new IconRenderer())
    .registerRenderer('motion', new MotionRenderer());


async function _runEngine() {
    const engines = {};
    for (const item of sdk.pipeline) {
        engines[item.name] = item;
    }

    async function safeRun(engineDef, ...args) {
        if (!engineDef) return null;
        try {
            return await engineDef.instance.process(_state, engineDef.config, ...args);
        } catch (err) {
            console.error(`[UISDK] Isolator Actived: Engine '${engineDef.name}' failed`, err);
            return null;
        }
    }

    const results = {
        color: await safeRun(engines.color),
        theme: await safeRun(engines.theme),
        motion: await safeRun(engines.motion),
        font: await safeRun(engines.font),
        layout: await safeRun(engines.layout),
        icon: await safeRun(engines.icon),
        sound: await safeRun(engines.sound),
        voice: await safeRun(engines.voice),
        lang: await safeRun(engines.lang),
        ai: await safeRun(engines.ai)
    };

    const palette = results.color ? results.color.palette : null;
    const contextRes = await safeRun(engines.context); 

    const manifest = {
        tokens: {},
        vars: results.theme ? results.theme.vars : {},
        palette: palette,
        layout: results.layout ? results.layout.layout : null,
        motion: results.motion ? results.motion.motion : null,
        overrides: contextRes ? contextRes.overrides : null,
        typography: results.font ? results.font.typography : null,
        iconography: results.icon ? results.icon.iconography : null,
        sound: results.sound ? results.sound.sound : null,
        voice: results.voice ? results.voice.voice : null,
        locale: results.lang ? results.lang.locale : null,
        ai: results.ai ? results.ai.ai : null
    };

    const tokenSources = [
        { name: 'color', data: results.color },
        { name: 'theme', data: results.theme },
        { name: 'motion', data: results.motion }, 
        { name: 'font', data: results.font }
    ];

    const tokenStats = {};
    tokenSources.forEach(source => {
        if (source.data && source.data.tokens) {
            const sourceTokenCount = Object.keys(source.data.tokens).length;
            tokenStats[source.name] = sourceTokenCount;
            
            Object.entries(source.data.tokens).forEach(([key, value]) => {
                if (manifest.tokens[key]) {
                    console.warn(`[UISDK] Token override: ${key} (${source.name} overrides previous)`);
                }
                manifest.tokens[key] = value;
            });
        } else {
            tokenStats[source.name] = 0;
        }
    });

    painter.paint(manifest, _state);
}

class ExportEngine { static getPayload() { return btoa(JSON.stringify(["V5.2_COMPLETE", _state])); } }

export const API = Object.freeze({
    getConfig: () => ({ 
        THEME: CONFIG_THEME, 
        LAYOUT: dynamicLayouts, 
        CONTEXT: CONFIG_CONTEXT, 
        ICON: CONFIG_ICON, 
        FONT: CONFIG_FONT, 
        worldColor: worldColor 
    }),
    
    getState: () => JSON.parse(JSON.stringify(_state)),
    setIconPack: (packId) => { _state.activeIconPack = packId; return _runEngine(); },
    setFont: (fontName) => { _state.activeFont = fontName; return _runEngine(); },
    
    setTheme: (variantId) => { 
        const variant = CONFIG_THEME.VARIANTS[variantId]; 
        if (!variant) return Promise.resolve(); 
        
        const parentFam = CONFIG_THEME.FAMILIES[variant.fam];
        _state.activeStyleId = variant.id; 
        _state.activeFamily = variant.fam; 
        
        const wcKey = variant.worldColor || parentFam.worldColor || 'wc_a';
        _state.activeWorldColor = wcKey;

        const wcConfig = worldColor[wcKey];
        if (wcConfig) {
            if (wcConfig.dark_policy === 'wajib-on') _state.isDark = true;
            else if (wcConfig.dark_policy === 'wajib-off') _state.isDark = false;

            if (wcConfig.bg_policy === 'wajib-on') _state.isBgFilled = true;
            else if (wcConfig.bg_policy === 'wajib-off') _state.isBgFilled = false;
        }

        if (variant.dna && typeof variant.dna === 'string') _state.activeDNA = variant.dna;
        else if (parentFam.dna) _state.activeDNA = parentFam.dna;
        else _state.activeDNA = 'wdna_standard';
        
        _state.activeOptions = []; 
        return _runEngine();
    },

    setOption: (optId, isActive) => { 
        if (isActive) { if (!_state.activeOptions.includes(optId)) _state.activeOptions.push(optId); } 
        else { _state.activeOptions = _state.activeOptions.filter(x => x !== optId); } 
        return _runEngine(); 
    },
    setDNA: (dnaId) => { if (THEME_DNA[dnaId] || THEME_DNA_PROFILES[dnaId]) { _state.activeDNA = dnaId; return _runEngine(); } return Promise.resolve(); },
    setLayout: (target, value) => { if (_state.layout) _state.layout[target] = value; return _runEngine(); },
    setShape: (shapeId) => { _state.shapeStrategy = shapeId; return _runEngine(); },
    setPage: (pageId) => { _state.activePage = pageId; return _runEngine(); },
    
    toggleDark: () => { 
        const wcConfig = worldColor[_state.activeWorldColor];
        if (wcConfig && wcConfig.dark_policy !== 'toggle') return Promise.resolve();
        _state.isDark = !_state.isDark; 
        return _runEngine(); 
    },
    
    toggleBg: () => { 
        const wcConfig = worldColor[_state.activeWorldColor];
        if (wcConfig && wcConfig.bg_policy !== 'toggle') return Promise.resolve();
        _state.isBgFilled = !_state.isBgFilled; 
        return _runEngine(); 
    },

    setContextOverride: (id, value) => { if (value === null) delete _state.contextOverrides[id]; else _state.contextOverrides[id] = value; return _runEngine(); },
    setColor: (hexColor) => { if (!hexColor || typeof hexColor !== 'string') return Promise.resolve(); _state.currentColor = hexColor; return _runEngine(); },
    setLayoutOverride: (domId, rule, val) => { if (!_state.layoutOverrides[domId]) _state.layoutOverrides[domId] = {}; _state.layoutOverrides[domId][rule] = val; return _runEngine(); },
    apply: () => _runEngine(),
    loadState: (savedState) => { if (savedState) _state = { ..._state, ...savedState }; return _runEngine(); },
    generateCode: () => ExportEngine.getPayload()
});

// [PERBAIKAN 2]: Menghapus })(window); karena kita menggunakan format standard JS Modules.
// Langsung pasangkan ke window namespace
window.UniverseStudio = window.UniverseStudio || {};
window.UniverseStudio.Core = API;
