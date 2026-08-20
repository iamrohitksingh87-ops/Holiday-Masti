document.addEventListener("DOMContentLoaded",()=>{

const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const esc=v=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
const scrollTo=s=>{const e=$(s);if(e)e.scrollIntoView({behavior:"smooth",block:"start"});};

const year=$("#year"); 
if(year)year.textContent=new Date().getFullYear();
/* ================= SUPABASE ================= */

const SUPABASE_URL =
    "https://wwfatmtqrswayugaqhra.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_IVMKY-BoIe9TYajxRHszSQ_1RUKOxDw";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
/* ================= MODAL ================= */

const modal=$("#detailsModal");

const closeModal=()=>{
    if(modal){
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden","true");
    }
};

$$("[data-close-modal]").forEach(e=>e.addEventListener("click",ev=>{
    ev.preventDefault();
    closeModal();

    if(e.getAttribute("href")==="#contact"){
        setTimeout(()=>scrollTo("#contact"),150);
    }
}));

document.addEventListener("keydown",e=>{
    if(e.key==="Escape")closeModal();
});


/* ================= PACKAGE DATA ================= */

const data = {

"Goa Beach Escape": {

    image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90",

    loc: "GOA • INDIA",
    rating: "4.8",
    reviews: "120+ Reviews",
    duration: "3 Nights / 4 Days",

    description:
    "Relax on beautiful beaches, enjoy delicious local food and experience the best of Goa with a perfect mix of relaxation, sightseeing and fun.",

    includes: [

        ["🏨","Hotel / Resort","Comfortable stay in a handpicked property."],

        ["🍳","Breakfast","Daily breakfast included."],

        ["🚗","Transfers","Airport and local sightseeing transfers."],

        ["🏖️","Beach Experience","Explore Goa's beautiful beaches."]
    ],

    days: [

    ["1","Arrival in Goa",
    "Arrive at Goa Airport and meet your travel representative. Transfer to your hotel and complete check-in. Spend the evening relaxing by the beach and enjoy a beautiful Goan sunset."],

    ["2","North Goa Exploration",
    "After breakfast, explore the famous beaches of North Goa including Baga and Calangute. Visit Aguada Fort and enjoy time at local cafés and beachside spots. Return to the hotel in the evening."],

    ["3","South Goa & Leisure",
    "Discover the peaceful side of Goa with a visit to South Goa beaches and scenic viewpoints. Enjoy a relaxed afternoon and spend the evening exploring local markets or enjoying a beachside dinner."],

    ["4","Departure",
    "Enjoy breakfast at the hotel and check out. Depending on your departure time, enjoy some free time before your private transfer to Goa Airport."]
]
},


"Bali Paradise": {

    image:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=90",

    loc: "BALI • INDONESIA",
    rating: "4.9",
    reviews: "140+ Reviews",
    duration: "5 Nights / 6 Days",

    description:
    "Discover tropical beaches, peaceful temples, lush rice terraces and unforgettable island experiences in beautiful Bali.",

    includes: [

        ["🏨","Resort Stay","Comfortable stay in selected resorts."],

        ["🍳","Breakfast","Daily breakfast included."],

        ["🚗","Private Transfers","Airport and sightseeing transfers."],

        ["🌴","Island Experiences","Curated Bali sightseeing."]
    ],

    days: [

        ["1","Arrival in Bali",
        "Arrive at Ngurah Rai International Airport and meet your representative. Private transfer to your resort, check-in and relax after your journey."],

        ["2","Ubud & Rice Terraces",
        "Explore the cultural heart of Bali with Ubud, traditional temples and beautiful rice terraces. Enjoy local cafés, art markets and scenic surroundings."],

        ["3","Kintamani & Volcano Views",
        "Travel towards the Kintamani highlands and enjoy panoramic views of Mount Batur. Visit local attractions and experience Bali's unique culture and landscapes."],

        ["4","Beach & Leisure Day",
        "Enjoy a relaxed day around Bali's beautiful beaches. Spend time at the resort, explore the coastline or enjoy optional water activities."],

        ["5","Island Experience",
        "Explore more of Bali with a scenic island experience. Discover hidden viewpoints, local culture and beautiful tropical surroundings before returning to your resort."],

        ["6","Departure",
        "Enjoy your final breakfast before checking out. Private transfer to the airport according to your flight schedule."]
    ]
},


"Dubai Luxury": {

    image:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=90",

    loc: "DUBAI • UAE",
    rating: "4.7",
    reviews: "100+ Reviews",
    duration: "4 Nights / 5 Days",

    description:
    "Experience Dubai's iconic skyline, luxury shopping, desert adventures and unforgettable city attractions.",

    includes: [

        ["🏨","Luxury Hotel","Premium hotel accommodation."],

        ["🍳","Breakfast","Daily breakfast included."],

        ["🚐","Transfers","Airport and sightseeing transfers."],

        ["🏙️","City Experience","Dubai's iconic attractions."]
    ],

    days: [

        ["1","Arrival in Dubai",
        "Arrive in Dubai and meet your representative at the airport. Private transfer to your hotel followed by check-in and leisure time."],

        ["2","Dubai City Tour",
        "Explore modern Dubai including Burj Khalifa, Dubai Mall, Downtown Dubai and other iconic landmarks. Enjoy the spectacular city skyline during your evening."],

        ["3","Desert Safari",
        "Enjoy a desert adventure with dune bashing, beautiful sunset views and an evening filled with traditional entertainment and dining."],

        ["4","Palm Jumeirah & Marina",
        "Explore Palm Jumeirah, Dubai Marina and the city's famous waterfront attractions. Spend some free time shopping or enjoying Dubai's vibrant evening atmosphere."],

        ["5","Departure",
        "Enjoy breakfast and complete your check-out. Private transfer to Dubai International Airport for your onward journey."]
    ]
},


"Kashmir Heaven": {

    image:
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=90",

    loc: "KASHMIR • INDIA",
    rating: "4.9",
    reviews: "130+ Reviews",
    duration: "5 Nights / 6 Days",

    description:
    "Explore serene valleys, beautiful mountain landscapes, peaceful lakes and the unforgettable natural beauty of Kashmir.",

    includes: [

        ["🏨","Hotel Stay","Comfortable stays in selected hotels."],

        ["🍳","Breakfast","Daily breakfast included."],

        ["🚗","Transfers","Private local transportation."],

        ["🏔️","Sightseeing","Curated Kashmir experiences."]
    ],

    days: [

        ["1","Arrival in Srinagar",
        "Arrive in Srinagar and meet your representative. Transfer to your hotel or houseboat and enjoy a relaxed evening beside the beautiful Dal Lake."],

        ["2","Srinagar Sightseeing",
        "Explore Srinagar's famous attractions including Mughal gardens, Dal Lake and local markets. Enjoy the peaceful atmosphere and beautiful Himalayan surroundings."],

        ["3","Gulmarg Excursion",
        "Travel to Gulmarg, one of Kashmir's most beautiful mountain destinations. Enjoy panoramic views, scenic walks and optional activities depending on the season."],

        ["4","Pahalgam Valley",
        "Visit the picturesque Pahalgam valley surrounded by mountains and flowing rivers. Enjoy nature, scenic viewpoints and a peaceful day away from the city."],

        ["5","Leisure in Srinagar",
        "Enjoy a relaxed morning and explore local markets for Kashmiri handicrafts, dry fruits and souvenirs. Spend the evening enjoying the beautiful surroundings."],

        ["6","Departure",
        "Enjoy breakfast before check-out. Private transfer to Srinagar Airport according to your departure schedule."]
    ]
},


"Kerala Backwaters": {

    image:
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90",

    loc: "KERALA • INDIA",
    rating: "4.8",
    reviews: "120+ Reviews",
    duration: "4 Nights / 5 Days",

    description:
    "Enjoy calm backwaters, lush greenery, scenic hill stations and a relaxing Kerala holiday filled with nature and local experiences.",

    includes: [

        ["🏨","Hotel / Resort","Comfortable stay in quality properties."],

        ["🍳","Breakfast","Daily breakfast included."],

        ["🚗","Transfers","Airport, hotel and sightseeing transfers."],

        ["🛶","Backwater Experience","Enjoy Kerala's famous waterways."]
    ],

    days: [

        ["1","Arrival in Kochi",
        "Welcome at Kochi Airport followed by a private transfer to your hotel. Complete check-in and spend the evening relaxing or exploring the nearby area. Overnight stay in Kochi."],

        ["2","Kochi → Munnar",
        "After breakfast, begin your scenic journey towards Munnar through lush green landscapes. Visit tea plantations and enjoy beautiful mountain viewpoints before checking into your resort."],

        ["3","Explore Munnar",
        "Discover the famous tea gardens and mountain scenery of Munnar. Visit popular viewpoints and local attractions, followed by a relaxed evening at the resort."],

        ["4","Munnar → Alleppey",
        "After breakfast, travel towards Alleppey, the heart of Kerala's famous backwaters. Check into your waterfront stay and enjoy a peaceful evening surrounded by coconut palms and waterways."],

        ["5","Alleppey → Kochi & Departure",
        "Enjoy breakfast before your transfer towards Kochi. Depending on your departure time, enjoy some final sightseeing or shopping before your airport drop."]
    ]
},


"Thailand Adventure": {

    image:
    "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=90",

    loc: "THAILAND",
    rating: "4.7",
    reviews: "100+ Reviews",
    duration: "5 Nights / 6 Days",

    description:
    "Discover tropical islands, vibrant markets, beautiful beaches and exciting adventures across Thailand.",

    includes: [

        ["🏨","Hotel Stay","Comfortable accommodation."],

        ["🍳","Breakfast","Daily breakfast included."],

        ["🚐","Transfers","Airport and local transfers."],

        ["🏝️","Island Experience","Explore Thailand's tropical beauty."]
    ],

    days: [

        ["1","Arrival in Bangkok",
        "Arrive in Bangkok and meet your representative. Transfer to your hotel, complete check-in and enjoy the evening at leisure."],

        ["2","Bangkok City",
        "Explore Bangkok's famous temples, markets and cultural attractions. Enjoy the city's unique combination of traditional heritage and modern lifestyle."],

        ["3","Island Escape",
        "Travel towards one of Thailand's beautiful island destinations. Relax on the beach, enjoy the tropical surroundings and take part in optional activities."],

        ["4","Adventure Day",
        "Enjoy a day filled with water activities, sightseeing and local experiences. Discover hidden corners of the destination and enjoy a beautiful tropical sunset."],

        ["5","Leisure & Shopping",
        "Spend a relaxed day exploring local markets, shopping areas and cafés. Enjoy some free time to experience Thailand at your own pace."],

        ["6","Departure",
        "Enjoy your final breakfast before checking out. Transfer to the airport according to your flight schedule."]
    ]
}
};


/* ================= OPEN PACKAGE ================= */

function openPackage(title, price, description) {

    if (!modal) return;

    const box = $(".modal-box", modal);

    if (!box) return;

    const t = $("#modalTitle");
    const d = $("#modalDescription");
    const p = $("#modalPrice");

    if (t) t.textContent = title;
    if (d) d.textContent = description || "";
    if (p) p.textContent = price || "";

    const old = $(".premium-package-details", box);

    if (old) {
        old.remove();
    }

    const x = data[title] || {
        image: "",
        loc: "HOLIDAY MASTI",
        rating: "4.8",
        reviews: "100+ Reviews",
        duration: "Custom Package",
        description:
            description ||
            "Experience an unforgettable holiday with Holiday Masti.",
        includes: [
            ["🏨","Hotel Stay","Comfortable accommodation."],
            ["🍳","Breakfast","Daily breakfast included."],
            ["🚗","Transfers","Local transfers included."],
            ["📸","Sightseeing","Curated local experiences."]
        ],
        days: [
            ["1","Arrival","Welcome and hotel check-in."],
            ["2","Explore","Enjoy sightseeing and local experiences."],
            ["3","Leisure","Free time to explore at your own pace."],
            ["4","Departure","Breakfast and onward transfer."]
        ]
    };


    const wrap = document.createElement("div");

    wrap.className =
        "premium-package-details";


    wrap.innerHTML = `

        <!-- ================= HEADER ================= -->

        <div class="package-premium-header">

            <div class="package-header-content">

                <div class="package-kicker">
                    HOLIDAY PACKAGE
                </div>

                <h2>
                    ${esc(title)}
                </h2>

                <p class="package-header-description">
                    ${esc(x.description)}
                </p>

                <span class="package-header-price-label">
                    Starting from
                </span>

                <div class="package-header-price">
                    ${esc(price || "On Request")}
                </div>

            </div>


            <div class="package-header-image">

                ${
                    x.image
                    ? `<img
                        src="${x.image}"
                        alt="${esc(title)}"
                        loading="lazy"
                    >`
                    : ""
                }

            </div>

        </div>


        <!-- ================= META ================= -->

        <div class="package-meta">

            <div class="package-meta-item">

                📍

                ${esc(x.loc)}

            </div>


            <div class="package-meta-item rating">

                ⭐

                ${esc(x.rating)}

                <span>
                    (${esc(x.reviews)})
                </span>

            </div>


            <div class="package-meta-item">

                🌙

                ${esc(x.duration)}

            </div>

        </div>


        <!-- ================= BODY ================= -->

        <div class="package-premium-body">


            <!-- LEFT COLUMN -->

            <div class="package-left-column">

                <h3 class="package-premium-title">
                    What's Included
                </h3>


                <div class="package-includes-grid">

                    ${x.includes.map(item => `

                        <div class="package-include-card">

                            <div class="package-include-icon">
                                ${item[0]}
                            </div>

                            <strong>
                                ${esc(item[1])}
                            </strong>

                            <span>
                                ${esc(item[2])}
                            </span>

                        </div>

                    `).join("")}

                </div>


                <!-- CTA -->

                <div class="package-cta-box">

                    <button
                        type="button"
                        class="package-cta-button package-cta-enquire">

                        <span class="enquire-icon">
                            <i class="fa-solid fa phone" aria-hidden="true"></i>
                            <span>Enquire Now</span>
                        </span>

                    </button>


                    <a
                        class="package-cta-button package-cta-whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://wa.me/917851007007?text=${encodeURIComponent(
                            "Hi Holiday Masti, I am interested in " +
                            title +
                            (price ? " - " + price : "") +
                            ". Please share complete package details."
                        )}">

                       <span class="whatsapp-icon">
                           <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
                           <span>WhatsApp Us</span>
                       </span>

                    </a>


                    <div class="package-trust">

                        <span>
                            🛡️ 100% Secure
                        </span>

                        <span>
                            •
                        </span>

                        <span>
                            🏆 Best Price Guarantee
                        </span>

                        <span>
                            •
                        </span>

                        <span>
                            🎧 24×7 Support
                        </span>

                    </div>

                </div>

            </div>


            <!-- RIGHT COLUMN -->

            <div class="package-right-column">

                <h3 class="package-premium-title">
                    Your Itinerary
                </h3>


                <div class="package-itinerary">

                    ${x.days.map(day => `

                        <div class="package-day">

                            <div class="package-day-number">
                                ${esc(day[0])}
                            </div>

                            <div>

                                <h4>
                                    ${esc(day[1])}
                                </h4>

                                <p>
                                    ${esc(day[2])}
                                </p>

                            </div>

                        </div>

                    `).join("")}

                </div>

            </div>


        </div>

    `;


    const oldBtn =
        $(".modal-enquire", box);


    if (oldBtn) {

        oldBtn.style.display = "none";

        box.appendChild(wrap);

    } else {

        box.appendChild(wrap);

    }


    /* ================= ENQUIRE ================= */

    const enquire =
        $(".package-cta-enquire", wrap);


    if (enquire) {

        enquire.addEventListener(
            "click",
            function () {

                closeModal();

                const message =
                    $("#contactMessage");

                if (message) {

                    message.value =
                        "I am interested in " +
                        title +
                        (price
                            ? " (" + price + ")"
                            : "") +
                        ". Please share complete package details.";

                }

                setTimeout(
                    function () {
                        scrollTo("#contact");
                    },
                    150
                );

            }
        );

    }


    /* ================= OPEN ================= */

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    /* Start modal at top */

    box.scrollTop = 0;

}


/* ================= SUPABASE PACKAGES ================= */


function packagePrice(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "On Request";
    }

    const number =
        Number(
            String(value)
                .replace(/[^0-9.]/g, "")
        );

    if (!Number.isNaN(number)) {

        return "₹" +
            number.toLocaleString("en-IN");

    }

    return String(value);
}


function normaliseIncludes(value) {

    if (
        !Array.isArray(value) ||
        value.length === 0
    ) {

        return [

            [
                "🏨",
                "Hotel Stay",
                "Comfortable accommodation."
            ],

            [
                "🍳",
                "Breakfast",
                "Daily breakfast included."
            ],

            [
                "🚗",
                "Transfers",
                "Local transfers included."
            ],

            [
                "📸",
                "Sightseeing",
                "Curated local experiences."
            ]

        ];

    }


    return value.map(item => {

        if (Array.isArray(item)) {

            return [

                item[0] || "✓",

                item[1] || "Included",

                item[2] || ""

            ];

        }


        if (
            typeof item === "object" &&
            item !== null
        ) {

            return [

                item.icon ||
                    "✓",

                item.title ||
                    item.name ||
                    "Included",

                item.description ||
                    ""

            ];

        }


        return [

            "✓",

            String(item),

            ""

        ];

    });

}


function normaliseDays(value) {

    if (
        !Array.isArray(value) ||
        value.length === 0
    ) {

        return [

            [
                "1",
                "Arrival",
                "Welcome and hotel check-in."
            ],

            [
                "2",
                "Explore",
                "Enjoy sightseeing and local experiences."
            ],

            [
                "3",
                "Leisure",
                "Free time to explore at your own pace."
            ],

            [
                "4",
                "Departure",
                "Breakfast and onward transfer."
            ]

        ];

    }


    return value.map(
        (item, index) => {

            if (Array.isArray(item)) {

                return [

                    item[0] ||
                        String(index + 1),

                    item[1] ||
                        "Day Experience",

                    item[2] ||
                        ""

                ];

            }


            if (
                typeof item === "object" &&
                item !== null
            ) {

                return [

                    item.day ||
                        item.number ||
                        String(index + 1),

                    item.title ||
                        "Day Experience",

                    item.description ||
                        ""

                ];

            }


            return [

                String(index + 1),

                "Day Experience",

                String(item)

            ];

        }
    );

}


function renderSupabasePackage(pkg) {

    const title =
        pkg.title ||
        "Holiday Package";


    const price =
        packagePrice(pkg.price);


    const image =
        pkg.image ||
        "images/logo.png";


    const location =
        pkg.location ||
        "INDIA";


    const duration =
        pkg.duration ||
        "Custom Package";


    const rating =
        pkg.rating ||
        "4.8";


    const reviews =
        pkg.reviews ||
        "100+ Reviews";


    /*
     * Put complete Supabase package data
     * into the existing premium View Details
     * system.
     */

    data[title] = {

        image: image,

        loc: location,

        rating:
            String(rating),

        reviews:
            String(reviews),

        duration:
            duration,

        description:
            pkg.description ||
            "Experience an unforgettable holiday with Holiday Masti.",

        includes:
            normaliseIncludes(
                pkg.includes
            ),

        days:
            normaliseDays(
                pkg.days
            )

    };


    return `

        <article
            class="package-card"
            data-name="${esc(
                title.toLowerCase()
            )}"
            data-filter="${esc(
                (
                    title +
                    " " +
                    location +
                    " " +
                    duration
                ).toLowerCase()
            )}">


            <div class="card-image">

                <img
                    src="${esc(image)}"
                    alt="${esc(title)}"
                    loading="lazy"
                    onerror="this.src='images/logo.png';"
                >


                <span class="price-tag">

                    ${esc(price)}

                </span>

            </div>


            <div class="card-body">

                <p class="card-location">

                    ${esc(location)}

                    ·

                    ${esc(duration)}

                </p>


                <h3>

                    ${esc(title)}

                </h3>


                <p class="rating">

                    ★ ${esc(
                        String(rating)
                    )}

                    <span>·</span>

                    ${esc(
                        String(reviews)
                    )}

                </p>


                <button
                    class="details-button"
                    type="button"
                    data-title="${esc(title)}"
                    data-price="${esc(price)}"
                    data-description="${esc(
                        pkg.description || ""
                    )}"
                >

                    View Details

                </button>

            </div>

        </article>

    `;

}


async function loadSupabasePackages() {

    const holidayGrid =
        $("#packageGrid");

    const divineGrid =
        $("#divineYatraGrid");

    const holidayEmpty =
        $("#emptyState");


    try {

        const response =
            await fetch(

                SUPABASE_URL +
                "/rest/v1/packages?select=*&order=created_at.desc",

                {

                    method: "GET",

                    headers: {

                        "apikey":
                            SUPABASE_PUBLISHABLE_KEY,

                        "Authorization":
                            "Bearer " +
                            SUPABASE_PUBLISHABLE_KEY

                    }

                }

            );


        if (!response.ok) {

            throw new Error(
                "Package service returned HTTP " +
                response.status
            );

        }


        const packages =
            await response.json();


        if (!Array.isArray(packages)) {

            return;

        }


        /* =========================================
           HOLIDAY PACKAGES
        ========================================= */

        const holidayPackages =
            packages.filter(
                pkg =>
                    !pkg.category ||
                    pkg.category === "holiday"
            );


        if (
            holidayGrid &&
            holidayPackages.length > 0
        ) {

            holidayGrid.insertAdjacentHTML(

                "beforeend",

                holidayPackages
                    .map(renderSupabasePackage)
                    .join("")

            );

        }


        if (holidayEmpty) {

            if (holidayPackages.length > 0) {

                holidayEmpty.style.display =
                    "none";

            }

        }


        /* =========================================
           DIVINE YATRA PACKAGES
        ========================================= */

        const divinePackages =
            packages.filter(
                pkg =>
                    pkg.category === "divine"
            );


        if (divineGrid) {

            if (divinePackages.length > 0) {

                divineGrid.innerHTML =

                    divinePackages
                        .map(renderSupabasePackage)
                        .join("");

            }

            else {

                divineGrid.innerHTML = `

                    <div class="empty-state">

                        <h3>
                            Divine Yatra coming soon
                        </h3>

                        <p>
                            Sacred journeys will be available here soon.
                        </p>

                    </div>

                `;

            }

        }


        console.log(

            "Holiday Masti: " +
            holidayPackages.length +
            " holiday package(s), " +
            divinePackages.length +
            " Divine Yatra package(s) loaded."

        );


    }

    catch (error) {

        console.error(

            "Holiday Masti package loading failed:",

            error

        );


        if (holidayEmpty) {

            holidayEmpty.style.display =
                "block";

            holidayEmpty.textContent =
                "Showing our featured packages.";

        }


        if (divineGrid) {

            divineGrid.innerHTML = `

                <div class="empty-state">

                    <h3>
                        Divine Yatra
                    </h3>

                    <p>
                        Packages are temporarily unavailable.
                    </p>

                </div>

            `;

        }

    }

}


/* Load packages from Supabase */

loadSupabasePackages();


/* ================= PACKAGE BUTTONS ================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".details-button"
            );


        if (!button) {

            return;

        }


        openPackage(

            button.dataset.title ||
                "Holiday Package",

            button.dataset.price ||
                "",

            button.dataset.description ||
                ""

        );

    }
);

/* ================= DESTINATIONS ================= */

$$(".destination-card").forEach(
    c=>c.addEventListener(
        "click",
        ()=>{

            const h=
                $("h3",c);

            const p=
                $("p",c);

            openPackage(

                h
                    ? h.textContent.trim()
                    : "Holiday Destination",

                p
                    ? p.textContent.trim()
                    : "",

                "Explore this popular destination with Holiday Masti."
            );

        }
    )
);


/* ================= HERO BUTTON ================= */

const heroBtn=
    $(".hero-button") ||
    $(".hero-actions .btn-primary");

if(heroBtn){

    heroBtn.addEventListener(
        "click",
        e=>{

            e.preventDefault();

            scrollTo("#search");

        }
    );

}


/* ================= HOLIDAY SEARCH ================= */

const sf=
    $("#searchForm");

if(sf){

    sf.addEventListener(
        "submit",
        e=>{

            e.preventDefault();

            const dest=
                $("#destinationInput")
                    ?.value.trim() ||
                "";

            const start=
                $("#startDate")
                    ?.value ||
                "";

            const end=
                $("#endDate")
                    ?.value ||
                "";

            const trav=
                $("#travellers")
                    ?.value ||
                "1";

            const msg=
                $("#searchMessage");


            if(!dest){

                if(msg){

                    msg.textContent=
                        "Please enter your destination.";

                    msg.style.color=
                        "#d9534f";

                }

                $("#destinationInput")
                    ?.focus();

                return;
            }


            if(
                start &&
                end &&
                end<start
            ){

                if(msg){

                    msg.textContent=
                        "Return date cannot be before departure date.";

                    msg.style.color=
                        "#d9534f";

                }

                return;
            }


            sessionStorage.setItem(
                "holidayDestination",
                dest
            );

            sessionStorage.setItem(
                "holidayStartDate",
                start
            );

            sessionStorage.setItem(
                "holidayEndDate",
                end
            );

            sessionStorage.setItem(
                "holidayTravellers",
                trav
            );


            if(msg){

                msg.textContent=
                    "Great! We found your holiday request. Taking you to enquiry...";

                msg.style.color=
                    "#0b7a53";

            }


            setTimeout(
                ()=>{

                    scrollTo(
                        "#contact"
                    );


                    const m=
                        $("#contactMessage");


                    if(m){

                        m.value=
`Holiday enquiry
Destination: ${dest}
From: ${start||"Not specified"}
To: ${end||"Not specified"}
Travellers: ${trav}`;

                    }

                },
                500
            );

        }
    );

}


/* ================= CONTACT FORM ================= */

const cf =
    $("#contactForm");

if(cf){

    cf.addEventListener(
        "submit",
        async e => {

            e.preventDefault();


            const name =
                $("#contactName")
                    ?.value.trim() || "";


            const email =
                $("#contactEmail")
                    ?.value.trim() || "";


            const phone =
                $("#contactPhone")
                    ?.value.trim() || "";


            const message =
                $("#contactMessage")
                    ?.value.trim() || "";


            const success =
                $("#contactSuccess");


            /*
             * Basic validation
             */

            if(!name){

                if(success){

                    success.textContent =
                        "Please enter your name.";

                    success.style.color =
                        "#d9534f";

                }

                return;

            }


            if(!email){

                if(success){

                    success.textContent =
                        "Please enter your email address.";

                    success.style.color =
                        "#d9534f";

                }

                return;

            }


            if(!phone){

                if(success){

                    success.textContent =
                        "Please enter your phone number.";

                    success.style.color =
                        "#d9534f";

                }

                return;

            }


            if(!message){

                if(success){

                    success.textContent =
                        "Please enter your enquiry.";

                    success.style.color =
                        "#d9534f";

                }

                return;

            }


            /*
             * Show sending status
             */

            if(success){

                success.textContent =
                    "Sending your enquiry...";

                success.style.color =
                    "#6b7f95";

            }


            /*
             * Get package/destination information
             * from the enquiry message when available.
             */

            let packageName = "";


            const storedDestination =
                sessionStorage.getItem(
                    "holidayDestination"
                );


            if(storedDestination){

                packageName =
                    storedDestination;

            }


            /*
             * Save enquiry to Supabase
             */

            const result =
                await supabaseClient
                    .from("enquiries")
                    .insert({

                        name:
                            name,

                        email:
                            email,

                        phone:
                            phone,

                        message:
                            message,

                        package_name:
                            packageName,

                        status:
                            "New"

                    });


            /*
             * Database error
             */

            if(result.error){

                console.error(
                    "Enquiry save failed:",
                    result.error
                );


                if(success){

                    success.textContent =
                        "We couldn't send your enquiry. Please try WhatsApp instead.";

                    success.style.color =
                        "#d9534f";

                }

                return;

            }


            /*
             * Build WhatsApp message
             */

            const whatsappMessage =
`🌴 Holiday Masti Enquiry

👤 Name: ${name}

📧 Email: ${email}

📱 Phone: ${phone}

${packageName
    ? "🏖️ Destination: " +
      packageName +
      "\n\n"
    : ""}💬 Enquiry:
${message}`;


            const whatsappUrl =
                "https://wa.me/917851007007?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            /*
             * Success message
             */

            if(success){

                success.textContent =
                    "Thanks! Your enquiry has been received. Opening WhatsApp...";

                success.style.color =
                    "#0b7a53";

            }


            /*
             * Open WhatsApp
             */

            window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );


            /*
             * Reset form after successful save
             */

            cf.reset();

        }
    );

}


