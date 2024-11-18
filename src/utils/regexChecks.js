export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    // Password must be at least 8 characters long and contain at least one number and one special character
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return re.test(String(password));
}

export function validateUsername(username) {
    // Username must be between 3 and 20 characters long and contain only alphanumeric characters
    const re = /^[a-zA-Z0-9]{3,20}$/;
    return re.test(String(username));
}