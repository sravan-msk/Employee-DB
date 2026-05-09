const employees = [
  {
    name: "Amit Sharma",
    age: 28,
    jobRole: "Software Engineer",
    salary: 75000,
    city: "Hyderabad",
  },
  {
    name: "Priya Reddy",
    age: 32,
    jobRole: "Project Manager",
    salary: 95000,
    city: "Bangalore",
  },
  {
    name: "Rahul Verma",
    age: 26,
    jobRole: "Data Analyst",
    salary: 68000,
    city: "Delhi",
  },
  {
    name: "Sneha Iyer",
    age: 29,
    jobRole: "UI/UX Designer",
    salary: 72000,
    city: "Chennai",
  },
];

const list = document.getElementById("empList");
const empinfo = document.getElementById("empInfo");

const addEmpBtn = document.querySelector(".addEmp");
const formContainer = document.querySelector(".form-container");
const form = document.getElementById("form");

let selectedEmpIndex = 0;
let editIndex = null;

/* =========================
   RENDER EMPLOYEES
========================= */

function renderEmps() {
  list.innerHTML = "";

  employees.forEach((emp, idx) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${emp.name}</span>

      <div>
        <button class="edit-btn">Edit</button>
        <button class="del-btn">Delete</button>
      </div>
    `;

    // Highlight selected employee
    if (idx === selectedEmpIndex) {
      li.classList.add("active");
    }

    // Select employee
    li.addEventListener("click", () => {
      selectedEmpIndex = idx;
      empInfo(employees[idx]);
      renderEmps();
    });

    // Edit button
    li.querySelector(".edit-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      edit(idx);
    });

    // Delete button
    li.querySelector(".del-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      del(idx);
    });

    list.appendChild(li);
  });
}

/* =========================
   SHOW EMPLOYEE INFO
========================= */

function empInfo(emp) {
  if (!emp) {
    empinfo.innerHTML = `<h2>No Employee Found</h2>`;
    return;
  }

  empinfo.innerHTML = `
    <h2>${emp.name}</h2>
    <p><strong>Age:</strong> ${emp.age}</p>
    <p><strong>Role:</strong> ${emp.jobRole}</p>
    <p><strong>Salary:</strong> ₹${emp.salary}</p>
    <p><strong>City:</strong> ${emp.city}</p>
  `;
}

/* =========================
   OPEN FORM
========================= */

addEmpBtn.addEventListener("click", () => {
  editIndex = null;
  form.reset();

  formContainer.style.display = "flex";
});

/* =========================
   CLOSE FORM
========================= */

formContainer.addEventListener("click", (e) => {
  if (e.target === formContainer) {
    formContainer.style.display = "none";
  }
});

/* =========================
   ADD / UPDATE EMPLOYEE
========================= */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  // Convert number fields
  data.age = Number(data.age);
  data.salary = Number(data.salary);

  // Validation
  if (
    !data.name ||
    !data.age ||
    !data.jobRole ||
    !data.salary ||
    !data.city
  ) {
    alert("Please fill all fields");
    return;
  }

  // EDIT
  if (editIndex !== null) {
    employees[editIndex] = data;

    selectedEmpIndex = editIndex;
  }

  // ADD
  else {
    employees.push(data);

    selectedEmpIndex = employees.length - 1;
  }

  renderEmps();
  empInfo(employees[selectedEmpIndex]);

  form.reset();
  formContainer.style.display = "none";
});

/* =========================
   DELETE EMPLOYEE
========================= */

function del(idx) {
  const confirmDelete = confirm("Delete this employee?");

  if (!confirmDelete) return;

  employees.splice(idx, 1);

  // Edge case: no employees left
  if (employees.length === 0) {
    selectedEmpIndex = -1;

    renderEmps();
    empInfo(null);

    return;
  }

  // Fix selected index
  if (selectedEmpIndex >= employees.length) {
    selectedEmpIndex = employees.length - 1;
  }

  renderEmps();
  empInfo(employees[selectedEmpIndex]);
}

/* =========================
   EDIT EMPLOYEE
========================= */

function edit(idx) {
  const emp = employees[idx];

  editIndex = idx;

  form.name.value = emp.name;
  form.age.value = emp.age;
  form.jobRole.value = emp.jobRole;
  form.salary.value = emp.salary;
  form.city.value = emp.city;

  formContainer.style.display = "flex";
}

/* =========================
   INITIAL LOAD
========================= */

renderEmps();
empInfo(employees[selectedEmpIndex]);