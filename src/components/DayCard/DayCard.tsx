import { IonCard, IonCardTitle, IonList } from "@ionic/react";
import { useEffect, useRef } from "react";
import DaySummaryCardProps from "./DayCardProps";
import "./DayCard.css";
import DaySummaryCardEntry from "./DayCardEntry";
import getColors from "../../functions/moodColors";

export default ({date, entries}: DaySummaryCardProps) => {
    const ref = useRef<HTMLIonCardElement>(null);
    const isToday = date.toDateString() === new Date().toDateString();
    const title = date.toLocaleDateString();
    const averageMood = entries.map(x => x.mood).reduce((a, b) => a + b, 0) ?? 0 / entries.length ?? 1
    const colors = getColors(averageMood);

    const style = {
        '--background': colors.background,
        // '--background': `linear-gradient(0deg, ${colors.backgroundSecondary} 0%, ${colors.background} 70%)`,
    }

    const listStyle = {
        'background': 'transparent',
    }

    useEffect(() => {
      isToday && ref.current?.scrollIntoView({behavior: 'instant'});
    }, [isToday]);

    return (
        <IonCard ref={ref} className="day-card" style={style}>
            <IonCardTitle className="ion-text-center ion-margin-vertical">
                {title}
            </IonCardTitle>
            <IonList style={listStyle}>
                {entries.map(entry => <DaySummaryCardEntry entry={entry} colors={colors} />)}
            </IonList>
        </IonCard>
    );
}