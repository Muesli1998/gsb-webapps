# Opgave 087 — runde 4: åbne kilder om klubnavne, samarbejder og fusioner

Dato: 2026-09-23

Denne research er kun et forspring til manuel alias-bekræftelse. Ingen af
fundene er skrevet til en alias-tabel eller brugt i Metode A.

| Fund | Hvad kilden faktisk dokumenterer | Konsekvens for alias-modellen |
|---|---|---|
| Vendsyssel Elite Badminton | Skagen Badmintonklub beskriver VEB som et samarbejde med Frederikshavn og Hjørring. Historik for VEB angiver, at Frederikshavn og Skagen etablerede holdfællesskabet i 2002, og at Hjørring kom til senere. | **Ikke godkendt som global klubalias.** Det er et fælles elitehold, ikke dokumentation for at alle moderklubbernes lavere hold deler identitet med VEB. Det kræver en særskilt model for holdfællesskab eller Chris' præcise afgrænsning. |
| Team Skælskør-Slagelse | Teamets egen historik beskriver et elitesamarbejde mellem Skælskør Badminton Klub og Slagelse Badminton Klub fra 2006; teamet er senere lagt ind under Skælskør Badminton Klub som eliteafdeling. | **Mulig holdfællesskabsregel, ikke automatisk global klubalias.** Navnet kan ikke ubetinget gøre Slagelses øvrige hold til Skælskør-hold. |
| Højbjerg/Via Biler | Højbjerg BK beskriver Via Biler som sponsor og bruger navnet Højbjerg/Via Biler for ligaholdet. | Sponsor-navn; bør normaliseres til Højbjerg som et dokumenteret navn på samme hold, men er ikke en fusion. |
| RSL ODENSE OBK | OBK's ligaside kalder holdet RSL ODENSE OBK, mens klubben identificeres som Odense Badminton Klub. | Sponsor-/eliteholdnavn; mulig dokumenteret alias mellem RSL ODENSE OBK og Odense OBK, men skal bekræftes på den konkrete historiske periode før automatisering. |
| Badminton Esbjerg | Klubbens vedtægter dokumenterer en fusion i 1991 mellem Esbjerg Badmintonklub og Sædding Guldager Idrætsforening Badminton. | Dokumenterer at reelle fusioner forekommer, men ligger før 2010-datasættet og er ikke i sig selv en overgangskobling i runde 3. |

## Kilder

- [Skagen Badmintonklub om Vendsyssel Elite Badminton](https://www.skagenbadmintonklub.dk/page/senior)
- [VEB-historik hos SkagensAvis](https://www.skagensavis.dk/2026/09/16/vendsyssel-elite-badminton-traekker-sit-ligahold-efter-denne-saeson.html)
- [Team Skælskør-Slagelse: egen historik](https://sportsteamslagelse.com/medlemsklubber/tss-team-skaelskoer-slagelse/)
- [Højbjerg BK om Via Biler som sponsor](https://hojbjerg-badminton.dk/via-biler-ny-sponsor-hoejbjerg-badminton-klub/)
- [OBK's ligaholdside](https://obk.dk/ligahold/)
- [Badminton Esbjergs vedtægter](https://badmintonesbjerg.dk/page/vedtaegter)

## Foreløbig konklusion

Kilderne bekræfter, at både holdfællesskaber, sponsor-/elitenavne og reelle
fusioner findes. De tre relationstyper må ikke blandes i én global
klubalias-tabel: især Vendsyssel og Team Skælskør-Slagelse kan være rigtige
eliteholdsrelationer uden at gøre moderklubbernes øvrige hold gensidigt
udskiftelige. Derfor afventer alias-tabellen Christoffers konkrete bekræftelse
af relationstype og tidsinterval for hver kobling.
