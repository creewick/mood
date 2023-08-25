import { IonModal, IonNav } from "@ionic/react";
import { useRef } from "react";
import ChooseMoodPage from "./ChooseMoodPage";

interface Props {
    pageRef: HTMLElement | null; 
    isOpen: boolean;
    close: () => void;
}

export default ({pageRef, isOpen, close}: Props) => {
    const modal = useRef<HTMLIonModalElement>(null);

    return (
        <IonModal ref={modal} isOpen={isOpen} presentingElement={pageRef!} canDismiss={true} onDidDismiss={close}>
            <IonNav root={() => <ChooseMoodPage close={close} />} /> 
        </IonModal>
    );
};
