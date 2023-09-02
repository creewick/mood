import { IonModal, IonNav } from "@ionic/react";
import { useContext, useRef } from "react";
import Entry from "../../models/entry/Entry";
import EntryService from "../../services/EntryService";
import StorageContext from "../../models/StorageContext";
import AddDatePage from "./steps/AddDatePage";

interface Props {
    presentingElement: HTMLElement; 
    isOpen: boolean;
    close: () => void;
}

export default ({presentingElement, isOpen, close}: Props) => {
    const ref = useRef<HTMLIonModalElement>(null);
    const entryService = new EntryService(useContext(StorageContext));
    const save = async (entry: Entry) => {
        await entryService.create(entry);
        close();
    }
    const onDidDismiss = close;
    const canDismiss = true;
    const entry: Entry = {
        mood: 0,
        feelings: [],
        triggers: [],
        comment: '',
        date: new Date(),
    };

    return (
        <IonModal {...{ref, isOpen, presentingElement, onDidDismiss, canDismiss}}>
            <IonNav root={() => <AddDatePage {...{entry, close, save}} />} />
        </IonModal>
    );
};
