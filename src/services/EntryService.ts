import { Storage as IonicStorage } from "@ionic/storage";
import EntriesByYear from "../models/storage/EntriesByYear";
import EntriesByMonth from "../models/storage/EntriesByMonth";
import EntriesByDay from "../models/storage/EntriesByDay";
import Entry from "../models/storage/Entry";


export default class EntryService {
    private storage: IonicStorage;

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
    }

    public async remove(entry: Entry): Promise<void> {
        const year = entry.date.getFullYear();
        const month = entry.date.getMonth() + 1;
        const day = entry.date.getDate();

        const entries = await this.getEntries();

        entries[year][month][day] = entries[year][month][day]
            .filter((e: Entry) => JSON.stringify(e) !== JSON.stringify(entry));

        await this.storage.set('entries', entries);
    }

    public async clear(): Promise<void> {
        await this.storage.clear();
    }
}