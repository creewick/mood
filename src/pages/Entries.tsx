import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Entries.css';
import AddEntryModal from './AddEntryModal';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const [showModal, setShowModal] = useState(false);
  const [pageRef, setPageRef] = useState<HTMLElement | null>();
  const modal = useRef<HTMLIonModalElement>(null);
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
        <IonModal ref={modal} isOpen={showModal} presentingElement={pageRef!} canDismiss={true} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
                <IonTitle>Настроение</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => setShowModal(false)}>Отменить</IonButton>
                </IonButtons>
            </IonToolbar>
          </IonHeader>
          <AddEntryModal />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
