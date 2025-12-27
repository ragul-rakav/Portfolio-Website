const k='ks_theme'
const doc=document.documentElement
const btn=document.getElementById('theme-toggle')
const links=document.querySelectorAll('.nav-link')
const secs=document.querySelectorAll('section')

function themeNow(){
  const s=localStorage.getItem(k)
  if(s) return s
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function apply(t){
  if(t==='dark') doc.classList.add('dark')
  else doc.classList.remove('dark')
  btn.setAttribute('aria-pressed', t==='dark')
}

function toggle(){
  const n=doc.classList.contains('dark') ? 'light' : 'dark'
  apply(n)
  localStorage.setItem(k,n)
}

btn.addEventListener('click', toggle)

function setActive(id){
  links.forEach(l=>{
    l.classList.toggle('active', l.dataset.section===id)
  })
}

document.querySelector('.nav').addEventListener('click', e=>{
  const a=e.target.closest('.nav-link')
  if(!a) return
  const id=a.dataset.section
  setActive(id)
  const s=document.getElementById(id)
  if(s) s.scrollIntoView({behavior:'smooth'})
})

const obs=new IntersectionObserver((ents)=>{
  ents.forEach(en=>{
    if(en.isIntersecting) setActive(en.target.id)
  })
},{root:null,rootMargin:'-65px 0px -85% 0px',threshold:0})

secs.forEach(s=>obs.observe(s))

apply(themeNow())
