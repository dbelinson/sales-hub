export type CustomerStatus = "aktiv" | "in Wartung" | "Beschwerde";

export interface Customer {
  id: string;
  name: string;
  firma: string;
  branche: string;
  anlagengroesseKwp: number;
  status: CustomerStatus;
  letzterKontakt: string;
  telefon: string;
  email: string;
}

export type CustomerInput = Omit<Customer, "id">;

export const customerStatuses: CustomerStatus[] = ["aktiv", "in Wartung", "Beschwerde"];

export const branchen = ["Landwirtschaft", "Hotellerie", "Logistik", "Gesundheit", "Handel", "Industrie"];

export const seedCustomers: Customer[] = [
  {
    id: "1",
    name: "Thomas Brandt",
    firma: "Milchhof Brandt GmbH",
    branche: "Landwirtschaft",
    anlagengroesseKwp: 84.5,
    status: "aktiv",
    letzterKontakt: "2026-10-28",
    telefon: "+49 821 447192",
    email: "t.brandt@milchhof-brandt.de",
  },
  {
    id: "2",
    name: "Sabine Kessler",
    firma: "Hotel Lindenhof",
    branche: "Hotellerie",
    anlagengroesseKwp: 42.0,
    status: "in Wartung",
    letzterKontakt: "2026-10-21",
    telefon: "+49 8271 33045",
    email: "s.kessler@hotel-lindenhof.de",
  },
  {
    id: "3",
    name: "Michael Fischer",
    firma: "Spedition Fischer & Söhne",
    branche: "Logistik",
    anlagengroesseKwp: 210.0,
    status: "aktiv",
    letzterKontakt: "2026-11-01",
    telefon: "+49 8203 55218",
    email: "m.fischer@spedition-fischer.de",
  },
  {
    id: "4",
    name: "Julia Wagner",
    firma: "Praxis Wagner Zahnmedizin",
    branche: "Gesundheit",
    anlagengroesseKwp: 18.5,
    status: "Beschwerde",
    letzterKontakt: "2026-10-15",
    telefon: "+49 8231 90334",
    email: "info@praxis-wagner-augsburg.de",
  },
  {
    id: "5",
    name: "Karl Huber",
    firma: "Huber Agrartechnik",
    branche: "Landwirtschaft",
    anlagengroesseKwp: 135.0,
    status: "aktiv",
    letzterKontakt: "2026-10-30",
    telefon: "+49 8245 77109",
    email: "k.huber@huber-agrar.de",
  },
  {
    id: "6",
    name: "Petra Schmid",
    firma: "Bäckerei Schmid",
    branche: "Handel",
    anlagengroesseKwp: 12.0,
    status: "in Wartung",
    letzterKontakt: "2026-10-19",
    telefon: "+49 8291 28817",
    email: "p.schmid@baeckerei-schmid.de",
  },
  {
    id: "7",
    name: "Lukas Vogel",
    firma: "Vogel Kühllogistik GmbH",
    branche: "Logistik",
    anlagengroesseKwp: 320.0,
    status: "aktiv",
    letzterKontakt: "2026-11-02",
    telefon: "+49 8234 66402",
    email: "l.vogel@vogel-kuehllogistik.de",
  },
  {
    id: "8",
    name: "Anna Berger",
    firma: "Gasthof Zur Linde",
    branche: "Hotellerie",
    anlagengroesseKwp: 26.5,
    status: "aktiv",
    letzterKontakt: "2026-10-26",
    telefon: "+49 8282 45513",
    email: "a.berger@gasthof-linde.de",
  },
  {
    id: "9",
    name: "Peter Lorenz",
    firma: "Lorenz Maschinenbau",
    branche: "Industrie",
    anlagengroesseKwp: 98.0,
    status: "Beschwerde",
    letzterKontakt: "2026-10-12",
    telefon: "+49 8217 11988",
    email: "p.lorenz@lorenz-maschinenbau.de",
  },
  {
    id: "10",
    name: "Miriam Stein",
    firma: "Stein Modehaus",
    branche: "Handel",
    anlagengroesseKwp: 22.0,
    status: "in Wartung",
    letzterKontakt: "2026-10-24",
    telefon: "+49 8276 60371",
    email: "m.stein@stein-modehaus.de",
  },
  {
    id: "11",
    name: "Daniel Ostner",
    firma: "Ostner Gärtnerei",
    branche: "Landwirtschaft",
    anlagengroesseKwp: 65.0,
    status: "aktiv",
    letzterKontakt: "2026-10-29",
    telefon: "+49 8244 38259",
    email: "d.ostner@ostner-gaertnerei.de",
  },
  {
    id: "12",
    name: "Christine Maier",
    firma: "Klinikum Stadtbergen",
    branche: "Gesundheit",
    anlagengroesseKwp: 150.0,
    status: "aktiv",
    letzterKontakt: "2026-10-31",
    telefon: "+49 8272 99402",
    email: "c.maier@klinikum-stadtbergen.de",
  },
];
