
import { IonCardTitle, IonCol, IonDatetime, IonRow } from "@ionic/react";
import { Translation } from "i18nano";
import { useState } from "react";
import Entry from "../../../models/entry/Entry";
import AddEntryModalStep from "../AddEntryModalStep";
import AddMoodPage from "./AddMoodPage";


interface Props {
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    entry: Entry;
}

export default ({entry, close, save}: Props) => {
    const initialDate = entry.date ?? new Date();
    const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
    const isoDate = (new Date(initialDate.getTime() - timeZoneOffset)).toISOString().slice(0, -1);
    const [date, setDate] = useState<string>(isoDate);
    const title = 'modal.time';
    const nextComponent = <AddMoodPage {...{close, save, prevTitle: title, entry: {...entry, date: new Date(date)}}} />;

    return (
        <AddEntryModalStep {...{nextComponent, title, mood: 0, close}}>
            <IonCardTitle className="ion-padding-vertical ion-text-center">
                <Translation path="modal.logAnEmotionOrMood" />
            </IonCardTitle>
            <IonRow>
                <IonCol className="ion-text-center">
                    <IonDatetime style={{borderRadius: '12px'}} size="cover" preferWheel={true} value={date} max={isoDate} onIonChange={({detail}) => setDate(detail.value as string)} />
            
                </IonCol>
            </IonRow>
            
            {/* <IonDatetimeButton className="ion-padding-top" datetime="datetime" />

            <IonModal keepContentsMounted={true} initialBreakpoint={0.25}>
                <IonDatetime id="datetime" preferWheel={true} value={date} max={isoDate} onIonChange={({detail}) => setDate(detail.value as string)} />
            </IonModal> */}
        </AddEntryModalStep>
    );
}