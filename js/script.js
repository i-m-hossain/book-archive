// loader status
const loader = (status) =>{
    const loader = document.getElementById('loader');
    loader.style.display = status
}
// result conatiner status
const result = (status)=>{
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display =status;
}
// number of results and error handling
const resultNumber = (bg, innerText) =>{
    const bookContainer = document.getElementById('book-container');
    console.log(bookContainer);
    bookContainer.textContent=''
    const resultNumber = document.getElementById('result-number');
    resultNumber.classList.add(bg);
    resultNumber.innerText = innerText;
    result('block')
    loader('none');
    
}
//get search input field values
const getSearchInput = () =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value
    loader('block');
    result('none');
    loadSearch(searchText);
    searchInput.value =''
}
const loadSearch = async(searchText) =>{ 
    console.log(searchText);
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    if(searchText !==''){
        try {
            console.log(url);
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data);
        } catch (error) {
            resultNumber('bg-danger', error)
            
        }
    }else{
    
        resultNumber('bg-warning', 'Please type something to search');
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
            loader('none')
            result('block')
        
        });
    }else{
        resultNumber('text-danger', 'No result found')
    }
}