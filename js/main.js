// On attend que toute la fenêtre (images incluses) soit chargée
window.addEventListener('load', function() {
    
    // On sélectionne tous les éléments à animer
    const elements = document.querySelectorAll('.animate-text');

    // On déclenche l'apparition avec un petit délai
    setTimeout(() => {
        elements.forEach((el) => {
            el.classList.add('visible');
        });
        console.log("Animation Fatou terminée !");
    }, 400);

});
// Gestion de l'envoi du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche le rechargement de la page
        alert("Merci ! Votre message a bien été envoyé à l'équipe AfriTalent.");
        contactForm.reset(); // Vide le formulaire
    });
}