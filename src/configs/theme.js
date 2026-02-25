export const THEME_DNA = {
    slots: {
        radius_scale: null,
        border_width_scale: null,
        force_sharp: null,
        force_round: null,
        spacing_scale: null,
        padding_scale: null,
        container_gap_scale: null,
        shadow_scale: null,
        shadow_blur_scale: null,
        shadow_offset_scale: null,
        elevation_intensity: null,
        light_angle: null,
        inner_glow_opacity: null,
        glass_blur_scale: null,
        surface_noise_opacity: null,
        effect_intensity: null,
        contrast_multiplier: null,
        force_flat: null,
        force_glass: null,
        force_skeuomorphic: null,
        focus_ring_width: null,
        focus_ring_offset: null,
        mobile_scale_multiplier: null,
        radius_top_left: null,
        radius_top_right: null,
        radius_bottom_right: null,
        radius_bottom_left: null
    }
};




export const worldTheme = {
    slots: {
        surface_style: null,
        surface_glass_blur: null,
        surface_texture_opacity: null,
        surface_noise_type: null,
        border_style: null,
        border_width_base: null,
        border_softness_base: null,
        depth_technique: null,
        shadow_style: null,
        shadow_blur_base: null,
        shadow_offset_base: null,
        shadow_spread_base: null,
        shadow_elevation_levels: null,
        elevation_multipliers: null,
        shape_philosophy: null,
        radius_baseline: null,
        spacing_baseline: null,
        padding_baseline: null,
        scale_ratio: null,
        glow_radius_base: null,
        glow_intensity_base: null,
        focus_ring_base: null,
        focus_offset_base: null,
        scanline_opacity_base: null,
        physics_logic: null,
        depth_language: null,
        surface_personality: null,
        decoration_strategy: null,
        visual_laws: null
    },

    defaults: {
        surface_style: null,
        surface_glass_blur: null,
        surface_texture_opacity: null,
        surface_noise_type: null,
        border_style: null,
        border_width_base: null,
        border_softness_base: null,
        depth_technique: null,
        shadow_style: null,
        shadow_blur_base: null,
        shadow_offset_base: null,
        shadow_spread_base: null,
        shadow_elevation_levels: null,
        elevation_multipliers: null,
        shape_philosophy: null,
        radius_baseline: null,
        spacing_baseline: null,
        padding_baseline: null,
        scale_ratio: null,
        glow_radius_base: null,
        glow_intensity_base: null,
        focus_ring_base: null,
        focus_offset_base: null,
        scanline_opacity_base: null,
        physics_logic: null,
        depth_language: null,
        surface_personality: null,
        decoration_strategy: null,
        visual_laws: null
    }
};

    

export const THEME_GOVERNANCE = {
    precedence: [
        'VARIANT.theme_dna',
        'VARIANT.worldTheme',
        'FAMILY.worldTheme',
        'GLOBAL.defaults'
    ],
    rules: [
        {
            property: 'radius_scale / shadow_scale',
            allowed_in: ['VARIANT.theme_dna'],
            forbidden_in: ['FAMILY.worldTheme']
        },
        {
            property: 'radius_baseline / shadow_blur_base',
            allowed_in: ['FAMILY.worldTheme'],
            forbidden_in: ['VARIANT.theme_dna']
        },
        {
            property: 'surface_style / border_style / depth_technique',
            allowed_in: ['FAMILY.worldTheme'],
            forbidden_in: ['VARIANT.theme_dna']
        },
        {
            property: 'shadow_blur_base / shadow_offset_base',
            allowed_in: ['FAMILY.worldTheme'],
            can_override_in: ['VARIANT.worldTheme']
        },
        {
            property: 'shadow_elevation_levels / glow_enabled / surface_texture_opacity',
            allowed_in: ['VARIANT.worldTheme']
        }
    ]
};



