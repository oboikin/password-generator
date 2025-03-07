// Константы для проверки силы пароля
const PASSWORD_STRENGTH = {
    WEAK: 'weak',
    MEDIUM: 'medium',
    STRONG: 'strong'
};

// Функция для генерации случайного числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для проверки силы пароля
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthIndicator = document.getElementById('passwordStrength');
    
    // Проверка длины
    if (password.length >= 12) strength += 1;
    
    // Проверка наличия заглавных букв
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Проверка наличия строчных букв
    if (/[a-z]/.test(password)) strength += 1;
    
    // Проверка наличия цифр
    if (/[0-9]/.test(password)) strength += 1;
    
    // Проверка наличия специальных символов
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Определение уровня силы пароля
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
    
    // Обновление индикатора
    strengthIndicator.textContent = strengthText;
    strengthIndicator.className = `strength-indicator strength-${strengthClass}`;
}

// Функция для генерации пароля
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
    
    // Гарантируем наличие хотя бы одного символа каждого выбранного типа
    if (includeUppercase) {
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[getRandomInt(0, 25)];
    }
    if (includeNumbers) {
        password += "0123456789"[getRandomInt(0, 9)];
    }
    if (includeSpecialChars) {
        password += "!@#$%^&*()_+-=[]{}|;:,.<>?"[getRandomInt(0, 19)];
    }
    
    // Дополняем пароль случайными символами до нужной длины
    while (password.length < length) {
        password += charsetArray[getRandomInt(0, charsetArray.length - 1)];
    }
    
    // Перемешиваем символы в пароле
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    const passwordField = document.getElementById("password");
    passwordField.value = password;
    checkPasswordStrength(password);
    
    // Добавляем анимацию
    passwordField.classList.add('password-generated');
    setTimeout(() => {
        passwordField.classList.remove('password-generated');
    }, 500);
}

// Функция для обновления значения длины пароля
function updateLengthValue() {
    const lengthValue = document.getElementById("lengthValue");
    const lengthInput = document.getElementById("length");
    const value = lengthInput.value;
    
    // Обновляем текст
    lengthValue.textContent = value;
    
    // Обновляем прогресс ползунка
    const min = lengthInput.min || 0;
    const max = lengthInput.max || 100;
    const percent = ((value - min) / (max - min)) * 100;
    lengthInput.style.setProperty('--range-progress', `${percent}%`);
}

// Функция для копирования пароля в буфер обмена
async function copyPasswordToClipboard() {
    const passwordField = document.getElementById("password");
    const copyButton = document.getElementById("copyPasswordButton");
    
    try {
        await navigator.clipboard.writeText(passwordField.value);
        
        // Анимация успешного копирования
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

// Функция для переключения темы
function changeTheme() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

// Проверяем сохраненную тему при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
        document.body.classList.add("dark-mode");
    }
    
    // Генерируем начальный пароль
    generatePassword();
    
    // Инициализируем прогресс ползунка
    updateLengthValue();
});

