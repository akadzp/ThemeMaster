export const CONFIG_LAYOUT_DETAIL_TRANSAKSI = [
    {
        id: 'section_main_dt',
        label: 'Layout Detail Transaksi',
        target: 'detailTransaksiMain', // 1 Target DOM utuh
        groups: [
            {
                id: 'dtStyle_A',
                label: 'Style Terpisah (Boxed)',
                variant: [
                    { 
                        id: 'dt_style_a1', 
                        label: 'Standard Card', 
                        icon: 'fas fa-file-invoice',
                        structure: [
                            {
                                id: 'dt-full-wrap',
                                content: [
                                    'obj_dt_status',     // Header & Status
                                    'obj_dt_alamat',     // Alamat Penerima/Delivery
                                    'obj_dt_produk',     // Loop produk & asal pengiriman
                                    'obj_dt_rincian',    // Total & Biaya
                                    'obj_dt_action'      // Tombol Bayar / Cetak Struk
                                ]
                            }
                        ],
                        style: `
                            /* =========================================================
                               THEMESDK - DETAIL TRANSAKSI (DECOUPLED)
                            ========================================================= */
                            .dt-wrap { padding: var(--l30-container-padding); padding-bottom: 80px; display: flex; flex-direction: column; gap: var(--l4-space-lg); }
                            
                            /* Core Box */
                            .dt-box { background: var(--c3-surface-primary); border-radius: var(--l8-radius-md); padding: var(--l4-space-lg); box-shadow: var(--l12-elevation-1); border: var(--l39-border-width) solid var(--c31-border-primary); }
                            .dt-box-header { font-size: var(--t5-font-size-sm); font-weight: var(--t12-font-weight-bold); color: var(--c8-text-primary); border-bottom: 1px solid var(--c34-divider); padding-bottom: var(--l2-space-sm); margin-bottom: var(--l3-space-md); display: flex; justify-content: space-between; align-items: center; }
                            
                            /* Typography */
                            .dt-text-xs { font-size: var(--t4-font-size-xs); }
                            .dt-text-sm { font-size: var(--t5-font-size-sm); }
                            .dt-text-lg { font-size: var(--t7-font-size-lg); }
                            .dt-fw-bold { font-weight: var(--t12-font-weight-bold); }
                            .dt-text-muted { color: var(--c9-text-secondary); }
                            .dt-text-primary { color: var(--c48-accent-primary); }
                            
                            /* Flex Utility */
                            .dt-flex-between { display: flex; justify-content: space-between; align-items: center; }
                            .dt-flex-col { display: flex; flex-direction: column; }
                            .dt-gap-2 { gap: var(--l2-space-sm); }
                            .dt-gap-3 { gap: var(--l3-space-md); }
                            
                            /* Badges / Status */
                            .dt-badge { padding: 4px 8px; border-radius: var(--l7-radius-sm); font-size: var(--t4-font-size-xs); font-weight: var(--t12-font-weight-bold); text-transform: uppercase; }
                            .dt-badge.pending { background: var(--c39-status-warning-bg); color: var(--c40-status-warning-text); border: 1px solid var(--c41-status-warning-border); }
                            .dt-badge.success { background: var(--c36-status-success-bg); color: var(--c37-status-success-text); border: 1px solid var(--c38-status-success-border); }
                            
                            /* Product List Template */
                            .dt-prod-item { display: flex; gap: var(--l3-space-md); padding-top: var(--l3-space-md); border-bottom: 1px dashed var(--c34-divider); padding-bottom: var(--l3-space-md); }
                            .dt-prod-item:last-child { border-bottom: none; padding-bottom: 0; }
                            .dt-prod-img { width: 50px; height: 50px; border-radius: var(--l7-radius-sm); object-fit: cover; border: 1px solid var(--c32-border-secondary); background: var(--c4-surface-secondary); }
                            .dt-prod-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
                            
                            /* Data Blocks (PPOB / Notes) */
                            .dt-info-block { background: var(--c4-surface-secondary); border-radius: var(--l7-radius-sm); padding: var(--l2-space-sm) var(--l3-space-md); margin-top: var(--l2-space-sm); font-size: var(--t4-font-size-xs); color: var(--c8-text-primary); border: 1px solid var(--c32-border-secondary); }
                            .dt-row-data { display: flex; justify-content: space-between; margin-bottom: 2px; }
                            
                            /* Floating Bottom Action */
                            .dt-float-bar { position: fixed; bottom: 0; left: 0; right: 0; background: var(--c3-surface-primary); padding: var(--l3-space-md) var(--l30-container-padding); padding-bottom: calc(var(--l3-space-md) + env(safe-area-inset-bottom)); border-top: var(--l39-border-width) solid var(--c31-border-primary); box-shadow: 0 -4px 10px var(--c51-shadow-color); display: flex; justify-content: space-between; align-items: center; z-index: 900; }
                            .dt-btn { background: var(--c17-action-primary-bg); color: var(--c18-action-primary-text); border: none; border-radius: var(--l10-radius-full); padding: var(--l2-space-sm) var(--l4-space-lg); font-weight: var(--t12-font-weight-bold); font-size: var(--t5-font-size-sm); cursor: pointer; box-shadow: var(--l12-elevation-1); display: flex; align-items: center; gap: 6px; }
                            .dt-btn.outline { background: transparent; border: 1px solid var(--c31-border-primary); color: var(--c8-text-primary); box-shadow: none; }
                        `
                    }
                ]
            }
        ]
    }
];


window.UniverseStudio.Registry['detail-transaksi'] = { label: 'Detail Transaksi', config: CONFIG_LAYOUT_DETAIL_TRANSAKSI };