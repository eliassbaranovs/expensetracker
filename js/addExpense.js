import { appendExpenseToTable, updateTotal } from "./render.js";

// Select the form element by ID
const expenseForm = document.getElementById("expense-form");

// Add event listener to handle form submission
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload on form submission

  // Get and validate the amount input
  const amount = parseFloat(document.getElementById("amount").value);
  if (amount <= 0) {
    alert("Amount must be greater than 0");
    return; // Stop if amount is invalid
  }

  // Create a new expense object with form data and unique ID
  let expense = {
    id: Date.now(), // Unique identifier for each expense
    amount: document.getElementById("amount").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
  };

  // Retrieve existing expenses from local storage or initialize as an empty array
  const myExpenses = localStorage.getItem("expenseList")
    ? JSON.parse(localStorage.getItem("expenseList"))
    : [];

  // Add the new expense to the array and update local storage
  myExpenses.push(expense);
  localStorage.setItem("expenseList", JSON.stringify(myExpenses));

  // Display the new expense in the table and update total amount
  appendExpenseToTable(expense);
  updateTotal();
});
