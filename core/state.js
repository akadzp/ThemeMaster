(function (global) {
    'use strict';

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