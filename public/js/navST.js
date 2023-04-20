const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
let timeoutId;

window.addEventListener('scroll', ()=>{
    const stickyNav = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting == true) {
    nav.classList.remove('sticky');
    nav.classList.remove('remonte');
    clearTimeout(timeoutId);
  } else if (entry.isIntersecting == false){
    nav.classList.add('sticky');
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      nav.classList.add('remonte');
      setTimeout(() => {
        nav.classList.remove('sticky');
      },  1.5 * 1000);
      setTimeout(() => {
        nav.classList.remove('remonte');
      },  1.5 * 1000);
    }, 1.3 * 3000);
       
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});



headerObserver.observe(header);
})

