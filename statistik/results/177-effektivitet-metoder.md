# Opgave 177 — effektivitet: metodesammenligning

Data: 2025/2026, Gladsaxe Søborg, alle aldersgrupper. Genereret 2026-10-10T10:23:49.434Z. SQLite åbnet read-only.

## Kort anbefaling (vurdering)

**Anbefaling til B3: vis rå vindprocent sammen med kampantal, og brug Bayes-justeret procent som standard sortering ved små stikprøver.** Den dæmper udsving uden at skjule kampantallet. Wilson er et gennemskueligt konservativt alternativ, men dens nedre grænse kan føles straffende. ELO er den mest resultatbaserede modstanderjustering her, men starter alle deltagere på 1500, bygger kun på kampe mod GSB og mangler point-/ekstern kampstyrke. Minimum 20 kampe er let at forklare, men udelukker spillere og siger intet om hvor gode deres modstandere var. Vurderingen er foreløbig og bygger på én sæson.

## Datagrundlag og udfald

- Individuelle kampe med GSB-deltager: 2921; med kendt vinder: 2805; uden kendt home/away-vinder: 116. Ukendte udfald er udelukket og ikke gættet.
- Spillertilfælde med kendt udfald: 4350 inkl. walkovers, 4186 ekskl. walkovers.
- Eksplicitte walkover-kampe (“Ikke fremmødt”): 127; med kendt udfald: 104; kendt markør mangler i 23. Standardrangeringer udelukker dem.
- Databasen har point ved kamp for 0 af 4186 standardoptrædener; modstanderstyrke er derfor ukendt.
- Ukendt GSB-side/deltagerrække: 0. Ungdom (U9-U17/U19): 1582 kampe. Aldersgruppeantal individuelle kampe (rå ID): {"1":631,"2":207,"3":198,"4":562,"5":512,"9":332,"11":216,"13":120,"17":40,"18":103}.
- Bayes-prior: 49.7 % pooled GSB-spilleroptrædelses-vindrate, vægt 10 kampe. Minimumsmetoden kræver altid 20 kampe.

## Metoder: top 10 for N=5, 10, 20

Score er vindprocent for rå/minimum, posterior middelværdi for Bayes, Wilsons nedre 95 %-grænse eller sæsonslut-ELO. Spillere med lige score ordnes alfabetisk.

### N=5

| Metode | Kvalificerede | Udelukket | Top 10 (rang: navn, kampe, vundne, rå %) |
|---|---:|---:|---|
| Rå vindprocent | 229 | 60 | 1. Isak Riis Stidsen (6, 6, 100.0 %); 2. Rikke Krawcyk (6, 6, 100.0 %); 3. Tina Skov Mikkelsen (15, 14, 93.3 %); 4. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 5. Anders Køhler (11, 10, 90.9 %); 6. Holger Lindholm (20, 18, 90.0 %); 7. Jesper Yan (20, 18, 90.0 %); 8. Sylvester Østberg (10, 9, 90.0 %); 9. Silas Buron (19, 17, 89.5 %); 10. Kim Jørgensen (16, 14, 87.5 %) |
| Bayes-justeret | 229 | 60 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Holger Lindholm (20, 18, 90.0 %); 3. Jesper Yan (20, 18, 90.0 %); 4. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 5. Tina Skov Mikkelsen (15, 14, 93.3 %); 6. Silas Buron (19, 17, 89.5 %); 7. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 8. Smayan Kiran Vaddin (26, 22, 84.6 %); 9. Magne Gjervan Majborn (29, 24, 82.8 %); 10. Lauge Juul Hornsgaard (32, 26, 81.3 %) |
| Wilson nedre 95 % | 229 | 60 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Tina Skov Mikkelsen (15, 14, 93.3 %); 3. Holger Lindholm (20, 18, 90.0 %); 4. Jesper Yan (20, 18, 90.0 %); 5. Silas Buron (19, 17, 89.5 %); 6. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 7. Smayan Kiran Vaddin (26, 22, 84.6 %); 8. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 9. Magne Gjervan Majborn (29, 24, 82.8 %); 10. Lauge Juul Hornsgaard (32, 26, 81.3 %) |
| Minimum 20 kampe + rå % | 91 | 198 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Holger Lindholm (20, 18, 90.0 %); 3. Jesper Yan (20, 18, 90.0 %); 4. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 5. David Vad Chawes (20, 17, 85.0 %); 6. Smayan Kiran Vaddin (26, 22, 84.6 %); 7. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 8. Magne Gjervan Majborn (29, 24, 82.8 %); 9. Jonas Trusell-Jensen (22, 18, 81.8 %); 10. Lauge Juul Hornsgaard (32, 26, 81.3 %) |
| ELO | 229 | 60 | 1. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 2. Lauge Juul Hornsgaard (32, 26, 81.3 %); 3. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 4. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 5. Smayan Kiran Vaddin (26, 22, 84.6 %); 6. Silas Buron (19, 17, 89.5 %); 7. Tue Abelskov (33, 26, 78.8 %); 8. Magne Gjervan Majborn (29, 24, 82.8 %); 9. Jesper Yan (20, 18, 90.0 %); 10. Norr Bagge Køhler (25, 20, 80.0 %) |

