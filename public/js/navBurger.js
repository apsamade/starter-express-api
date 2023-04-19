let monBurger = document.querySelector('.burger')
let maAside = document.querySelector('aside')


monBurger.addEventListener('click', ()=>{
    console.log('ok')
    if(monBurger.classList.contains('croix')){
        monBurger.classList.remove('croix')
        maAside.style.right = '-301px';
        
    }else{
        monBurger.classList.add('croix')
        maAside.style.right = '0';
        
    }
})
