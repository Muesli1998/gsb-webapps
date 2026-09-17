# Opgave 049 — pulje-ID-mismatch

Mismatch-mønster: 2 af 6.

Rodårsag: browser-standings-importen slår kun op på sæson + league_group_id og vælger første competition; league_group_id er ikke globalt unikt.

2010/431: holdliste ens=true, kampantal ens=true, kilde=https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#2,2010,431,1,,,,1093,
2011/71: holdliste ens=true, kampantal ens=true, kilde=https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#2,2011,71,1,,,,1093,
2013/2693: holdliste ens=false, kampantal ens=true, kilde=https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#2,2013,2693,1,,,,1093,
2021/13965: holdliste ens=false, kampantal ens=true, kilde=https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#2,2021,13965,1,,,,1093,
2025/18504: holdliste ens=true, kampantal ens=true, kilde=https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#2,2025,18504,1,,,,1093,
2025/18733: holdliste ens=true, kampantal ens=true, kilde=https://www.badmintonplayer.dk/DBF/HoldTurnering/Stilling/#2,2025,18733,1,,,,1093,
