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
  {
    name: "Arjun Patel",
    age: 35,
    jobRole: "DevOps Engineer",
    salary: 105000,
    city: "Pune",
  },
  {
    name: "Neha Gupta",
    age: 27,
    jobRole: "QA Engineer",
    salary: 65000,
    city: "Noida",
  },
  {
    name: "Vikram Singh",
    age: 31,
    jobRole: "Product Manager",
    salary: 98000,
    city: "Gurgaon",
  },
  {
    name: "Kavya Nair",
    age: 24,
    jobRole: "Frontend Developer",
    salary: 60000,
    city: "Kochi",
  },
  {
    name: "Rohan Das",
    age: 30,
    jobRole: "Backend Developer",
    salary: 82000,
    city: "Kolkata",
  },
  {
    name: "Ananya Kapoor",
    age: 33,
    jobRole: "HR Manager",
    salary: 90000,
    city: "Mumbai",
  },
];

const list = document.getElementById("empList");
let selectedEmp = employees[0];

function renderEmps() {
  list.innerHTML = "";
  employees.forEach((emp, idx) => {
    let li = document.createElement("li");
    li.textContent = `${emp.name}`;
    if (emp === selectedEmp) {
      li.classList.add("active");
    }
    li.addEventListener("click", () => {
      selectedEmp = emp;
      empInfo(emp);
      renderEmps();
    });
    list.appendChild(li);
  });
}

const empinfo = document.getElementById("empInfo");
function empInfo(emp) {
  empinfo.innerHTML = `
            <span>${emp.city}</span>`;
}
renderEmps();
empInfo(employees[0]);

// addEmployeeLogic

let addEmp = document.querySelector(".addEmp");
let formContainer = document.querySelector(".form-container");
let form = document.getElementById("form");

addEmp.addEventListener("click", () => {
  formContainer.style.display = "flex";
});

formContainer.addEventListener("click", (e) => {
  if (e.target.className === "form-container") {
    formContainer.style.display = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  employees.push(data);
  renderEmps();
  form.reset();
  formContainer.style.display = "none";
});
//Delete
//Edit