| Metode | Split lige/ulige: Spearman (spillere) | Split sæsonhalvdel: Spearman (spillere) |
|---|---:|---:|
| Rå vindprocent | 0.640 (229) | 0.465 (198) |
| Bayes-justeret | 0.619 (229) | 0.457 (198) |
| Wilson nedre 95 % | 0.704 (229) | 0.469 (198) |
| Minimum 20 kampe + rå % | 0.657 (91) | 0.516 (90) |
| ELO | 0.600 (229) | 0.422 (198) |

### N=10

| Metode | Kvalificerede | Udelukket | Top 10 (rang: navn, kampe, vundne, rå %) |
|---|---:|---:|---|
| Rå vindprocent | 183 | 106 | 1. Tina Skov Mikkelsen (15, 14, 93.3 %); 2. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 3. Anders Køhler (11, 10, 90.9 %); 4. Holger Lindholm (20, 18, 90.0 %); 5. Jesper Yan (20, 18, 90.0 %); 6. Sylvester Østberg (10, 9, 90.0 %); 7. Silas Buron (19, 17, 89.5 %); 8. Kim Jørgensen (16, 14, 87.5 %); 9. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 10. David Vad Chawes (20, 17, 85.0 %) |
| Bayes-justeret | 183 | 106 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Holger Lindholm (20, 18, 90.0 %); 3. Jesper Yan (20, 18, 90.0 %); 4. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 5. Tina Skov Mikkelsen (15, 14, 93.3 %); 6. Silas Buron (19, 17, 89.5 %); 7. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 8. Smayan Kiran Vaddin (26, 22, 84.6 %); 9. Magne Gjervan Majborn (29, 24, 82.8 %); 10. Lauge Juul Hornsgaard (32, 26, 81.3 %) |
| Wilson nedre 95 % | 183 | 106 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Tina Skov Mikkelsen (15, 14, 93.3 %); 3. Holger Lindholm (20, 18, 90.0 %); 4. Jesper Yan (20, 18, 90.0 %); 5. Silas Buron (19, 17, 89.5 %); 6. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 7. Smayan Kiran Vaddin (26, 22, 84.6 %); 8. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 9. Magne Gjervan Majborn (29, 24, 82.8 %); 10. Lauge Juul Hornsgaard (32, 26, 81.3 %) |
| Minimum 20 kampe + rå % | 91 | 198 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Holger Lindholm (20, 18, 90.0 %); 3. Jesper Yan (20, 18, 90.0 %); 4. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 5. David Vad Chawes (20, 17, 85.0 %); 6. Smayan Kiran Vaddin (26, 22, 84.6 %); 7. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 8. Magne Gjervan Majborn (29, 24, 82.8 %); 9. Jonas Trusell-Jensen (22, 18, 81.8 %); 10. Lauge Juul Hornsgaard (32, 26, 81.3 %) |
| ELO | 183 | 106 | 1. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 2. Lauge Juul Hornsgaard (32, 26, 81.3 %); 3. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 4. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 5. Smayan Kiran Vaddin (26, 22, 84.6 %); 6. Silas Buron (19, 17, 89.5 %); 7. Tue Abelskov (33, 26, 78.8 %); 8. Magne Gjervan Majborn (29, 24, 82.8 %); 9. Jesper Yan (20, 18, 90.0 %); 10. Norr Bagge Køhler (25, 20, 80.0 %) |

