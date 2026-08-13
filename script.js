document.addEventListener("DOMContentLoaded",()=>{

const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const esc=v=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
const scrollTo=s=>{const e=$(s);if(e)e.scrollIntoView({behavior:"smooth",block:"start"});};

const year=$("#year"); 
if(year)year.textContent=new Date().getFullYear();

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

                        📞
                        <span>
                            Enquire Now
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
                           <svg
                               viewBox="0 0 448 512"
                               aria-hidden="true"
                               xmlns="http://www.w3.org/2000/svg"
                           >
                               <path d="M380.9 97.1C339-0.9 191.5-36.6 92.4 19.4 8.2 67.1-22.7 168.6 12.2 259.1L0 304l46.1-12.1c25.3 14.1 54 21.5 83.2 21.5h.1c114.6 0 207.8-93.2 207.8-207.8 0-55.5-21.6-107.7-61-146.5zM129.4 280.4c-25.9 0-51.3-6.9-73.5-20l-5.2-3.1-27.4 7.2 7.3-26.7-3.4-5.5c-14.5-23.1-22.1-49.8-22.1-77.2C5.1 76.6 60.7 21 129.3 21c33.2 0 64.4 12.9 87.8 36.4 23.5 23.5 36.4 54.7 36.4 87.9-.1 68.5-55.7 124.1-124.1 124.1zm67.7-93.1c-3.7-1.9-21.8-10.7-25.2-11.9-3.4-1.3-5.8-1.9-8.2 1.9-2.4 3.7-9.4 11.9-11.5 14.3-2.1 2.4-4.2 2.8-7.9.9-3.7-1.9-15.5-5.7-29.5-18.2-10.9-9.7-18.2-21.7-20.3-25.4-2.1-3.7-.2-5.7 1.6-7.6 1.7-1.7 3.7-4.2 5.5-6.3 1.8-2.1 2.4-3.7 3.7-6.1 1.2-2.4.6-4.5-.3-6.3-.9-1.9-8.2-19.8-11.2-27.1-3-7.3-6-6.3-8.2-6.4-2.1-.1-4.5-.1-6.9-.1-2.4 0-6.3.9-9.7 4.5-3.4 3.7-13.1 12.8-13.1 31.1s13.4 36.1 15.3 38.5c1.9 2.4 26.4 40.3 64 56.5 8.9 3.8 15.8 6.1 21.2 7.8 8.9 2.8 17 2.4 23.4 1.5 7.1-1.1 21.8-8.9 24.8-17.5 3.1-8.6 3.1-16 2.1-17.5-.9-1.6-3.4-2.5-7.1-4.4z"/>
                           </svg>

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


/* ================= PACKAGE BUTTONS ================= */

$$(".details-button").forEach(
    b=>b.addEventListener(
        "click",
        ()=>openPackage(
            b.dataset.title ||
                "Holiday Package",

            b.dataset.price ||
                "",

            b.dataset.description ||
                ""
        )
    )
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

const cf=
    $("#contactForm");

if(cf){

    cf.addEventListener(
        "submit",
        e=>{

            e.preventDefault();

            const s=
                $("#contactSuccess");

            if(s){

                s.textContent=
                    "Thanks! Your enquiry has been received. We'll get back to you shortly.";

                s.style.color=
                    "#0b7a53";

            }

            cf.reset();

        }
    );

}


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
