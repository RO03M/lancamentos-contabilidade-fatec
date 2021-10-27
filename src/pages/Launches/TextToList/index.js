import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AddDataArray } from "../../../actions/AppActions";

import styles from "./index.module.css";

const TextToList = props => {

    const [text, SetText] = useState("");

    const launchList = useSelector(store => store.AppReducer.data);

    const dispatch = useDispatch();

    const Convert = () => {
        let lastId = launchList.sort((a, b) => {
            if (a?.id < b?.id) return -1;
            else if (a?.id > b?.id) return 1;
            return 0;
        })[launchList.length - 1]?.id || -1;//Get last id to don't generate already created ids

        if (!text) return;
        let data = [];
        let rows = text.split("\n");

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i].split("\t");

            let words = row[2].split(" ");
            
            for (let i = 0; i < words.length; i++) {
                if (words[i].length <= 3 || words[i] == "sobre" || words[i] == "conta" || words[i] == "para") continue;
                words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
            }
            
            let ledgerType = words.join(" ");

            row[3].replace("\.", "").replace(",", ".");//removes dots and swap the comma with a dot
            row[4].replace("\.", "").replace(",", ".");

            data.push({
                id: lastId + i + 1,//mais um pq quando i == 0 ele vai ser igual ao último id
                item: row[0],
                registerType: row[1].toUpperCase(),
                ledgerType: ledgerType,
                debt: row[3] && parseFloat(row[3].replace(/[^,\d]/g, "")),
                credit: row[4] && parseFloat(row[4].replace(/[^,\d]/g, ""))
            });
        }

        dispatch(AddDataArray(data));
        SetText("");
    }

    return (
        <div className={styles.textInput}>
            <TextField
                fullWidth
                variant="filled"
                label="Texto copiado do Excel"
                multiline
                value={text}
                rows={1}
                onChange={e => SetText(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={Convert}
            >
                Converter
            </Button>
        </div>
    );
}

export default TextToList;