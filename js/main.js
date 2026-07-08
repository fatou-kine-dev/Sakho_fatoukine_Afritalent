// ======================
// DARK MODE
// ======================

const themeToggle = document.getElementById("theme-toggle");

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
// BOUTON RETOUR EN HAUT
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