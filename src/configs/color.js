export const COLOR_DNA = {
    slots: {
        saturation_boost: null,
        luminance_shift: null,
        hue_rotation: null,
        contrast_boost: null,
        tone_warmth: null,
        bg_tint_strength: null,
        hover_mix_ratio: null,
        subtle_opacity: null,
        disabled_opacity: null,
        glass_opacity: null,
        border_opacity: null,
        palette_spread: null,
        shade_count: null,
        mix_algorithm: null,
        opacity_base: null,
        harmony_type: null,
        harmony_strength: null,
        dark_mode_sat_reduce: null,
        dark_mode_lum_boost: null,
        gradient_angle: null,
        shadow_color_tint: null,
        glow_enabled: null,
        glow_intensity: null,
        min_contrast_ratio: null,
        force_readable: null,
        auto_adjust_contrast: null,
        lock_primary: null,
        lock_accent: null,
        preserve_hue: null,
        status_success: null,
        status_warning: null,
        status_error: null,
        status_info: null,
        primary_lightness: null,
        secondary_lightness: null,
        min_saturation: null,
        max_saturation: null,
        glass_fx_opacity: null,
        shadow_opacity_dark: null,
        shadow_opacity_light: null,
        base_dark: null,
        base_light: null,
        surface_offset: null,
        contrast_threshold: null,
        secondary_hue_rotation: null,
        text_color_dark: null,
        text_color_light: null,
        text_secondary_dark: null,
        text_secondary_light: null
    }   
};

export const T_GRP = {
    CANVAS: ['appBackground', 'appBackgroundAlt', 'semSurfaceCanvas'],
    SURFACE_MASTER: ['surfacePrimary', 'surfaceSecondary', 'surfaceTertiary', 'surfaceElevated', 'surfaceOverlay', 'semSurfaceDefault', 'semSurfaceRaised', 'semSurfaceOverlay'],
    INTERACTIVE_CORE: ['actionPrimaryBg', 'semActionPrimaryBg'],
    INTERACTIVE_TEXT: ['actionPrimaryText', 'semActionPrimaryText', 'semTextInverse'],
    INTERACTIVE_SUBTLE: ['actionSecondaryBg', 'actionTertiaryBg', 'stateHover', 'stateFocus', 'selectionBg', 'semActionSecondaryBg', 'semSurfaceSubtle'],
    ACCENT_STRONG: ['accentPrimary', 'accentSecondary', 'focusRing', 'brandColorPrimaryLock', 'brandColorSecondaryLock', 'semBorderFocus'],
    ACCENT_SUBTLE: ['accentSubtle', 'borderPrimary', 'borderSecondary', 'borderSubtle', 'divider', 'outlineFocus', 'actionPrimaryBorder', 'actionSecondaryBorder', 'actionTertiaryBorder', 'semBorderDefault', 'semBorderSubtle'],
    TYPOGRAPHY_MAIN: ['textPrimary', 'textInverse', 'linkDefault', 'linkHover', 'linkVisited', 'semTextDefault', 'semTextLink'],
    TYPOGRAPHY_ON_CORE: ['textOnPrimary', 'textOnSurface', 'textOnBackground'],
    TYPOGRAPHY_SUBTLE: ['textSecondary', 'textTertiary', 'textDisabled', 'textOnSecondary', 'actionSecondaryText', 'actionTertiaryText', 'selectionText', 'semTextMuted', 'semTextSubtle'],
    ATMOSPHERE: ['shadowColor', 'overlayScrim', 'derivedOverlayBlend', 'backdropFilterTint', 'scrollbar', 'derivedElevationTint', 'derivedDisabledMix'],
    HIGHLIGHT_FX: ['derivedOverlayBlend'],
    STATUS_SUCCESS: ['statusSuccessBg', 'statusSuccessText', 'statusSuccessBorder', 'overlaySuccess', 'semStatusSuccess'],
    STATUS_WARNING: ['statusWarningBg', 'statusWarningText', 'statusWarningBorder', 'overlayWarning', 'semStatusWarning'],
    STATUS_ERROR: ['statusErrorBg', 'statusErrorText', 'statusErrorBorder', 'overlayCritical', 'colorRoleCritical', 'semStatusError', 'semActionDangerBg', 'semActionDangerText'],
    STATUS_INFO: ['statusInfoBg', 'statusInfoText', 'statusInfoBorder', 'skeletonLoader', 'semStatusInfo'],
    UTILITY_MISC: ['contrastMinText', 'contrastMinUi', 'contrastPreferred', 'colorRoleSupporting', 'colorRoleDecorative', 'semBorderStrong'],
    GLOW_FX: ['glowFxLayer'],
    DECORATION_LAYER: ['decorationPattern'],
    TEMPERATURE_WARM: ['tempWarmZone'],
    TEMPERATURE_COOL: ['tempCoolZone']
};



