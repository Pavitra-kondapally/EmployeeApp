// Mock employee data for the Employee Directory
const mockEmployees = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        department: 'HR',
        role: 'Manager'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@company.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 3,
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@company.com',
        department: 'Finance',
        role: 'Analyst'
    },
    {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@company.com',
        department: 'Marketing',
        role: 'Manager'
    },
    {
        id: 5,
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@company.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 6,
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@company.com',
        department: 'Sales',
        role: 'Coordinator'
    },
    {
        id: 7,
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'robert.miller@company.com',
        department: 'HR',
        role: 'Coordinator'
    },
    {
        id: 8,
        firstName: 'Lisa',
        lastName: 'Wilson',
        email: 'lisa.wilson@company.com',
        department: 'IT',
        role: 'Manager'
    },
    {
        id: 9,
        firstName: 'James',
        lastName: 'Moore',
        email: 'james.moore@company.com',
        department: 'Finance',
        role: 'Analyst'
    },
    {
        id: 10,
        firstName: 'Jennifer',
        lastName: 'Taylor',
        email: 'jennifer.taylor@company.com',
        department: 'Marketing',
        role: 'Designer'
    },
    {
        id: 11,
        firstName: 'Christopher',
        lastName: 'Anderson',
        email: 'christopher.anderson@company.com',
        department: 'Sales',
        role: 'Manager'
    },
    {
        id: 12,
        firstName: 'Amanda',
        lastName: 'Thomas',
        email: 'amanda.thomas@company.com',
        department: 'HR',
        role: 'Coordinator'
    },
    {
        id: 13,
        firstName: 'Matthew',
        lastName: 'Jackson',
        email: 'matthew.jackson@company.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 14,
        firstName: 'Ashley',
        lastName: 'White',
        email: 'ashley.white@company.com',
        department: 'Marketing',
        role: 'Analyst'
    },
    {
        id: 15,
        firstName: 'Daniel',
        lastName: 'Harris',
        email: 'daniel.harris@company.com',
        department: 'Finance',
        role: 'Manager'
    },
    {
        id: 16,
        firstName: 'Jessica',
        lastName: 'Martin',
        email: 'jessica.martin@company.com',
        department: 'Sales',
        role: 'Coordinator'
    },
    {
        id: 17,
        firstName: 'Anthony',
        lastName: 'Thompson',
        email: 'anthony.thompson@company.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 18,
        firstName: 'Michelle',
        lastName: 'Garcia',
        email: 'michelle.garcia@company.com',
        department: 'HR',
        role: 'Analyst'
    },
    {
        id: 19,
        firstName: 'Ryan',
        lastName: 'Martinez',
        email: 'ryan.martinez@company.com',
        department: 'Marketing',
        role: 'Designer'
    },
    {
        id: 20,
        firstName: 'Stephanie',
        lastName: 'Robinson',
        email: 'stephanie.robinson@company.com',
        department: 'Sales',
        role: 'Manager'
    },
    {
        id: 21,
        firstName: 'Kevin',
        lastName: 'Clark',
        email: 'kevin.clark@company.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 22,
        firstName: 'Nicole',
        lastName: 'Lewis',
        email: 'nicole.lewis@company.com',
        department: 'Finance',
        role: 'Analyst'
    },
    {
        id: 23,
        firstName: 'Andrew',
        lastName: 'Lee',
        email: 'andrew.lee@company.com',
        department: 'HR',
        role: 'Coordinator'
    },
    {
        id: 24,
        firstName: 'Rachel',
        lastName: 'Walker',
        email: 'rachel.walker@company.com',
        department: 'Marketing',
        role: 'Designer'
    },
    {
        id: 25,
        firstName: 'Brandon',
        lastName: 'Hall',
        email: 'brandon.hall@company.com',
        department: 'Sales',
        role: 'Coordinator'
    }
];

// Employee Data Management Class
class EmployeeDataManager {
    constructor() {
        this.employees = this.loadEmployees();
        this.nextId = this.getNextId();
    }

    // Load employees from localStorage or use mock data
    loadEmployees() {
        const savedEmployees = localStorage.getItem('employeeDirectory');
        if (savedEmployees) {
            try {
                return JSON.parse(savedEmployees);
            } catch (error) {
                console.error('Error loading employees from localStorage:', error);
                return this.getInitialData();
            }
        }
        return this.getInitialData();
    }

