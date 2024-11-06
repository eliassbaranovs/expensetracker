import { appendExpenseToTable } from "./render.js";

// Select the expense list element by ID
const expenseList = document.getElementById("expense-list");

// Function to filter expenses based on category and date
function filterExpenses(category, date) {
  const expenses = JSON.parse(localStorage.getItem("expenseList"));
  let filteredExpenses = expenses;

  // Filter by category if specified
  if (category && category !== "All") {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === category
    );
  }

  // Filter by date if specified
  if (date) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.date === date
    );
  }

  // Clear existing rows in the table and display filtered results
  expenseList.innerHTML = "";
  filteredExpenses.forEach((expense) => {
    appendExpenseToTable(expense);
  });
}

// Event listener for category filter
const categoryFilter = document.getElementById("filter-category");
categoryFilter.addEventListener("change", function (e) {
  const category = e.target.value;
  const date = document.getElementById("filter-date").value;
  filterExpenses(category, date); // Filter expenses when category changes
});

// Event listener for date filter
const filterDate = document.getElementById("filter-date");
filterDate.addEventListener("change", function (e) {
  const date = e.target.value;
  const category = document.getElementById("filter-category").value;
  filterExpenses(category, date); // Filter expenses when date changes
});
