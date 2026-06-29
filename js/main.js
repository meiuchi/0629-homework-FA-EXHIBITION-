// ===================================================
//  1. ハンバーガークリック（画面表示時に登録）
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.hamburger-navigation');

  if (hamburgerMenu && nav) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // ナビゲーションのメニュー内リンクを取得する
    const menuLinks = document.querySelectorAll('.nav-list a');
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }
});
  
// ===================================================
// 2. スクロールイベント
// ===================================================
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  // --- A. メインお花の拡大 ---
  const wrapper = document.querySelector('.animation-wrap');
  const PhotoContainer = document.querySelector('.mainvisual');

  if (wrapper && PhotoContainer) {
    const rectWrapper = wrapper.getBoundingClientRect();
    let progress = 0;

    if (rectWrapper.top > 0) {
      PhotoContainer.style.transform = "scale(1)";
    } else {
      const maxScroll = wrapper.offsetHeight - window.innerHeight;
      if (maxScroll > 0) {
        progress = -rectWrapper.top / maxScroll;
      }
      
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      const scaleValue = 1 + progress * 1.5;
      PhotoContainer.style.transform = `scale(${scaleValue})`;
    }
  }

  // --- B. ロゴ・ハンバーガー・サイドボタン表示 ---
  const headerLogo = document.querySelector('.logo img');
  const hamburger = document.querySelector('.hamburger-menu');
  const exhibitorBtn = document.querySelector('.EXHIBITOR-btn');
  const visitorBtn = document.querySelector('.VISITOR-btn');
  const animationWrap = document.querySelector('.animation-wrap');

  if (animationWrap) {
    const triggerPoint = animationWrap.offsetHeight;

    if (scrollPosition >= triggerPoint) {
      if (headerLogo) headerLogo.classList.add('is-visible');
      if (hamburger) hamburger.classList.add('is-visible');
      if (visitorBtn) visitorBtn.classList.add('is-visible');
      if (exhibitorBtn) exhibitorBtn.classList.add('is-visible');
    } else {
      if (headerLogo) headerLogo.classList.remove('is-visible');
      if (hamburger) hamburger.classList.remove('is-visible');
      if (visitorBtn) visitorBtn.classList.remove('is-visible');
      if (exhibitorBtn) exhibitorBtn.classList.remove('is-visible');
    }
  }

  // --- C. ふわっと出てくる動き ---
  const targets = document.querySelectorAll('.fade-in');
  targets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    const triggerPoint = window.innerHeight - 100;
    if (rect.top < triggerPoint) {
      target.classList.add('active');
    }
  });

  // --- D. accessエリアお花背景に変わる ＆ サイドボタン非表示連動 ---
  const body = document.body;
  const specialSection = document.querySelector('#access-area');

  if (specialSection) {
    const rectAccess = specialSection.getBoundingClientRect();
    const triggerStart = window.innerHeight * 0.2;
    
    if (rectAccess.top < triggerStart) {

      // 💡 アクセスエリアに入ったら、サイドボタンを引っ込める
      if (exhibitorBtn) exhibitorBtn.classList.remove('is-visible');
      if (visitorBtn) visitorBtn.classList.remove('is-visible');

      // お花背景
      const triggerEnd = -rectAccess.height + (window.innerHeight * 0.8);
      if(rectAccess.top > triggerEnd){
        body.classList.add('active');
    } else {
      body.classList.remove('active');
    } 
    
  } else {
    body.classList.remove('active');

      // 💡 アクセスエリア外で、かつメインビジュアルを過ぎていれば再表示
      if (animationWrap && scrollPosition >= animationWrap.offsetHeight) {
        if (exhibitorBtn) exhibitorBtn.classList.add('is-visible');
        if (visitorBtn) visitorBtn.classList.add('is-visible');
      }
    }
  }
}); 
  


