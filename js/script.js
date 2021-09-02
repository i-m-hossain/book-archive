//get search input field values
const getSearchInput = async() =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displaySearchResult(data);
}
const displaySearchResult = (data) =>{
    console.log(data);
}