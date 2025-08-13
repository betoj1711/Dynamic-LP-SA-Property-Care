(function(){
  const b=document.body,btn=document.getElementById('menuBtn'),d=document.getElementById('mobileDrawer'),o=document.getElementById('overlay'),x=document.getElementById('closeDrawer');
  if(!btn||!d||!o||!x) return;
  let lf=null;
  function openM(){ lf=document.activeElement; b.classList.add('menu-open'); d.setAttribute('aria-hidden','false'); btn.setAttribute('aria-expanded','true'); o.addEventListener('click', closeM); document.addEventListener('keydown', esc); }
  function closeM(){ b.classList.remove('menu-open'); d.setAttribute('aria-hidden','true'); btn.setAttribute('aria-expanded','false'); o.removeEventListener('click', closeM); document.removeEventListener('keydown', esc); if(lf) lf.focus(); }
  function esc(e){ if(e.key==='Escape') closeM(); }
  btn.addEventListener('click', openM);
  x.addEventListener('click', closeM);
  d.addEventListener('keydown', function(e){
    if(e.key!=='Tab') return;
    const f=d.querySelectorAll('a,button,[href],[tabindex]:not([tabindex="-1"])');
    if(!f.length) return;
    const first=f[0], last=f[f.length-1];
    if(e.shiftKey && document.activeElement===first){ last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement===last){ first.focus(); e.preventDefault(); }
  });
})();

(function(){
  const form=document.getElementById('quoteForm');
  if(!form) return;
  const status=document.getElementById('formStatus');
  const btn=form.querySelector('button[type="submit"]');
  function setS(msg, ok=true){ if(!status) return; status.textContent=msg; status.style.color = ok ? '#0b4a2f' : '#8b0000'; }
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const t=btn?btn.textContent:'';
    if(btn){ btn.disabled=true; btn.textContent='Sending…'; }
    setS('');
    try{
      const res = await fetch('https://formspree.io/f/xnnzwgvq', {method:'POST', headers:{'Accept':'application/json'}, body:new FormData(form)});
      const j = await res.json().catch(()=>({}));
      if(res.ok && !j.error){ setS('Thanks! We will reply shortly. You can reply to our email with photos if needed.', true); form.reset(); }
      else { setS('There was an issue sending your request. Please call us.', false); }
    }catch(err){
      setS('Network error. Please call us.', false);
    }finally{
      if(btn){ btn.disabled=false; btn.textContent=t||'Submit'; }
    }
  });
})();