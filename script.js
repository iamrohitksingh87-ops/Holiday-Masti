document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =========================================================
       HELPERS
    ========================================================= */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    const escapeHTML = (value) =>
        String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");


    /* =========================================================
       NAVIGATION
    ========================================================= */

    $$(".navlinks a, .navcta, .brand").forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            event.preventDefault();


            if (href === "#home") {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                history.replaceState(
                    null,
                    "",
                    "#home"
                );

                return;
            }


            const target =
                $(href);

            if (!target) {

                console.warn(
                    "Navigation target not found:",
                    href
                );

                return;
            }


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            history.replaceState(
                null,
                "",
                href
            );

        });

    });


    /* =========================================================
       3D GLOBE
    ========================================================= */

    const canvas =
        $("#globe");


    if (canvas && window.THREE) {

        const renderer =
            new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true
            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );


        const scene =
            new THREE.Scene();


        const camera =
            new THREE.PerspectiveCamera(
                34,
                1,
                0.1,
                100
            );


        camera.position.set(
            0,
            0,
            5.4
        );


        const globeGroup =
            new THREE.Group();


        scene.add(
            globeGroup
        );


        const ambientLight =
            new THREE.AmbientLight(
                0xffffff,
                2.2
            );


        scene.add(
            ambientLight
        );


        const directionalLight =
            new THREE.DirectionalLight(
                0xffffff,
                2.8
            );


        directionalLight.position.set(
            4,
            3,
            5
        );


        scene.add(
            directionalLight
        );


        const globe =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    1.55,
                    48,
                    48
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x151515,
                    roughness: 0.72,
                    metalness: 0.12
                })

            );


        globeGroup.add(
            globe
        );


        const globeGrid =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    1.58,
                    24,
                    16
                ),

                new THREE.MeshBasicMaterial({
                    color: 0xc9ff39,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.16
                })

            );


        globeGroup.add(
            globeGrid
        );


        function addMarker(
            latitude,
            longitude,
            color,
            size
        ) {

            const phi =
                (90 - latitude) *
                Math.PI /
                180;


            const theta =
                (longitude + 180) *
                Math.PI /
                180;


            const x =
                -1.62 *
                Math.sin(phi) *
                Math.cos(theta);


            const y =
                1.62 *
                Math.cos(phi);


            const z =
                1.62 *
                Math.sin(phi) *
                Math.sin(theta);


            const marker =
                new THREE.Mesh(

                    new THREE.SphereGeometry(
                        size,
                        16,
                        16
                    ),

                    new THREE.MeshStandardMaterial({
                        color,
                        emissive: color,
                        emissiveIntensity: 0.18
                    })

                );


            marker.position.set(
                x,
                y,
                z
            );


            globeGroup.add(
                marker
            );


            const markerRing =
                new THREE.Mesh(

                    new THREE.RingGeometry(
                        size * 1.8,
                        size * 2.15,
                        32
                    ),

                    new THREE.MeshBasicMaterial({
                        color,
                        side: THREE.DoubleSide,
                        transparent: true,
                        opacity: 0.65
                    })

                );


            markerRing.position.copy(
                marker.position
            );


            markerRing.lookAt(
                0,
                0,
                0
            );


            globeGroup.add(
                markerRing
            );

        }


        addMarker(
            1.29,
            103.85,
            0xc9ff39,
            0.105
        );


        addMarker(
            -8.34,
            115.09,
            0xff6b35,
            0.11
        );


        addMarker(
            35.68,
            139.65,
            0x52e7df,
            0.10
        );


        addMarker(
            4.17,
            73.51,
            0x7257ff,
            0.09
        );


        const floatingToken =
            new THREE.Mesh(

                new THREE.IcosahedronGeometry(
                    0.28,
                    1
                ),

                new THREE.MeshStandardMaterial({
                    color: 0xff6b35,
                    roughness: 0.4,
                    metalness: 0.1
                })

            );


        floatingToken.position.set(
            1.95,
            0.95,
            0.15
        );


        scene.add(
            floatingToken
        );


        const orbitRing =
            new THREE.Mesh(

                new THREE.TorusGeometry(
                    1.95,
                    0.025,
                    8,
                    90
                ),

                new THREE.MeshBasicMaterial({
                    color: 0xff6b35,
                    transparent: true,
                    opacity: 0.35
                })

            );


        orbitRing.rotation.x =
            0.8;


        orbitRing.rotation.y =
            0.2;


        scene.add(
            orbitRing
        );


        function resizeGlobe() {

            const rect =
                canvas.getBoundingClientRect();


            if (!rect.width || !rect.height) {
                return;
            }


            renderer.setSize(
                rect.width,
                rect.height,
                false
            );


            camera.aspect =
                rect.width /
                rect.height;


            camera.updateProjectionMatrix();

        }


        resizeGlobe();


        window.addEventListener(
            "resize",
            resizeGlobe
        );


        let targetX = 0;
        let targetY = 0;

        let mouseX = 0;
        let mouseY = 0;


        canvas.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    canvas.getBoundingClientRect();


                targetX =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;


                targetY =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

            }
        );


        function animateGlobe() {

            requestAnimationFrame(
                animateGlobe
            );


            mouseX +=
                (targetX - mouseX) *
                0.035;


            mouseY +=
                (targetY - mouseY) *
                0.035;


            globeGroup.rotation.y +=
                0.0028 +
                mouseX * 0.012;


            globeGroup.rotation.x +=
                (
                    mouseY * 0.35 -
                    globeGroup.rotation.x
                ) * 0.02;


            floatingToken.rotation.x +=
                0.008;


            floatingToken.rotation.y +=
                0.011;


            orbitRing.rotation.z +=
                0.002;


            renderer.render(
                scene,
                camera
            );

        }


        animateGlobe();

    }


    /* =========================================================
       CUSTOM CURSOR
    ========================================================= */

    const cursor =
        $("#cursor");


    if (cursor) {

        window.addEventListener(
            "pointermove",
            (event) => {

                cursor.style.left =
                    event.clientX + "px";

                cursor.style.top =
                    event.clientY + "px";

            }
        );


        $$(
            ".nav a, .btn, .dest, button"
        ).forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.style.transform =
                        "translate(-50%,-50%) scale(2.2)";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.style.transform =
                        "translate(-50%,-50%) scale(1)";

                }
            );

        });

    }


    /* =========================================================
       PACKAGE SYSTEM
    ========================================================= */

    const packageModal =
        $("#packageDetailsModal");


    const packageModalContent =
        $("#packageModalContent");


    const packageStore =
        {};


    /* =========================================================
       FALLBACK PACKAGES
       Used if Supabase is unavailable.
    ========================================================= */

    const fallbackPackages = {

        "Goa Beach Escape": {

            category: "holiday",

            location: "GOA • INDIA",

            duration: "3 Nights / 4 Days",

            price: "₹18,999",

            rating: "4.8",

            reviews: "120+ Reviews",

            image:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90",

            description:
                "Relax on beautiful beaches, enjoy delicious local food and experience the best of Goa.",

            includes: [
                ["🏨", "Hotel / Resort", "Comfortable handpicked accommodation."],
                ["🍳", "Breakfast", "Daily breakfast included."],
                ["🚗", "Transfers", "Airport and local transfers."],
                ["📸", "Sightseeing", "Curated destination experiences."]
            ],

            days: [
                ["1", "Arrival in Goa", "Arrive at Goa Airport, transfer to your hotel and enjoy a relaxed evening by the beach."],
                ["2", "North Goa Exploration", "Explore Baga, Calangute and Aguada Fort. Enjoy cafés, beaches and the beautiful Goan sunset."],
                ["3", "South Goa & Leisure", "Explore South Goa beaches and scenic viewpoints. Enjoy a relaxed afternoon and local markets."],
                ["4", "Departure", "Breakfast, check-out and transfer to Goa Airport."]
            ]

        },


        "Bali Paradise": {

            category: "holiday",

            location: "BALI • INDONESIA",

            duration: "5 Nights / 6 Days",

            price: "₹42,999",

            rating: "4.9",

            reviews: "140+ Reviews",

            image:
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=90",

            description:
                "Discover tropical beaches, peaceful temples, lush rice terraces and unforgettable Bali experiences.",

            includes: [
                ["🏨", "Hotel / Resort", "Comfortable handpicked accommodation."],
                ["🍳", "Breakfast", "Daily breakfast included."],
                ["🚗", "Transfers", "Airport and local transfers."],
                ["📸", "Sightseeing", "Curated destination experiences."]
            ],

            days: [
                ["1", "Arrival in Bali", "Airport pickup, resort check-in and leisure evening."],
                ["2", "Ubud & Rice Terraces", "Explore Ubud, temples, rice terraces, cafés and local markets."],
                ["3", "Kintamani & Volcano Views", "Visit Kintamani and enjoy beautiful Mount Batur views."],
                ["4", "Beach & Leisure", "Relax at Bali's beautiful beaches and enjoy optional activities."],
                ["5", "Island Experience", "Discover scenic viewpoints, local culture and tropical surroundings."],
                ["6", "Departure", "Breakfast, check-out and airport transfer."]
            ]

        },


        "Dubai Luxury": {

            category: "holiday",

            location: "DUBAI • UAE",

            duration: "4 Nights / 5 Days",

            price: "₹39,999",

            rating: "4.7",

            reviews: "100+ Reviews",

            image:
                "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=90",

            description:
                "Experience Dubai's iconic skyline, luxury shopping, desert adventures and unforgettable attractions.",

            includes: [
                ["🏨", "Hotel / Resort", "Comfortable handpicked accommodation."],
                ["🍳", "Breakfast", "Daily breakfast included."],
                ["🚗", "Transfers", "Airport and local transfers."],
                ["📸", "Sightseeing", "Curated destination experiences."]
            ],

            days: [
                ["1", "Arrival in Dubai", "Airport pickup, hotel check-in and leisure time."],
                ["2", "Dubai City Tour", "Explore Burj Khalifa, Dubai Mall, Downtown Dubai and iconic landmarks."],
                ["3", "Desert Safari", "Enjoy dune bashing, sunset views, traditional entertainment and dinner."],
                ["4", "Palm Jumeirah & Marina", "Explore Palm Jumeirah and Dubai Marina with free time for shopping."],
                ["5", "Departure", "Breakfast, check-out and airport transfer."]
            ]

        },


        "Kashmir Heaven": {

            category: "holiday",

            location: "KASHMIR • INDIA",

            duration: "5 Nights / 6 Days",

            price: "₹27,999",

            rating: "4.9",

            reviews: "120+ Reviews",

            image:
                "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=90",

            description:
                "Explore serene valleys, beautiful mountain landscapes, peaceful lakes and the natural beauty of Kashmir.",

            includes: [
                ["🏨", "Hotel / Resort", "Comfortable handpicked accommodation."],
                ["🍳", "Breakfast", "Daily breakfast included."],
                ["🚗", "Transfers", "Airport and local transfers."],
                ["📸", "Sightseeing", "Curated destination experiences."]
            ],

            days: [
                ["1", "Arrival in Srinagar", "Airport pickup, hotel or houseboat check-in and Dal Lake evening."],
                ["2", "Srinagar Sightseeing", "Explore Mughal gardens, Dal Lake and local markets."],
                ["3", "Gulmarg Excursion", "Visit Gulmarg and enjoy beautiful mountain views and optional activities."],
                ["4", "Pahalgam Valley", "Explore the scenic Pahalgam valley, rivers and mountain viewpoints."],
                ["5", "Leisure in Srinagar", "Enjoy local shopping, Kashmiri handicrafts and a relaxed evening."],
                ["6", "Departure", "Breakfast, check-out and Srinagar Airport transfer."]
            ]

        },


        "Kerala Backwaters": {

            category: "holiday",

            location: "KERALA • INDIA",

            duration: "4 Nights / 5 Days",

            price: "₹24,999",

            rating: "4.8",

            reviews: "110+ Reviews",

            image:
                "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90",

            description:
                "Enjoy calm backwaters, lush greenery, scenic hill stations and a relaxing Kerala holiday.",

            includes: [
                ["🏨", "Hotel / Resort", "Comfortable handpicked accommodation."],
                ["🍳", "Breakfast", "Daily breakfast included."],
                ["🚗", "Transfers", "Airport and local transfers."],
                ["📸", "Sightseeing", "Curated destination experiences."]
            ],

            days: [
                ["1", "Arrival in Kochi", "Airport pickup, hotel check-in and evening leisure."],
                ["2", "Kochi → Munnar", "Scenic drive to Munnar with tea plantations and mountain viewpoints."],
                ["3", "Explore Munnar", "Discover tea gardens, viewpoints and local attractions."],
                ["4", "Munnar → Alleppey", "Travel to Alleppey and enjoy the famous Kerala backwaters."],
                ["5", "Departure", "Transfer towards Kochi and airport drop."]
            ]

        },


        "Thailand Adventure": {

            category: "holiday",

            location: "THAILAND",

            duration: "5 Nights / 6 Days",

            price: "₹34,999",

            rating: "4.7",

            reviews: "100+ Reviews",

            image:
                "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=90",

            description:
                "Discover tropical islands, vibrant markets, beautiful beaches and exciting adventures across Thailand.",

            includes: [
                ["🏨", "Hotel / Resort", "Comfortable handpicked accommodation."],
                ["🍳", "Breakfast", "Daily breakfast included."],
                ["🚗", "Transfers", "Airport and local transfers."],
                ["📸", "Sightseeing", "Curated destination experiences."]
            ],

            days: [
                ["1", "Arrival in Bangkok", "Airport pickup, hotel check-in and leisure evening."],
                ["2", "Bangkok City", "Explore temples, markets and Bangkok's famous cultural attractions."],
                ["3", "Island Escape", "Travel to a beautiful island destination and relax on the beach."],
                ["4", "Adventure Day", "Enjoy water activities, sightseeing and local experiences."],
                ["5", "Leisure & Shopping", "Explore markets, shopping areas and cafés."],
                ["6", "Departure", "Breakfast, check-out and airport transfer."]
            ]

        }

    };


    /* =========================================================
       NORMALIZE INCLUDES
    ========================================================= */

    function normalizeIncludes(value) {

        if (!value) {
            return [];
        }


        if (typeof value === "string") {

            try {
                value =
                    JSON.parse(value);
            }

            catch {
                return value
                    .split(",")
                    .map(item => [
                        "✦",
                        item.trim(),
                        ""
                    ]);
            }

        }


        if (!Array.isArray(value)) {
            return [];
        }


        return value.map((item) => {

            if (Array.isArray(item)) {

                return [
                    item[0] || "✦",
                    item[1] || "Included",
                    item[2] || ""
                ];

            }


            if (typeof item === "object") {

                return [
                    item.icon ||
                    item.emoji ||
                    "✦",

                    item.title ||
                    item.name ||
                    "Included",

                    item.description ||
                    item.text ||
                    ""
                ];

            }


            return [
                "✦",
                String(item),
                ""
            ];

        });

    }


    /* =========================================================
       NORMALIZE ITINERARY
    ========================================================= */

    function normalizeDays(value) {

        if (!value) {
            return [];
        }


        if (typeof value === "string") {

            try {
                value =
                    JSON.parse(value);
            }

            catch {
                return [];
            }

        }


        if (!Array.isArray(value)) {
            return [];
        }


        return value.map(
            (day, index) => {

                if (Array.isArray(day)) {

                    return [
                        day[0] ||
                        String(index + 1),

                        day[1] ||
                        `Day ${index + 1}`,

                        day[2] ||
                        ""
                    ];

                }


                if (typeof day === "object") {

                    return [
                        day.day ||
                        day.number ||
                        String(index + 1),

                        day.title ||
                        day.name ||
                        `Day ${index + 1}`,

                        day.description ||
                        day.details ||
                        day.text ||
                        ""
                    ];

                }


                return [
                    String(index + 1),
                    String(day),
                    ""
                ];

            }
        );

    }


    /* =========================================================
       NORMALIZE PACKAGE
    ========================================================= */

    function normalizePackage(pkg) {

        const title =
            pkg.title ||
            "Holiday Package";


        const category =
            String(
                pkg.category ||
                ""
            )
                .toLowerCase()
                .trim();


        const isDivine =
            category === "divine" ||
            category === "divine yatra" ||
            category.includes("divine");


        let price =
            pkg.price ??
            "On Request";


        if (
            typeof price === "number"
        ) {

            price =
                "₹" +
                price.toLocaleString(
                    "en-IN"
                );

        }


        return {

            ...pkg,

            title,

            category:
                isDivine
                    ? "divine"
                    : "holiday",

            location:
                pkg.location ||
                (
                    isDivine
                        ? "DIVINE YATRA"
                        : "INDIA"
                ),

            duration:
                pkg.duration ||
                "Custom Journey",

            price,

            rating:
                pkg.rating ||
                "4.8",

            reviews:
                pkg.reviews ||
                "100+ Reviews",

            image:
                pkg.image ||
                "",

            description:
                pkg.description ||
                "A carefully planned Holiday Masti experience.",

            includes:
                normalizeIncludes(
                    pkg.includes
                ),

            days:
                normalizeDays(
                    pkg.days
                )

        };

    }


    /* =========================================================
       STORE PACKAGE
    ========================================================= */

    function storePackage(pkg) {

        const normalized =
            normalizePackage(pkg);


        packageStore[
            normalized.title
        ] = normalized;


        return normalized;

    }


    /* =========================================================
       PACKAGE CARD
    ========================================================= */

    function renderSupabasePackage(
        rawPackage
    ) {

        const pkg =
            storePackage(
                rawPackage
            );


        const isDivine =
            pkg.category ===
            "divine";


        const imageHTML =
            pkg.image
                ? `
                    <img
                        src="${escapeHTML(pkg.image)}"
                        alt="${escapeHTML(pkg.title)}"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >
                `
                : `
                    <div class="package-image-placeholder">
                        ${isDivine ? "🔔" : "✦"}
                    </div>
                `;


        return `

            <article
                class="dest ${isDivine ? "divine-card" : ""}"
                data-package-title="${escapeHTML(pkg.title)}"
                tabindex="0"
                role="button"
                aria-label="View ${escapeHTML(pkg.title)} details"
            >

                ${imageHTML}


                <div class="dest-top">

                    <span class="pill">
                        ${escapeHTML(pkg.location)}
                    </span>


                    <span class="pill">

                        ${
                            isDivine
                                ? "🔔"
                                : "★"
                        }

                        ${escapeHTML(pkg.rating)}

                    </span>

                </div>


                <div class="mini3d ${
                    isDivine
                        ? "divine-mini"
                        : ""
                }">

                    ${
                        isDivine
                            ? `
                                <div class="divine-bell">
                                    🔔
                                </div>
                            `
                            : `
                                <div class="cube"></div>
                            `
                    }

                </div>


                <div class="dest-info">

                    <h3>
                        ${escapeHTML(pkg.title)}
                    </h3>


                    <p>
                        ${escapeHTML(pkg.location)}
                        ·
                        ${escapeHTML(pkg.duration)}
                    </p>


                    <div class="price">

                        <strong>
                            ${escapeHTML(pkg.price)}
                        </strong>


                        <span>
                            ${
                                isDivine
                                    ? "Sacred journey ↗"
                                    : escapeHTML(pkg.reviews)
                            }
                        </span>

                    </div>

                </div>

            </article>

        `;

    }


    /* =========================================================
       FALLBACK RENDER
    ========================================================= */

    function renderFallbackPackages() {

        Object.values(
            fallbackPackages
        ).forEach(
            storePackage
        );


        const holidayGrid =
            $("#packageGrid");


        const divineGrid =
            $("#divineYatraGrid");


        const holidayPackages =
            Object.values(
                fallbackPackages
            )
                .filter(
                    pkg =>
                        pkg.category !==
                        "divine"
                );


        if (holidayGrid) {

            holidayGrid.innerHTML =
                holidayPackages
                    .map(
                        renderSupabasePackage
                    )
                    .join("");

        }


        if (divineGrid) {

            divineGrid.innerHTML =
                `
                <div
                    class="divine-empty-fallback"
                    style="display:none"
                ></div>
                `;

        }

    }


    /* =========================================================
       LOAD SUPABASE PACKAGES
    ========================================================= */

    async function loadSupabasePackages() {

        const holidayGrid =
            $("#packageGrid");


        const divineGrid =
            $("#divineYatraGrid");


        const holidayEmpty =
            $("#emptyState");


        const SUPABASE_URL =
            "https://wwfatmtqrswayugaqhra.supabase.co/rest/v1/packages?select=*&order=created_at.desc";


        const SUPABASE_KEY =
            "sb_publishable_IVMKY-BoIe9TYajxRHszSQ_1RUKOxDw";


        if (!holidayGrid &&
            !divineGrid) {

            console.warn(
                "Package grids not found."
            );

            return;

        }


        try {

            const controller =
                new AbortController();


            const timeout =
                setTimeout(
                    () =>
                        controller.abort(),
                    12000
                );


            const response =
                await fetch(
                    SUPABASE_URL,
                    {
                        method: "GET",

                        headers: {

                            "apikey":
                                SUPABASE_KEY,

                            "Authorization":
                                "Bearer " +
                                SUPABASE_KEY
                        },

                        signal:
                            controller.signal

                    }
                );


            clearTimeout(
                timeout
            );


            if (!response.ok) {

                throw new Error(
                    "Supabase HTTP " +
                    response.status
                );

            }


            const packages =
                await response.json();


            if (!Array.isArray(packages)) {

                throw new Error(
                    "Invalid package data."
                );

            }


            console.log(
                "Supabase packages:",
                packages
            );


            const holidayPackages =
                packages.filter(
                    pkg => {

                        const category =
                            String(
                                pkg.category ||
                                ""
                            )
                                .toLowerCase()
                                .trim();


                        return !category.includes(
                            "divine"
                        );

                    }
                );


            const divinePackages =
                packages.filter(
                    pkg => {

                        const category =
                            String(
                                pkg.category ||
                                ""
                            )
                                .toLowerCase()
                                .trim();


                        return (
                            category === "divine" ||
                            category === "divine yatra" ||
                            category.includes("divine")
                        );

                    }
                );


            console.log(
                "Holiday packages:",
                holidayPackages
            );


            console.log(
                "Divine packages:",
                divinePackages
            );


            /* -----------------------------------------
               HOLIDAY
            ----------------------------------------- */

            if (holidayGrid) {

                if (
                    holidayPackages.length
                ) {

                    holidayGrid.innerHTML =
                        holidayPackages
                            .map(
                                renderSupabasePackage
                            )
                            .join("");


                    if (holidayEmpty) {

                        holidayEmpty.style.display =
                            "none";

                    }

                }

                else {

                    const fallbackHoliday =
                        Object.values(
                            fallbackPackages
                        )
                            .filter(
                                pkg =>
                                    pkg.category !==
                                    "divine"
                            );


                    holidayGrid.innerHTML =
                        fallbackHoliday
                            .map(
                                renderSupabasePackage
                            )
                            .join("");

                }

            }


            /* -----------------------------------------
               DIVINE
            ----------------------------------------- */

            if (divineGrid) {

                if (
                    divinePackages.length
                ) {

                    divineGrid.innerHTML =
                        divinePackages
                            .map(
                                renderSupabasePackage
                            )
                            .join("");

                }

                else {

                    divineGrid.innerHTML = `

                        <div
                            class="empty-state"
                            style="
                                grid-column:1/-1;
                                text-align:center;
                                padding:50px;
                                background:#fff;
                                border-radius:28px;
                            "
                        >

                            <div
                                style="
                                    font-size:42px;
                                    margin-bottom:12px;
                                "
                            >
                                🔔
                            </div>


                            <h3>
                                No Divine Yatra packages yet
                            </h3>


                            <p>
                                Add a Divine Yatra package
                                from the admin panel.
                            </p>

                        </div>

                    `;

                }

            }

        }

        catch (error) {

            console.error(
                "Package loading failed:",
                error
            );


            /*
              If Supabase fails,
              keep the website usable.
            */

            renderFallbackPackages();


            if (divineGrid) {

                divineGrid.innerHTML = `

                    <div
                        class="empty-state"
                        style="
                            grid-column:1/-1;
                            text-align:center;
                            padding:50px;
                            background:#fff;
                            border-radius:28px;
                        "
                    >

                        <div
                            style="
                                font-size:42px;
                                margin-bottom:12px;
                            "
                        >
                            🔔
                        </div>


                        <h3>
                            Divine Yatra packages unavailable
                        </h3>


                        <p>
                            Please check your connection
                            or admin package data.
                        </p>

                    </div>

                `;

            }

        }

    }


    /* =========================================================
       PACKAGE DETAILS MODAL
    ========================================================= */

    function showPackage(
        title
    ) {

        if (
            !packageModal ||
            !packageModalContent
        ) {

            console.error(
                "Package details modal is missing."
            );

            return;

        }


        let pkg =
            packageStore[title];


        /*
          Fallback if package was not
          loaded into the store.
        */

        if (!pkg) {

            pkg =
                fallbackPackages[title];

        }


        if (!pkg) {

            console.warn(
                "Package data not found:",
                title
            );

            return;

        }


        pkg =
            normalizePackage(pkg);


        const isDivine =
            pkg.category ===
            "divine";


        const includes =
            pkg.includes.length
                ? pkg.includes
                : [
                    [
                        "🏨",
                        "Hotel / Resort",
                        "Comfortable handpicked accommodation."
                    ],
                    [
                        "🍳",
                        "Breakfast",
                        "Daily breakfast included."
                    ],
                    [
                        "🚗",
                        "Transfers",
                        "Airport and local transfers."
                    ],
                    [
                        "📸",
                        "Sightseeing",
                        "Curated destination experiences."
                    ]
                ];


        const days =
            pkg.days.length
                ? pkg.days
                : [
                    [
                        "1",
                        "Journey Begins",
                        "Your carefully planned journey begins."
                    ]
                ];


        const imageHTML =
            pkg.image
                ? `
                    <div class="package-header-image">

                        <img
                            src="${escapeHTML(pkg.image)}"
                            alt="${escapeHTML(pkg.title)}"
                        >

                    </div>
                `
                : `
                    <div
                        class="package-header-image package-no-image"
                    >

                        <div>
                            ${
                                isDivine
                                    ? "🔔"
                                    : "✦"
                            }
                        </div>

                    </div>
                `;


        packageModalContent.innerHTML = `

            <div
                class="
                    package-premium-header
                    ${isDivine ? "package-divine-header" : ""}
                "
            >

                <div class="package-header-content">

                    <div class="package-kicker">

                        ${
                            isDivine
                                ? "DIVINE YATRA 🔔"
                                : "HOLIDAY PACKAGE"
                        }

                    </div>


                    <h2 id="packageModalTitle">

                        ${escapeHTML(
                            pkg.title
                        )}

                    </h2>


                    <p class="package-header-description">

                        ${escapeHTML(
                            pkg.description
                        )}

                    </p>


                    <span class="package-header-price-label">
                        Starting from
                    </span>


                    <div class="package-header-price">

                        ${escapeHTML(
                            pkg.price
                        )}

                    </div>

                </div>


                ${imageHTML}

            </div>


            <div class="package-meta">

                <div class="package-meta-item">

                    📍
                    ${escapeHTML(
                        pkg.location
                    )}

                </div>


                <div class="package-meta-item rating">

                    ${
                        isDivine
                            ? "🔔"
                            : "⭐"
                    }

                    ${escapeHTML(
                        pkg.rating
                    )}

                </div>


                <div class="package-meta-item">

                    🌙
                    ${escapeHTML(
                        pkg.duration
                    )}

                </div>

            </div>


            <div class="package-premium-body">


                <div>

                    <h3 class="package-premium-title">

                        What's Included

                    </h3>


                    <div class="package-includes-grid">

                        ${includes
                            .map(
                                (item) => `

                                    <div
                                        class="package-include-card"
                                    >

                                        <div
                                            class="package-include-icon"
                                        >

                                            ${escapeHTML(
                                                item[0]
                                            )}

                                        </div>


                                        <strong>

                                            ${escapeHTML(
                                                item[1]
                                            )}

                                        </strong>


                                        <span>

                                            ${escapeHTML(
                                                item[2]
                                            )}

                                        </span>

                                    </div>

                                `
                            )
                            .join("")
                        }

                    </div>

                </div>


                <div>

                    <h3 class="package-premium-title">

                        Your Itinerary

                    </h3>


                    <div class="package-itinerary">

                        ${days
                            .map(
                                (day) => `

                                    <div
                                        class="
                                            package-day
                                            ${isDivine ? "package-day-divine" : ""}
                                        "
                                    >

                                        <div
                                            class="package-day-number"
                                        >

                                            ${escapeHTML(
                                                day[0]
                                            )}

                                        </div>


                                        <div>

                                            <h4>

                                                ${escapeHTML(
                                                    day[1]
                                                )}

                                            </h4>


                                            <p>

                                                ${escapeHTML(
                                                    day[2]
                                                )}

                                            </p>

                                        </div>

                                    </div>

                                `
                            )
                            .join("")
                        }

                    </div>

                </div>

            </div>

        `;


        packageModal.classList.add(
            "open"
        );


        packageModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        console.log(
            "Opened package:",
            pkg.title
        );

    }


   /* =========================================================
   PACKAGE CLICK
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const card =
            event.target.closest(".dest");

        if (!card) {
            return;
        }

        /*
          Dynamic Supabase card
        */
        let title =
            card.getAttribute(
                "data-package-title"
            );

        /*
          Existing/static package card
          fallback to its <h3>
        */
        if (!title) {

            const titleElement =
                card.querySelector(
                    ".dest-info h3"
                );

            if (titleElement) {

                title =
                    titleElement.textContent.trim();

            }

        }

        if (!title) {

            console.warn(
                "Package title not found."
            );

            return;
        }

        console.log(
            "Opening package:",
            title
        );

        showPackage(title);

    }
);


    /* =========================================================
       KEYBOARD PACKAGE OPEN
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {
                return;
            }


            const card =
               event.target.closest(".dest")


            if (!card) {
                return;
            }


            event.preventDefault();


            const title =
                card.getAttribute(
                    "data-package-title"
                );


            showPackage(
                title
            );

        }
    );


    /* =========================================================
       CLOSE MODAL
    ========================================================= */

    function closePackageModal() {

        if (!packageModal) {
            return;
        }


        packageModal.classList.remove(
            "open"
        );


        packageModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    document.addEventListener(
        "click",
        (event) => {

            if (
                event.target.closest(
                    "[data-package-close]"
                )
            ) {

                closePackageModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                packageModal &&
                packageModal.classList.contains(
                    "open"
                )
            ) {

                closePackageModal();

            }

        }
    );


    /* =========================================================
       LOAD PACKAGES
    ========================================================= */

    loadSupabasePackages();


    /* =========================================================
       DEBUG
    ========================================================= */

    console.log(
        "✅ Holiday Masti script loaded"
    );

});