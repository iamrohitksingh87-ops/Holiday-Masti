document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".flight-search-form");
    const results = document.querySelector("#flight-results");

    if (!form) {
        console.error("Flight search form not found.");
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Current HTML ke input fields
        const inputs = form.querySelectorAll("input");
        const selects = form.querySelectorAll("select");

        const from = inputs[0] ? inputs[0].value.trim() : "";
        const departure = inputs[1] ? inputs[1].value : "";
        const returnDate = inputs[2] ? inputs[2].value : "";
        const travellers = selects[0] ? selects[0].value : "1 Adult";

        if (!from || !departure) {
            alert("Please enter From and Departure date.");
            return;
        }

        if (!results) {
            alert("Flight results section is missing.");
            return;
        }

        results.innerHTML = `
            <div class="flight-loading">
                <div class="loader"></div>
                <h3>Finding the best flights...</h3>
                <p>Please wait...</p>
            </div>
        `;

        setTimeout(function () {

            results.innerHTML = `
                <div class="flight-results-heading">
                    <div>
                        <span class="results-label">FLIGHT SEARCH</span>
                        <h2>${escapeHTML(from)} → Your Destination</h2>
                    </div>

                    <span class="result-count">
                        Demo Results
                    </span>
                </div>

                <div class="flight-card">

                    <div class="flight-airline">
                        <div class="airline-icon">✈️</div>

                        <div>
                            <strong>IndiGo</strong>
                            <span>Economy</span>
                        </div>
                    </div>

                    <div class="flight-time">
                        <strong>09:15</strong>
                        <span>Departure</span>
                    </div>

                    <div class="flight-duration">
                        <span>6h 20m</span>
                        <div class="flight-line">
                            <span>✈</span>
                        </div>
                        <small>1 Stop</small>
                    </div>

                    <div class="flight-time">
                        <strong>14:25</strong>
                        <span>Arrival</span>
                    </div>

                    <div class="flight-price">
                        <span>Starting from</span>
                        <strong>₹18,450</strong>

                        <button
                            class="view-flight-btn"
                            onclick="checkCurrentFare()">
                            Check Current Fare ✈️
                        </button>
                    </div>

                </div>

                <div class="flight-card">

                    <div class="flight-airline">
                        <div class="airline-icon">✈️</div>

                        <div>
                            <strong>Air India</strong>
                            <span>Economy</span>
                        </div>
                    </div>

                    <div class="flight-time">
                        <strong>06:40</strong>
                        <span>Departure</span>
                    </div>

                    <div class="flight-duration">
                        <span>4h 55m</span>
                        <div class="flight-line">
                            <span>✈</span>
                        </div>
                        <small>Non-stop</small>
                    </div>

                    <div class="flight-time">
                        <strong>11:35</strong>
                        <span>Arrival</span>
                    </div>

                    <div class="flight-price">
                        <span>Starting from</span>
                        <strong>₹21,990</strong>

                        <button
                            class="view-flight-btn"
                            onclick="checkCurrentFare()">
                            Check Current Fare ✈️
                        </button>
                    </div>

                </div>

                <div class="demo-note">
                    <strong>Demo flight results</strong>
                    <p>
                        Prices shown are indicative.
                        Check the current fare with our booking partner before booking.
                    </p>
                </div>
            `;

            results.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 700);
    });


    // External fare search
    window.checkCurrentFare = function () {

        const url =
            "https://www.google.com/travel/flights";

        window.open(url, "_blank");
    };


    // Basic HTML safety
    function escapeHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

});
