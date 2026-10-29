# Legătura cu platforma de matematică

Scanerul e o aplicație separată, fără server și fără conturi. Platforma (proiectul cu conturi de elevi și profesori) comunică cu el prin două lucruri simple: **un link cu parametri** și **un fișier JSON cu rezultate**.

## 1. Platforma deschide scanerul cu datele deja completate

```
https://danantofie.github.io/scaner-pdf/?lucrare=Test%20ecuatii%209A&elev=9A-07
```

| Parametru | Ce face |
|---|---|
| `lucrare` | Numele lucrării. Devine și numele PDF-ului și cheia sub care se ține minte baremul. |
| `elev` | Codul elevului, completat automat la corectare. Niciodată numele. |

## 2. Scanerul exportă rezultatele validate ca JSON

Butonul **Export JSON (pentru platformă)** din ecranul de corectare dă fișierul `rezultate.json`:

```json
{
  "format": "scaner-pdf/rezultate@1",
  "exportat": "2026-10-29T10:12:00.000Z",
  "rezultate": [
    {
      "id": "m2x1k9abc",
      "data": "2026-10-29T10:05:12.000Z",
      "lucrare": "Test ecuatii 9A",
      "cod_elev": "9A-07",
      "total": 8.5,
      "maxim": 10,
      "lizibilitate": "buna",
      "validat": true,
      "sursa": "scaner-pdf",
      "pagini": 2,
      "probleme": [
        { "nr": "1", "puncte": 5, "maxim": 5, "propus_ai": 5, "observatii": "Rezolvare completă.", "incertitudine": false },
        { "nr": "2", "puncte": 3.5, "maxim": 5, "propus_ai": 3, "observatii": "Greșeală de semn la pasul 2.", "incertitudine": true }
      ]
    }
  ]
}
```

- `puncte` e punctajul **validat de profesor**; `propus_ai` e ce a propus modelul. Diferența dintre ele e utilă platformei ca să măsoare cât de bine corectează AI-ul.
- `cod_elev` e singurul identificator. Legătura cod → nume stă în platformă (sau în catalogul profesorului), nu în scaner.
- Același conținut există și ca **CSV** (`;` ca separator, cu BOM, pentru Google Sheets și Excel).

## 3. Ce poate adăuga platforma mai târziu

1. **Import direct**: un ecran „Importă rezultate” care primește `rezultate.json` și pune notele în catalogul lucrării, pe coduri.
2. **Trimitere automată**: când platforma va avea API (Supabase), scanerul poate primi un parametru `trimite=<adresa>` și face POST cu același JSON, cu un token de profesor. Formatul nu se schimbă.
3. **Baremul din platformă**: parametrul `barem=<id>` ar permite scanerului să ia baremul direct, în loc să fie scris de mână.

## Reguli care nu se negociază

- Pozele lucrărilor nu intră în platformă prin scaner. Scanerul trimite doar numere și observații.
- Cheile API (Anthropic, Mathpix) sunt ale profesorului și stau doar în browserul lui.
- Formatul `scaner-pdf/rezultate@1` nu se schimbă în loc; o versiune nouă primește `@2`, iar platforma le acceptă pe amândouă.
