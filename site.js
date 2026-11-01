'use strict';

// Public, browser-only walkthroughs. Every record below is illustrative.
// No agent API, microphone, device connection, personal record or network request.
(() => {
  const $ = id => document.getElementById(id);
  const text = (id, value) => { $(id).textContent = value; };
  const scenes = ['life', 'business', 'learning'];
  const sceneData = {
    life: {owner:'Jae’s day', icon:'#i-heart', kicker:'A small moment for you', title:'Time to take a breath.', note:'Your routine, gently remembered.', action:'Remind me in 10 min', initial:'J', tabletKicker:'A day with a little more room', tabletTitle:'One thing at a time.', rowOne:'Morning check-in', rowOneNote:'A reminder on your phone', rowTwo:'A moment of reflection', rowTwoNote:'Faith, in your own rhythm', insight:'Your next step is ready.', messages:[['A routine takes shape','A small moment, made easier.'],['A gentle voice cue','Right moment. Right device.'],['A clear response','Done, or a little later.']]},
    business: {owner:'Jae + Esther’s businesses', icon:'#i-grid', kicker:'From a signal to a next step', title:'A clear brief. Ready for you.', note:'Keep the context with the work.', action:'Open the draft', initial:'J', tabletKicker:'The work behind the work', tabletTitle:'Room to move forward.', rowOne:'Group the incoming signals', rowOneNote:'Feedback, questions and daily notes', rowTwo:'Prepare the next useful action', rowTwoNote:'A draft for the business owner', insight:'Each business keeps its own context.', messages:[['A signal arrives','Feedback becomes focus.'],['AI prepares a draft','A little less busywork.'],['The owner reviews','A clear next decision.']]},
    learning: {owner:'Simon + Sia’s learning', icon:'#i-book', kicker:'A question is a place to start', title:'Let’s try it another way.', note:'Keep the first answer. Try again.', action:'Explore a tutor hint', initial:'S', tabletKicker:'A little progress, every day', tabletTitle:'A next step for a curious mind.', rowOne:'Know today’s homework', rowOneNote:'One manageable task at a time', rowTwo:'Revisit a tricky question', rowTwoNote:'A hint, an explanation, another try', insight:'Learning today. Possibilities tomorrow.', messages:[['A question appears','Make room for curiosity.'],['A tutor offers a hint','Understand the why.'],['A fresh attempt','See what changed.']]}
  };
  const theatre = $('walkthrough');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let sceneIndex = 0;
  let elapsed = 0;
  let lastFrame = 0;
  let frame = 0;
  let previousStep = -1;
  let transitionTimer = 0;
  const sceneLength = 9000;

  function renderStep(step) {
    if (step === previousStep) return;
    previousStep = step;
    theatre.dataset.step = String(step);
    const researchStates = ['Searching official sources · example sequence','Comparing requirements and dates · example sequence','Preparing a learning plan to discuss · example sequence'];
    text('research-status',researchStates[step]);
    document.querySelectorAll('.research-flow span').forEach((item,index) => item.classList.toggle('is-current',index === step));
    const message = sceneData[scenes[sceneIndex]].messages[step];
    text('hero-message-label', message[0]);
    text('hero-message', message[1]);
  }
  function renderScene() {
    const key = scenes[sceneIndex];
    const d = sceneData[key];
    theatre.dataset.scene = key;
    theatre.setAttribute('aria-label', `Animated ${key} workflow example with sample device screens`);
    const values = {'hero-owner':d.owner,'hero-phone-kicker':d.kicker,'hero-phone-title':d.title,'hero-phone-note':d.note,'hero-phone-action':d.action,'hero-initial':d.initial,'hero-tablet-kicker':d.tabletKicker,'hero-tablet-title':d.tabletTitle,'hero-row-one':d.rowOne,'hero-row-one-note':d.rowOneNote,'hero-row-two':d.rowTwo,'hero-row-two-note':d.rowTwoNote,'hero-insight':d.insight};
    for (const [id, value] of Object.entries(values)) text(id, value);
    $('hero-icon').setAttribute('href',d.icon);
    theatre.querySelector('.scene-number').textContent = `0${sceneIndex + 1} / 03`;
    document.querySelectorAll('[data-scene-select]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sceneSelect === key)));
    previousStep = -1;
    renderStep(0);
    clearTimeout(transitionTimer);
    theatre.classList.remove('scene-change');
    if (!paused && !reduced.matches) {
      void theatre.offsetWidth;
      theatre.classList.add('scene-change');
      transitionTimer = window.setTimeout(() => theatre.classList.remove('scene-change'),750);
    }
  }
  function tick(now) {
    frame = 0;
    if (paused || document.hidden) { lastFrame = 0; return; }
    if (lastFrame) elapsed += Math.min(now - lastFrame,100);
    lastFrame = now;
    if (elapsed >= sceneLength) {
      elapsed %= sceneLength;
      sceneIndex = (sceneIndex + 1) % scenes.length;
      renderScene();
    }
    renderStep(Math.min(2,Math.floor(elapsed / 3000)));
    $('story-progress').style.transform = `scaleX(${(sceneIndex * sceneLength + elapsed) / (sceneLength * scenes.length)})`;
    frame = requestAnimationFrame(tick);
  }
  function syncPlayback() {
    document.documentElement.classList.toggle('motion-paused', paused || document.hidden);
    $('motion-toggle').setAttribute('aria-label',paused ? 'Play animations' : 'Pause animations');
    text('motion-symbol',paused ? '▷' : 'Ⅱ');
    text('story-progress-text',paused ? 'Animation paused' : '27-second walkthrough');
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    if (!paused && !document.hidden) frame = requestAnimationFrame(tick);
  }
  document.querySelectorAll('[data-scene-select]').forEach(button => {
    button.addEventListener('click',() => {
      sceneIndex = scenes.indexOf(button.dataset.sceneSelect);
      elapsed = 0;
      renderScene();
      $('story-progress').style.transform = `scaleX(${sceneIndex / scenes.length})`;
    });
  });
  $('motion-toggle').addEventListener('click',() => { paused = !paused; syncPlayback(); });
  reduced.addEventListener('change',e => { paused = e.matches; syncPlayback(); });

  const routines = {
    care:{title:'A break, before the day runs away.',description:'A gentle voice cue, a reminder on your device, and one clear way to respond.',cardTitle:'A little pause?',cardBody:'Your next task can wait for a breath.',icon:'#i-sun',voice:'A small pause, Jae. Stretch, take a breath, and come back when you’re ready.'},
    faith:{title:'A quiet moment for what grounds you.',description:'Make room for prayer, reflection, or a reading in the rhythm that feels right to you.',cardTitle:'A moment of stillness.',cardBody:'Your time for prayer and reflection.',icon:'#i-spark',voice:'Your quiet moment is here. Take a breath, make room for prayer, and reflect at your own pace.'},
    routine:{title:'Remember the routine. Keep the rhythm.',description:'A review, a household task, or a check-in: bring the reminder to the device you’re using.',cardTitle:'Your weekly review.',cardBody:'A few small things, ready to look over.',icon:'#i-bell',voice:'Your weekly review is ready. Take a look when you have a moment, and choose the next step.'}
  };
  let routine = 'care';
  let speaking = false;
  let utterance = null;
  function resetVoiceLabel() { speaking = false; text('voice-button-label','Hear a sample reminder'); }
  function stopVoice() {
    if (utterance && 'speechSynthesis' in window) {
      utterance.onend = null;
      utterance.onerror = null;
      window.speechSynthesis.cancel();
      text('voice-status','Sample stopped.');
    }
    utterance = null;
    resetVoiceLabel();
  }
  document.querySelectorAll('[data-routine]').forEach(button => {
    button.addEventListener('click',() => {
      stopVoice();
      text('voice-status','');
      routine = button.dataset.routine;
      const d = routines[routine];
      document.querySelectorAll('[data-routine]').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
      text('routine-title',d.title);text('routine-description',d.description);
      text('routine-card-title',d.cardTitle);text('routine-card-body',d.cardBody);
      text('voice-transcript',`“${d.voice}”`);
      $('routine-icon').setAttribute('href',d.icon);
    });
  });
  $('voice-button').addEventListener('click',() => {
    if (speaking) { stopVoice();text('voice-status','Sample stopped.');return; }
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      text('voice-status','Voice preview is unavailable in this browser. The sample text is shown above.');return;
    }
    utterance = new SpeechSynthesisUtterance(routines[routine].voice);
    utterance.lang = 'en-US';utterance.rate = .94;utterance.pitch = 1;
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.localService && /^en(-|_)/.test(v.lang)) || voices.find(v => /^en(-|_)/.test(v.lang));
    if (voice) utterance.voice = voice;
    utterance.onend = () => {resetVoiceLabel();utterance = null;text('voice-status','Sample finished.');};
    utterance.onerror = () => {resetVoiceLabel();utterance = null;text('voice-status','Voice preview could not play. You can read the sample above.');};
    speaking = true;text('voice-button-label','Stop sample reminder');text('voice-status','Sample playing on this device.');
    speechSynthesis.speak(utterance);
  });
  document.addEventListener('visibilitychange',() => { if (document.hidden) stopVoice();syncPlayback(); });
  window.addEventListener('pagehide',stopVoice);

  const businesses = {
    runstrict:{domain:'runstrict.com',name:'RunStrict',url:'https://runstrict.com',title:'Keep the game moving forward.',subtitle:'Player feedback becomes a focused release brief.',source:'Player feedback',input:'Listen to what matters.',chips:['Route accuracy','New challenges'],draft:'Find the next useful move.',output:'A release brief for Jae.',note:'What to fix, what to build, and why.',reviewer:'Jae',avatar:'jaedo',visual:'run'},
    tosburger:{domain:'tosburger.com',name:'TosBurger',url:'https://tosburger.com',title:'Keep speaking practice moving.',subtitle:'Learner questions become useful lesson and support drafts.',source:'Learner questions',input:'Notice where practice gets stuck.',chips:['Speaking blocks','Practice questions'],draft:'Turn patterns into support.',output:'A content brief for Jae.',note:'A lesson idea and a clearer support reply.',reviewer:'Jae',avatar:'jaedo',visual:'tos'},
    tap:{domain:'tap2.work',name:'TAP Work',url:'https://tap2.work',title:'A clearer next shift.',subtitle:'Shop notes become a practical follow-up and order draft.',source:'Daily shop notes',input:'Bring the shift into focus.',chips:['Opening checklist','Stock follow-up'],draft:'Organize the next shift.',output:'An operations brief for Jae.',note:'Tasks, stock questions, and an order to review.',reviewer:'Jae',avatar:'jaedo',visual:'tap'},
    openedu:{domain:'openedu4u.com',name:'OpenEdu',url:'https://openedu4u.com/openedu/',title:'A lesson that starts with listening.',subtitle:'An inquiry becomes a considered teacher-matching brief.',source:'Parent inquiry',input:'Understand the learner first.',chips:['Interests & goals','Lesson availability'],draft:'Prepare a thoughtful match.',output:'A matching brief for Esther.',note:'Teacher options and a lesson follow-up to review.',reviewer:'Esther',avatar:'hado',visual:'edu'}
  };
  document.querySelectorAll('[data-business]').forEach(button => {
    button.addEventListener('click',() => {
      const key = button.dataset.business;
      const d = businesses[key];
      document.querySelectorAll('[data-business]').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
      document.querySelector('.business-canvas').dataset.activeBusiness = key;
      const values = {'business-domain':d.domain,'business-story-title':d.title,'business-story-subtitle':d.subtitle,'business-source-label':d.source,'business-input-title':d.input,'business-chip-one':d.chips[0],'business-chip-two':d.chips[1],'business-draft-title':d.draft,'business-output-title':d.output,'business-output-note':d.note,'business-reviewer':`Ready for ${d.reviewer}’s review`};
      for (const [id,value] of Object.entries(values)) text(id,value);
      $('business-avatar').className = `avatar avatar-${d.avatar}`;
      $('business-avatar').setAttribute('aria-label',`${d.avatar} agent`);
      $('business-source-visual').className = `source-visual source-${d.visual}`;
      $('business-link').href = d.url;
      $('business-link').textContent = `Visit ${d.name} ↗`;
    });
  });
  const students = {
    simon:{name:'Simon',agent:'wondo',tasks:[['Practice fractions','Math'],['Read a chapter','Reading'],['Revisit one question','Review']],subject:'FRACTIONS',answer:'⅓ + ¼ = ',wrong:'²⁄₇',hint:'What number can both 3 and 4 divide into?',retry:'4/12 + 3/12 = 7/12',explanation:'A shared denominator keeps the pieces the same size.'},
    sia:{name:'Sia',agent:'siado',tasks:[['Read a short story','English'],['Practice new words','Vocabulary'],['Revisit one sentence','Review']],subject:'ENGLISH',answer:'She ',wrong:'go',after:' to school.',hint:'With she, he, or it, how does the verb change?',retry:'She goes to school.',explanation:'For this sentence, add -es to go after she.'}
  };
  function bindHomework() {
    $('homework-list').querySelectorAll('button').forEach(button => button.addEventListener('click',() => {
      const checked = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed',String(!checked));
    }));
  }
  bindHomework();
  function resetRetry() { $('retry-answer').hidden = true;$('retry-button').textContent = 'Explore the next attempt →';$('retry-button').setAttribute('aria-expanded','false'); }
  $('retry-button').setAttribute('aria-controls','retry-answer');
  $('retry-button').setAttribute('aria-expanded','false');
  $('retry-button').addEventListener('click',() => {
    const show = $('retry-answer').hidden;
    $('retry-answer').hidden = !show;
    $('retry-button').setAttribute('aria-expanded',String(show));
    $('retry-button').textContent = show ? 'Hide example retry ↑' : 'Explore the next attempt →';
  });
  document.querySelectorAll('[data-student]').forEach(button => {
    button.addEventListener('click',() => {
      const d = students[button.dataset.student];
      document.querySelectorAll('[data-student]').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
      text('student-name',d.name);text('note-subject',d.subject);text('tutor-name',`${d.agent}’s hint`);text('tutor-hint',d.hint);text('retry-text',d.retry);text('retry-explanation',d.explanation);
      $('tutor-avatar').className = `avatar avatar-${d.agent}`;
      const answer = $('original-answer');answer.replaceChildren(document.createTextNode(d.answer));
      const wrong = document.createElement('span');wrong.textContent = d.wrong;answer.append(wrong);
      if(d.after) answer.append(document.createTextNode(d.after));
      answer.classList.toggle('sentence',button.dataset.student === 'sia');
      const list = $('homework-list');list.replaceChildren();
      for(const [label,subject] of d.tasks) {
        const item = document.createElement('button');item.type = 'button';item.className = 'homework-item';item.setAttribute('aria-pressed','false');
        const circle = document.createElement('span');circle.className = 'task-circle';
        const title = document.createElement('span');title.textContent = label;
        const tag = document.createElement('small');tag.textContent = subject;
        item.append(circle,title,tag);list.append(item);
      }
      bindHomework();resetRetry();
    });
  });
  if ('IntersectionObserver' in window && !reduced.matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}});
    },{threshold:.08,rootMargin:'0px 0px 25px 0px'});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
  renderScene();syncPlayback();
})();
