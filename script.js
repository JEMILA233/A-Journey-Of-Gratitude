

// ==========================================
// ELEMENTS
// ==========================================

// Sections
const galleryCard=document.querySelector(".gallery-card");
const hero = document.querySelector(".hero");
const story = document.getElementById("story");
const gallery = document.getElementById("gallery");
const letter = document.getElementById("letter");
const birthday = document.getElementById("birthday");

// Hero
const startBtn = document.getElementById("startBtn");

// Modal
const thankYouModal = document.getElementById("thankYouModal");
const closeJourney = document.getElementById("closeJourney");
console.log(thankYouModal);
console.log(closeJourney);
// Story
const cards = document.querySelectorAll(".story-card");
const nextButtons = document.querySelectorAll(".next-btn");
const prevButtons = document.querySelectorAll(".prev-btn");
const homeBtn = document.querySelector(".home-btn");
const galleryBtn = document.getElementById("galleryBtn");

// Gallery
const galleryImage = document.querySelector(".gallery-image");
const galleryCaption = document.querySelector(".gallery-caption");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");

// Letter
const openLetter = document.getElementById("openLetter");
const letterPaper = document.querySelector(".letter-paper");
const typedLetter = document.getElementById("typedLetter");

// Birthday
const restartJourney = document.getElementById("restartJourney");
console.log(restartJourney);

// Audio
const birthdayMusic = document.getElementById("birthdayMusic");
const pianoMusic = document.getElementById("pianoMusic");
const galleryMusic = document.getElementById("galleryMusic");

// Confetti
const confettiContainer = document.querySelector(".confetti-container");
// ==========================================
// DATA
// ==========================================

let currentCard = 0;
let currentImage = 0;
let slideshowInterval;

const galleryImages = [
    "images/gallery1.jpg",
    "images/gallery2.jpg",
    "images/gallery3.jpg",
    "images/gallery4.jpg",
    "images/gallery5.jpg"
];

const galleryCaptions = [

    "Elegance is reflected not only in what you create, but in the lives you inspire.",

    "Every masterpiece begins with passion and dedication.",

    "Grace is the beauty that never fades.",

    "Confidence is the finest outfit anyone can wear.",

    "A legacy stitched with excellence, love and purpose."

];

// ==========================================
// INITIAL STATE
// ==========================================

story.style.display = "none";
gallery.style.display = "none";
letter.style.display = "none";
birthday.style.display = "none";

cards.forEach(card=>{

    card.style.display="none";

});

letterPaper.style.display="none";

birthdayMusic.volume = .5;
pianoMusic.volume = .4;
galleryMusic.volume = .35;

// ==========================================
// MUSIC FUNCTIONS
// ==========================================
function fadeIn(audio,target){

    if(!audio) return;

    audio.volume=0;

    audio.play().catch(()=>{});

    const fade=setInterval(()=>{

        if(audio.volume<target){

            audio.volume=Math.min(audio.volume+0.02,target);

        }else{

            clearInterval(fade);

        }

    },120);

}


function fadeOut(audio){

    if(!audio) return;

    const fade = setInterval(()=>{

        if(audio.volume > 0.05){

            audio.volume -= 0.05;

        }else{

            audio.pause();

            audio.currentTime = 0;

            audio.volume = 0;

            clearInterval(fade);

        }

    },100);

}

// ==========================================
// STORY FUNCTIONS
// ==========================================

function showCard(index){

    cards.forEach(card=>{

        card.style.display = "none";

        card.classList.remove("show");

    });

    cards[index].style.display = "block";

    cards[index].classList.add("show");

    cards[index].scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}

// ==========================================
// BEGIN JOURNEY
// ==========================================

if(startBtn){

    startBtn.addEventListener("click",()=>{

        hero.style.display="none";

        story.style.display="block";

        currentCard=0;

        showCard(currentCard);

        fadeIn(pianoMusic,.4);

    });

}


// ==========================================
// NEXT CARD
// ==========================================

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(currentCard < cards.length-1){

            currentCard++;

            showCard(currentCard);

        }

    });

});

// ==========================================
// PREVIOUS CARD
// ==========================================

prevButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(currentCard > 0){

            currentCard--;

            showCard(currentCard);

        }

    });

});

// ==========================================
// BACK HOME
// ==========================================

if(homeBtn){

    homeBtn.addEventListener("click",()=>{

        fadeOut(pianoMusic);

        fadeOut(galleryMusic);

        fadeOut(birthdayMusic);

        story.style.display = "none";
        gallery.style.display = "none";
        letter.style.display = "none";
        birthday.style.display = "none";

        hero.style.display = "flex";

        currentCard = 0;

    });

}

