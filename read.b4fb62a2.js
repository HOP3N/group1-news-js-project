var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,a.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a),a.register("jpmz5",(function(e,t){var n=a("e0clc"),i=a("gL0AB"),r=a("5Xlu9"),d=a("cA4nz"),o=a("kbCdL"),s=a("1JhkZ");const l=document.getElementById("cards"),c="https://api.nytimes.com/svc",p="SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX",u="/mostpopular/v2/viewed/1.json?api-key=";(0,d.getPopular)();let f=null;fetch(`${c}${u}${p}`).then((e=>e.json())).then((({results:e})=>{f=e;let t="";e?(e.forEach((e=>{const a=e.media.length?e.media[0]["media-metadata"][2].url:"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",i=e.media.length?e.media[0].caption:"News";t+=`<li class = "card__item" data-id = "${e.uri}">\n    <div class="card__wrapper">\n      <div class="card__thumb">\n        <img class="card__img" src = "${a}" alt = "${i}">\n        <p class="card__news-category">${e.section}</p>\n        \n        <button class="favorite-btn" type="button" data-action="favorite-btn">Add to favorite</button>\n      </div>\n      <h3 class="card__news-title">${e.title}</h3>\n      <p class="card__news-description">${e.abstract}</p>\n      <div class="card__additional-info-container">\n        <p class="card__datetime">${(0,n.default)(e.published_date,"dd/mm/yyyy")}</p>\n        <a class="card__link" href="${e.url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>\n      </div>\n      \n    </div>\n</li>`})),l.classList.remove("notFound")):(t="Sorry, we didn't find any news!",l.classList.add("notFound")),l.innerHTML=t,(0,s.getWeatherCard)(),(0,r.setFavoritesOnLoad)()})),l.addEventListener("click",i.addToFavorite),l.addEventListener("click",(function(e){if("card__link"===e.target.className){let t=e.target.parentElement.parentElement.parentElement.dataset.id;const n=f.find((e=>e.uri===t));(0,o.setItemToLocalStorage)(n)}}))}));
//# sourceMappingURL=read.b4fb62a2.js.map
