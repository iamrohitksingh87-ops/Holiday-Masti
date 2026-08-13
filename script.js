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

const data={

"Goa Beach Escape":{
    loc:"GOA • INDIA",
    rating:"4.8",
    duration:"3 Nights / 4 Days",
    inc:[
        "🏨 Hotel stay",
        "🍳 Breakfast",
        "🚗 Local transfers",
        "📸 Sightseeing"
    ],
    days:[
        ["1","Arrival & Beach","Hotel check-in and relaxing evening by the beach."],
        ["2","North Goa","Explore famous beaches, forts and local attractions."],
        ["3","South Goa","Discover peaceful beaches and scenic locations."],
        ["4","Departure","Breakfast and airport transfer."]
    ]
},

"Bali Paradise":{
    loc:"BALI • INDONESIA",
    rating:"4.9",
    duration:"5 Nights / 6 Days",
    inc:[
        "🏨 Resort stay",
        "🍳 Breakfast",
        "🚗 Private transfers",
        "🌴 Sightseeing"
    ],
    days:[
        ["1","Arrival","Airport pickup and resort check-in."],
        ["2","Ubud","Temples, rice terraces and beautiful landscapes."],
        ["3","Kintamani","Volcano views and scenic Bali experiences."],
        ["4","Beach Day","Relax and enjoy Bali's famous beaches."],
        ["5","Island Escape","Explore more of Bali and enjoy the evening."],
        ["6","Departure","Breakfast and airport transfer."]
    ]
},

"Dubai Luxury":{
    loc:"DUBAI • UAE",
    rating:"4.7",
    duration:"4 Nights / 5 Days",
    inc:[
        "🏨 Luxury hotel",
        "🍳 Breakfast",
        "🚐 Transfers",
        "🏙️ City sightseeing"
    ],
    days:[
        ["1","Arrival","Airport pickup and hotel check-in."],
        ["2","Dubai City","Burj Khalifa, Dubai Mall and iconic attractions."],
        ["3","Desert Safari","Desert safari with evening entertainment."],
        ["4","Modern Dubai","Palm Jumeirah and Dubai Marina."],
        ["5","Departure","Breakfast and airport transfer."]
    ]
},

"Kashmir Heaven":{
    loc:"KASHMIR • INDIA",
    rating:"4.9",
    duration:"5 Nights / 6 Days",
    inc:[
        "🏨 Hotel stay",
        "🍳 Breakfast",
        "🚗 Transfers",
        "🏔️ Sightseeing"
    ],
    days:[
        ["1","Arrival","Welcome and hotel check-in."],
        ["2","Srinagar","Explore Dal Lake and local attractions."],
        ["3","Gulmarg","Mountain views and scenic experiences."],
        ["4","Pahalgam","Enjoy valleys, rivers and beautiful landscapes."],
        ["5","Local Experience","Relax and explore Srinagar."],
        ["6","Departure","Breakfast and onward transfer."]
    ]
},

"Kerala Backwaters":{
    loc:"KERALA • INDIA",
    rating:"4.8",
    duration:"4 Nights / 5 Days",
    inc:[
        "🏨 Hotel / resort",
        "🍳 Breakfast",
        "🚗 Transfers",
        "🛶 Backwater experience"
    ],
    days:[
        ["1","Arrival","Welcome and hotel check-in."],
        ["2","Munnar","Tea gardens and scenic hill views."],
        ["3","Alleppey","Relax beside the famous backwaters."],
        ["4","Kochi","Explore heritage areas and local culture."],
        ["5","Departure","Breakfast and onward transfer."]
    ]
},

"Thailand Adventure":{
    loc:"THAILAND",
    rating:"4.7",
    duration:"5 Nights / 6 Days",
    inc:[
        "🏨 Hotel stay",
        "🍳 Breakfast",
        "🚐 Transfers",
        "🏝️ Island sightseeing"
    ],
    days:[
        ["1","Arrival","Airport pickup and hotel check-in."],
        ["2","Bangkok","Explore the city's famous attractions."],
        ["3","Island Escape","Enjoy Thailand's beautiful beaches."],
        ["4","Adventure","Water activities and local experiences."],
        ["5","Leisure","Free day for shopping and relaxation."],
        ["6","Departure","Breakfast and airport transfer."]
    ]
}

};


