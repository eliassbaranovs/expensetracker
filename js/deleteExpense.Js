import { updateTotal } from "./render.js";

// Select the expense list element by ID
const expenseList = document.getElementById("expense-list");

// Delete an expense when "Delete" button is clicked
expenseList.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    const id = e.target.getAttribute("data-id"); // Get expense ID from button
    const tr = document.querySelector(`tr[data-id="${id}"]`); // Get the table row
    tr.remove(); // Remove row from the table

    // Remove the expense from local storage
    let expenses = JSON.parse(localStorage.getItem("expenseList"));
    expenses = expenses.filter((expense) => expense.id != id);
    localStorage.setItem("expenseList", JSON.stringify(expenses));

    // Update the total amount
    updateTotal();
  }
});
