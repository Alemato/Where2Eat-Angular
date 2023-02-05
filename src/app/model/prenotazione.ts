import {Ristorante} from "./ristorante";

export interface Prenotazione {
  id: number;
  data: string;
  ora: string;
  statoPrenotazione: number;
  numeroPosti: number;
  ristorante: Ristorante;
}
