(function () {
  "use strict";

  const { PACKAGE, starters, starterByCode } = window.RUTA_DATA;
  const STORAGE_KEY = "rutaEspana:spanisch-vorkurs-01:progress:v1";
  const EXPORT_BEGIN = "----- BEGIN RUTA-ESPANA-DATA v1 -----";
  const EXPORT_END = "----- END RUTA-ESPANA-DATA v1 -----";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const now = () => new Date().toISOString();
  const previewStarterId = new URLSearchParams(window.location.search).get("preview");
  const previewStarter = starters.find((starter) => starter.id === previewStarterId) || null;
  const isTeacherPreview = Boolean(previewStarter);
  let state = isTeacherPreview ? blankState() : loadState();
  let session = null;
  let pendingImport = null;

  const els = {
    home: $("#home-view"), starter: $("#starter-view"), profileDialog: $("#profile-dialog"),
    importDialog: $("#import-dialog"), taskArea: $("#task-area"), toast: $("#toast"),
  };

  init();

  function init() {
    bindEvents();
    if (isTeacherPreview) {
      state.displayName = "Lehrkraftvorschau";
      document.body.classList.add("teacher-preview-mode");
      openTeacherPreview(previewStarter);
      return;
    }
    renderHome();
    if (!state.displayName) openProfile(true);
  }

  function blankState() {
    return { schemaVersion: "1.0", packageId: PACKAGE.id, packageVersion: PACKAGE.version, displayName: "", createdAt: now(), updatedAt: now(), missed: {}, attempts: [] };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (parsed && parsed.packageId === PACKAGE.id && Array.isArray(parsed.attempts)) return { ...blankState(), ...parsed, missed: parsed.missed || {} };
    } catch (_) { /* Verständliche Oberfläche statt Konsolenfehler. */ }
    return blankState();
  }

  function saveState() {
    if (isTeacherPreview) return;
    state.updatedAt = now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function bindEvents() {
    $("#code-form").addEventListener("submit", handleCode);
    $("#profile-button").addEventListener("click", () => openProfile(false));
    $("#profile-cancel").addEventListener("click", () => { if (state.displayName) els.profileDialog.close(); });
    $("#profile-form").addEventListener("submit", saveProfile);
    $("#leave-starter").addEventListener("click", leaveStarter);
    $("#export-button").addEventListener("click", exportTxt);
    $("#import-input").addEventListener("change", handleImportFile);
    $("#import-cancel").addEventListener("click", () => { pendingImport = null; els.importDialog.close(); });
    $("#import-confirm").addEventListener("click", confirmImport);
    window.addEventListener("beforeunload", () => { if (session) saveState(); });
  }

  function openProfile(required) {
    $("#display-name").value = state.displayName || "";
    $("#profile-cancel").hidden = required;
    $("#profile-error").textContent = "";
    els.profileDialog.showModal();
    setTimeout(() => $("#display-name").focus(), 40);
  }

  function saveProfile(event) {
    event.preventDefault();
    const value = $("#display-name").value.trim().replace(/\s+/g, " ");
    if (value.length < 2) {
      $("#profile-error").textContent = "Bitte gib einen Anzeigenamen mit mindestens zwei Zeichen ein.";
      $("#profile-error").className = "form-message error";
      return;
    }
    state.displayName = value;
    saveState();
    els.profileDialog.close();
    renderHome();
    toast("Anzeigename gespeichert.");
  }

  function handleCode(event) {
    event.preventDefault();
    const input = $("#access-code");
    const starter = starterByCode(input.value);
    const message = $("#code-message");
    if (!starter) {
      message.textContent = "Dieser Code passt zu keinem verfügbaren Starter. Prüfe Buchstaben und Zahlen.";
      message.className = "form-message error";
      input.focus();
      return;
    }
    message.textContent = "";
    const status = getStatus(starter.id);
    const mode = status.regularComplete ? "practice" : status.missed ? "makeup" : "regular";
    startStarter(starter, mode);
    input.value = "";
  }

  function attemptsFor(starterId) { return state.attempts.filter((attempt) => attempt.starterId === starterId); }
  function completedAttempt(starterId, mode) { return attemptsFor(starterId).find((attempt) => attempt.mode === mode && attempt.completed); }

  function getStatus(starterId) {
    const attempts = attemptsFor(starterId);
    const regularComplete = attempts.some((a) => a.mode === "regular" && a.completed);
    const makeupComplete = attempts.some((a) => a.mode === "makeup" && a.completed);
    const practiceCount = attempts.filter((a) => a.mode === "practice" && a.completed).length;
    const incomplete = attempts.filter((a) => !a.completed).sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0];
    const missed = Boolean(state.missed[starterId]) && !regularComplete;
    let key = "unseen", label = "Noch nicht geöffnet";
    if (missed) { key = "missed"; label = "Offen"; }
    if (incomplete) { key = "started"; label = "Begonnen"; }
    if (makeupComplete) { key = "madeup"; label = practiceCount ? `Nachgeholt · ${practiceCount}× freiwillig wiederholt` : "Nachgeholt"; }
    if (regularComplete) { key = "complete"; label = practiceCount ? `Regulär erledigt · ${practiceCount}× freiwillig wiederholt` : "Regulär erledigt"; }
    return { key, label, regularComplete, makeupComplete, practiceCount, incomplete, missed };
  }

  function renderHome() {
    $("#welcome-line").textContent = state.displayName ? `¡Hola, ${state.displayName}! Bereit für die nächste Station?` : "Lege kurz deinen Anzeigenamen fest.";
    const makeup = starters.filter((s) => getStatus(s.id).missed && !getStatus(s.id).makeupComplete);
    const practice = starters.filter((s) => getStatus(s.id).regularComplete || getStatus(s.id).makeupComplete);
    renderMiniList($("#makeup-list"), makeup, "makeup", "Noch nichts offen – buen trabajo.");
    renderMiniList($("#practice-list"), practice, "practice", "Erledigte Starter erscheinen später hier.");
    const completed = starters.filter((s) => ["complete", "madeup"].includes(getStatus(s.id).key)).length;
    $("#route-summary").textContent = `${completed} von ${starters.length} Stationen abgeschlossen`;
    $("#route-grid").setAttribute("aria-label", `${starters.length} Stationen deiner Lernroute`);
    $("#route-grid").innerHTML = starters.map((starter) => {
      const status = getStatus(starter.id);
      const resume = status.incomplete ? `<button class="button button-secondary resume-button" data-attempt="${status.incomplete.attemptId}" data-starter="${starter.id}">Fortsetzen</button>` : "";
      return `<article class="route-card" data-route-status="${status.key}"><span class="number">${starter.number}</span><h3>${escapeHtml(starter.title)}</h3><p>${escapeHtml(starter.subtitle)}</p><div><span class="status-pill" data-status="${status.key}"><span aria-hidden="true">${statusSymbol(status)}</span>${escapeHtml(status.label)}</span></div>${resume}</article>`;
    }).join("");
    $$(".resume-button").forEach((button) => button.addEventListener("click", () => resumeStarter(button.dataset.starter, button.dataset.attempt)));
  }

  function renderMiniList(root, list, mode, empty) {
    root.innerHTML = list.length ? list.map((s) => `<div class="mini-starter"><span><strong>${s.number}. ${escapeHtml(s.title)}</strong><small> · ${s.estimatedMinutes} Min.</small></span><button class="button button-quiet" data-id="${s.id}">${mode === "makeup" ? "Nachholen" : "Üben"}</button></div>`).join("") : `<div class="empty-state">${empty}</div>`;
    $$("button[data-id]", root).forEach((button) => button.addEventListener("click", () => startStarter(starters.find((s) => s.id === button.dataset.id), mode)));
  }

  function startStarter(starter, mode) {
    if (!state.displayName) { openProfile(true); return; }
    if (mode === "regular") {
      starters.filter((s) => s.number < starter.number).forEach((earlier) => {
        const status = getStatus(earlier.id);
        if (!status.regularComplete && !status.makeupComplete) state.missed[earlier.id] ||= { detectedAt: now(), triggerStarterId: starter.id };
      });
    }
    const attempt = {
      attemptId: `${starter.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      starterId: starter.id, contentVersion: starter.contentVersion, mode, startedAt: now(), endedAt: null,
      durationMs: null, completed: false, currentBlock: 0, seed: Math.floor(Math.random() * 1e9), items: {}, score: null,
      metadata: { focus: [...starter.focus], packageVersion: PACKAGE.version },
    };
    state.attempts.push(attempt);
    saveState();
    openSession(starter, attempt);
  }

  function resumeStarter(starterId, attemptId) {
    const starter = starters.find((s) => s.id === starterId);
    const attempt = state.attempts.find((a) => a.attemptId === attemptId);
    if (starter && attempt && !attempt.completed) openSession(starter, attempt);
  }

  function openSession(starter, attempt) {
    session = { starter, attempt };
    els.home.hidden = true; els.starter.hidden = false;
    $("#starter-kicker").textContent = `Starter ${starter.number} · ${modeLabel(attempt.mode)}`;
    $("#starter-title").textContent = starter.title;
    $("#starter-subtitle").textContent = starter.subtitle;
    $("#focus-chips").innerHTML = starter.focus.map((f) => `<span class="chip">${escapeHtml(f)}</span>`).join("");
    renderBlock();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function modeLabel(mode) { return ({ regular: "regulär", makeup: "Nachholen", practice: "Übung", preview: "Lehrkraftvorschau" })[mode] || mode; }

  function leaveStarter() {
    if (!session) return;
    if (isTeacherPreview) { window.location.href = "lehrkraft-vorschau.html"; return; }
    saveState(); session = null; els.starter.hidden = true; els.home.hidden = false; renderHome(); window.scrollTo({ top: 0 });
  }

  function openTeacherPreview(starter) {
    const attempt = {
      attemptId: `preview-${starter.id}`,
      starterId: starter.id,
      contentVersion: starter.contentVersion,
      mode: "preview",
      startedAt: now(), endedAt: null, durationMs: null, completed: false,
      currentBlock: 0, seed: Math.floor(Math.random() * 1e9), items: {}, score: null,
      metadata: { focus: [...starter.focus], packageVersion: PACKAGE.version, nonPersistentPreview: true },
    };
    openSession(starter, attempt);
    els.starter.insertAdjacentHTML("afterbegin", `<aside class="teacher-preview-banner"><strong>Lehrkraftvorschau</strong><span>Diese Simulation speichert und verändert keine Schülerdaten.</span><a href="lehrkraft-vorschau.html">Zur Kontrollansicht</a></aside>`);
  }

  function renderBlock() {
    const { starter, attempt } = session;
    const index = attempt.currentBlock;
    if (index >= starter.blocks.length) return finishAttempt();
    const block = starter.blocks[index];
    $("#progress-label").textContent = `Block ${index + 1} von ${starter.blocks.length}`;
    $("#progress-bar").style.width = `${(index / starter.blocks.length) * 100}%`;
    els.taskArea.innerHTML = `<article class="task-card"><p class="eyebrow">Bloque ${index + 1}</p><h2>${escapeHtml(block.title)}</h2><p class="task-instruction">${escapeHtml(block.instruction)}</p><div id="block-content"></div><div id="block-message" class="form-message" aria-live="polite"></div><div class="task-actions"><button id="check-block" class="button button-primary" type="button">Antwort prüfen</button></div></article>`;
    const root = $("#block-content");
    if (["text-set", "choice-set", "select-set"].includes(block.type)) renderItemSet(block, root);
    if (block.type === "match") renderMatch(block, root);
    if (block.type === "sort") renderSort(block, root);
    if (block.type === "subject-set") renderSubjectSet(block, root);
    const blockItems = block.items || block.pairs;
    if (blockItems.every((item) => attempt.items[item.id]?.resolvedBy)) armAdvanceButton();
    else $("#check-block").onclick = () => checkBlock(block);
    root.querySelector("input,button,select")?.focus();
  }

  function renderItemSet(block, root) {
    const order = shuffled(block.items, session.attempt.seed + hash(block.id));
    root.innerHTML = order.map((item) => {
      const record = session.attempt.items[item.id];
      const locked = record?.resolvedBy;
      let control = "";
      if (item.input === "text") control = `<input data-item="${item.id}" aria-label="Antwort zu ${escapeAttr(item.prompt)}" autocomplete="off" spellcheck="false" ${locked ? "disabled" : ""}>`;
      if (item.input === "select") control = `<select data-item="${item.id}" aria-label="Antwort zu ${escapeAttr(item.prompt)}" ${locked ? "disabled" : ""}><option value="">Bitte wählen</option>${shuffled(item.options, session.attempt.seed + hash(item.id)).map((o) => `<option>${escapeHtml(o)}</option>`).join("")}</select>`;
      if (item.input === "choice") control = `<div class="choice-grid" data-choice-group="${item.id}">${shuffled(item.options, session.attempt.seed + hash(item.id)).map((o) => `<button type="button" class="choice-card" aria-pressed="false" data-value="${escapeAttr(o)}" ${locked ? "disabled" : ""}>${escapeHtml(o)}</button>`).join("")}</div>`;
      const gloss = item.gloss ? `<details class="meaning-help"><summary>Bedeutung anzeigen</summary><span>${escapeHtml(item.gloss)}</span></details>` : "";
      return `<div class="item" data-item-wrap="${item.id}"><div class="item-label">${escapeHtml(item.prompt)}</div>${gloss}${control}<div class="feedback ${record?.resolvedBy === "correct" || record?.resolvedBy === "corrected" ? "ok" : record?.resolvedBy === "revealed" ? "warn" : ""}" ${record?.resolvedBy ? "" : "hidden"}>${record?.resolvedBy ? feedbackResolved(record) : ""}</div></div>`;
    }).join("");
    $$(".choice-card", root).forEach((button) => button.addEventListener("click", () => {
      const group = button.closest("[data-choice-group]");
      $$(".choice-card", group).forEach((b) => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
    }));
  }

  function renderMatch(block, root) {
    const pairs = shuffled(block.pairs, session.attempt.seed + hash(block.id));
    const rights = shuffled(block.pairs.map((p) => p.right), session.attempt.seed + hash(block.id + "R"));
    root.innerHTML = `<div class="match-grid"><div class="match-column"><h3>${block.leftLabel}</h3>${pairs.map((p) => {
      const record = session.attempt.items[p.id];
      return `<div class="match-item" data-item-wrap="${p.id}"><button type="button" class="tap-card ${record?.resolvedBy ? "matched" : ""}" data-left="${p.id}" ${record?.resolvedBy ? "disabled" : ""}>${escapeHtml(p.left)}<span class="pair-token">${record?.resolvedBy ? `↔ ${escapeHtml(record.finalAnswer)}` : ""}</span></button><div class="feedback ${record?.resolvedBy === "revealed" ? "warn" : "ok"}" ${record?.resolvedBy ? "" : "hidden"}>${record?.resolvedBy ? feedbackResolved(record) : ""}</div></div>`;
    }).join("")}</div><div class="match-column"><h3>${block.rightLabel}</h3>${rights.map((r) => `<button type="button" class="tap-card" data-right="${escapeAttr(r)}">${escapeHtml(r)}</button>`).join("")}</div></div>`;
    let active = null;
    $$('[data-left]', root).forEach((button) => button.addEventListener("click", () => {
      if (button.disabled) return;
      $$('[data-left]', root).forEach((b) => b.classList.remove("selected")); active = button.dataset.left; button.classList.add("selected");
    }));
    $$('[data-right]', root).forEach((button) => button.addEventListener("click", () => {
      if (!active || button.disabled) return;
      const left = $(`[data-left="${active}"]`, root); left.dataset.answer = button.dataset.right;
      $(".pair-token", left).textContent = `↔ ${button.dataset.right}`;
      left.classList.remove("selected"); active = null;
    }));
  }

  function renderSort(block, root) {
    root.innerHTML = `<div class="sort-grid">${shuffled(block.items, session.attempt.seed + hash(block.id)).map((item) => {
      const record = session.attempt.items[item.id];
      return `<div class="sort-item" data-item-wrap="${item.id}"><label>${escapeHtml(item.label)}</label><div class="choice-grid" data-choice-group="${item.id}">${shuffled(block.categories, session.attempt.seed + hash(item.id + "categories")).map((c) => `<button type="button" class="choice-card" aria-pressed="${record?.resolvedBy && normalize(record.finalAnswer, false) === normalize(c, false) ? "true" : "false"}" data-value="${escapeAttr(c)}" ${record?.resolvedBy ? "disabled" : ""}>${escapeHtml(c)}</button>`).join("")}</div><div class="feedback ${record?.resolvedBy === "revealed" ? "warn" : "ok"}" ${record?.resolvedBy ? "" : "hidden"}>${record?.resolvedBy ? feedbackResolved(record) : ""}</div></div>`;
    }).join("")}</div>`;
    $$(".choice-card", root).forEach((button) => button.addEventListener("click", () => {
      const group = button.closest("[data-choice-group]"); $$(".choice-card", group).forEach((b) => b.setAttribute("aria-pressed", "false")); button.setAttribute("aria-pressed", "true");
    }));
  }

  function renderSubjectSet(block, root) {
    const order = shuffled(block.items, session.attempt.seed + hash(block.id));
    root.innerHTML = order.map((item) => {
      const record = session.attempt.items[item.id];
      const locked = record?.resolvedBy;
      const subjectOptions = shuffled(item.subjectOptions, session.attempt.seed + hash(item.id + "subject"));
      const pronounOptions = shuffled(item.pronounOptions, session.attempt.seed + hash(item.id + "pronoun"));
      return `<div class="item subject-item" data-item-wrap="${item.id}"><div class="item-label">${escapeHtml(item.sentence)}</div><div class="subject-steps"><label>1. Sujeto<select data-subject-item="${item.id}" aria-label="Sujeto en: ${escapeAttr(item.sentence)}" ${locked ? "disabled" : ""}><option value="">Bitte wählen</option>${subjectOptions.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}</select></label><label>2. Pronombre<select data-pronoun-item="${item.id}" aria-label="Pronombre para: ${escapeAttr(item.sentence)}" ${locked ? "disabled" : ""}><option value="">Bitte wählen</option>${pronounOptions.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}</select></label></div><div class="feedback ${record?.resolvedBy === "correct" || record?.resolvedBy === "corrected" ? "ok" : record?.resolvedBy === "revealed" ? "warn" : ""}" ${record?.resolvedBy ? "" : "hidden"}>${record?.resolvedBy ? feedbackResolved(record) : ""}</div></div>`;
    }).join("");
  }

  function checkBlock(block) {
    const items = block.items || block.pairs;
    let missing = false;
    const answers = {};
    items.forEach((item) => {
      if (session.attempt.items[item.id]?.resolvedBy) return;
      let value = "";
      const input = $(`[data-item="${item.id}"]`);
      if (input) value = input.value;
      const group = $(`[data-choice-group="${item.id}"]`);
      if (group) value = $('.choice-card[aria-pressed="true"]', group)?.dataset.value || "";
      const left = $(`[data-left="${item.id}"]`);
      if (left) value = left.dataset.answer || "";
      const subject = $(`[data-subject-item="${item.id}"]`);
      const pronoun = $(`[data-pronoun-item="${item.id}"]`);
      if (subject || pronoun) value = subject?.value && pronoun?.value ? `${subject.value} → ${pronoun.value}` : "";
      if (!String(value).trim()) missing = true;
      answers[item.id] = value;
    });
    if (missing) {
      const message = $("#block-message"); message.textContent = "Bitte beantworte alle noch offenen Teile, bevor du prüfst."; message.className = "form-message error"; return;
    }
    $("#block-message").textContent = "";
    items.forEach((item) => {
      if (session.attempt.items[item.id]?.resolvedBy) return;
      const expected = item.answers || [item.right || item.category];
      const result = classifyAnswer(answers[item.id], expected, item.input === "text");
      recordCheck(block, item, answers[item.id], result);
      updateItemFeedback(block, item);
    });
    saveState();
    const complete = items.every((item) => session.attempt.items[item.id]?.resolvedBy);
    if (complete) armAdvanceButton();
  }

  function armAdvanceButton() {
    const button = $("#check-block");
    button.textContent = session.attempt.currentBlock === session.starter.blocks.length - 1 ? "Starter abschließen" : "Weiter zum nächsten Block";
    button.onclick = advanceBlock;
  }

  function recordCheck(block, item, answer, result) {
    const competency = item.competency || block.competency || "Sprache";
    const errorCategory = item.errorCategory || block.errorCategory || "inhaltlich";
    const record = session.attempt.items[item.id] ||= { itemId: item.id, blockId: block.id, competency, errorCategory, firstAnswer: null, firstCorrect: null, attempts: [], hintsUsed: [], finalAnswer: null, finalCorrect: false, resolvedBy: null };
    const checkedAt = now();
    if (record.firstAnswer === null) { record.firstAnswer = answer; record.firstCorrect = result === "correct"; record.firstResult = result; }
    record.attempts.push({ answer, checkedAt, result });
    const failures = record.attempts.filter((a) => a.result !== "correct").length;
    if (result === "correct") {
      record.finalAnswer = answer; record.finalCorrect = true; record.resolvedBy = record.firstCorrect ? "correct" : "corrected";
    } else if (failures >= 3) {
      record.hintsUsed.push("solution"); record.finalAnswer = item.solution || expectedText(item); record.finalCorrect = false; record.resolvedBy = "revealed";
    } else {
      const hintKey = failures === 1 ? "hint1" : "hint2"; if (!record.hintsUsed.includes(hintKey)) record.hintsUsed.push(hintKey);
    }
  }

  function updateItemFeedback(block, item) {
    const record = session.attempt.items[item.id];
    let wrap = $(`[data-item-wrap="${item.id}"]`);
    let feedback = wrap ? $(".feedback", wrap) : $("#match-feedback");
    if (!feedback) {
      feedback = document.createElement("div"); feedback.className = "feedback"; $("#match-feedback")?.append(feedback);
    }
    if (record.resolvedBy) {
      feedback.hidden = false; feedback.className = `feedback ${record.resolvedBy === "revealed" ? "warn" : "ok"}`; feedback.textContent = feedbackResolved(record);
      disableItem(item.id, record);
      return;
    }
    const failures = record.attempts.filter((a) => a.result !== "correct").length;
    const last = record.attempts.at(-1);
    feedback.hidden = false; feedback.className = `feedback ${last.result === "almost" ? "warn" : "bad"}`;
    const prefix = last.result === "almost" ? "Fast richtig – Akzent, Schreibweise oder Zeichensetzung prüfen. " : "Noch nicht richtig. ";
    feedback.textContent = prefix + (failures === 1 ? item.hint1 : item.hint2);
    if ($(`[data-left="${item.id}"]`)) { const left = $(`[data-left="${item.id}"]`); delete left.dataset.answer; $(".pair-token", left).textContent = ""; }
  }

  function disableItem(itemId, record) {
    const wrap = $(`[data-item-wrap="${itemId}"]`);
    if (wrap) $$('input,select,button', wrap).forEach((el) => el.disabled = true);
    const left = $(`[data-left="${itemId}"]`); if (left) { left.disabled = true; left.classList.add("matched"); }
  }

  function feedbackResolved(record) {
    if (record.resolvedBy === "correct") return positiveFeedback(record.itemId);
    if (record.resolvedBy === "corrected") return "¡Bien corregido!";
    return `Lösung: ${record.finalAnswer}. Schau dir die Form kurz an; die Aufgabe ist jetzt abgeschlossen.`;
  }

  function positiveFeedback(itemId) {
    const messages = ["¡Muy bien!", "¡Perfecto!", "¡Bien hecho!", "¡Fantástico!", "¡Genial!"];
    return messages[Math.abs(hash(itemId || "feedback")) % messages.length];
  }

  function advanceBlock() {
    session.attempt.currentBlock += 1; saveState(); renderBlock(); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishAttempt() {
    const attempt = session.attempt;
    attempt.completed = true; attempt.endedAt = now(); attempt.durationMs = new Date(attempt.endedAt) - new Date(attempt.startedAt);
    const records = Object.values(attempt.items); const total = records.length;
    attempt.score = {
      total, firstCorrect: records.filter((r) => r.firstCorrect).length,
      corrected: records.filter((r) => r.resolvedBy === "corrected").length,
      finalCorrect: records.filter((r) => r.finalCorrect).length,
      revealed: records.filter((r) => r.resolvedBy === "revealed").length,
      percentFirst: total ? Math.round(records.filter((r) => r.firstCorrect).length / total * 100) : 0,
    };
    saveState();
    $("#progress-bar").style.width = "100%"; $("#progress-label").textContent = "Abgeschlossen";
    els.taskArea.innerHTML = `<article class="task-card completion"><div class="completion-mark" aria-hidden="true">✓</div><p class="eyebrow">¡Bien hecho!</p><h2>${escapeHtml(session.starter.title)} ist geschafft.</h2><p class="result-number">${attempt.score.percentFirst}%</p><p>deiner Antworten waren beim ersten verbindlichen Prüfen richtig. ${attempt.score.corrected ? `${attempt.score.corrected} Antwort${attempt.score.corrected === 1 ? "" : "en"} hast du erfolgreich korrigiert.` : ""}</p><button id="finish-home" class="button button-primary" type="button">Zur Übersicht</button></article>`;
    $("#finish-home").addEventListener("click", leaveStarter);
  }

  function classifyAnswer(value, accepted, allowTypo = false) {
    const exact = normalize(value, false);
    if (accepted.some((a) => normalize(a, false) === exact)) return "correct";
    const loose = normalize(value, true);
    if (accepted.some((a) => normalize(a, true) === loose)) return "almost";
    if (allowTypo) {
      const nearest = Math.min(...accepted.map((a) => editDistance(loose, normalize(a, true))));
      if (nearest <= 1 && loose.length > 3) return "almost";
    }
    return "wrong";
  }

  function normalize(value, stripAccents) {
    let result = String(value || "").trim().toLocaleLowerCase("es-ES").replace(/[¡!¿?.,;:()“”"']/g, "").replace(/\s+/g, " ");
    if (stripAccents) result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return result;
  }

  function editDistance(a, b) {
    const row = [...Array(b.length + 1).keys()];
    for (let i = 1; i <= a.length; i++) { let prev = row[0]; row[0] = i; for (let j = 1; j <= b.length; j++) { const temp = row[j]; row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = temp; } }
    return row[b.length];
  }

  function exportTxt() {
    if (!state.displayName) { openProfile(true); return; }
    const statuses = Object.fromEntries(starters.map((s) => [s.id, { number: s.number, title: s.title, contentVersion: s.contentVersion, ...getStatus(s.id) }]));
    Object.values(statuses).forEach((s) => delete s.incomplete);
    const payload = { schemaVersion: "1.0", format: "ruta-espana-readable-json", packageId: PACKAGE.id, packageVersion: PACKAGE.version, displayName: state.displayName, exportedAt: now(), progress: { statuses, missed: state.missed }, attempts: state.attempts };
    const completed = starters.filter((s) => ["complete", "madeup"].includes(getStatus(s.id).key)).length;
    const lines = [
      "RUTA POR ESPAÑA – KUMULIERTE ERGEBNIS- UND SICHERUNGSDATEI", "",
      `Anzeigename: ${state.displayName}`, `Exportiert: ${formatDateTime(payload.exportedAt)}`, `Paket: ${PACKAGE.id} · Version ${PACKAGE.version}`, `Fortschritt: ${completed} von ${starters.length} Startern abgeschlossen`, "",
      "STATUS DER STARTER", ...starters.map((s) => `${s.number}. ${s.title}: ${getStatus(s.id).label}`), "",
      "BEARBEITUNGEN", ...state.attempts.map(humanAttempt), "", "Der folgende JSON-Block dient der sicheren Wiederherstellung und Lehrkraftauswertung. Nicht verändern.", EXPORT_BEGIN, JSON.stringify(payload, null, 2), EXPORT_END, "",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `Spanisch_Starterpaket1_${safeFileName(state.displayName)}_${new Date().toISOString().slice(0, 10)}.txt`; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 500);
    toast("Sicherungsdatei gespeichert.");
  }

  function humanAttempt(attempt) {
    const starter = starters.find((s) => s.id === attempt.starterId); const score = attempt.score;
    return `- ${starter?.number || "?"}. ${starter?.title || attempt.starterId} | ${modeLabel(attempt.mode)} | ${attempt.completed ? "abgeschlossen" : "begonnen"} | Start ${formatDateTime(attempt.startedAt)}${score ? ` | Erstlösungen ${score.firstCorrect}/${score.total} | Dauer ${formatDuration(attempt.durationMs)}` : ""}`;
  }

  async function handleImportFile(event) {
    const file = event.target.files[0]; event.target.value = ""; if (!file) return;
    try {
      const parsed = parseExport(await file.text()); validateImport(parsed);
      pendingImport = parsed;
      $("#import-preview").innerHTML = `<dl><dt>Anzeigename</dt><dd>${escapeHtml(parsed.displayName)}</dd><dt>Export</dt><dd>${formatDateTime(parsed.exportedAt)}</dd><dt>Bearbeitungen</dt><dd>${parsed.attempts.length}</dd><dt>Lokaler Stand</dt><dd>${state.attempts.length} Bearbeitungen</dd></dl>`;
      els.importDialog.showModal();
    } catch (error) { toast(error.message || "Die Datei konnte nicht gelesen werden.", 5000); }
  }

  function parseExport(text) {
    const start = text.indexOf(EXPORT_BEGIN), end = text.indexOf(EXPORT_END);
    if (start < 0 || end < 0 || end <= start) throw new Error("Kein gültiger Ruta-por-España-Datenblock gefunden.");
    try { return JSON.parse(text.slice(start + EXPORT_BEGIN.length, end).trim()); } catch (_) { throw new Error("Der Datenblock ist beschädigt oder unvollständig."); }
  }

  function validateImport(data) {
    if (!data || data.schemaVersion !== "1.0") throw new Error("Diese Schema-Version wird nicht unterstützt.");
    if (data.packageId !== PACKAGE.id) throw new Error("Die Datei gehört zu einem anderen Lernpaket.");
    if (!Array.isArray(data.attempts) || typeof data.displayName !== "string") throw new Error("Pflichtangaben fehlen in der Datei.");
  }

  function confirmImport() {
    if (!pendingImport) return;
    const byId = new Map(state.attempts.map((a) => [a.attemptId, a]));
    pendingImport.attempts.forEach((incoming) => {
      const local = byId.get(incoming.attemptId);
      if (!local) byId.set(incoming.attemptId, incoming);
      else if ((!local.completed && incoming.completed) || compareAttemptTime(incoming, local) > 0) byId.set(incoming.attemptId, incoming);
    });
    state.attempts = [...byId.values()].sort((a, b) => a.startedAt.localeCompare(b.startedAt));
    Object.entries(pendingImport.progress?.missed || {}).forEach(([id, value]) => { state.missed[id] ||= value; });
    if (!state.displayName) state.displayName = pendingImport.displayName;
    saveState(); pendingImport = null; els.importDialog.close(); renderHome(); toast("Fortschritt wurde sicher zusammengeführt.");
  }

  function compareAttemptTime(a, b) { return new Date(a.endedAt || a.startedAt) - new Date(b.endedAt || b.startedAt); }
  function formatDateTime(value) { return value ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "–"; }
  function formatDuration(ms) { if (!Number.isFinite(ms)) return "–"; const seconds = Math.round(ms / 1000); return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")} min`; }
  function safeFileName(value) { return value.trim().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, ""); }
  function hash(value) { return [...value].reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0); }
  function shuffled(array, seed) { const out = [...array]; let x = Math.abs(seed) || 1; for (let i = out.length - 1; i > 0; i--) { x = (x * 16807) % 2147483647; const j = x % (i + 1); [out[i], out[j]] = [out[j], out[i]]; } return out; }
  function expectedText(item) { return item.solution || item.answers?.[0] || item.right || item.category; }
  function statusSymbol(status) {
    if (status.incomplete) return "◐ ";
    if (status.practiceCount) return "↻ ";
    if (status.key === "complete" || status.key === "madeup") return "✓ ";
    if (status.key === "missed") return "! ";
    return "○ ";
  }
  function toast(message, delay = 3000) { els.toast.textContent = message; els.toast.hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(() => els.toast.hidden = true, delay); }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c]); }
  function escapeAttr(value) { return escapeHtml(value); }
})();
