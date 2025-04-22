// Consultant Portal JavaScript

document.addEventListener("DOMContentLoaded", () => {
  console.log("Consultant Portal JS loaded")

  // Initialize charts if ApexCharts is available and we're on the dashboard
  if (typeof ApexCharts !== "undefined" && document.getElementById("clientActivityChart")) {
    initDashboardCharts()
  }

  // Initialize any datepickers
  if (typeof flatpickr !== "undefined") {
    const datepickers = document.querySelectorAll(".datepicker")
    if (datepickers.length > 0) {
      datepickers.forEach((picker) => {
        flatpickr(picker, {
          dateFormat: "Y-m-d",
          minDate: "today",
        })
      })
    }
  }

  // Task checkboxes
  const taskCheckboxes = document.querySelectorAll('.task-checkbox input[type="checkbox"]')
  if (taskCheckboxes.length > 0) {
    taskCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const taskItem = this.closest(".task-item")
        if (this.checked) {
          taskItem.style.opacity = "0.6"
          taskItem.querySelector(".task-content h6").style.textDecoration = "line-through"
        } else {
          taskItem.style.opacity = "1"
          taskItem.querySelector(".task-content h6").style.textDecoration = "none"
        }
      })
    })
  }

  // Client filter
  const clientFilter = document.getElementById("clientFilter")
  if (clientFilter) {
    clientFilter.addEventListener("change", function () {
      const selectedValue = this.value
      const clientItems = document.querySelectorAll(".client-item")

      clientItems.forEach((item) => {
        if (selectedValue === "all" || item.dataset.service === selectedValue) {
          item.style.display = "flex"
        } else {
          item.style.display = "none"
        }
      })
    })
  }
})

// Initialize dashboard charts
function initDashboardCharts() {
  console.log("Initializing dashboard charts")

  // Client Activity Chart
  if (document.getElementById("clientActivityChart")) {
    const clientActivityOptions = {
      chart: {
        type: "area",
        height: 300,
        toolbar: {
          show: false,
        },
        fontFamily: "Inter, sans-serif",
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
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    }

    try {
      const clientActivityChart = new ApexCharts(document.getElementById("clientActivityChart"), clientActivityOptions)
      clientActivityChart.render()
      console.log("Client activity chart rendered")
    } catch (error) {
      console.error("Error rendering client activity chart:", error)
    }
  }

  // Task Distribution Chart
  if (document.getElementById("taskDistributionChart")) {
    const taskDistributionOptions = {
      chart: {
        type: "donut",
        height: 300,
        fontFamily: "Inter, sans-serif",
      },
      series: [44, 55, 13, 33],
      labels: ["Brand Strategy", "Visual Identity", "Social Media", "Content Creation"],
      colors: ["#5ebfb5", "#e9c46a", "#2a9d8f", "#f4a261"],
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    }

    try {
      const taskDistributionChart = new ApexCharts(
        document.getElementById("taskDistributionChart"),
        taskDistributionOptions,
      )
      taskDistributionChart.render()
      console.log("Task distribution chart rendered")
    } catch (error) {
      console.error("Error rendering task distribution chart:", error)
    }
  }
}
