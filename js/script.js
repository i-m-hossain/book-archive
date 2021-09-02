
//get search input field values
const getSearchInput = async() =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    try {
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data);
    } catch (error) {
       console.log(error);
    }
 
}
const displaySearchResult = (data) =>{
    console.log(data);
    // Number of results found
    const result = document.getElementById('result-number');
    result.classList.add('bg-light');
    result.innerText =`${data.numFound} results found`

    // display books
    const books = data.docs
    if(books.length !=0){
        const bookContainer = document.getElementById('book-container');
        bookContainer.textContent=''
        books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
                <div class="card h-100">
                   
                    <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    
                    <div class="card-body">
                        <h5 class="card-title"><span class="fw-bold">Title:</span> ${book.title? book.title : 'Not available'}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="fw-bold">Authors:</span> ${book.author_name ? book.author_name : 'Not available'}</li>
                        <li class="list-group-item"><span class="fw-bold">First publish year:</span> ${book.first_publish_year 
                        ? book.first_publish_year :''} </li>
                    </ul>
                </div>
        `
        bookContainer.appendChild(div);
        
        });
    }else{
        const bookContainer = document.getElementById('book-container');
        bookContainer.textContent=''
        const result = document.getElementById('result-number');
        result.innerText =`No result found`
    }
}