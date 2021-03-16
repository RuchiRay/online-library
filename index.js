console.log('this is library')
// to do's
// store in local Storage
// delete book from the list
// add a scroll bar
// constructor
function Book(name, author, genre) {
    this.name = name;
    this.author = author;
    this.genre = genre;
}

// display constructor
function Display() {

}

// add method to display prototype
Display.prototype.add = function (book,count) {
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
Display.prototype.clear = function () {
    let libraryform = document.getElementById('libraryForm');
    libraryform.reset();
}
Display.prototype.validate = function(book){
    if(book.name.length<2||book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}
Display.prototype.show = function(type,message){
 let msg = document.getElementById('msg')
 msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
setTimeout(function(){
    msg.innerHTML = ''
},2000)
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
    console.log(book)
    let display = new Display();
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