// this is es6 version of project
console.log('hihi')
class Book {
    constructor(name, author, genre) {
        this.name = name;
        this.author = author;
        this.genre = genre;
    }
}
class Display{
    add(book, count) {
        console.log('adding to ui')
        let tableBoddy = document.getElementById('tableBody')
        let uiString = ` <tr>
                            <th scope="row">${count}</th>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.genre}</td>
                         </tr>
                           `
        tableBoddy.innerHTML += uiString

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
    show(type,message){
        let msg = document.getElementById('msg')
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                           <strong>Holy guacamole!</strong> ${message}
                           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                           </div>`;
       setTimeout(function(){
           msg.innerHTML = ''
       },8000)
       }
}
// add submit event listener to libraryform
let libraryform = document.getElementById('libraryForm');
libraryform.addEventListener('submit', libraryFormSubmit)
let count = 0;
function libraryFormSubmit(e) {
    e.preventDefault();
    count = count+1;
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
    let display = new Display()
    if(display.validate(book)){
        display.add(book,count)
        display.clear();
        display.show('success','sucess')
    }
    else{
        display.show('danger','error')
        // show error
    }
   
}