// ==========================================
// GALLERY FUNCTIONS
// ==========================================

function showGallery(index){

    galleryImage.style.opacity = 0;

    galleryCaption.classList.remove("show");

    galleryCard.classList.add("flash");

    setTimeout(()=>{

        galleryImage.src = galleryImages[index];

        galleryCaption.textContent = galleryCaptions[index];

        galleryImage.style.opacity = 1;

        galleryImage.classList.remove("active");

        void galleryImage.offsetWidth;

        galleryImage.classList.add("active");

        galleryCaption.classList.add("show");

        document.getElementById("currentSlide").textContent = index+1;

        document.querySelector(".gallery-progress-bar").style.width =
        ((index+1)/galleryImages.length)*100 + "%";

        setTimeout(()=>{

            galleryCard.classList.remove("flash");

        },800);

        if(index===galleryImages.length-1){

            galleryNext.innerHTML="💌 Continue to My Letter →";

        }

        else{

            galleryNext.innerHTML="Next →";

        }

    },500);

}

// ==========================================
// AUTO SLIDESHOW
// ==========================================

function startGallerySlideshow(){

    clearInterval(slideshowInterval);

    slideshowInterval = setInterval(()=>{

        if(currentImage < galleryImages.length - 1){

            currentImage++;

            showGallery(currentImage);

        }

        else{

            clearInterval(slideshowInterval);

            // Pause 5 seconds on the last image
            setTimeout(()=>{

                galleryNext.innerHTML = "💌 Continue to My Letter →";

                galleryNext.classList.add("pulse");

            },5000);

        }

    },5000);

}

// ==========================================
// ENTER GALLERY
// ==========================================

galleryBtn.addEventListener("click",()=>{

    fadeOut(pianoMusic);

    fadeIn(galleryMusic,.35);

    story.style.display="none";

    gallery.style.display="block";

    currentImage=0;

    showGallery(currentImage);

    startGallerySlideshow();

});

    

// ==========================================
// GALLERY NEXT
// ==========================================

galleryNext.addEventListener("click",()=>{
  clearInterval(slideshowInterval);
    if(currentImage < galleryImages.length-1){

        currentImage++;

        showGallery(currentImage);

    }

    else{

        fadeOut(galleryMusic);

        fadeIn(pianoMusic,.4);

        gallery.style.display="none";

        letter.style.display="block";

    }

});

// ==========================================
// GALLERY PREVIOUS
// ==========================================

galleryPrev.addEventListener("click",()=>{
  clearInterval(slideshowInterval);
    if(currentImage>0){

        currentImage--;

        showGallery(currentImage);

    }

    else{

        fadeOut(galleryMusic);

        fadeIn(pianoMusic,.4);

        gallery.style.display="none";

        story.style.display="block";

        currentCard = cards.length-1;

        showCard(currentCard);

    }

});

// ==========================================
// LETTER DATA
// ==========================================

const letterText = `My Dear Nancy,

As I write these words, I find myself reflecting on a journey that began with a simple opportunity but became so much more.

You may have seen me as just another young person looking for work, but what you gave me went far beyond employment. You gave me the chance to learn, to grow, and to discover strengths in myself that I didn't know existed.

Every correction, every piece of advice, every lesson, and every challenge became part of the person I am today.

Although there were moments that felt difficult, looking back now I understand that they were shaping me into someone stronger, more disciplined, and more responsible.

Thank you for believing in me.

Thank you for trusting me.

Thank you for investing your time and your patience in me.

There are some people we meet in life who are never forgotten because they leave something valuable behind.

For me, you are one of those people.

As you celebrate another beautiful year today, I simply want you to know that your kindness, your dedication and your influence continue to live in the hearts of those whose lives you've touched... including mine.

Happy Birthday Nancy.

May this new chapter bring you even greater joy, peace, success and countless reasons to smile.

With sincere gratitude,

❤️ JEMILA`;

// ==========================================
// TYPE LETTER
// ==========================================

function typeLetter(){

    typedLetter.innerHTML = "";

    let i = 0;

    function typing(){

        if(i >= letterText.length){

            typedLetter.innerHTML = letterText.replace(/\n/g,"<br>");

            showCelebrateButton();

            return;

        }

        typedLetter.innerHTML =
            letterText.substring(0,i+1).replace(/\n/g,"<br>") +
            '<span class="cursor">|</span>';

        let speed = 35;

        switch(letterText.charAt(i)){

            case ".":
                speed = 700;
                break;

            case ",":
                speed = 250;
                break;

            case "\n":
                speed = 900;
                break;

        }

        i++;

        setTimeout(typing,speed);

    }

    typing();

}

