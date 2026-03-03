/* ================================
   GUEST NAME FROM URL
================================ */

const params = new URLSearchParams(window.location.search);
let guest = params.get("to");

if (guest) {
  guest = decodeURIComponent(guest.replace(/\+/g, " "));
  const guestEl = document.getElementById("guest-name");
  if (guestEl) {
    guestEl.innerText = "Dear " + guest;
  }
}

/* ================================
   COVER OPEN (MOBILE SAFE)
================================ */

document.addEventListener("DOMContentLoaded", () => {

  const cover = document.getElementById("cover");
  const content = document.getElementById("content");
  const audio = document.getElementById("bgSong");
  const muteBtn = document.getElementById("muteBtn");

  // Open invitation when cover tapped
  const wrapper = document.querySelector(".cover-image-wrapper");
  if (wrapper) {
    wrapper.addEventListener("click", openInvitation);
  }

  function openInvitation() {

    // Hide cover
    cover.style.display = "none";

    // Show content
    content.classList.add("show");

    // Enable scrolling (mobile fix)
    document.body.style.overflow = "auto";

    // Play music after user interaction (required on mobile)
    if (audio) {
      audio.muted = false;
      audio.play().catch(() => {});
    }

    window.scrollTo(0, 0);
  }

  /* ================================
     MUTE BUTTON
  ================================= */

  if (audio && muteBtn) {

    // Set initial icon
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";

    muteBtn.addEventListener("click", () => {
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    });
  }

  /* ================================
     GALLERY MODAL
  ================================= */

  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");

  document.querySelectorAll(".gallery-card img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    });
  });

  if (modal) {
    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modalImg) {
    modalImg.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent closing when clicking image
    });
  }

  /* ================================
     NAVBAR AUTO CLOSE (MOBILE)
  ================================= */

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });
  });

  /* ================================
     SCROLL REVEAL ANIMATION
  ================================= */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".section").forEach(section => {
    observer.observe(section);
  });

  /* ================================
     COUNTDOWN TIMER
  ================================= */

  const target = new Date("March 19, 2026 08:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (dEl) dEl.innerText = days;
    if (hEl) hEl.innerText = hours;
    if (mEl) mEl.innerText = minutes;
    if (sEl) sEl.innerText = seconds;

  }, 1000);

});