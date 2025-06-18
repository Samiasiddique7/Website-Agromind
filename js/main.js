/**
* Template Name: Green
* Template URL: https://bootstrapmade.com/green-free-one-page-bootstrap-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()


// Get input elements
var engineSizeInput = document.getElementById("engine-size");
var cylindersInput = document.getElementById("cylinders");
var fuelConsumptionCityInput = document.getElementById("fuel-consumption-city");
var fuelConsumptionHighwayInput = document.getElementById("fuel-consumption-highway");
var fuelConsumptionCombinedInput = document.getElementById("fuel-consumption-combined"); // Corrected ID



// Add event listeners for keypress events
engineSizeInput.addEventListener("keypress", function(event) {
    // Allow digits, backspace key, and decimal point
    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 8 && event.key !== '.') {
        event.preventDefault();
    }
});

cylindersInput.addEventListener("keypress", function(event) {
    // Allow digits and backspace key
    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 8 && event.key !== '.') {
        event.preventDefault();
    }
});

fuelConsumptionCityInput.addEventListener("keypress", function(event) {
    // Allow digits, backspace key, and decimal point
    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 8 && event.key !== '.') {
        event.preventDefault();
    }
});

fuelConsumptionHighwayInput.addEventListener("keypress", function(event) {
    // Allow digits, backspace key, and decimal point
    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 8 && event.key !== '.') {
        event.preventDefault();
    }
});

fuelConsumptionCombinedInput.addEventListener("keypress", function(event) { // Corrected ID
    // Allow digits, backspace key, and decimal point
    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 8 && event.key !== '.') {
        event.preventDefault();
    }
});

// Disable negative sign input for engine size and cylinders inputs
engineSizeInput.addEventListener("input", function() {
    if (engineSizeInput.value < 0) {
        engineSizeInput.value = "";
    }
});

cylindersInput.addEventListener("input", function() {
    if (cylindersInput.value < 0) {
        cylindersInput.value = "";
    }
});

fuelConsumptionCityInput.addEventListener("input", function() {
    if (fuelConsumptionCityInput.value < 0) {
        fuelConsumptionCityInput.value = "";
    }
});

fuelConsumptionHighwayInput.addEventListener("input", function() {
    if (fuelConsumptionHighwayInput.value < 0) {
        fuelConsumptionHighwayInput.value = "";
    }
});

fuelConsumptionCombinedInput.addEventListener("input", function() {
    if (fuelConsumptionCombinedInput.value < 0) { // Corrected ID
        fuelConsumptionCombinedInput.value = "";
    }
});



// Function to fetch CO2 emission from the API
async function getCO2Emission(engineSize, cylinders, fuelConsumption, fuelConsumptionCity, fuelConsumptionHighway) {
    try {
        // Make a fetch request to your API endpoint
        const response = await fetch('http://127.0.0.1:5000/api/predict', {
            method: 'POST', // Adjust the HTTP method as needed
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ENGINE_SIZE: engineSize,
                CYLINDERS: cylinders,
                FUELCONSUMPTION_CITY: fuelConsumptionCity,
                FUELCONSUMPTION_HWY: fuelConsumptionHighway,
                FUELCONSUMPTION_COMB: fuelConsumption
            })
        });
        const data = await response.json();
        return data; // Return the response from the API
    } catch (error) {
        console.error('Error fetching CO2 emission:', error);
        return null; // Return null if there's an error
    }
}


document.getElementById("predict-btn").addEventListener("click", async function() {
    // Get input values
    var engineSize = parseFloat(engineSizeInput.value);
    var cylinders = parseInt(cylindersInput.value);
    var fuelConsumptionCity = parseFloat(fuelConsumptionCityInput.value);
    var fuelConsumptionHighway = parseFloat(fuelConsumptionHighwayInput.value);
    var fuelConsumption = parseFloat(fuelConsumptionCombinedInput.value);

    // Check if any input is empty (or NaN)
    if (
        isNaN(engineSize) ||
        isNaN(cylinders) ||
        isNaN(fuelConsumptionCity) ||
        isNaN(fuelConsumptionHighway) ||
        isNaN(fuelConsumption)
    ) {
        alert("Please fill all values.");
        return;
    }

    // Check if any input is negative
    if (engineSize < 0 || cylinders < 0 || fuelConsumptionCity < 0 || fuelConsumptionHighway < 0 || fuelConsumption < 0) {
        alert("Please enter positive values only.");
        return;
    }

    // Call the function to fetch CO2 emission
    const co2EmissionResponse = await getCO2Emission(engineSize, cylinders, fuelConsumptionCity, fuelConsumptionHighway, fuelConsumption);
    
    // Display CO2 emission result
    if (co2EmissionResponse && typeof co2EmissionResponse.response === 'number') {
        document.getElementById("prediction-result").innerHTML = `<strong>CO2 emission from vehicle is: ${co2EmissionResponse.response} (g/km)</strong>`;

        // Clear input fields
        engineSizeInput.value = '';
        cylindersInput.value = '';
        fuelConsumptionCityInput.value = '';
        fuelConsumptionHighwayInput.value = '';
        fuelConsumptionCombinedInput.value = '';
    } else {
        document.getElementById("prediction-result").innerText = "Failed to fetch CO2 emission data.";
    }
});
