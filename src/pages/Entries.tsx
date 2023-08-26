import { useContext, useEffect, useRef, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Entries.css';
import AddEntryModal from './AddEntryModal';
import StorageContext from '../components/StorageContext';
import MoodIcon from '../components/MoodIcon';
import Entry from '../models/Entry';

export default () => {
  const [pageRef, setPageRef] = useState<HTMLElement | null>();
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const storage = useContext(StorageContext);
  const page = useRef(null);

  useEffect(() => {
    setPageRef(page.current);
    storage?.get('entries').then((entries) => setEntries(entries || []));
  }, []);

  const clear = async () => {
    storage?.set('entries', []);
    setEntries([]);
  }

  const save = async (entry: Entry) => {
    await storage?.set('entries', [...entries, entry]);
    setEntries([...entries, entry]);
    setShowModal(false);
  }

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Настроение</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Настроение</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          {
            entries.map(({mood}) => <MoodIcon mood={mood} width="64px" height="64px" />)
          }
        </div>
        <IonButton className="ion-padding-start" onClick={() => setShowModal(true)}>
          Добавить запись
        </IonButton>
        <IonButton className="ion-padding-start" color="danger" onClick={clear}>
          Очистить всё
        </IonButton>
        <AddEntryModal isOpen={showModal} close={() => setShowModal(false)} save={save} pageRef={pageRef!} />
      </IonContent>
    </IonPage>
  );
};
