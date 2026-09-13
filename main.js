// LOADER
window.addEventListener('load',()=>{
  setTimeout(()=>{document.getElementById('loader').classList.add('out')},2000)
});

// NAV
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60)
});

// MOBILE MENU
function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open')
}

// SCROLL ANIMATIONS
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));

// COUNTER ANIMATION
function animCount(el,target,suffix){
  let n=0;const step=Math.ceil(target/50);
  const t=setInterval(()=>{
    n=Math.min(n+step,target);
    el.textContent=n+suffix;
    if(n>=target)clearInterval(t)
  },25)
}
const cObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-target]').forEach(el=>{
        animCount(el,parseInt(el.dataset.target),el.dataset.suffix||'+')
      });
      cObs.unobserve(e.target)
    }
  })
},{threshold:0.5});
document.querySelectorAll('.hero-stats,.stats-row').forEach(el=>cObs.observe(el));

// TESTIMONIAL SLIDER
let sIdx=0;
const track=document.getElementById('testTrack');
const cards=track.querySelectorAll('.test-card');
const dots=document.querySelectorAll('#testDots .dot');
function updSlider(){
  const vis=window.innerWidth<=768?1:3;
  const max=Math.max(0,cards.length-vis);
  sIdx=Math.max(0,Math.min(sIdx,max));
  const w=cards[0].offsetWidth+22;
  track.style.transform=`translateX(-${sIdx*w}px)`;
  dots.forEach((d,i)=>d.classList.toggle('active',i===sIdx))
}
function slideTest(d){sIdx+=d;updSlider()}
function goToSlide(i){sIdx=i;updSlider()}
window.addEventListener('resize',updSlider);

// FAQ
function toggleFaq(el){
  const item=el.parentElement;
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f=>f.classList.remove('open'));
  if(!isOpen)item.classList.add('open')
}

// FORM
function showFormToast(msg,type){
  const t=document.getElementById('formToast');
  t.textContent=msg;t.className='form-toast '+type;
  t.scrollIntoView({behavior:'smooth',block:'nearest'})
}
function clearErrs(){
  document.querySelectorAll('input.err,select.err').forEach(el=>el.classList.remove('err'));
  document.querySelectorAll('.ferr.show').forEach(el=>el.classList.remove('show'));
  document.getElementById('formToast').className='form-toast'
}
function fieldErr(inputId,errId){
  const el=document.getElementById(inputId);
  const err=document.getElementById(errId);
  if(el)el.classList.add('err');
  if(err)err.classList.add('show')
}
function submitForm(){
  clearErrs();let valid=true;
  const name=document.getElementById('f-name');
  const phone=document.getElementById('f-phone');
  const course=document.getElementById('f-course');
  if(!name||!name.value.trim()){fieldErr('f-name','err-name');valid=false}
  if(!phone||!phone.value.trim()){fieldErr('f-phone','err-phone');valid=false}
  if(!course||!course.value){fieldErr('f-course','err-course');valid=false}
  if(!valid){showFormToast('Шаардлагатай талбаруудыг бөглөнө үү.','err-t');return}
  const btn=document.getElementById('submitBtn');
  btn.disabled=true;btn.textContent='Илгээж байна...';
  setTimeout(()=>{
    document.getElementById('regForm').style.display='none';
    document.getElementById('formSuccess').style.display='block'
  },900)
}
['f-name','f-phone','f-course'].forEach(id=>{
  const el=document.getElementById(id);
  if(el)el.addEventListener('input',()=>{
    el.classList.remove('err');
    const err=document.getElementById('err-'+id.replace('f-',''));
    if(err)err.classList.remove('show');
    document.getElementById('formToast').className='form-toast'
  })
});

// NEWSLETTER
function subscribeNL(){
  const inp=document.getElementById('nlEmail');
  if(!inp||!inp.value.includes('@')){
    inp.style.borderColor='#ef4444';return
  }
  inp.style.borderColor='';inp.value='';
  const t=document.getElementById('nlToast');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000)
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(href==='#')return;
    e.preventDefault();
    const target=document.querySelector(href);
    if(target)target.scrollIntoView({behavior:'smooth',block:'start'})
  })
});
