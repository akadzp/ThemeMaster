export const CONFIG_LAYOUT_PRODUKD = [
    {
        id: 'section_header_produkD',
        label: 'Header Produk Digital',
        target: 'produkDHeader',
        groups: [
            {
                id: 'hpdStyle_A',
                label: 'Style A',
                variant: [
                    { id: 'hpdStyle_A1', label: 'Style A1', icon: 'fas fa-square' },
                    { id: 'hpdStyle_A2', label: 'Style A2', icon: 'fas fa-th-large' }
                ]
            },
            {
                id: 'hpdStyle_B',
                label: 'Style B',
                variant: [
                    { id: 'hpdStyle_B1', label: 'Style B1', icon: 'fas fa-window-maximize' },
                    { id: 'hpdStyle_B2', label: 'Style B2', icon: 'fas fa-columns' }
                ]
            },
            {
                id: 'hpdKerangkaInput',
                label: 'Kerangka Input',
                variant: [
                    { id: 'hpd_std1', label: '1 Kolom', icon: 'fas fa-minus' },
                    { id: 'hpd_std2', label: '1 Kolom + Cek', icon: 'fas fa-search' },
                    { id: 'hpd_std3', label: '2 Kolom', icon: 'fas fa-pause' },
                    { id: 'hpd_std4', label: 'Dinamis (+/-)', icon: 'fas fa-sliders-h' },
                    { id: 'hpd_std5', label: 'Tipe 5', icon: 'fas fa-keyboard' },
                    { id: 'hpd_std6', label: 'Tipe 6', icon: 'fas fa-keyboard' },
                    { id: 'hpd_std7', label: 'Tipe 7', icon: 'fas fa-keyboard' },
                    { id: 'hpd_std8', label: 'Tipe 8', icon: 'fas fa-keyboard' },
                    { id: 'hpd_std9', label: 'Tipe 9', icon: 'fas fa-keyboard' },
                    { id: 'hpd_std10', label: 'Tipe 10', icon: 'fas fa-keyboard' }
                ]
            }
        ]
    },
    {
        id: 'section_body_produkD',
        label: 'Body Produk Digital',
        target: 'produkDBody',
        groups: [
            {
                id: 'bpdStyle_A',
                label: 'Style A',
                variant: [
                    { id: 'bpdStyle_A1', label: 'Style A1', icon: 'fas fa-list' },
                    { id: 'bpdStyle_A2', label: 'Style A2', icon: 'fas fa-th-list' }
                ]
            },
            {
                id: 'bpdStyle_B',
                label: 'Style B',
                variant: [
                    { id: 'bpdStyle_B1', label: 'Style B1', icon: 'fas fa-grip-vertical' },
                    { id: 'bpdStyle_B2', label: 'Style B2', icon: 'fas fa-grip-horizontal' }
                ]
            }
        ]
    },
    {
        id: 'section_detail_produkD',
        label: 'Detail Produk Digital',
        target: 'produkDDetail',
        groups: [
            {
                id: 'dpdStyle_A',
                label: 'Style A',
                variant: [
                    { id: 'dpdStyle_A1', label: 'Style A1', icon: 'fas fa-align-left' },
                    { id: 'dpdStyle_A2', label: 'Style A2', icon: 'fas fa-align-justify' }
                ]
            },
            {
                id: 'dpdStyle_B',
                label: 'Style B',
                variant: [
                    { id: 'dpdStyle_B1', label: 'Style B1', icon: 'fas fa-layer-group' },
                    { id: 'dpdStyle_B2', label: 'Style B2', icon: 'fas fa-stream' }
                ]
            }
        ]
    }
];


window.UniverseStudio.Registry['produk-digital'] = { label: 'Produk Digital', config: CONFIG_LAYOUT_PRODUKD };