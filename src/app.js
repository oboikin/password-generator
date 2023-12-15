function generatePassword() {
    var length = document.getElementById("length").value;
    var includeUppercase = document.getElementById("includeUppercase").checked;
    var includeNumbers = document.getElementById("includeNumbers").checked;
    var includeSpecialChars = document.getElementById("includeSpecialChars").checked;

    var charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecialChars) charset += "!@#$%^&*()_-+=";

    var password = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById("password").value = password;
    checkPasswordStrength(password);
}

function updateLengthValue() {
    var lengthValue = document.getElementById("lengthValue");
    var lengthInput = document.getElementById("length");
    lengthValue.textContent = lengthInput.value;
}

function copyPasswordToClipboard() {
    var passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
}

function changeTheme() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

