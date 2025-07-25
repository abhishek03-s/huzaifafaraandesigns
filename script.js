document.addEventListener("DOMContentLoaded", () => {
  // ✅ AOS Animations
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  // ✅ Light/Dark Mode Toggle
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

  // ✅ Hero Slider (Titles & Background)
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroRoleTitle = document.querySelector(".hero-role-title");
  const heroRoleDesc = document.querySelector(".hero-role-description");
  const heroContent = document.querySelector(".hero-content");

  const roleTitles = [
    "Architecture", "Interior", "Planner", "Project Management",
    "3D Visualization", "Landscape", "Site Execution"
  ];

  const roleDescriptions = [
    "Designing timeless structures that merge creativity and functionality.",
    "Creating elegant, functional, and personalized interior environments.",
    "Transforming your vision into structured, practical blueprints.",
    "Overseeing your project from concept to completion with precision.",
    "Bringing concepts to life with detailed, realistic 3D renders.",
    "Designing green, beautiful, and functional outdoor spaces.",
    "Executing site plans with accuracy and professional care."
  ];

  let currentSlide = 0;
  function updateHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    heroContent.classList.remove("show");
    setTimeout(() => {
      if (heroRoleTitle && heroRoleDesc) {
        heroRoleTitle.textContent = roleTitles[index] || "";
        heroRoleDesc.textContent = roleDescriptions[index] || "";
      }
      heroContent.classList.add("show");
    }, 300);
  }

  updateHeroSlide(currentSlide);
  setTimeout(() => heroContent.classList.add("show"), 100);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateHeroSlide(currentSlide);
  }, 5000);

  // ✅ WhatsApp Contact Form
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

  // ✅ Lightbox Gallery
  const lightbox = document.getElementById("lightbox");
  const lightboxWrapper = document.querySelector(".lightbox-wrapper");
  const lightboxClose = document.querySelector(".lightbox-close");
  const caption = document.querySelector(".lightbox-caption");
  const images = Array.from(document.querySelectorAll(".project-item img"));

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightboxWrapper.innerHTML = "";
      images.forEach((imgEl) => {
        const clone = imgEl.cloneNode(true);
        clone.classList.add("lightbox-img-item");
        lightboxWrapper.appendChild(clone);
      });

      lightbox.classList.add("show");
      document.body.style.overflow = "hidden";
      caption.textContent = img.alt || "";

      requestAnimationFrame(() => {
        const targetImg = lightboxWrapper.children[index];
        if (targetImg) {
          targetImg.scrollIntoView({ behavior: "instant", inline: "center" });
        }
      });
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    lightboxWrapper.innerHTML = "";
    caption.textContent = "";
  }

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ✅ Square Sliders (Rooms + Categories)
  function startSlider(id, className) {
    const slides = document.querySelectorAll(`#${id} .${className}`);
    let index = 0;
    if (slides.length) {
      slides[index].classList.add("active");
      setInterval(() => {
        slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
        index = (index + 1) % slides.length;
      }, 4000);
    }
  }

  // Start sliders
  startSlider("living-carousel", "room-slide");
  startSlider("kitchen-carousel", "room-slide");
  startSlider("bedroom-carousel", "room-slide");

  document.querySelectorAll(".square-slider").forEach(slider => {
    const imgs = slider.querySelectorAll("img");
    let i = 0;
    if (imgs.length) imgs[i].classList.add("active");

    setInterval(() => {
      imgs[i].classList.remove("active");
      i = (i + 1) % imgs.length;
      imgs[i].classList.add("active");
    }, 3000);
  });

  // ✅ Tab Switching Logic (Photos/Videos)
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetId = btn.getAttribute("data-target");
      document.querySelectorAll(".tab-content").forEach((tab) => {
        tab.style.display = tab.id === targetId ? "block" : "none";
      });
    });
  });

  // ✅ Project Tab Filtering (NO Shuffle)
  const tabButtons = document.querySelectorAll(".tab-btn");
  const projectItems = document.querySelectorAll(".project-item");

  function filterProjects(category) {
    tabButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === category);
    });

    projectItems.forEach(item => {
      const itemCategory = item.dataset.category;
      const show = category === "all" || itemCategory === category;
      item.style.display = show ? "block" : "none";
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterProjects(filter);
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");
  filterProjects(categoryParam || "all");

  // ✅ Video Toggle Button (If used)
  const toggleBtn = document.getElementById("toggleVideosBtn");
  const videoSection = document.getElementById("customVideoSection");
  toggleBtn?.addEventListener("click", () => {
    const isVisible = videoSection.classList.contains("show");
    videoSection.classList.toggle("show");
    toggleBtn.textContent = isVisible ? "🎥 Watch Our Videos" : "📽 Hide Videos";
  });

  // ✅ Award Image Auto Switch (Award 2 & 3)
  document.querySelectorAll(".animated-award .award-image-slider").forEach(slider => {
    const slides = slider.querySelectorAll("img");
    let index = 0;
    setInterval(() => {
      slides.forEach((img, i) => img.classList.toggle("active", i === index));
      index = (index + 1) % slides.length;
    }, 3000);
  });
});


const tabButtons = document.querySelectorAll(".tab-btn");
const projectItems = document.querySelectorAll(".project-item");

function filterProjects(category) {
  tabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === category);
  });

  projectItems.forEach(item => {
    const itemCategory = item.dataset.category;
    const show = category === "all" || itemCategory === category;
    item.style.display = show ? "block" : "none";
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterProjects(filter);
  });
});

const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get("category");
filterProjects(categoryParam || "all");

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
setInterval(showNextSlide, 4000);



