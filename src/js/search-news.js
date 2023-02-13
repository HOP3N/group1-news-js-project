// 'use strict';

// const form = `
//     <form class="form">
//         <input type="text />
//         <button
//             class="form__button"
//             type="submit'
//         >
//             Search
//         </button>
//     </form>
// `;

// document.body.insertAdjacentHTML("afterbegin", form);
// console.log('hello');

// function createQuery(
//     searchQuery = '',
//     category = '',
//     date = '',
// ) {
//     let query = ''
    
//     if (searchQuery) {
//         const separator = query ? '&' : '?'
//         query += `${separator}q=${searchQuery}`;
//     }

//     if (category) {
//         const separator = query ? '&' : '?';
//         query += `${separator}category=${category}`;
//     }

//     if (date) {
//         const separator = query ? '&' : '?';

//         query += `${separator}date=${date}`;
//     }

//     console.log(query, 'final query');
// }

// const queryString = createQuery('total')

// const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
// const apiKey = '&api-key=SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX'

// /* 

// */

// function getSearchResults(searchQuery1 = '') {
//     return fetch(`${BASE_URL}${searchQuery1}${apiKey}`)
// }


// getSearchResults("?q=alien").then(data => data.json()).then(console.log);