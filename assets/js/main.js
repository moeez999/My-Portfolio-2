/**
 * Template Name: PortFolio
 * Template URL: https://bootstrapmade.com/PortFolio-bootstrap-portfolio-html-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

const services = [
  {
    title: "Custom Websites",
    description:
      "Tailored web solutions with modern approach and technologies.",
    icon: "bi bi-code-slash",
  },
  {
    title: "WordPress Websites",
    description: "Professional WordPress sites with custom themes and plugins.",
    icon: "bi bi-wordpress",
  },
  {
    title: "Figma Conversions",
    description: "Convert your Figma designs to pixel-perfect web interfaces.",
    icon: "bi bi-ui-radios-grid",
  },
  {
    title: "Figma to HTML/CSS/JS",
    description:
      "Convert Figma designs into responsive HTML, CSS, and JavaScript.",
    icon: "bi bi-filetype-html",
  },
  {
    title: "Figma to React/Next.js",
    description:
      "Tailwind, Bootstrap, Material UI, Chakra UI support for Figma to React.",
    icon: "bi bi-filetype-jsx",
  },
  {
    title: "Figma to WordPress",
    description: "Get your Figma design seamlessly integrated into WordPress.",
    icon: "bi bi-wordpress",
  },

  {
    title: "Custom Scripts",
    description:
      "Custom JavaScript and jQuery scripts for enhanced web interactivity.",
    icon: "bi bi-terminal",
  },
  {
    title: "Chrome Extensions",
    description: "We build powerful Chrome extensions to suit your needs.",
    icon: "bi bi-browser-chrome",
  },
  {
    title: "E-Learning Platform",
    description:
      "Design and develop e-learning platforms tailored to your requirements.",
    icon: "bi bi-mortarboard",
  },
];

const servicesContainer = document.getElementById("servicesContainer");

services.forEach((service, index) => {
  const serviceItem = `
    <div class="swiper-slide service-slide">
      <div class="service-item position-relative">
        <div class="icon">
          <i class="${service.icon}"></i>
        </div>
        <a href="#" class="stretched-link">
          <h3>${service.title}</h3>
        </a>
        <p>${service.description}</p>
      </div>
    </div>
  `;
  servicesContainer.innerHTML += serviceItem;
});

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 40,
  loop: true,
  navigation: false,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1600: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1800: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },
});

// Array of testimonials
const testimonials = [
  {
    name: "medvita",
    country: "RO, Romania",
    rating: 5,
    message: "Extraordinary work! I received exactly what I asked for!",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "maahirfx",
    country: "GB, United Kingdom",
    rating: 5,
    message:
      "Second time working with Moeez – great seller, fantastic communication and great customer service!",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "maahirfx",
    country: "GB, United Kingdom",
    rating: 5,
    message:
      "Very good – did exactly what we needed him to, I appreciate that he did multiple revisions for us too.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "innodjet",
    country: "US, United States",
    rating: 5,
    message:
      "Nice to work with Moeez, friendly and a nice person to work with... highly recommend him.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "innodjet",
    country: "US, United States",
    rating: 5,
    message:
      "Exceptional work and very easy to work with.. highly recommend him.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "heavy_user",
    country: "LK, Sri Lanka",
    rating: 5,
    message: "Great work, thank you!",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "innodjet",
    country: "US, United States",
    rating: 5,
    message: "Nice work!",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "sazz3000",
    country: "US, United States",
    rating: 5,
    message: "Job well done!",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "soulyblz",
    country: "BE, Belgium",
    rating: 4,
    message: "Good work with Moeez.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "zamaryrichiusa",
    country: "DE, Germany",
    rating: 5,
    message:
      "I am very happy with the way we worked; he completed what I needed and made changes quickly. His English was very good, and he made a great website, menu, and logo for me.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "manuelaguillen",
    country: "VE, Venezuela",
    rating: 5,
    message: "Always keen to make the requested changes.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "oknoir",
    country: "FR, France",
    rating: 5,
    message:
      "Thank you Moeez for your great job. We will work again on a new project soon.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "edwinperdue",
    country: "US, United States",
    rating: 5,
    message:
      "Excellent service! Just got my Figma design converted to React in 12 hours. Highly recommend, thank you!",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "zubabar",
    country: "GB, United Kingdom",
    rating: 5,
    message:
      "Moez is simply a great coder, quick response and excellent piece of work. Highly recommended.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "typhoonx",
    country: "IN, India",
    rating: 5,
    message:
      "My work may have been a bit difficult, so he couldn't do it. But he tried many times. I appreciate his efforts, and I hope he will improve his skills in the future.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "sgr8900",
    country: "IN, India",
    rating: 5,
    message: "Patient and professional.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "zubabar",
    country: "GB, United Kingdom",
    rating: 5,
    message:
      "Moeez has impressed us twice with flawless deliverables, showcasing his commitment to excellence. His proactive communication, including a video summary for approval, sets him apart.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "usama_6666",
    country: "AU, Australia",
    rating: 5,
    message:
      "Excellent work by Moeez, perfect excellent responsive design. Will work with him again; communication skills are nice.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "zubabar",
    country: "GB, United Kingdom",
    rating: 5,
    message: "Great work, fast delivery, very pleased. Highly recommended.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "juliano1408",
    country: "US, United States",
    rating: 5,
    message:
      "I had the absolute pleasure of working with Moeez on a project to convert a Figma design into a fully functional HTML, CSS, JavaScript, jQuery, and React web application. I cannot express enough how impressed I am with Moeez's skills and professionalism.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "abdullahzahid97",
    country: "AE, United Arab Emirates",
    rating: 5,
    message:
      "There were responsive design issues, and some button functionality was not working properly. He fixed the errors in just 5 hours. Excellent work. Recommend to everyone.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "ranaobaid852",
    country: "GB, United Kingdom",
    rating: 5,
    message:
      "Top man, top job, well done, really appreciated. Will work with the seller again.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
  {
    name: "ukazaa",
    country: "AU, Australia",
    rating: 5,
    message: "Excellent work by Moeez! I hope to work with this seller again.",
    image: "./assets/img/download.jpg", // Replace with actual image path if available
  },
];

// Function to render testimonials
function renderTestimonials() {
  const swiperWrapper = document.getElementById("testimonial-swiper-wrapper");

  testimonials.forEach((testimonial) => {
    const testimonialItem = document.createElement("div");
    testimonialItem.classList.add("swiper-slide");
    testimonialItem.innerHTML = `
      <div class="testimonial-item">
        <img src="${testimonial.image}" class="testimonial-img" alt="" />
        <h3>${testimonial.name}</h3>
        <h4>${testimonial.country}</h4>
        <div class="stars">${'<i class="bi bi-star-fill"></i>'.repeat(
          testimonial.rating
        )}</div>
        <p>
          <i class="bi bi-quote quote-icon-left"></i>
          ${testimonial.message}
          <i class="bi bi-quote quote-icon-right"></i>
        </p>
      </div>
    `;
    swiperWrapper.appendChild(testimonialItem);
  });
}

// Call the function to render testimonials
renderTestimonials();

const portfolioItems = [
  {
    id: 1,
    category: "filter-Next",
    title: "SEES",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/sees.gif",
    previewImg: "assets/img/portfolio/sees1 (1).png",
    link: "https://sees.co.uk/",
  },
  {
    id: 2,
    category: "filter-Next",
    title: "Nectos",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/nectos.png",
    previewImg: "assets/img/portfolio/nectos.png",
    link: "https://nectos-iota.vercel.app/",
  },
  {
    id: 15,
    category: "filter-Next",
    title: "Nectos Dashboard",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/nectosdash.png",
    previewImg: "assets/img/portfolio/nectosdash.png",
    link: "https://nectos-iota.vercel.app/dashboard",
  },
  {
    id: 16,
    category: "filter-Next",
    title: "TechXen Technology IT Solution",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/tech.png",
    previewImg: "assets/img/portfolio/tech.png",
    link: "https://techxen-technology-it-solution.netlify.app/,
  },

  {
    id: 3,
    category: "filter-react",
    title: "Repack Marketing",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/Repack.png",
    previewImg: "assets/img/portfolio/Repack.png",
    link: "https://repackmarketing.vercel.app/",
  },

  {
    id: 4,
    category: "filter-react",
    title: "Qarby",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/qarby.png",
    previewImg: "assets/img/portfolio/qarby.png",
    link: "https://qarby.com",
  },

  {
    id: 5,
    category: "filter-react",
    title: "Enderial Technologies",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/2.png",
    previewImg: "assets/img/portfolio/2.png",
    link: "https://enderial-technologies-website.vercel.app/",
  },

  {
    id: 9,
    category: "filter-react",
    title: "Trendy",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/7.gif",
    previewImg: "assets/img/portfolio/7.gif",
    link: "https://trendybymoeez.netlify.app//",
  },
  {
    id: 11,
    category: "filter-wordpress",
    title: "Frame Up",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/frameup.png",
    previewImg: "assets/img/portfolio/frameup.png",
    link: "https://frameup.hannahscatahoulasofsc.com/",
  },
  {
    id: 10,
    category: "filter-react",
    title: "Zenara",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/zenara.png",
    previewImg: "assets/img/portfolio/zenara.png",
    link: "https://silver-panda-8af4a8.netlify.app/",
  },
  {
    id: 16,
    category: "filter-react",
    title: "Coin Network",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/coinnetwork.png",
    previewImg: "assets/img/portfolio/coinnetwork.png",
    link: "https://coinbymoeez.netlify.app/",
  },
  {
    id: 17,
    category: "filter-htmlcssjs",
    title: "Adam and Annalisa",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/adam.png",
    previewImg: "assets/img/portfolio/adam.png",
    link: "https://guileless-llama-9eb7d9.netlify.app/",
  },
  {
    id: 18,
    category: "filter-Nuxt",
    title: "Thortok",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/thortok.png",
    previewImg: "assets/img/portfolio/thortok.png",
    link: "https://thortok-delta.vercel.app/",
  },

  {
    id: 12,
    category: "filter-htmlcssjs",
    title: "SMMPANEL Marketing",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/marketing.gif",
    previewImg: "assets/img/portfolio/marketing.gif",
    link: "https://smmpanelproduction.netlify.app/",
  },
  {
    id: 13,
    category: "filter-htmlcssjs",
    title: "Online Communities",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/onlinecommunities.png",
    previewImg: "assets/img/portfolio/onlinecommunities.png",
    link: "https://onlinecommunities.netlify.app/",
  },
  {
    id: 14,
    category: "filter-htmlcssjs",
    title: "PSD TO HTML",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/psdtohtml.png",
    previewImg: "assets/img/portfolio/psdtohtml.png",
    link: "https://tangerine-palmier-bd4f28.netlify.app/",
  },
  {
    id: 19,
    category: "filter-htmlcssjs",
    title: "Porfolio",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/portfolio.png",
    previewImg: "assets/img/portfolio/portfolio.png",
    link: "https://prismatic-entremet-29da0e.netlify.app/",
  },
  {
    id: 7,
    category: "filter-react",
    title: "Flash Cube IT",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/flashcubeit.png",
    previewImg: "assets/img/portfolio/flashcubeit.png",
    link: "https://eloquent-empanada-f0badc.netlify.app/",
  },
  {
    id: 8,
    category: "filter-htmlcssjs",
    title: "Zamy Massage",
    description: "Lorem ipsum, dolor sit amet consectetur",
    imgSrc: "assets/img/portfolio/zamy.gif",
    previewImg: "assets/img/portfolio/zamy.gif",
    link: "https://zamymassageandwax.co.uk/",
  },

  // {
  //   id: 100,
  //   category: "filter-Next",
  //   title: "Branding 1",
  //   description: "Lorem ipsum, dolor sit amet consectetur",
  //   imgSrc: "assets/img/portfolio/football.gif",
  //   previewImg: "assets/img/portfolio/branding-1.jpg",
  //   link: "portfolio-details.html",
  // },

  // Add more items here as needed
];

const portfolioContainer = document.querySelector(".isotope-container");

portfolioItems.forEach((item) => {
  const portfolioItem = document.createElement("div");
  portfolioItem.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${item.category}`;
  portfolioItem.innerHTML = `
    <img src="${item.imgSrc}" class="img-fluid" alt="${item.title}" />
    <div class="portfolio-info">
      <h4>${item.title}</h4>
      <p>${item.description}</p>
      <a href="${item.previewImg}" title="${item.title}" data-gallery="portfolio-gallery-${item.category}" class="glightbox preview-link">
        <i class="bi bi-zoom-in"></i>
      </a>
      <a href="${item.link}" target="_blank" title="More Details" class="details-link">
        <i class="bi bi-link-45deg"></i>
      </a>
    </div>
  `;
  portfolioContainer.appendChild(portfolioItem);
});
