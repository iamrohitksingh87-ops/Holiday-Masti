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
