document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".logStyle")) {
    handleLogin();
  } else if (document.querySelector(".regStyle")) {
    handleRegister();
  }

  const actionButtons = document.getElementById("actionButtons");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (actionButtons) {
    if (isLoggedIn === "true") {
      actionButtons.innerHTML = `
        <button id="profileButton">Profile</button>
        <button id="logoutButton">Logout</button>`;
      document.getElementById("profileButton").addEventListener("click", function () {
        window.location.href = "profile.html";
      });
      document.getElementById("logoutButton").addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        alert("You have successfully logged out!");
        window.location.href = "index.html";
      });
    } else {
      actionButtons.innerHTML = `
        <a href="registerPage.html"><button>Register</button></a>
        <a href="loginPage.html"><button>Sign in</button></a>`;
    }
  }

  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    const img = document.getElementById("profileImage");
    if (img) img.src = savedImage;
  }

  const imageUpload = document.getElementById("imageUpload");
  if (imageUpload) {
    imageUpload.addEventListener("change", function (event) {
      const reader = new FileReader();
      reader.onload = function () {
        const imageData = reader.result;
        const img = document.getElementById("profileImage");
        if (img) img.src = imageData;
        localStorage.setItem("profileImage", imageData);
      };
      reader.readAsDataURL(event.target.files[0]);
    });
  }

  const calculateButton = document.getElementById("calculateBMI");
  const bmiResult = document.getElementById("bmiResult");
  if (calculateButton && bmiResult) {
    calculateButton.addEventListener("click", function () {
      const height = parseFloat(document.getElementById("heightFt").value);
      const weight = parseFloat(document.getElementById("heightIn").value);
      if (!height || !weight || height <= 0 || weight <= 0) {
        bmiResult.textContent = "Please enter valid height and weight.";
        bmiResult.style.color = "red";
        return;
      }
      const bmi = calculateBMI(weight, height);
      bmiResult.textContent = `Your BMI is: ${bmi}`;
      bmiResult.style.color = "green";
    });
  }

  const quoteElement = document.getElementById("motivationalQuote");
  if (quoteElement) {
    const quotes = [
      "Push yourself, because no one else is going to do it for you.",
      "Success starts with self-discipline.",
      "Don’t stop when you’re tired. Stop when you’re done.",
      "Wake up with determination. Go to bed with satisfaction.",
      "The body achieves what the mind believes.",
      "Train insane or remain the same.",
      "Great things never come from comfort zones.",
      "Do something today that your future self will thank you for.",
      "Become better than yesterday."
    ];
    let currentIndex = parseInt(localStorage.getItem("quoteIndex")) || 0;
    if (quotes[currentIndex]) {
      quoteElement.textContent = quotes[currentIndex];
      currentIndex = (currentIndex + 1) % quotes.length;
      localStorage.setItem("quoteIndex", currentIndex);
    }
  }

  const nameInput = document.getElementById("name");
  if (nameInput) {
    const storedName = localStorage.getItem("fullName");
    if (storedName) {
      nameInput.value = storedName;
    }
  }

  const saveButton = document.getElementById("save");
  if (saveButton) {
    saveButton.addEventListener("click", function () {
    const fullName = document.getElementById("name").value.trim();
    const currentName = localStorage.getItem("fullName");
    if (fullName === "") {
      alert("Please enter your name.");
      return;
    }
    if (fullName !== currentName) {
      localStorage.setItem("fullName", fullName);
      alert("Profile name saved!");
    } else {
      alert("Name not changed.");
    }
    });
  }

  const checkboxes = document.querySelectorAll(".task-checkbox");
  const checkboxSound = document.getElementById("checkboxSound");
  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      if (checkboxSound) checkboxSound.play();
    });
  });
});

function handleRegister() {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const fullName = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    localStorage.setItem("userData", JSON.stringify({ fullName, email, password }));
    alert("Registration successful!");
    window.location.href = "loginPage.html";
  });
}

function handleLogin() {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const updatedName = localStorage.getItem("fullName") || storedData.fullName;
    if (storedData && storedData.email === email && storedData.password === password) {
      alert(`Welcome back, ${updatedName}!`);
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      alert("Incorrect email or password. Please try again.");
    }
  });
}

function calculateBMI(weight, height) {
  let bmi = weight / (height * height);
  return bmi.toFixed(2);
}
