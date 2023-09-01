import { IonText, IonChip, IonButton } from "@ionic/react";
import MoodIcon from "../components/MoodIcon/MoodIcon";
import { useState } from "react";
import moodCaption from "../functions/moodCaptions";
import getFactorGroups from "../functions/factors";
import Entry from "../models/storage/Entry";
import AddEntryModalStep from "../components/AddEntryModal/AddEntryModalStep";
import AddCommentPage from "./AddCommentPage";

interface Props {
    entry: Entry;
    colors: any;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    prevTitle: string;
}

export default ({entry, colors, close, prevTitle, save}: Props) => {
    const [factors, setFactors] = useState<string[]>([]);
    const title = 'Влияние';
    const nextComponent = <AddCommentPage {...{colors, close, save, prevTitle: title, entry: {...entry, factors}}} />;
    const canSkip = true;
    
    const onClick = (factor: string) => {
        setFactors(factors.includes(factor)
            ? factors.filter((f) => f !== factor)
            : [...factors, factor]);
    }

    const renderFactor = (factor: string) => (
        <IonChip key={factor} outline={!factors.includes(factor)} onClick={() => onClick(factor)}>
            {factor}
        </IonChip>
    );

    const renderGroup = (group: string[]) => (
        <div className="ion-padding-top ion-text-center">
            { group.sort((a, b) => b.length - a.length).map(renderFactor) }
        </div>
    );

    const onSave = async () => {
        await save({...entry, factors});
    }

    return (
        <AddEntryModalStep {...{nextComponent, title, prevTitle, colors, save: onSave, close, canSkip}}>
            <MoodIcon mood={entry.mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="title ion-text-center">
                { moodCaption(entry.mood) }
            </h3>
            <div className="ion-padding-vertical ion-text-center">
                <IonText>
                    Что оказало наибольшее влияние?
                </IonText>
            </div>
            { getFactorGroups().map(renderGroup) }
        </AddEntryModalStep>
    );
}