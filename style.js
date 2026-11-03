
// BASH'S BARBERSHOP - JAVASCRIPT

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");
        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);
    });
}

// CLOSE MENU AFTER CLICKING A LINK
if (navLinks) {
    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");

            if (menuToggle) {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });
}

// DYNAMIC WELCOME MESSAGE
const heroContent = document.querySelector(".hero-content");

if (heroContent) {
    const welcomeMessage = document.createElement("p");

    welcomeMessage.textContent =
        "Your style, your confidence, our priority.";

    welcomeMessage.classList.add("welcome-message");

    heroContent.appendChild(welcomeMessage);
}

// BACK TO TOP BUTTON
const backToTop = document.createElement("button");

backToTop.textContent = "↑";
backToTop.classList.add("back-to-top");
backToTop.setAttribute("aria-label", "Back to top");

document.body.appendChild(backToTop);

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// GALLERY LIGHTBOX

const galleryImages = document.querySelectorAll(".gallery-item img");

if (galleryImages.length > 0) {

    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close image">&times;</button>
        <img src="" alt="Enlarged gallery image">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".lightbox-close");

    galleryImages.forEach(function (image) {

        image.style.cursor = "pointer";

        image.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });

    });

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}


/* INTERACTIVE BARBERSHOP MAP */

function loadBarbershopMap() {

    const mapElement = document.getElementById("barbershop-map");

    if (!mapElement) return;

    if (typeof L === "undefined") {
        console.error("Leaflet map library did not load.");
        mapElement.innerHTML =
            "Map could not load. Please check your internet connection.";
        return;
    }

    const map = L.map("barbershop-map").setView(
        [-32.93456, 27.73977], 16
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19
        }
    ).addTo(map);

    const marker = L.marker([-32.93456, 27.73977]).addTo(map);

    marker.bindPopup(
        "<b>Bash's Barbershop</b><br>Mdantsane City Mall, NU6."
    );

    marker.openPopup();

    setTimeout(function () {
        map.invalidateSize();
    }, 300);
}

loadBarbershopMap();
// INQUIRY FORM VALIDATION
const inquiryForm = document.getElementById("inquiryForm");

if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (event) {

        const status = document.getElementById("inquiryStatus");

        if (!inquiryForm.checkValidity()) {
            event.preventDefault();
            inquiryForm.reportValidity();

            status.textContent = "Please complete all required fields correctly.";
            return;
        }

        status.textContent = "Your enquiry is being submitted. Please wait.";

    });
}
// CONTACT FORM VALIDATION
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {

        const status = document.getElementById("contactStatus");

        if (!contactForm.checkValidity()) {
            event.preventDefault();
            contactForm.reportValidity();

            status.textContent = "Please complete all required fields correctly.";
            return;
        }

        status.textContent = "Your message is being submitted. Please wait.";

    });
}
// SERVICE SEARCH AND FILTER
const serviceSearch = document.getElementById("serviceSearch");
const serviceFilter = document.getElementById("serviceFilter");
const serviceCards = document.querySelectorAll(".service-card");
const serviceResults = document.getElementById("serviceResults");

function filterServices() {

    if (!serviceSearch || !serviceFilter) return;

    const searchText = serviceSearch.value.toLowerCase();
    const selectedCategory = serviceFilter.value;

    let visibleServices = 0;

    serviceCards.forEach(function(card) {

        const serviceName = card.querySelector("h3").textContent.toLowerCase();
        const serviceDescription = card.querySelector("p").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch =
            serviceName.includes(searchText) ||
            serviceDescription.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            selectedCategory === category;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleServices++;
        } else {
            card.style.display = "none";
        }

    });

    serviceResults.textContent =
        visibleServices + " service(s) found.";
}

if (serviceSearch && serviceFilter) {
    serviceSearch.addEventListener("input", filterServices);
    serviceFilter.addEventListener("change", filterServices);
}
// APPOINTMENT FORM VALIDATION
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {

    const appointmentDate = document.getElementById("appointmentDate");

    // Prevent customers from selecting a past date
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    appointmentDate.min = localDate;

    appointmentForm.addEventListener("submit", function(event) {

        const status = document.getElementById("appointmentStatus");

        if (!appointmentForm.checkValidity()) {
            event.preventDefault();
            appointmentForm.reportValidity();

            status.textContent = "Please check your details and complete all required fields.";
            return;
        }

        status.textContent = "Your appointment request is being submitted.";

    });
}