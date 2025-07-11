document.addEventListener("DOMContentLoaded", () => {
  // ✅ AOS Animations
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  // ✅ Theme Toggle with LocalStorage
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const sun = themeToggle?.querySelector(".sun");
  const moon = themeToggle?.querySelector(".moon");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    sun && (sun.style.opacity = "0");
    moon && (moon.style.opacity = "1");
  }

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (sun && moon) {
      sun.style.opacity = isDark ? "0" : "1";
      moon.style.opacity = isDark ? "1" : "0";
    }
  });

  // ✅ Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("show");
  });

  // ✅ Hero Slider (index.html only)
  const heroSlides = document.querySelectorAll(".hero-slide");
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    function showHeroSlide(index) {
      heroSlides.forEach((slide, i) =>
        slide.classList.toggle("active", i === index)
      );
    }
    showHeroSlide(currentSlide);
    setInterval(() => {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showHeroSlide(currentSlide);
    }, 5000);
  }

  // ✅ Tab Toggle (Photos/Videos)
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

  // ✅ WhatsApp Form Submit
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
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ✅ Lightbox Modal
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  // Open lightbox on clicking any project image inside .project-item
  document.querySelectorAll(".project-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("show");
      document.body.style.overflow = "hidden"; // prevent background scroll
    });
  });

  // Close lightbox on clicking close button or outside the image
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    lightboxImg.alt = "";
  }
});
