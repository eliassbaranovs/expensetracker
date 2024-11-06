import { appendExpenseToTable, updateTotal } from "./render.js";
import "./addExpense.js";
import "./deleteExpense.Js";
import "./filterExpense.js";

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Load and display saved expenses on page load
  let expenses = JSON.parse(localStorage.getItem("expenseList"));
  if (expenses) {
    expenses.forEach((expense) => {
      appendExpenseToTable(expense);
    });
  }
  updateTotal(); // Initial call to set the total amount on page load
});