// ==========================================
// OPEN LETTER
// ==========================================

openLetter.addEventListener("click",()=>{

    openLetter.style.display = "none";

    letterPaper.style.display = "block";

    letterPaper.classList.add("open");

    typeLetter();

});

// ==========================================
// CELEBRATE BUTTON
// ==========================================

function showCelebrateButton(){

    if(document.getElementById("celebrateBtn")) return;

    const btn=document.createElement("button");

    btn.id="celebrateBtn";

    btn.className="gallery-start-btn";

    btn.innerHTML="🎉 Celebrate Birthday →";

    btn.style.marginTop="50px";

    letterPaper.appendChild(btn);

    btn.addEventListener("click",()=>{

        fadeOut(pianoMusic);

        fadeIn(birthdayMusic,.5);

        letter.style.display="none";

        birthday.style.display="block";

        startConfetti();

        const ending=document.querySelector(".ending");
        const signature=document.querySelector(".signature-end");
        const legacy=document.querySelector(".legacy-message");

        ending.style.opacity="0";
        signature.style.opacity="0";
        legacy.style.opacity="0";
        legacy.style.visibility="hidden";

        restartJourney.style.opacity="0";
        restartJourney.style.transform="translateY(30px)";

        setTimeout(()=>{

            ending.style.opacity="1";

        },8000);

        setTimeout(()=>{

            signature.style.opacity="1";

        },13000);

        setTimeout(()=>{

            legacy.style.visibility="visible";
            legacy.style.opacity="1";
            legacy.style.transform="translateY(0)";

        },18000);

        setTimeout(()=>{

            restartJourney.style.opacity="1";
            restartJourney.style.transform="translateY(0)";

        },24000);

    });

}

// ==========================================
// CONFETTI
// ==========================================

let confettiInterval;

function createConfetti(){

    const piece = document.createElement("div");

    piece.className = "confetti";

    piece.style.left = Math.random()*100 + "%";

    piece.style.width = (4 + Math.random()*6) + "px";

    piece.style.height = (8 + Math.random()*10) + "px";

    const colors = [

        "#FFD700",
        "#C9A227",
        "#D4AF37",
        "#B8860B"

    ];

    piece.style.background = colors[Math.floor(Math.random()*colors.length)];

    piece.style.animationDuration = (4 + Math.random()*4) + "s";

    confettiContainer.appendChild(piece);

    setTimeout(()=>{

        piece.remove();

    },8000);

}

function startConfetti(){

    if(confettiInterval) return;

    confettiInterval = setInterval(createConfetti,250);

}

function stopConfetti(){

    clearInterval(confettiInterval);

    confettiInterval = null;

}


// ==========================================
// RESTART
// ==========================================

restartJourney.addEventListener("click",()=>{

    thankYouModal.style.display = "flex";

});


closeJourney.addEventListener("click",()=>{

    thankYouModal.style.display = "none";

    stopConfetti();

    fadeOut(birthdayMusic);
    fadeOut(galleryMusic);
    fadeOut(pianoMusic);

    birthday.style.display = "none";
    letter.style.display = "none";
    gallery.style.display = "none";
    story.style.display = "none";

    hero.style.display = "flex";

    currentCard = 0;
    currentImage = 0;

    cards.forEach(card=>{

        card.style.display = "none";
        card.classList.remove("show");

    });

    galleryImage.src = galleryImages[0];
    galleryCaption.textContent = galleryCaptions[0];

    typedLetter.innerHTML = "";

    letterPaper.style.display = "none";
    letterPaper.classList.remove("open");

    openLetter.style.display = "inline-block";

    const celebrate=document.getElementById("celebrateBtn");

    if(celebrate){

        celebrate.remove();

    }

    restartJourney.style.opacity="0";
    restartJourney.style.transform="translateY(30px)";

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});



// ==========================================
// FLOATING GOLD PARTICLES
// ==========================================

setInterval(()=>{

    const p = document.createElement("div");

    p.className = "particle";

    p.style.left = Math.random() * 100 + "vw";

    p.style.animationDuration = (8 + Math.random() * 8) + "s";

    document.body.appendChild(p);

    setTimeout(()=>{

        p.remove();

    },16000);

},700);

// ==========================================
// HIDE LOADER WHEN PAGE IS READY
// ==========================================

