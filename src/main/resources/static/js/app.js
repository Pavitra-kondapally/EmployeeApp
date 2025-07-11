// Employee Directory Application
class EmployeeDirectory {
    constructor() {
        this.employees = employeeDataManager.getAllEmployees();
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.pageSize = 10;
        this.currentFilters = {};
        this.currentSort = { field: '', direction: 'asc' };
        this.editingEmployeeId = null;
        
        this.init();
    }

    init() {
        console.log('Initializing EmployeeDirectory...');
        console.log('Initial employees count:', this.employees.length);
        
        this.bindEvents();
        console.log('Events bound successfully');
        
        this.renderEmployeeList();
        console.log('Employee list rendered');
        
        this.updatePagination();
        console.log('Pagination updated');
        
        this.updatePaginationInfo();
        console.log('Pagination info updated');
        
        console.log('EmployeeDirectory initialization complete');
    }

    bindEvents() {
        // Add Employee Button
        document.getElementById('add-employee-btn').addEventListener('click', () => {
            this.openModal();
        });

        // Reset Data Button
        document.getElementById('reset-data-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all data to the original mock data? This will delete all custom employees.')) {
                employeeDataManager.resetToMockData();
                this.applyAllFilters();
                this.showNotification('Data reset to original mock data!', 'success');
            }
        });

        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Sort functionality
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.handleSort(e.target.value);
        });

        // Filter functionality
        document.getElementById('filter-btn').addEventListener('click', () => {
            this.toggleFilterSidebar();
        });

        document.getElementById('close-filter-btn').addEventListener('click', () => {
            this.toggleFilterSidebar();
        });

        document.getElementById('apply-filter-btn').addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('clear-filter-btn').addEventListener('click', () => {
            this.clearFilters();
        });

        // Modal functionality
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancel-form-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // Form submission
        document.getElementById('employee-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Pagination
        document.getElementById('prev-page-btn').addEventListener('click', () => {
            this.goToPage(this.currentPage - 1);
        });

        document.getElementById('next-page-btn').addEventListener('click', () => {
            this.goToPage(this.currentPage + 1);
        });

        document.getElementById('page-size-select').addEventListener('change', (e) => {
            this.pageSize = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEmployeeList();
            this.updatePagination();
            this.updatePaginationInfo();
        });

        // Close modal on overlay click
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                this.closeModal();
            }
        });

        // Delegate event listeners for edit and delete buttons
        document.getElementById('employee-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn--edit')) {
                const employeeId = parseInt(e.target.dataset.id);
                this.editEmployee(employeeId);
            } else if (e.target.classList.contains('btn--delete')) {
                const employeeId = parseInt(e.target.dataset.id);
                this.deleteEmployee(employeeId);
            }
        });
    }

    handleSearch(searchTerm) {
        this.currentFilters.search = searchTerm.toLowerCase();
        this.applyAllFilters();
    }

    handleSort(field) {
        if (!field) {
            this.currentSort = { field: '', direction: 'asc' };
        } else {
            this.currentSort = { field, direction: 'asc' };
        }
        this.applyAllFilters();
    }

    applyFilters() {
        const firstName = document.getElementById('filter-firstName').value;
        const department = document.getElementById('filter-department').value;
        const role = document.getElementById('filter-role').value;

        this.currentFilters = {
            ...this.currentFilters,
            firstName: firstName.toLowerCase(),
            department: department,
            role: role
        };

        this.applyAllFilters();
        this.toggleFilterSidebar();
    }

    clearFilters() {
        document.getElementById('filter-firstName').value = '';
        document.getElementById('filter-department').value = '';
        document.getElementById('filter-role').value = '';
        
        this.currentFilters = { search: this.currentFilters.search || '' };
        this.applyAllFilters();
    }

    applyAllFilters() {
        // Get fresh data from data manager
        this.employees = employeeDataManager.getAllEmployees();
        
        // Apply search filter
        let filtered = this.employees;
        if (this.currentFilters.search) {
            filtered = employeeDataManager.searchEmployees(this.currentFilters.search);
        }

        // Apply other filters
        if (this.currentFilters.firstName || this.currentFilters.department || this.currentFilters.role) {
            filtered = employeeDataManager.filterEmployees(this.currentFilters);
        }

        // Apply sorting
        if (this.currentSort.field) {
            filtered = employeeDataManager.sortEmployees(filtered, this.currentSort.field, this.currentSort.direction);
        }

        this.filteredEmployees = filtered;
        this.currentPage = 1;
        this.renderEmployeeList();
        this.updatePagination();
        this.updatePaginationInfo();
    }

    renderEmployeeList() {
        console.log('Rendering employee list...');
        console.log('Total employees:', this.employees.length);
        console.log('Filtered employees:', this.filteredEmployees.length);
        console.log('Current page:', this.currentPage);
        console.log('Page size:', this.pageSize);
        
        const employeeList = document.getElementById('employee-list');
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const employeesToShow = this.filteredEmployees.slice(startIndex, endIndex);
        
        console.log('Employees to show:', employeesToShow.length);

        if (employeesToShow.length === 0) {
            console.log('No employees to show, displaying empty state');
            employeeList.innerHTML = `
                <div class="empty-state">
                    <h3>No employees found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        console.log('Rendering employee cards...');
        employeeList.innerHTML = employeesToShow.map(employee => `
            <div class="employee-card" data-employee-id="${employee.id}">
                <div class="employee-card__header">
                    <h3 class="employee-card__name">${employee.firstName} ${employee.lastName}</h3>
                    <span class="employee-card__id">ID: ${employee.id}</span>
                </div>
                <div class="employee-card__info">
                    <p class="employee-card__email">${employee.email}</p>
                    <p class="employee-card__department">${employee.department}</p>
                    <p class="employee-card__role">${employee.role}</p>
                </div>
                <div class="employee-card__actions">
                    <button class="btn btn--edit" data-id="${employee.id}">Edit</button>
                    <button class="btn btn--delete" data-id="${employee.id}">Delete</button>
                </div>
            </div>
        `).join('');
        
        console.log('Employee list rendered successfully');
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
        const paginationPages = document.getElementById('pagination-pages');
        const prevBtn = document.getElementById('prev-page-btn');
        const nextBtn = document.getElementById('next-page-btn');

        // Update button states
        prevBtn.disabled = this.currentPage <= 1;
        nextBtn.disabled = this.currentPage >= totalPages;

        // Generate page numbers
        let pagesHTML = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pagesHTML += `
                <button class="btn btn--pagination ${i === this.currentPage ? 'active' : ''}" 
                        onclick="employeeDirectory.goToPage(${i})">${i}</button>
            `;
        }

        paginationPages.innerHTML = pagesHTML;
    }

    updatePaginationInfo() {
        const totalEmployees = this.filteredEmployees.length;
        const startIndex = (this.currentPage - 1) * this.pageSize + 1;
        const endIndex = Math.min(this.currentPage * this.pageSize, totalEmployees);
        
        document.getElementById('pagination-info').textContent = 
            `Showing ${startIndex}-${endIndex} of ${totalEmployees} employees`;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderEmployeeList();
            this.updatePagination();
            this.updatePaginationInfo();
        }
    }

    toggleFilterSidebar() {
        const sidebar = document.getElementById('filter-sidebar');
        sidebar.classList.toggle('active');
    }

    openModal(employee = null) {
        const modal = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const form = document.getElementById('employee-form');

        this.editingEmployeeId = employee ? employee.id : null;
        modalTitle.textContent = employee ? 'Edit Employee' : 'Add Employee';

        // Clear form
        form.reset();
        this.clearFormErrors();

        // Populate form if editing
        if (employee) {
            document.getElementById('firstName').value = employee.firstName;
            document.getElementById('lastName').value = employee.lastName;
            document.getElementById('email').value = employee.email;
            document.getElementById('department').value = employee.department;
            document.getElementById('role').value = employee.role;
        }

        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('modal-overlay');
        modal.classList.remove('active');
        this.editingEmployeeId = null;
        this.clearFormErrors();
    }

    clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.form-group input, .form-group select');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        inputElements.forEach(element => {
            element.classList.remove('error');
        });
    }

    handleFormSubmit() {
        const formData = new FormData(document.getElementById('employee-form'));
        const employeeData = {
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            email: formData.get('email').trim(),
            department: formData.get('department'),
            role: formData.get('role')
        };

        // Validate form using data manager
        const validation = employeeDataManager.validateEmployee(employeeData);
        
        if (!validation.isValid) {
            this.displayFormErrors(validation.errors);
            return;
        }

        // Check for duplicate email
        if (employeeDataManager.isEmailDuplicate(employeeData.email, this.editingEmployeeId)) {
            this.displayFormErrors({ email: 'This email address is already in use' });
            return;
        }

        // Clear any existing errors
        this.clearFormErrors();

        if (this.editingEmployeeId) {
            // Update existing employee
            const updatedEmployee = employeeDataManager.updateEmployee(this.editingEmployeeId, employeeData);
            if (updatedEmployee) {
                this.showNotification('Employee updated successfully!', 'success');
            } else {
                this.showNotification('Error updating employee!', 'error');
            }
        } else {
            // Add new employee
            const newEmployee = employeeDataManager.addEmployee(employeeData);
            if (newEmployee) {
                this.showNotification('Employee added successfully!', 'success');
            } else {
                this.showNotification('Error adding employee!', 'error');
            }
        }

        // Reapply filters and render
        this.applyAllFilters();
        this.closeModal();
    }

    displayFormErrors(errors) {
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            const inputElement = document.getElementById(field);
            
            if (errorElement && inputElement) {
                errorElement.textContent = errors[field];
                inputElement.classList.add('error');
            }
        });
    }

    editEmployee(employeeId) {
        const employee = employeeDataManager.getEmployeeById(employeeId);
        if (employee) {
            this.openModal(employee);
        }
    }

    deleteEmployee(employeeId) {
        if (confirm('Are you sure you want to delete this employee?')) {
            const deletedEmployee = employeeDataManager.deleteEmployee(employeeId);
            if (deletedEmployee) {
                this.applyAllFilters();
                this.showNotification('Employee deleted successfully!', 'success');
            } else {
                this.showNotification('Error deleting employee!', 'error');
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        // Set background color based on type
        if (type === 'success') {
            notification.style.backgroundColor = '#27ae60';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#e74c3c';
        } else {
            notification.style.backgroundColor = '#3498db';
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing EmployeeDirectory...');
    console.log('EmployeeDataManager available:', typeof employeeDataManager !== 'undefined');
    console.log('Initial employees:', employeeDataManager ? employeeDataManager.getAllEmployees().length : 'N/A');
    
    try {
        window.employeeDirectory = new EmployeeDirectory();
        console.log('EmployeeDirectory initialized successfully');
    } catch (error) {
        console.error('Error initializing EmployeeDirectory:', error);
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
