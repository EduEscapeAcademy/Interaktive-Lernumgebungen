(function(){
  "use strict";
  const {PACKAGE,starters}=window.RUTA_DATA;
  const BEGIN="----- BEGIN RUTA-ESPANA-DATA v1 -----",END="----- END RUTA-ESPANA-DATA v1 -----";
  const DATES_KEY="rutaEspana:spanisch-vorkurs-01:deploymentDates:v1";
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  let filesData=[],dates=loadDates();
  init();
  function init(){
    $("#deployment-dates").innerHTML=starters.map(s=>`<label>Starter ${s.number}<input type="date" data-date="${s.id}" value="${dates[s.id]||""}"></label>`).join("");
    $$('[data-date]').forEach(i=>i.addEventListener("change",()=>{dates[i.dataset.date]=i.value;localStorage.setItem(DATES_KEY,JSON.stringify(dates));render();}));
    $("#starter-filter").innerHTML+=""+starters.map(s=>`<option value="${s.id}">${s.number}. ${s.title}</option>`).join("");
    $("#files").addEventListener("change",e=>readFiles([...e.target.files]));
    const zone=$("#drop-zone");
    ["dragenter","dragover"].forEach(n=>zone.addEventListener(n,e=>{e.preventDefault();zone.classList.add("dragging")}));
    ["dragleave","drop"].forEach(n=>zone.addEventListener(n,e=>{e.preventDefault();zone.classList.remove("dragging")}));
    zone.addEventListener("drop",e=>readFiles([...e.dataTransfer.files])); zone.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")$("#files").click()});
    ["#person-filter","#starter-filter","#competency-filter"].forEach(s=>$(s).addEventListener("change",render));
    $("#csv-button").addEventListener("click",exportCsv); $("#clear-button").addEventListener("click",()=>{filesData=[];render();});
  }
  async function readFiles(files){
    const notices=[];
    for(const file of files){
      try{const data=parse(await file.text());validate(data);filesData.push({fileName:file.name,...data});notices.push(`<div class="notice">${esc(file.name)} eingelesen.</div>`)}
      catch(error){notices.push(`<div class="notice error">${esc(file.name)}: ${esc(error.message)}</div>`)}
    }
    $("#file-notices").innerHTML=notices.join(""); dedupeExact(); populateFilters(); render();
  }
  function parse(text){const a=text.indexOf(BEGIN),b=text.indexOf(END);if(a<0||b<a)throw new Error("Kein gültiger Datenblock gefunden.");try{return JSON.parse(text.slice(a+BEGIN.length,b).trim())}catch(_){throw new Error("Datenblock beschädigt.")}}
  function validate(d){if(d.schemaVersion!=="1.0")throw new Error("Schema-Version nicht unterstützt.");if(d.packageId!==PACKAGE.id)throw new Error("Falsche Paket-ID.");if(!Array.isArray(d.attempts)||!d.displayName)throw new Error("Pflichtangaben fehlen.")}
  function dedupeExact(){const seen=new Set();filesData=filesData.filter(d=>{const key=d.displayName+"|"+d.exportedAt;if(seen.has(key))return false;seen.add(key);return true})}
  function populateFilters(){
    const current=$("#person-filter").value,names=[...new Set(filesData.map(d=>d.displayName))].sort();$("#person-filter").innerHTML='<option value="">Alle Personen</option>'+names.map(n=>`<option>${esc(n)}</option>`).join("");if(names.includes(current))$("#person-filter").value=current;
    const competencies=[...new Set(filesData.flatMap(d=>d.attempts.flatMap(a=>Object.values(a.items||{}).map(i=>i.competency).filter(Boolean))))].sort();$("#competency-filter").innerHTML='<option value="">Alle Kompetenzen</option>'+competencies.map(c=>`<option>${esc(c)}</option>`).join("");
  }
  function render(){
    const has=filesData.length>0;$("#dashboard").hidden=!has;$("#empty-dashboard").hidden=has;$("#csv-button").disabled=!has;$("#clear-button").disabled=!has;if(!has)return;
    const pf=$("#person-filter").value,sf=$("#starter-filter").value,cf=$("#competency-filter").value;
    const people=filesData.filter(d=>!pf||d.displayName===pf);
    const attempts=people.flatMap(person=>person.attempts.filter(a=>(!sf||a.starterId===sf)&&a.completed).map(a=>({person,...a})));
    const items=attempts.flatMap(a=>Object.values(a.items||{}).filter(i=>!cf||i.competency===cf).map(i=>({person:a.person.displayName,starterId:a.starterId,attempt:a,...i})));
    renderDuplicates(); renderMetrics(people,attempts,items); renderPeople(people); renderBars(attempts,items); renderWrong(items); renderAttempts(attempts);
  }
  function renderDuplicates(){const counts={};filesData.forEach(d=>counts[d.displayName]=(counts[d.displayName]||0)+1);const dup=Object.entries(counts).filter(([,n])=>n>1);$("#duplicate-warning").innerHTML=dup.length?`<div class="duplicate-card"><strong>Hinweis zu doppelten Anzeigenamen:</strong> ${dup.map(([n,c])=>`${esc(n)} (${c} Dateien)`).join(", ")}. Prüfe, ob verschiedene Personen denselben Namen verwendet haben.</div>`:""}
  function renderMetrics(people,attempts,items){
    const first=rate(items.filter(i=>i.firstCorrect).length,items.length);const eligible=items.filter(i=>!i.firstCorrect);const corrected=eligible.filter(i=>i.resolvedBy==="corrected").length;
    $("#metric-people").textContent=new Set(people.map(p=>p.displayName)).size;$("#metric-first").textContent=first+"%";$("#metric-correction").textContent=rate(corrected,eligible.length)+"%";$("#metric-time").textContent=formatDuration(avg(attempts.map(a=>a.durationMs).filter(Number.isFinite)));
  }
  function renderPeople(people){
    $("#people-body").innerHTML=people.map(p=>{const completed=starters.filter(s=>statusFromPayload(p,s.id).complete).length,open=starters.filter(s=>statusFromPayload(p,s.id).open).map(s=>s.number).join(", ")||"–";const attempts=p.attempts.filter(a=>a.completed),records=attempts.flatMap(a=>Object.values(a.items||{})),eligible=records.filter(i=>!i.firstCorrect),corrected=eligible.filter(i=>i.resolvedBy==="corrected").length,makeups=attempts.filter(a=>a.mode==="makeup").length,practices=attempts.filter(a=>a.mode==="practice").length;return `<tr><td><strong>${esc(p.displayName)}</strong><br><small>${esc(p.fileName)}</small></td><td class="progress-cell">${completed}/${starters.length}<div class="bar-track"><div class="bar-fill" style="width:${completed/starters.length*100}%"></div></div></td><td>${open}</td><td>${rate(records.filter(i=>i.firstCorrect).length,records.length)}%</td><td>${corrected}/${eligible.length}</td><td>${makeups}</td><td>${practices}</td><td>${formatDuration(avg(attempts.map(a=>a.durationMs).filter(Number.isFinite)))}</td></tr>`}).join("");
  }
  function statusFromPayload(p,id){const a=p.attempts.filter(x=>x.starterId===id),complete=a.some(x=>x.completed&&(x.mode==="regular"||x.mode==="makeup")),missed=Boolean(p.progress?.missed?.[id]);return{complete,open:missed&&!complete}}
  function renderBars(attempts,items){
    const starterRows=starters.map(s=>{const subset=items.filter(i=>i.starterId===s.id);return{label:`${s.number}. ${s.title}`,value:rate(subset.filter(i=>i.firstCorrect).length,subset.length),n:subset.length}});$("#starter-bars").innerHTML=bars(starterRows);
    $("#competency-bars").innerHTML=bars(groupRate(items,"competency"));$("#error-bars").innerHTML=bars(groupError(items));
  }
  function groupRate(items,key){const groups={};items.forEach(i=>(groups[i[key]||"Ohne Angabe"]||=[]).push(i));return Object.entries(groups).map(([label,a])=>({label,value:rate(a.filter(i=>i.firstCorrect).length,a.length),n:a.length})).sort((a,b)=>b.n-a.n)}
  function groupError(items){const wrong=items.filter(i=>!i.firstCorrect),groups={};wrong.forEach(i=>groups[i.errorCategory||"Ohne Angabe"]=(groups[i.errorCategory||"Ohne Angabe"]||0)+1);const max=Math.max(1,...Object.values(groups));return Object.entries(groups).map(([label,n])=>({label,value:Math.round(n/max*100),display:String(n),n})).sort((a,b)=>b.n-a.n)}
  function bars(rows){return rows.map(r=>`<div class="bar-row"><span>${esc(r.label)}</span><div class="bar-track" aria-label="${r.display||r.value+'%'}"><div class="bar-fill" style="width:${r.value}%"></div></div><strong>${r.display||r.value+'%'} <small>n=${r.n}</small></strong></div>`).join("")||'<p class="empty-state">Keine Daten im Filter.</p>'}
  function renderWrong(items){const counts={};items.filter(i=>!i.firstCorrect&&i.firstAnswer).forEach(i=>{const key=`${i.firstAnswer}|||${i.itemId}`;counts[key]=(counts[key]||0)+1});const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10);$("#wrong-list").innerHTML=rows.length?rows.map(([key,n])=>{const [answer,item]=key.split("|||");return`<li><strong>${esc(answer)}</strong> <small>(${esc(item)})</small> – ${n}×</li>`}).join(""):'<li class="empty-state">Keine falschen Erstlösungen im Filter.</li>'}
  function renderAttempts(attempts){$("#attempt-body").innerHTML=attempts.map(a=>{const s=starters.find(x=>x.id===a.starterId),day=a.startedAt?.slice(0,10),planned=dates[a.starterId],same=!planned||planned===day;return`<tr><td>${esc(a.person.displayName)}</td><td>${s?.number||"?"}. ${esc(s?.title||a.starterId)}</td><td>${mode(a.mode)}</td><td>${formatDate(a.startedAt)}</td><td>${formatDuration(a.durationMs)}</td><td>${!planned?'<small>Kein Einsatzdatum eingetragen</small>':same?'<span class="aligned">Datum stimmt überein</span>':`<span class="deviation">Abweichung: Einsatz ${formatDay(planned)}</span>`}</td></tr>`}).join("")}
  function exportCsv(){const pf=$("#person-filter").value,sf=$("#starter-filter").value,cf=$("#competency-filter").value;const rows=[["Anzeigename","Datei","Starter-ID","Starter","Modus","Beginn","Ende","Dauer Sekunden","Item-ID","Kompetenz","Fehlerkategorie","Erstantwort","Erstlösung richtig","Endantwort","Endstatus","Hinweise"]];filesData.filter(d=>!pf||d.displayName===pf).forEach(p=>p.attempts.filter(a=>(!sf||a.starterId===sf)&&a.completed).forEach(a=>Object.values(a.items||{}).filter(i=>!cf||i.competency===cf).forEach(i=>rows.push([p.displayName,p.fileName,a.starterId,starters.find(s=>s.id===a.starterId)?.title||"",a.mode,a.startedAt,a.endedAt,Math.round((a.durationMs||0)/1000),i.itemId,i.competency,i.errorCategory,i.firstAnswer,i.firstCorrect?"ja":"nein",i.finalAnswer,i.resolvedBy,(i.hintsUsed||[]).join("|")]))));const csv=rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(";")).join("\r\n");download("Ruta_Espana_Auswertung.csv","\ufeff"+csv,"text/csv;charset=utf-8")}
  function download(name,text,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
  function loadDates(){try{return JSON.parse(localStorage.getItem(DATES_KEY))||{}}catch(_){return{}}}function rate(a,b){return b?Math.round(a/b*100):0}function avg(a){return a.length?a.reduce((x,y)=>x+y,0)/a.length:NaN}function mode(m){return({regular:"regulär",makeup:"nachgeholt",practice:"wiederholt"})[m]||m}function formatDuration(ms){if(!Number.isFinite(ms))return"–";const s=Math.round(ms/1000);return`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")} min`}function formatDate(v){return v?new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}).format(new Date(v)):"–"}function formatDay(v){return v?new Intl.DateTimeFormat("de-DE").format(new Date(v+"T12:00:00")):"–"}function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[c])}
})();