/* ================= FLIGHTS ================= */


/* ================= FLIGHTS ================= */

const ff=
    $("#flightForm");

if(ff){

    let r=
        $("#flight-results");


    if(!r){

        r=
            document.createElement(
                "div"
            );

        r.id=
            "flight-results";

        r.className=
            "flight-results";


        ff.insertAdjacentElement(
            "afterend",
            r
        );

    }


    const swap=
        $("#swapFlight");


    if(swap){

        swap.addEventListener(
            "click",
            ()=>{

                const a=
                    $("#flightFrom");

                const b=
                    $("#flightTo");


                if(a&&b){

                    const v=
                        a.value;

                    a.value=
                        b.value;

                    b.value=
                        v;

                }

            }
        );

    }


    ff.addEventListener(
        "submit",
        e=>{

            e.preventDefault();


            const from=
                $("#flightFrom")
                    ?.value.trim() ||
                "";

            const to=
                $("#flightTo")
                    ?.value.trim() ||
                "";

            const dep=
                $("#flightDeparture")
                    ?.value ||
                "";

            const ret=
                $("#flightReturn")
                    ?.value ||
                "";

            const ts=
                $("#flightTravellers");


            const trav=
                ts
                    ? ts.options[
                        ts.selectedIndex
                    ].text
                    : "1 Adult";


            if(!from){

                alert(
                    "Please enter your departure city."
                );

                return;
            }


            if(!to){

                alert(
                    "Please enter your destination."
                );

                return;
            }


            if(!dep){

                alert(
                    "Please select your departure date."
                );

                return;
            }


            if(
                ret &&
                ret<dep
            ){

                alert(
                    "Return date cannot be before departure date."
                );

                return;
            }


            r.innerHTML=`

                <div class="flight-loading">

                    <div class="loader"></div>

                    <h3>
                        Finding the best flights...
                    </h3>

                    <p>
                        Searching
                        <strong>
                            ${esc(from)}
                        </strong>
                        →
                        <strong>
                            ${esc(to)}
                        </strong>
                    </p>

                </div>

            `;


            r.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });


            setTimeout(
                ()=>{

                    r.innerHTML=`

                        <div class="flight-results-heading">

                            <div>

                                <span class="results-label">
                                    FLIGHT SEARCH
                                </span>

                                <h2>
                                    ${esc(from)}
                                    →
                                    ${esc(to)}
                                </h2>

                                <p>
                                    Departure:
                                    ${esc(dep)}

                                    ${
                                        ret
                                            ? " • Return: "+
                                              esc(ret)
                                            : " • One Way"
                                    }

                                    •
                                    ${esc(trav)}

                                </p>

                            </div>

                            <span class="result-count">
                                Demo Results
                            </span>

                        </div>


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
                                    ${esc(from)}
                                </span>

                            </div>


                            <div class="flight-duration">

                                <span>
                                    6h 20m
                                </span>

                                <div class="flight-line">
                                    <span>✈</span>
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
                                    ${esc(to)}
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
                                    ${esc(from)}
                                </span>

                            </div>


                            <div class="flight-duration">

                                <span>
                                    4h 55m
                                </span>

                                <div class="flight-line">
                                    <span>✈</span>
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
                                    ${esc(to)}
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

                },
                700
            );

        }
    );

}


window.checkCurrentFare=
    ()=>window.open(
        "https://www.google.com/travel/flights",
        "_blank",
        "noopener,noreferrer"
    );


/* ================= CHATBOT ================= */

if(!$("#chatbotToggle")){

    document.body.insertAdjacentHTML(
        "beforeend",

        `

        <button
            class="chatbot-toggle"
            id="chatbotToggle"
            aria-label="Open Holiday Masti Assistant">

            🤖

        </button>


        <div
            class="chatbot-box"
            id="chatbotBox">


            <div class="chatbot-header">


                <div class="chatbot-header-left">

                    <div class="chatbot-avatar">
                        🤖
                    </div>


                    <div>

                        <h3>
                            Holiday Masti
                        </h3>

                        <p>
                            Travel Assistant • Online
                        </p>

                    </div>

                </div>


                <button
                    class="chatbot-close"
                    id="chatbotClose">

                    ×

                </button>


            </div>


            <div
                class="chatbot-messages"
                id="chatbotMessages">


                <div class="chat-message bot">

                    👋 Hi! I'm the Holiday Masti Assistant.

                    <br><br>

                    Where would you like to travel?


                    <div class="chat-options">


                        <button
                            class="chat-option"
                            data-question="Goa">

                            🏖️ Goa

                        </button>


                        <button
                            class="chat-option"
                            data-question="Dubai">

                            🌆 Dubai

                        </button>


                        <button
                            class="chat-option"
                            data-question="Bali">

                            🌴 Bali

                        </button>


                        <button
                            class="chat-option"
                            data-question="Flights">

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
                    placeholder="Ask me anything...">


                <button
                    id="chatbotSend"
                    class="chatbot-send"
                    aria-label="Send message">

                    ➤

                </button>

            </div>

        </div>

        `
    );

}


const toggle=
    $("#chatbotToggle");

const box=
    $("#chatbotBox");

const close=
    $("#chatbotClose");

const ci=
    $("#chatbotInput");

const send=
    $("#chatbotSend");

const msgs=
    $("#chatbotMessages");


if(
    toggle &&
    box &&
    close &&
    ci &&
    send &&
    msgs
){

    toggle.addEventListener(
        "click",
        ()=>{

            box.classList.toggle(
                "active"
            );

            if(
                box.classList.contains(
                    "active"
                )
            ){

                ci.focus();

            }

        }
    );


    close.addEventListener(
        "click",
        ()=>box.classList.remove(
            "active"
        )
    );


    const add=
        (text,type)=>{

            const m=
                document.createElement(
                    "div"
                );

            m.className=
                "chat-message "+
                type;

            m.innerHTML=
                text;

            msgs.appendChild(
                m
            );

            msgs.scrollTop=
                msgs.scrollHeight;

        };


    const reply=
        q=>{

            q=
                q.toLowerCase();

            let x;


            if(q.includes("goa")){

                x=`

                    🏖️
                    <strong>
                        Goa Beach Escape
                    </strong>

                    <br><br>

                    ⭐ 4.8 rating

                    <br>

                    🌙 3 Nights / 4 Days

                    <br>

                    💰 Starting from
                    <strong>
                        ₹18,999
                    </strong>

                    <br><br>

                    Goa is perfect for beaches,
                    nightlife and a relaxing holiday.

                    <br><br>

                    <button
                        class="chat-option"
                        onclick="scrollToPackages()">

                        View Package

                    </button>

                `;

            }


            else if(q.includes("dubai")){

                x=`

                    🌆
                    <strong>
                        Dubai Luxury
                    </strong>

                    <br><br>

                    ⭐ 4.7 rating

                    <br>

                    🌙 4 Nights / 5 Days

                    <br>

                    💰 Starting from
                    <strong>
                        ₹39,999
                    </strong>

                    <br><br>

                    Dubai is perfect for luxury,
                    shopping, desert adventures
                    and sightseeing.

                    <br><br>

                    <button
                        class="chat-option"
                        onclick="scrollToPackages()">

                        View Package

                    </button>

                `;

            }


            else if(q.includes("bali")){

                x=`

                    🌴
                    <strong>
                        Bali Paradise
                    </strong>

                    <br><br>

                    ⭐ 4.9 rating

                    <br>

                    🌙 5 Nights / 6 Days

                    <br>

                    💰 Starting from
                    <strong>
                        ₹42,999
                    </strong>

                    <br><br>

                    Bali is great for beaches,
                    nature, resorts and romantic getaways.

                    <br><br>

                    <button
                        class="chat-option"
                        onclick="scrollToPackages()">

                        View Package

                    </button>

                `;

            }


            else if(
                q.includes("flight") ||
                q.includes("fly") ||
                q.includes("airline")
            ){

                x=`

                    ✈️ You can use our
                    <strong>
                        Flight Search
                    </strong>
                    to search your route.

                    <br><br>

                    We currently show
                    indicative/demo results.

                    <br><br>

                    <button
                        class="chat-option"
                        onclick="scrollToFlights()">

                        Search Flights

                    </button>

                `;

            }


            else if(
                q.includes("price") ||
                q.includes("cost") ||
                q.includes("budget")
            ){

                x=`

                    💰 Our holiday packages
                    start from around
                    <strong>
                        ₹18,999
                    </strong>.

                    <br><br>

                    Tell me a destination like
                    <strong>Goa</strong>,
                    <strong>Bali</strong> or
                    <strong>Dubai</strong>.

                `;

            }


            else if(
                q.includes("contact") ||
                q.includes("enquiry") ||
                q.includes("book")
            ){

                x=`

                    📞 Sure!

                    You can send us an enquiry
                    and our travel team can help you.

                    <br><br>

                    <button
                        class="chat-option"
                        onclick="scrollToContact()">

                        Make an Enquiry

                    </button>

                `;

            }


            else if(
                q.includes("hello") ||
                q.includes("hi") ||
                q.includes("hey")
            ){

                x=`

                    👋 Hello!

                    <br><br>

                    I'm your Holiday Masti
                    travel assistant.

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

            }


            else{

                x=`

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

                    Try asking about
                    <strong>Goa</strong>,
                    <strong>Bali</strong>
                    or
                    <strong>Dubai</strong>.

                `;

            }


            setTimeout(
                ()=>add(x,"bot"),
                350
            );

        };


    const sendMsg=
        ()=>{

            const t=
                ci.value.trim();

            if(!t)return;

            add(
                esc(t),
                "user"
            );

            ci.value="";

            reply(t);

        };


    send.addEventListener(
        "click",
        sendMsg
    );


    ci.addEventListener(
        "keydown",
        e=>{

            if(
                e.key==="Enter"
            ){

                sendMsg();

            }

        }
    );


    document.addEventListener(
        "click",
        e=>{

            const o=
                e.target.closest(
                    ".chat-option"
                );


            if(
                o &&
                o.dataset.question
            ){

                add(
                    esc(
                        o.dataset.question
                    ),
                    "user"
                );

                reply(
                    o.dataset.question
                );

            }

        }
    );


    window.scrollToPackages=
        ()=>{

            box.classList.remove(
                "active"
            );

            scrollTo(
                "#packages"
            );

        };


    window.scrollToFlights=
        ()=>{

            box.classList.remove(
                "active"
            );

            scrollTo(
                "#flights"
            );

        };


    window.scrollToContact=
        ()=>{

            box.classList.remove(
                "active"
            );

            scrollTo(
                "#contact"
            );

        };

}


