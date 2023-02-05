import {MediaRistorante} from "./media-ristorante";
import {ServiziMetodiPagamentoTipologiaCucina} from "./servizi-metodi-pagamento-tipologia-cucina";
import {Recensione} from "./recensione";

export interface Ristorante {
  id: number;
  ragioneSociale: string;
  indirizzo: string;
  localita: string;
  prezzoMedioDichiarato: number;
  emailAziendale: string;
  telefonoAziendale: string;
  statoRistorante: boolean;
  capienzaMassima: number;
  descrizione: string;
  descrizioneBreve: string;
  immagini: Array<MediaRistorante>;
  servizi: Array<ServiziMetodiPagamentoTipologiaCucina>;
  metodiPagamento: Array<ServiziMetodiPagamentoTipologiaCucina>;
  tipologiaCucina: Array<ServiziMetodiPagamentoTipologiaCucina>;
  recensioni: Array<Recensione>;
}
