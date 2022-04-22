Display();

// contructor to add books
function book(bName, bAuthor, bType) {
    this.name = bName;
    this.author = bAuthor;
    this.type = bType;
};

function rmBook(index) {
    let myBooks = localStorage.getItem('books');
    let booksObj = JSON.parse(myBooks);
    let rmDisplay = new Display;
    if (booksObj.length == 1) {
        booksObj.splice(index, 1);
        window.location.reload();
    } else {
        booksObj.splice(index, 1);
    };
    localStorage.setItem('books', JSON.stringify(booksObj));
    Display();
};

// constructor to display books
function Display() {
    let tableBody = document.getElementById('tableBody');
    let emptyTb = document.getElementById('emptyTb');
    let books = localStorage.getItem('books');
    if (books == null) {
        allBooks = [];
    } else {
        allBooks = JSON.parse(books);
    };
    let uiHTML = '';
    if (allBooks.length == 0) {
        uiHTML = `<div class="alert alert-dark" role="alert">
                    <h4 class="alert-heading">Hey There!</h4>
                    <p>It seems that there are no books in your library right now. Please add some books if your library to see your books here. You can use the form above to add books which are in your library.</p>
                    <hr>
                    <p class="mb-0">We hope that you like our library management system!</p>
                </div>`;
        emptyTb.innerHTML = uiHTML;
    } else {
        allBooks.forEach(function (element, index) {
            uiHTML += `<tr>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td><button id="${index}" type="button" onclick='rmBook(this.id)' class="btn btn-outline-dark">Delete</button></td>
                        </tr>`;
            emp = '';
            emptyTb.innerHTML = '';
            tableBody.innerHTML = uiHTML;
        });
    };
};

// methods to add books in display
Display.prototype.add = function (book) {
    let books = localStorage.getItem('books');
    if (books == null) {
        allBooks = []
    } else {
        allBooks = JSON.parse(books);
    };
    let bookObj = {
        name: book.name,
        author: book.author,
        type: book.type
    };
    allBooks.push(bookObj);
    localStorage.setItem('books', JSON.stringify(allBooks));
    Display();
};

// method to clear the form after book is added
Display.prototype.clear = function () {
    let addBook = document.getElementById('addBook');
    addBook.reset();
};

// method to show alert according to type and messege you want
Display.prototype.show = function (type, messege) {
    let messegeHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Hey There!</strong> ${messege}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
    let messegeLoc = document.getElementById('messege');
    messegeLoc.innerHTML = messegeHTML;
    setTimeout(() => {
        messegeLoc.innerHTML = '';
    }, 4000);
};

// method to validate that form is not invalid or empty
Display.prototype.validate = function (newBook) {
    if (newBook.name.length < 3 || newBook.author.length < 3) {
        return false;
    } else {
        return true;
    };
};

// adding event listener in form to add book
let addBook = document.getElementById('addBook');
addBook.addEventListener('submit', submitBook);

// function to submit the book by form to display
function submitBook(form) {
    form.preventDefault();
    let bName = document.getElementById('bookName').value;
    let bAuthor = document.getElementById('authorName').value;
    let bType;

    // getting all radio buttons
    let programming = document.getElementById('programming');
    let cyberSecurity = document.getElementById('cyberSecurity');
    let operatingSystems = document.getElementById('operatingSystems');

    if (programming.checked) {
        bType = programming.value;
    }
    else if (cyberSecurity.checked) {
        bType = cyberSecurity.value;
    }
    else if (operatingSystems.checked) {
        bType = operatingSystems.value;
    };

    let newBook = new book(bName, bAuthor, bType);
    let display = new Display();

    if (display.validate(newBook) == false) {
        display.show('warning', 'Please fill all the fields correctly to continue.');
    } else {
        display.show('success', 'Your book has been added successfully.');
        display.add(newBook);
        display.clear();
    };
};