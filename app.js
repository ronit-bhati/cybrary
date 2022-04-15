// contructor to add books
function book(bName, bAuthor, bType) {
    this.name = bName;
    this.author = bAuthor;
    this.type = bType;
};

// constructor to display books
function Display() {

};

// adding methods to display's prototypes
Display.prototype.add = function (book) {
    let tableBody = document.getElementById('tableBody');
    let uiHTML = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>`;
    tableBody.innerHTML += uiHTML;
};

Display.prototype.clear = function () {
    let addBook = document.getElementById('addBook');
    addBook.reset();
};

// adding event listener in form to add book
let addBook = document.getElementById('addBook');
addBook.addEventListener('submit', submitBook);

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
    display.add(newBook);
    display.clear();
};