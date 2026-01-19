// --------------------------------------------------------
// 📂 FILE: core/ThemeSDK.js
// --------------------------------------------------------
import { ColorEngine } from './ColorEngine.js';
import { ThemeEngine } from './ThemeEngine.js';
import { LayoutEngine } from './LayoutEngine.js';
import { ContextEngine } from './ContextEngine.js';
import { MotionEngine } from './MotionEngine.js';

export class ThemeSDK {
    constructor() {
        this.color = new ColorEngine();
        this.theme = new ThemeEngine();
        this.layout = new LayoutEngine();
        this.context = new ContextEngine();
        this.motion = new MotionEngine();
        console.log("🚀 THEME SDK INITIALIZED (MODULAR)");
    }

    /**
     * Menjalankan seluruh pipeline kalkulasi.
     * @param {Object} state - State aplikasi (user input)
     * @param {Object} config - Gabungan seluruh konfigurasi (DNA, DB, dll)
     */
    run(state, config) {
        // 1. Hitung Warna
        const colorRes = this.color.resolve(state, config.COLOR_DNA);
        
        // 2. Hitung Fisika (Butuh output warna untuk shadow)
        const themeRes = this.theme.resolve(state, config.THEME_CONFIG, colorRes);
        
        // 3. Hitung Layout
        const layoutRes = this.layout.resolve(state);

        // 4. Hitung Motion
        const motionRes = this.motion.resolve(state, config.MOTION_CONFIG);
        
        // 5. Hitung Context/Veto
        const contextRes = this.context.resolve(state, config.CONTEXT_CONFIG);

        // Kembalikan paket data lengkap
        return {
            tokens: colorRes,
            vars: themeRes,
            layout: layoutRes,
            motion: motionRes,
            overrides: contextRes
        };
    }
}