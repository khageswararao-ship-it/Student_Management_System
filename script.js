// ==========================================
// Student Management System - Logic
// ==========================================

let students = JSON.parse(localStorage.getItem("students")) || [];

function showSection(id) {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("addStudent").classList.add("hidden");
    document.getElementById("students").classList.add("hidden");

    document.getElementById(id).classList.remove("hidden");
}

function addStudent() {
    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let course = document.getElementById("course").value.trim();
    let marks = document.getElementById("marks").value.trim();

    if (!name || !roll) {
        alert("Please enter at least Student Name and Roll Number.");
        return;
    }

    let student = {
        name: name,
        roll: roll,
        course: course,
        marks: marks
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";

    loadStudents();
    alert("Student Added Successfully!");
    showSection("students");
}

function loadStudents() {
    let table = document.getElementById("studentTable");
    if (!table) return;

    table.innerHTML = "";

    students.forEach((s, index) => {
        table.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.roll}</td>
                <td>${s.course}</td>
                <td>${s.marks}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    const totalStudentsElem = document.getElementById("totalStudents");
    if (totalStudentsElem) {
        totalStudentsElem.innerText = students.length;
    }
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        loadStudents();
    }
}

function editStudent(index) {
    let currentName = students[index].name;
    let name = prompt("Enter updated Student Name:", currentName);

    if (name !== null && name.trim() !== "") {
        students[index].name = name.trim();
        localStorage.setItem("students", JSON.stringify(students));
        loadStudents();
    }
}

function searchStudent() {
    let value = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(value) ? "" : "none";
    });
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
});
