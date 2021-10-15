const INITIAL_STATE = {
    data: []
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
        }
        default:
            return {
                ...state
            };
    }
};