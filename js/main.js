const expenseForm = document.getElementById("expense-form");

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let expenseList = {
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
  tr.innerHTML = `
    <td>${expense.description}</td>
    <td>${expense.amount}</td>
    <td>${expense.category}</td>
    <td>${expense.date}</td>
    <td><button class="btn btn-danger">Delete</button></td>
  `;
  expenseList.appendChild(tr);
}
