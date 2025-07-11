# 💼 Employee Directory Web Interface

A responsive, interactive Employee Directory built using **HTML**, **CSS**, **JavaScript**, and **Freemarker templates**. Designed to demonstrate modern front-end development practices with a clean, user-friendly interface.

---

## 🚀 Features

### Core Functionality
- Add, edit, and delete employees
- Search and filter by name, email, department, and role
- Sort by first name or department
- Pagination with adjustable item count

### UI & UX
- Card-based dashboard layout
- Modal forms with real-time validation
- Sidebar for filtering
- Smooth transitions, hover effects, and accessibility support

### Technical Details
- Fully responsive design (mobile-first)
- Form validation with clear error messages
- Modular JS and CSS structure
- No backend—uses in-memory data

---

## 📁 Project Structure

```
EmployeeApp/
├── src/
│   └── main/
│       └── resources/
│           ├── static/
│           │   ├── css/
│           │   │   └── style.css          # Main stylesheet with responsive design
│           │   └── js/
│           │       ├── data.js            # Mock employee data
│           │       ├── validation.js      # Form validation functions
│           │       └── app.js             # Main application logic
│           └── templates/
│               ├── dashboard.ftlh         # Main dashboard template
│               └── layout.ftlh            # Base layout template
└── README.md                              # This file
```

## 🛠️ How to Run

1. Download or clone the repository.
2. Navigate to:  
 
src/main/resources/templates/

3. Open `dashboard.ftlh` in your browser.

> ⚠️ Note: Some features (like template logic) may not render fully unless opened through a Freemarker-compatible environment. However, the HTML/CSS/JS UI will still demonstrate the functionality.

---

## 🧭 Usage Guide

- **Add Employee**: Click "Add Employee", fill in the form, and save.
- **Edit**: Use the "Edit" button on any employee card.
- **Delete**: Use the "Delete" button and confirm the prompt.
- **Search/Filter**: Use the search bar and filter options in the sidebar.
- **Sort**: Use the dropdown to sort by first name or department.
- **Pagination**: Use controls at the bottom to navigate pages or change items per page.

---

## 🔍 Reflection

### Challenges Faced
- Managing dynamic UI without external libraries
- Responsive design across breakpoints
- Accessible modal and focus handling
- Modular structure with clean separation of logic

### Future Improvements
- Integrate a backend for real data persistence
- Add export options (CSV, PDF)
- Enable bulk actions
- Include data visualizations
- Add user login and role-based access

---
