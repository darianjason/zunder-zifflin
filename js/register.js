const warning = document.createElement("div");
warning.classList.add("warning");

function register() {
    if(!validateForm()) {
        return;
    }

    let gender;

    if (male.checked) {
        gender = getValueById("male");
    }
    else if (female.checked){
        gender = getValueById("female");
    }

    const account = new Account(getValueById("name"), getValueById("email"), gender, getValueById("address"), getValueById("city"), getValueById("country"));

    logRegistrationInfo(account);

    resetForm();

    printSuccessfulRegistrationMessage(account);
}

function printSuccessfulRegistrationMessage(account) {
    alert("Thank you " + account.name + ", you have successfully registered.");
}

function resetForm() {
    document.getElementById("registration-form").reset();
}

function logRegistrationInfo(account) {
    console.log(
        "ACCOUNT INFORMATION\n" +
        "===================\n" +
        "Name: " + account.name + "\n" +
        "Email: " + account.email + "\n" +
        "Gender: " + account.gender + "\n" +
        "Address: " + account.address + "\n" +
        "City: " + account.city + "\n" +
        "Country: " + account.country + "\n"
    );
}

function Account(name, email, gender, address, city, country) {
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.address = address;
    this.city = city;
    this.country = country;
}

function validateForm() {
    removeAllWarnings();

    let validated = 0;

    validateName() ? validated++ : appendWarningToField("name");
    validateEmail() ? validated++ : appendWarningToField("email");
    validatePassword() ? validated++ : appendWarningToField("password");
    validateGender() ? validated++ : appendWarningToField("gender");
    validateAddress() ? validated++ : appendWarningToField("address");
    validateCity() ? validated++ : appendWarningToField("city");
    validateCountry() ? validated++ : appendWarningToField("country");
    validateAgreement() ? validated++ : appendWarningToField("agreement");

    let numberOfFields = document.getElementsByClassName("form-field").length;

    if (validated < numberOfFields - 1) {
        return;
    }

    return true;
}

function removeAllWarnings() {
    const warnings = Array.from(document.getElementsByClassName("warning"));

    warnings.forEach(warning => {
        warning.remove();
    });
}

function appendWarningToField(id) {
    document.getElementById(id + "-field").appendChild(warning.cloneNode(true));
}

function validateName() {
    let name = getValueById("name");

    if (name === '') {
        warning.textContent = "Please enter your name.";
        return false;
    }
    if (!isAlphabetical(name)) {
        warning.textContent = "Name must be alphabetical.";
        return false;
    }
    if (!hasValidSpace(name)) {
        warning.textContent = "Name is invalid.";
        return false;
    }

    return true;
}

function validateEmail() {
    let email = getValueById("email");

    if (email === '') {
        warning.textContent = "Please enter your email address.";
        return false;
    }

    if (!(email.includes('@') && email.includes('.'))) {
        warning.textContent = "Email must have valid format.";
        return false;
    }

    return true;
}

function validatePassword() {
    let password = getValueById("password");

    if(password === '') {
        warning.textContent = "Please enter your password.";
        return false;
    }

    if(password.length < 8) {
        warning.textContent = "Password must be at least 8 characters long."
        return false;
    }

    return true;
}

function validateGender() {
    let male = document.getElementById("male");
    let female = document.getElementById("female");

    if (!(male.checked || female.checked)) {
        warning.textContent = "Please select your gender.";
        return false;
    }

    return true;
}

function validateAddress() {
    let address = getValueById("address");

    if (address === '') {
        warning.textContent = "Please enter your address.";
        return false;
    }
    if (address.split('\n').length < 3) {
        warning.textContent = "Address must have at least 3 lines.";
        return false;
    }

    return true;
}

function validateCity() {
    let city = getValueById("city");

    if (city === '') {
        warning.textContent = "Please enter your city.";
        return false;
    }
    if (!hasValidSpace(city)) {
        warning.textContent = "City is invalid.";
        return false;
    }

    return true;
}

function validateCountry() {
    let country = getValueById("country");

    if (country === '') {
        warning.textContent = "Please select your country.";
        return false;
    }

    return true;
}

function validateAgreement() {
    let agreement = document.getElementById("agreement");

    if(!agreement.checked) {
        warning.textContent = "Please agree to the terms."
        return false;
    }

    return true;
}

function getValueById(id) {
    return document.getElementById(id).value;
}

function isAlphabetical(string) {
    for (let i = 0; i < string.length; i++) {
        if (!(((string.charAt(i) >= 'a' && string.charAt(i) <= 'z') || (string.charAt(i) >= 'A' && string.charAt(i) <= 'Z')) || string.charAt(i) === ' ')) {
            return false;
        }
    }

    return true;
}

function hasValidSpace(string) {
    if (string.includes(' ')) {
        if (string.split(' ').length < 2) {
            return false;
        }
    }

    return true;
}

document.getElementById("register-button").addEventListener("click", () => {
    register();
});