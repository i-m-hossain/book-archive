
// number of results and error handling
const resultNumber = (bg, innerText) =>{
    const bookContainer = document.getElementById('book-container');
    bookContainer.textContent=''
    const result = document.getElementById('result-number');
    result.classList.add(bg);
    result.innerText = innerText;
}
//get search input field values
const getSearchInput = async() =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    if(searchInput.value !==''){
        try {
            console.log(url);
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data);
        } catch (error) {
            resultNumber('bg-danger', error)
        }
    }else{
        resultNumber('bg-warning', 'Please type something to search')
    }
 
}
const displaySearchResult = (data) =>{
    console.log(data);
    // Number of results found
    resultNumber('bg-light', data.numFound+' results found')

    // display books
    const books = data.docs
    if(books.length !=0){
        const bookContainer = document.getElementById('book-container');
        bookContainer.textContent=''
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            const noImage = `no.jpg`
            div.innerHTML=`
                    <div class="card h-100">
                    
                        <img src= "${book.cover_i? imageUrl: noImage }" class="card-img-top" alt="...">

                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item"><span class="fw-bold">Title:</span> ${book.title? book.title : 'Not available'}</li>
                            <li class="list-group-item"><span class="fw-bold">Authors:</span> ${book.author_name ? book.author_name : 'Not available'}</li>
                            <li class="list-group-item"><span class="fw-bold">First publish year:</span> ${book.first_publish_year 
                            ? book.first_publish_year :'Not available'} </li>
                        </ul>
                        </div>
                    </div>
            `
            bookContainer.appendChild(div);
        
        });
    }else{
        resultNumber('text-danger', 'No result found')
    }
}