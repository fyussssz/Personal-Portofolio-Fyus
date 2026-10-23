
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

/* Hamburger Menu */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("#navbar ul");
const navLinks = navMenu.querySelectorAll("a");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

/* Tutup menu setelah link dipilih */
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Buka menu navigasi"
        );

        menuToggle.textContent = "☰";
    });
});

/* Active Navigation Link */
const sections = document.querySelectorAll(
    "#home, #about, #skills, #projects, #contact"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active-link",
                        link.getAttribute("href") ===
                            `#${entry.target.id}`
                    );
                });
            }
        });
    },
    {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

/* Tombol Back to Top */
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Mode Terang/Gelap */
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
    themeToggle.setAttribute(
        "aria-label",
        theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"
    );

    try {
        localStorage.setItem("theme", theme);
    } catch (e) {}
}

applyTheme(document.documentElement.getAttribute("data-theme") || "dark");

themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "light" ? "dark" : "light");
});

/* Layar Loading */
const loader = document.getElementById("loader");

function hideLoader() {
    loader.classList.add("hide");
    setTimeout(() => loader.remove(), 600);
}

window.addEventListener("load", () => {
    setTimeout(hideLoader, 1000);
});

