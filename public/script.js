// import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");
// const companyform = document.getElementById("post-job");
// const emailText = document.getElementById("emailText");
// const userform = document.getElementById("user-form");

// socket.on("connect", () => {
//   console.log("connected to server");
// });

// companyform.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("form submitted");
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
//   const message = emailText.value;
//   socket.emit("send-email", { checkboxes, message });
//   emailText.value = "";
//   // code to save it to the database
// });

// userform.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("form submitted");
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
//   // code to save it to the database

//   window.location.href = "http://localhost:5500/email-notification.html";
// });

// signup form
document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const user_type = document.getElementById("userRole").value;

  const userData = {
    name,
    email,
    user_type,
  };

  // Send POST request to backend API
  fetch("http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Signup response:", data);
      // Handle success (e.g., show a success message to the user)
      window.location.href = "http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/login";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors (e.g., show an error message to the user)
    });
});

// login form
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get email input value
  const email = document.getElementById("email").value;

  const userData = {
    email,
  };

  // Send POST request to backend API for login
  fetch("http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login response:", data);
      const storedname = data.name;
      const storedemail = data.email;
      const storedtype = data.user_type;
      localStorage.setItem("name", storedname);
      localStorage.setItem("email", storedemail);
      localStorage.setItem("user_type", storedtype);
      // Handle success (e.g., redirect to another page, set user session, etc.)

      if (storedtype == "Job seracher") {
        // to add the job seeker page
      } else {
        // to add the company page
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors (e.g., display an error message to the user)
    });
});

// post job form
document.getElementById("postjob").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  const company = document.getElementById("companyName").value;
  const jobtitle = document.getElementById("jobTitle").value;
  const category = document.getElementById("category").value;
  const location = document.getElementById("location").value;

  const jobData = {
    company,
    jobtitle,
    category,
    location,
  };

  // Send POST request to backend API
  fetch("http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/Jobs/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Job response:", data);
      // Handle success (e.g., show a success message to the user)
      window.location.href = "http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/job";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors (e.g., show an error message to the user)
    });
});

// get all jobs
function createJobListings(data) {
  const jobTableBody = document.querySelector("#jobTable tbody");

  data.forEach((job) => {
    const row = document.createElement("tr");

    const jobid = localStorage.setItem("jobid", job._id);

    const companycell = document.createElement("td");
    companycell.textContent = job.company;

    const jobtitlecell = document.createElement("td");
    jobtitlecell.textContent = job.jobtitle;

    const categorycell = document.createElement("td");
    categorycell.textContent = job.category;

    const locationcell = document.createElement("td");
    locationcell.textContent = job.location;

    const applyButtonCell = document.createElement("td");
    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply";

    applyButton.addEventListener("click", () => {
      // Handle applying for the job here (e.g., sending application)
      // This function can be customized based on your requirements
      fetch(`http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/jobs/${localStorage.getItem("name")}/${jobid}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Job response:", data);
          // Handle success (e.g., show a success message to the user)
          window.location.href = "http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/job";
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          // Handle errors (e.g., show an error message to the user)
        });

      console.log(`Applying for job: ${job.title}`);
    });
    applyButtonCell.appendChild(applyButton);

    row.appendChild(companycell);
    row.appendChild(jobtitlecell);
    row.appendChild(categorycell);
    row.appendChild(locationcell);
    row.appendChild(applyButtonCell);

    jobTableBody.appendChild(row);
  });
}

// Call the function to create job listings in the table with sample data
createJobListings(fetch("http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/Jobs/"), {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
