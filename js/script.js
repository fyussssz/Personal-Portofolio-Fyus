
const typingElement = document.getElementById("typing");

const texts = [
    "Programmer",
    "Software Developer",
    "Web Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

typingElement.textContent = "";

function typeText() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
        // Mengetik satu huruf
        charIndex++;
        typingElement.textContent =
            currentText.substring(0, charIndex);

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 1500);
            return;
        }
    } else {
        // Menghapus satu huruf
        charIndex--;
        typingElement.textContent =
            currentText.substring(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;

            // Pindah ke teks berikutnya
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    setTimeout(typeText, isDeleting ? 80 : 150);
}

typeText();

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});