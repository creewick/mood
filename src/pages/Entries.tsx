import { useContext, useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import StorageContext from '../models/StorageContext';
import EntryService from '../services/EntryService';
import DaySummaryCardProps from '../components/DayCard/DayCardProps';
import DayCard from '../components/DayCard/DayCard';
import DayCardPlaceholder from '../components/DayCard/DayCardPlaceholder';

interface Props {
  showModal: boolean;
}

export default (props: Props) => {
  const [cards, setCards] = useState<DaySummaryCardProps[]>([]);
  const [minDay, setMinDay] = useState<number>(0);
  const entryService = new EntryService(useContext(StorageContext));
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLIonCardElement>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const newCards: DaySummaryCardProps[] = [];

    for (const days of [-6, -5, -4, -3, -2, -1, 0]) {
      const date = addDays(new Date(), days + minDay);
      const entries = await entryService.getEntriesByDay(date);
      newCards.push({ date, entries });
    }
  
    setCards([...newCards, ...cards]);
    setMinDay(minDay - 7);

    cardRef.current?.scrollIntoView({ behavior: 'instant', inline: 'start' });
  };

  useEffect(() => {
    const handleScroll = async () => {
      if (scrollRef.current && scrollRef.current.scrollLeft === 0) {
        await loadCards();
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollRef, cards, minDay]);

  const addDays = (date: Date = new Date(), days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Записи</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div ref={scrollRef} style={{display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory', height: '100%'}}>
          <DayCardPlaceholder />
          <DayCard date={addDays(cards[0]?.date, -1)} entries={[]} />
          { cards.map(props => <DayCard {...props} ref={props === cards[6] ? cardRef : undefined} />) }
          <DayCardPlaceholder />
        </div>
      </IonContent>
    </IonPage>
  );
};
