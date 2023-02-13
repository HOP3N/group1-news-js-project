const cardEl = document.querySelector('.js_detalis');
const LOCAL_STORAGE_KEY = 'read_key'; //клю для локалстореджа
//Проверка наличия данных в локалсторедж и запись новых данных
export function setItemToLocalStorage(item) {
  const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  //Конвертация формата даты в вид 00/00/00
  const currentData = new Date();
  const currentDataString = `${currentData.getDate()}/${
    currentData.getMonth() + 1
  }/${currentData.getFullYear()}`; // *******

  if (!dataLocalStorage) {
    const newData = [{ data: currentDataString, items: [item] }];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    return;
  }

  const dataArr = JSON.parse(dataLocalStorage);

  let goodDataFlag = true; //флаг проверки записи в локалсторедж

  const newDataArr = dataArr.map(elItem => {
    if (elItem.data === currentDataString) {
      goodDataFlag = false;
      elItem.items.push(item);
      return elItem;
    }
    return elItem;
  });

  if (goodDataFlag) {
    newDataArr.push({ data: currentDataString, items: [item] });
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDataArr));
}
setItemToLocalStorage({
  // id: '5454',
  // text: 'rtrt',
});
// const createCardItem = data => {
//   return `<summary>${data}</summary>`;
//   const macCard = ({ id, text }) => {
//     return `<div>
//     <p>${id}</p>
//     <p>${text}</p>
//     </div>
//     `;
//   };
// };
// *********************************
// Выемка данных из локалстореджа
function getItemFromLocalStorage() {
  const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!dataLocalStorage) {
    return;
  }

  const content = JSON.parse(dataLocalStorage);
  const contentArr = content.map(element => {
    const itemsAll = element.items.map(el => {
      // console.log(el);///*******Вставка функция генерации карточек */
      // return createCardItem(el);
    });
    // ******разметка блока для секции read
    return ` <details >
     <summary>${element.data}</summary>
    <div class="content">
      ${itemsAll.join('')}
    </div>
  </details>
  `;
  });
  cardEl.insertAdjacentHTML('beforeend', contentArr.join(''));
}
getItemFromLocalStorage();

// *************TEST************************************************//
// при открытии следующей закрывается предыдущая
// const details = document.querySelectorAll('details');
// for (i = 0; i < details.length; i++) {
//   details[i].addEventListener('toggle', accordion);
// }
// function accordion(event) {
//   if (!event.target.open) return;
//   var details = event.target.parentNode.children;
//   for (i = 0; i < details.length; i++) {
//     if (
//       details[i].tagName != 'DETAILS' ||
//       !details[i].hasAttribute('open') ||
//       event.target == details[i]
//     ) {
//       continue;
//     }
//     details[i].removeAttribute('open');
//   }
// }

// ********************************************************
///
