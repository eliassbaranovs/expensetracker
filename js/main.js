const expenseForm = document.getElementById("expense-form");

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

 const amount = parseFloat(document.getElementById("amount").value);
 if (amount <= 0) {
   alert("Amount must be greater than 0");
   return;
 }
  let expenseList = {
    id: Date.now(), // Add unique identifier
    amount: document.getElementById("amount").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
  };
  const myExpenses = localStorage.getItem("expenseList")
    ? JSON.parse(localStorage.getItem("expenseList"))
    : [];
  myExpenses.push(expenseList);
  localStorage.setItem("expenseList", JSON.stringify(myExpenses));

  // Append the new expense to the table
  appendExpenseToTable(expenseList);
  updateTotal();
});

const expenseList = document.getElementById("expense-list");
let expenses = JSON.parse(localStorage.getItem("expenseList"));

if (expenses) {
  expenses.forEach((expense) => {
    appendExpenseToTable(expense);
  });
}

function appendExpenseToTable(expense) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", expense.id); // Add unique identifier to the row
  tr.innerHTML = `
    <td>${expense.description}</td>
    <td>${expense.amount}€</td>
    <td>${expense.category}</td>
    <td>${expense.date}</td>
    <td><button class="btn btn-danger">Delete</button></td>
  `;
  expenseList.appendChild(tr);
}

// Delete an expense
expenseList.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    const tr = e.target.parentElement.parentElement;
    const id = tr.getAttribute("data-id");
    tr.remove();

    // Remove the expense from local storage
    let expenses = JSON.parse(localStorage.getItem("expenseList"));
    expenses = expenses.filter((expense) => expense.id != id);
    localStorage.setItem("expenseList", JSON.stringify(expenses));
  }
  updateTotal();
});

// Filter expenses
function filterExpenses(category, date) {
  const expenses = JSON.parse(localStorage.getItem("expenseList"));
  let filteredExpenses = expenses;

  if (category && category !== "All") {
    filteredExpenses = filteredExpenses.filter(expense => expense.category === category);
  }

  if (date) {
    filteredExpenses = filteredExpenses.filter(expense => expense.date === date);
  }

  expenseList.innerHTML = "";
  filteredExpenses.forEach(expense => {
    appendExpenseToTable(expense);
  });
}

// Event listeners for filters
const categoryFilter = document.getElementById("filter-category");
categoryFilter.addEventListener("change", function(e) {
  const category = e.target.value;
  const date = document.getElementById("filter-date").value;
  filterExpenses(category, date);
});

const filterDate = document.getElementById("filter-date");
filterDate.addEventListener("change", function(e) {
  const date = e.target.value;
  const category = document.getElementById("filter-category").value;
  filterExpenses(category, date);
});

// Update total amount
function updateTotal() {
  const totalAmount = document.getElementById("total-amount");
  const expenses = JSON.parse(localStorage.getItem("expenseList"));
  let total = 0;
  if(expenses) {
    expenses.forEach(expense => {
      total += parseFloat(expense.amount);
    })
  }
  totalAmount.innerText = total;
}
updateTotal();