/* ================= OPEN PACKAGE ================= */

function openPackage(title,price,description){

    if(!modal)return;

    const box=$(".modal-box",modal);

    if(!box)return;

    const t=$("#modalTitle");
    const d=$("#modalDescription");
    const p=$("#modalPrice");

    if(t)t.textContent=title;

    if(d){
        d.textContent=
            description ||
            "Experience an unforgettable holiday with Holiday Masti.";
    }

    if(p){
        p.textContent=
            price ||
            "Price on Request";
    }

    const old=$(".premium-package-details",box);

    if(old){
        old.remove();
    }

    const x=data[title]||{
        loc:"HOLIDAY MASTI",
        rating:"4.8",
        duration:"Custom Package",

        inc:[
            "🏨 Hotel stay",
            "🍳 Breakfast",
            "🚗 Transfers",
            "📸 Sightseeing"
        ],

        days:[
            ["1","Arrival","Welcome and hotel check-in."],
            ["2","Explore","Enjoy sightseeing and local experiences."],
            ["3","Relax","Free time to explore at your own pace."],
            ["4","Departure","Breakfast and onward transfer."]
        ]
    };

    const wrap=document.createElement("div");

    wrap.className=
        "premium-package-details";

    wrap.innerHTML=`

        <div class="modal-content-premium">

            <div class="modal-top-line">

                <span class="modal-location">
                    ${esc(x.loc)}
                </span>

                <span class="modal-rating">
                    ⭐ ${esc(x.rating)}
                </span>

            </div>


            <div class="modal-price-row">

                <div>

                    <span class="modal-price-label">
                        Starting from
                    </span>

                    <div class="modal-price-value">
                        ${esc(price||"On Request")}
                    </div>

                </div>

                <div class="modal-duration">
                    🌙 ${esc(x.duration)}
                </div>

            </div>


            <h3 class="modal-section-title">
                What's Included
            </h3>


            <div class="modal-includes">

                ${x.inc.map(i=>`

                    <div class="modal-include-item">
                        ${esc(i)}
                    </div>

                `).join("")}

            </div>


            <h3 class="modal-section-title">
                Your Itinerary
            </h3>


            <div class="modal-itinerary">

                ${x.days.map(a=>`

                    <div class="modal-day">

                        <div class="modal-day-number">
                            ${esc(a[0])}
                        </div>

                        <div>

                            <strong>
                                ${esc(a[1])}
                            </strong>

                            <span>
                                ${esc(a[2])}
                            </span>

                        </div>

                    </div>

                `).join("")}

            </div>


            <div class="modal-actions">

                <button
                    type="button"
                    class="btn btn-primary package-enquire">

                    Enquire Now

                </button>


                <a
                    class="modal-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/917851007007?text=${encodeURIComponent(
                        "Hi Holiday Masti, I am interested in "+
                        title+
                        (price?" - "+price:"")+
                        ". Please share more details."
                    )}">

                    WhatsApp

                </a>

            </div>

        </div>

    `;


    const oldBtn=
        $(".modal-enquire",box);


    if(oldBtn){

        oldBtn.style.display=
            "none";

        box.insertBefore(
            wrap,
            oldBtn
        );

    }else{

        box.appendChild(
            wrap
        );
    }


    const enquire=
        $(".package-enquire",wrap);


    if(enquire){

        enquire.addEventListener(
            "click",
            ()=>{

                closeModal();

                const m=
                    $("#contactMessage");

                if(m){

                    m.value=
                        "I am interested in "+
                        title+
                        (price
                            ? " ("+price+")"
                            : "")+
                        ". Please share more details.";

                }

                setTimeout(
                    ()=>scrollTo("#contact"),
                    150
                );

            }
        );
    }


    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );
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
