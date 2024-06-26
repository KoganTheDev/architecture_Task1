document.addEventListener('DOMContentLoaded', onPageLoad);


// Business Logic Tier - logic related to the presentation tier
function onPageLoad() {
  var account_name =  CheckUserConnect(); // Retrieve account name from localStorage
  // Check if account name exists
  if (account_name) {
    updateLoginButton(account_name); // Call the function to update login button based on account status
    // Add other code here to update elements specific to the user being logged in
  }
}

function updateLoginButton(usrn) {
  var loginButton = document.querySelector('.loginbtn button');
  var userButton = document.querySelector('.My_account button');
  var flag=checkStat(usrn);

  // Check if the elements are found before trying to set their properties
  if (flag) {
        // User is logged in, hide login button and show user button
        loginButton.style.display = 'none';
        loginButton.style.position= 'absolute';
        userButton.style.display = 'inline-block';
        userButton.style.position = 'relative';
        // You can also add additional logic here to display user-specific content or options
    } 
    else {
        // User is not logged in, show login button and hide user button
        userButton.style.display = 'none';
        userButton.style.position= 'absolute';
        loginButton.style.display = 'inline-block';
        loginButton.style.position = 'relative';
    }
}


function phoneMenu() {
  var x = document.querySelector(".navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

function checkPasswordStrength() {
  var password = document.getElementById("password").value;
  var meter = document.getElementById("password-strength-meter");
  var strength = 0;
  var requirements = document.querySelectorAll("#password-requirements li span.requirement");
  if (password.length >= 8) {
    strength += 1;
    requirements[0].classList.add("completed");
  } else {
    requirements[0].classList.remove("completed");
  }

  // check if password contains uppercase letter
  if (/[A-Z]/.test(password)) {
    strength += 1;
    requirements[1].classList.add("completed");
  } else {
    requirements[1].classList.remove("completed");
  }

  // check if password contains lowercase letter
  if (/[a-z]/.test(password)) {
    strength += 1;
    requirements[2].classList.add("completed");
  } else {
    requirements[2].classList.remove("completed");
  }

  // check if password contains number
  if (/\d/.test(password)) {
    strength += 1;
    requirements[3].classList.add("completed");
  } else {
    requirements[3].classList.remove("completed");
  }

  // check if password contains special character (!,@,#,....)
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    strength += 1;
    requirements[4].classList.add("completed");
  } else {
    requirements[4].classList.remove("completed");
  }

  // update strength meter based on calculated strength
  switch (strength) {
    case 0:
    case 1:
      meter.className = "strength weak";
      meter.textContent = "Weak";
      break;
    case 2:
      meter.className = "strength medium";
      meter.textContent = "Medium";
      break;
    default:
      meter.className = "strength strong";
      meter.textContent = "Strong";
  }
  meter.style.width = (strength)*20 + '%'; // width of the meter adjusts according to the current password strength
}

function showTab(tabName) {
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  
  var selectedTab = document.getElementById(tabName);
  selectedTab.classList.add('active');

  if (tabName === 'information') {
    PrintUserInfo();
  }
}


function showPass() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

/*===============================BMI claculator===========================*/
function calculateBMI() {
  var height = parseFloat(document.getElementById('height').value);
  var weight = parseFloat(document.getElementById('weight').value);

  if (isNaN(height) || isNaN(weight) || height <= 65 || height >=230  || weight <= 0 || weight>=500 ) {
      document.getElementById('result').innerHTML = "Please enter valid height and weight.";
      return;
  }

  var bmi = weight / ((height / 100) * (height / 100));
  var bmiResult = "Your BMI is " + bmi.toFixed(2) + ". ";

  if (bmi < 18.5) {
      bmiResult += "You are underweight.";
  } else if (bmi >= 18.5 && bmi < 25) {
      bmiResult += "You have a normal weight.";
  } else if (bmi >= 25 && bmi < 30) {
      bmiResult += "You are overweight.";
  } else {
      bmiResult += "You are obese.";
  }
  document.getElementById('result').innerHTML = bmiResult;
}


/*========================Print info func=============================*/
function PrintUserInfo(){
  var outputdata=document.getElementById("information");
  var userData=CheckUsersInfoDB(CheckUserConnect());
  var text = `Name: ${userData[2]} ${userData[3]}<br>Email: ${userData[0]}<br>Age: ${userData[4]}<br>Height: ${userData[5]}<br>Weight: ${userData[6]}<br>Gender: ${userData[7]}`;
  outputdata.innerHTML='<h2>My Information</h2>'+text+'<br><button type="button" onclick="deleteAccount()">Delete Account</button>';
}


/*===============================sign up functions===========================*/
function signUp_user(){
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var age = document.getElementById("age").value;
  var height = document.getElementById("height").value;
  var weight = document.getElementById("weight").value;
  var email = document.getElementById("Email").value;
  var password = document.getElementById("password").value;
  var gen = document.getElementById("gender").value;

  if (!isValidName(firstName)) {
    alert("Invalid First name. Please try again");
    return;
  }

  if (!isValidName(lastName)) {
    alert("Invalid Last name. Please try again");
    return;
  }

  // Fix the age validation condition
  if (isNaN(age) || age < 1 || age > 100) {
    alert("Age must be between 1 and 100. Please try again");
    return;
  }

  if (isNaN(height) || height < 60 || height > 230) {
    alert("Height should be between 60 and 230.");
    return;
  }

  if (isNaN(weight) || weight > 500 || weight < 10) {
    alert("Weight should be between 10 and 500.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Invalid Email address. Please try again.");
    return;
  }
    //singelton - create 1 manager account and stop other attempts to create another one
    var mngrFname = firstName;
    var mngrLname = lastName;
    if (mngrFname === "admin" && mngrLname === "admin"){
      mngrData = CheckUsersInfoDB(email);
      //if admin account is exist
      if (mngrData != ""){
        alert("A manager account already exist! You can't create Another one.");
        location.reload;
      }
      else{
        //create thefirst and only admin account
        processInfo(email,password, firstName, lastName, age, gen, height, weight);
        alert("A new admin account is submitted");
        location.reload();
      }
    } 
    if (firstName != "admin"){
      //check if a new user signup Email is already taken
    var userData = ""
    userData = CheckUsersInfoDB(email);
    if(userData != ""){
      alert("This Email is already taken! please re-enter")
      location.reload();
    }
    else{
      processInfo(email,password, firstName, lastName, age, gen, height, weight);
      alert("A new user account is submitted");
      location.reload();
    }
    }   
}

function isValidName(name) {
  return /^[a-zA-Z]+$/.test(name) && name.trim() !== "";
} // this function checks if name contains digits or symbols (not a-z)

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} // this function checks if the email complies to the standard form of an email address.






/*===============================login and logout functions===========================*/

function connect_Func(){
  debugger;
  var login_mail = document.getElementById("Email").value;
  var login_password = document.getElementById("myInput").value;
  var userData = CheckUsersInfoDB(login_mail);
  if ((userData.length > 0) && (userData[1].localeCompare(login_password) === 0)) {
    //alert("You logged in successfully");
    ChangeStat(login_mail,true);
    alert("Login succesfuly"); 
    account_name=login_mail;
    window.location.href = "user_page.html";
  }
  else{
    alert("Wrong user name, email or password! please try again.");
  }
  return "";
}

function LogOutUser(){
  var account_name=CheckUserConnect();
  ChangeStat(account_name,false);
  alert("Logged out successfully!");
  window.location.href = "main_page.html";
}

/*=============remove account============*/
function deleteAccount(){
  var userData=CheckUsersInfoDB(CheckUserConnect());
  localStorage.removeItem(userData[0]);
  alert("Account removed succefuly!");
  window.location.href = "main_page.html";
}
