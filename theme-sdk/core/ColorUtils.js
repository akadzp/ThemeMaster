// --------------------------------------------------------
// 📂 FILE: core/ColorUtils.js
// --------------------------------------------------------
export const ColorUtils = {
    hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
    },
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    getLuminance(hex) {
        const {r, g, b} = this.hexToRgb(hex);
        const a = [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    },
    getContrastRatio(hex1, hex2) {
        const lum1 = this.getLuminance(hex1);
        const lum2 = this.getLuminance(hex2);
        return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    },
    hexToHsl(hex) {
        let {r, g, b} = this.hexToRgb(hex);
        r /= 255; g /= 255; b /= 255;
        let cmin = Math.min(r,g,b), cmax = Math.max(r,g,b), delta = cmax - cmin;
        let h = 0, s = 0, l = 0;
        if (delta === 0) h = 0;
        else if (cmax === r) h = ((g - b) / delta) % 6;
        else if (cmax === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60); if (h < 0) h += 360;
        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        return { h, s, l };
    },
    hslToHex(h, s, l) {
        let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
        r = Math.round((r + m) * 255); g = Math.round((g + m) * 255); b = Math.round((b + m) * 255);
        return this.rgbToHex(r,g,b);
    },
    tone(hex, percent) {
        const { h, s, l } = this.hexToHsl(hex);
        let newL;
        if (percent >= 0) newL = l + ((1 - l) * (percent / 100));
        else newL = l * (1 - (Math.abs(percent) / 100));
        return this.hslToHex(h, s, newL);
    },
    chroma(hex, factor) {
        const { h, s, l } = this.hexToHsl(hex);
        let newS = Math.min(1, Math.max(0, s * factor));
        return this.hslToHex(h, newS, l);
    },
    mix(c1, c2, weight) {
        const rgb1 = this.hexToRgb(c1);
        const rgb2 = this.hexToRgb(c2);
        const w = weight;
        const r = Math.round(rgb1.r * w + rgb2.r * (1 - w));
        const g = Math.round(rgb1.g * w + rgb2.g * (1 - w));
        const b = Math.round(rgb1.b * w + rgb2.b * (1 - w));
        return this.rgbToHex(r,g,b);
    },
    resolveText(bgHex, familyMode) {
        if (familyMode === 'white_force') return '#ffffff';
        if (familyMode === 'terminal') return '#00ff00';
        if (familyMode === 'hard') {
            const lum = this.getLuminance(bgHex);
            return lum > 0.5 ? '#000000' : '#ffffff';
        }
        const whiteCR = this.getContrastRatio(bgHex, '#ffffff');
        const blackCR = this.getContrastRatio(bgHex, '#0f172a');
        if (familyMode === 'soft') {
            if (whiteCR > 3.5) return '#f1f5f9';
            return '#1e293b';
        }
        return whiteCR >= blackCR ? '#ffffff' : '#0f172a';
    }
};