| Metode | Split lige/ulige: Spearman (spillere) | Split sæsonhalvdel: Spearman (spillere) |
|---|---:|---:|
| Rå vindprocent | 0.601 (183) | 0.431 (176) |
| Bayes-justeret | 0.605 (183) | 0.441 (176) |
| Wilson nedre 95 % | 0.630 (183) | 0.389 (176) |
| Minimum 20 kampe + rå % | 0.657 (91) | 0.516 (90) |
| ELO | 0.591 (183) | 0.409 (176) |

### N=20

| Metode | Kvalificerede | Udelukket | Top 10 (rang: navn, kampe, vundne, rå %) |
|---|---:|---:|---|
| Rå vindprocent | 91 | 198 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Holger Lindholm (20, 18, 90.0 %); 3. Jesper Yan (20, 18, 90.0 %); 4. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 5. David Vad Chawes (20, 17, 85.0 %); 6. Smayan Kiran Vaddin (26, 22, 84.6 %); 7. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 8. Magne Gjervan Majborn (29, 24, 82.8 %); 9. Jonas Trusell-Jensen (22, 18, 81.8 %); 10. Lauge Juul Hornsgaard (32, 26, 81.3 %) |
| Bayes-justeret | 91 | 198 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Holger Lindholm (20, 18, 90.0 %); 3. Jesper Yan (20, 18, 90.0 %); 4. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 5. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 6. Smayan Kiran Vaddin (26, 22, 84.6 %); 7. Magne Gjervan Majborn (29, 24, 82.8 %); 8. Lauge Juul Hornsgaard (32, 26, 81.3 %); 9. David Vad Chawes (20, 17, 85.0 %); 10. Tue Abelskov (33, 26, 78.8 %) |
| Wilson nedre 95 % | 91 | 198 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Holger Lindholm (20, 18, 90.0 %); 3. Jesper Yan (20, 18, 90.0 %); 4. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 5. Smayan Kiran Vaddin (26, 22, 84.6 %); 6. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 7. Magne Gjervan Majborn (29, 24, 82.8 %); 8. Lauge Juul Hornsgaard (32, 26, 81.3 %); 9. David Vad Chawes (20, 17, 85.0 %); 10. Tue Abelskov (33, 26, 78.8 %) |
| Minimum 20 kampe + rå % | 91 | 198 | 1. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 2. Holger Lindholm (20, 18, 90.0 %); 3. Jesper Yan (20, 18, 90.0 %); 4. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 5. David Vad Chawes (20, 17, 85.0 %); 6. Smayan Kiran Vaddin (26, 22, 84.6 %); 7. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 8. Magne Gjervan Majborn (29, 24, 82.8 %); 9. Jonas Trusell-Jensen (22, 18, 81.8 %); 10. Lauge Juul Hornsgaard (32, 26, 81.3 %) |
| ELO | 91 | 198 | 1. Louis Valdemar Hedegaard Toftlund (28, 24, 85.7 %); 2. Lauge Juul Hornsgaard (32, 26, 81.3 %); 3. Kenn Blæsbjerg Christensen (30, 25, 83.3 %); 4. Rasmus Hammershaimb Pedersen (23, 21, 91.3 %); 5. Smayan Kiran Vaddin (26, 22, 84.6 %); 6. Tue Abelskov (33, 26, 78.8 %); 7. Magne Gjervan Majborn (29, 24, 82.8 %); 8. Jesper Yan (20, 18, 90.0 %); 9. Norr Bagge Køhler (25, 20, 80.0 %); 10. Holger Lindholm (20, 18, 90.0 %) |

