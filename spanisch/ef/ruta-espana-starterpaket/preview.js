(function(){
  "use strict";
  const {PACKAGE,starters}=window.RUTA_DATA;
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
  let starterIndex=0,blockIndex=0,seed=Date.now()%2147483647,showSolutions=true;
  init();

  function init(){
    $("#preview-starters").innerHTML=starters.map((starter,index)=>`<button class="preview-starter-button" type="button" data-starter-index="${index}"><span>Starter ${starter.number}</span><br>${escapeHtml(starter.title)}</button>`).join("");
    $$("[data-starter-index]").forEach(button=>button.addEventListener("click",()=>{starterIndex=Number(button.dataset.starterIndex);blockIndex=0;render()}));
    $("#reshuffle-button").addEventListener("click",()=>{seed=(seed+104729)%2147483647;renderBlock()});
    $("#solutions-button").addEventListener("click",()=>{showSolutions=!showSolutions;renderSolutionState()});
    render();
  }

  function render(){
    const starter=starters[starterIndex];
    $$("[data-starter-index]").forEach((button,index)=>button.setAttribute("aria-current",String(index===starterIndex)));
    $("#preview-kicker").textContent=`${starter.id} · Inhalt ${starter.contentVersion} · Paket ${PACKAGE.version}`;
    $("#preview-title").textContent=starter.title;
    $("#preview-subtitle").textContent=`${starter.subtitle} · ${starter.focus.join(" · ")}`;
    $("#student-preview-link").href=`index.html?preview=${encodeURIComponent(starter.id)}`;
    $("#preview-blocks").innerHTML=starter.blocks.map((block,index)=>`<button class="preview-block-tab" type="button" data-block-index="${index}" aria-current="${index===blockIndex}">Block ${index+1}: ${escapeHtml(block.title)}</button>`).join("");
    $$("[data-block-index]").forEach(button=>button.addEventListener("click",()=>{blockIndex=Number(button.dataset.blockIndex);renderBlock()}));
    renderBlock();
  }

  function renderBlock(){
    const starter=starters[starterIndex],block=starter.blocks[blockIndex];
    $$("[data-block-index]").forEach((button,index)=>button.setAttribute("aria-current",String(index===blockIndex)));
    const content=block.type==="match"?renderMatch(block):block.type==="subject-set"?renderSubjectItems(block):renderItems(block);
    $("#preview-content").innerHTML=`<article class="preview-block"><header class="preview-block-head"><div><p class="eyebrow">${escapeHtml(block.id)}</p><h3>${escapeHtml(block.title)}</h3><p>${escapeHtml(block.instruction)}</p></div><span class="preview-type">${typeLabel(block.type)}</span></header>${content}</article>`;
    renderSolutionState();
  }

  function renderItems(block){
    const items=shuffled(block.items,seed+hash(block.id));
    return `<div class="preview-items">${items.map((item,index)=>{
      const competency=item.competency||block.competency||"Sprache";
      const category=item.errorCategory||block.errorCategory||"inhaltlich";
      const options=item.options||block.categories||[];
      const answer=item.answers?.[0]||item.category||item.solution;
      return `<section class="preview-item"><div class="preview-item-head"><h4>${index+1}. ${escapeHtml(item.prompt||item.label)}</h4><span class="preview-id">${escapeHtml(item.id)}</span></div>${item.gloss?`<p class="preview-gloss"><strong>Bedeutung:</strong> ${escapeHtml(item.gloss)}</p>`:""}${options.length?`<div class="preview-options">${shuffled(options,seed+hash(item.id)).map(option=>`<span class="preview-option" ${normalize(option)===normalize(answer)?"data-correct-option":""}>${escapeHtml(option)}</span>`).join("")}</div>`:""}<div class="preview-inspector"><div class="preview-detail"><strong>Hinweis 1</strong>${escapeHtml(item.hint1)}</div><div class="preview-detail"><strong>Hinweis 2</strong>${escapeHtml(item.hint2)}</div><div class="preview-detail"><strong>Kompetenz</strong>${escapeHtml(competency)}</div><div class="preview-detail"><strong>Fehlerkategorie</strong>${escapeHtml(category)}</div><div class="preview-detail preview-solution" data-solution><strong>Lösung</strong>${escapeHtml(item.solution)}${item.answers?.length>1?`<br><small>Akzeptiert: ${item.answers.map(escapeHtml).join(" · ")}</small>`:""}</div></div></section>`;
    }).join("")}</div>`;
  }

  function renderSubjectItems(block){
    const items=shuffled(block.items,seed+hash(block.id));
    return `<div class="preview-items">${items.map((item,index)=>`<section class="preview-item"><div class="preview-item-head"><h4>${index+1}. ${escapeHtml(item.sentence)}</h4><span class="preview-id">${escapeHtml(item.id)}</span></div><p><strong>1. Sujeto</strong></p><div class="preview-options">${shuffled(item.subjectOptions,seed+hash(item.id+"subject")).map(option=>`<span class="preview-option" ${normalize(option)===normalize(item.subjectAnswer)?"data-correct-option":""}>${escapeHtml(option)}</span>`).join("")}</div><p><strong>2. Pronombre</strong></p><div class="preview-options">${shuffled(item.pronounOptions,seed+hash(item.id+"pronoun")).map(option=>`<span class="preview-option" ${normalize(option)===normalize(item.pronounAnswer)?"data-correct-option":""}>${escapeHtml(option)}</span>`).join("")}</div><div class="preview-inspector"><div class="preview-detail"><strong>Hinweis 1</strong>${escapeHtml(item.hint1)}</div><div class="preview-detail"><strong>Hinweis 2</strong>${escapeHtml(item.hint2)}</div><div class="preview-detail"><strong>Kompetenz</strong>${escapeHtml(block.competency)}</div><div class="preview-detail"><strong>Fehlerkategorie</strong>${escapeHtml(block.errorCategory)}</div><div class="preview-detail preview-solution" data-solution><strong>Lösung</strong>${escapeHtml(item.solution)}</div></div></section>`).join("")}</div>`;
  }

  function renderMatch(block){
    const pairs=shuffled(block.pairs,seed+hash(block.id)),rights=shuffled(block.pairs.map(pair=>pair.right),seed+hash(block.id+"right"));
    return `<div class="preview-match"><div class="preview-match-column"><h4>${escapeHtml(block.leftLabel)}</h4>${pairs.map(pair=>`<div class="preview-match-card">${escapeHtml(pair.left)} <span class="preview-id">${escapeHtml(pair.id)}</span></div>`).join("")}</div><div class="preview-match-column"><h4>${escapeHtml(block.rightLabel)}</h4>${rights.map(right=>`<div class="preview-match-card">${escapeHtml(right)}</div>`).join("")}</div></div><div class="preview-items preview-match-solutions" data-solution>${pairs.map(pair=>`<section class="preview-item"><div class="preview-item-head"><h4>${escapeHtml(pair.solution)}</h4><span class="preview-id">${escapeHtml(pair.id)}</span></div><div class="preview-inspector"><div class="preview-detail"><strong>Hinweis 1</strong>${escapeHtml(pair.hint1)}</div><div class="preview-detail"><strong>Hinweis 2</strong>${escapeHtml(pair.hint2)}</div><div class="preview-detail"><strong>Kompetenz</strong>${escapeHtml(block.competency)}</div><div class="preview-detail"><strong>Fehlerkategorie</strong>${escapeHtml(block.errorCategory)}</div></div></section>`).join("")}</div>`;
  }

  function renderSolutionState(){
    $$('[data-solution]').forEach(element=>element.hidden=!showSolutions);
    $$('[data-correct-option]').forEach(element=>element.classList.toggle("solution",showSolutions));
    $("#solutions-button").setAttribute("aria-pressed",String(showSolutions));
    $("#solutions-button").textContent=showSolutions?"Lösungen ausblenden":"Lösungen einblenden";
  }
  function typeLabel(type){return({"text-set":"Freie Eingabe","choice-set":"Multiple Choice","select-set":"Pull-down","match":"Zuordnung","sort":"Sortierung","subject-set":"Subjekt in zwei Schritten"})[type]||type}
  function normalize(value){return String(value||"").trim().toLocaleLowerCase("es-ES").replace(/[¡!¿?.,;:()“”"']/g,"").replace(/\s+/g," ")}
  function hash(value){return[...value].reduce((a,c)=>((a<<5)-a+c.charCodeAt(0))|0,0)}
  function shuffled(array,start){const out=[...array];let x=Math.abs(start)||1;for(let i=out.length-1;i>0;i--){x=x*16807%2147483647;const j=x%(i+1);[out[i],out[j]]=[out[j],out[i]]}return out}
  function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[char])}
})();
