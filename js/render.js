// Select the expense list element by ID
const expenseList = document.getElementById("expense-list");

// Function to add an expense as a row in the table
export function appendExpenseToTable(expense) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", expense.id); // Set unique ID for each row
  tr.innerHTML = `
    <td>${expense.description}</td>
    <td>${expense.amount}€</td>
    <td>${expense.category}</td>
    <td>${expense.date}</td>
    <td><button class="btn btn-danger" data-id="${expense.id}">Delete</button></td>
  `;
  expenseList.appendChild(tr); // Append row to the table body
}

// Function to calculate and display the total amount of all expenses
export function updateTotal() {
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
