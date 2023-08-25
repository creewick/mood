import { IonButton, IonButtons, IonCardHeader, IonCardTitle, IonContent, IonFooter, IonGrid, IonHeader, IonModal, IonRange, IonText, IonTitle, IonToolbar } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import { useRef, useState } from "react";
import MoodInput from "../components/MoodInput";
import getColors from "../functions/moodColors";
import tinycolor from "tinycolor2";

interface Props {
    pageRef: HTMLElement | null; 
    isOpen: boolean;
    close: () => void;
}

export default ({pageRef, isOpen, close}: Props) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const [mood, setMood] = useState(0);
    const colors = getColors(mood);
    const modalStyle = {
        '--background': colors.background
    }
    const modalContentStyle = {
        '--background': `radial-gradient(${tinycolor(colors.background).lighten(20)} 0%, ${colors.background} 70%)`,
    }
    const buttonStyle = {
        '--background': colors.primary,
        '--background-hover': tinycolor(colors.primary).lighten(10).toHexString(),
        '--background-activated': tinycolor(colors.primary).lighten(20).toHexString(),
        '--background-focused': tinycolor(colors.primary).lighten(10).toHexString(),
        '--border-radius': '50px'
    }

    return (
        <IonModal style={modalStyle} ref={modal} isOpen={isOpen} presentingElement={pageRef!} canDismiss={true} onDidDismiss={close}>
            <IonHeader>
                <IonToolbar style={modalStyle}>
                    <IonTitle>Настроение</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close}>Отменить</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={modalContentStyle} className="ion-padding ion-text-center">
                <IonCardTitle className="ion-margin-vertical">
                    Как Вы чувствуете себя сейчас?
                </IonCardTitle>
                <MoodIcon mood={mood} size="calc(100vh - 500px)" animate={true} />
            </IonContent>
            <IonFooter className="ion-margin-vertical">
                <MoodInput className="ion-padding-bottom" mood={mood} setMood={setMood} />
                <IonButton style={buttonStyle} className="ion-padding" expand="block">
                    Далее
                </IonButton>
            </IonFooter>
        </IonModal>
    );
};
