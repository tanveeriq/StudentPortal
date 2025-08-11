// Demo data for the application
const demoData = {
    users: [
        { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
        { id: 2, username: 'teacher', password: 'teacher123', role: 'teacher', name: 'Faisal Teacher' },
        { id: 3, username: 'student', password: 'student123', role: 'student', name: 'Abdullah' },
        { id: 4, username: 'teacher2', password: 'teacher123', role: 'teacher', name: 'Umar Teacher' },
        { id: 5, username: 'student2', password: 'student123', role: 'student', name: 'Amir' },
        { id: 6, username: 'student3', password: 'student123', role: 'student', name: 'Saleem' }
    ],
    students: [
        { id: 1, name: 'Abdullah', teacherId: 2, attendance: [] },
        { id: 2, name: 'Amir', teacherId: 2, attendance: [] },
        { id: 3, name: 'Saleem', teacherId: 4, attendance: [] }
    ],
    teachers: [
        { id: 1, name: 'Faisal Teacher' },
        { id: 2, name: 'Umar Teacher' }
    ],
    assignments: [
        { id: 1, title: 'Sabq', description: 'Complete exercises 1-10', teacherId: 1, dueDate: '2024-01-15', status: 'pending' },
        { id: 2, title: 'Manzil', description: 'Research paper on climate change', teacherId: 1, dueDate: '2024-01-20', status: 'completed' },
        { id: 3, title: 'Sabqi', description: 'Write a 500-word essay', teacherId: 2, dueDate: '2024-01-18', status: 'pending' }
    ],
    attendance: [],
    studentSubmissions: {} // Added for student submissions
};

let currentUser = null;

// DOM Elements
const loginForm = document.getElementById('loginForm');
const dashboard = document.querySelector('.dashboard');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
    
    // Add event listeners
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Find user in demo data
    const user = demoData.users.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
    );
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showDashboard();
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Show dashboard based on user role
function showDashboard() {
    document.querySelector('.container').style.display = 'none';
    dashboard.style.display = 'block';
    
    // Create dashboard HTML based on user role
    if (currentUser.role === 'admin') {
        createAdminDashboard();
    } else if (currentUser.role === 'teacher') {
        createTeacherDashboard();
    } else if (currentUser.role === 'student') {
        createStudentDashboard();
    }
}

// Create Admin Dashboard
function createAdminDashboard() {
    dashboard.innerHTML = `
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>Admin Portal</h2>
                <p>Welcome, ${currentUser.name}</p>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#" class="nav-link active" onclick="showAdminOverview()">
                        <i class="fas fa-tachometer-alt"></i>
                        Overview
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showUserManagement()">
                        <i class="fas fa-users"></i>
                        User Management
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showAssignments()">
                        <i class="fas fa-book"></i>
                        Assignments
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showAttendance()">
                        <i class="fas fa-calendar-check"></i>
                        Attendance
                    </a>
                </li>
            </ul>
        </div>
        <div class="main-content">
            <div class="header">
                <h1>Admin Dashboard</h1>
                <div class="user-info">
                    <div class="user-avatar">A</div>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
            </div>
            <div id="dashboard-content">
                <!-- Content will be loaded here -->
            </div>
        </div>
    `;
    
    showAdminOverview();
}

// Create Teacher Dashboard
function createTeacherDashboard() {
    dashboard.innerHTML = `
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>Teacher Portal</h2>
                <p>Welcome, ${currentUser.name}</p>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#" class="nav-link active" onclick="showTeacherOverview()">
                        <i class="fas fa-tachometer-alt"></i>
                        Overview
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showMyStudents()">
                        <i class="fas fa-user-graduate"></i>
                        My Students
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showCreateAssignment()">
                        <i class="fas fa-plus"></i>
                        Create Assignment
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showMyAssignments()">
                        <i class="fas fa-book"></i>
                        My Assignments
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showAttendance()">
                        <i class="fas fa-calendar-check"></i>
                        Attendance
                    </a>
                </li>
            </ul>
        </div>
        <div class="main-content">
            <div class="header">
                <h1>Teacher Dashboard</h1>
                <div class="user-info">
                    <div class="user-avatar">T</div>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
            </div>
            <div id="dashboard-content">
                <!-- Content will be loaded here -->
            </div>
        </div>
    `;
    
    showTeacherOverview();
}

// Create Student Dashboard
function createStudentDashboard() {
    dashboard.innerHTML = `
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>Student Portal</h2>
                <p>Welcome, ${currentUser.name}</p>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#" class="nav-link active" onclick="showStudentOverview()">
                        <i class="fas fa-tachometer-alt"></i>
                        Overview
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showMyAssignments()">
                        <i class="fas fa-book"></i>
                        My Assignments
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="showAttendance()">
                        <i class="fas fa-calendar-check"></i>
                        Attendance
                    </a>
                </li>
            </ul>
        </div>
        <div class="main-content">
            <div class="header">
                <h1>Student Dashboard</h1>
                <div class="user-info">
                    <div class="user-avatar">S</div>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
            </div>
            <div id="dashboard-content">
                <!-- Content will be loaded here -->
            </div>
        </div>
    `;
    
    showStudentOverview();
}

