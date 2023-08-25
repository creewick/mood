import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Entries.css';
import AddEntryModal from './AddEntryModal';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const [showModal, setShowModal] = useState(false);
  const [pageRef, setPageRef] = useState<HTMLElement | null>();
  const page = useRef(null);

  useEffect(() => {
    setPageRef(page.current);
  }, []);

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
        <IonButton className="ion-padding" onClick={() => setShowModal(true)}>
          Добавить запись
        </IonButton>
        <AddEntryModal isOpen={showModal} close={() => setShowModal(false)} pageRef={pageRef!} />
      </IonContent>
    </IonPage>
  );
};
