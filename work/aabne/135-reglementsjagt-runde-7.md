# Opgave 135 — reglementsjagt runde 7 (resterende huller)

**Trin:** Valgfri. Kør først, når Christoffer ønsker flere filer, eller efter 131-dækningsrapporten viser, hvilke huller der betyder mest.

## Baggrund
Registret har 53 PDF'er (19.388.799 bytes). Huller efter runde 6: national ungdom 2010/11–2014/15 (2015/16 kun via København), 2017/18, 2021/22; DGI-landsdele; de fleste regionale senior-/veteranreglementer; DH-reglement fra 3. marts 2025. Tidligere søgning var for dårlig: Christoffer fandt en fil med "badminton ungdomsholdturnering regler 2016".

## Mål
1. Brug **131-dækningsrapporten** til at rangere hullerne (flest rækker påvirket først).
2. Søg systematisk pr. hul med kendte metoder:
   - Domænebegrænset søgning på `badmintonpeople.dk` og `badmintonplayer.dk`, hvor søgeord er historiske titler ("ungdomsholdturnering", "turneringsreglement", "invitation", "USU", "DGI landsdel", "puslinge/Børn/Mini" osv.) plus sæson i flere skrivemåder (2013-14, 2013/14, 13/14).
   - Gennemgang af CMS-sider (`?cmsid=824/877&pageid=…`) for filer.
   - `GetWWWFile.aspx?fileID=…` kun til filer, der allerede er fundet via en side. Ingen blind gennemløb af fileID.
   - Respektér robots.txt og sæt rimelig pause mellem kald.
3. Hver fil: download, SHA-256, tilføj til `register.json` (URL, hentedato, hash, sæson i kilden, målgruppe, område). Dubletter registreres som dubletter.
4. Opdatér `mangler.md` og skriv `statistik/results/135-soeglog.json` (alle søgestrenge og resultater, også tomme).
5. Kør 131-opslagsscriptet igen og vis, hvilke felter der gik fra betinget/ingen til bekræftet. Ændrer du regelbogen, så gør det ved at genkøre 131-scriptet, ikke ved hånden.

## Afgrænsning
- Ingen sub-agenter (sessionsgrænsen blokerede tidligere); kør sekventielt.
- Rør ikke databaser. Ingen login-beskyttede sider, ingen omgåelse af blokeringer; blokeret side meldes som blokeret.
- Gæt ikke sæson. Står den ikke i filen, så "sæson ikke fastlagt".

## Kontrol
- **Målet:** hver ny fil har register-post og hash; søgelog dækker alle forsøg.
- **Værnet:** databasehashes uændrede (`gsb-statistik-normalized.db` 49BC62AC3AA8B5A003A4B4D1A8112A8F986D12C8667B22342027D42A1D01B41E, `liga-landskab.db` 9976723EAA61E248ADC7EE33348CAD41EEBF9F30DDFDF913B6D40EF9D0D4B74C), `git diff --check` uden fejl.
- **Skøn:** nye filer tjekket manuelt mod sæsonangivelsen i PDF'en.

## Ved tvivl
Skriv i "Spørgsmål".

## Gren
`arbejde/135-reglementsjagt-runde-7`, fra `main`. Christoffer opretter branchen og committer selv. Codex kører kun læsende git, ustaged, ingen `git add -A`, ingen push, rører ikke `apps/netlify-prod/` eller `docs/BESLUTNINGER.md`.

## Spørgsmål
(Tomt.)

## Tilbagefald
Slet nye PDF'er og gendan `register.json` og `mangler.md` fra `main`.

## Resultat
(Udfyldes af Codex.)
