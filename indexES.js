// this is es6 version of project

console.log('hihi')
class Book {
    constructor(name, author, genre) {
        this.name = name;
        this.author = author;
        this.genre = genre;
        
    }
}
class Display {
    add() {
        console.log('adding to ui')
        let item = localStorage.getItem('items')
        let itemObj
        if (item == null) {
            itemObj = []
        }
        else {
            itemObj = JSON.parse(item)
        }
        let uiString = ''
        let tableBoddy = document.getElementById('tableBody')
        itemObj.forEach(function (element,index) {
            uiString += `<tr>
                                <th scope="row">${index+1}</th>
                                <td>${element.name}</td>
                                <td>${element.author}</td>
                                <td>${element.genre}</td>
                                <td> <button type="submit" class="btn btn-primary bg-blue effect pad" id = "${index}" onclick = "deleteBook(this.id)">Delete</button></td>
                             </tr>
                               `

        });
        if (itemObj.length != 0) {
            tableBoddy.innerHTML = uiString
        }
        else {
           tableBoddy.innerHTML = '<h3 class = "blueText">No book added !!</h3>'
        }
       
    }
    clear() {
        let libraryform = document.getElementById('libraryForm');
        libraryform.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
    show(type, message) {
        let msg = document.getElementById('msg')
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                           <strong>Holy guacamole!</strong> ${message}
                           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                           </div>`;
        setTimeout(function () {
            msg.innerHTML = ''
        }, 8000)
    }
}

// add submit event listener to libraryform
let libraryform = document.getElementById('libraryForm');
libraryform.addEventListener('submit', libraryFormSubmit)
function libraryFormSubmit(e) {
    e.preventDefault();
   
    console.log('you have submitted library form')
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fic = document.getElementById('fiction')
    let non_fic = document.getElementById('non-fiction')
    let ref = document.getElementById('references')
    let genre
    if (fic.checked) {
        genre = fic.value
    }
    else if (non_fic.checked) {
        genre = non_fic.value
    }
    else {
        genre = ref.value
    }
    let book = new Book(name, author, genre)
    // let myobj = {
    //     bookName:name,
    //     authorName:author,
    //     genreName:genre,
    //     sno:count
    // }
    console.log(book)
    let item = localStorage.getItem('items')
    let itemObj
    if (item == null) {
        itemObj = []
    }
    else {
        itemObj = JSON.parse(item)
    }
    let display = new Display()
    if (display.validate(book)) {
        itemObj.push(book);
        localStorage.setItem('items', JSON.stringify(itemObj))
        display.add()
        display.clear();
        display.show('success', 'sucess')
    }
    else {
        display.show('danger', 'error')
        // show error
    }

}
// deleting book
function  deleteBook(params) {
    let item = localStorage.getItem('items')
    let itemObj
    if (item == null) {
        itemObj = [];
    }
    else {
        itemObj = JSON.parse(item)
    }
    itemObj.splice(params,1)
    
    localStorage.setItem('items', JSON.stringify(itemObj))
    let disp = new Display()
    disp.add();
}
let dis = new Display()
dis.add();