// Admin Overview
function showAdminOverview() {
    const content = document.getElementById('dashboard-content');
    const totalStudents = demoData.students.length;
    const totalTeachers = demoData.teachers.length;
    const totalAssignments = demoData.assignments.length;
    const totalUsers = demoData.users.length;
    
    content.innerHTML = `
        <div class="dashboard-grid">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Total Students</div>
                    <div class="card-icon students">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                </div>
                <div class="card-value">${totalStudents}</div>
                <div class="card-description">Registered students</div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Total Teachers</div>
                    <div class="card-icon teachers">
                        <i class="fas fa-chalkboard-teacher"></i>
                    </div>
                </div>
                <div class="card-value">${totalTeachers}</div>
                <div class="card-description">Active teachers</div>
            </div>
        </div>
        
        <div class="overview-section">
            <h2>Assign Teacher HQ Status</h2>
            <form id="assignHQForm" class="form-row" style="margin-bottom: 20px;">
                <div class="form-group-full">
                    <label for="teacherHQSelect">Select Teacher</label>
                    <select id="teacherHQSelect" name="teacherHQSelect" required>
                        <option value="">Choose a teacher</option>
                        ${demoData.teachers.map(teacher => `
                            <option value="${teacher.id}">${teacher.name}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group-full">
                    <label for="hqType">HQ Type</label>
                    <select id="hqType" name="hqType" required>
                        <option value="">Select Type</option>
                        <option value="Full Time HQ">Full Time HQ</option>
                        <option value="Part Time HQ">Part Time HQ</option>
                    </select>
                </div>
                <div class="form-group-full" style="align-self: flex-end;">
                    <button type="submit" class="submit-btn">Assign HQ</button>
                </div>
            </form>
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Teacher HQ Assignments</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Teacher Name</th>
                            <th>HQ Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="hqAssignmentTableBody">
                        ${demoData.teachers.map(teacher => `
                            <tr>
                                <td>${teacher.name}</td>
                                <td>${teacher.hqType || 'Not Assigned'}</td>
                                <td>
                                    <button class="btn-small" onclick="editHQType(${teacher.id})">Edit</button>
                                    <button class="btn-small btn-danger" onclick="removeHQType(${teacher.id})">Remove</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Recent Activity</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>New assignment created</td>
                        <td>John Teacher</td>
                        <td>2024-01-10</td>
                        <td><span class="status-badge active">Completed</span></td>
                    </tr>
                    <tr>
                        <td>Student attendance marked</td>
                        <td>Alice Student</td>
                        <td>2024-01-10</td>
                        <td><span class="status-badge active">Present</span></td>
                    </tr>
                    <tr>
                        <td>New teacher registered</td>
                        <td>Sarah Teacher</td>
                        <td>2024-01-09</td>
                        <td><span class="status-badge active">Active</span></td>
                    </tr>
                    <tr>
                        <td>Student assigned to teacher</td>
                        <td>Bob Student</td>
                        <td>2024-01-08</td>
                        <td><span class="status-badge active">Assigned</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// User Management with Sorting and Pagination
let currentPage = 1;
let usersPerPage = 10;
let sortField = 'name';
let sortDirection = 'asc';

function showUserManagement() {
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">User Management</h3>
                <div class="table-controls">
                    <div class="search-box">
                        <input type="text" id="userSearch" placeholder="Search users..." onkeyup="filterUsers()">
                        <i class="fas fa-search"></i>
                    </div>
                    <button class="add-btn" onclick="showCreateUserForm()">
                        <i class="fas fa-plus"></i>
                        Add User
                    </button>
                </div>
            </div>
            
            <div class="table-filters">
                <select id="roleFilter" onchange="filterUsers()">
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>
                <select id="statusFilter" onchange="filterUsers()">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            
            <table id="userTable">
                <thead>
                    <tr>
                        <th onclick="sortUsers('name')" class="sortable">
                            Name <i class="fas fa-sort"></i>
                        </th>
                        <th onclick="sortUsers('username')" class="sortable">
                            Username <i class="fas fa-sort"></i>
                        </th>
                        <th onclick="sortUsers('role')" class="sortable">
                            Role <i class="fas fa-sort"></i>
                        </th>
                        <th onclick="sortUsers('status')" class="sortable">
                            Status <i class="fas fa-sort"></i>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="userTableBody">
                    <!-- User rows will be loaded here -->
                </tbody>
            </table>
            
            <div class="pagination">
                <button onclick="changePage(-1)" class="page-btn" id="prevBtn">Previous</button>
                <span id="pageInfo">Page 1 of 1</span>
                <button onclick="changePage(1)" class="page-btn" id="nextBtn">Next</button>
            </div>
        </div>
    `;
    
    loadUsers();
}

function loadUsers() {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    
    // Sort users
    const sortedUsers = [...demoData.users].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        if (sortDirection === 'desc') {
            [aValue, bValue] = [bValue, aValue];
        }
        
        return aValue.localeCompare(bValue);
    });
    
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
    
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = paginatedUsers.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td><span class="status-badge ${user.role}">${user.role}</span></td>
            <td><span class="status-badge active">Active</span></td>
            <td>
                <button class="btn-small" onclick="showEditUserForm(${user.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-danger" onclick="deleteUser(${user.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn-small btn-info" onclick="showViewUser(${user.id})" title="View">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    updatePagination();
}

function sortUsers(field) {
    if (sortField === field) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortField = field;
        sortDirection = 'asc';
    }
    currentPage = 1;
    loadUsers();
}

function changePage(direction) {
    const totalPages = Math.ceil(demoData.users.length / usersPerPage);
    currentPage += direction;
    
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    
    loadUsers();
}

