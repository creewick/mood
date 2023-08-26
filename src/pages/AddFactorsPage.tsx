import { IonText, IonChip } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import { useState } from "react";
import moodCaption from "../functions/moodCaptions";
import getFactorGroups from "../functions/factors";
import Entry from "../models/Entry";
import AddEntryModalStep from "../components/modals/AddEntryModalStep";
import AddCommentPage from "./AddCommentPage";

interface Props {
    mood: number;
    feelings: string[];
    colors: any;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    prevButton: string;
}

export default ({mood, feelings, colors, close, prevButton, save}: Props) => {
    const [factors, setFactors] = useState<string[]>([]);
    const title = 'Влияние';
    const nextComponent = () => <AddCommentPage {...{mood, feelings, factors, colors, close, save, prevButton: title}} />;

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

    
    return (
        <AddEntryModalStep {...{colors, close, title, prevButton, nextComponent}}>
            <MoodIcon mood={mood} width="100%" height="max(100px, 25%)" animate={false} />
            <h3 className="title ion-text-center">
                { moodCaption(mood) }
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