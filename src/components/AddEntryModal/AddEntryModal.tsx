import { IonModal, IonNav } from "@ionic/react";
import { useRef } from "react";
import Entry from "../../models/storage/Entry";
import AddMoodPage from "../../pages/AddMoodPage";

interface Props {
    presentingElement: HTMLElement; 
    isOpen: boolean;
    close: () => void;
    save: (entry: Entry) => Promise<void>;
}

export default ({presentingElement, isOpen, close, save}: Props) => {
    const ref = useRef<HTMLIonModalElement>(null);
    const onDidDismiss = close;
    const canDismiss = true;
    const entry: Entry = {
        mood: 0,
        feelings: [],
        factors: [],
        comment: '',
        date: new Date(),
    };

    return (
        <IonModal {...{ref, isOpen, presentingElement, onDidDismiss, canDismiss}}>
            <IonNav root={() => <AddMoodPage {...{entry, close, save}} />} />
        </IonModal>
    );
};
