import { IonCard, IonCardSubtitle, IonCardTitle, IonList } from "@ionic/react";
import DaySummaryCardProps from "./DayCardProps";
import "./DayCard.css";
import DaySummaryCardEntry from "./DayCardEntry";
import MoodIcon from "../MoodIcon/MoodIcon";
import moodCaption from "../../functions/moodCaptions";
import { Ref, forwardRef } from "react";
import ColorService from "../../services/ColorService";
import useLocale from "../../services/useLocale";
import { Translation } from "i18nano";
import MoodService from "../../services/MoodService";

export default forwardRef(({date, entries}: DaySummaryCardProps, ref: Ref<HTMLIonCardElement>) => {
    const moodService = new MoodService();
    const language = useLocale();
    const title = date.toLocaleDateString(language, {weekday: 'short', day: 'numeric', month: 'short'});
    const mood = entries.map(x => x.mood).reduce((a, b) => a + b, 0) / entries.length || 0;
    const moodCaption = entries.length ? moodService.getMoodCaption(mood) : <Translation path="entries.noEntries" />;

    const style = {
        'background': `linear-gradient(180deg, ${ColorService.background(mood)} 0%, var(--background) 100%)`,
    }

    return (
        <IonCard ref={ref} className="day-card">
            <div style={style}>
                <IonCardTitle className="ion-text-center ion-padding-vertical">
                    {title}
                </IonCardTitle>
                <IonCardSubtitle className="ion-text-center ion-padding-bottom">
                    <Translation path="entries.moodOfTheDay" />
                </IonCardSubtitle>
                <MoodIcon width="100%" height="15svh" mood={entries.length ? mood : NaN} />
                <h3 className="ion-text-center ion-padding-bottom">
                    {moodCaption}
                </h3>
            </div>
            <IonList className="ion-margin-vertical" style={{height: 'calc(100% - 170px - 15svh)', overflowY: 'scroll', background: 'transparent'}}>
                {entries.map((entry) => <DaySummaryCardEntry entry={entry} key={entry.date.getTime()} />)}
            </IonList>
        </IonCard>
    );
});