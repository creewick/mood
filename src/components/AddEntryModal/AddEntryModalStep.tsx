import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonContent, IonFooter, IonNavLink } from "@ionic/react"

interface Props {
    children: React.ReactNode;
    footer?: React.ReactNode;
    nextComponent?: React.ReactNode;

    title: string;
    prevTitle?: string;
    colors: any;

    close: () => void;
    save?: () => Promise<void>;

    canSave?: boolean;
    canSkip?: boolean;
}

export default ({children, footer, nextComponent, title, prevTitle, colors, save, close, canSave=false, canSkip=false}: Props) => {
    const headerStyle = {
        '--background': colors.background
    };

    const contentStyle = {
        '--background': `radial-gradient(${colors.backgroundSecondary} 0%, ${colors.background} 70%)`,
    }
    
    const footerStyle = {
        'background': colors.background,
        'margin': '0px'
    }

    const buttonStyle = {
        '--background': colors.wave,
        '--background-hover': colors.wave,
        '--background-activated': colors.primary,
        '--background-focused': colors.primary,
    }  

    const linkStyle = {
        '--color': colors.wave,
    }

    const onClick = async () => {
        if (save && canSave) await save();
    }
    
    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar style={headerStyle}>
                    { prevTitle && 
                        <IonButtons slot="start">
                            <IonBackButton text={prevTitle} style={linkStyle} />
                        </IonButtons>
                    }
                    <IonTitle>
                        {title}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close} style={linkStyle}>Отменить</IonButton>
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
                                Пропустить и сохранить
                            </IonButton>
                        </div>
                    }
                </div>
                <IonNavLink routerDirection="forward" component={() => nextComponent}>
                    <div className="ion-padding" style={footerStyle}>
                        <IonButton style={buttonStyle} onClick={onClick} className="ion-margin-horizontal ion-margin-bottom" expand="block" shape="round">
                            {nextComponent ? 'Далее' : 'Готово'}
                        </IonButton>
                    </div>
                </IonNavLink>
            </IonFooter>
        </>);
}