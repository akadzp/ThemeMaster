// --------------------------------------------------------
// 📂 FILE: config/layout.js
// --------------------------------------------------------
export const DB = {
    'home': { sections: [ { label: 'Header Area', target: 'homeHeader', groups: [ { label: 'Style Dasar', options: [{ id: '', label: 'Classic Box', icon: 'far fa-id-card' }, { id: 'style-wallet', label: 'E-Wallet', icon: 'fas fa-wallet' }, { id: 'style-card', label: 'Platinum CC', icon: 'far fa-credit-card' }] }, { label: 'Dasar 2', options: [{ id: 'style-d2-a', label: 'Floating Nav', icon: 'fas fa-layer-group' }, { id: 'style-d2-b', label: 'Stacked Nav', icon: 'fas fa-stream' }] } ] }, { label: 'Body Content', target: 'homeBody', groups: [ { label: 'Grid Menu', options: [{ id: 'bdy-std', label: 'Standard 4', icon: 'fas fa-th-large' }, { id: 'bdy-compact', label: 'Compact 5', icon: 'fas fa-th' }, { id: 'bdy-clean', label: 'List Mode', icon: 'fas fa-list-ul' }] } ] } ] },
    'produk': { sections: [ { label: 'Form Input', target: 'input', groups: [ { label: 'Struktur', options: [{ id: 'il-1', label: 'Top-Down', icon: 'fas fa-arrow-down' }, { id: 'il-2', label: 'Side-Split', icon: 'fas fa-columns' }] } ] }, { label: 'List Produk', target: 'product', groups: [ { label: 'Tampilan', options: [{ id: 'pl-1', label: 'Detailed Row', icon: 'fas fa-list' }, { id: 'pl-2', label: 'Gallery Grid', icon: 'fas fa-border-all' }] } ] }, { label: 'Mode Logika', target: 'simulation', groups: [ { label: 'Tipe Transaksi', options: [ { id: 'sim-single', label: 'Satuan', icon: 'fas fa-mobile-alt' }, { id: 'sim-range', label: 'Range No.', icon: 'fas fa-sort-numeric-down' }, { id: 'sim-massal', label: 'Massal', icon: 'fas fa-cubes' } ] } ] } ] },
    'fisik': { sections: [] }, 'profil': { sections: [] }
};

export const SHAPES = [
    { id: 'default', label: 'Default', icon: 'fas fa-asterisk' }, { id: 'sharp', label: 'Kotak', icon: 'fas fa-square' },
    { id: 'sm', label: 'Kecil', icon: 'far fa-square' }, { id: 'md', label: 'Sedang', icon: 'far fa-clone' },
    { id: 'xl', label: 'Besar', icon: 'far fa-circle' }, { id: 'pill', label: 'Pill', icon: 'fas fa-capsules' },
    { id: 'organic', label: 'Cair', icon: 'fas fa-tint' }
];