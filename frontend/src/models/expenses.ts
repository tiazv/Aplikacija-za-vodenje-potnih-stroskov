import { IUser } from "./user";

export interface IExpense{
    id: string;
    datum_odhoda: string;
    datum_prihoda: string;
    kilometrina: number;
    lokacija: string;
    opis: string;
    oseba: string;
}