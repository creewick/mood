import { IonCard, IonCardSubtitle, IonCardTitle, IonList } from "@ionic/react";
import DaySummaryCardProps from "./DayCardProps";
import "./DayCard.css";
import DaySummaryCardEntry from "./DayCardEntry";
import MoodIcon from "../MoodIcon/MoodIcon";
import moodCaption from "../../functions/moodCaptions";
import { Ref, forwardRef } from "react";
import ColorService from "../../services/ColorService";

export default forwardRef(({date, entries}: DaySummaryCardProps, ref: Ref<HTMLIonCardElement>) => {
    const isToday = date.toDateString() === new Date().toDateString();
    const weekDay = date.toLocaleDateString(navigator.language, {weekday: 'short'});
    const dayMonth = date.toLocaleDateString(navigator.language, {day: 'numeric', month: 'short'});
    const title = `${isToday ? 'Сегодня': weekDay}, ${dayMonth}`;
    const mood = entries.map(x => x.mood).reduce((a, b) => a + b, 0) / entries.length || 0;


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
                    Настроение дня
                </IonCardSubtitle>
                <MoodIcon width="100%" height="15svh" mood={entries.length ? mood : NaN} />
                <h3 className="ion-text-center ion-padding-bottom">
                    { entries.length ? moodCaption(mood) : 'Нет записей' }
                </h3>
            </div>
            <IonList className="ion-margin-vertical" style={{height: 'calc(100% - 170px - 15svh)', overflowY: 'scroll', background: 'transparent'}}>
                {entries.map((entry) => <DaySummaryCardEntry entry={entry} key={entry.date.getTime()} />)}
            </IonList>
        </IonCard>
    );
});