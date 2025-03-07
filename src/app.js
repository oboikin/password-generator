// Constants for password strength levels
const PASSWORD_STRENGTH = {
    WEAK: 'weak',
    MEDIUM: 'medium',
    STRONG: 'strong'
};

// Function to generate a random integer in a given range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthIndicator = document.getElementById('passwordStrength');
    
    // Check password length
    if (password.length >= 12) strength += 1;
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Check for lowercase letters
    if (/[a-z]/.test(password)) strength += 1;
    
    // Check for numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Determine password strength level
    let strengthClass, strengthText;
    if (strength <= 2) {
        strengthClass = PASSWORD_STRENGTH.WEAK;
        strengthText = 'Weak Password';
    } else if (strength <= 4) {
        strengthClass = PASSWORD_STRENGTH.MEDIUM;
        strengthText = 'Medium Password';
    } else {
        strengthClass = PASSWORD_STRENGTH.STRONG;
        strengthText = 'Strong Password';
    }
    
    // Update strength indicator
    strengthIndicator.textContent = strengthText;
    strengthIndicator.className = `strength-indicator strength-${strengthClass}`;
}

// Function to generate password
function generatePassword() {
    const length = document.getElementById("length").value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSpecialChars = document.getElementById("includeSpecialChars").checked;

    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecialChars) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let password = "";
    const charsetArray = charset.split('');
    
    // Guarantee at least one character of each selected type
    if (includeUppercase) {
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[getRandomInt(0, 25)];
    }
    if (includeNumbers) {
        password += "0123456789"[getRandomInt(0, 9)];
    }
    if (includeSpecialChars) {
        password += "!@#$%^&*()_+-=[]{}|;:,.<>?"[getRandomInt(0, 19)];
    }
    
    // Fill the rest of the password with random characters
    while (password.length < length) {
        password += charsetArray[getRandomInt(0, charsetArray.length - 1)];
    }
    
    // Shuffle the password characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    const passwordField = document.getElementById("password");
    passwordField.value = password;
    checkPasswordStrength(password);
    
    // Add animation
    passwordField.classList.add('password-generated');
    setTimeout(() => {
        passwordField.classList.remove('password-generated');
    }, 500);
}

// Function to update password length value
function updateLengthValue() {
    const lengthValue = document.getElementById("lengthValue");
    const lengthInput = document.getElementById("length");
    const value = lengthInput.value;
    
    // Update text
    lengthValue.textContent = value;
    
    // Update slider progress
    const min = lengthInput.min || 0;
    const max = lengthInput.max || 100;
    const percent = ((value - min) / (max - min)) * 100;
    lengthInput.style.setProperty('--range-progress', `${percent}%`);
}

// Function to copy password to clipboard
async function copyPasswordToClipboard() {
    const passwordField = document.getElementById("password");
    const copyButton = document.getElementById("copyPasswordButton");
    
    try {
        await navigator.clipboard.writeText(passwordField.value);
        
        // Success animation
        copyButton.innerHTML = '<span class="icon">✓</span> Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
            copyButton.innerHTML = '<span class="icon">📋</span> Copy Password';
            copyButton.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Copy error:', err);
        copyButton.innerHTML = '<span class="icon">❌</span> Error';
        setTimeout(() => {
            copyButton.innerHTML = '<span class="icon">📋</span> Copy Password';
        }, 2000);
    }
}

// Function to toggle theme
function changeTheme() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    const themeIcon = document.querySelector('.theme-icon');
    
    // Update theme icon
    themeIcon.textContent = isDarkMode ? '🌙' : '☀️';
    
    // Save theme preference
    localStorage.setItem("darkMode", isDarkMode);
}

// Check saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
        document.body.classList.add("dark-mode");
        document.querySelector('.theme-icon').textContent = '☀️';
    }
    
    // Generate initial password
    generatePassword();
    
    // Initialize slider progress
    updateLengthValue();
});