export const CONFIG_THEME = {
    CATEGORIES: [
        { id: 'ctx_color', label: 'WARNA KUSTOM' },
        { id: 'depth', label: '3D & DEPTH' },
        { id: 'glass', label: 'GLASS & BLUR' },
        { id: 'sys', label: 'SYSTEM OS' },
        { id: 'immersive', label: '3D & IMMERSIVE' },
        { id: 'art', label: 'ARTISTIC & EXPERIMENTAL' }
    ],
    
      FAMILIES: {
        'fam_sys': {
            id: 'fam_sys', label: 'Material UI', cat: 'sys', worldColor: 'wc_a',
            colorValues: { baseLight: 98, baseDark: 15, surfLOffset: 3, shadeCount: 5, textColorDark: '#ffffff', textColorLight: '#111827', textSecondaryDark: '#9ca3af', textSecondaryLight: '#4b5563' },
            worldTheme: { surface_style: 'flat', border_style: 'solid', border_width_base: 1, depth_technique: 'shadow', shadow_style: 'soft', surface_personality: 'digital', decoration_strategy: 'none', shadow_offset_base: 2, radius_baseline: 8, spacing_baseline: 16, scale_ratio: 1.25, elevation_multipliers: [0, 1, 3, 6, 12] }
        },
        'fam_glass': {
            id: 'fam_glass', label: 'Aero Glass', cat: 'glass', worldColor: 'wc_b',
            colorValues: { baseLight: 90, baseDark: 10, surfLOffset: 5, shadeCount: 5, textColorDark: '#ffffff', textColorLight: '#000000', textSecondaryDark: '#d1d5db', textSecondaryLight: '#4b5563' },
            worldTheme: { surface_style: 'glass', border_style: 'solid', border_width_base: 1, depth_technique: 'backdrop', shadow_style: 'soft', surface_personality: 'digital', decoration_strategy: 'none', surface_glass_blur: 16, shadow_offset_base: 4, radius_baseline: 16, spacing_baseline: 16, scale_ratio: 1.3, elevation_multipliers: [0, 1, 2, 4, 8], visual_laws: { color_source_is_backdrop: true } }
        },
        'fam_neu': {
            id: 'fam_neu', label: 'Neumorphism', cat: 'depth', worldColor: 'wc_c',
            colorValues: { baseLight: 92, baseDark: 18, surfLOffset: 0, shadeCount: 5, textColorDark: '#e5e7eb', textColorLight: '#374151', textSecondaryDark: '#9ca3af', textSecondaryLight: '#6b7280' },
            worldTheme: { surface_style: 'flat', border_style: 'none', border_width_base: 0, depth_technique: 'shadow', shadow_style: 'clay', surface_personality: 'organic', decoration_strategy: 'none', shadow_offset_base: 4, radius_baseline: 20, spacing_baseline: 16, scale_ratio: 1.2, elevation_multipliers: [0, 1, 2, 3, 5], visual_laws: { surface_must_match_bg: true }, physics_logic: { shadow_render_type: 'dual_opposing', umbra: {blur: 2.0, spread: 0, dist: 1.0} } }
        },
        'fam_brut': {
            id: 'fam_brut', label: 'Neo Brutalism', cat: 'art', worldColor: 'wc_d',
            colorValues: { baseLight: 95, baseDark: 5, surfLOffset: 0, shadeCount: 3, textColorDark: '#ffffff', textColorLight: '#000000', textSecondaryDark: '#d1d5db', textSecondaryLight: '#374151' },
            worldTheme: { surface_style: 'flat', border_style: 'solid', border_width_base: 3, depth_technique: 'shadow', shadow_style: 'hard', surface_personality: 'brutalism', decoration_strategy: 'none', shadow_offset_base: 4, radius_baseline: 0, spacing_baseline: 16, scale_ratio: 1.25, elevation_multipliers: [0, 1, 2, 3, 4], physics_logic: { shadow_render_type: 'hard_flat' } }
        }
    },
    VARIANTS: {
        'sys_light': {
            id: 'sys_light', label: 'Clean System', fam: 'fam_sys', icon: 'fas fa-desktop',
            color_dna: { hue_rotation: 0, saturation_boost: 0, harmony_type: 'monochromatic', subtle_opacity: 0.1, border_opacity_light: 0.1, shadow_opacity_light: 0.05, shadow_opacity_dark: 0.3 },
            theme_dna: { radius_scale: 1, shadow_scale: 1, border_width_scale: 1 },
            customizers: ['opt_micro_border']
        },
        'sys_vibrant': {
            id: 'sys_vibrant', label: 'Vibrant UI', fam: 'fam_sys', icon: 'fas fa-paint-brush',
            color_dna: { hue_rotation: 15, saturation_boost: 0.2, harmony_type: 'analogous', harmony_strength: 0.8, subtle_opacity: 0.15, border_opacity_light: 0.15, shadow_opacity_light: 0.08, shadow_opacity_dark: 0.4 },
            theme_dna: { radius_scale: 1.5, shadow_scale: 1.2, border_width_scale: 0 },
            customizers: []
        },
        'glass_frosted': {
            id: 'glass_frosted', label: 'Frosted Glass', fam: 'fam_glass', icon: 'fas fa-cube',
            color_dna: { hue_rotation: 0, saturation_boost: 0.1, harmony_type: 'triadic', harmony_strength: 0.5, glass_opacity: 0.6, border_opacity_light: 0.2, border_opacity_dark: 0.1, shadow_opacity_light: 0.1, shadow_opacity_dark: 0.5 },
            theme_dna: { radius_scale: 1.2, shadow_scale: 0.8, glass_blur_scale: 1 },
            customizers: ['opt_noise']
        },
        'neu_soft': {
            id: 'neu_soft', label: 'Soft Clay', fam: 'fam_neu', icon: 'fas fa-dot-circle',
            color_dna: { hue_rotation: 0, saturation_boost: -0.05, harmony_type: 'monochromatic', subtle_opacity: 0.1, shadow_opacity_light: 0.15, shadow_opacity_dark: 0.6 },
            theme_dna: { radius_scale: 1, shadow_scale: 1 },
            customizers: ['opt_inset']
        },
        'brut_retro': {
            id: 'brut_retro', label: 'Retro Web', fam: 'fam_brut', icon: 'fas fa-thumbtack',
            color_dna: { hue_rotation: -30, saturation_boost: 0.3, harmony_type: 'complementary', harmony_strength: 1.0, shadow_opacity_light: 1.0, shadow_opacity_dark: 1.0 },
            theme_dna: { radius_scale: 0, shadow_scale: 1.5, border_width_scale: 1, force_sharp: true },
            customizers: ['opt_stripes']
        }
    },
    OPTIONS: {
        'opt_inset': { id: 'opt_inset', label: 'Inset Shadow', icon: 'fas fa-compress', instruction: 'invert_shadow_to_inset' },
        'opt_micro_border': { id: 'opt_micro_border', label: 'Micro Border', icon: 'fas fa-border-all', instruction: 'inject_micro_border_0.5px' },
        'opt_noise': { id: 'opt_noise', label: 'Noise Texture', icon: 'fas fa-tv', instruction: 'apply_noise_texture' },
        'opt_stripes': { id: 'opt_stripes', label: 'Stripes FX', icon: 'fas fa-bars', instruction: 'apply_stripes_texture' }
    }
}