export const worldColor = {
    'wc_a': { 
        bg_policy: 'toggle',
        dark_policy: 'toggle',
        mapping: {
            background: { tokens: [...T_GRP.CANVAS], strength: 1.0, source: 'background' }, 
            surface: { tokens: [...T_GRP.SURFACE_MASTER], strength: 1.0, source: 'surface' },
            primary: { tokens: [...T_GRP.INTERACTIVE_CORE, ...T_GRP.ACCENT_STRONG], strength: 1.0, source: 'primary' }, 
            textOnCore: { tokens: [...T_GRP.INTERACTIVE_TEXT], strength: 1.0, source: 'textOnCore' }, 
            primary_subtle: { tokens: [...T_GRP.INTERACTIVE_SUBTLE, ...T_GRP.ACCENT_SUBTLE], strength: 1.0, source: 'primary_subtle' },
            textPrimary: { tokens: [...T_GRP.TYPOGRAPHY_MAIN], strength: 1.0, source: 'textPrimary' }, 
            textSecondary: { tokens: [...T_GRP.TYPOGRAPHY_SUBTLE], strength: 1.0, source: 'textSecondary' },
            shadow: { tokens: [...T_GRP.ATMOSPHERE], strength: 1.0, source: 'shadow' }, 
            utility: { tokens: [...T_GRP.UTILITY_MISC], strength: 1.0, source: 'utility' },
            success: { tokens: [...T_GRP.STATUS_SUCCESS], strength: 1.0, source: 'success' }, 
            error: { tokens: [...T_GRP.STATUS_ERROR], strength: 1.0, source: 'error' }
        } 
    },
    'wc_b': { 
        bg_policy: 'wajib-on',
        dark_policy: 'toggle', 
        mapping: {
            background: { tokens: [...T_GRP.CANVAS], strength: 1.0, source: 'background' }, 
            surface_glass: { tokens: [...T_GRP.SURFACE_MASTER], strength: 1.0, source: 'surface_glass' },
            primary: { tokens: [...T_GRP.ACCENT_STRONG, ...T_GRP.INTERACTIVE_TEXT], strength: 1.0, source: 'primary' }, 
            primary_subtle: { tokens: [...T_GRP.INTERACTIVE_SUBTLE, ...T_GRP.ACCENT_SUBTLE], strength: 1.0, source: 'primary_subtle' },
            textOnCore: { tokens: [...T_GRP.INTERACTIVE_CORE], strength: 1.0, source: 'textOnCore' }, 
            textPrimary: { tokens: [...T_GRP.TYPOGRAPHY_MAIN], strength: 1.0, source: 'textPrimary' }, 
            textSecondary: { tokens: [...T_GRP.TYPOGRAPHY_SUBTLE], strength: 1.0, source: 'textSecondary' },
            shadow: { tokens: [...T_GRP.ATMOSPHERE], strength: 1.0, source: 'shadow' }, 
            glass_fx: { tokens: [...T_GRP.ACCENT_SUBTLE], strength: 1.0, source: 'glass_fx' }, 
            success: { tokens: [...T_GRP.STATUS_SUCCESS], strength: 1.0, source: 'success' }, 
            error: { tokens: [...T_GRP.STATUS_ERROR], strength: 1.0, source: 'error' }
        } 
    },
    'wc_c': { 
        bg_policy: 'wajib-on', 
        dark_policy: 'toggle', 
        mapping: {
            background: { tokens: [...T_GRP.CANVAS], strength: 1.0, source: 'background' }, 
            surface: { tokens: [...T_GRP.SURFACE_MASTER, ...T_GRP.INTERACTIVE_CORE], strength: 1.0, source: 'surface' }, 
            primary: { tokens: [...T_GRP.INTERACTIVE_TEXT, ...T_GRP.ACCENT_STRONG], strength: 1.0, source: 'primary' }, 
            textPrimary: { tokens: [...T_GRP.TYPOGRAPHY_MAIN], strength: 1.0, source: 'textPrimary' }, 
            textSecondary: { tokens: [...T_GRP.TYPOGRAPHY_SUBTLE], strength: 1.0, source: 'textSecondary' },
            shadow: { tokens: [...T_GRP.ATMOSPHERE], strength: 1.0, source: 'shadow' }, 
            highlight: { tokens: [...T_GRP.HIGHLIGHT_FX], strength: 1.0, source: 'highlight' }, 
            primary_subtle: { tokens: [...T_GRP.ACCENT_SUBTLE], strength: 1.0, source: 'primary_subtle' },
            success: { tokens: [...T_GRP.STATUS_SUCCESS], strength: 1.0, source: 'success' }, 
            error: { tokens: [...T_GRP.STATUS_ERROR], strength: 1.0, source: 'error' }
        } 
    },
    'wc_d': { 
        bg_policy: 'wajib-off', 
        dark_policy: 'toggle', 
        mapping: {
            background: { tokens: [...T_GRP.CANVAS], strength: 1.0, source: 'background' }, 
            surface: { tokens: [...T_GRP.SURFACE_MASTER], strength: 1.0, source: 'surface' },
            primary: { tokens: [...T_GRP.INTERACTIVE_TEXT, ...T_GRP.ACCENT_STRONG], strength: 1.0, source: 'primary' }, 
            textOnCore: { tokens: [...T_GRP.INTERACTIVE_TEXT], strength: 1.0, source: 'textOnCore' },
            primary_subtle: { tokens: [...T_GRP.ACCENT_SUBTLE], strength: 1.0, source: 'primary_subtle' }, 
            transparent: { tokens: [...T_GRP.INTERACTIVE_CORE], strength: 1.0, source: 'transparent' }, 
            textPrimary: { tokens: [...T_GRP.TYPOGRAPHY_MAIN], strength: 1.0, source: 'textPrimary' }, 
            textSecondary: { tokens: [...T_GRP.TYPOGRAPHY_SUBTLE], strength: 1.0, source: 'textSecondary' },
            shadow: { tokens: [...T_GRP.ATMOSPHERE], strength: 1.0, source: 'shadow' }, 
            success: { tokens: [...T_GRP.STATUS_SUCCESS], strength: 1.0, source: 'success' }, 
            error: { tokens: [...T_GRP.STATUS_ERROR], strength: 1.0, source: 'error' }
        } 
    },
    'wc_e': { 
        bg_policy: 'wajib-on', 
        dark_policy: 'wajib-on', 
        mapping: {
            background: { tokens: [...T_GRP.INTERACTIVE_CORE, ...T_GRP.ACCENT_STRONG], strength: 1.0, source: 'background' }, 
            surface: { tokens: [...T_GRP.CANVAS, ...T_GRP.SURFACE_MASTER], strength: 1.0, source: 'surface' }, 
            textPrimary: { tokens: [...T_GRP.INTERACTIVE_TEXT, ...T_GRP.TYPOGRAPHY_MAIN], strength: 1.0, source: 'textPrimary' }, 
            textSecondary: { tokens: [...T_GRP.TYPOGRAPHY_SUBTLE], strength: 1.0, source: 'textSecondary' },
            primary_subtle: { tokens: [...T_GRP.ACCENT_SUBTLE, ...T_GRP.ATMOSPHERE], strength: 1.0, source: 'primary_subtle' },
            success: { tokens: [...T_GRP.STATUS_SUCCESS], strength: 1.0, source: 'success' }, 
            error: { tokens: [...T_GRP.STATUS_ERROR], strength: 1.0, source: 'error' }
        } 
    },
    'wc_f': { 
        bg_policy: 'toggle', 
        dark_policy: 'toggle', 
        mapping: {
            background: { tokens: [...T_GRP.CANVAS], strength: 1.0, source: 'background' }, 
            surface: { tokens: [...T_GRP.SURFACE_MASTER], strength: 0.9, source: 'surface' }, 
            primary: { tokens: [...T_GRP.INTERACTIVE_CORE], strength: 1.0, source: 'primary' },
            secondary: { tokens: [...T_GRP.ACCENT_STRONG], strength: 1.0, source: 'secondary' }, 
            textPrimary: { tokens: [...T_GRP.TYPOGRAPHY_MAIN], strength: 1.0, source: 'textPrimary' }, 
            textSecondary: { tokens: [...T_GRP.TYPOGRAPHY_SUBTLE], strength: 0.8, source: 'textSecondary' },
            shadow: { tokens: [...T_GRP.ATMOSPHERE], strength: 0.5, source: 'shadow' }, 
            success: { tokens: [...T_GRP.STATUS_SUCCESS], strength: 1.0, source: 'success' }, 
            error: { tokens: [...T_GRP.STATUS_ERROR], strength: 1.0, source: 'error' }
        } 
    },
    'wc_g': { 
        bg_policy: 'toggle', 
        dark_policy: 'toggle', 
        mapping: {
            background: { tokens: [...T_GRP.CANVAS], strength: 1.0, source: 'background' }, 
            surface: { tokens: [...T_GRP.SURFACE_MASTER], strength: 1.0, source: 'surface' }, 
            primary: { tokens: [...T_GRP.INTERACTIVE_CORE], strength: 1.0, source: 'primary' },
            tertiary: { tokens: [...T_GRP.ACCENT_STRONG], strength: 0.7, source: 'tertiary' }, 
            textPrimary: { tokens: [...T_GRP.TYPOGRAPHY_MAIN], strength: 1.0, source: 'textPrimary' }, 
            textSecondary: { tokens: [...T_GRP.TYPOGRAPHY_SUBTLE], strength: 1.0, source: 'textSecondary' },
            shadow: { tokens: [...T_GRP.ATMOSPHERE], strength: 1.0, source: 'shadow' }, 
            success: { tokens: [...T_GRP.STATUS_SUCCESS], strength: 1.0, source: 'success' }, 
            error: { tokens: [...T_GRP.STATUS_ERROR], strength: 1.0, source: 'error' }
        } 
    }
};