function updatePagination() {
    const totalPages = Math.ceil(demoData.users.length / usersPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function filterUsers() {
    currentPage = 1;
    loadUsers();
}

// Show Student Assignment Section
function showStudentAssignment() {
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Assign Students to Teachers</h3>
                <div class="table-controls">
                    <button class="add-btn" onclick="showAssignStudentForm()">
                        <i class="fas fa-plus"></i>
                        Assign Student
                    </button>
                </div>
            </div>
            
            <div class="table-container">
                <div class="table-header">
                    <h3 class="table-title">Current Student Assignments</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Assigned Teacher</th>
                            <th>Assignment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="studentAssignmentTableBody">
                        ${demoData.students.map(student => {
                            const teacher = demoData.teachers.find(t => t.id === student.teacherId);
                            return `
                                <tr>
                                    <td>${student.name}</td>
                                    <td>${teacher ? teacher.name : 'Not Assigned'}</td>
                                    <td>${student.assignedDate || 'N/A'}</td>
                                    <td>
                                        <button class="btn-small" onclick="reassignStudent(${student.id})" title="Reassign">
                                            <i class="fas fa-exchange-alt"></i>
                                        </button>
                                        <button class="btn-small btn-danger" onclick="removeStudentAssignment(${student.id})" title="Remove Assignment">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Show Assign Student Form
function showAssignStudentForm() {
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
        <div class="form-container">
            <h2>Assign Student to Teacher</h2>
            <form id="assignStudentForm">
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="studentSelect">Select Student</label>
                        <select id="studentSelect" name="studentSelect" required>
                            <option value="">Choose a student</option>
                            ${demoData.users.filter(user => user.role === 'student').map(student => `
                                <option value="${student.id}">${student.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group-full">
                        <label for="teacherSelect">Select Teacher</label>
                        <select id="teacherSelect" name="teacherSelect" required>
                            <option value="">Choose a teacher</option>
                            ${demoData.users.filter(user => user.role === 'teacher').map(teacher => `
                                <option value="${teacher.id}">${teacher.name}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-link"></i>
                        Assign Student
                    </button>
                    <button type="button" class="cancel-btn" onclick="showStudentAssignment()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('assignStudentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentId = parseInt(document.getElementById('studentSelect').value);
        const teacherId = parseInt(document.getElementById('teacherSelect').value);
        
        // Find the student in demoData.students or create new entry
        let student = demoData.students.find(s => s.id === studentId);
        if (!student) {
            const userStudent = demoData.users.find(u => u.id === studentId);
            if (userStudent) {
                student = {
                    id: studentId,
                    name: userStudent.name,
                    teacherId: teacherId,
                    assignedDate: new Date().toISOString().split('T')[0],
                    attendance: []
                };
                demoData.students.push(student);
            }
        } else {
            student.teacherId = teacherId;
            student.assignedDate = new Date().toISOString().split('T')[0];
        }
        
        alert('Student assigned successfully!');
        showStudentAssignment();
    });
}

// Reassign Student
function reassignStudent(studentId) {
    showAssignStudentForm();
    // Pre-select the student
    setTimeout(() => {
        document.getElementById('studentSelect').value = studentId;
    }, 100);
}

// Remove Student Assignment
function removeStudentAssignment(studentId) {
    if (confirm('Are you sure you want to remove this student assignment?')) {
        const student = demoData.students.find(s => s.id === studentId);
        if (student) {
            student.teacherId = null;
            student.assignedDate = null;
            alert('Student assignment removed successfully!');
            showStudentAssignment();
        }
    }
}

// Teacher Overview
function showTeacherOverview() {
    const content = document.getElementById('dashboard-content');
    const myStudents = demoData.students.filter(s => s.teacherId === currentUser.id);
    const myAssignments = demoData.assignments.filter(a => a.teacherId === currentUser.id);
    const today = new Date().toLocaleDateString();
    if (!demoData.teacherAttendance) demoData.teacherAttendance = {};
    if (!demoData.teacherAttendance[currentUser.id]) demoData.teacherAttendance[currentUser.id] = {};
    const todayRecord = demoData.teacherAttendance[currentUser.id][today] || { checkIn: null, checkOut: null };

    content.innerHTML = `
        <div class="dashboard-grid">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">My Students</div>
                    <div class="card-icon students">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                </div>
                <div class="card-value">${myStudents.length}</div>
                <div class="card-description">Assigned students</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">My Assignments</div>
                    <div class="card-icon assignments">
                        <i class="fas fa-book"></i>
                    </div>
                </div>
                <div class="card-value">${myAssignments.length}</div>
                <div class="card-description">Created assignments</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Today's Attendance</div>
                    <div class="card-icon attendance">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                </div>
                <div class="card-value">${myStudents.length}</div>
                <div class="card-description">Students present</div>
            </div>
        </div>
        <div class="checkin-section attendance-card" style="margin: 2rem 0; padding: 1.5rem;">
            <h3>Teacher Check-In / Check-Out</h3>
            <div style="margin-bottom: 1rem;">
                <strong>Date:</strong> ${today}<br>
                <strong>Check-In:</strong> <span id="checkin-time">${todayRecord.checkIn ? todayRecord.checkIn : '-'}</span><br>
                <strong>Check-Out:</strong> <span id="checkout-time">${todayRecord.checkOut ? todayRecord.checkOut : '-'}</span>
            </div>
            <button class="attendance-btn-present" onclick="checkInTeacher()" ${todayRecord.checkIn ? 'disabled' : ''}>Check In</button>
            <button class="attendance-btn-absent" onclick="checkOutTeacher()" ${!todayRecord.checkIn || todayRecord.checkOut ? 'disabled' : ''}>Check Out</button>
        </div>
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Recent Assignments</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${myAssignments.map(assignment => `
                        <tr>
                            <td>${assignment.title}</td>
                            <td>${assignment.dueDate}</td>
                            <td><span class="status-badge ${assignment.status}">${assignment.status}</span></td>
                            <td>
                                <button class="btn-small" onclick="viewAssignment(${assignment.id})">View</button>
                                <button class="btn-small" onclick="editAssignment(${assignment.id})">Edit</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function checkInTeacher() {
    const today = new Date().toLocaleDateString();
    const now = new Date().toLocaleTimeString();
    if (!demoData.teacherAttendance) demoData.teacherAttendance = {};
    if (!demoData.teacherAttendance[currentUser.id]) demoData.teacherAttendance[currentUser.id] = {};
    demoData.teacherAttendance[currentUser.id][today] = demoData.teacherAttendance[currentUser.id][today] || { checkIn: null, checkOut: null };
    if (!demoData.teacherAttendance[currentUser.id][today].checkIn) {
        demoData.teacherAttendance[currentUser.id][today].checkIn = now;
        alert('Checked in at ' + now);
        showTeacherOverview();
    }
}

function checkOutTeacher() {
    const today = new Date().toLocaleDateString();
    const now = new Date().toLocaleTimeString();
    if (!demoData.teacherAttendance) demoData.teacherAttendance = {};
    if (!demoData.teacherAttendance[currentUser.id]) demoData.teacherAttendance[currentUser.id] = {};
    demoData.teacherAttendance[currentUser.id][today] = demoData.teacherAttendance[currentUser.id][today] || { checkIn: null, checkOut: null };
    if (demoData.teacherAttendance[currentUser.id][today].checkIn && !demoData.teacherAttendance[currentUser.id][today].checkOut) {
        demoData.teacherAttendance[currentUser.id][today].checkOut = now;
        alert('Checked out at ' + now);
        showTeacherOverview();
    }
}

// Student Overview
function showStudentOverview() {
    const content = document.getElementById('dashboard-content');
    const myAssignments = demoData.assignments.filter(a => a.teacherId === 1 || a.teacherId === 2);
    if (!demoData.studentSubmissions) demoData.studentSubmissions = {};
    content.innerHTML = `
        <div class="dashboard-grid">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">My Assignments</div>
                    <div class="card-icon assignments">
                        <i class="fas fa-book"></i>
                    </div>
                </div>
                <div class="card-value">${myAssignments.length}</div>
                <div class="card-description">Total assignments</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Completed</div>
                    <div class="card-icon attendance">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="card-value">${myAssignments.filter(a => a.status === 'completed').length}</div>
                <div class="card-description">Assignments completed</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Attendance</div>
                    <div class="card-icon attendance">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                </div>
                <div class="card-value">95%</div>
                <div class="card-description">This month</div>
            </div>
        </div>
        <div class="attendance-card" style="margin:2rem 0; padding:1.5rem;">
            <h3>Mark Attendance</h3>
            <div class="attendance-form">
                <span>Today's Date: ${new Date().toLocaleDateString()}</span>
                <button class="attendance-btn-present" onclick="markAttendance('present')">
                    <i class="fas fa-check"></i>
                    Present
                </button>
                <button class="attendance-btn-absent" onclick="markAttendance('absent')">
                    <i class="fas fa-times"></i>
                    Absent
                </button>
            </div>
        </div>
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">My Assignments</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Teacher</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Download</th>
                        <th>Upload Completed</th>
                        <th>Submission</th>
                    </tr>
                </thead>
                <tbody>
                    ${myAssignments.map(assignment => {
                        const submission = (demoData.studentSubmissions[currentUser.id] && demoData.studentSubmissions[currentUser.id][assignment.id]) || null;
                        return `
                        <tr>
                            <td>${assignment.title}</td>
                            <td>${demoData.teachers.find(t => t.id === assignment.teacherId)?.name || 'Unknown'}</td>
                            <td>${assignment.dueDate}</td>
                            <td><span class="status-badge ${assignment.status}">${assignment.status}</span></td>
                            <td><a href="#" onclick="downloadAssignment(${assignment.id})" class="btn-small btn-view" title="Download"><i class="fas fa-download"></i></a></td>
                            <td>
                                <input type="file" id="upload-${assignment.id}" style="display:none" onchange="uploadAssignment(event, ${assignment.id})">
                                <button class="btn-small btn-info" onclick="document.getElementById('upload-${assignment.id}').click()" title="Upload"><i class="fas fa-upload"></i></button>
                            </td>
                            <td>${submission ? `<span class='status-badge completed'>Uploaded</span>` : '-'}</td>
                        </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function downloadAssignment(assignmentId) {
    alert('This would download the assignment file for assignment ID: ' + assignmentId + ' (simulated)');
}

function uploadAssignment(event, assignmentId) {
    const file = event.target.files[0];
    if (!file) return;
    if (!demoData.studentSubmissions) demoData.studentSubmissions = {};
    if (!demoData.studentSubmissions[currentUser.id]) demoData.studentSubmissions[currentUser.id] = {};
    demoData.studentSubmissions[currentUser.id][assignmentId] = file.name;
    alert('Assignment uploaded: ' + file.name);
    showStudentOverview();
}

// Show Assignments
function showAssignments() {
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">All Assignments</h3>
                <button class="add-btn" onclick="showCreateAssignmentForm()">
                    <i class="fas fa-plus"></i>
                    Create Assignment
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                        <th>Grade</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${demoData.assignments.map(assignment => `
                        <tr>
                            <td>${assignment.title}</td>
                            <td>${assignment.subject || 'N/A'}</td>
                            <td>${demoData.teachers.find(t => t.id === assignment.teacherId)?.name || 'Unknown'}</td>
                            <td>${assignment.grade || 'N/A'}</td>
                            <td><span class="status-badge ${assignment.priority || 'medium'}">${assignment.priority || 'Medium'}</span></td>
                            <td>${assignment.dueDate}</td>
                            <td><span class="status-badge ${assignment.status}">${assignment.status}</span></td>
                            <td>
                                <button class="btn-small" onclick="viewAssignment(${assignment.id})" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-small" onclick="editAssignment(${assignment.id})" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-small btn-danger" onclick="deleteAssignment(${assignment.id})" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Show My Assignments
function showMyAssignments() {
    const content = document.getElementById('dashboard-content');
    let assignments = [];
    
    if (currentUser.role === 'teacher') {
        assignments = demoData.assignments.filter(a => a.teacherId === currentUser.id);
    } else if (currentUser.role === 'student') {
        assignments = demoData.assignments.filter(a => a.teacherId === 1 || a.teacherId === 2);
    }
    
    content.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">My Assignments</h3>
                ${currentUser.role === 'teacher' ? `
                    <button class="add-btn" onclick="showCreateAssignmentForm()">
                        <i class="fas fa-plus"></i>
                        Create Assignment
                    </button>
                ` : ''}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${assignments.map(assignment => `
                        <tr>
                            <td>${assignment.title}</td>
                            <td>${assignment.description}</td>
                            <td>${assignment.dueDate}</td>
                            <td><span class="status-badge ${assignment.status}">${assignment.status}</span></td>
                            <td>
                                <button class="btn-small" onclick="viewAssignment(${assignment.id})">View</button>
                                ${currentUser.role === 'teacher' ? `
                                    <button class="btn-small" onclick="editAssignment(${assignment.id})">Edit</button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Show Create Assignment Form
function showCreateAssignmentForm() {
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
        <div class="form-container">
            <h2>Create New Assignment</h2>
            <form id="assignmentForm">
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="title">Assignment Title</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="form-group-full">
                        <label for="dueDate">Due Date</label>
                        <input type="date" id="dueDate" name="dueDate" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="subject">Subject</label>
                        <select id="subject" name="subject" required>
                            <option value="">Select Subject</option>
                            <option value="sabq">Sabq</option>
                            <option value="sabqi">Sabqi</option>
                            <option value="manzil">Manzil</option>
                        </select>
                    </div>
                    <div class="form-group-full">
                        <label for="grade">Grade Level</label>
                        <select id="grade" name="grade" required>
                            <option value="">Select Grade</option>
                            <option value="grade-9">Grade 9</option>
                            <option value="grade-10">Grade 10</option>
                            <option value="grade-11">Grade 11</option>
                            <option value="grade-12">Grade 12</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="assignedTeacher">Assign to Teacher</label>
                        <select id="assignedTeacher" name="assignedTeacher" required>
                            <option value="">Select Teacher</option>
                            ${demoData.teachers.map(teacher => `
                                <option value="${teacher.id}">${teacher.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group-full">
                        <label for="priority">Priority Level</label>
                        <select id="priority" name="priority" required>
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group-full">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" required rows="4"></textarea>
                </div>
                
                <div class="form-group-full">
                    <label for="instructions">Instructions</label>
                    <textarea id="instructions" name="instructions" rows="3"></textarea>
                </div>
                
                <div class="form-group-full">
                    <label for="assignmentFile">Assignment File</label>
                    <input type="file" id="assignmentFile" name="assignmentFile" accept=".pdf,.doc,.docx,.txt">
                    <small>Upload assignment document (PDF, DOC, DOCX, TXT)</small>
                </div>
                
                <div class="form-group-full">
                    <label for="attachments">Additional Attachments</label>
                    <input type="file" id="attachments" name="attachments" multiple>
                    <small>Upload additional files (optional)</small>
                </div>
                
                <div class="form-group-full">
                    <label for="maxScore">Maximum Score</label>
                    <input type="number" id="maxScore" name="maxScore" min="1" max="100" value="100">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-plus"></i>
                        Create Assignment
                    </button>
                    <button type="button" class="cancel-btn" onclick="showAssignments()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('assignmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const assignmentData = {
            id: demoData.assignments.length + 1,
            title: formData.get('title'),
            description: formData.get('description'),
            instructions: formData.get('instructions'),
            subject: formData.get('subject'),
            grade: formData.get('grade'),
            assignedTeacher: formData.get('assignedTeacher'),
            priority: formData.get('priority'),
            maxScore: formData.get('maxScore'),
            dueDate: formData.get('dueDate'),
            teacherId: parseInt(formData.get('assignedTeacher')),
            status: 'active',
            createdAt: new Date().toISOString()
        };
        
        // Add to demo data
        demoData.assignments.push(assignmentData);
        
        alert('Assignment created successfully!');
        showAssignments();
    });
}

// Show Attendance
function showAttendance() {
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
        <div class="attendance-card">
            <h3>Mark Attendance</h3>
            <div class="attendance-form">
                <span>Today's Date: ${new Date().toLocaleDateString()}</span>
                <span>Current Time: ${new Date().toLocaleTimeString()}</span>
                <button class="attendance-btn-present" onclick="markAttendance('present')">
                    <i class="fas fa-check"></i>
                    Present
                </button>
                <button class="attendance-btn-absent" onclick="markAttendance('absent')">
                    <i class="fas fa-times"></i>
                    Absent
                </button>
            </div>
        </div>
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">Attendance Records</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2024-01-10</td>
                        <td>09:00 AM</td>
                        <td><span class="status-badge active">Present</span></td>
                        <td>${currentUser.name}</td>
                    </tr>
                    <tr>
                        <td>2024-01-09</td>
                        <td>08:55 AM</td>
                        <td><span class="status-badge active">Present</span></td>
                        <td>${currentUser.name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Mark Attendance
function markAttendance(status) {
    const now = new Date();
    const attendanceRecord = {
        userId: currentUser.id,
        userName: currentUser.name,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        status: status
    };
    
    demoData.attendance.push(attendanceRecord);
    alert(`Attendance marked as ${status} for ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`);
}

// Show My Students (for teachers)
function showMyStudents() {
    const content = document.getElementById('dashboard-content');
    const myStudents = demoData.students.filter(s => s.teacherId === currentUser.id);
    
    content.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <h3 class="table-title">My Students</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${myStudents.map(student => `
                        <tr>
                            <td>${student.name}</td>
                            <td>${student.grade || 'N/A'}</td>
                            <td>
                                <button class="btn-small" onclick="viewStudent(${student.id})">View</button>
                                <button class="btn-small btn-info" onclick="editStudent(${student.id})">Edit</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Show Profile Section
function showProfileSection() {
    const content = document.getElementById('dashboard-content');
    content.innerHTML = `
        <div class="profile-section">
            <h2>Admin Profile</h2>
            <div class="profile-card">
                <div class="profile-avatar">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin Profile" class="profile-img" />
                </div>
                <div class="profile-details">
                    <div><strong>Name:</strong> Admin User</div>
                    <div><strong>Username:</strong> admin</div>
                    <div><strong>Email:</strong> admin@email.com</div>
                    <div><strong>Role:</strong> Administrator</div>
                </div>
                <div class="profile-actions">
                    <button class="submit-btn" onclick="editProfile()">
                        <i class="fas fa-edit"></i> Edit Profile
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Show Edit Profile Form
function showEditProfileForm() {
    const content = document.getElementById('dashboard-content');
    content.innerHTML = `
        <div class="form-container">
            <h2>Edit Profile</h2>
            <form id="profileForm">
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="editName">Name</label>
                        <input type="text" id="editName" name="editName" value="Admin User" required>
                    </div>
                    <div class="form-group-full">
                        <label for="editUsername">Username</label>
                        <input type="text" id="editUsername" name="editUsername" value="admin" required>
                    </div>
                    <div class="form-group-full">
                        <label for="editEmail">Email</label>
                        <input type="email" id="editEmail" name="editEmail" value="admin@email.com" required>
                    </div>
                    <div class="form-group-full">
                        <label for="editRole">Role</label>
                        <select id="editRole" name="editRole" required>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-save"></i>
                        Save Changes
                    </button>
                    <button type="button" class="cancel-btn" onclick="showProfileSection()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newName = document.getElementById('editName').value;
        const newUsername = document.getElementById('editUsername').value;
        const newEmail = document.getElementById('editEmail').value;
        const newRole = document.getElementById('editRole').value;

        currentUser.name = newName;
        currentUser.username = newUsername;
        currentUser.email = newEmail;
        currentUser.role = newRole;

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Profile updated successfully!');
        showProfileSection();
    });
}

// Show Edit Assignment Form
function showEditAssignmentForm(assignmentId) {
    const content = document.getElementById('dashboard-content');
    const assignment = demoData.assignments.find(a => a.id === assignmentId);

    if (!assignment) {
        alert('Assignment not found.');
        return;
    }

    content.innerHTML = `
        <div class="form-container">
            <h2>Edit Assignment</h2>
            <form id="editAssignmentForm">
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="editTitle">Assignment Title</label>
                        <input type="text" id="editTitle" name="editTitle" value="${assignment.title}" required>
                    </div>
                    <div class="form-group-full">
                        <label for="editDueDate">Due Date</label>
                        <input type="date" id="editDueDate" name="editDueDate" value="${assignment.dueDate}" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="editSubject">Subject</label>
                        <select id="editSubject" name="editSubject" required>
                            <option value="${assignment.subject || ''}" selected>${assignment.subject || 'Select Subject'}</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="science">Science</option>
                            <option value="english">English</option>
                            <option value="history">History</option>
                            <option value="computer-science">Computer Science</option>
                        </select>
                    </div>
                    <div class="form-group-full">
                        <label for="editGrade">Grade Level</label>
                        <select id="editGrade" name="editGrade" required>
                            <option value="${assignment.grade || ''}" selected>${assignment.grade || 'Select Grade'}</option>
                            <option value="grade-9">Grade 9</option>
                            <option value="grade-10">Grade 10</option>
                            <option value="grade-11">Grade 11</option>
                            <option value="grade-12">Grade 12</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="editAssignedTeacher">Assign to Teacher</label>
                        <select id="editAssignedTeacher" name="editAssignedTeacher" required>
                            <option value="${assignment.assignedTeacher || ''}" selected>${demoData.teachers.find(t => t.id === assignment.assignedTeacher)?.name || 'Select Teacher'}</option>
                            ${demoData.teachers.map(teacher => `
                                <option value="${teacher.id}">${teacher.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group-full">
                        <label for="editPriority">Priority Level</label>
                        <select id="editPriority" name="editPriority" required>
                            <option value="${assignment.priority || ''}" selected>${assignment.priority || 'Select Priority'}</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group-full">
                    <label for="editDescription">Description</label>
                    <textarea id="editDescription" name="editDescription" required rows="4">${assignment.description}</textarea>
                </div>
                
                <div class="form-group-full">
                    <label for="editInstructions">Instructions</label>
                    <textarea id="editInstructions" name="editInstructions" rows="3">${assignment.instructions}</textarea>
                </div>
                
                <div class="form-group-full">
                    <label for="editAssignmentFile">Assignment File</label>
                    <input type="file" id="editAssignmentFile" name="editAssignmentFile" accept=".pdf,.doc,.docx,.txt">
                    <small>Upload assignment document (PDF, DOC, DOCX, TXT)</small>
                </div>
                
                <div class="form-group-full">
                    <label for="editAttachments">Additional Attachments</label>
                    <input type="file" id="editAttachments" name="editAttachments" multiple>
                    <small>Upload additional files (optional)</small>
                </div>
                
                <div class="form-group-full">
                    <label for="editMaxScore">Maximum Score</label>
                    <input type="number" id="editMaxScore" name="editMaxScore" min="1" max="100" value="${assignment.maxScore || 100}">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-save"></i>
                        Save Changes
                    </button>
                    <button type="button" class="cancel-btn" onclick="showAssignments()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('editAssignmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const updatedAssignment = {
            id: assignment.id,
            title: document.getElementById('editTitle').value,
            description: document.getElementById('editDescription').value,
            instructions: document.getElementById('editInstructions').value,
            subject: document.getElementById('editSubject').value,
            grade: document.getElementById('editGrade').value,
            assignedTeacher: document.getElementById('editAssignedTeacher').value,
            priority: document.getElementById('editPriority').value,
            maxScore: document.getElementById('editMaxScore').value,
            dueDate: document.getElementById('editDueDate').value,
            status: assignment.status, // Status is not editable in this form
            createdAt: assignment.createdAt // Keep original createdAt
        };

        // Update in demo data
        const index = demoData.assignments.findIndex(a => a.id === assignment.id);
        if (index !== -1) {
            demoData.assignments[index] = updatedAssignment;
        }

        alert('Assignment updated successfully!');
        showAssignments();
    });
}

// Show View Assignment
function showViewAssignment(assignmentId) {
    const content = document.getElementById('dashboard-content');
    const assignment = demoData.assignments.find(a => a.id === assignmentId);

    if (!assignment) {
        alert('Assignment not found.');
        return;
    }

    content.innerHTML = `
        <div class="assignment-details">
            <h2>${assignment.title}</h2>
            <p><strong>Description:</strong> ${assignment.description}</p>
            <p><strong>Instructions:</strong> ${assignment.instructions}</p>
            <p><strong>Subject:</strong> ${assignment.subject}</p>
            <p><strong>Grade:</strong> ${assignment.grade}</p>
            <p><strong>Assigned To:</strong> ${demoData.teachers.find(t => t.id === assignment.assignedTeacher)?.name || 'N/A'}</p>
            <p><strong>Priority:</strong> ${assignment.priority}</p>
            <p><strong>Max Score:</strong> ${assignment.maxScore}</p>
            <p><strong>Due Date:</strong> ${assignment.dueDate}</p>
            <p><strong>Status:</strong> <span class="status-badge ${assignment.status}">${assignment.status}</span></p>
            <p><strong>Created At:</strong> ${assignment.createdAt}</p>
            <div class="assignment-actions">
                <button class="btn-small" onclick="showEditAssignmentForm(${assignment.id})">Edit</button>
                <button class="btn-small btn-danger" onclick="deleteAssignment(${assignment.id})">Delete</button>
            </div>
        </div>
    `;
}

// Show Edit User Form
function showEditUserForm(userId) {
    const content = document.getElementById('dashboard-content');
    const user = demoData.users.find(u => u.id === userId);

    if (!user) {
        alert('User not found.');
        return;
    }

    content.innerHTML = `
        <div class="form-container">
            <h2>Edit User</h2>
            <form id="editUserForm">
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="editUserName">Username</label>
                        <input type="text" id="editUserName" name="editUserName" value="${user.username}" required>
                    </div>
                    <div class="form-group-full">
                        <label for="editUserPassword">Password</label>
                        <input type="password" id="editUserPassword" name="editUserPassword" value="${user.password}" required>
                    </div>
                    <div class="form-group-full">
                        <label for="editUserRole">Role</label>
                        <select id="editUserRole" name="editUserRole" required>
                            <option value="${user.role}" selected>${user.role}</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div class="form-group-full">
                        <label for="editUserStatus">Status</label>
                        <select id="editUserStatus" name="editUserStatus" required>
                            <option value="${user.status || 'active'}" selected>${user.status || 'Active'}</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-save"></i>
                        Save Changes
                    </button>
                    <button type="button" class="cancel-btn" onclick="showUserManagement()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('editUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newUsername = document.getElementById('editUserName').value;
        const newPassword = document.getElementById('editUserPassword').value;
        const newRole = document.getElementById('editUserRole').value;
        const newStatus = document.getElementById('editUserStatus').value;

        user.username = newUsername;
        user.password = newPassword;
        user.role = newRole;
        user.status = newStatus;

        localStorage.setItem('currentUser', JSON.stringify(currentUser)); // This line seems incorrect, should update the user in demoData.users
        alert('User updated successfully!');
        showUserManagement();
    });
}

// Show View User
function showViewUser(userId) {
    const content = document.getElementById('dashboard-content');
    const user = demoData.users.find(u => u.id === userId);

    if (!user) {
        alert('User not found.');
        return;
    }

    content.innerHTML = `
        <div class="user-details">
            <h2>${user.name}</h2>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>Status:</strong> <span class="status-badge ${user.status}">${user.status}</span></p>
            <p><strong>Created At:</strong> ${user.createdAt}</p>
            <div class="user-actions">
                <button class="btn-small" onclick="showEditUserForm(${user.id})">Edit</button>
                <button class="btn-small btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </div>
        </div>
    `;
}

// Show Create User Form
function showCreateUserForm() {
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
        <div class="form-container">
            <h2>Create New User</h2>
            <form id="createUserForm">
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="newFullName">Full Name</label>
                        <input type="text" id="newFullName" name="newFullName" required>
                    </div>
                    <div class="form-group-full">
                        <label for="newEmail">Email</label>
                        <input type="email" id="newEmail" name="newEmail" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="newUsername">Username</label>
                        <input type="text" id="newUsername" name="newUsername" required>
                    </div>
                    <div class="form-group-full">
                        <label for="newPassword">Password</label>
                        <input type="password" id="newPassword" name="newPassword" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group-full">
                        <label for="newRole">Role</label>
                        <select id="newRole" name="newRole" required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div class="form-group-full">
                        <label for="newStatus">Status</label>
                        <select id="newStatus" name="newStatus" required>
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-plus"></i>
                        Create User
                    </button>
                    <button type="button" class="cancel-btn" onclick="showUserManagement()">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('createUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newFullName = document.getElementById('newFullName').value;
        const newEmail = document.getElementById('newEmail').value;
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const newRole = document.getElementById('newRole').value;
        const newStatus = document.getElementById('newStatus').value;

        const newUser = {
            id: demoData.users.length + 1, // Simple ID generation
            name: newFullName,
            email: newEmail,
            username: newUsername,
            password: newPassword,
            role: newRole,
            status: newStatus,
            createdAt: new Date().toISOString()
        };
        
        demoData.users.push(newUser);
        
        alert('User created successfully!');
        showUserManagement();
    });
}

// Delete User
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const initialLength = demoData.users.length;
        demoData.users = demoData.users.filter(user => user.id !== userId);
        if (demoData.users.length < initialLength) {
            alert('User deleted successfully!');
            showUserManagement();
        } else {
            alert('User not found or already deleted.');
        }
    }
}

// Edit HQ Type
function editHQType(teacherId) {
    const newHQType = prompt('Enter new HQ Type (e.g., Full Time HQ, Part Time HQ):');
    if (newHQType) {
        const teacher = demoData.teachers.find(t => t.id === teacherId);
        if (teacher) {
            teacher.hqType = newHQType;
            alert(`HQ Type updated for ${teacher.name} to ${newHQType}`);
            showAdminOverview(); // Refresh the table
        } else {
            alert('Teacher not found.');
        }
    }
}

// Remove HQ Type
function removeHQType(teacherId) {
    if (confirm('Are you sure you want to remove HQ type for this teacher?')) {
        const teacher = demoData.teachers.find(t => t.id === teacherId);
        if (teacher) {
            teacher.hqType = null;
            alert(`HQ Type removed for ${teacher.name}`);
            showAdminOverview(); // Refresh the table
        } else {
            alert('Teacher not found.');
        }
    }
}

// Logout
function logout() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        showLoginForm(); // Assuming showLoginForm is defined elsewhere or will be added
    }
}

// Show Login Form
function showLoginForm() {
    document.querySelector('.container').style.display = 'block';
    dashboard.style.display = 'none';
    loginForm.style.display = 'block';
    loginForm.reset();
}



// Placeholder for other functions if they existed
function editProfile() {
    showEditProfileForm();
}

function viewAssignment(assignmentId) {
    showViewAssignment(assignmentId);
}

function editAssignment(assignmentId) {
    showEditAssignmentForm(assignmentId);
}

function deleteAssignment(assignmentId) {
    if (confirm('Are you sure you want to delete this assignment?')) {
        const initialLength = demoData.assignments.length;
        demoData.assignments = demoData.assignments.filter(a => a.id !== assignmentId);
        if (demoData.assignments.length < initialLength) {
            alert('Assignment deleted successfully!');
            showAssignments();
        } else {
            alert('Assignment not found or already deleted.');
        }
    }
}

function viewStudent(studentId) {
    // This function is not defined in the original file, but is called.
    // It would typically show student details.
    alert(`Viewing student with ID: ${studentId}`);
}

function editStudent(studentId) {
    // This function is not defined in the original file, but is called.
    // It would typically show an edit form for a student.
    alert(`Editing student with ID: ${studentId}`);
}