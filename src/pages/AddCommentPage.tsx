import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCardTitle, IonFooter, IonBackButton, IonNavLink, IonText, IonChip, IonTextarea, IonInput } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import tinycolor from "tinycolor2";
import { useContext, useState } from "react";
import moodCaption from "../functions/moodCaptions";
import Title from "../components/Title";
import StorageContext from "../models/StorageContext";
import Entry from "../models/Entry";

interface Props {
    mood: number;
    feelings: string[];
    factors: string[];
    colors: any;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
}

export default ({mood, feelings, factors, colors, close, save}: Props) => {
    const [comment, setComment] = useState<string>('');
    const storage = useContext(StorageContext);
    
    const modalContentStyle = {
        '--background': `radial-gradient(${
            tinycolor(colors.background).lighten(20)} 0%, ${
            colors.background} 70%)`,
    }
    const buttonStyle = {
        '--background': colors.primary,
        '--background-hover': tinycolor(colors.primary).lighten(10).toHexString(),
        '--background-activated': tinycolor(colors.primary).lighten(20).toHexString(),
        '--background-focused': tinycolor(colors.primary).lighten(10).toHexString(),
        '--border-radius': '50px',
    }  
    const modalStyle = {
        '--background': colors.background,
        'background': colors.background
    }

    const headerStyle = {
        '--background': colors.background
    }
    
    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar style={headerStyle}>
                    <IonButtons slot="start">
                        <IonBackButton text="Влияние" />
                    </IonButtons>
                    <IonTitle>Комментарий</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close}>Отменить</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={modalContentStyle} className="ion-padding ion-text-center">
                <MoodIcon mood={mood} width="100px" height="100px" animate={false} />
                <Title>
                    {moodCaption(mood)}
                </Title>
                <IonText className="ion-padding-vertical">
                    Опишите Ваше самочувствие
                </IonText>
                <IonInput value={comment} onIonChange={({ detail }) => setComment(detail.value as string)} className="ion-text-left ion-padding" placeholder="Дополнительный контекст" />
            </IonContent>
            <IonFooter style={modalStyle} className="ion-padding">
                <IonNavLink routerDirection="root" onClick={() => save({mood, feelings, factors, comment, date: new Date()})}>
                    <IonButton style={buttonStyle} className="ion-padding-horizontal ion-padding-bottom" expand="block">
                        Готово
                    </IonButton>
                </IonNavLink>
            </IonFooter>
        </>
    );
}