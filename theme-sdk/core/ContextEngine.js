// --------------------------------------------------------
// 📂 FILE: core/ContextEngine.js
// --------------------------------------------------------
import { ColorUtils } from './ColorUtils.js';

export class ContextEngine {
    constructor() { /* Ready */ }

    resolve(state, configContext) {
        const roleMap = configContext?.ROLE_MAP || {};
        const permissions = configContext?.PERMISSIONS || {};
        const fam = state.activeFamily;
        const overrides = state.contextOverrides || {};
        
        const contract = { resetList: [], overrides: {} };
        Object.values(roleMap).forEach(domId => { if (domId) contract.resetList.push(domId); });

        const activePerms = permissions[fam] || permissions['default'] || {};

        Object.keys(overrides).forEach(roleKey => {
            if (activePerms[roleKey] === false) return;
            const targetId = roleMap[roleKey];
            if (!targetId) return;

            const colorVal = overrides[roleKey];
            const styles = {};

            if (fam === 'fam_outline' && roleKey === 'INPUT_BG') {
                styles['border-color'] = colorVal; 
                styles['color'] = colorVal;
                styles['--icon-color'] = colorVal; 
                styles['background'] = 'transparent';
                contract.overrides[targetId] = styles; 
                return;
            }

            styles['background'] = colorVal;
            const txtColor = ColorUtils.resolveText(colorVal, 'hard');
            styles['color'] = txtColor;

            if (fam === 'fam_outline' || fam === 'fam_brutal') styles['border-color'] = txtColor;
            if (fam === 'fam_neu') styles['box-shadow'] = 'none'; 
            if ((fam === 'fam_glass' || fam === 'fam_fluent') && colorVal.startsWith('#')) {
                const rgb = ColorUtils.hexToRgb(colorVal);
                styles['background'] = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`;
            }
            contract.overrides[targetId] = styles;
        });
        return contract;
    }
}