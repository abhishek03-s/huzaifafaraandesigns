document.addEventListener("DOMContentLoaded", () => {
  // ✅ AOS
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  // ✅ Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") body.classList.add("dark");

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
  });

  // ✅ Hamburger
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("show");
  });
  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
      }
    });
  });

  // ✅ Hero Slider
  const heroSlides = document.querySelectorAll(".hero-slide");
  if (heroSlides.length > 0) {
    let current = 0;
    const showSlide = (i) => {
      heroSlides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    };
    showSlide(current);
    setInterval(() => {
      current = (current + 1) % heroSlides.length;
      showSlide(current);
    }, 5000);
  }

  // ✅ Tabs (Projects)
  const tabs = document.querySelectorAll(".tab-btn");
  const photos = document.getElementById("photos-section");
  const videos = document.getElementById("videos-section");
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (btn.dataset.target === "photos-section") {
        photos.style.display = "block";
        videos.style.display = "none";
      } else {
        videos.style.display = "block";
        photos.style.display = "none";
      }
    });
  });

  // ✅ WhatsApp Form
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const phone = contactForm.phone.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !phone || !email || !message) {
        formStatus.textContent = "❗ Please fill in all fields.";
        return;
      }
      const msg = `*New Project Inquiry*\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`;
      const url = `https://wa.me/917447857802?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
      formStatus.textContent = "✅ Opening WhatsApp...";
      contactForm.reset();
    });
  }

  // ✅ Back to Top
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.title = "Back to top";
  backToTop.textContent = "↑";
  document.body.appendChild(backToTop);
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ✅ Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const caption = document.querySelector(".lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");
  const nextBtn = document.querySelector(".lightbox-nav.next");
  const prevBtn = document.querySelector(".lightbox-nav.prev");
  const fullscreenBtn = document.querySelector(".lightbox-fullscreen");

  const images = Array.from(document.querySelectorAll(".project-item img"));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const img = images[index];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = img.alt || "";
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    caption.textContent = "";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
  }

  images.forEach((img, i) => {
    img.addEventListener("click", () => openLightbox(i));
  });

  nextBtn?.addEventListener("click", showNext);
  prevBtn?.addEventListener("click", showPrev);
  closeBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  fullscreenBtn?.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      lightbox.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // ✅ Swipe Events for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  lightboxImg.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  lightboxImg.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) showNext();
    if (touchEndX > touchStartX + 50) showPrev();
  }
});
