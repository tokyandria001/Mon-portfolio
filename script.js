pageTransition = () => {
    var timeline = gsap.timeline();

    timeline.to("header", {
        zIndex: 1
    });

    timeline.to(".page-transition", {
        duration: 0.7,
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

// PRESENTATION

document.addEventListener("DOMContentLoaded", function () {
    const infoTabs = document.querySelectorAll('.info-tab');
    const sidePanel = document.getElementById('side-panel');
    const closeBtn = document.getElementById('close-btn');
    const panelInfo = document.getElementById('panel-info');

    // Fonction pour ouvrir le panneau latéral
    infoTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const eventContent = this.previousElementSibling; // Contenu de l'événement
            const year = eventContent.querySelector('h3').textContent;
            const formation = eventContent.querySelector('p').textContent;

            // Remplir le panneau avec les informations de l'événement cliqué
            panelInfo.innerHTML = `<h2>${year}</h2><p>${formation}</p>`;

            // Ouvrir le panneau latéral
            sidePanel.classList.add('open');
        });
    });

    // Fonction pour fermer le panneau latéral
    closeBtn.addEventListener('click', function () {
        sidePanel.classList.remove('open');
    });
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
    const hamburger = document.querySelector('.hamburger');
    const menuItems = document.querySelector('.menu-items');
    
    hamburger.classList.toggle('active');
    menuItems.classList.toggle('active');
}