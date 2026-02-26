export default class ThemeEngine {
    async process(state, config) {
        const variant = config.VARIANTS ? config.VARIANTS[state.activeStyleId] : null;
        if (!variant) return { vars: {}, tokens: {} };

        const themeDna = variant.theme_dna || {};
        const fam = config.FAMILIES ? config.FAMILIES[variant.fam] : null;
        const worldThemeConfig = variant.worldTheme || (fam ? fam.worldTheme : null);
        
        if (!worldThemeConfig) return { vars: {}, tokens: {} };


        const instructions = [];
        if (state.activeOptions && config.OPTIONS) {
            state.activeOptions.forEach(optId => {
                const opt = config.OPTIONS[optId];
                if (opt && opt.instruction) instructions.push(opt.instruction);
            });
        }
        const isInset = instructions.includes('invert_shadow_to_inset');
        const hasMicroBorder = instructions.includes('inject_micro_border_0.5px');

        const vars = this._generateThemeVars(themeDna, worldThemeConfig, isInset);
        const tokens = this._generateTokens(themeDna, vars, isInset, hasMicroBorder);

        return { vars, tokens };
    }

        _generateThemeVars(themeDna, worldThemeConfig, isInset, configDefaults) {
        const vars = {};
        const def = configDefaults || {};
        const shadowScale = themeDna.shadow_scale ?? def.shadow_scale;
        const physics = worldThemeConfig.physics_logic || def.physics_logic;
        
        vars.rawShadow = {
            style: worldThemeConfig.shadow_style ?? def.shadow_style,
            baseElevation: (worldThemeConfig.shadow_offset_base ?? def.shadow_offset_base) * shadowScale,
            physics: physics
        };

        vars.spacing = { 
            scale: themeDna.spacing_scale ?? def.spacing_scale, 
            base: worldThemeConfig.spacing_baseline ?? def.spacing_baseline 
        };
        
                vars.radius = {
            scale: themeDna.radius_scale ?? def.radius_scale,
            base: worldThemeConfig.radius_baseline ?? def.radius_baseline,
            force_sharp: themeDna.force_sharp ?? def.force_sharp,
            force_round: themeDna.force_round ?? def.force_round,
            tl: themeDna.radius_top_left ?? 1,
            tr: themeDna.radius_top_right ?? 1,
            br: themeDna.radius_bottom_right ?? 1,
            bl: themeDna.radius_bottom_left ?? 1
        };

        vars.border = {
            width: (worldThemeConfig.border_width_base ?? def.border_width_base) * (themeDna.border_width_scale ?? def.border_width_scale),
            style: worldThemeConfig.border_style ?? def.border_style
        };

        vars.surface = {
            style: worldThemeConfig.surface_style ?? def.surface_style,
            glassBlur: (worldThemeConfig.surface_glass_blur ?? def.surface_glass_blur) * (themeDna.glass_blur_scale ?? def.glass_blur_scale),
            personality: worldThemeConfig.surface_personality ?? def.surface_personality ?? 'digital',
            decoration: worldThemeConfig.decoration_strategy ?? def.decoration_strategy ?? 'none',
            laws: worldThemeConfig.visual_laws ?? def.visual_laws ?? {}
        };
        
                vars.scaleRatio = worldThemeConfig.scale_ratio ?? def.scale_ratio;
        vars.elevationMults = worldThemeConfig.elevation_multipliers ?? def.elevation_multipliers;
        vars.mobileScale = themeDna.mobile_scale_multiplier ?? def.mobile_scale_multiplier ?? 0.8;

        return vars;
    }

    _generateShadow(style, elevationZ, physicsLogic, isInset = false) {
        if (style === 'none' || !style || elevationZ === 0) return { type: 'none' };
        
        const angle = physicsLogic?.light_angle ?? 90;
        const rad = angle * (Math.PI / 180);
        let dirX = Math.cos(rad);
        let dirY = Math.sin(rad);

        if (isInset) { dirX = -dirX; dirY = -dirY; }

        const layers = [];
        
        const pUmbra = physicsLogic?.umbra ?? { blur: 1.0, spread: 0, dist: 0.5 };
        const pPenumbra = physicsLogic?.penumbra ?? { blur: 2.5, spread: -0.2, dist: 1.0 };
        const pAmbient = physicsLogic?.ambient ?? { blur: 0.5, spread: 0, dist: 0.2 };

        if (style === 'clay' || physicsLogic?.shadow_render_type === 'dual_opposing') {
            layers.push({ intent: 'base_shadow', x: Number((dirX * elevationZ).toFixed(2)), y: Number((dirY * elevationZ).toFixed(2)), blur: elevationZ * pUmbra.blur, spread: elevationZ * pUmbra.spread, inset: isInset });
            layers.push({ intent: 'highlight', x: Number((-dirX * elevationZ).toFixed(2)), y: Number((-dirY * elevationZ).toFixed(2)), blur: elevationZ * pUmbra.blur, spread: elevationZ * pUmbra.spread, inset: !isInset });
        } 
        else if (style === 'hard' || physicsLogic?.shadow_render_type === 'hard_flat') {
            layers.push({ intent: 'base_shadow', x: Number((dirX * elevationZ).toFixed(2)), y: Number((dirY * elevationZ).toFixed(2)), blur: 0, spread: 0, inset: isInset });
        }
        else {
            layers.push({ intent: 'base_shadow', x: Number((dirX * elevationZ * pUmbra.dist).toFixed(2)), y: Number((dirY * elevationZ * pUmbra.dist).toFixed(2)), blur: elevationZ * pUmbra.blur, spread: elevationZ * pUmbra.spread, inset: isInset });
            layers.push({ intent: 'base_shadow', x: Number((dirX * elevationZ * pPenumbra.dist).toFixed(2)), y: Number((dirY * elevationZ * pPenumbra.dist).toFixed(2)), blur: elevationZ * pPenumbra.blur, spread: Number((elevationZ * pPenumbra.spread).toFixed(2)), inset: isInset });
            layers.push({ intent: 'base_shadow', x: 0, y: Number((elevationZ * pAmbient.dist).toFixed(2)), blur: elevationZ * pAmbient.blur, spread: elevationZ * pAmbient.spread, inset: isInset });
        }
        
        return { type: 'shadow', layers };
    }

    _generateTokens(themeDna, vars, isInset = false, hasMicroBorder = false) {
        const tokens = {};
        const calcScale = (b, s, step) => Number(((b * s) * Math.pow(vars.scaleRatio, step)).toFixed(2));

                ['xs', 'sm', 'md', 'lg', 'xl'].forEach((size, i) => {
            const key = `space${size.charAt(0).toUpperCase() + size.slice(1)}`;
            tokens[key] = { value: calcScale(vars.spacing.base, vars.spacing.scale, i - 1), unit: 'px' };
            tokens[`${key}_mobile`] = { value: calcScale(vars.spacing.base * vars.mobileScale, vars.spacing.scale, i - 1), unit: 'px' };
        });

                const rVal = (step) => {
            if (vars.radius.force_sharp) return "0px";
            if (vars.radius.force_round) return "9999px";
            const baseR = calcScale(vars.radius.base, vars.radius.scale, step);
            return `${baseR * vars.radius.tl}px ${baseR * vars.radius.tr}px ${baseR * vars.radius.br}px ${baseR * vars.radius.bl}px`;
        };
        tokens['radiusNone'] = { value: "0px", unit: '' };
        tokens['radiusSm'] = { value: rVal(-1), unit: '' };
        tokens['radiusMd'] = { value: rVal(0), unit: '' };
        tokens['radiusLg'] = { value: rVal(1), unit: '' };
        tokens['radiusFull'] = { value: "9999px", unit: '' };

        const rValMob = (step) => {
            if (vars.radius.force_sharp) return "0px";
            if (vars.radius.force_round) return "9999px";
            const baseR = calcScale(vars.radius.base * vars.mobileScale, vars.radius.scale, step);
            return `${baseR * vars.radius.tl}px ${baseR * vars.radius.tr}px ${baseR * vars.radius.br}px ${baseR * vars.radius.bl}px`;
        };
        tokens['radiusSm_mobile'] = { value: rValMob(-1), unit: '' };
        tokens['radiusMd_mobile'] = { value: rValMob(0), unit: '' };
        tokens['radiusLg_mobile'] = { value: rValMob(1), unit: '' };



                vars.elevationMults.forEach((mult, i) => {
            const key = `elevation${i}`;
            if (i === 0 || mult === 0) {
                tokens[key] = { type: 'none' };
            } else {
                const zHeight = vars.rawShadow.baseElevation * mult;
                tokens[key] = this._generateShadow(vars.rawShadow.style, zHeight, vars.rawShadow.physics, isInset);
            }
        });

        const hoverMult = (vars.elevationMults[2] || 2) * 1.5;
        const hoverZHeight = vars.rawShadow.baseElevation * hoverMult;
        tokens['elevationHover'] = this._generateShadow(vars.rawShadow.style, hoverZHeight, vars.rawShadow.physics, isInset);

        tokens['borderWidth'] = { value: hasMicroBorder ? 0.5 : vars.border.width, unit: 'px' };

        tokens['glassBlur'] = { value: vars.surface.glassBlur, unit: 'px' };

        let surfaceFx = 'none';
        if (vars.surface.style === 'gradient') {
            surfaceFx = 'linear-gradient(145deg, var(--c60-derived-overlay-blend) 0%, var(--c51-shadow-color) 100%)';
        } else if (vars.surface.style === 'glass') {
            surfaceFx = 'linear-gradient(135deg, var(--c60-derived-overlay-blend) 0%, var(--c52-overlay-scrim) 100%)';
        }

        if (vars.surface.laws.surface_must_match_bg) {
            tokens['surfaceFx'] = { value: 'none', unit: '' };
        } else if (vars.surface.laws.color_source_is_backdrop) {
            surfaceFx = 'none';
        }

        if (vars.surface.personality === 'organic') {
            surfaceFx = surfaceFx !== 'none' ? `${surfaceFx}, radial-gradient(circle at 50% 0%, var(--c60-derived-overlay-blend) 0%, transparent 60%)` : 'radial-gradient(circle at 50% 0%, var(--c60-derived-overlay-blend) 0%, transparent 60%)';
        } else if (vars.surface.personality === 'brutalism') {
            surfaceFx = 'none';
            tokens['borderWidth'] = { value: hasMicroBorder ? 1 : Math.max(2, vars.border.width), unit: 'px' };
        }

        if (vars.surface.decoration === 'noise') {
            const noiseStr = `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`;
            surfaceFx = surfaceFx !== 'none' ? `${surfaceFx}, ${noiseStr}` : noiseStr;
        } else if (vars.surface.decoration === 'stripes') {
            const stripeStr = `repeating-linear-gradient(45deg, transparent, transparent 10px, var(--c60-derived-overlay-blend) 10px, var(--c60-derived-overlay-blend) 20px)`;
            surfaceFx = surfaceFx !== 'none' ? `${surfaceFx}, ${stripeStr}` : stripeStr;
        }

        tokens['surfaceFx'] = { value: surfaceFx, unit: '' };

        return tokens;
    }
}