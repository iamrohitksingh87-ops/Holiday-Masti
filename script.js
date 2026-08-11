document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // HOLIDAY MASTI - FLIGHT SEARCH
    // Free demo version - No API required
    // ==========================================

    const flightForm = document.querySelector(".flight-search-form");
    const resultsContainer = document.querySelector("#flight-results");

    // Demo flight database
    const flights = [
        {
            airline: "IndiGo",
            logo: "✈️",
            from: "LKO",
            to: "DXB",
            departure: "09:15",
            arrival: "14:25",
            duration: "6h 20m",
            stops: "1 Stop",
            price: 18450
        },
        {
            airline: "Air India",
            logo: "✈️",
            from: "LKO",
            to: "DXB",
            departure: "06:40",
            arrival: "11:35",
            duration: "4h 55m",
            stops: "Non-stop",
            price: 21990
        },
        {
            airline: "Emirates",
            logo: "✈️",
            from: "LKO",
            to: "DXB",
            departure: "20:10",
            arrival: "01:35",
            duration: "5h 25m",
            stops: "Non-stop",
            price: 28650
        },

        {
            airline: "IndiGo",
            logo: "✈️",
            from: "DEL",
            to: "BOM",
            departure: "07:10",
            arrival: "09:20",
            duration: "2h 10m",
            stops: "Non-stop",
            price: 5299
        },
        {
            airline: "Air India",
            logo: "✈️",
            from: "DEL",
            to: "BOM",
            departure: "11:30",
            arrival: "13:40",
            duration: "2h 10m",
            stops: "Non-stop",
            price: 6149
        },
        {
            airline: "Vistara",
            logo: "✈️",
            from: "DEL",
            to: "BOM",
            departure: "18:25",
            arrival: "20:35",
            duration: "2h 10m",
            stops: "Non-stop",
            price: 6899
        },

        {
            airline: "Air India",
            logo: "✈️",
            from: "LKO",
            to: "DEL",
            departure: "08:30",
            arrival: "09:45",
            duration: "1h 15m",
            stops: "Non-stop",
            price: 3999
        },
        {
            airline: "IndiGo",
            logo: "✈️",
            from: "LKO",
            to: "DEL",
            departure: "15:20",
            arrival: "16:35",
            duration: "1h 15m",
            stops: "Non-stop",
            price: 4299
        }
    ];

    // ==========================================
    // SEARCH
    // ==========================================

    if (flightForm) {

        flightForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const fromInput = document.querySelector("#flight-from");
            const toInput = document.querySelector("#flight-to");

            const from = fromInput
                ? fromInput.value.trim().toUpperCase()
                : "";

            const to = toInput
                ? toInput.value.trim().toUpperCase()
                : "";

            if (!from || !to) {
                showMessage("Please enter departure and destination.");
                return;
            }

            showLoading();

            setTimeout(() => {
                searchFlights(from, to);
            }, 700);
        });
    }

    // ==========================================
    // SEARCH FUNCTION
    // ==========================================

    function searchFlights(from, to) {

        if (!resultsContainer) {
            console.warn("Flight results container not found.");
            return;
        }

        const matches = flights.filter(flight =>
            flight.from === from &&
            flight.to === to
        );

        resultsContainer.innerHTML = "";

        if (matches.length === 0) {

            resultsContainer.innerHTML = `
                <div class="no-flights">
                    <div class="no-flight-icon">✈️</div>
                    <h3>No demo flights found</h3>
                    <p>
                        Try one of these routes:
                        <strong>LKO → DXB</strong>,
                        <strong>DEL → BOM</strong> or
                        <strong>LKO → DEL</strong>.
                    </p>
                </div>
            `;

            resultsContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            return;
        }

        const heading = document.createElement("div");

        heading.className = "flight-results-heading";

        heading.innerHTML = `
            <div>
                <span class="results-label">FLIGHT SEARCH</span>
                <h2>${from} → ${to}</h2>
            </div>

            <span class="result-count">
                ${matches.length} flights found
            </span>
        `;

        resultsContainer.appendChild(heading);

        matches.forEach(flight => {

            const card = document.createElement("div");

            card.className = "flight-card";

            card.innerHTML = `
                <div class="flight-airline">
                    <div class="airline-icon">
                        ${flight.logo}
                    </div>

                    <div>
                        <strong>${flight.airline}</strong>
                        <span>Economy</span>
                    </div>
                </div>

                <div class="flight-time">
                    <strong>${flight.departure}</strong>
                    <span>${flight.from}</span>
                </div>

                <div class="flight-duration">
                    <span>${flight.duration}</span>
                    <div class="flight-line">
                        <span>✈</span>
                    </div>
                    <small>${flight.stops}</small>
                </div>

                <div class="flight-time">
                    <strong>${flight.arrival}</strong>
                    <span>${flight.to}</span>
                </div>

                <div class="flight-price">
                    <span>Starting from</span>
                    <strong>₹${flight.price.toLocaleString("en-IN")}</strong>
                    <button class="view-flight-btn">
                        View Flight
                    </button>
                </div>
            `;

            const button = card.querySelector(".view-flight-btn");

            button.addEventListener("click", () => {
                alert(
                    `Demo Flight Selected\n\n` +
                    `${flight.airline}\n` +
                    `${flight.from} → ${flight.to}\n` +
                    `${flight.departure} - ${flight.arrival}\n` +
                    `₹${flight.price.toLocaleString("en-IN")}\n\n` +
                    `This is a demo flight result.`
                );
            });

            resultsContainer.appendChild(card);
        });

        resultsContainer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // ==========================================
    // LOADING
    // ==========================================

    function showLoading() {

        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="flight-loading">
                <div class="loader"></div>
                <h3>Finding the best flights...</h3>
                <p>Searching available demo offers</p>
            </div>
        `;

        resultsContainer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // ==========================================
    // MESSAGE
    // ==========================================

    function showMessage(message) {

        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="no-flights">
                <div class="no-flight-icon">⚠️</div>
                <h3>Almost there</h3>
                <p>${message}</p>
            </div>
        `;
    }

    // ==========================================
    // SWAP FROM / TO
    // ==========================================

    const swapButton = document.querySelector("#swap-flights");

    if (swapButton) {

        swapButton.addEventListener("click", () => {

            const fromInput = document.querySelector("#flight-from");
            const toInput = document.querySelector("#flight-to");

            if (!fromInput || !toInput) return;

            const temp = fromInput.value;

            fromInput.value = toInput.value;
            toInput.value = temp;
        });
    }

});