| Metode | Split lige/ulige: Spearman (spillere) | Split sæsonhalvdel: Spearman (spillere) |
|---|---:|---:|
| Rå vindprocent | 0.657 (91) | 0.516 (90) |
| Bayes-justeret | 0.659 (91) | 0.497 (90) |
| Wilson nedre 95 % | 0.650 (91) | 0.433 (90) |
| Minimum 20 kampe + rå % | 0.657 (91) | 0.516 (90) |
| ELO | 0.634 (91) | 0.438 (90) |

## Stabilitet: største skift

Skift er absolut rangforskel mellem de to halvdele inden for samme metode og metodekvalificerede sæsonkohorte. Maksimalt fem spillere pr. split vises i JSON-filen.

- N=5, Rå vindprocent: lige/ulige William Romm Egi (171), Tim Guldbæk (164), Kasper Viktor Petersen (163); sæsonhalvdel Tobias Weinreich Hansen (195), Jan Holzmann Rasmussen (183), Malthe Baltzer (150).
- N=5, Bayes-justeret: lige/ulige William Romm Egi (185), Kasper Viktor Petersen (171), Erik Kragh Winther (166); sæsonhalvdel Georg Engedal Nielsen (170), Benjamin Hinge Carlsson (162), Jan Holzmann Rasmussen (146).
- N=5, Wilson nedre 95 %: lige/ulige William Romm Egi (166), Kasper Viktor Petersen (159), Gitte Mathiasen (154); sæsonhalvdel Tobias Weinreich Hansen (199), Jan Holzmann Rasmussen (192), Malthe Baltzer (168).
- N=5, Minimum 20 kampe + rå %: lige/ulige Brian Heiner (63), Erik Kragh Winther (63), Line Nielsen (54); sæsonhalvdel Georg Engedal Nielsen (70), Benjamin Hinge Carlsson (68), Katia Lundby Bresemann (61).
- N=5, ELO: lige/ulige Erik Kragh Winther (189), Line Nielsen (187), William Romm Egi (181); sæsonhalvdel Benjamin Hinge Carlsson (179), Georg Engedal Nielsen (161), henrik perregaard (148).
- N=10, Rå vindprocent: lige/ulige William Romm Egi (146), Kasper Viktor Petersen (139), Vitus Reinholdt Amelung (131); sæsonhalvdel Tobias Weinreich Hansen (161), Jan Holzmann Rasmussen (154), Malthe Baltzer (136).
- N=10, Bayes-justeret: lige/ulige William Romm Egi (141), Erik Kragh Winther (130), Kasper Viktor Petersen (128); sæsonhalvdel Benjamin Hinge Carlsson (144), Georg Engedal Nielsen (141), Jan Holzmann Rasmussen (125).
- N=10, Wilson nedre 95 %: lige/ulige William Romm Egi (139), Kasper Viktor Petersen (131), Vitus Reinholdt Amelung (128); sæsonhalvdel Tobias Weinreich Hansen (165), Jan Holzmann Rasmussen (163), Malthe Baltzer (152).
- N=10, Minimum 20 kampe + rå %: lige/ulige Brian Heiner (63), Erik Kragh Winther (63), Line Nielsen (54); sæsonhalvdel Georg Engedal Nielsen (70), Benjamin Hinge Carlsson (68), Katia Lundby Bresemann (61).
- N=10, ELO: lige/ulige Erik Kragh Winther (144), Line Nielsen (143), Brian Heiner (138); sæsonhalvdel Benjamin Hinge Carlsson (147), Georg Engedal Nielsen (134), Signe Aarøe Jørgensen (123).
- N=20, Rå vindprocent: lige/ulige Brian Heiner (63), Erik Kragh Winther (63), Line Nielsen (54); sæsonhalvdel Georg Engedal Nielsen (70), Benjamin Hinge Carlsson (68), Katia Lundby Bresemann (61).
- N=20, Bayes-justeret: lige/ulige Erik Kragh Winther (62), Brian Heiner (60), Line Nielsen (60); sæsonhalvdel Benjamin Hinge Carlsson (72), Georg Engedal Nielsen (66), Katia Lundby Bresemann (56).
- N=20, Wilson nedre 95 %: lige/ulige Brian Heiner (65), Erik Kragh Winther (61), Line Nielsen (57); sæsonhalvdel Benjamin Hinge Carlsson (70), Georg Engedal Nielsen (67), Katia Lundby Bresemann (66).
- N=20, Minimum 20 kampe + rå %: lige/ulige Brian Heiner (63), Erik Kragh Winther (63), Line Nielsen (54); sæsonhalvdel Georg Engedal Nielsen (70), Benjamin Hinge Carlsson (68), Katia Lundby Bresemann (61).
- N=20, ELO: lige/ulige Erik Kragh Winther (62), Line Nielsen (62), Brian Heiner (61); sæsonhalvdel Benjamin Hinge Carlsson (73), Georg Engedal Nielsen (61), John Kørboe (61).

