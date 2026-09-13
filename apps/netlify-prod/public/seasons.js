// Fælles sæson-konfiguration for GSB Dream Team-siderne.
// Ret spreadsheetId'erne til jeres rigtige ark-ID'er (fra arkets URL).
//
// ikkeSlutspilHold: liste over hold der DEN sæson kun spiller grundspil/gruppespil
// (ingen slutspil) — fx et hold i en lavere række uden slutspilsstruktur. Tjek
// dette hver sæson, da det ændrer sig når hold rykker op/ned. Tom liste = alle
// hold følger normal grundspil/slutspil-opdeling.
const GSB_SEASONS = [
  { key: '2627', label: '2026/27 (nuværende)', spreadsheetId: '1naV601-lJWqXJ9XZ5ovRwfuaKFWVYaflnLpwf5OUrW4', ikkeSlutspilHold: [] },
  { key: '2526', label: '2025/26', spreadsheetId: '1ENnMlINI8R03znnKLyKHwzH8XcHZIRTpDAWImoPTEqs', ikkeSlutspilHold: ['GSB 3', 'GSB 4'] },
  { key: '2425', label: '2024/25', spreadsheetId: '1YYNv2DDxvyFEZLMO4A64tsaIQ6Hyr_mWQu-dyKzf4Bo', ikkeSlutspilHold: [] },
];

const GSB_ROUND_PRESETS = [
  { key: 'alle', label: 'Alle runder (1-12)', min: 1, max: 12 },
  { key: 'grund', label: 'Grundspil (1-7)', min: 1, max: 7 },
  { key: 'slut', label: 'Slutspil (8-11)', min: 8, max: 11 },
  { key: 'playoff', label: 'Playoff (12)', min: 12, max: 12 },
  { key: 'brugerdef', label: 'Brugerdefineret', min: null, max: null },
];
