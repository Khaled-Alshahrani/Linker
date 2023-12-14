import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
const companyform = document.getElementById("send-email");
const emailText = document.getElementById("emailText");
const userform = document.getElementById("user-form");

socket.on("connect", () => {
  console.log("connected to server");
});

companyform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const message = emailText.value;
  socket.emit("send-email", { checkboxes, message });
  emailText.value = "";
  // code to save it to the database
});

userform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  // code to save it to the database

  window.location.href = "http://localhost:5500/email-notification.html";
});
