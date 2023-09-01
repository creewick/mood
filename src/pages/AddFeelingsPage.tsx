import { IonText, IonChip, IonButton } from "@ionic/react";
import MoodIcon from "../components/MoodIcon/MoodIcon";
import { useState } from "react";
import moodCaption from "../functions/moodCaptions";
import { getFeelings } from "../functions/feelings";
import Entry from "../models/storage/Entry";
import AddEntryModalStep from "../components/AddEntryModal/AddEntryModalStep";
import AddFactorsPage from "./AddFactorsPage";

interface Props {
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    entry: Entry;
    colors: any;
    prevTitle: string;
}

export default ({colors, entry, close, prevTitle, save}: Props) => {
    const [feelings, setFeelings] = useState<string[]>([]);
    const title = 'Чувства';
    const nextComponent = <AddFactorsPage {...{colors, close, save, prevTitle: title, entry: {...entry, feelings}}} />;
    const canSkip = true;

    const onClick = (feeling: string) => {
        setFeelings(feelings.includes(feeling)
            ? feelings.filter((f) => f !== feeling)
            : [...feelings, feeling]);
    };

    const renderFeeling = (feeling: string) => (
        <IonChip key={feeling} outline={!feelings.includes(feeling)} onClick={() => onClick(feeling)}>
            {feeling}
        </IonChip>
    );

    const onSave = async () => {
        await save({...entry, feelings});
    }

    return (
        <AddEntryModalStep {...{nextComponent, title, prevTitle, colors, close, save: onSave, canSkip}}>
            <MoodIcon mood={entry.mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="ion-text-center">
                { moodCaption(entry.mood) }
            </h3>
            <div className="ion-padding-vertical ion-text-center">
                <IonText>
                    Какими словами можно описать Ваши чувства?
                </IonText>
            </div>
            <div className="ion-padding-vertical ion-text-center">
                { getFeelings(entry.mood).sort((a, b) => b.length - a.length).map(renderFeeling) }
            </div>
        </AddEntryModalStep>
    );
}