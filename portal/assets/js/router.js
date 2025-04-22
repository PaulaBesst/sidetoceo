// Simple client-side router
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app")
  const routes = {
    "": "login",
    "/": "login",
    "#/login": "login",
    "#/register": "register",
    "#/dashboard": "dashboard",
    "#/services": "services",
    "#/tracking": "tracking",
    "#/forms": "forms",
    "#/deliverables": "deliverables",
    "#/checkout": "checkout",
    "#/support": "support",
    "#/consultation-form": "consultation-form",
    "#/consultant-dashboard": "consultant/dashboard",
    "#/consultant-clients": "consultant/clients",
    "#/consultant-tasks": "consultant/tasks",
    "#/consultant-deliverables": "consultant/deliverables",
    "#/client-details": "consultant/client-details",
  }

  // Load page content
  async function loadPage(page) {
    try {
      console.log(`Attempting to load page: pages/${page}.html`)
      const response = await fetch(`pages/${page}.html`)
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const content = await response.text()
      app.innerHTML = content

      // Load components if needed
      const headerContainer = document.getElementById("headerContainer")
      const sidebarContainer = document.getElementById("sidebarContainer")
      const footerContainer = document.getElementById("footerContainer")

      if (headerContainer) {
        // Check if we're in consultant portal
        if (page.startsWith("consultant/")) {
          const headerResponse = await fetch("components/consultant-header.html")
          headerContainer.innerHTML = await headerResponse.text()
        } else {
          const headerResponse = await fetch("components/header.html")
          headerContainer.innerHTML = await headerResponse.text()
        }
      }

      if (sidebarContainer) {
        // Check if we're in consultant portal
        if (page.startsWith("consultant/")) {
          const sidebarResponse = await fetch("components/consultant-sidebar.html")
          sidebarContainer.innerHTML = await sidebarResponse.text()
        } else {
          const sidebarResponse = await fetch("components/sidebar.html")
          sidebarContainer.innerHTML = await sidebarResponse.text()
        }
      }

      if (footerContainer) {
        const footerResponse = await fetch("components/footer.html")
        footerContainer.innerHTML = await footerResponse.text()
      }

      // Initialize AOS
      if (typeof AOS !== "undefined") {
        AOS.init({
          duration: 800,
          once: true,
          offset: 100,
        })
      }

      // Add active class to current sidebar link
      const currentPath = window.location.hash
      const sidebarLinks = document.querySelectorAll(".sidebar-link")
      sidebarLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
          link.classList.add("active")
        }
      })

      // Initialize ApexCharts if we're on the consultant dashboard
      if (page === "consultant/dashboard" && typeof ApexCharts !== "undefined") {
        initConsultantDashboardCharts()
      }
    } catch (error) {
      console.error("Error loading page:", error)
      app.innerHTML = `<div class="alert alert-danger m-5">Error loading page: ${error.message}</div>`
    }
  }

  // Initialize consultant dashboard charts
  function initConsultantDashboardCharts() {
    // Client Activity Chart
    if (document.getElementById("clientActivityChart")) {
      const clientActivityOptions = {
        chart: {
          type: "area",
          height: 300,
          toolbar: {
            show: false,
          },
        },
        series: [
          {
            name: "Client Interactions",
            data: [30, 40, 35, 50, 49, 60, 70],
          },
          {
            name: "Deliverables Completed",
            data: [20, 25, 30, 35, 30, 40, 50],
          },
        ],
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        colors: ["#5ebfb5", "#e9c46a"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.5,
            opacityFrom: 0.7,
            opacityTo: 0.2,
          },
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
      }

      const clientActivityChart = new ApexCharts(document.getElementById("clientActivityChart"), clientActivityOptions)
      clientActivityChart.render()
    }

    // Task Distribution Chart
    if (document.getElementById("taskDistributionChart")) {
      const taskDistributionOptions = {
        chart: {
          type: "donut",
          height: 300,
        },
        series: [44, 55, 13, 33],
        labels: ["Brand Strategy", "Visual Identity", "Social Media", "Content Creation"],
        colors: ["#5ebfb5", "#e9c46a", "#2a9d8f", "#f4a261"],
        legend: {
          position: "bottom",
        },
      }

      const taskDistributionChart = new ApexCharts(
        document.getElementById("taskDistributionChart"),
        taskDistributionOptions,
      )
      taskDistributionChart.render()
    }
  }

  // Handle navigation
  function handleNavigation() {
    const path = window.location.hash || "/"
    const page = routes[path] || "login"
    console.log("Navigating to page:", page)
    loadPage(page)
  }

  // Initial load
  handleNavigation()

  // Listen for hash changes
  window.addEventListener("hashchange", handleNavigation)

  // Handle form submissions
  document.body.addEventListener("submit", (e) => {
    if (e.target.id === "loginForm") {
      e.preventDefault()
      console.log("Login form submitted")

      // Check if we're using the new login page with portal type selection
      const portalTypeElement = document.querySelector(".login-option.active")
      if (portalTypeElement) {
        const portalType = portalTypeElement.id === "consultantLoginOption" ? "consultant" : "client"
        console.log("Portal type detected:", portalType)

        if (portalType === "consultant") {
          window.location.hash = "#/consultant-dashboard"
        } else {
          window.location.hash = "#/dashboard"
        }
      } else {
        // Fallback to default client dashboard
        window.location.hash = "#/dashboard"
      }
    } else if (e.target.id === "registerForm") {
      e.preventDefault()
      window.location.hash = "#/dashboard"
    }
  })
})
