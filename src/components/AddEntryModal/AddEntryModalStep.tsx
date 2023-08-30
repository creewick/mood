import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonContent, IonFooter, IonNavLink } from "@ionic/react"

interface Props {
    children: React.ReactNode;
    footer?: React.ReactNode;
    nextComponent?: React.ReactNode;
    title: string;
    colors: any;
    prevButton?: string;
    close: () => void;
    onNextClick?: () => void;
}

export default ({children, footer, title, colors, prevButton, nextComponent, onNextClick, close}: Props) => {
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
    
    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar style={headerStyle}>
                    { prevButton && 
                        <IonButtons slot="start">
                            <IonBackButton text={prevButton} />
                        </IonButtons>
                    }
                    <IonTitle>
                        {title}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={close}>Отменить</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={contentStyle} className="ion-padding-horizontal">
                {children}
            </IonContent>
            <IonFooter>
                <div style={footerStyle} className="ion-padding-horizontal">
                    {footer}
                </div>
                <IonNavLink routerDirection="forward" component={() => nextComponent}>
                    <div className="ion-padding" style={footerStyle}>
                        <IonButton style={buttonStyle} onClick={onNextClick} className="ion-margin-horizontal ion-margin-bottom" expand="block" shape="round">
                            {nextComponent ? 'Далее' : 'Готово'}
                        </IonButton>
                    </div>
                </IonNavLink>
            </IonFooter>
        </>);
}