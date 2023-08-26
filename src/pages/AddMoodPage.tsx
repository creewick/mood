import { IonCardTitle } from "@ionic/react";
import getColors from "../functions/moodColors";
import MoodIcon from "../components/MoodIcon";
import MoodInput from "../components/MoodInput";
import { useState } from "react";
import Entry from "../models/Entry";
import AddEntryModalStep from "../components/modals/AddEntryModalStep";
import AddFeelingsPage from "./AddFeelingsPage";

interface Props {
    close: () => void;
    save: (entry: Entry) => Promise<void>;
}

export default ({close, save}: Props) => {
    const [mood, setMood] = useState(0);
    const colors = getColors(mood);
    const title = "Настроение";
    const nextComponent = () => <AddFeelingsPage {...{mood, colors, close, save, prevButton: title}} />;
    const footer = <MoodInput mood={mood} setMood={setMood} className="ion-padding-horizontal" />;

    const iconStyle = {
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',
    }

    return (
        <AddEntryModalStep {...{colors, close, title, footer, nextComponent}}>
            <IonCardTitle className="ion-padding-top ion-text-center">
                Как Вы чувствуете себя сейчас?
            </IonCardTitle>
            <MoodIcon mood={mood} width="100%" height="calc(100% - 86px)" animate={true} />
        </AddEntryModalStep>
    );
}