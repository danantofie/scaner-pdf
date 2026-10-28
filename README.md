# Scaner PDF

Aplicație web pentru telefon și tabletă: fotografiezi foi de hârtie, aplicația găsește colțurile, îndreaptă pagina, albește hârtia și face din toate paginile un PDF.

- Merge pe Android, iPhone și pe tableta Huawei (din browser), fără magazin de aplicații.
- Se poate instala pe ecranul principal și merge și fără internet.
- Pozele rămân pe dispozitiv; nu se trimit nicăieri.

## Fișiere

- `app.html` – aplicația (sursa; se editează doar aici)
- `build.sh` – construiește folderul `docs/` pentru GitHub Pages
- `docs/` – ce se publică (generat, nu se editează de mână)
- `sw.js`, `manifest.webmanifest`, `icon-*` – instalarea pe telefon și modul offline
- `tools/jspdf.umd.min.js` – biblioteca jsPDF 2.5.1 (licență MIT), care creează PDF-ul

## Publicarea pe GitHub Pages

1. Pe GitHub, în repository: **Settings → Pages**.
2. La **Source** alegi **Deploy from a branch**, ramura `main`, folderul `/docs`, apoi **Save**.
3. După 1–2 minute aplicația apare la `https://NUMELE-TAU.github.io/scaner-pdf/`.

Link-ul acesta îl trimiți oricui. Pe telefon, din meniul browserului: **Adaugă pe ecranul de pornire** / **Instalează aplicația**.

## După o modificare

```bash
./build.sh
git add -A && git commit -m "Descrierea modificării" && git push
```
