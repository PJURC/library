// Array to store books
let myLibrary = [];

class Book {
    constructor(author, title, pages, read, index) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
        this.index = index;
    };
};

function AddBook(event) {
    /* Add new book to the list based on user inputs */

    // Prevent default button functionality to submit form
    event.preventDefault();

    // Retrieve form inputs
    let form_inputs = form.elements;
    let new_book = new Book(form_inputs["author"].value, form_inputs["title"].value, form_inputs["pages"].value, form_inputs["read"].value, index);

    // Add book to library array
    myLibrary.push(new_book);

    // Increment index
    index += 1;
};

function UpdateList() {
    /* Update the book list */

    // Remove all displayed books first
    let books = document.getElementsByClassName("book");
    while (books.length > 0) {
        books[0].parentNode.removeChild(books[0]);
    }

    // Reset the index
    index = 0;

    // Add all the books currently in the array
    for (let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].index = index;
        let book_row = book_table.insertRow(i + 1);
        book_row.className = "book";

        // Insert the book information
        book_row.insertCell(0).innerHTML = myLibrary[i].title;
        book_row.insertCell(1).innerHTML = myLibrary[i].author;
        book_row.insertCell(2).innerHTML = myLibrary[i].pages;
        book_row.insertCell(3).innerHTML = myLibrary[i].read;

        // Insert function buttons
        book_row.insertCell(4).innerHTML = `<button id=${index} class='book-button remove-book'>Remove</button>`;
        book_row.insertCell(5).innerHTML = `<button id=${index} class='book-button mark-book'>Change status</button>`;
        
        index += 1;
    };
};

function UpdateButtons() {
    /* Update the object lists of book buttons */
    remove_buttons = document.getElementsByClassName("remove-book");
    status_buttons = document.getElementsByClassName("mark-book");
}

function RemoveBook(id) {
    /* Remove a book */

    // Remove the book corresponding to the button's index
    myLibrary.splice(id, 1);
    UpdateList();
};

function ChangeBookStatus(id) {
    /* Change a book's status */

    if (myLibrary[id].read == "Yes") {
        myLibrary[id].read = "No"
    } else {
        myLibrary[id].read = "Yes"
    };
    UpdateList();
};


// Index for books
let index = 0;

// Form element
const form = document.getElementById("book-form");

// Table element for storing books
const book_table = document.getElementById("book-list");

// Remove buttons
let remove_buttons = [];
let status_buttons = [];

// Submit button events
form.addEventListener('submit', AddBook);
form.addEventListener('submit', UpdateList);

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('book-button')) {
        // Retrieve clicked button ID
        id = e.target.id;

        //Update buttons list
        UpdateButtons();

        // Execute function based on button clicked
        if (e.target.classList.contains('remove-book')) {
            RemoveBook(id);
        } else {
            ChangeBookStatus(id);
        };
    };
});