/* ================= CINEMATIC SLIDESHOW ================= */

const hero=
    $(".hero");

const hc=
    $(".hero-content");


if(hero){

    const slides=[

        {
            img:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",

            loc:
                "GOA • INDIA",

            title:
                "Discover Your Next Dream Destination",

            sub:
                "Golden beaches. Endless sunsets. Unforgettable memories."
        },


        {
            img:
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=85",

            loc:
                "BALI • INDONESIA",

            title:
                "Escape Into Paradise",

            sub:
                "Tropical mornings. Crystal waters. Moments worth remembering."
        },


        {
            img:
                "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85",

            loc:
                "DUBAI • UAE",

            title:
                "Experience The Extraordinary",

            sub:
                "Luxury, adventure and unforgettable nights."
        },


        {
            img:
                "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2000&q=85",

            loc:
                "MALDIVES",

            title:
                "Where Paradise Feels Real",

            sub:
                "Turquoise waters. Overwater villas. Pure relaxation."
        }

    ];


    let current=0;


    slides.forEach(
        s=>{

            const i=
                new Image();

            i.src=
                s.img;

        }
    );


    const dots=
        document.createElement(
            "div"
        );

    dots.className=
        "hero-dots";


    slides.forEach(
        (_,i)=>{

            const d=
                document.createElement(
                    "button"
                );

            d.type=
                "button";

            d.className=
                "hero-dot"+
                (
                    i===0
                        ? " active"
                        : ""
                );


            d.addEventListener(
                "click",
                ()=>show(i)
            );


            dots.appendChild(
                d
            );

        }
    );


    hero.appendChild(
        dots
    );


    function show(i){

        current=
            i;

        const s=
            slides[i];


        hero.style.backgroundImage=
            `url("${s.img}")`;


        hero.classList.remove(
            "cinematic-zoom"
        );


        void hero.offsetWidth;


        hero.classList.add(
            "cinematic-zoom"
        );


        if(hc){

            const ey=
                $(".eyebrow",hc);

            const h=
                $("h1",hc);

            const p=
                $(".hero-subtitle",hc) ||
                $("p",hc);


            if(ey)
                ey.textContent=
                    s.loc;


            if(h)
                h.textContent=
                    s.title;


            if(p)
                p.textContent=
                    s.sub;


            hc.classList.remove(
                "hero-changing"
            );


            void hc.offsetWidth;


            hc.classList.add(
                "hero-changing"
            );

        }


        $$(".hero-dot")
            .forEach(
                (d,n)=>
                    d.classList.toggle(
                        "active",
                        n===current
                    )
            );

    }


    show(0);


    setInterval(
        ()=>show(
            (current+1) %
            slides.length
        ),
        6000
    );

}


