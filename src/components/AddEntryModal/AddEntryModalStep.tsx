import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonContent, IonFooter, IonNavLink } from "@ionic/react"
import ColorService from "../../services/ColorService";
import { Translation, TranslationProvider, useTranslation, useTranslationChange } from "i18nano";
import { translations } from "../../../i18n";

interface Props {
    children: React.ReactNode;
    footer?: React.ReactNode;
    nextComponent?: React.ReactNode;
    title: string;
    prevTitle?: string;
    mood: number;
    close: () => void;
    save?: () => Promise<void>;
    canSave?: boolean;
    canSkip?: boolean;
}

export default ({children, footer, nextComponent, title, prevTitle, mood, save, close, canSave=false, canSkip=false}: Props) => {
    const {lang} = useTranslationChange();
    const t = useTranslation();
    const headerStyle = {
        '--background': ColorService.backgroundHex(mood),
    };

    const contentStyle = {
        '--background': `radial-gradient(${
            ColorService.background(mood).lighten(20).toHexString()} 0%, ${
            ColorService.backgroundHex(mood)} 70%)`,
    }
    
    const footerStyle = {
        'background': ColorService.backgroundHex(mood),
        'margin': '0px'
    }

    const buttonStyle = {
        '--background': ColorService.waveHex(mood),
        '--background-hover': ColorService.waveHex(mood),
        '--background-activated': ColorService.primaryHex(mood),
        '--background-focused': ColorService.primaryHex(mood),
    }  

    const linkStyle = {
        '--color': ColorService.waveHex(mood),
    }

    const onClick = async () => {
        if (save && canSave) await save();
    }
    
    return (
        <TranslationProvider language={lang} translations={translations.common}>
            <IonHeader className="ion-no-border">
                <IonToolbar style={headerStyle}>
                    { prevTitle && 
                        <IonButtons slot="start">
                            <IonBackButton style={linkStyle} text={t(prevTitle)} />
                        </IonButtons>
                    }
                    <IonTitle>
                        <Translation path={title} />
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close} style={linkStyle}>
                            <Translation path="modal.cancel" />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={contentStyle} className="ion-padding-horizontal">
                {children}
            </IonContent>
            <IonFooter>
                <div style={footerStyle} className="ion-padding-horizontal">
                    {footer}
                    { canSkip &&
                        <div className="ion-text-center">
                            <IonButton fill="clear" style={linkStyle} onClick={save}>
                                <Translation path="modal.skipAndSave" />
                            </IonButton>
                        </div>
                    }
                </div>
                <IonNavLink routerDirection="forward" component={() => nextComponent}>
                    <div className="ion-padding" style={footerStyle}>
                        <IonButton style={buttonStyle} onClick={onClick} className="ion-margin-horizontal ion-margin-bottom" expand="block" shape="round">
                            <Translation path={nextComponent ? "modal.next" : "modal.done"} />
                        </IonButton>
                    </div>
                </IonNavLink>
            </IonFooter>
        </TranslationProvider>
    );
}