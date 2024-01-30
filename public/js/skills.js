skillsFront = document.querySelector('.front').querySelectorAll('li')
skillsBack = document.querySelector('.back').querySelectorAll('li')
skillSection = document.querySelector('.skills')

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        console.log('La section "skills" est maintenant visible.');
        document.querySelector('.front').classList.add(`apparition-1`);
        document.querySelector('.back').classList.add(`apparition-2`);
        setTimeout(() => {
            for (i = 0; i < skillsFront.length; i++) {
                skillsFront[i].classList.add(`skillsFront-${i + 1}`);
            }
            for (i = 0; i < skillsBack.length; i++) {
                skillsBack[i].classList.add(`skillsBack-${i + 1}`);
            }
        }, 300)
    } else {
        console.log('La section "skills" n\'est plus visible.');
        document.querySelector('.front').classList.remove(`apparition-1`);
        document.querySelector('.back').classList.remove(`apparition-2`);
        for (i = 0; i < skillsFront.length; i++) {
            skillsFront[i].classList.remove(`skillsFront-${i + 1}`);
        }
        for (i = 0; i < skillsBack.length; i++) {
            skillsBack[i].classList.remove(`skillsBack-${i + 1}`);
        }
    }
});

observer.observe(skillSection);


