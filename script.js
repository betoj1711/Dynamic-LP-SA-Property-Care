
// Slide-out menu + focus trap
(function(){
  const body = document.body;
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeDrawer');
  if(!btn || !drawer || !overlay || !closeBtn) return;

  const focusableSel = 'a,button,[href],[tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function openMenu(){
    lastFocused = document.activeElement;
    body.classList.add('menu-open');
    drawer.setAttribute('aria-hidden','false');
    btn.setAttribute('aria-expanded','true');
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', escClose);
    const first = drawer.querySelector(focusableSel);
    if(first) first.focus();
  }
  function closeMenu(){
    body.classList.remove('menu-open');
    drawer.setAttribute('aria-hidden','true');
    btn.setAttribute('aria-expanded','false');
    overlay.removeEventListener('click', closeMenu);
    document.removeEventListener('keydown', escClose);
    if(lastFocused) lastFocused.focus();
  }
  function escClose(e){ if(e.key === 'Escape') closeMenu(); }

  btn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Trap focus
  drawer.addEventListener('keydown', function(e){
    if(e.key !== 'Tab') return;
    const focusable = drawer.querySelectorAll(focusableSel);
    if(!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
  });
})();

// Formspree submit (ID: xnnzwgvq)
(function(){
  const form = document.getElementById('quoteForm');
  if(!form) return;
  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');

  function setStatus(msg, ok=true){
    if(!status) return;
    status.textContent = msg;
    status.style.color = ok ? '#0b4a2f' : '#8b0000';
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const original = submitBtn ? submitBtn.textContent : '';
    if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    setStatus && setStatus('');

    try{
      const res = await fetch('https://formspree.io/f/xnnzwgvq', {
        method:'POST',
        headers:{'Accept':'application/json'},
        body:new FormData(form)
      });
      const json = await res.json().catch(()=>({}));
      if(res.ok && !json.error){
        setStatus && setStatus('Thanks! We will reply shortly. You can reply to our email with photos if needed.', true);
        form.reset();
      }else{
        setStatus && setStatus('There was an issue sending your request. Please call us.', false);
      }
    }catch(err){
      setStatus && setStatus('Network error. Please call us.', false);
    }finally{
      if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = original || 'Submit'; }
    }
  });
})();
