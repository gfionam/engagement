// Nama tamu dari URL
const params=new URLSearchParams(window.location.search);
let guest=params.get("to");
if(guest){
  guest=decodeURIComponent(guest.replace(/\+/g," "));
  document.getElementById("guest-name").innerText="Dear "+guest;
}


const audio = document.getElementById("bgSong");
const muteBtn = document.getElementById("muteBtn");
// set initial icon based on state
muteBtn.textContent = audio.muted ? "🔇" : "🔊";

muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
});

// buka amplop
function openInvitation(){
  const env = document.querySelector(".envelope");
  env.classList.add("open");

  setTimeout(()=>{
    const cover = document.getElementById("cover");
    const content = document.getElementById("content");

    cover.style.display = "none";
    content.style.display = "block";
    setTimeout(()=>{ content.style.opacity="1"; },50);

    if (audio.paused) {
        audio.play().catch(()=>{});
    }

    window.scrollTo(0,0);
  },800);
}

// GALLERY POPUP
function openImage(img){
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeImage(){
  document.getElementById("imgModal").style.display = "none";
}

// reveal sections on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold:0.2 });

document.querySelectorAll(".section").forEach(section=>{
  observer.observe(section);
});

// countdown 19 Maret 2026
const target=new Date("March 19, 2026 08:00:00").getTime();
setInterval(()=>{
  const now=new Date().getTime();
  const d=target-now;

  document.getElementById("days").innerText=Math.floor(d/(1000*60*60*24));
  document.getElementById("hours").innerText=Math.floor((d/(1000*60*60))%24);
  document.getElementById("minutes").innerText=Math.floor((d/(1000*60))%60);
  document.getElementById("seconds").innerText=Math.floor((d/1000)%60);
},1000);