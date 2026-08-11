/* =========================================================
   HOLIDAY MASTI
   Interactive functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    const searchForm = document.getElementById("searchForm");
    const destinationInput = document.getElementById("destinationInput");
    const searchMessage = document.getElementById("searchMessage");

    const packageCards = Array.from(
        document.querySelectorAll(".package-card")
    );

    const emptyState = document.getElementById("emptyState");

    const detailsModal = document.getElementById("detailsModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");

    const contactForm = document.getElementById("contactForm");
    const contactSuccess = document.getElementById("contactSuccess");

    const year = document.getElementById("year");


    /* ---------- Current year ---------- */

    year.textContent = new Date().getFullYear();


    /* ---------- Header on scroll ---------- */

    function updateHeader() {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* ---------- Mobile menu ---------- */

    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });


    /* ---------- Search / package filter ---------- */

    function filterPackages(query) {
        const cleanQuery = query.toLowerCase().trim();

        let visibleCount = 0;

        packageCards.forEach((card) => {
            const name = card.dataset.name.toLowerCase();
            const filter = card.dataset.filter.toLowerCase();

            const matches =
                cleanQuery === "" ||
                name.includes(cleanQuery) ||
                filter.includes(cleanQuery);

            if (matches) {
                card.classList.remove("is-hidden");
                visibleCount++;
            } else {
                card.classList.add("is-hidden");
            }
        });

        emptyState.classList.toggle(
            "visible",
            visibleCount === 0
        );

        return visibleCount;
    }


    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const query = destinationInput.value.trim();
        const visibleCount = filterPackages(query);

        if (query === "") {
            searchMessage.textContent =
                "Showing all available holiday packages.";
        } else if (visibleCount > 0) {
            searchMessage.textContent =
                `Great choice! Showing packages for "${query}".`;
        } else {
            searchMessage.textContent =
                `We couldn't find a package for "${query}" yet.`;
        }

        document.getElementById("packages").scrollIntoView({
            behavior: "smooth"
        });
    });


    /* ---------- Destination cards ---------- */

    document.querySelectorAll(".destination-card").forEach((card) => {
        card.addEventListener("click", () => {
            const destination = card.dataset.destination;

            destinationInput.value =
                destination.charAt(0).toUpperCase() +
                destination.slice(1);

            filterPackages(destination);

            searchMessage.textContent =
                `Showing our ${destination} package.`;

            document.getElementById("packages").scrollIntoView({
                behavior: "smooth"
            });
        });
    });


    /* ---------- Package details modal ---------- */

    function openModal(title, price, description) {
        modalTitle.textContent = title;
        modalPrice.textContent = price;
        modalDescription.textContent = description;

        detailsModal.classList.add("open");
        detailsModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        detailsModal.classList.remove("open");
        detailsModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    document.querySelectorAll(".details-button").forEach((button) => {
        button.addEventListener("click", () => {
            openModal(
                button.dataset.title,
                button.dataset.price,
                button.dataset.description
            );
        });
    });

    document.querySelectorAll("[data-close-modal]").forEach((element) => {
        element.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });


    /* ---------- Contact form ---------- */

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        contactSuccess.textContent =
            "Thanks! Your enquiry has been received.";

        contactForm.reset();
    });

});
