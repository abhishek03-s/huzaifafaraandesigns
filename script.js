document.addEventListener("DOMContentLoaded", () => {
  // ✅ Initialize AOS animations
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  // ✅ Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const sun = themeToggle.querySelector(".sun");
      const moon = themeToggle.querySelector(".moon");
      sun.style.opacity = document.body.classList.contains("dark") ? "0" : "1";
      moon.style.opacity = document.body.classList.contains("dark") ? "1" : "0";
    });
  }

  // ✅ Mobile Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // ✅ Hero Background Slider (only on index.html)
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

  // ✅ Tab Toggle (Photos/Videos for both pages)
  const tabButtons = document.querySelectorAll(".tab-btn");
  const photosSection = document.getElementById("photos-section");
  const videosSection = document.getElementById("videos-section");
  const photosGrid = document.getElementById("photos");
  const videosGrid = document.getElementById("videos");

  if (tabButtons.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        // Remove 'active' from all tab buttons
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // ✅ Section toggle (index.html)
        if (photosSection && videosSection) {
          photosSection.style.display = "none";
          videosSection.style.display = "none";

          if (target === "photos-section") {
            photosSection.style.display = "block";
          } else if (target === "videos-section") {
            videosSection.style.display = "block";
          }
        }

        // ✅ Grid toggle (project.html)
        if (photosGrid && videosGrid) {
          photosGrid.classList.remove("show");
          videosGrid.classList.remove("show");

          if (target === "photos") {
            photosGrid.classList.add("show");
          } else if (target === "videos") {
            videosGrid.classList.add("show");
          }
        }
      });
    });
  }

  // ✅ WhatsApp Submission
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
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
        "*New Project Inquiry*\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n" +
        "Message: " + message
      );

      const whatsappNumber = "917447857802"; // Replace with your WhatsApp number
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${fullMessage}`;

      window.open(whatsappURL, "_blank");

      formStatus.textContent = "✅ Opening WhatsApp...";
      contactForm.reset();
    });
  }
});
