!function(){var t=document.getElementById("cards");fetch("https://api.nytimes.com/svc/news/v3/content/nyt/business.json?api-key=".concat("SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX")).then((function(t){return t.json()})).then((function(e){var n=e.results;console.log(n);var a="";n?(n.forEach((function(t){a+='\n                    <div class = "news-item" data-id = "'.concat(t.title,'">\n                        <div class = "news-img">\n                            <img src = "').concat(t.multimedia[2].url,'" alt = "').concat(t.multimedia[2].caption,'">\n                        </div>\n                        <div>').concat(t.section,'</div>\n                                                <div>Already read &#x2714</div>\n\n                        <div class = "news-buttons">\n                            <button type="button" data-action="favorite-btn" class="favorite-btn">Add to favorite</button>\n                        </div>\n                        <div class = "news-name">\n                            <h3>').concat(t.title,"</h3>\n                            <p>").concat(t.abstract,"</p>\n                        </div>\n\n                            <p>").concat(t.published_date,'</p>\n        <a href="').concat(t.url,'" target="_blank" rel="noopener noreferrer nofollow">Read more</a>\n\n                    </div>\n                ')})),t.classList.remove("notFound")):(a="Sorry, we didn't find any news!",t.classList.add("notFound")),t.innerHTML=a})),t.addEventListener("click",(function(t){if("favorite-btn"===t.target.dataset.action){var e=t.target.parentElement.parentElement.dataset.id,n=JSON.parse(localStorage.getItem("favorites"))||[];if(t.target.classList.contains("removeFavorite-btn")){var a=n.filter((function(t){return t!==e}));localStorage.setItem("favorites",JSON.stringify(a)),t.target.textContent="Add to favorites",t.target.classList.remove("removeFavorite-btn")}else n.push(e),localStorage.setItem("favorites",JSON.stringify(n)),t.target.textContent="Remove from favorites",t.target.classList.add("removeFavorite-btn")}}))}();
//# sourceMappingURL=cards.025edf35.js.map