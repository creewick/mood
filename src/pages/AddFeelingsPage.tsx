import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonFooter, IonBackButton, IonNavLink, IonText, IonChip } from "@ionic/react";
import MoodIcon from "../components/MoodIcon";
import tinycolor from "tinycolor2";
import { useState } from "react";
import moodCaption from "../functions/moodCaptions";
import { getFeelings } from "../functions/feelings";
import Title from "../components/Title";
import AddFactorsPage from "./AddFactorsPage";
import Entry from "../models/Entry";

interface Props {
    mood: number;
    colors: any;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
}

export default ({mood, colors, close, save}: Props) => {
    const [feelings, setFeelings] = useState<string[]>([]);
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

    const onClick = (feeling: string) => {
        if (feelings.includes(feeling)) {
            setFeelings(feelings.filter((f) => f !== feeling));
        } else {
            setFeelings([...feelings, feeling]);
        }
    }
    
    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar style={headerStyle}>
                    <IonButtons slot="start">
                        <IonBackButton text="Настроение" />
                    </IonButtons>
                    <IonTitle>Чувства</IonTitle>
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
                    Какими словами можно описать Ваши чувства?
                </IonText>
                <div className="ion-padding-vertical">
                { getFeelings(mood).sort((a, b) => b.length - a.length).map((feeling) => 
                    <IonChip key={feeling} outline={!feelings.includes(feeling)} onClick={() => onClick(feeling)}>
                        {feeling}
                    </IonChip>) 
                }
                </div>
            </IonContent>
            <IonFooter style={modalStyle} className="ion-padding">
                <IonNavLink routerDirection="forward" component={() => <AddFactorsPage mood={mood} feelings={feelings} colors={colors} close={close} save={save} />}>
                    <IonButton style={buttonStyle} className="ion-padding-horizontal ion-padding-bottom" expand="block">
                        Далее
                    </IonButton>
                </IonNavLink>
            </IonFooter>
        </>
    );
}