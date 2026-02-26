export default class LayoutEngine {
    process(state, config) {
        const pageConfig = config.LAYOUT[state.activePage] || [];
        const layoutState = { activePage: state.activePage };

        pageConfig.forEach(section => {
            // BENAR: Ambil state berdasarkan target, bukan section.id
            const savedId = state.layout[section.target]; 
            const defaultId = section.groups[0]?.variant[0]?.id;
            
            layoutState[section.target] = savedId || defaultId;
        });

        return { layout: layoutState };
    }
}