// ======================
// DARK MODE
// Ajoute/retire la classe "dark-mode" sur le body au clic, et sauvegarde
// le choix dans localStorage pour qu'il persiste quand on change de page
// ======================

const themeToggle = document.getElementById("theme-toggle");

// Au chargement de la page, si un thème sombre était déjà enregistré, on l'applique tout de suite
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    }

});

// ======================
// NAVBAR AU SCROLL
// Ajoute la classe "scrolled" sur la navbar dès qu'on descend de plus de 50px,
// ce qui déclenche l'effet visuel (ombre, réduction de padding) défini en CSS
// ======================

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// ======================
// ANIMATION FADE-IN AU SCROLL
// Utilise IntersectionObserver pour détecter quand une section .fade-in
// entre dans la partie visible de l'écran, et lui ajoute alors la classe
// .visible qui déclenche la transition CSS (opacité + léger déplacement)
// ======================

const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2 // se déclenche dès que 20% de l'élément est visible
});

fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
});

// ======================
// BOUTON RETOUR EN HAUT
// Le bouton reste caché tant qu'on n'a pas scrollé de plus de 300px,
// puis remonte la page en douceur (smooth scroll) au clic
// ======================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }

});

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ======================
// COMPTEURS ANIMÉS AU SCROLL
// Anime chaque nombre .counter de 0 jusqu'à sa valeur cible (data-target)
// dès qu'il entre dans le viewport, via requestAnimationFrame pour un
// rendu fluide. unobserve() empêche l'animation de se relancer à chaque scroll
// ======================

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100; // vitesse de l'animation

            const updateCounter = function () {
                current += increment;
                if (current < target) {
                    el.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target;
                }
            };

            updateCounter();
            counterObserver.unobserve(el); // anime une seule fois
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(function (el) {
    counterObserver.observe(el);
});

// ======================
// VALIDATION FORMULAIRE DE CONTACT
// Empêche l'envoi réel du formulaire (e.preventDefault) et vérifie chaque
// champ un par un : requis, format email par regex, longueur minimum du
// message. Affiche une erreur sous le champ concerné ou un message de
// succès si tout est valide
// ======================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // empêche l'envoi réel du formulaire

        let isValid = true;

        // Récupération des champs
        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        // Regex : texte@texte.texte (format email basique)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // --- Validation NOM ---
        if (nom.value.trim() === "") {
            showError(nom, "error-nom", "Le nom est requis.");
            isValid = false;
        } else {
            clearError(nom, "error-nom");
        }

        // --- Validation PRÉNOM ---
        if (prenom.value.trim() === "") {
            showError(prenom, "error-prenom", "Le prénom est requis.");
            isValid = false;
        } else {
            clearError(prenom, "error-prenom");
        }

        // --- Validation EMAIL ---
        if (email.value.trim() === "") {
            showError(email, "error-email", "L'email est requis.");
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, "error-email", "Format d'email invalide.");
            isValid = false;
        } else {
            clearError(email, "error-email");
        }

        // --- Validation SUJET ---
        if (sujet.value === "") {
            showError(sujet, "error-sujet", "Veuillez choisir un sujet.");
            isValid = false;
        } else {
            clearError(sujet, "error-sujet");
        }

        // --- Validation MESSAGE (minimum 20 caractères) ---
        if (message.value.trim().length < 20) {
            showError(message, "error-message", "Le message doit contenir au moins 20 caractères.");
            isValid = false;
        } else {
            clearError(message, "error-message");
        }

        // --- Si tout est valide : affiche le succès et réinitialise le formulaire ---
        if (isValid) {
            document.getElementById("successMessage").classList.remove("d-none");
            contactForm.reset();

            // Retire les classes de validation visuelles après reset
            [nom, prenom, email, sujet, message].forEach(function (field) {
                field.classList.remove("is-valid", "is-invalid");
            });
        } else {
            document.getElementById("successMessage").classList.add("d-none");
        }

    });

}

// Affiche une bordure rouge et un message d'erreur sous un champ invalide
function showError(field, errorId, messageText) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    document.getElementById(errorId).textContent = messageText;
}

// Affiche une bordure verte et efface le message d'erreur d'un champ valide
function clearError(field, errorId) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    document.getElementById(errorId).textContent = "";
}

// ======================
// FILTRAGE DYNAMIQUE DES FREELANCES
// Chaque carte a un attribut data-category (via les 4 boutons) et un
// attribut data-domain (via le menu déroulant). Au clic/changement, on
// compare cette valeur au filtre choisi et on cache (display: none) les
// cartes qui ne correspondent pas, sans recharger la page
// ======================

const filterButtons = document.querySelectorAll(".filter-btn");
const domainSelect = document.getElementById("domainFilter");
const freelanceCards = document.querySelectorAll("main .col[data-category]");

// Filtre par catégorie large (boutons Tous / Développement / Design / Data & IA)
function filterByCategory(category) {
    freelanceCards.forEach(function (card) {
        if (category === "tous" || card.getAttribute("data-category") === category) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Filtre par domaine précis (menu déroulant)
function filterByDomain(domain) {
    freelanceCards.forEach(function (card) {
        if (domain === "toutes" || card.getAttribute("data-domain") === domain) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

if (filterButtons.length > 0) {
    filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            // Réinitialise le style de tous les boutons, puis met en avant celui cliqué
            filterButtons.forEach(function (b) {
                b.classList.remove("btn-danger", "active");
                b.classList.add("btn-outline-danger");
            });
            btn.classList.remove("btn-outline-danger");
            btn.classList.add("btn-danger", "active");

            // Réinitialise le select pour éviter un conflit entre les deux filtres
            domainSelect.value = "toutes";
            filterByCategory(btn.getAttribute("data-filter"));
        });
    });
}

if (domainSelect) {
    domainSelect.addEventListener("change", function () {
        // Désélectionne les boutons puisque le select prend le relais
        filterButtons.forEach(function (b) {
            b.classList.remove("btn-danger", "active");
            b.classList.add("btn-outline-danger");
        });
        filterByDomain(domainSelect.value);
    });
}