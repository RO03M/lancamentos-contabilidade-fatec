const INITIAL_STATE = {
    data: [],
    resumeData: {},
    theme: "dark"
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "AddData": {
            let dataNoRepeat = state.data.filter(x => x?.id !== action.payload?.id);
            
            return {   
                ...state,
                data: [...dataNoRepeat, ...[action.payload]]
            };
        } case "UpdateData": {
            let data = state.data.filter(x => x?.id !== action.payload?.id);

            return {
                ...state,
                data: [...data, ...[action.payload]]
            };
        } case "DeleteData": {
            let data = state.data.filter(x => x?.id !== action.id);
            return {
                ...state,
                data: [...data]
            };
        } case "UpdateResumeData": {
            let data = Object.assign(state.resumeData, action.payload);
            return {
                ...state,
                resumeData: data
            };
        } case "SwitchTheme": {
            if (state.theme === "dark") return {
                ...state,
                theme: "light"
            };
            else if (state.theme === "light") return {
                ...state,
                theme: "dark"
            }
        }
        default:
            return {
                ...state
            };
    }
};