# Git-kontekst for GSB-statistik-test

## Projektrod

`C:\Users\chril\Dropbox\gsb-statistik-test`

Dette er et separat Git-repository. Git-metadata ligger i den skjulte mappe `.git`, som nogle filvælgere og AI-værktøjer ikke viser. Mappen `netlify-tool-prod` er et andet projekt og må ikke ændres i dette arbejde.

## Sådan finder et værktøj Git-repositoryet

Hvis terminaladgang findes, skal kommandoer køres fra projektroden eller med eksplicit sti:

```text
git -C C:\Users\chril\Dropbox\gsb-statistik-test status
git -C C:\Users\chril\Dropbox\gsb-statistik-test log --oneline -10
git -C C:\Users\chril\Dropbox\gsb-statistik-test rev-parse --show-toplevel
```

Hvis værktøjet kun kan læse synlige filer, kan det ikke se `.git` direkte. Brug denne fil, `TEST_RUN_LOG.md` og `results/CURRENT_VALIDATION_STATUS.md` som synlig projektkontekst.

## Seneste commits

- `12ed7f9` Add project resume instructions
- `5de0a69` Record reproduced validation checks
- `f2f4cac` Audit team and individual result consistency
- `f421ac8` Audit individual coverage gaps and match remarks
- `d8b9b62` Audit missing individual data and preserve match remarks
- `007e535` Keep generated schema aligned

## Arbejdsprincipper

- Arbejd kun i `gsb-statistik-test`.
- Rør aldrig `netlify-tool-prod`.
- Dokumentér tests i `TEST_RUN_LOG.md`.
- Commit relevante scripts, rapporter og databaseændringer.
- Commit ikke `.browser-state`, `node_modules` eller midlertidige backups uden en konkret grund.
- Gæt ikke på API-felters betydning; bevar rå værdier og markér usikkerhed.

## Startpunkt for arbejdet

Læs i denne rækkefølge:

1. `RESUME_INSTRUCTIONS.txt`
2. `TEST_RUN_LOG.md`
3. `results/CURRENT_VALIDATION_STATUS.md`
4. `results/COMPLETE_RESULT_FALLBACK_METHOD.md`
5. `results/individual-coverage-gap-audit.md`
6. `results/team-vs-individual-result-audit.md`
