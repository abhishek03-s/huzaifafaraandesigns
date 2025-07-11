document.addEventListener("DOMContentLoaded", () => {
  // ✅ AOS Animations
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  // ✅ Light/Dark Mode
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") body.classList.add("dark");

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
  });

  // ✅ Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger?.addEventListener("click", () => navLinks?.classList.toggle("show"));

  document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
      }
    });
  });

  // ✅ Hero Slider (index.html only)
  const heroSlides = document.querySelectorAll(".hero-slide");
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    const showHeroSlide = (index) => {
      heroSlides.forEach((slide, i) =>
        slide.classList.toggle("active", i === index)
      );
    };
    showHeroSlide(currentSlide);
    setInterval(() => {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showHeroSlide(currentSlide);
    }, 5000);
  }

  // ✅ Project Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const photosSection = document.getElementById("photos-section");
  const videosSection = document.getElementById("videos-section");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (photosSection && videosSection) {
        photosSection.style.display = "none";
        videosSection.style.display = "none";
        if (target === "photos-section") photosSection.style.display = "block";
        if (target === "videos-section") videosSection.style.display = "block";
      }
    });
  });

  // ✅ WhatsApp Form
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector("[name='name']").value.trim();
      const phone = contactForm.querySelector("[name='phone']").value.trim();
      const email = contactForm.querySelector("[name='email']").value.trim();
      const message = contactForm.querySelector("[name='message']").value.trim();
      if (!name || !phone || !email || !message) {
        formStatus.textContent = "❗ Please fill in all fields.";
        return;
      }
      const fullMessage = encodeURIComponent(
        `*New Project Inquiry*\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`
      );
      const whatsappNumber = "917447857802";
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${fullMessage}`;
      window.open(whatsappURL, "_blank");
      formStatus.textContent = "✅ Opening WhatsApp...";
      contactForm.reset();
    });
  }

  // ✅ Back to Top Button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "backToTop";
  backToTopBtn.title = "Back to top";
  backToTopBtn.textContent = "↑";
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ✅ Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const caption = document.querySelector(".lightbox-caption");
  const nextBtn = document.querySelector(".lightbox-nav.next");
  const prevBtn = document.querySelector(".lightbox-nav.prev");
  const images = Array.from(document.querySelectorAll(".project-item img"));

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const img = images[currentIndex];
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
    lightboxImg.alt = "";
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ✅ Only enable navigation on desktop
  if (window.innerWidth > 768) {
    nextBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    });

    prevBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("show")) return;
      if (e.key === "ArrowRight") nextBtn?.click();
      if (e.key === "ArrowLeft") prevBtn?.click();
      if (e.key === "Escape") closeLightbox();
    });
  } else {
    // ❌ Hide navigation buttons on mobile
    nextBtn?.style.setProperty("display", "none");
    prevBtn?.style.setProperty("display", "none");
  }
});