console.log(
    "Holiday Masti: complete script loaded."
);

});



/* =========================================================
   HOLIDAY MASTI — HERO 3D GLOBE + WIND CHIME
   Permanent version of the DevTools changes.
   ========================================================= */

(function initHolidayMastiHero(){
    const stage = document.getElementById("heroStage");
    const canvas = document.getElementById("globe");
    const chime = document.querySelector(".hm-chime-art");
    const hotspot = document.querySelector(".hm-chime-hotspot");

    if(!stage || !canvas) return;

    /* ---------- WIND CHIME INTERACTION ---------- */

    let audioCtx = null;

    function playChime(){
        try{
            audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
            if(audioCtx.state === "suspended") audioCtx.resume();

            const now = audioCtx.currentTime;
            [784, 988, 1175].forEach((freq, i)=>{
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + i * .035);
                gain.gain.setValueAtTime(0.0001, now + i * .035);
                gain.gain.exponentialRampToValueAtTime(0.055, now + i * .035 + .012);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * .035 + .9);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + i * .035);
                osc.stop(now + i * .035 + .95);
            });
        }catch(e){}
    }

    function moveChime(){
        if(!chime) return;
        chime.classList.remove("hm-chime-moving");
        void chime.offsetWidth;
        chime.classList.add("hm-chime-moving");
        playChime();
    }

    if(hotspot){
        hotspot.addEventListener("pointerenter", moveChime);
        hotspot.addEventListener("click", moveChime);
        hotspot.addEventListener("keydown", e=>{
            if(e.key === "Enter" || e.key === " ") moveChime();
        });
    }

    /* ---------- THREE.JS GLOBE ---------- */

    if(!window.THREE) return;

    const THREE = window.THREE;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha:true,
        antialias:true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
    camera.position.set(0, 0, 5.5);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 2.25));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(4, 4, 6);
    scene.add(light);

    const globe = new THREE.Mesh(
        new THREE.SphereGeometry(1.48, 48, 48),
        new THREE.MeshStandardMaterial({
            color:0x151515,
            roughness:.72,
            metalness:.12
        })
    );
    globeGroup.add(globe);

    const grid = new THREE.Mesh(
        new THREE.SphereGeometry(1.505, 28, 20),
        new THREE.MeshBasicMaterial({
            color:0xc9ff39,
            wireframe:true,
            transparent:true,
            opacity:.20
        })
    );
    globeGroup.add(grid);

    function addMarker(lat, lon, color, size){
        const phi = (90-lat)*Math.PI/180;
        const theta = (lon+180)*Math.PI/180;
        const r = 1.535;

        const pos = new THREE.Vector3(
            -r*Math.sin(phi)*Math.cos(theta),
            r*Math.cos(phi),
            r*Math.sin(phi)*Math.sin(theta)
        );

        const marker = new THREE.Mesh(
            new THREE.SphereGeometry(size, 16, 16),
            new THREE.MeshStandardMaterial({
                color,
                emissive:color,
                emissiveIntensity:.22
            })
        );
        marker.position.copy(pos);
        globeGroup.add(marker);

        const ring = new THREE.Mesh(
            new THREE.RingGeometry(size*1.7, size*2.15, 32),
            new THREE.MeshBasicMaterial({
                color,
                side:THREE.DoubleSide,
                transparent:true,
                opacity:.7
            })
        );
        ring.position.copy(pos);
        ring.lookAt(0,0,0);
        globeGroup.add(ring);
    }

    addMarker(1.29,103.85,0xc9ff39,.09);
    addMarker(-8.34,115.09,0xff6b35,.10);
    addMarker(26.85,80.95,0x52e7df,.08);

    function resize(){
        const w = Math.max(1, stage.clientWidth);
        const h = Math.max(1, stage.clientHeight);

        const size = Math.min(
            510,
            Math.max(300, Math.min(w*.78, h*.84))
        );

        canvas.style.width = size + "px";
        canvas.style.height = size + "px";

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(dpr);
        renderer.setSize(size, size, false);

        camera.aspect = 1;
        camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener("resize", resize, {passive:true});

    let targetX = 0;
    let targetY = 0;

    stage.addEventListener("pointermove", e=>{
        const r = stage.getBoundingClientRect();
        targetX = ((e.clientX-r.left)/r.width-.5) * .22;
        targetY = ((e.clientY-r.top)/r.height-.5) * .12;
    }, {passive:true});

    function animate(){
        requestAnimationFrame(animate);

        globeGroup.rotation.y += .0026;
        globeGroup.rotation.x += (targetY - globeGroup.rotation.x) * .025;
        globeGroup.rotation.z += (targetX - globeGroup.rotation.z) * .025;

        renderer.render(scene,camera);
    }

    animate();
})();
