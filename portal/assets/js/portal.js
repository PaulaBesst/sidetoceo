// Portal functionality
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portal JS loaded")

  // Initialize AOS if available
  let AOS // Declare AOS variable
  if (typeof AOS !== "undefined") {
    AOS = window.AOS // Assign AOS from window if it exists
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    })
  }

  // Progress circle animation
  initProgressCircles()

  // Sidebar toggle for mobile
  initSidebar()

  // Form validation
  initFormValidation()
})

// Initialize progress circles
function initProgressCircles() {
  const progressCircles = document.querySelectorAll(".progress-circle")
  progressCircles.forEach((circle) => {
    const value = circle.getAttribute("data-value")
    const leftTransform = value <= 50 ? 0 : (value - 50) * 3.6
    const rightTransform = value <= 50 ? value * 3.6 : 180

    const leftBar = circle.querySelector(".progress-circle-left .progress-circle-bar")
    const rightBar = circle.querySelector(".progress-circle-right .progress-circle-bar")

    if (rightBar) {
      rightBar.style.transform = `rotate(${rightTransform}deg)`
    }

    if (leftBar) {
      leftBar.style.transform = `rotate(${leftTransform}deg)`
    }

    // Set the color
    circle.querySelectorAll(".progress-circle-bar").forEach((bar) => {
      bar.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--mint-secondary")
    })
  })
}

// Initialize sidebar functionality
function initSidebar() {
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebarClose = document.getElementById("sidebarClose")
  const sidebarContainer = document.querySelector(".portal-sidebar-container")

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebarContainer.classList.toggle("sidebar-mobile-open")
    })
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", () => {
      sidebarContainer.classList.remove("sidebar-mobile-open")
    })
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (event) => {
    if (
      window.innerWidth < 768 &&
      !event.target.closest(".portal-sidebar") &&
      !event.target.closest("#sidebarToggle") &&
      sidebarContainer &&
      sidebarContainer.classList.contains("sidebar-mobile-open")
    ) {
      sidebarContainer.classList.remove("sidebar-mobile-open")
    }
  })

  // Add active class to current sidebar link
  const currentPath = window.location.hash || "#/dashboard"
  const sidebarLinks = document.querySelectorAll(".sidebar-link")
  sidebarLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active")
    }
  })
}

// Initialize form validation
function initFormValidation() {
  const forms = document.querySelectorAll(".needs-validation")
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add("was-validated")
      },
      false,
    )
  })
}
