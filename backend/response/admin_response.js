exports.adminRegisterValidator = (data) => {
    if (!data.admin_username || !data.admin_password) {
        return "All fields are required.";
    }
    if (
        data.admin_password.length < 6 ||
        !/[A-Z]/.test(data.admin_password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(data.admin_password)
    ) {
        return "Password must be at least 6 characters long and include at least one uppercase letter and one special character.";
    }
    return null; 
};

exports.adminRegisterSuccessMessage = () => {
    return "Admin registered successfully.";
};

exports.adminErrorMessage = (data) => {
    return "An error occurred while processing your request. Please try again later.";
};

exports.adminLoginValidator = (data) => {
    if (!data.admin_username || !data.admin_password) {
        return "All fields are required.";
    }
    return null; 
};

exports.tokenProviderError=(data)=>{
    return "No Token Provided"
}
exports.adminDashboard=(data)=>{
    return "Welcome to Admin Dashboard"
}
