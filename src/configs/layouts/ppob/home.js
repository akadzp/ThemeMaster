export const CONFIG_LAYOUT_HOME = [
    {
        id: 'section_header_home',
        label: 'Header Home',
        target: 'homeHeader',
        groups: [
            {
                id: 'hhStyle_A',
                label: 'Style A (Master Box)',
                variant: [
                    { 
                        id: 'hhstyle_a1', 
                        label: 'A1 - Master Box Bento', 
                        icon: 'fas fa-box',
                        structure: [
                            {
                                id: 'hl-area-head',
                                content: ['obj_foto', 'obj_nama', 'obj_membership']
                            },
                            {
                                id: 'hl-area-balance',
                                content: ['obj_saldo', 'obj_poin']
                            },
                            {
                                id: 'hl-area-actions',
                                content: ['obj_btn_topup', 'obj_btn_tf', 'obj_btn_scan', 'obj_btn_hist']
                            }
                        ],
                        style: `
                            
                            .homeHeader { 
                                margin: var(--l30-container-padding); 
                                margin-top: calc(var(--l30-container-padding) + var(--l31-safe-area-inset-top, 10px));
                                padding: var(--l4-space-lg);
                                
                                /* Tampilan Box Diambil dari Token Engine */
                                background: var(--surfaceFx, var(--c3-surface-primary)); 
                                border-radius: var(--l9-radius-lg); 
                                box-shadow: var(--l14-elevation-3); 
                                border: var(--l39-border-width) solid var(--c31-border-primary);
                                
                                /* Grid Internal Box */
                                display: grid; 
                                grid-template-columns: 1.2fr 1fr; 
                                grid-template-areas: 
                                    "head head"
                                    "bal act";
                                gap: var(--l4-space-lg); 
                                position: relative;
                                z-index: 10;
                                overflow: hidden;
                            }
                            
                            /* Aksen Ambient di dalam Master Box (Opsional untuk efek Theme) */
                            .homeHeader::before {
                                content: '';
                                position: absolute;
                                top: -50px; right: -50px;
                                width: 150px; height: 150px;
                                background: var(--c48-accent-primary);
                                opacity: 0.05;
                                border-radius: 50%;
                                filter: blur(30px);
                                pointer-events: none;
                            }

                            /* --- 1. ZONA HEADER (PROFIL) --- */
                            .hl-area-head { 
                                grid-area: head; 
                                display: flex; 
                                align-items: center; 
                                gap: var(--l3-space-md); 
                                padding-bottom: var(--l4-space-lg);
                                border-bottom: 1px dashed var(--c34-divider);
                            }
                            
                            .hl-area-head .profile-img { 
                                width: 46px; 
                                height: 46px; 
                                border-radius: var(--l10-radius-full); 
                                background: var(--c4-surface-secondary); 
                                border: 2px solid var(--c48-accent-primary);
                            }
                            
                            .hl-area-head .username { 
                                flex: 1; 
                                font-size: var(--t6-font-size-md); 
                                font-weight: var(--t12-font-weight-bold); 
                                color: var(--c8-text-primary); 
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            
                            .hl-area-head .membership { 
                                background: var(--c17-action-primary-bg); 
                                color: var(--c18-action-primary-text); 
                                padding: 4px 12px; 
                                border-radius: var(--l10-radius-full); 
                                font-size: var(--t4-font-size-xs); 
                                font-weight: var(--t12-font-weight-bold);
                            }

                            /* --- 2. ZONA KIRI (SALDO & POIN) --- */
                            .hl-area-balance { 
                                grid-area: bal; 
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                gap: var(--l3-space-md);
                                position: relative;
                            }

                            .hl-area-balance .main-bal { display: flex; flex-direction: column; gap: 4px; }
                            .hl-area-balance .main-bal .label { font-size: var(--t4-font-size-xs); color: var(--c9-text-secondary); }
                            .hl-area-balance .main-bal .val { font-size: var(--t7-font-size-lg); font-weight: var(--t12-font-weight-bold); color: var(--c8-text-primary); }
                            
                            .hl-area-balance .bonus-bal { 
                                background: var(--c4-surface-secondary); 
                                padding: 6px 12px; 
                                border-radius: var(--l8-radius-md); 
                                font-size: var(--t4-font-size-xs); 
                                font-weight: var(--t12-font-weight-bold); 
                                color: var(--c48-accent-primary); 
                                display: inline-flex; align-items: center; gap: 6px;
                                border: var(--l39-border-width) solid var(--c32-border-secondary);
                                width: max-content;
                            }

                            /* --- 3. ZONA KANAN (MATRIX AKSI 2x2) --- */
                            .hl-area-actions { 
                                grid-area: act; 
                                display: grid; 
                                grid-template-columns: 1fr 1fr; 
                                grid-template-rows: 1fr 1fr;
                                gap: var(--l2-space-sm); 
                            }
                            
                            .hl-area-actions .qa-btn { 
                                background: var(--c4-surface-secondary); 
                                border-radius: var(--l8-radius-md); 
                                border: var(--l39-border-width) solid var(--c32-border-secondary); 
                                display: flex; 
                                flex-direction: column; 
                                align-items: center; 
                                justify-content: center; 
                                padding: var(--l2-space-sm); 
                                gap: 6px; 
                                cursor: pointer;
                                transition: transform var(--m2-duration-fast) var(--m5-easing-standard);
                            }
                            
                            .hl-area-actions .qa-btn:active { 
                                transform: scale(0.92); 
                                background: var(--c48-accent-primary);
                            }
                            
                            .hl-area-actions .qa-btn:active .qa-icon,
                            .hl-area-actions .qa-btn:active span:last-child {
                                color: var(--c18-action-primary-text);
                            }

                            .hl-area-actions .qa-icon { 
                                font-size: 20px; 
                                color: var(--c8-text-primary); 
                                display: flex; align-items: center; justify-content: center;
                                transition: color 0.2s;
                            }
                            
                            .hl-area-actions .qa-icon.u-action { color: var(--c48-accent-primary); }

                            .hl-area-actions span:last-child { 
                                font-size: 9px; 
                                font-weight: var(--t12-font-weight-bold); 
                                color: var(--c9-text-secondary); 
                                text-align: center;
                                transition: color 0.2s;
                            }
                        `
                    },
                    { id: 'hhstyle_a2', label: 'A2 (Coming Soon)', icon: 'fas fa-th-large' }
                ]
            },
            {
                id: 'hhStyle_B',
                label: 'Style B',
                variant: [
                    { id: 'hhStyle_B1', label: 'B1', icon: 'fas fa-window-maximize' },
                    { id: 'hhStyle_B2', label: 'B2', icon: 'fas fa-columns' }
                ]
            }
        ]
    },
    {
        id: 'section_body_home',
        label: 'Body Home',
        target: 'homeBody',
        groups: [
            {
                id: 'bhStyle_A',
                label: 'Style A',
                variant: [
                    { 
                        id: 'bhStyle_A1', 
                        label: 'A1', 
                        icon: 'fas fa-list',
                        structure: [
                            {
                                id: 'bh1-banner-section',
                                content: ['obj_slider']
                            },
                            {
                                id: 'bh1-info-section',
                                content: ['obj_info']
                            },
                            {
                                id: 'bh1-category-section',
                                content: ['obj_tab_nav', 'obj_cat_pra', 'obj_cat_pas', 'obj_cat_hib']
                            }
                        ],
                        style: `
                            .homeBody { padding: var(--l30-container-padding); display: flex; flex-direction: column; gap: var(--l4-space-lg); }
                            .bh1-banner-section { height: 120px; border-radius: var(--l9-radius-lg); overflow: hidden; }
                            .bh1-info-section { background: var(--c45-status-info-bg); color: var(--c46-status-info-text); padding: 10px 15px; border-radius: var(--l8-radius-md); font-size: var(--t5-font-size-sm); display: flex; align-items: center; border: 1px solid var(--c47-status-info-border); }
                            .bh1-category-section { display: flex; flex-direction: column; gap: var(--l3-space-md); }
                            .cat-tab-nav { display: flex; gap: 10px; border-bottom: 2px solid var(--c34-divider); padding-bottom: 5px; }
                            .cat-tab-nav .tab-btn { font-size: var(--t6-font-size-md); font-weight: 700; color: var(--c9-text-secondary); cursor: pointer; padding-bottom: 5px; }
                            .cat-tab-nav .tab-btn.active { color: var(--c8-text-primary); border-bottom: 2px solid var(--c48-accent-primary); margin-bottom: -7px; }
                            .cat-grid { display: none; grid-template-columns: repeat(4, 1fr); gap: 15px; padding-top: 10px; }
                            .cat-grid.active { display: grid; }
                            .cat-grid .qa-btn { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
                            .cat-grid .qa-icon { width: 50px; height: 50px; border-radius: var(--l8-radius-md); background: var(--c4-surface-secondary); color: var(--c48-accent-primary); display: flex; align-items: center; justify-content: center; font-size: 24px; border: 1px solid var(--c31-border-primary); box-shadow: var(--l12-elevation-1); }
                            .cat-grid span:last-child { font-size: 11px; font-weight: 700; color: var(--c8-text-primary); text-align: center; }
                        `
                    }
                ]
            }
        ]
    }
];

window.UniverseStudio.Registry['home'] = { label: 'Home', config: CONFIG_LAYOUT_HOME };