document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // FLIGHT SEARCH - HOLIDAY MASTI
    // ==========================================

    const form = document.getElementById("flightForm");

    // Check flight form
    if (!form) {
        console.error("Flight form not found.");
        return;
    }


    // ==========================================
    // FLIGHT RESULTS CONTAINER
    // ==========================================

    let results = document.getElementById("flight-results");

    // Create automatically if missing
    if (!results) {

        results = document.createElement("div");

        results.id = "flight-results";

        results.className = "flight-results";

        form.insertAdjacentElement("afterend", results);
    }


    // ==========================================
    // FLIGHT FORM SUBMIT
    // ==========================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // ------------------------------------------
        // GET FORM VALUES
        // ------------------------------------------

        const fromElement =
            document.getElementById("flightFrom");

        const toElement =
            document.getElementById("flightTo");

        const departureElement =
            document.getElementById("flightDeparture");

        const returnElement =
            document.getElementById("flightReturn");

        const travellerElement =
            document.querySelector("#flightForm select");


        const from = fromElement
            ? fromElement.value.trim()
            : "";

        const to = toElement
            ? toElement.value.trim()
            : "";

        const departure = departureElement
            ? departureElement.value
            : "";

        const returnDate = returnElement
            ? returnElement.value
            : "";

        const travellers = travellerElement
            ? travellerElement.value
            : "1 Adult";


        // ------------------------------------------
        // VALIDATION
        // ------------------------------------------

        if (!from) {

            alert("Please enter your departure city.");

            return;
        }


        if (!to) {

            alert("Please enter your destination.");

            return;
        }


        if (!departure) {

            alert("Please select your departure date.");

            return;
        }


        // ------------------------------------------
        // SHOW LOADING
        // ------------------------------------------

        results.innerHTML = `

            <div class="flight-loading">

                <div class="loader"></div>

                <h3>
                    Finding the best flights...
                </h3>

                <p>
                    Searching
                    <strong>${escapeHTML(from)}</strong>
                    →
                    <strong>${escapeHTML(to)}</strong>
                </p>

            </div>

        `;


        // Scroll to results
        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        // ------------------------------------------
        // DEMO FLIGHT RESULTS
        // ------------------------------------------

        setTimeout(function () {

            results.innerHTML = `

                <div class="flight-results-heading">

                    <div>

                        <span class="results-label">
                            FLIGHT SEARCH
                        </span>

                        <h2>
                            ${escapeHTML(from)}
                            →
                            ${escapeHTML(to)}
                        </h2>

                        <p>
                            Departure:
                            ${escapeHTML(departure)}

                            ${
                                returnDate
                                ? " • Return: " + escapeHTML(returnDate)
                                : " • One Way"
                            }

                            • ${escapeHTML(travellers)}
                        </p>

                    </div>

                    <span class="result-count">
                        Demo Results
                    </span>

                </div>


                <!-- ==================================
                     FLIGHT 1
                =================================== -->

                <div class="flight-card">

                    <div class="flight-airline">

                        <div class="airline-icon">
                            ✈️
                        </div>

                        <div>

                            <strong>
                                IndiGo
                            </strong>

                            <span>
                                Economy
                            </span>

                        </div>

                    </div>


                    <div class="flight-time">

                        <strong>
                            09:15
                        </strong>

                        <span>
                            ${escapeHTML(from)}
                        </span>

                    </div>


                    <div class="flight-duration">

                        <span>
                            6h 20m
                        </span>

                        <div class="flight-line">

                            <span>
                                ✈
                            </span>

                        </div>

                        <small>
                            1 Stop
                        </small>

                    </div>


                    <div class="flight-time">

                        <strong>
                            14:25
                        </strong>

                        <span>
                            ${escapeHTML(to)}
                        </span>

                    </div>


                    <div class="flight-price">

                        <span>
                            Starting from
                        </span>

                        <strong>
                            ₹18,450
                        </strong>

                        <button
                            type="button"
                            class="view-flight-btn"
                            onclick="checkCurrentFare()">

                            Check Current Fare ✈️

                        </button>

                    </div>

                </div>


                <!-- ==================================
                     FLIGHT 2
                =================================== -->

                <div class="flight-card">

                    <div class="flight-airline">

                        <div class="airline-icon">
                            ✈️
                        </div>

                        <div>

                            <strong>
                                Air India
                            </strong>

                            <span>
                                Economy
                            </span>

                        </div>

                    </div>


                    <div class="flight-time">

                        <strong>
                            06:40
                        </strong>

                        <span>
                            ${escapeHTML(from)}
                        </span>

                    </div>


                    <div class="flight-duration">

                        <span>
                            4h 55m
                        </span>

                        <div class="flight-line">

                            <span>
                                ✈
                            </span>

                        </div>

                        <small>
                            Non-stop
                        </small>

                    </div>


                    <div class="flight-time">

                        <strong>
                            11:35
                        </strong>

                        <span>
                            ${escapeHTML(to)}
                        </span>

                    </div>


                    <div class="flight-price">

                        <span>
                            Starting from
                        </span>

                        <strong>
                            ₹21,990
                        </strong>

                        <button
                            type="button"
                            class="view-flight-btn"
                            onclick="checkCurrentFare()">

                            Check Current Fare ✈️

                        </button>

                    </div>

                </div>


                <!-- ==================================
                     DEMO NOTICE
                =================================== -->

                <div class="demo-note">

                    <strong>
                        Demo flight results
                    </strong>

                    <p>
                        Prices shown are indicative.
                        Check the current fare with our booking
                        partner before booking.
                    </p>

                </div>

            `;


            // Scroll to results
            results.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


        }, 700);

    });


    // ==========================================
    // CHECK CURRENT FARE
    // ==========================================

    window.checkCurrentFare = function () {

        const searchUrl =
            "https://www.google.com/travel/flights";

        window.open(
            searchUrl,
            "_blank",
            "noopener,noreferrer"
        );

    };


    // ==========================================
    // HTML SAFETY
    // ==========================================

    function escapeHTML(value) {

        return String(value)

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#039;");
    }

});

