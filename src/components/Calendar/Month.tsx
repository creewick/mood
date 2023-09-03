import { IonCardTitle, IonHeader, IonTitle } from "@ionic/react";
import EntriesByDay from "../../models/entry/EntriesByDay";
import Day from "./Day";
import "./Month.css";
import { useTranslationChange } from "i18nano";

interface Props {
    date: Date;
    entries: EntriesByDay;
}

export default ({date, entries}: Props) => {
    const lastDay = date;
    lastDay.setDate(1);
    lastDay.setMonth(lastDay.getMonth() + 1);
    lastDay.setDate(lastDay.getDate() - 1);
    const daysCount = lastDay.getDate();
    const {lang} = useTranslationChange();

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const emptyColumnsToSkip = firstDayOfMonth - 1;

    const days = new Array(daysCount)
        .fill(0)
        .map((_, i) => {
            const day = new Date(date);
            day.setDate(i + 1);

            return <Day date={day} entries={entries[i + 1] ?? []} key={i} />;
        })

    return (
        <div className="ion-padding-horizontal">
            <IonCardTitle className="ion-padding-start ion-padding-bottom">
                {date.toLocaleDateString(lang, {month: 'long'})}
            </IonCardTitle>
            <div className="month-view">
                { new Array(emptyColumnsToSkip).fill(0).map((_, i) => <div key={i} />) }
                {days}
            </div>
        </div>  
    );
}