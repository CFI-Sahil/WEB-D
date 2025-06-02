
document.querySelector(".otp-btn").addEventListener("click", function (e) {
    e.preventDefault();
  
    const emailInput = document.querySelector("input[type='email']");
    const errorMsg = document.querySelector(".error-message");
    const email = emailInput.value.trim();
  
    if (!email) {
      errorMsg.textContent = "Email is required!";
      return;
    }
    if (!email.includes("@")) {
      errorMsg.textContent = "Email must include '@'.";
      return;
    }
  
    if (!email.endsWith("@gmail.com")) {
      errorMsg.textContent = "Email must end with '@gmail.com'.";
      return;
    }

    const numberPattern = /\d/;
    if (!numberPattern.test(email)) {
      errorMsg.textContent = "Email must contain at least one number.";
      return;
    }
    errorMsg.textContent = "";
    alert("OTP sent to " + email);
  });