
const overlay=document.querySelector('.overlay');
const openBtn=document.querySelector('.menu-btn');
const closeBtn=document.querySelector('.close');
if(openBtn) openBtn.addEventListener('click',()=>overlay.classList.add('open'));
if(closeBtn) closeBtn.addEventListener('click',()=>overlay.classList.remove('open'));
document.querySelectorAll('.overlay a').forEach(a=>a.addEventListener('click',()=>overlay.classList.remove('open')));

document.querySelectorAll('.archive-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.archive-tabs button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.archive-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

const form=document.querySelector('#contact-form');
if(form && !form.action.includes('YOUR-FORMSPREE-ID')){
  // live endpoint configured
} else if(form) {
  form.addEventListener('submit',e=>{
    e.preventDefault();
    alert('CONTACTフォームは公開前に送信先を設定します。');
  });
}
