export const CONFIG_LAYOUT_CHECKOUT = [
    {
        id: 'section_main_checkout',
        label: 'Layout Checkout',
        target: 'checkoutMain', // Hanya 1 target DOM untuk seluruh halaman
        groups: [
            {
                id: 'coStyle_A',
                label: 'Style Boxed',
                variant: [
                    { 
                        id: 'co_style_a1', 
                        label: 'Standard', 
                        icon: 'fas fa-box',
                        structure: [
                            {
                                id: 'chk-full-wrap',
                                content: [
                                    'obj_alert', 
                                    'obj_alamat', 
                                    'obj_produk_list', 
                                    'obj_voucher', 
                                    'obj_pembayaran', 
                                    'obj_rincian',
                                    'obj_float_bar' // Float bar digabung di satu kerangka
                                ]
                            }
                        ],
                        style: `
                            .wrap { padding: var(--l30-container-padding); padding-bottom: 100px; display: flex; flex-direction: column; gap: var(--l4-space-lg); }
                            
                            /* Typography Utility */
                            .text-sm { font-size: var(--t5-font-size-sm); }
                            .text-xs { font-size: var(--t4-font-size-xs); }
                            .text-lg { font-size: var(--t7-font-size-lg); }
                            .fw-bold { font-weight: var(--t12-font-weight-bold); }
                            .text-muted { color: var(--c9-text-secondary); }
                            .text-danger { color: var(--c43-status-error-text); }
                            .text-success { color: var(--c37-status-success-text); }
                            .text-warning { color: var(--c40-status-warning-text); }
                            .text-primary { color: var(--c48-accent-primary); }

                            /* Layout Utility */
                            .flex-between { display: flex; justify-content: space-between; align-items: center; }
                            .flex-col { display: flex; flex-direction: column; }
                            .gap-2 { gap: var(--l2-space-sm); }
                            .gap-3 { gap: var(--l3-space-md); }
                            .d-none { display: none !important; }

                            /* Components */
                            .box { background: var(--c3-surface-primary); border-radius: var(--l8-radius-md); padding: var(--l4-space-lg); box-shadow: var(--l12-elevation-1); border: var(--l39-border-width) solid var(--c31-border-primary); }
                            .box-header { font-size: var(--t5-font-size-sm); font-weight: var(--t12-font-weight-bold); color: var(--c8-text-primary); border-bottom: 1px solid var(--c34-divider); padding-bottom: var(--l2-space-sm); margin-bottom: var(--l3-space-md); display: flex; align-items: center; gap: var(--l2-space-sm); }
                            
                            .alert-danger { background: var(--c42-status-error-bg); color: var(--c43-status-error-text); padding: var(--l3-space-md); border-radius: var(--l8-radius-md); border: 1px solid var(--c44-status-error-border); font-size: var(--t5-font-size-sm); }
                            .alert-warning { background: var(--c39-status-warning-bg); color: var(--c40-status-warning-text); padding: var(--l3-space-md); border-radius: var(--l8-radius-md); border: 1px solid var(--c41-status-warning-border); font-size: var(--t5-font-size-sm); }

                            /* Product Card */
                            .prod-card { display: flex; gap: var(--l3-space-md); padding-top: var(--l3-space-md); border-bottom: 1px dashed var(--c34-divider); padding-bottom: var(--l3-space-md); }
                            .prod-card:last-child { border-bottom: none; padding-bottom: 0; }
                            .prod-img { width: 60px; height: 60px; border-radius: var(--l7-radius-sm); object-fit: cover; border: 1px solid var(--c32-border-secondary); }
                            .prod-info { flex: 1; }
                            .prod-name { font-size: var(--t5-font-size-sm); font-weight: var(--t11-font-weight-medium); color: var(--c8-text-primary); margin-bottom: var(--l1-space-xs); }
                            .prod-price { font-size: var(--t5-font-size-sm); font-weight: var(--t12-font-weight-bold); color: var(--c8-text-primary); }

                            /* Float Bar */
                            .float-bar { position: fixed; bottom: 0; left: 0; right: 0; background: var(--c3-surface-primary); padding: var(--l3-space-md) var(--l30-container-padding); padding-bottom: calc(var(--l3-space-md) + env(safe-area-inset-bottom)); border-top: var(--l39-border-width) solid var(--c31-border-primary); box-shadow: 0 -4px 10px var(--c51-shadow-color); display: flex; justify-content: space-between; align-items: center; z-index: 900; }
                            .btn-checkout { background: var(--c17-action-primary-bg); color: var(--c18-action-primary-text); border: none; border-radius: var(--l10-radius-full); padding: var(--l2-space-sm) var(--l4-space-lg); font-weight: var(--t12-font-weight-bold); font-size: var(--t5-font-size-sm); cursor: pointer; box-shadow: var(--l12-elevation-1); }
                            .btn-checkout.disabled { background: var(--c20-action-secondary-bg); color: var(--c21-action-secondary-text); cursor: not-allowed; box-shadow: none; }

                            /* PPOB & Notes */
                            .info-block { background: var(--c4-surface-secondary); border-radius: var(--l7-radius-sm); padding: var(--l2-space-sm) var(--l3-space-md); margin-top: var(--l2-space-sm); font-size: var(--t4-font-size-xs); }
                            .ppob-row, .bulk-row { display: flex; justify-content: space-between; margin-bottom: 2px; color: var(--c9-text-secondary); }
                            .ppob-row .fw-bold, .bulk-row .fw-bold { color: var(--c8-text-primary); }
                        `
                    },
                    { 
                        id: 'co_style_a2', 
                        label: 'Compact', 
                        icon: 'fas fa-compress-arrows-alt',
                        /* Variasi jika suatu saat kamu mau bikin versi lebih padat tanpa mengubah data */
                        structure: [
                            {
                                id: 'chk-full-wrap',
                                content: ['obj_alert', 'obj_alamat', 'obj_produk_list', 'obj_voucher', 'obj_pembayaran', 'obj_rincian', 'obj_float_bar']
                            }
                        ]
                    }
                ]
            },
            {
                id: 'coStyle_B',
                label: 'Style Seamless',
                variant: [
                    { id: 'co_style_b1', label: 'Seamless List', icon: 'fas fa-stream' }
                ]
            }
        ]
    }
];


window.UniverseStudio.Registry['checkout'] = { label: 'Checkout', config: CONFIG_LAYOUT_CHECKOUT };