## Følsomhed

### Walkovers

Af de 127 tekstligt identificerede walkover-kampe har 23 intet kendt vinderfelt. For hver N/metode er top-10-overlap samt rangkorrelation med/uden de kendte walkovers gemt i JSON.

### Single og double

Disciplinfordeling på inkluderede spilleroptrædener: single: 1041 optrædener, 53.1 %; double: 3145 optrædener, 48.6 %; unknown: 0 optrædener, ukendt. Separate top-10 og spillerantal pr. N/metode ligger i JSON.

### Modstanderstyrke

Point ved kamp er tilgængelige for 0 standardoptrædener. Ingen modstanderstyrkejustering kan derfor beregnes; dette er ukendt, ikke nul.

### Skift mellem metoder

Spillere med mere end fem pladsers spænd på tværs af metoder står i JSON under `sensitivity.methodRankShifts`; forskelle kan også skyldes metode d’s 20-kampskrav.

## Hvad metoderne gør forkert

- **Rå procent:** overdriver små stikprøver og behandler alle sejre som lige sikre.
- **Bayes:** afhænger af valg af prior og trækker alle mod sæsonens gennemsnit; spillerens disciplin/styrke indgår ikke.
- **Wilson:** konservativ nedre grænse er ikke et neutralt estimat af spillerens forventede vinderate og straffer få kampe kraftigt.
- **Minimum + rå procent:** skjuler spillere under grænsen og skaber et brat adgangsskel ved 20 kampe.
- **ELO:** tager højde for tidligere resultater mod spillere fra modstanderhold, men starter alle på 1500, bygger kun på modstandere mødt mod GSB og deler samme ratingændring mellem doublespillere.

## Metodevalg og begrænsninger

- Bayes: Beta-binomial middelværdi med 10 pseudo-kampe omkring sæsonens poolede rå GSB-rate.
- Wilson: nedre grænse for 95 % Wilson-scoreinterval, z=1.96.
- ELO: start 1500, K=24; holdrating er gennemsnit af spillernes rating på hver side, og samme holdændring fordeles på holdets deltagere.
- “Lige/ulige” alternerer hver spillers egne kampe i datoorden; “første/anden sæsonhalvdel” bruger median dato blandt kendte udfald.
- ELO bruger de faktiske modstanderdeltagere i GSB-kampene, men modstandernes andre kampe uden GSB og pointbaseret styrke findes ikke i dette datasæt.
- Bayes-prioren er sæsonens samlede GSB-spilleroptrædelses-vindprocent med 10 pseudo-kampe; dobbeltkampe bidrager med hver GSB-spillers optræden.
- Disciplinlabels S/HS er behandlet som single; D/DD/DS/HD/MD som double. Ukendte labels rapporteres separat.
- Kampe uden home/away-vindermarkør er udelukket fra scoring og tælles særskilt. Rå markører med ukendt betydning fortolkes ikke.
- Resultater måler vundne individuelle kampe, ikke fantasy-point eller samlet holdkampseffekt.

## Kildestatus

Kørsel offline mod lokal SQLite. Uafklarede resultatmarkører uden vinder: 116 kampe; rå markører på disse kampe: ["G"]. Se tællinger efter alder i JSON.
