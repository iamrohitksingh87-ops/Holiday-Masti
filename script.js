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
