import { useContext, useEffect, useRef, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import StorageContext from '../models/StorageContext';
import EntryService from '../services/EntryService';
import DaySummaryCardProps from '../components/DayCard/DayCardProps';
import DayCard from '../components/DayCard/DayCard';
import DayCardPlaceholder from '../components/DayCard/DayCardPlaceholder';
import { Translation } from 'i18nano';

export default () => {
  const [cards, setCards] = useState<DaySummaryCardProps[]>([]);
  const entryService = new EntryService(useContext(StorageContext));
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLIonCardElement>(null);
  const todayCardRef = useRef<HTMLIonCardElement>(null);

  const update = async (date: Date) => {
    const index = cards.findIndex(card => card.date.toDateString() === date.toDateString());
    if (index === -1) return;

    const entries = await entryService.getEntriesByDay(date);
    const newCards = [...cards];
    newCards[index] = { date, entries };
    setCards(newCards);
  }

  const addDays = (date: Date = new Date(), days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  useEffect(() => {
    const handleScroll = async () => {
      if (scrollRef.current && scrollRef.current.scrollLeft === 0) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
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
  }, [scrollRef, cards]);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    entryService.subscribe(update);
    return () => entryService.unsubscribe(update);
  }, [cards]);

  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: 'instant', inline: 'start' });
  }, [cards.length]);

  const loadCards = async () => {
    const newCards: DaySummaryCardProps[] = [];

    for (const days of [-6, -5, -4, -3, -2, -1, 0]) {
      const date = addDays(new Date(), days - cards.length);
      const entries = await entryService.getEntriesByDay(date);
      newCards.push({ date, entries });
    }
  
    setCards([...newCards, ...cards]);
  };

  const ref = (i: number) => {
    if (i === Math.min(cards.length - 1, 7))
      return cardRef;
    if (i === cards.length - 1)
      return todayCardRef;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
              <IonButton onClick={() => (todayCardRef.current || cardRef.current)?.scrollIntoView({ behavior: 'smooth', inline: 'start' })}>
                <Translation path="entries.today" />
              </IonButton>
          </IonButtons>
          <IonTitle>
            <Translation path="tabs.entries"/>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div ref={scrollRef} style={{display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory', height: '100%'}}>
          <DayCardPlaceholder />
          { cards.map((props, i) => <DayCard {...props} key={i} ref={ref(i)} />) }
          <DayCardPlaceholder />
        </div>
      </IonContent>
    </IonPage>
  );
};
