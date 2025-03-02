// Sélection du bouton du menu burger et du menu mobile
const menuBurger = document.querySelector(".burger");
const menuMobile = document.querySelector(".menu-mobile");

// Sélection de tous les boutons du menu burger (fermeture au clic)
const menuBurgerButtons = document.getElementsByClassName("menuBurgerButton");

console.log(menuBurgerButtons); // Affichage dans la console pour vérifier les éléments sélectionnés

// Ajout d'un événement pour ouvrir/fermer le menu burger
menuBurger.addEventListener("click", () => {
    const openMenu = document.querySelector(".menu-mobile-open");
    
    // Vérifie si le menu est ouvert pour le fermer, sinon l'ouvrir
    if (openMenu) {
        menuMobile.className = "menu-mobile menu-mobile-close";
    } else {
        menuMobile.className = "menu-mobile menu-mobile-open";
    }
});

// Ajout d'un événement à chaque bouton du menu pour fermer le menu lors d'un clic
for (let i = 0; i < menuBurgerButtons.length; i++) {
    const menuBurgerButton = menuBurgerButtons[i];
    menuBurgerButton.addEventListener("click", () => {
        console.log("nnnn"); // Affichage dans la console pour voir si l'événement fonctionne
        menuMobile.className = "menu-mobile menu-mobile-close"; // Fermeture du menu
    });
}

// Ajout d'un défilement fluide lorsque l'on clique sur un lien du menu
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            // Vérifie si la section cible existe avant d'effectuer le scroll
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Ajustement pour éviter que le titre soit caché
                    behavior: "smooth" // Animation fluide
                });
            }
        });
    });

    // Ajoute une classe au header lorsqu'on scrolle pour changer son apparence
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});

// Effet d'animation lorsque les sections apparaissent à l'écran
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    // Création d'un observateur qui détecte quand une section entre dans le champ de vision
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Ajoute la classe pour animer la section
            }
        });
    }, { threshold: 0.1 }); // Détecte lorsque 10% de la section est visible

    sections.forEach(section => {
        observer.observe(section); // Applique l'observateur à chaque section
    });
});

// Gestion du slider/carrousel
let currentSlide = 0;
const categories = document.querySelectorAll('.slider-category');

function showSlide(index) {
    // Gestion des limites pour que le slider tourne en boucle
    if (index >= categories.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = categories.length - 1;
    } else {
        currentSlide = index;
    }

    // Cache toutes les catégories avant d'afficher la bonne
    categories.forEach((category, i) => {
        category.style.display = 'none';
    });

    // Affiche uniquement la catégorie actuelle
    categories[currentSlide].style.display = 'flex';
}

// Initialise le carrousel en affichant le premier élément
showSlide(currentSlide);

// Fonction pour naviguer dans le slider
function moveSlide(step) {
    showSlide(currentSlide + step);
}

// Gestion du formulaire de contact
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupération des valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const response = document.getElementById('form-response');

        // Vérification des champs remplis
        if (name && email && message) {
            response.textContent = "Merci, votre message a été envoyé avec succès !";
            response.classList.add('success');
            response.classList.remove('error');
            document.getElementById('contact-form').reset(); // Réinitialise le formulaire
        } else {
            response.textContent = "Veuillez remplir tous les champs.";
            response.classList.add('error');
            response.classList.remove('success');
        }

        // Animation du message de réponse
        response.style.opacity = 1;
        response.style.transform = "translateY(0)";
    });
});

// Gestion de la mise en surbrillance des liens du menu en fonction du scroll
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");

    // Fonction qui met à jour la classe active du menu en fonction de la section visible
    function setActiveLink() {
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;

            // Vérifie si la section est visible dans la fenêtre
            if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight - 50) {
                currentSection = section.id;
            }
        });

        // Supprime la classe "active" de tous les liens du menu
        links.forEach(link => link.classList.remove("active"));

        // Ajoute la classe "active" au lien correspondant à la section visible
        if (currentSection) {
            document.querySelector(`a[href="#${currentSection}"]`).classList.add("active");
        }
    }

    // Applique la classe active au chargement de la page
    setActiveLink();

    // Ajout des événements pour détecter les clics sur les liens du menu
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            links.forEach(l => l.classList.remove("active")); // Retire l'ancienne classe active
            this.classList.add("active"); // Ajoute la classe active au lien cliqué
        });
    });

    // Détecte le scroll pour mettre à jour le menu
    window.addEventListener("scroll", setActiveLink);
});


