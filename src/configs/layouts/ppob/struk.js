export const CONFIG_LAYOUT_STRUK = [
    {
        id: 'section_main_struk',
        label: 'Layout Cetak Struk',
        target: 'strukMain', // Target DOM utama untuk struk
        groups: [
            {
                id: 'strkStyle_Thermal',
                label: 'Style Thermal 58mm',
                variant: [
                    { 
                        id: 'strk_style_t1', 
                        label: 'Standard Print', 
                        icon: 'fas fa-receipt',
                        structure: [
                            {
                                id: 'strk-wrap',
                                content: [
                                    'obj_strk_header',     // Logo, Nama Toko, Alamat
                                    'obj_strk_meta',       // Tgl, No. Trx, Kasir
                                    'obj_strk_divider_1',  // Garis dashed
                                    'obj_strk_produk',     // Loop List Produk / PPOB / SN
                                    'obj_strk_divider_2',  // Garis dashed
                                    'obj_strk_rincian',    // Subtotal, Admin, Diskon
                                    'obj_strk_total',      // Total Bayar (Size besar)
                                    'obj_strk_divider_3',  // Garis dashed
                                    'obj_strk_footer'      // Ucapan terima kasih
                                ]
                            }
                        ],
                        style: `
                            /* =========================================================
                               THEMESDK - CETAK STRUK (THERMAL 58mm)
                            ========================================================= */
                            .strk-wrap { 
                                padding: var(--l4-space-lg); 
                                display: flex; 
                                flex-direction: column; 
                                background: var(--c3-surface-primary);
                                color: var(--c8-text-primary);
                                font-family: var(--t3-font-family-monospace), monospace; /* Wajib monospace */
                                font-size: var(--t5-font-size-sm); /* Default 12pt/14px ke atas */
                                width: 100%;
                                max-width: 320px; /* Lebar simulasi kertas 58mm */
                                margin: 0 auto;
                                border: var(--l39-border-width) solid var(--c31-border-primary);
                                border-radius: var(--l6-radius-none); /* Struk thermal selalu kotak */
                                box-shadow: var(--l12-elevation-1);
                            }
                            
                            /* Typography Utility Khusus Struk */
                            .strk-text-xs { font-size: var(--t4-font-size-xs); }
                            .strk-text-sm { font-size: var(--t5-font-size-sm); }
                            .strk-text-md { font-size: var(--t6-font-size-md); }
                            .strk-fw-bold { font-weight: var(--t12-font-weight-bold); }
                            .strk-text-center { text-align: center; }
                            .strk-text-muted { color: var(--c9-text-secondary); }
                            
                            /* Layout Utility */
                            .strk-flex-between { display: flex; justify-content: space-between; align-items: flex-start; }
                            .strk-flex-col { display: flex; flex-direction: column; }
                            .strk-gap-1 { gap: var(--l1-space-xs); }
                            
                            /* Komponen Spesifik */
                            .strk-header-box { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: var(--l2-space-sm); }
                            .strk-logo { max-width: 80px; margin-bottom: var(--l2-space-sm); filter: grayscale(100%); } /* Sesuai dokumentasi: Logo HW/Line Art */
                            
                            .strk-dashed-line { border-top: 2px dashed var(--c34-divider); margin: var(--l2-space-sm) 0; width: 100%; }
                            
                            /* Row Data / List Produk */
                            .strk-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px; gap: var(--l2-space-sm); }
                            .strk-row-left { flex: 1; padding-right: var(--l1-space-xs); }
                            .strk-row-right { flex: 0 0 auto; white-space: nowrap; text-align: right; }
                            
                            .strk-prod-title { font-weight: var(--t11-font-weight-medium); display: block; margin-bottom: 2px; }
                            .strk-prod-sn { font-size: var(--t4-font-size-xs); font-weight: var(--t12-font-weight-bold); margin-top: 4px; display: block; }
                            
                            .strk-total-box { font-size: var(--t6-font-size-md); font-weight: var(--t12-font-weight-bold); margin-top: var(--l1-space-xs); }
                            
                            .strk-footer-box { text-align: center; margin-top: var(--l3-space-md); }
                        `
                    },
                    { 
                        id: 'strk_style_t2', 
                        label: 'Compact Print', 
                        icon: 'fas fa-compress-arrows-alt',
                        structure: [
                            {
                                id: 'strk-wrap',
                                content: [
                                    'obj_strk_header',     // Meta gabung di header buat hemat space
                                    'obj_strk_divider_1', 
                                    'obj_strk_produk',     
                                    'obj_strk_divider_2',  
                                    'obj_strk_rincian',    
                                    'obj_strk_total',      
                                    'obj_strk_footer'      
                                ]
                            }
                        ],
                        style: `
                            /* Style Compact: Hemat kertas, margin dan padding dirapatkan */
                            .strk-wrap { padding: var(--l2-space-sm); display: flex; flex-direction: column; background: var(--c3-surface-primary); color: var(--c8-text-primary); font-family: var(--t3-font-family-monospace), monospace; font-size: var(--t4-font-size-xs); width: 100%; max-width: 320px; margin: 0 auto; border: var(--l39-border-width) solid var(--c31-border-primary); border-radius: var(--l6-radius-none); }
                            .strk-text-xs { font-size: 10px; }
                            .strk-text-sm { font-size: var(--t4-font-size-xs); }
                            .strk-text-md { font-size: var(--t5-font-size-sm); }
                            .strk-fw-bold { font-weight: var(--t12-font-weight-bold); }
                            .strk-text-center { text-align: center; }
                            .strk-text-muted { color: var(--c9-text-secondary); }
                            .strk-flex-between { display: flex; justify-content: space-between; align-items: flex-start; }
                            .strk-flex-col { display: flex; flex-direction: column; }
                            .strk-header-box { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: var(--l1-space-xs); }
                            .strk-logo { max-width: 60px; margin-bottom: var(--l1-space-xs); filter: grayscale(100%); }
                            .strk-dashed-line { border-top: 1px dashed var(--c34-divider); margin: var(--l1-space-xs) 0; }
                            .strk-row { display: flex; justify-content: space-between; margin-bottom: 2px; gap: var(--l1-space-xs); }
                            .strk-row-left { flex: 1; }
                            .strk-row-right { flex: 0 0 auto; white-space: nowrap; }
                            .strk-prod-title { font-weight: var(--t12-font-weight-bold); display: block; }
                            .strk-total-box { font-size: var(--t5-font-size-sm); font-weight: var(--t12-font-weight-bold); }
                            .strk-footer-box { text-align: center; margin-top: var(--l2-space-sm); }
                        `
                    }
                ]
            }
        ]
    }
];


window.UniverseStudio.Registry['struk'] = { label: 'Cetak Struk', config: CONFIG_LAYOUT_STRUK };