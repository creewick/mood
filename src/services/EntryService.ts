import { Storage as IonicStorage } from "@ionic/storage";
import EntriesByYear from "../models/entry/EntriesByYear";
import EntriesByMonth from "../models/entry/EntriesByMonth";
import EntriesByDay from "../models/entry/EntriesByDay";
import Entry from "../models/entry/Entry";


export default class EntryService {
    private storage: IonicStorage;
    private static onChanged: ((date: Date) => void)[] = [];

    public constructor(storage: IonicStorage | null) {
        this.storage = storage!;
    }

    public async getEntries(): Promise<EntriesByYear> {
        return await this.storage.get('entries') || {};
    }

    public async getEntriesByYear(date: Date): Promise<EntriesByMonth> {
        return (await this.getEntries())[date.getFullYear()] || {};
    }

    public async getEntriesByMonth(date: Date): Promise<EntriesByDay> {
        return (await this.getEntriesByYear(date))[date.getMonth() + 1] || {};
    }

    public async getEntriesByDay(date: Date): Promise<Entry[]> {
        return (await this.getEntriesByMonth(date))[date.getDate()] || [];
    }

    public async create(entry: Entry): Promise<void> {
        const year = entry.date.getFullYear();
        const month = entry.date.getMonth() + 1;
        const day = entry.date.getDate();

        const entries = await this.getEntries();

        entries[year] = entries[year] || {};
        entries[year][month] = entries[year][month] || {};
        entries[year][month][day] = entries[year][month][day] || [];
        entries[year][month][day].push(entry);

        await this.storage.set('entries', entries);

        EntryService.onChanged.forEach((callback) => callback(entry.date));
    }

    public async remove(entry: Entry): Promise<void> {
        const year = entry.date.getFullYear();
        const month = entry.date.getMonth() + 1;
        const day = entry.date.getDate();

        const entries = await this.getEntries();

        entries[year][month][day] = entries[year][month][day]
            .filter((e: Entry) => JSON.stringify(e) !== JSON.stringify(entry));

        await this.storage.set('entries', entries);

        EntryService.onChanged.forEach((callback) => callback(entry.date));
    }

    public subscribe(callback: (date: Date) => void): void {
        EntryService.onChanged.push(callback);
    }

    public unsubscribe(callback: (date: Date) => void): void {
        EntryService.onChanged = EntryService.onChanged.filter((c) => c !== callback);
    }
}