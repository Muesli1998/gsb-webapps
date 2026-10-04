import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Curated public sources found in the official BD library and regional archives.
// No cookies, login, proxy, CAPTCHA, or robots.txt bypass is used.
const sources = [
  ['bd-youth-2026-27','https://badminton.dk/wp-content/uploads/2026/07/Faelles-reglement-for-ungdomsholdturneringen-endeligt-300626-1.pdf','2026/27','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen 2026/27'],
  ['bd-youth-2025-26-rev-2025-10-08','https://badminton.dk/wp-content/uploads/2025/10/Faelles-reglement-for-ungdomsholdturneringen-2025-10-08.pdf','2025/26','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen, revision 8. oktober 2025'],
  ['bd-youth-2025-26-original','https://badminton.dk/wp-content/uploads/2025/07/Faelles-reglement-for-ungdomsholdturneringen-2025-2026.pdf','2025/26','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen 2025/26'],
  ['bd-youth-2024-25-rev-2025-03','https://badminton.dk/wp-content/uploads/2025/03/2025-03-03-Faelles-reglement-for-ungdomsholdturneringen.pdf','2024/25','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen, revision marts 2025'],
  ['bd-youth-2024-25','https://badminton.dk/wp-content/uploads/2024/10/2024-10-04-Faelles-reglement-for-ungdomsholdturneringen.pdf','2024/25','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen 2024/25'],
  ['bd-youth-2023-24','https://badminton.dk/wp-content/uploads/2023/11/Faelles-reglement-for-ungdomsholdturneringen-2023-2024.pdf','2023/24','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen 2023/24'],
  ['bd-youth-2019-20','https://badminton.dk/wp-content/uploads/2020/01/Fælles-reglement-for-ungdomsholdturneringen-2019-2020.pdf','2019/20','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen 2019/20'],
  ['bd-youth-2022-23','https://badminton.dk/wp-content/uploads/2023/03/Faelles-reglement-for-ungdomsholdturneringen-2022-2023.pdf','2022/23','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen 2022/23'],
  ['bd-dgi-youth-2018-19','https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=77454','2018/19','Badminton Danmark + DGI Badminton','ungdom','Fælles reglement for ungdomsholdturneringen 2018/19'],
  ['north-jutland-youth-invitation-2018-19','https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=77449','2018/19','Badminton Nordjylland + DGI Nordjylland','ungdom-invitation','Indbydelse til ungdomsholdturnering 2018/19'],
  ['kbk-rules-2024-25','https://badmintonkoebenhavn.dk/uploads/file/123/Turneringsreglement_for_Badminton_K%C3%B8benhavns_holdturnering_2024-2025__version_2024-2_.pdf','2024/25','Badminton København','ungdom-senior-veteran','Turneringsreglement for Badminton Københavns holdturnering 2024/25'],
  ['nordjylland-veteran-historic','https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=77460','ukendt (historisk; sæson ikke angivet)','Badminton Nordjylland','veteran','Turneringsreglement for Badminton Nordjyllands holdturnering Veteran M+A+B'],
  ['sjaelland-veteran-2022-docdate','https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=97856','Dokumentdato 1. september 2022; sæson ikke angivet','Badminton Sjælland + DGI Nordsjælland, Midt- og Vestsjælland, Storstrømmen','veteran','Reglement for Veteranholdturnering'],
  ['west-senior-veteran-2025-26','https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=100506','2025/26 (gældende fra uge 43 2025)','Badminton Sønderjylland og Midtjylland + DGI Østjylland, Vestjylland, Sydvest, Midtjylland, Sønderjylland, Sydøstjylland','senior-veteran','Regionalt holdturneringsreglement, senest opdateret/gældende fra uge 43 2025'],
  ['bd-dh-2026-27','https://badminton.dk/wp-content/uploads/2026/07/Holdturneringsreglement-for-badminton-i-Danmark-DH-reglementet-2026-07-01-endeligt-med-bilag-3-1.pdf','2026/27','Badminton Danmark','senior','DH-reglementet 2026/27'],
  ['bd-dh-bilag3-2026-27','https://badminton.dk/wp-content/uploads/2026/07/Bilag-3-til-DH-reglementet-2026-06-30.pdf','2026/27','Badminton Danmark','senior-tillaeg','Bilag 3 til DH-reglementet'],
  ['bd-dh-holdfaellesskaber-2026-27','https://badminton.dk/wp-content/uploads/2026/07/Tillaeg-om-holdfaellesskaber-til-Reglement-for-holdmesterskabet-for-Danmark-i-badminton-2026-06-24-godkendt.pdf','2026/27','Badminton Danmark','senior-tillaeg','Tillæg om holdfællesskaber'],
  ['bd-dmu-2026-27','https://badminton.dk/wp-content/uploads/2026/07/Reglement-DMU-HOLD-tillaeg-2026-07-01.pdf','2026/27','Badminton Danmark','ungdom-dmu','Reglement DMU Hold (tillæg)'],
  ['bd-dmu-2025-26','https://badminton.dk/wp-content/uploads/2025/07/Reglement-DMU-HOLD-tillaeg-2025-2026.pdf','2025/26','Badminton Danmark','ungdom-dmu','Reglement DMU Hold (tillæg)'],
  ['dgi-youth-invitation-2025-26','https://cms.dgi.dk/media/nsdkpsgp/indbydelse-ungdomsholdturnering-25-26.pdf','2025/26','DGI Badminton + Badminton Danmark','ungdom-invitation','Indbydelse til ungdomsholdturnering 2025/26 (praktisk invitation; ikke et generelt reglement)'],
  ['vest-kredsserie-2021','https://badmintoninordjylland.dk/wp-content/uploads/2022/08/Reglement-for-Kredsserien-Vest-og-Serie-1-Vest-2021.pdf','Dokumentår 2021; gældende sæson ikke angivet','Badminton Fyn, Sønderjylland, Nordjylland og Midtjylland','senior','Holdturneringsreglement for Kredsserien Vest og Serie 1 Vest'],
  ['nordjylland-senior-veteran-2026-27','https://badmintoninordjylland.dk/wp-content/uploads/2026/07/SH-Reglement-2026-2027.pdf','2026/27','Badminton Nordjylland + DGI Nordjylland','senior-veteran','SH-reglement 2026/27'],
  ['nordjylland-senior-veteran-2025-26','https://badmintoninordjylland.dk/wp-content/uploads/2025/06/Nordjysk-SH-reglement-2025-2026.pdf','2025/26','Badminton Nordjylland + DGI Nordjylland','senior-veteran','Nordjysk SH-reglement 2025/26'],
  ['koebenhavn-rules-2026-27','https://www.badmintonkoebenhavn.dk/uploads/file/148/Turneringsreglement_for_Badminton_K%C3%B8benhavns_holdturnering_2026-2027__version_2026-1_.pdf','2026/27','Badminton København','ungdom-senior-veteran','Turneringsreglement for Badminton Københavns holdturnering 2026/27'],
  ['koebenhavn-rules-2025-26','https://www.badmintonkoebenhavn.dk/uploads/file/136/Turneringsreglement_for_Badminton_K%C3%B8benhavns_holdturnering_2025-2026__version_2025-1_.pdf','2025/26','Badminton København','ungdom-senior-veteran','Turneringsreglement for Badminton Københavns holdturnering 2025/26'],
  ['sjaelland-veteran-invitation-2026-27','https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=101467','2026/27','Badminton Sjælland (tidl. SBKr.)','veteran-invitation','Holdturneringen Veteran 2026/2027 (invitation; ikke fuldt reglement)'],
  ['sj-bad-holdreglement-historisk','https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=25218','ukendt (arkivfund 2013; sæson ikke nævnt i PDF)','Badminton Sjælland (tidl. SBKr.)','ungdom-senior-veteran','Holdturningsreglement (sæson ikke angivet i PDF)'],
  ['sj-veteran-2013-14-season-conflict','https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=25615','PDF-titel 2013/14; brødtekst omtaler 2012/13','Badminton Sjælland (tidl. SBKr.)','veteran','Holdturneringen 2013/2014 – Veteran (titel/brødtekst uenige)'],
  ['kbk-rules-2018-19','https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=76460','2018/19 (PDF-cover; version 2018-1)','Badminton København','ungdom-veteran','Turneringsreglement for Badminton Københavns holdturnering 2018/19, version 2018-1'],
  ['lf-regler-historisk','https://badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=75459','ukendt (ældre arkiv)','Lolland-Falsters Badminton Kreds','senior','Holdturneringsreglement'],
  ['sbkr-arsmoede-2011','https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=7828','2010/11','Badminton Sjælland (tidl. SBKr.)','kontekst-veteran','Årsmødemateriale 2011 (beretning om holdturnering; ikke selve reglementet)'],
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'kilder', 'reglementer');
const retrieved = new Date().toISOString().slice(0, 10);
const register = [];
for (const [id, url, season, area, type, title] of sources) {
  const response = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'gsb-webapps-regulation-archive/130 (public documents; contact via repository)' } });
  if (!response.ok) throw new Error(`${id}: HTTP ${response.status} (${response.url})`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 100 || bytes.subarray(0, 5).toString() !== '%PDF-') {
    throw new Error(`${id}: response is not a PDF (${response.headers.get('content-type')}, ${bytes.length} bytes)`);
  }
  const areaFolder = area.startsWith('Badminton Sjælland') ? 'badminton-sjaelland' : area.toLowerCase().replace(/[^a-z0-9æøå]+/g, '-').replace(/^-|-$/g, '');
  const yearFolder = season.startsWith('ukendt') ? 'ukendt-aar' : (season.match(/20\d\d/)?.[0] ?? 'ukendt-aar');
  const folder = path.join(root, yearFolder, areaFolder);
  await mkdir(folder, { recursive: true });
  const filename = `${id}.pdf`;
  const file = path.join(folder, filename);
  await writeFile(file, bytes);
  const entry = { id, title, source_url: url, final_url: response.url, retrieved_at: retrieved, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length, file: path.relative(root, file).replaceAll(path.sep, '/'), season, area, type, public_access: true };
  if (id === 'bd-youth-2019-20') {
    entry.alternate_source = 'https://web.archive.org/web/20200115193749id_/https://badminton.dk/wp-content/uploads/2020/01/F%C3%A6lles-reglement-for-ungdomsholdturneringen-2019-2020.pdf';
    entry.alternate_source_checked_at = retrieved;
    entry.alternate_source_status = 200;
    entry.alternate_source_bytes = 166682;
    entry.alternate_source_sha256_matches = true;
  }
  register.push(entry);
  await new Promise(resolve => setTimeout(resolve, 700));
}
// User-supplied local sources: the public DGI event page was identified, but
// anonymous retrieval of its three SharePoint share links returned HTTP 401.
const manual = [
  ['dgi-uge38-2026-27','Uge 38 invitation 2026/27','Uge_38_invitation_2026-2027.pdf','2026/27','DGI Sjælland / Badminton Sjælland','ungdom-uge38',40284],
  ['dgi-holdlederfolder-2026-27','Badminton Ungdomshold Holdlederfolder 2026/27','DGIMVS-NSJ_Badminton_Ungdomshold_Holdlederfolder_2026-2027.pdf','2026/27','DGI Midt- og Vestsjælland + Nordsjælland','ungdom-vejledning',1427044],
  ['dgi-bsj-invitation-2026-27','Indbydelse ungdomsholdturnering DGI og BSJ 2026/27','Indbydelse_ungdomsholdturnering_DGI_og_BSJ_2026-2027.pdf','2026/27','DGI Midt- og Vestsjælland + Nordsjælland + Badminton Sjælland + København','ungdom-invitation',256411],
];
for (const [id, title, filename, season, area, type, expectedBytes] of manual) {
  const file = path.join(root, 'manuelt', filename);
  const bytes = await readFile(file);
  if (bytes.length !== expectedBytes || bytes.subarray(0, 5).toString() !== '%PDF-') throw new Error(`${id}: local manual PDF failed size/signature validation`);
  register.push({ id, title, source_url: 'https://www.dgi.dk/arrangementer/202717105000', retrieved_at: retrieved, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length, file: `manuelt/${filename}`, season, area, type, public_access: 'SharePoint-links returned HTTP 401 anonymously; file supplied manually by Christoffer', acquisition_method: 'Manuel filoverdragelse', original_share_link_status: 401, original_share_link_mapping: 'not established among the three supplied share URLs' });
}
const failedCandidates = [
  { source_url: 'https://www.badmintonpeople.dk/Clubs/CommonDrive/Components/GetWWWFile.aspx?fileID=75911', title: 'Reglement for senior-/veteranholdturnering, Badminton Fyn', season_or_date: 'Revideret 1. august 2018 (søgeresultat); gældende sæson ikke fastslået', area: 'Badminton Fyn', type: 'senior/veteran', status: 'HTTP 200, men svar var image/png, 2.916 bytes, ikke PDF (UnknownFile.png); ikke arkiveret som reglement' },
  { source_url: 'https://badminton.dk/wp-content/uploads/2025/03/2025-03-03-Holdturneringsreglement-for-badminton-i-Danmark.pdf', title: 'Holdturneringsreglement for badminton i Danmark (DH-reglementet), 3. marts 2025', season_or_date: 'Dokumentdato 2025-03-03; anvendelsessæson ikke fastlagt', area: 'Badminton Danmark', type: 'senior', status: 'Badminton Danmarks medieindeks viser PDF-tekst; direkte anonym HTTP GET gav 404, ikke arkiveret' },
];
await writeFile(path.join(root, 'register.json'), `${JSON.stringify({ generated_at: retrieved, method: 'Manuelt kuraterede offentlige kildelinks; direkte HTTP GET uden login/cookies; 700 ms pause mellem dokumenter.', sources: register, failed_candidates: failedCandidates }, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(register.map(({ id, bytes, sha256, file }) => ({ id, bytes, sha256, file })), null, 2));
