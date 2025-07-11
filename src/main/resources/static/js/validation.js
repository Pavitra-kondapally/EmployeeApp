// Form validation functions for Employee Directory

/**
 * Validates employee form data
 * @param {Object} employeeData - The employee data to validate
 * @returns {Object} - Validation result with isValid boolean and errors object
 */
function validateEmployeeForm(employeeData) {
    const errors = {};
    
    // Validate First Name
    if (!employeeData.firstName || employeeData.firstName.trim() === '') {
        errors.firstName = 'First name is required';
    } else if (employeeData.firstName.length < 2) {
        errors.firstName = 'First name must be at least 2 characters long';
    } else if (employeeData.firstName.length > 50) {
        errors.firstName = 'First name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(employeeData.firstName)) {
        errors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    // Validate Last Name
    if (!employeeData.lastName || employeeData.lastName.trim() === '') {
        errors.lastName = 'Last name is required';
    } else if (employeeData.lastName.length < 2) {
        errors.lastName = 'Last name must be at least 2 characters long';
    } else if (employeeData.lastName.length > 50) {
        errors.lastName = 'Last name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(employeeData.lastName)) {
        errors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    // Validate Email
    if (!employeeData.email || employeeData.email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!isValidEmail(employeeData.email)) {
        errors.email = 'Please enter a valid email address';
    } else if (employeeData.email.length > 100) {
        errors.email = 'Email must be less than 100 characters';
    }
    
    // Validate Department
    if (!employeeData.department || employeeData.department === '') {
        errors.department = 'Department is required';
    } else if (!isValidDepartment(employeeData.department)) {
        errors.department = 'Please select a valid department';
    }
    
    // Validate Role
    if (!employeeData.role || employeeData.role === '') {
        errors.role = 'Role is required';
    } else if (!isValidRole(employeeData.role)) {
        errors.role = 'Please select a valid role';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Validates email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Validates department selection
 * @param {string} department - Department to validate
 * @returns {boolean} - True if department is valid
 */
function isValidDepartment(department) {
    const validDepartments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];
    return validDepartments.includes(department);
}

/**
 * Validates role selection
 * @param {string} role - Role to validate
 * @returns {boolean} - True if role is valid
 */
function isValidRole(role) {
    const validRoles = ['Manager', 'Developer', 'Designer', 'Analyst', 'Coordinator'];
    return validRoles.includes(role);
}

/**
 * Validates search input
 * @param {string} searchTerm - Search term to validate
 * @returns {Object} - Validation result
 */
function validateSearchInput(searchTerm) {
    const errors = {};
    
    if (searchTerm && searchTerm.length > 100) {
        errors.search = 'Search term must be less than 100 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Validates filter inputs
 * @param {Object} filterData - Filter data to validate
 * @returns {Object} - Validation result
 */
function validateFilterInputs(filterData) {
    const errors = {};
    
    // Validate first name filter
    if (filterData.firstName && filterData.firstName.length > 50) {
        errors.firstName = 'First name filter must be less than 50 characters';
    }
    
    // Validate department filter
    if (filterData.department && !isValidDepartment(filterData.department)) {
        errors.department = 'Please select a valid department';
    }
    
    // Validate role filter
    if (filterData.role && !isValidRole(filterData.role)) {
        errors.role = 'Please select a valid role';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Sanitizes input text to prevent XSS
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text
 */
function sanitizeInput(text) {
    if (typeof text !== 'string') {
        return '';
    }
    
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validates pagination parameters
 * @param {number} page - Page number
 * @param {number} pageSize - Page size
 * @param {number} totalItems - Total number of items
 * @returns {Object} - Validation result
 */
function validatePagination(page, pageSize, totalItems) {
    const errors = {};
    
    if (page < 1) {
        errors.page = 'Page number must be greater than 0';
    }
    
    if (pageSize < 1 || pageSize > 100) {
        errors.pageSize = 'Page size must be between 1 and 100';
    }
    
    const maxPage = Math.ceil(totalItems / pageSize);
    if (page > maxPage && maxPage > 0) {
        errors.page = `Page number cannot exceed ${maxPage}`;
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Validates employee ID
 * @param {number} id - Employee ID to validate
 * @returns {boolean} - True if ID is valid
 */
function isValidEmployeeId(id) {
    return typeof id === 'number' && id > 0 && Number.isInteger(id);
}

/**
 * Validates employee data structure
 * @param {Object} employee - Employee object to validate
 * @returns {Object} - Validation result
 */
function validateEmployeeData(employee) {
    const errors = {};
    
    if (!employee || typeof employee !== 'object') {
        errors.general = 'Invalid employee data';
        return { isValid: false, errors };
    }
    
    // Check required fields
    const requiredFields = ['id', 'firstName', 'lastName', 'email', 'department', 'role'];
    for (const field of requiredFields) {
        if (!(field in employee)) {
            errors[field] = `${field} is required`;
        }
    }
    
    // Validate ID
    if (employee.id && !isValidEmployeeId(employee.id)) {
        errors.id = 'Invalid employee ID';
    }
    
    // Validate other fields using existing validation
    const formValidation = validateEmployeeForm(employee);
    Object.assign(errors, formValidation.errors);
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmployeeForm,
        isValidEmail,
        isValidDepartment,
        isValidRole,
        validateSearchInput,
        validateFilterInputs,
        sanitizeInput,
        validatePagination,
        isValidEmployeeId,
        validateEmployeeData
    };
}
