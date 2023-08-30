import Entry from "../../models/storage/Entry";

export default interface DaySummaryCardProps {
    date: Date;
    entries: Entry[];
}
