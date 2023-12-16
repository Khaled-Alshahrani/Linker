const postbtn = document.getElementById("postbtn");
const loginbtn = document.getElementById("loginbtn");
const signupbtn = document.getElementById("signupb");

const socket = new WebSocket("wss://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com");

// Event listener for when the WebSocket connection is established
socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server");
});

// Event listener for incoming messages from the WebSocket server
socket.addEventListener("message", (event) => {
  console.log("Received message:", event.data);
  // Handle the received message here (e.g., display it to the user)
  const messageContainer = document.getElementById("notification");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageContainer.appendChild(messageDiv);
});

// signup form
if (signupbtn !== null) {
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
    fetch("http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/users/create", {
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
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors (e.g., show an error message to the user)
      });
  });
}
// login form
if (loginbtn !== null) {
  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get email input value
    const email = document.getElementById("email").value;

    const userData = {
      email,
    };

    // Send POST request to backend API for login
    fetch("http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/users/login", {
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
          window.location.href = "user-search.html";
        } else {
          // to add the company page
          window.location.href = "company-search.html";
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors (e.g., display an error message to the user)
      });
  });
}
// post job form
if (postbtn !== null) {
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
    fetch("http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/jobs/add", {
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
        window.location.href = "company-search.html";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors (e.g., show an error message to the user)
      });
  });
}
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
// createJobListings(fetch("http://linker-env.eba-q38ztxpi.us-east-1.elasticbeanstalk.com/Jobs"), {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