    // Get initial data from Freemarker or fallback to mock data
    getInitialData() {
        // Check if Freemarker data is available
        if (typeof freemarkerMockEmployees !== 'undefined' && freemarkerMockEmployees.length > 0) {
            console.log('Using Freemarker mock data:', freemarkerMockEmployees.length, 'employees');
            return [...freemarkerMockEmployees];
        }
        
        // Fallback to JavaScript mock data
        console.log('Using JavaScript mock data:', mockEmployees.length, 'employees');
        return [...mockEmployees];
    }

    // Save employees to localStorage
    saveEmployees() {
        try {
            localStorage.setItem('employeeDirectory', JSON.stringify(this.employees));
        } catch (error) {
            console.error('Error saving employees to localStorage:', error);
        }
    }

    // Get next available ID
    getNextId() {
        if (this.employees.length === 0) return 1;
        return Math.max(...this.employees.map(emp => emp.id)) + 1;
    }

    // Get all employees
    getAllEmployees() {
        return [...this.employees];
    }

    // Get employee by ID
    getEmployeeById(id) {
        return this.employees.find(emp => emp.id === id);
    }

    // Add new employee
    addEmployee(employeeData) {
        const newEmployee = {
            id: this.nextId++,
            ...employeeData
        };
        
        this.employees.push(newEmployee);
        this.saveEmployees();
        return newEmployee;
    }

    // Update existing employee
    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees[index] = {
                ...this.employees[index],
                ...employeeData
            };
            this.saveEmployees();
            return this.employees[index];
        }
        return null;
    }

    // Delete employee
    deleteEmployee(id) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            const deletedEmployee = this.employees.splice(index, 1)[0];
            this.saveEmployees();
            return deletedEmployee;
        }
        return null;
    }

    // Search employees
    searchEmployees(query) {
        const searchTerm = query.toLowerCase();
        return this.employees.filter(employee => {
            const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
            const email = employee.email.toLowerCase();
            return fullName.includes(searchTerm) || email.includes(searchTerm);
        });
    }

    // Filter employees
    filterEmployees(filters) {
        return this.employees.filter(employee => {
            // First name filter
            if (filters.firstName && !employee.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) {
                return false;
            }
            
            // Department filter
            if (filters.department && employee.department !== filters.department) {
                return false;
            }
            
            // Role filter
            if (filters.role && employee.role !== filters.role) {
                return false;
            }
            
            return true;
        });
    }

    // Sort employees
    sortEmployees(employees, field, direction = 'asc') {
        return [...employees].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];
            
            if (direction === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
    }

    // Get unique departments
    getDepartments() {
        return [...new Set(this.employees.map(emp => emp.department))];
    }

    // Get unique roles
    getRoles() {
        return [...new Set(this.employees.map(emp => emp.role))];
    }

    // Get employee statistics
    getStatistics() {
        const total = this.employees.length;
        const byDepartment = {};
        const byRole = {};
        
        this.employees.forEach(emp => {
            byDepartment[emp.department] = (byDepartment[emp.department] || 0) + 1;
            byRole[emp.role] = (byRole[emp.role] || 0) + 1;
        });
        
        return {
            total,
            byDepartment,
            byRole
        };
    }

    // Reset to mock data
    resetToMockData() {
        this.employees = [...mockEmployees];
        this.nextId = this.getNextId();
        this.saveEmployees();
    }

    // Export employees as JSON
    exportEmployees() {
        return JSON.stringify(this.employees, null, 2);
    }

    // Import employees from JSON
    importEmployees(jsonData) {
        try {
            const importedEmployees = JSON.parse(jsonData);
            if (Array.isArray(importedEmployees)) {
                this.employees = importedEmployees;
                this.nextId = this.getNextId();
                this.saveEmployees();
                return true;
            }
        } catch (error) {
            console.error('Error importing employees:', error);
        }
        return false;
    }

    // Validate employee data
    validateEmployee(employeeData) {
        const errors = {};
        
        if (!employeeData.firstName || employeeData.firstName.trim() === '') {
            errors.firstName = 'First name is required';
        }
        
        if (!employeeData.lastName || employeeData.lastName.trim() === '') {
            errors.lastName = 'Last name is required';
        }
        
        if (!employeeData.email || employeeData.email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!employeeData.department) {
            errors.department = 'Department is required';
        }
        
        if (!employeeData.role) {
            errors.role = 'Role is required';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    // Check if email already exists
    isEmailDuplicate(email, excludeId = null) {
        return this.employees.some(emp => 
            emp.email.toLowerCase() === email.toLowerCase() && 
            emp.id !== excludeId
        );
    }
}

// Create global instance
const employeeDataManager = new EmployeeDataManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mockEmployees,
        EmployeeDataManager,
        employeeDataManager
    };
}