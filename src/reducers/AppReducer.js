const INITIAL_STATE = {
    data: JSON.parse(window.localStorage.getItem("data")) ?? [],
    resumeData: JSON.parse(window.localStorage.getItem("resumeData")) ?? {},
    theme: "dark"
};

const OrderByItem = (a, b) => {
    if (a?.item < b?.item) return -1;
    else if (a?.item > b?.item) return 1;
    return 0;
}

const SaveData = (dataParam = null, resumeParam = null) => {
    if (dataParam) window.localStorage.setItem("data", JSON.stringify(dataParam));
    if (resumeParam) window.localStorage.setItem("resumeData", JSON.stringify(resumeParam));
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "AddData": {
            let dataNoRepeat = state.data.filter(x => x?.id !== action.payload?.id);
            
            let newData = [...dataNoRepeat, ...[action.payload]]
            newData.sort(OrderByItem);
            
            SaveData(newData);
            return {   
                ...state,
                data: newData
            };
        } case "AddDataArray": {
            let dataNoRepeat = state.data.filter(x => x?.id !== action.payload?.id);
            
            let newData = [...dataNoRepeat, ...action.payload];
            newData.sort(OrderByItem);
            
            SaveData(newData);
            return {   
                ...state,
                data: newData
            };
        } case "UpdateData": {
            let data = state.data.filter(x => x?.id !== action.payload?.id);
            
            let newData = [...data, ...[action.payload]];
            newData.sort(OrderByItem);

            SaveData(newData);
            return {
                ...state,
                data: newData
            };
        } case "DeleteData": {
            let data = state.data.filter(x => x?.id !== action.id);
            data = [...data.sort(OrderByItem)];
            
            SaveData(data);
            return {
                ...state,
                data: data
            };
        } case "UpdateResumeData": {
            let data = Object.assign(state.resumeData, action.payload);
            
            SaveData(null, data);
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
        } case "Reset": {
            localStorage.removeItem("data");
            localStorage.removeItem("resumeData");
            return {
                ...state,
                data: [],
                resumeData: {}
            }
        }
        default:
            return {
                ...state
            };
    }
};