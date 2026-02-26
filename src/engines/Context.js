export default class ContextEngine {
    process(state, configContext) {
        const activeOverrides = state.contextOverrides || {};
        const overrides = {};
        
        // Ambil rule permission
        const perms = configContext.PERMISSIONS[state.activeFamily] || configContext.PERMISSIONS['default'];

        Object.keys(activeOverrides).forEach(key => {
            // Validasi: Kalau dilarang, abaikan.
            if (perms[key] === false) return;
            
            // ✅ HANYA MENDATA INTENT (Niat)
            // Tidak ada lagi ColorUtils.getReadableText() atau ColorUtils.mix() di sini!
            overrides[key] = {
                targetRole: key,
                intentType: key === 'ACTION_MENU' ? 'accent' : 'surface',
                rawValue: activeOverrides[key],
                removeBgImage: true
            };
        });

        // Lempar datanya, biarkan Renderer/Engine lain yang pusing soal eksekusi
        return { 
            overrides, 
            layoutOverrides: state.layoutOverrides || {} 
        };
    }
}