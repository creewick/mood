import { IonModal, IonNav } from "@ionic/react";
import { useRef } from "react";
import ChooseMoodPage from "./AddMoodPage";
import Entry from "../models/Entry";

interface Props {
    pageRef: HTMLElement | null; 
    isOpen: boolean;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
}

export default ({pageRef, isOpen, close, save}: Props) => {
    const modal = useRef<HTMLIonModalElement>(null);

    return (
        <IonModal ref={modal} isOpen={isOpen} presentingElement={pageRef!} canDismiss={true} onDidDismiss={close}>
            <IonNav root={() => <ChooseMoodPage close={close} save={save} />} /> 
        </IonModal>
    );
};
