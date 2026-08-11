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


    /* ---------- Flight finder ---------- */

    const flightForm = document.getElementById("flightForm");
    const flightFrom = document.getElementById("flightFrom");
    const flightTo = document.getElementById("flightTo");
    const flightDeparture = document.getElementById("flightDeparture");
    const flightReturn = document.getElementById("flightReturn");
    const flightTravellers = document.getElementById("flightTravellers");
    const flightMessage = document.getElementById("flightMessage");
    const flightResults = document.getElementById("flightResults");
    const swapFlight = document.getElementById("swapFlight");

    const airportCodes = {
        "lucknow": "LKO",
        "lko": "LKO",
        "delhi": "DEL",
        "del": "DEL",
        "mumbai": "BOM",
        "bom": "BOM",
        "bengaluru": "BLR",
        "bangalore": "BLR",
        "blr": "BLR",
        "goa": "GOI",
        "goi": "GOI",
        "dubai": "DXB",
        "dxb": "DXB",
        "singapore": "SIN",
        "sin": "SIN",
        "bangkok": "BKK",
        "bkk": "BKK",
        "bali": "DPS",
        "dps": "DPS",
        "london": "LHR",
        "lhr": "LHR",
        "paris": "CDG",
        "cdg": "CDG"
    };

    const sampleFlights = [
        { airline: "Holiday Air", number: "HM 214", depart: "06:20", arrive: "08:45", duration: "2h 25m", stops: "Non-stop", base: 6499 },
        { airline: "Sky Masti", number: "SM 482", depart: "10:15", arrive: "13:05", duration: "2h 50m", stops: "Non-stop", base: 7199 },
        { airline: "Air Explorer", number: "AX 731", depart: "16:40", arrive: "20:10", duration: "3h 30m", stops: "1 stop", base: 5899 },
        { airline: "Travel Wings", number: "TW 906", depart: "21:05", arrive: "23:40", duration: "2h 35m", stops: "Non-stop", base: 7899 }
    ];

    function cleanAirport(value) {
        const raw = value.toLowerCase().trim();
        const codeMatch = raw.match(/\(([a-z]{3})\)/);
        const code = codeMatch ? codeMatch[1] : (airportCodes[raw] || raw.slice(0, 3));
        return code.toUpperCase();
    }

    function prettyAirport(value) {
        const code = cleanAirport(value);
        const names = Object.entries(airportCodes).find(([, airportCode]) => airportCode === code);
        return names ? names[0].replace(/\b\w/g, (letter) => letter.toUpperCase()) : code;
    }

    function formatFlightDate(value) {
        if (!value) return "";
        return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function renderFlights(fromValue, toValue, departure, travellers) {
        const fromCode = cleanAirport(fromValue);
        const toCode = cleanAirport(toValue);
        const routeSeed = (fromCode.charCodeAt(0) + toCode.charCodeAt(0)) % 9;
        const passengerCount = Number(travellers) || 1;

        flightResults.innerHTML = sampleFlights.map((flight, index) => {
            const price = flight.base + routeSeed * 350 + (passengerCount - 1) * 500;
            const searchQuery = encodeURIComponent(
                `Flights from ${fromCode} to ${toCode} on ${departure}`
            );
            const externalUrl = `https://www.google.com/travel/flights?q=${searchQuery}`;

            return `
                <article class="flight-result">
                    <div>
                        <div class="airline-name">✈ ${flight.airline}</div>
                        <div class="flight-number">${flight.number} · ${index === 0 ? "Best value" : "Economy"}</div>
                    </div>
                    <div>
                        <div class="flight-route">${flight.depart} <span>→</span> ${flight.arrive}</div>
                        <div class="flight-meta">${flight.duration} · ${flight.stops}</div>
                    </div>
                    <div>
                        <div class="flight-meta">${prettyAirport(fromValue)} (${fromCode}) → ${prettyAirport(toValue)} (${toCode})</div>
                        <div class="flight-meta">${formatFlightDate(departure)}</div>
                    </div>
                    <div class="flight-price">
                        <strong>₹${price.toLocaleString("en-IN")}</strong>
                        <small>per adult · sample fare</small>
                        <a class="flight-open" href="${externalUrl}" target="_blank" rel="noopener">Check Online</a>
                    </div>
                </article>
            `;
        }).join("");
    }

    if (flightForm) {
        const today = new Date().toISOString().split("T")[0];
        flightDeparture.min = today;
        flightReturn.min = today;

        flightDeparture.addEventListener("change", () => {
            flightReturn.min = flightDeparture.value || today;
            if (flightReturn.value && flightReturn.value < flightDeparture.value) {
                flightReturn.value = flightDeparture.value;
            }
        });

        swapFlight.addEventListener("click", () => {
            const currentFrom = flightFrom.value;
            flightFrom.value = flightTo.value;
            flightTo.value = currentFrom;
        });

        flightForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (flightReturn.value && flightReturn.value < flightDeparture.value) {
                flightMessage.textContent = "Return date must be on or after the departure date.";
                flightResults.innerHTML = "";
                return;
            }

            renderFlights(
                flightFrom.value,
                flightTo.value,
                flightDeparture.value,
                flightTravellers.value
            );

            const tripType = flightReturn.value ? "round trip" : "one way";
            flightMessage.textContent =
                `${flightFrom.value} → ${flightTo.value} · ${formatFlightDate(flightDeparture.value)} · ${tripType}. These are sample fares; use “Check Online” for current availability.`;

            flightResults.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    }


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
