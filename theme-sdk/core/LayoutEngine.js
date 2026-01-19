// --------------------------------------------------------
// 📂 FILE: core/LayoutEngine.js
// --------------------------------------------------------
export class LayoutEngine {
    constructor() { /* Ready */ }

    resolve(state) {
        const l = state.layout || {};
        return {
            layoutWrapper: l.input || 'il-1',
            pvInput: 'input-preview-box u-base ctx-override ' + (l.simulation || 'sim-range'),
            pvCard: 'product-card u-base ctx-override ' + (l.product || 'pl-1'),
            pvHomeHeader: 'home-header u-nav ctx-override ' + (l.homeHeader || ''),
            pvHomeBody: 'home-body-wrap ' + (l.homeBody || 'bdy-std'),
            saldoCard: 'saldo-card u-base ctx-override',
            pvQuickAct: 'quick-actions ctx-override',
            commonAction: 'qa-btn u-action', 
            commonInput: 'ci-input-wrap u-sub'
        };
    }
}