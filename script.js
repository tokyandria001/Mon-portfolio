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

    // Détails supplémentaires pour chaque événement
    const eventDetails = {
        event1: {
            year: '2016 - 2020',
            formation: 'Baccalauréat Scientifique (Mention Assez Bien)',
            details: "J'ai obtenu mon baccalauréat scientifique avec mention assez-bien. Pendant mes années de seconde à terminale, j'ai choisi les options ICN (Informatique et Création Numérique) et ISN (Informatique et Sciences du Numérique) afin de développer mes compétences en programmation et d'acquérir des bases solides en informatique. C'est à cette période que j'ai découvert ma passion pour le développement web et l'aéronautique, deux secteurs qui me fascinent encore aujourd'hui"
        },
        event2: {
            year: '2020 - 2022',
            formation: 'Licence MPCIE / MI',
            details: "J'ai débuté mes études supérieures avec une licence MPCIE dans le but de poursuivre une carrière dans le secteur aérien. Cependant, la crise du Covid-19 a profondément bouleversé mes projets, car ce secteur a été sévèrement impacté. Cette situation m'a conduit à revoir mes aspirations professionnelles et à me réorienter vers de nouvelles opportunités, notamment dans le domaine de l'informatique."
        },
        event3: {
            year: '2022 - 2024',
            formation: 'Licence en Informatique',
            details: "Les différents cours d'informatique rencontré en Licence MPCIE m'ont conduit à poursuivre en Licence Informatique. Je suis donc actuellement en Licence 3 Professionnelle en applications web, afin d'acquérir des compétences solides en développement web."
        },
        event4: {
            year: 'Depuis 2024',
            formation: 'Licence Professionnelle en applications web',
            details: "La licence en informatique étant principalement composée de cours théoriques, j'avais envie de 'mettre la main à la pâte' et de mettre directement en pratique mes compétences acquises. C'est pourquoi j'ai décidé de poursuivre mes études en Licence Professionnelle, afin de pouvoir réaliser un stage de 4 mois en entreprise. Cette expérience pratique me permet de renforcer mes connaissances et de mieux comprendre les défis du monde professionnel, tout en développant des compétences concrètes en lien avec mes projets futurs."
        }
    };

    // Fonction pour ouvrir le panneau latéral
    infoTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const eventId = this.parentElement.id; // ID de l'événement (event1, event2, event3)
            const event = eventDetails[eventId];

            // Remplir le panneau avec les informations de l'événement cliqué
            panelInfo.innerHTML = `
                <h2>${event.year}</h2><br/>
                <p>${event.formation}</p><br/>
                <p><strong>Détails:</strong> ${event.details}</p>
            `;

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