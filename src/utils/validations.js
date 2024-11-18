import { validateEmail, validatePassword } from './regexChecks';

export function validateLoginForm(formData) {
    const { email, password } = formData;

    if (!email || !password) {
        return { valid: false, message: 'All fields are required.' };
    }

    return { valid: true, message: 'Login form is valid.' };
}

export async function validateRegisterForm(formData) {
    console.log('validateRegisterForm', formData);
    const { firstName, lastName, email, password, confirmPassword, userType } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !userType) {
        return { valid: false, message: 'All fields are required.' };
    }

    if (!validateEmail(email)) {
        //console.log('invalid email format');
        return { valid: false, message: 'Invalid email format.' };
    }

    if (!validatePassword(password)) {
        //console.log('invalid password format');
        return { valid: false, message: 'Invalid password format.' };
    }

    if (password !== confirmPassword) {
        //console.log('passwords do not match');
        return { valid: false, message: 'Passwords do not match.' };
    }

    //encrypter le password

    return { valid: true, message: 'Register form is valid.' };
}

