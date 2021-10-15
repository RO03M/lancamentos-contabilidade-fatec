import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "./Container";
import List from "./List";

const BPDRE = () => {

    const [reasonList, SetReasonList] = useState({});

    const data = useSelector(store => store.AppReducer.data);

    useEffect(() => {
        let tempReasonsList = {};
        data.map(x => {
            if (!x?.ledgerType) return;
            let debts = [];
            let credits = [];
            
            if (tempReasonsList[x?.ledgerType]?.debts) debts.push(...tempReasonsList[x?.ledgerType]?.debts);
            if (tempReasonsList[x?.ledgerType]?.credits) credits.push(...tempReasonsList[x?.ledgerType]?.credits);

            if (!isNaN(parseFloat(x?.debt))) debts.push(parseFloat(x?.debt));
            if (!isNaN(parseFloat(x?.credit))) credits.push(parseFloat(x?.credit));

            let balance = 0;
            for (let i = 0; i < debts.length; i++) balance += debts[i];
            for (let i = 0; i < credits.length; i++) balance -= credits[i];
            tempReasonsList[x?.ledgerType] = {
                debts: debts,
                credits: credits,
                balance: balance
            }
        });
        SetReasonList(tempReasonsList);
        console.log(tempReasonsList);
    }, [data]);

    return (
        <div className="bpdre-container">
            <List
                reasonList={reasonList}
            />
        </div>
    );
}

export default BPDRE;