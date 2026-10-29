# Scaner PDF

Aplicația: **https://danantofie.github.io/scaner-pdf/**

Aplicație web pentru telefon și tabletă, făcută pentru profesori: fotografiezi lucrarea cu camera live (aplicația găsește singură foaia și face poza), o îndreaptă, o albește, o face PDF și o corectează după barem cu AI. Profesorul validează punctajul; rezultatele se exportă în CSV (Sheets) sau JSON (platformă).

- Merge pe Android, iPhone și pe tableta Huawei (din browser), fără magazin de aplicații.
- Se poate instala pe ecranul principal și merge și fără internet.
- Pozele rămân pe dispozitiv; nu se trimit nicăieri.

## Fișiere

- `app.html` – aplicația (sursa; se editează doar aici)
- `build.sh` – construiește folderul `docs/` pentru GitHub Pages
- `docs/` – ce se publică (generat, nu se editează de mână)
- `sw.js`, `manifest.webmanifest`, `icon-*` – instalarea pe telefon și modul offline
- `tools/jspdf.umd.min.js` – biblioteca jsPDF 2.5.1 (licență MIT), care creează PDF-ul
- `tools/opencv.js` – OpenCV.js (licență Apache 2.0), care găsește marginile foii; se încarcă doar când e nevoie
- `INTEGRARE.md` – cum comunică scanerul cu platforma de matematică (link cu parametri, formatul JSON al rezultatelor)

## Corectarea cu AI

1. În aplicație, ⚙ **Setări** → cheia API Anthropic (de la console.anthropic.com). Opțional, cheile Mathpix.
2. Fotografiezi lucrarea, apeși **Corectează**, scrii baremul, codul elevului, apoi **Corectează cu AI**.
3. Verifici punctajul propus, îl corectezi unde e cazul și apeși **Validez și salvez**.

Cheile stau doar în browserul profesorului. Pozele pleacă spre Anthropic (și Mathpix, dacă e setat) doar la corectare. Pe poză nu se pune numele elevului, ci un cod.

## Publicarea pe GitHub Pages

1. Pe GitHub, în repository: **Settings → Pages**.
2. La **Source** alegi **Deploy from a branch**, ramura `main`, folderul `/docs`, apoi **Save**.
3. După 1–2 minute aplicația apare la https://danantofie.github.io/scaner-pdf/

Link-ul acesta îl trimiți oricui. Pe telefon, din meniul browserului: **Adaugă pe ecranul de pornire** / **Instalează aplicația**.

## După o modificare

```bash
./build.sh
git add -A && git commit -m "Descrierea modificării" && git push
```
