import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

import "./index.css";

const Reasons = () => {

    const [reasonList, SetReasonList] = useState({});

    const data = useSelector(store => store.AppReducer.data);

    useEffect(() => {
        // console.log(data)
        let tempReasonsList = {};
        data.map(x => {
            if (!x?.ledgerType) return;
            let debts = [];
            let credits = [];
            
            if (tempReasonsList[x?.ledgerType]?.debts) debts.push(...tempReasonsList[x?.ledgerType]?.debts);
            if (tempReasonsList[x?.ledgerType]?.credits) credits.push(...tempReasonsList[x?.ledgerType]?.credits);

            if (!isNaN(parseFloat(x?.debt))) debts.push(parseFloat(x?.debt));
            if (!isNaN(parseFloat(x?.credit))) credits.push(parseFloat(x?.credit));
            tempReasonsList[x?.ledgerType] = {
                debts: debts,
                credits: credits
            }
        });
        SetReasonList(tempReasonsList);
    }, [data]);

    return (
        <div className="reason">
            <div className="reason-cards-list">
                {(() => {
                    let cards = [];
                    for (const [key, value] of Object.entries(reasonList)) {
                        cards.push(<Card
                            title={key}
                            debts={value.debts}
                            credits={value.credits}
                            key={key}
                        />);
                    }
                    return cards;
                })()}
            </div>
        </div>
    );
}

export default Reasons;