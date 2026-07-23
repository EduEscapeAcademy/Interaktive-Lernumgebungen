import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(project, "data.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const { PACKAGE, starters, normalizeCode } = context.window.RUTA_DATA;

const expectedFirstFiveHash = "e4cfb2d8dd320e32dc1efa292cce41ffbbcf1e4145bc859b0a2f55ddbde5ddd8";
const firstFiveHash = crypto.createHash("sha256").update(JSON.stringify(starters.slice(0, 5))).digest("hex");
assert.equal(firstFiveHash, expectedFirstFiveHash, "Starter 1–5 wurden verändert");
assert.equal(PACKAGE.id, "spanisch-vorkurs-01");
assert.equal(PACKAGE.schemaVersion, "1.0");
assert.equal(starters.map((starter) => starter.id).join(","), "S001,S002,S003,S004,S005,S006,S007,S008,S009,S010,S011");

const allIds = [];
for (const starter of starters) {
  allIds.push(starter.id);
  for (const block of starter.blocks) {
    allIds.push(block.id);
    for (const item of block.items || block.pairs || []) allIds.push(item.id);
  }
}
assert.equal(new Set(allIds).size, allIds.length, "IDs müssen eindeutig sein");
const normalizedCodes = starters.map((starter) => normalizeCode(starter.code));
assert.equal(new Set(normalizedCodes).size, normalizedCodes.length, "Zugangscodes müssen eindeutig sein");
assert.equal(normalizeCode(" lago 31 "), normalizeCode("LAGO-31"), "Code-Normalisierung ist nicht tolerant");

const newStarters = starters.slice(5);
const numberWords = /\b(?:dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|dieciséis|diecisiete|dieciocho|diecinueve|veinte)\b/iu;
const newItemContent = newStarters.flatMap((starter) => starter.blocks.flatMap((block) => block.items || block.pairs || []));
assert.equal(numberWords.test(JSON.stringify(newItemContent)), false, "Starter 6–11 enthalten Zahlenwortschatz bis 20");
assert.equal(/familia/iu.test(JSON.stringify(starters.find((starter) => starter.id === "S006").blocks[0])), false, "familia darf in S006-B1 nicht vorkommen");
assert.equal(/Shakira|Messi|Penélope|famos/iu.test(JSON.stringify(newStarters)), false, "Zeitabhängige Prominentenbezüge gefunden");

for (const starter of newStarters) {
  assert.equal(starter.contentVersion, "1.0.0");
  assert.ok(starter.blocks.length >= 2 && starter.blocks.length <= 3);
  for (const block of starter.blocks) {
    for (const item of block.items || []) {
      if (item.options) assert.ok(item.answers.every((answer) => item.options.includes(answer)), `${item.id}: Lösung fehlt in den Optionen`);
      assert.ok(item.hint1 && item.hint2 && item.solution, `${item.id}: Diagnoseangaben unvollständig`);
    }
    for (const pair of block.pairs || []) assert.ok(pair.hint1 && pair.hint2 && pair.solution, `${pair.id}: Diagnoseangaben unvollständig`);
  }
}

for (const item of starters.find((starter) => starter.id === "S006").blocks[1].items) {
  assert.match(item.answers[0], /^(?:el|la)\s/u, `${item.id}: Artikel ist nicht verbindlich`);
}
for (const item of starters.find((starter) => starter.id === "S009").blocks[1].items) assert.ok(item.gloss, `${item.id}: Bedeutung fehlt`);

function hash(value) {
  return [...value].reduce((sum, character) => ((sum << 5) - sum + character.charCodeAt(0)) | 0, 0);
}
function shuffled(array, seed) {
  const output = [...array];
  let value = Math.abs(seed) || 1;
  for (let index = output.length - 1; index > 0; index -= 1) {
    value = (value * 16807) % 2147483647;
    const target = value % (index + 1);
    [output[index], output[target]] = [output[target], output[index]];
  }
  return output;
}
function assertDistributed(options, answer, salt) {
  const counts = Array(options.length).fill(0);
  for (let seed = 1; seed <= 240; seed += 1) {
    const position = shuffled(options, seed * 7919 + hash(salt)).indexOf(answer);
    assert.notEqual(position, -1, `${salt}: Lösung fehlt`);
    counts[position] += 1;
  }
  for (const count of counts) assert.ok(count >= 30 && count <= 130, `${salt}: auffällige Positionsverteilung ${counts.join("/")}`);
}

for (const starter of starters) {
  for (const block of starter.blocks) {
    for (const item of block.items || []) {
      if (item.options) assertDistributed(item.options, item.answers[0], item.id);
      if (block.type === "sort") assertDistributed(block.categories, item.category, `${item.id}-categories`);
      if (block.type === "subject-set") {
        assertDistributed(item.subjectOptions, item.subjectAnswer, `${item.id}-subject`);
        assertDistributed(item.pronounOptions, item.pronounAnswer, `${item.id}-pronoun`);
      }
    }
  }
}

const appSource = fs.readFileSync(path.join(project, "app.js"), "utf8");
assert.match(appSource, /rutaEspana:spanisch-vorkurs-01:progress:v1/, "Lokaler Speicherschlüssel wurde verändert");
assert.match(appSource, /BEGIN RUTA-ESPANA-DATA v1/, "TXT-Schemamarker wurde verändert");

for (const name of fs.readdirSync(project).filter((file) => /\.(?:html|css|js)$/u.test(file))) {
  const text = fs.readFileSync(path.join(project, name), "utf8");
  assert.equal(/(?:src|href)=["'](?:https?:|\/)/iu.test(text), false, `${name}: nicht-relativer Datei- oder Bildpfad`);
}

console.log(`Qualitätsprüfung bestanden: ${starters.length} Starter, ${allIds.length} eindeutige IDs.`);
