import EntriesByMonth from "./EntriesByMonth";

export default interface EntriesByYear {
    [year: number]: EntriesByMonth;
}