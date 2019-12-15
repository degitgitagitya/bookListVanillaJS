// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.querySelector("#book-list");

  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create Div
  const div = document.createElement("div");
  // Add class
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector(".container");
  // Get form
  const form = document.querySelector("#book-form");
  // Insert
  container.insertBefore(div, form);

  // Timeout after 3 secs
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear Field
UI.prototype.clearField = function() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

// Event Listener for add book
document.querySelector("#book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show sucess
    ui.showAlert("Book Added!", "success");

    // Clear field
    ui.clearField();
  }

  e.preventDefault();
});

// Event listener for delete book
document.querySelector("#book-list").addEventListener("click", function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});
