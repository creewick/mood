
import { IonCardTitle, IonDatetime, IonDatetimeButton, IonPopover } from "@ionic/react";
import { Translation } from "i18nano";
import { useState } from "react";
import Entry from "../../../models/entry/Entry";
import MoodIcon from "../../MoodIcon/MoodIcon";
import MoodInput from "../../MoodInput/MoodInput";
import AddEntryModalStep from "../AddEntryModalStep";
import AddFeelingsPage from "./AddFeelingsPage";


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
    const [mood, setMood] = useState(entry.mood ?? 0);
    const title = 'modal.mood';
    const nextComponent = <AddFeelingsPage {...{close, save, prevTitle: title, entry: {...entry, mood, date: new Date(date)}}} />;
    const footer = <MoodInput mood={mood} setMood={setMood} className="ion-padding-horizontal" />;

    return (
        <AddEntryModalStep {...{footer, nextComponent, title, mood, close}}>
            <IonCardTitle className="ion-padding-top ion-text-center">
                <Translation path="modal.howDidYouFeelAtThatMoment" />
            </IonCardTitle>
            <IonDatetimeButton className="ion-padding-top" datetime="datetime" id="datetime-button" />
            <IonPopover keepContentsMounted={true} trigger="datetime-button">
                <IonDatetime id="datetime" style={{borderRadius: '12px'}} size="cover" preferWheel={true} value={date} max={isoDate} onIonChange={({detail}) => setDate(detail.value as string)} />
            </IonPopover>
            <MoodIcon mood={mood} width="100%" height="calc(100% - 132px)" animate={true} />
        </AddEntryModalStep>
    );
}