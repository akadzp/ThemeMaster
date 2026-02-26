export default class FontEngine {
    process(state, config) {
        const fontName = state.activeFont || 'Plus Jakarta Sans';
        const settings = config.TYPOGRAPHY || { baseSize: 14, scaleRatio: 1.25 };
        const scale = (step) => Math.round(settings.baseSize * Math.pow(settings.scaleRatio, step));

                const tokens = {
            'fontFamilyPrimary': { type: 'fontFamily', value: fontName, fallback: 'sans-serif' },
            'fontFamilySecondary': { type: 'fontFamily', value: 'sans-serif', fallback: 'sans-serif' },
            'fontFamilyMonospace': { type: 'fontFamily', value: 'Fira Code', fallback: 'monospace' },
            'fontSizeXs': { value: scale(-1), unit: 'px' },
            'fontSizeSm': { value: scale(0), unit: 'px' },
            'fontSizeMd': { value: scale(1), unit: 'px' },
            'fontSizeLg': { value: scale(2), unit: 'px' },
            'fontSizeXl': { value: scale(4), unit: 'px' },
            'fontWeightLight': { value: 300, unit: '' },
            'fontWeightRegular': { value: 400, unit: '' },
            'fontWeightMedium': { value: 500, unit: '' },
            'fontWeightBold': { value: 700, unit: '' },
            'lineHeightTight': { value: 1.2, unit: '' },
            'lineHeightNormal': { value: 1.6, unit: '' },
            'lineHeightLoose': { value: 2.0, unit: '' }
        };
        return { 
            typography: { 
                primaryFont: fontName, 
                weights: [300, 400, 500, 600, 700, 800],
                provider: 'google'
            }, 
            tokens: tokens 
        };
    }
}