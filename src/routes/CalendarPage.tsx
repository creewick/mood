import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { Translation } from "i18nano";
import Month from "../components/Calendar/Month";
import { useContext, useEffect, useState } from "react";
import StorageContext from "../models/StorageContext";
import EntryService from "../services/EntryService";

export default () => {
    const entryService = new EntryService(useContext(StorageContext));
    const [months, setMonths] = useState<JSX.Element[]>([]);
    
    async function loadMonth(date: Date) {
        const entries = await entryService.getEntriesByMonth(date);
        const month = <Month date={date} entries={entries} key={date.toDateString()} />;
        setMonths([...months, month]);
    }

    useEffect(() => {
        loadMonth(new Date());
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <Translation path="tabs.calendar" />
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-vertical">
                { months }
            </IonContent>
        </IonPage>
    );
}