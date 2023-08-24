import { IonCardHeader, IonCardTitle, IonContent, IonHeader, IonRange, IonText, IonTitle } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import { useState } from "react";
import MoodInput from "../components/MoodInput";


export default () => {
    const [mood, setMood] = useState(0);

    return (
        <IonContent className="ion-padding ion-text-center">
            <IonCardTitle className="ion-margin-vertical">
                Как Вы чувствуете себя сейчас?
            </IonCardTitle>
            <MoodIcon mood={mood} size="280px" animate={true} />
            <MoodInput mood={mood} setMood={setMood} />
        </IonContent>
    );
};
