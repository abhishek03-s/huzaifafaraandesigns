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

  // ✅ Lightbox for Project Images
  const lightbox = document.getElementById("lightbox");
  const lightboxWrapper = document.querySelector(".lightbox-wrapper");
  const lightboxClose = document.querySelector(".lightbox-close");

  const images = Array.from(document.querySelectorAll(".project-item img"));

  images.forEach((img) => {
    img.addEventListener("click", () => {
      // Clear existing content
      lightboxWrapper.innerHTML = "";

      // Create scrollable gallery
      images.forEach((imgEl) => {
        const clone = imgEl.cloneNode(true);
        clone.classList.add("lightbox-img-item");
        lightboxWrapper.appendChild(clone);
      });

      // Scroll to clicked image
      const index = images.indexOf(img);
      lightbox.classList.add("show");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const targetImg = lightboxWrapper.children[index];
        targetImg.scrollIntoView({ inline: "center", behavior: "instant", block: "nearest" });
      }, 0);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    lightboxWrapper.innerHTML = "";
  }
});