/* =====================================================
   HOLIDAY MASTI - PACKAGE / DESTINATION INTERACTIONS
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- EXPLORE PACKAGES ---------- */

    const exploreButton = document.querySelector(".hero-button");

    if (exploreButton) {
        exploreButton.addEventListener("click", function (e) {

            e.preventDefault();

            const enquiryForm =
                document.getElementById("contactForm") ||
                document.getElementById("contact");

            if (enquiryForm) {
                enquiryForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                setTimeout(function () {
                    const firstInput =
                        enquiryForm.querySelector("input, textarea, select");

                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 700);

            } else {

                const packages =
                    document.getElementById("packages") ||
                    document.querySelector(".packages");

                if (packages) {
                    packages.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    }


    /* ---------- FEATURED PACKAGE DETAILS ---------- */

    document.querySelectorAll(".package-card").forEach(function (card) {

        const button = card.querySelector("button");

        if (!button) return;

        button.addEventListener("click", function () {

            const titleElement = card.querySelector("h3");
            const priceElement = card.querySelector(".price-tag");
            const infoElement = card.querySelector("p");

            const title = titleElement
                ? titleElement.textContent.trim()
                : "Holiday Package";

            const price = priceElement
                ? priceElement.textContent.trim()
                : "";

            const info = infoElement
                ? infoElement.textContent.trim()
                : "";

            openHolidayEnquiry(title, price, info);
        });
    });


    /* ---------- POPULAR DESTINATIONS ---------- */

    document.querySelectorAll(".destination-card").forEach(function (card) {

        card.style.cursor = "pointer";

        card.addEventListener("click", function () {

            const titleElement = card.querySelector("h3");
            const priceElement = card.querySelector("p");

            const destination = titleElement
                ? titleElement.textContent.trim()
                : "Holiday Destination";

            const price = priceElement
                ? priceElement.textContent.trim()
                : "";

            openHolidayEnquiry(
                destination,
                price,
                "Popular destination"
            );
        });
    });


    /* ---------- ENQUIRY FUNCTION ---------- */

    function openHolidayEnquiry(title, price, info) {

        const modal = document.getElementById("modal");

        if (modal) {

            modal.classList.add("open");

            const modalTitle =
                document.getElementById("mTitle");

            if (modalTitle) {
                modalTitle.textContent =
                    "Enquire About " + title;
            }

            const packageField =
                document.querySelector(
                    "#contactForm input[name='package'], #contactForm #package"
                );

            if (packageField) {
                packageField.value =
                    title + (price ? " - " + price : "");
            }

            return;
        }


        const contact =
            document.getElementById("contact") ||
            document.querySelector(".contact");

        if (contact) {

            contact.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            const messageBox =
                contact.querySelector("textarea");

            if (messageBox) {
                messageBox.value =
                    "I am interested in " +
                    title +
                    (price ? " (" + price + ")" : "") +
                    ". Please share more details.";
            }

            return;
        }


        alert(
            title +
            (price ? "\n" + price : "") +
            "\n\nPlease contact Holiday Masti for more details."
        );
    }

});
/* =====================================================
   HOLIDAY SEARCH
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchForm = document.getElementById("searchForm");

    if (!searchForm) return;

    searchForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const destination =
            document.getElementById("destinationInput").value.trim();

        const startDate =
            document.getElementById("startDate").value;

        const endDate =
            document.getElementById("endDate").value;

        const travellers =
            document.getElementById("travellers").value;

        const message =
            document.getElementById("searchMessage");


        /* Destination required */

        if (!destination) {

            message.textContent =
                "Please enter your destination.";

            message.style.color = "#d9534f";

            document.getElementById("destinationInput").focus();

            return;
        }


        /* Date validation */

        if (startDate && endDate && endDate < startDate) {

            message.textContent =
                "Return date cannot be before departure date.";

            message.style.color = "#d9534f";

            return;
        }


        /* Success message */

        message.textContent =
            "Great! We found your holiday request. Taking you to enquiry...";

        message.style.color = "#0b7a53";


        /*
         * Save search details so enquiry form can use them
         */

        sessionStorage.setItem(
            "holidayDestination",
            destination
        );

        sessionStorage.setItem(
            "holidayStartDate",
            startDate
        );

        sessionStorage.setItem(
            "holidayEndDate",
            endDate
        );

        sessionStorage.setItem(
            "holidayTravellers",
            travellers
        );


        /*
         * Go to enquiry/contact section
         */

        setTimeout(function () {

            const contactSection =
                document.getElementById("contact");

            if (contactSection) {

                contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            } else {

                const contactLink =
                    document.querySelector('a[href="#contact"]');

                if (contactLink) {
                    contactLink.click();
                }

            }

        }, 500);

    });

});
/* =====================================================
   HOLIDAY MASTI - FREE CHATBOT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const chatbotHTML = `
        <button class="chatbot-toggle" id="chatbotToggle" aria-label="Open Holiday Masti Assistant">
            🤖
        </button>

        <div class="chatbot-box" id="chatbotBox">

            <div class="chatbot-header">

                <div class="chatbot-header-left">

                    <div class="chatbot-avatar">
                        🤖
                    </div>

                    <div>
                        <h3>Holiday Masti</h3>
                        <p>Travel Assistant • Online</p>
                    </div>

                </div>

                <button class="chatbot-close" id="chatbotClose">
                    ×
                </button>

            </div>

            <div class="chatbot-messages" id="chatbotMessages">

                <div class="chat-message bot">
                    👋 Hi! I'm the Holiday Masti Assistant.
                    <br><br>
                    Where would you like to travel?
                    
                    <div class="chat-options">

                        <button class="chat-option" data-question="Goa">
                            🏖️ Goa
                        </button>

                        <button class="chat-option" data-question="Dubai">
                            🌆 Dubai
                        </button>

                        <button class="chat-option" data-question="Bali">
                            🌴 Bali
                        </button>

                        <button class="chat-option" data-question="Flights">
                            ✈️ Flights
                        </button>

                    </div>
                </div>

            </div>

            <div class="chatbot-input-area">

                <input
                    id="chatbotInput"
                    class="chatbot-input"
                    type="text"
                    placeholder="Ask me anything..."
                >

                <button
                    id="chatbotSend"
                    class="chatbot-send"
                    aria-label="Send message">
                    ➤
                </button>

            </div>

        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", chatbotHTML);


    const toggle = document.getElementById("chatbotToggle");
    const box = document.getElementById("chatbotBox");
    const close = document.getElementById("chatbotClose");
    const input = document.getElementById("chatbotInput");
    const send = document.getElementById("chatbotSend");
    const messages = document.getElementById("chatbotMessages");


    /* Open chatbot */

    toggle.addEventListener("click", function () {
        box.classList.toggle("active");

        if (box.classList.contains("active")) {
            input.focus();
        }
    });


    /* Close chatbot */

    close.addEventListener("click", function () {
        box.classList.remove("active");
    });


    /* Add message */

    function addMessage(text, type) {

        const message = document.createElement("div");

        message.className = "chat-message " + type;

        message.innerHTML = text;

        messages.appendChild(message);

        messages.scrollTop = messages.scrollHeight;
    }


    /* Bot response */

    function botReply(question) {

        const q = question.toLowerCase();

        let reply = "";

        if (
            q.includes("goa")
        ) {

            reply = `
                🏖️ <strong>Goa Beach Escape</strong><br><br>
                ⭐ 4.8 rating<br>
                🌙 3 Nights / 4 Days<br>
                💰 Starting from <strong>₹18,999</strong>
                <br><br>
                Goa is perfect for beaches, nightlife and a relaxing holiday.
                <br><br>
                <button class="chat-option" onclick="scrollToPackages()">
                    View Package
                </button>
            `;

        } else if (
            q.includes("dubai")
        ) {

            reply = `
                🌆 <strong>Dubai Luxury</strong><br><br>
                ⭐ 4.7 rating<br>
                🌙 4 Nights / 5 Days<br>
                💰 Starting from <strong>₹39,999</strong>
                <br><br>
                Dubai is perfect for luxury, shopping, desert adventures and sightseeing.
                <br><br>
                <button class="chat-option" onclick="scrollToPackages()">
                    View Package
                </button>
            `;

        } else if (
            q.includes("bali")
        ) {

            reply = `
                🌴 <strong>Bali Paradise</strong><br><br>
                ⭐ 4.9 rating<br>
                🌙 5 Nights / 6 Days<br>
                💰 Starting from <strong>₹42,999</strong>
                <br><br>
                Bali is great for beaches, nature, resorts and romantic getaways.
                <br><br>
                <button class="chat-option" onclick="scrollToPackages()">
                    View Package
                </button>
            `;

        } else if (
            q.includes("flight") ||
            q.includes("fly") ||
            q.includes("airline")
        ) {

            reply = `
                ✈️ You can use our <strong>Flight Search</strong>
                to search your route.
                <br><br>
                We currently show indicative/demo results.
                <br><br>
                <button class="chat-option" onclick="scrollToFlights()">
                    Search Flights
                </button>
            `;

        } else if (
            q.includes("price") ||
            q.includes("cost") ||
            q.includes("budget")
        ) {

            reply = `
                💰 Our holiday packages start from around
                <strong>₹18,999</strong>.
                <br><br>
                Tell me a destination like <strong>Goa</strong>,
                <strong>Bali</strong> or <strong>Dubai</strong>
                and I'll show you the package.
            `;

        } else if (
            q.includes("contact") ||
            q.includes("enquiry") ||
            q.includes("book")
        ) {

            reply = `
                📞 Sure! You can send us an enquiry and
                our travel team can help you.
                <br><br>
                <button class="chat-option" onclick="scrollToContact()">
                    Make an Enquiry
                </button>
            `;

        } else if (
            q.includes("hello") ||
            q.includes("hi") ||
            q.includes("hey")
        ) {

            reply = `
                👋 Hello!
                <br><br>
                I'm your Holiday Masti travel assistant.
                <br><br>
                Try asking:
                <br>
                • Goa package?
                <br>
                • Dubai price?
                <br>
                • Bali?
                <br>
                • Flights?
            `;

        } else {

            reply = `
                🤔 I can help with:
                <br><br>
                🏖️ Holiday packages
                <br>
                ✈️ Flights
                <br>
                💰 Package prices
                <br>
                📞 Enquiries
                <br><br>
                Try asking about <strong>Goa</strong>,
                <strong>Bali</strong> or <strong>Dubai</strong>.
            `;
        }


        setTimeout(function () {
            addMessage(reply, "bot");
        }, 350);
    }


    /* Send message */

    function sendMessage() {

        const text = input.value.trim();

        if (!text) return;

        addMessage(text, "user");

        input.value = "";

        botReply(text);
    }


    send.addEventListener("click", sendMessage);


    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    });


    /* Quick buttons */

    document.addEventListener("click", function (event) {

        if (
            event.target.classList.contains("chat-option") &&
            event.target.dataset.question
        ) {

            const question =
                event.target.dataset.question;

            addMessage(question, "user");

            botReply(question);
        }

    });


    /* Scroll functions */

    window.scrollToPackages = function () {

        const packages =
            document.getElementById("packages") ||
            document.querySelector(".packages");

        if (packages) {

            box.classList.remove("active");

            packages.scrollIntoView({
                behavior: "smooth"
            });
        }
    };


    window.scrollToFlights = function () {

        const flights =
            document.getElementById("flights") ||
            document.querySelector(".flight-section");

        if (flights) {

            box.classList.remove("active");

            flights.scrollIntoView({
                behavior: "smooth"
            });

        } else {

            box.classList.remove("active");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };


    window.scrollToContact = function () {

        const contact =
            document.getElementById("contact") ||
            document.querySelector(".contact");

        if (contact) {

            box.classList.remove("active");

            contact.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

});
/* =====================================================
   CINEMATIC HERO SLIDESHOW
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");

    if (!hero) return;

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",
            location: "GOA • INDIA",
            title: "Discover Your Next Dream Destination",
            subtitle: "Golden beaches. Endless sunsets. Unforgettable memories."
        },

        {
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=85",
            location: "BALI • INDONESIA",
            title: "Escape Into Paradise",
            subtitle: "Tropical mornings. Crystal waters. Moments worth remembering."
        },

        {
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85",
            location: "DUBAI • UAE",
            title: "Experience The Extraordinary",
            subtitle: "Luxury, adventure and unforgettable nights."
        },

        {
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2000&q=85",
            location: "MALDIVES",
            title: "Where Paradise Feels Real",
            subtitle: "Turquoise waters. Private escapes. Pure relaxation."
        }
    ];


    let currentSlide = 0;


    /* -----------------------------------------
       Create dots
       ----------------------------------------- */

    const dotsContainer = document.createElement("div");

    dotsContainer.className = "hero-dots";

    slides.forEach(function (_, index) {

        const dot = document.createElement("button");

        dot.className = "hero-dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", function () {
            showSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    hero.appendChild(dotsContainer);


    /* -----------------------------------------
       Show slide
       ----------------------------------------- */

    function showSlide(index) {

        currentSlide = index;

        const slide = slides[index];

        hero.style.backgroundImage =
            `url("${slide.image}")`;

        hero.classList.remove("cinematic-zoom");

        void hero.offsetWidth;

        hero.classList.add("cinematic-zoom");


        /* Update hero text */

        if (heroContent) {

            heroContent.classList.remove("hero-changing");

            void heroContent.offsetWidth;

            heroContent.classList.add("hero-changing");


            const heading =
                heroContent.querySelector("h1");

            const paragraph =
                heroContent.querySelector("p");

            let location =
                heroContent.querySelector(".hero-location");


            /* Create location label if missing */

            if (!location && heading) {

                location =
                    document.createElement("div");

                location.className =
                    "hero-location";

                heading.parentNode.insertBefore(
                    location,
                    heading
                );
            }


            if (location) {
                location.textContent =
                    slide.location;
            }


            if (heading) {
                heading.textContent =
                    slide.title;
            }


            if (paragraph) {
                paragraph.textContent =
                    slide.subtitle;
            }
        }


        /* Update dots */

        document
            .querySelectorAll(".hero-dot")
            .forEach(function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );

            });
    }


    /* -----------------------------------------
       Start slideshow
       ----------------------------------------- */

    showSlide(0);


    setInterval(function () {

        const nextSlide =
            (currentSlide + 1) % slides.length;

        showSlide(nextSlide);

    }, 6000);

});
