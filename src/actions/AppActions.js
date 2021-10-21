export const AddData = data => ({
    type: "AddData",
    payload: data
});

export const UpdateData = data => ({
    type: "UpdateData",
    payload: data
});

export const DeleteData = data => ({
    type: "DeleteData",
    id: data
});

export const UpdateResumeData = data => ({
    type: "UpdateResumeData",
    payload: data
});

export const SwitchTheme = () => ({
    type: "SwitchTheme"
});
