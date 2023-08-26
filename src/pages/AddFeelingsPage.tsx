import { IonText, IonChip } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import { useState } from "react";
import moodCaption from "../functions/moodCaptions";
import { getFeelings } from "../functions/feelings";
import "../components/Title.css";
import Entry from "../models/Entry";
import AddEntryModalStep from "../components/modals/AddEntryModalStep";
import AddFactorsPage from "./AddFactorsPage";

interface Props {
    mood: number;
    colors: any;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    prevButton: string;
}

export default ({mood, colors, close, prevButton, save}: Props) => {
    const [feelings, setFeelings] = useState<string[]>([]);
    const title = 'Чувства';
    const nextComponent = () => <AddFactorsPage {...{mood, feelings, colors, close, save, prevButton: title}} />;
    
    const onClick = (feeling: string) => {
        setFeelings(feelings.includes(feeling)
            ? feelings.filter((f) => f !== feeling)
            : [...feelings, feeling]);
    }

    const renderFeeling = (feeling: string) => (
        <IonChip key={feeling} outline={!feelings.includes(feeling)} onClick={() => onClick(feeling)}>
            {feeling}
        </IonChip>
    );
    
    return (
        <AddEntryModalStep {...{colors, close, title, prevButton, nextComponent}}>
            <MoodIcon mood={mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="title ion-text-center">
                { moodCaption(mood) }
            </h3>
            <div className="ion-padding-vertical ion-text-center">
                <IonText>
                    Какими словами можно описать Ваши чувства?
                </IonText>
            </div>
            <div className="ion-padding-vertical ion-text-center">
                { getFeelings(mood).sort((a, b) => b.length - a.length).map(renderFeeling) }
            </div>
        </AddEntryModalStep>
    );
}