const defaultConfig = {
      group_name: "Smart Polymeric Biomaterials",
      tagline: "Pioneering Innovation in Science and Technology",
      home_description: "We are dedicated to advancing scientific knowledge through cutting-edge research and collaboration. Our team works on groundbreaking projects that shape the future of technology and innovation.",
      team_intro: "Meet the brilliant minds driving our research forward",
      background_color: "#667eea",
      surface_color: "#ffffff",
      text_color: "#1f2937",
      primary_action_color: "#7c3aed",
      secondary_action_color: "#6366f1",
      font_family: "Inter",
      font_size: 16
    };

    async function onConfigChange(config) {
      const customFont = config.font_family || defaultConfig.font_family;
      const baseFontStack = '-apple-system, BlinkMacSystemFont, sans-serif';
      const fontFamily = `${customFont}, ${baseFontStack}`;
      const baseSize = config.font_size || defaultConfig.font_size;
      
      const backgroundColor = config.background_color || defaultConfig.background_color;
      const surfaceColor = config.surface_color || defaultConfig.surface_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
      const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;

      document.body.style.fontFamily = fontFamily;
      document.body.style.fontSize = `${baseSize}px`;
      
      const pageWrapper = document.querySelector('.page-wrapper');
      if (pageWrapper) {
        pageWrapper.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, ${primaryActionColor} 100%)`;
      }

      const allText = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, li, label, button, input, textarea');
      allText.forEach(el => {
        el.style.fontFamily = fontFamily;
      });

      document.querySelectorAll('h1').forEach(el => el.style.fontSize = `${baseSize * 2.5}px`);
      document.querySelectorAll('h2').forEach(el => el.style.fontSize = `${baseSize * 2}px`);
      document.querySelectorAll('h3').forEach(el => el.style.fontSize = `${baseSize * 1.5}px`);
      document.querySelectorAll('p, li').forEach(el => el.style.fontSize = `${baseSize}px`);

      document.querySelectorAll('.bg-white, .team-card, .nav-container').forEach(el => {
        el.style.backgroundColor = surfaceColor;
      });

      document.querySelectorAll('h1, h2, h3, .text-gray-800').forEach(el => {
        el.style.color = textColor;
      });

      document.querySelectorAll('button[type="submit"]').forEach(el => {
        el.style.background = `linear-gradient(to right, ${primaryActionColor}, ${secondaryActionColor})`;
      });

      const navGroupName = document.getElementById('nav-group-name');
      const homeGroupName = document.getElementById('home-group-name');
      const homeTagline = document.getElementById('home-tagline');
      const homeDescription = document.getElementById('home-description');
      const teamIntro = document.getElementById('team-intro');

      if (navGroupName) navGroupName.textContent = config.group_name || defaultConfig.group_name;
      if (homeGroupName) homeGroupName.textContent = config.group_name || defaultConfig.group_name;
      if (homeTagline) homeTagline.textContent = config.tagline || defaultConfig.tagline;
      if (homeDescription) homeDescription.textContent = config.home_description || defaultConfig.home_description;
      if (teamIntro) teamIntro.textContent = config.team_intro || defaultConfig.team_intro;
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (value) => {
              config.background_color = value;
              window.elementSdk.setConfig({ background_color: value });
            }
          },
          {
            get: () => config.surface_color || defaultConfig.surface_color,
            set: (value) => {
              config.surface_color = value;
              window.elementSdk.setConfig({ surface_color: value });
            }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
              config.text_color = value;
              window.elementSdk.setConfig({ text_color: value });
            }
          },
          {
            get: () => config.primary_action_color || defaultConfig.primary_action_color,
            set: (value) => {
              config.primary_action_color = value;
              window.elementSdk.setConfig({ primary_action_color: value });
            }
          },
          {
            get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
            set: (value) => {
              config.secondary_action_color = value;
              window.elementSdk.setConfig({ secondary_action_color: value });
            }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => config.font_family || defaultConfig.font_family,
          set: (value) => {
            config.font_family = value;
            window.elementSdk.setConfig({ font_family: value });
          }
        },
        fontSizeable: {
          get: () => config.font_size || defaultConfig.font_size,
          set: (value) => {
            config.font_size = value;
            window.elementSdk.setConfig({ font_size: value });
          }
        }
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ["group_name", config.group_name || defaultConfig.group_name],
        ["tagline", config.tagline || defaultConfig.tagline],
        ["home_description", config.home_description || defaultConfig.home_description],
        ["team_intro", config.team_intro || defaultConfig.team_intro]
      ]);
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }
/*
    function showPage(pageId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });

  // store current active page before changing
  const current = document.querySelector('.content-section.active');
  if (current) previousPage = current.id;

  // switch pages
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active', 'text-purple-600');
    link.classList.add('text-gray-700');
  });
  
  const activeLink = document.querySelector(`[data-page="${pageId}"]`);
  if (activeLink) {
    activeLink.classList.add('active', 'text-purple-600');
    activeLink.classList.remove('text-gray-700');
  }
}

// Navigation links + dropdown items
document.querySelectorAll('.nav-link[data-page], .dropdown-item[data-page]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('data-page');
    showPage(pageId);
  });
});

// Cards and any other clickable data-page elements
document.querySelectorAll('[data-page]').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = item.getAttribute('data-page');
    showPage(pageId);
  });
});

*/

// highlight active nav link on multipage site
document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // Highlight active nav link
  // ---------------------------
  const currentPage = window.location.pathname.split("/").pop(); // e.g., "team.html"

  document.querySelectorAll("nav a").forEach(link => {
    const linkHref = link.getAttribute("href");
    if (!linkHref) return;

    // Only take the filename for comparison, ignore folders
    const linkPage = linkHref.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("text-purple-600", "font-bold");
      link.classList.remove("text-gray-700");
    } else {
      link.classList.remove("text-purple-600", "font-bold");
      link.classList.add("text-gray-700");
    }
  });
  });

  // ---------------------------
  // Contact form handling
  // ---------------------------
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        messageBox.textContent =
          "Thank you! Your message has been sent.";
        messageBox.className =
          "mt-4 p-4 rounded-lg bg-green-100 text-green-800";
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      messageBox.textContent =
        "Oops! Something went wrong. Please try again.";
      messageBox.className =
        "mt-4 p-4 rounded-lg bg-red-100 text-red-800";
    }

    messageBox.classList.remove("hidden");
  });
});



 // Scroll to Top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    

// robust slider initializer — supports multiple sliders

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slideshow-container').forEach(initSlider);

  function initSlider(container) {
    // find elements scoped to this container
    const slides = Array.from(container.querySelectorAll('.slide'));
    const prevBtn = container.querySelector('.slide-prev');
    const nextBtn = container.querySelector('.slide-next');
    const indicators = Array.from(container.querySelectorAll('.indicator'));

    if (!slides.length) {
      console.warn('Slider: no .slide elements found in container', container);
      return;
    }

    // ensure buttons exist — give helpful warnings
    if (!prevBtn) console.warn('Slider: .slide-prev button not found in container', container);
    if (!nextBtn) console.warn('Slider: .slide-next button not found in container', container);
    if (!indicators.length) console.warn('Slider: no .indicator elements found in container', container);

    let current = 0;
    let intervalId = null;
    const delay = 4000;

    // utility: show slide by index (wraps)
    function show(index) {
      index = ((index % slides.length) + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.style.opacity = i === index ? '1' : '0';
        s.style.pointerEvents = i === index ? 'auto' : 'none';
      });
      indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
      current = index;
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    function startAuto() {
      stopAuto();
      if (slides.length > 1) intervalId = setInterval(next, delay);
    }
    function stopAuto() {
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    // attach button events if present, within this container
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stopAuto();
        next();
        startAuto();
      });
      // optional hover transform
      nextBtn.addEventListener('mouseenter', () => nextBtn.style.transform = 'translateY(-50%) scale(1.08)');
      nextBtn.addEventListener('mouseleave', () => nextBtn.style.transform = 'translateY(-50%) scale(1)');
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stopAuto();
        prev();
        startAuto();
      });
      prevBtn.addEventListener('mouseenter', () => prevBtn.style.transform = 'translateY(-50%) scale(1.08)');
      prevBtn.addEventListener('mouseleave', () => prevBtn.style.transform = 'translateY(-50%) scale(1)');
    }

    // indicators
    indicators.forEach((ind, idx) => {
      ind.addEventListener('click', (e) => {
        e.preventDefault();
        stopAuto();
        show(idx);
        startAuto();
      });
    });

    // init
    show(0);
    startAuto();

    // pause on hover
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);

    // defensive: if window gains focus start autoplay again
    window.addEventListener('focus', startAuto);
    window.addEventListener('blur', stopAuto);
  }
});



//duble click to open modal
document.querySelectorAll(".slider-img").forEach(img => {
  img.addEventListener("dblclick", async function() {
    // Create image element
    const fullImg = document.createElement("img");
    fullImg.src = this.src;
    fullImg.classList.add("fullscreen-img");
    document.body.appendChild(fullImg);

    // Wait a tiny moment to ensure the element is in the DOM
    setTimeout(async () => {
      // Request fullscreen
      if (fullImg.requestFullscreen) {
        await fullImg.requestFullscreen();
      } else if (fullImg.webkitRequestFullscreen) { // Safari
        await fullImg.webkitRequestFullscreen();
      } else if (fullImg.msRequestFullscreen) { // IE/Edge
        await fullImg.msRequestFullscreen();
      }
    }, 50);

    // Remove image when fullscreen is exited
    function exitHandler() {
      if (!document.fullscreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement) {
        fullImg.remove();
        document.removeEventListener("fullscreenchange", exitHandler);
        document.removeEventListener("webkitfullscreenchange", exitHandler);
        document.removeEventListener("msfullscreenchange", exitHandler);
      }
    }

    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("msfullscreenchange", exitHandler);
  });
});


/*

// Toggle video visibility
const btn = document.getElementById('showVideoBtn');
const videoContainer = document.getElementById('videoContainer');
const video = document.querySelector('#videoContainer video');

btn.addEventListener('click', () => {
  videoContainer.classList.toggle('hidden');

  // If video becomes visible, start it
  if (!videoContainer.classList.contains('hidden')) {
    video.currentTime = 0; 
    video.play();
    videoContainer.scrollIntoView({ behavior: 'smooth' });
  } else {
    video.pause();
  }
});

// Hide video when it finishes
video.onended = () => {
  videoContainer.classList.add('hidden');
};
// Toggle video visibility
*/
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('showVideoBtn');
  const videoContainer = document.getElementById('videoContainer');
  const video = videoContainer.querySelector('video');

  if (!btn || !videoContainer || !video) return;

  btn.addEventListener('click', () => {
    videoContainer.classList.toggle('hidden');

    if (!videoContainer.classList.contains('hidden')) {
      video.currentTime = 0;
      video.play();
      videoContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
      video.pause();
    }
  });

  video.addEventListener('ended', () => {
    videoContainer.classList.add('hidden');
  });
});




 //Mobile menu toggle 

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.nextElementSibling;
      if (next) next.classList.toggle("hidden");
    });
  });
