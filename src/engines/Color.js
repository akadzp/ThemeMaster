export default class ColorEngine {
    async process(state, config) {
        const variant = config.VARIANTS ? config.VARIANTS[state.activeStyleId] : null;
        if (!variant) return { palette: {}, tokens: {} };

        const colorDna = variant.color_dna || {};
        const fam = config.FAMILIES ? config.FAMILIES[variant.fam] : null;
        const worldColorKey = variant.worldColor || (fam ? fam.worldColor : 'wc_a');
        const worldColorStrategy = config.worldColor ? config.worldColor[worldColorKey] : null;
        
        if (!worldColorStrategy) return { palette: {}, tokens: {} };
        const colorValues = fam ? fam.colorValues : {}; 
        const baseColor = state.currentColor || '#3b82f6';

        let isDark = state.isDark;
        if (worldColorStrategy.dark_policy === 'wajib-on') isDark = true;
        if (worldColorStrategy.dark_policy === 'wajib-off') isDark = false;

        let isBgFilled = state.isBgFilled;
        if (worldColorStrategy.bg_policy === 'wajib-on') isBgFilled = true;
        if (worldColorStrategy.bg_policy === 'wajib-off') isBgFilled = false;

        const palette = this._generatePalette(baseColor, colorDna, isDark, isBgFilled, colorValues);
        const tokens = this._routeToTokens(palette, worldColorStrategy);
        
        return { palette, tokens };
    }

            _generatePalette(baseColor, colorDna, isDark, isBgFilled, colorValues, configDefaults) {
        let oklch = ColorUtils.hexToOklch(baseColor);
        const def = configDefaults || {};

        oklch.h = (oklch.h + (colorDna.hue_rotation ?? def.hue_rotation ?? 0)) % 360;

        let cBoost = (colorDna.saturation_boost ?? def.saturation_boost ?? 0); 
        oklch.c = Math.max(0, oklch.c + cBoost);
        
        const tint = isBgFilled ? (colorDna.bg_tint_strength ?? def.bg_tint_strength ?? 0.1) : 0;


        let confDark = (colorValues.baseDark ?? def.baseDark ?? 15) / 100;
        let confLight = (colorValues.baseLight ?? def.baseLight ?? 96) / 100;
        let surfOffset = (colorValues.surfLOffset ?? def.surfLOffset ?? 3) / 100;
        
        let bgL = isDark ? confDark : confLight;
        bgL = isDark ? bgL + ((oklch.l - bgL) * tint) : bgL - ((bgL - oklch.l) * tint);
        
        const maxL = (colorValues.maxLightness ?? def.maxLightness ?? 99) / 100;
        const minL = (colorValues.minLightness ?? def.minLightness ?? 1) / 100;
        bgL = Math.max(minL, Math.min(maxL, bgL));

        const surfL = isDark ? bgL + surfOffset : bgL;

        const contrastThreshold = colorDna.contrast_threshold ?? def.contrast_threshold ?? 0.65;
        const isBgDark = bgL < contrastThreshold;


        let priL = (colorDna.primary_lightness ?? def.primary_lightness) !== undefined 
            ? (colorDna.primary_lightness ?? def.primary_lightness) / 100 
            : oklch.l;
            
        let secL = (colorDna.secondary_lightness ?? def.secondary_lightness) !== undefined 
            ? (colorDna.secondary_lightness ?? def.secondary_lightness) / 100 
            : oklch.l;

        const harmonyType = colorDna.harmony_type ?? def.harmony_type ?? 'monochromatic';
        const harmonyStrength = colorDna.harmony_strength ?? def.harmony_strength ?? 1.0;
        
        let secHue = oklch.h;
        let terHue = oklch.h;
        
        if (harmonyType === 'complementary') {
            secHue = (oklch.h + 180) % 360;
            terHue = (oklch.h + 180) % 360;
        } else if (harmonyType === 'analogous') {
            secHue = (oklch.h + 30) % 360;
            terHue = (oklch.h - 30 + 360) % 360;
        } else if (harmonyType === 'triadic') {
            secHue = (oklch.h + 120) % 360;
            terHue = (oklch.h + 240) % 360;
        } else if (harmonyType === 'split_complementary') {
            secHue = (oklch.h + 150) % 360;
            terHue = (oklch.h + 210) % 360;
        } else {
            secHue = (oklch.h + (colorDna.secondary_hue_rotation ?? def.secondary_hue_rotation ?? 0)) % 360;
            terHue = secHue;
        }

        const secChroma = oklch.c * harmonyStrength;

        const palette = {
            background: ColorUtils.oklchToHex(bgL, isBgFilled ? (oklch.c * tint) : 0, oklch.h),
            surface: ColorUtils.oklchToHex(surfL, isBgFilled ? (oklch.c * tint) : 0, oklch.h),
            primary: ColorUtils.oklchToHex(priL, oklch.c, oklch.h),
            secondary: ColorUtils.oklchToHex(secL, secChroma, secHue),
            tertiary: ColorUtils.oklchToHex(secL, secChroma, terHue),
                                    textPrimary: ColorUtils.enforceContrast(ColorUtils.oklchToHex(bgL, isBgFilled ? (oklch.c * tint) : 0, oklch.h), isBgDark ? (colorValues.textColorDark ?? def.textColorDark ?? '#ffffff') : (colorValues.textColorLight ?? def.textColorLight ?? '#000000'), 4.5),
            textSecondary: ColorUtils.enforceContrast(ColorUtils.oklchToHex(bgL, isBgFilled ? (oklch.c * tint) : 0, oklch.h), isBgDark ? (colorValues.textSecondaryDark ?? def.textSecondaryDark ?? '#9ca3af') : (colorValues.textSecondaryLight ?? def.textSecondaryLight ?? '#4b5563'), 4.5),
                        textOnCore: ColorUtils.getReadableText(ColorUtils.oklchToHex(priL, oklch.c, oklch.h), colorValues)
        };

        const gradAngle = colorDna.gradient_angle ?? def.gradient_angle ?? 135;
        const gradHue = (oklch.h + 15) % 360;
                palette.primaryGradientStop = ColorUtils.oklchToHex(priL, oklch.c, gradHue);
        palette.gradientAngle = gradAngle;

        const hoverRatio = colorDna.hover_mix_ratio ?? def.hover_mix_ratio ?? 0.08;
        palette.primaryHover = ColorUtils.mix(palette.primary, isDark ? '#ffffff' : '#000000', hoverRatio);
        palette.primaryActive = ColorUtils.mix(palette.primary, isDark ? '#ffffff' : '#000000', hoverRatio * 2);

        const shadeCount = colorValues.shadeCount ?? def.shade_count ?? 5;

        const spread = maxL - minL;
        const step = spread / (shadeCount > 1 ? shadeCount - 1 : 1);
        for (let i = 0; i < shadeCount; i++) {
            palette[`shade_${i}`] = ColorUtils.oklchToHex(minL + (i * step), oklch.c, oklch.h);
        }

        palette.alpha = {
            subtle: colorDna.subtle_opacity ?? def.subtle_opacity ?? 0.1,
            glass: colorDna.glass_opacity ?? def.glass_opacity ?? 0.6,
            border: isBgDark ? (colorDna.border_opacity_dark ?? def.border_opacity ?? 0.15) : (colorDna.border_opacity_light ?? def.border_opacity ?? 0.1),
            shadow: isDark ? (colorDna.shadow_opacity_dark ?? def.shadow_opacity_dark ?? 0.5) : (colorDna.shadow_opacity_light ?? def.shadow_opacity_light ?? 0.1),
            highlight: isDark ? (colorDna.highlight_opacity_dark ?? def.highlight_opacity_dark ?? 0.1) : (colorDna.highlight_opacity_light ?? def.highlight_opacity_light ?? 0.5)
        };

                const successHex = colorDna.semantic_success_hex ?? colorValues.status_success ?? def.status_success ?? '#10b981';
        const warningHex = colorDna.semantic_warning_hex ?? colorValues.status_warning ?? def.status_warning ?? '#f59e0b';
        const errorHex = colorDna.semantic_error_hex ?? colorValues.status_error ?? def.status_error ?? '#ef4444';
        const infoHex = colorDna.semantic_info_hex ?? colorValues.status_info ?? def.status_info ?? '#3b82f6';

        palette.status = {
            success: successHex,
            warning: warningHex,
            error: errorHex,
            info: infoHex,
            onSuccess: ColorUtils.getReadableText(successHex, colorValues),
            onWarning: ColorUtils.getReadableText(warningHex, colorValues),
            onError: ColorUtils.getReadableText(errorHex, colorValues),
            onInfo: ColorUtils.getReadableText(infoHex, colorValues)
        };

        return palette;

    }


    _routeToTokens(palette, strategy) {
        const tokens = {};
        const dict = {
            background: { hex: palette.background, a: 1 },
            surface: { hex: palette.surface, a: 1 },
            surface_glass: { hex: palette.surface, a: palette.alpha.glass },
            surface_subtle: { hex: palette.textPrimary, a: palette.alpha.border },
            primary: { hex: palette.primary, a: 1 },
            secondary: { hex: palette.secondary, a: 1 },
            tertiary: { hex: palette.tertiary, a: 1 },
            primary_subtle: { hex: palette.primary, a: palette.alpha.subtle },
            textPrimary: { hex: palette.textPrimary, a: 1 },
            textSecondary: { hex: palette.textSecondary, a: 1 },
            textOnCore: { hex: palette.textOnCore, a: 1 },
            shadow: { hex: '#000000', a: palette.alpha.shadow },
            highlight: { hex: '#ffffff', a: palette.alpha.highlight },
            transparent: { hex: '#000000', a: 0 },
            glass_fx: { hex: palette.surface, a: palette.alpha.glass },
            success: { hex: palette.status.success, a: 1 },
            warning: { hex: palette.status.warning, a: 1 },
            error: { hex: palette.status.error, a: 1 },
            info: { hex: palette.status.info, a: 1 },
            utility: { hex: palette.textPrimary, a: palette.alpha.shadow }
        };

        Object.entries(strategy.mapping || {}).forEach(([dictKey, mapConfig]) => {
            let tokenArray = [];
            let strength = 1.0;
            let sourceKey = dictKey;

            if (Array.isArray(mapConfig)) {
                tokenArray = mapConfig;
            } else if (typeof mapConfig === 'object') {
                tokenArray = mapConfig.tokens || [];
                strength = mapConfig.strength ?? 1.0;
                sourceKey = mapConfig.source || dictKey;
            }

            const source = dict[sourceKey] || dict.transparent;
            
            let rVal = 0, gVal = 0, bVal = 0;
            
            if (strength < 1.0 && sourceKey !== 'transparent') {
                const baseSource = dict['background'] || dict.transparent;
                const mixedHex = ColorUtils.mix(source.hex, baseSource.hex, strength);
                const rgb = ColorUtils.hexToRgb(mixedHex);
                rVal = rgb.r; gVal = rgb.g; bVal = rgb.b;
            } else {
                const rgb = ColorUtils.hexToRgb(source.hex);
                rVal = rgb.r; gVal = rgb.g; bVal = rgb.b;
            }

                        tokenArray.forEach(varName => {
                let finalHex = source.hex;
                if (sourceKey === 'success' && varName.toLowerCase().includes('text')) finalHex = palette.status.onSuccess;
                else if (sourceKey === 'warning' && varName.toLowerCase().includes('text')) finalHex = palette.status.onWarning;
                else if (sourceKey === 'error' && varName.toLowerCase().includes('text')) finalHex = palette.status.onError;
                else if (sourceKey === 'info' && varName.toLowerCase().includes('text')) finalHex = palette.status.onInfo;

                let fR = rVal, fG = gVal, fB = bVal;
                if (finalHex !== source.hex) {
                    const rgb = ColorUtils.hexToRgb(finalHex);
                    fR = rgb.r; fG = rgb.g; fB = rgb.b;
                }
                tokens[varName] = { type: 'color', r: fR, g: fG, b: fB, alpha: source.a };
            });

                });

                tokens['primaryGradient'] = { type: 'gradient', angle: palette.gradientAngle, start: palette.primary, end: palette.primaryGradientStop };

        const rgbHover = ColorUtils.hexToRgb(palette.primaryHover);
        tokens['actionPrimaryHoverBg'] = { type: 'color', r: rgbHover.r, g: rgbHover.g, b: rgbHover.b, alpha: 1 };
        
        const rgbActive = ColorUtils.hexToRgb(palette.primaryActive);
        tokens['actionPrimaryActiveBg'] = { type: 'color', r: rgbActive.r, g: rgbActive.g, b: rgbActive.b, alpha: 1 };

        return tokens;
    }
}