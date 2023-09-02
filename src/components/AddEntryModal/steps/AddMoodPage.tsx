
import { IonCardTitle } from "@ionic/react";
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
    const [mood, setMood] = useState(entry.mood ?? 0);
    const title = 'modal.mood';
    const nextComponent = <AddFeelingsPage {...{close, save, prevTitle: title, entry: {...entry, mood}}} />;
    const footer = <MoodInput mood={mood} setMood={setMood} className="ion-padding-horizontal" />;

    return (
        <AddEntryModalStep {...{footer, nextComponent, title, mood, close}}>
            <IonCardTitle className="ion-padding-top ion-text-center">
                <Translation path="modal.howDoYouFellRightNow" />
            </IonCardTitle>
            <MoodIcon mood={mood} width="100%" height="calc(100% - 86px)" animate={true} />
        </AddEntryModalStep>
    );
}