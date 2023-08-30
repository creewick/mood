import { useContext, useEffect, useRef, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AddEntryModal from '../components/AddEntryModal/AddEntryModal';
import StorageContext from '../models/StorageContext';
import Entry from '../models/storage/Entry';
import EntryService from '../services/EntryService';
import DaySummaryCardProps from '../components/DayCard/DayCardProps';
import DayCard from '../components/DayCard/DayCard';
import DayCardPlaceholder from '../components/DayCard/DayCardPlaceholder';

export default () => {
  const [pageRef, setPageRef] = useState<HTMLElement | null>();
  const [showModal, setShowModal] = useState(false);
  const [days, setDays] = useState<DaySummaryCardProps[]>([]);
  const entryService = new EntryService(useContext(StorageContext));

  const page = useRef(null);
  const today = useRef<HTMLIonCardElement>(null);

  useEffect(() => {
    setPageRef(page.current);
    loadCards();
  }, []);

  const loadCards = async () => {
    const cards = [-6, -5, -4, -3, -2, -1, 0].map(async d => {
      const date = new Date();
      date.setDate(date.getDate() + d);
      const entries = await entryService.getEntriesByDay(date);
      return { date, entries };
    });

    const days = await Promise.all(cards);

    setTimeout(() => setDays(days), 0);
  };

  const save = async (entry: Entry) => {
    await entryService.create(entry);
    await loadCards();
    setShowModal(false);
  }

  const clear = async () => {
    await entryService.clear();
    location.reload();
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
        <div style={{display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory'}}>
          <DayCardPlaceholder />
          { days.map(props => <DayCard {...props} />) }
          <DayCardPlaceholder />
        </div>
        <div className="ion-padding-top">
          <IonButton className="ion-padding-start" onClick={() => setShowModal(true)}>
            Внести запись
          </IonButton>
          <IonButton className="ion-padding-start" color="danger" onClick={clear}>
            Очистить всё
          </IonButton>
        </div>
        <AddEntryModal isOpen={showModal} close={() => setShowModal(false)} save={save} presentingElement={pageRef!} />
      </IonContent>
    </IonPage>
  );
};
