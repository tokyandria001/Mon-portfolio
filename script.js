pageTransition = () => {
    var timeline = gsap.timeline();

    timeline.to("header", {
        zIndex: 1
    });

    timeline.to(".page-transition", {
        duration: 1,
        height: "100%",
        top: "0%"
    });

    timeline.to(".page-transition", {
        duration: .8,
        height: "100%",
        top: "100%",
        delay: .3
    });

    timeline.set(".page-transition", {
        top: "-100%"
    });
}

mainAnimation = () => {
    var timeline = gsap.timeline();
    
    timeline.from("header", {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: {
            amount: .4
        },
        delay: .8
    });
}

delay = (n) => {
    n = n || 2000;
    return new Promise((done)=> {
        setTimeout(()=> {
            done();
        }, n);
    })
}

barba.init({
    sync: true,
    transitions: [
        {
            async leave(data){
                const done = this.async();
                pageTransition();
                await delay(1000);
                done();
            },

            async enter (data){
                mainAnimation();
            },

            async once(data){
                mainAnimation();
            }
        }
    ]
});


// COMPETENCES

document.addEventListener("DOMContentLoaded", function() {
    let prev = document.querySelector("#prev");
    let suiv = document.querySelector("#suiv");
    let image = document.querySelector(".images");
    let items = document.querySelectorAll(".images .ite");
    let contents = document.querySelectorAll(".content .items");

    let rotate = 0;
    let active = 0;
    let countItem = items.length;
    let rotateAdd = 360 / countItem;

    function show(){
        image.style.setProperty('--rotate', rotate + 'deg');
        contents.forEach((content, key) => {
            if(key == active){
                content.classList.add('active');
            } else{
                content.classList.remove('active');
            }
        });
    }

    function nextSlider(){
        active = active + 1 > countItem - 1 ? 0 : active + 1;
        rotate = rotate + rotateAdd;
        show();
    }
    suiv.onclick = nextSlider;

    function prevSlider(){
        active = active - 1 < 0 ? countItem -1 : active - 1;
        rotate = rotate - rotateAdd;
        show();
    }
    prev.onclick = prevSlider;
});

const text = document.querySelector("#text");

const textLong = text.getComputedTextLength();

text.style.strokeDasharray = textLong;
text.style.strokeDashoffset = textLong;

text.animate([
    {strokeDashoffset: textLong},
    {strokeDashoffset: 0}
], {
    duration: 4000,
    easing: 'cubic-bezier(.38, .57, 1, .5)'
}).onfinish = () => {
    text.style.strokeDasharray = 'none';
    text.style.strokeDashoffset = '0';
};

function toggleMenu() {
    const menu = document.querySelector('.menu-items');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active'); // Afficher / cacher le menu
    hamburger.classList.toggle('active'); // Ajouter l'animation hamburger
}