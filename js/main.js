// Select the form element by ID
const expenseForm = document.getElementById("expense-form");


//////////////////////////////////////////////
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
  let expenseList = {
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
  myExpenses.push(expenseList);
  localStorage.setItem("expenseList", JSON.stringify(myExpenses));

  // Display the new expense in the table and update total amount
  appendExpenseToTable(expenseList);
  updateTotal();
});

// Select the table body where expenses will be listed
const expenseList = document.getElementById("expense-list");
// Load and display saved expenses on page load
let expenses = JSON.parse(localStorage.getItem("expenseList"));
if (expenses) {
  expenses.forEach((expense) => {
    appendExpenseToTable(expense);
  });
}
////////////////////////////////////////////////////
// Function to add an expense as a row in the table
function appendExpenseToTable(expense) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", expense.id); // Set unique ID for each row
  tr.innerHTML = `
    <td>${expense.description}</td>
    <td>${expense.amount}€</td>
    <td>${expense.category}</td>
    <td>${expense.date}</td>
    <td><button class="btn btn-danger">Delete</button></td>
  `;
  expenseList.appendChild(tr); // Append row to the table body
}

// Delete an expense when "Delete" button is clicked
expenseList.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    const tr = e.target.parentElement.parentElement; // Get the table row
    const id = tr.getAttribute("data-id"); // Get expense ID
    tr.remove(); // Remove row from the table

    // Remove the expense from local storage
    let expenses = JSON.parse(localStorage.getItem("expenseList"));
    expenses = expenses.filter((expense) => expense.id != id);
    localStorage.setItem("expenseList", JSON.stringify(expenses));
  }
  updateTotal(); // Recalculate and display total
});

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

// Function to calculate and display the total amount of all expenses
function updateTotal() {
  const totalAmount = document.getElementById("total-amount");
  const expenses = JSON.parse(localStorage.getItem("expenseList"));
  let total = 0;

  // Sum up all expense amounts if they exist
  if (expenses) {
    expenses.forEach((expense) => {
      total += parseFloat(expense.amount);
    });
  }
  // Display the total amount
  totalAmount.innerText = total;
}
updateTotal(); // Initial call to set the total amount on page load
