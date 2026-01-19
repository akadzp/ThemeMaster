// --------------------------------------------------------
// 📂 FILE: config/context.js
// --------------------------------------------------------
export const ROLE_MAP = { 
    HEADER_BG: 'pvHomeHeader', 
    CARD_BALANCE: 'saldo-card', 
    ACTION_MENU: 'pvQuickAct', 
    INPUT_BG: 'pvInput', 
    PRODUCT_CARD: 'pvCard' 
};

export const PERMISSIONS = {
    'fam_neu': { 'HEADER_BG': false, 'CARD_BALANCE': false, 'INPUT_BG': false }, 
    'fam_clay': { 'HEADER_BG': true, 'CARD_BALANCE': true, 'INPUT_BG': true }, 
    'fam_glass': { 'HEADER_BG': false, 'CARD_BALANCE': true, 'INPUT_BG': true },
    'fam_outline': { 'HEADER_BG': true, 'CARD_BALANCE': true, 'INPUT_BG': false },
    'default': { 'HEADER_BG': true, 'CARD_BALANCE': true, 'INPUT_BG': true }
};

export const MENU_MAP = {
    'home': [ 
        { id: 'HEADER_BG', label: 'Header Background', icon: 'fas fa-window-maximize', condition: (l) => true }, 
        { id: 'CARD_BALANCE', label: 'Kartu Saldo', icon: 'far fa-credit-card', condition: (l) => !['style-wallet', 'style-card', 'style-d2-a', 'style-d2-b'].includes(l.homeHeader) }, 
        { id: 'ACTION_MENU', label: 'Menu Aksi', icon: 'fas fa-th-large', condition: (l) => l.homeHeader !== 'style-clean' } 
    ],
    'produk': [ 
        { id: 'INPUT_BG', label: 'Background Input', icon: 'fas fa-keyboard', condition: (l, f) => f !== 'fam_outline' }, 
        { id: 'PRODUCT_CARD', label: 'Kartu Produk', icon: 'fas fa-box', condition: (l) => true } 
    ],
    'fisik': [], 'profil': []
};