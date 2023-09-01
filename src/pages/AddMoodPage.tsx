import { IonCardTitle } from "@ionic/react";
import MoodIcon from "../components/MoodIcon/MoodIcon";
import MoodInput from "../components/MoodInput/MoodInput";
import { useState } from "react";
import Entry from "../models/entry/Entry";
import AddEntryModalStep from "../components/AddEntryModal/AddEntryModalStep";
import AddFeelingsPage from "./AddFeelingsPage";

interface Props {
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    entry: Entry;
}

export default ({entry, close, save}: Props) => {
    const [mood, setMood] = useState(entry.mood ?? 0);
    const title = "Настроение";
    const nextComponent = <AddFeelingsPage {...{mood, close, save, prevTitle: title, entry: {...entry, mood}}} />;
    const footer = <MoodInput mood={mood} setMood={setMood} className="ion-padding-horizontal" />;

    return (
        <AddEntryModalStep {...{footer, nextComponent, title, mood, close}}>
            <IonCardTitle className="ion-padding-top ion-text-center">
                Как Вы чувствуете себя сейчас?
            </IonCardTitle>
            <MoodIcon mood={mood} width="100%" height="calc(100% - 86px)" animate={true} />
        </AddEntryModalStep>
    );
}