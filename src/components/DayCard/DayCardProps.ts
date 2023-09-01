import Entry from "../../models/entry/Entry";

export default interface DaySummaryCardProps {
    date: Date;
    entries: Entry[];
}
