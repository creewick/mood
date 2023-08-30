import { IonCardTitle } from "@ionic/react";
import getColors from "../functions/moodColors";
import MoodIcon from "../components/MoodIcon/MoodIcon";
import MoodInput from "../components/MoodInput/MoodInput";
import { useState } from "react";
import Entry from "../models/storage/Entry";
import AddEntryModalStep from "../components/AddEntryModal/AddEntryModalStep";
import AddFeelingsPage from "./AddFeelingsPage";

interface Props {
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    entry: Entry;
}

export default ({entry, close, save}: Props) => {
    const [mood, setMood] = useState(entry.mood ?? 0);
    const colors = getColors(mood ?? 0);
    const title = "Настроение";
    const nextComponent = <AddFeelingsPage {...{colors, close, save, prevButton: title, entry: {...entry, mood}}} />;
    const footer = <MoodInput mood={mood} setMood={setMood} className="ion-padding-horizontal" />;

    return (
        <AddEntryModalStep {...{colors, close, title, footer, nextComponent}}>
            <IonCardTitle className="ion-padding-top ion-text-center">
                Как Вы чувствуете себя сейчас?
            </IonCardTitle>
            <MoodIcon mood={mood} width="100%" height="calc(100% - 86px)" animate={true} />
        </AddEntryModalStep>
    );
}