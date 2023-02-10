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
import { getCardsList } from './get-card-list';
const LOCAL_STORAGE_KEY = 'read_key';
const cardEl = document.querySelector('.js_detalis');

function setItemToLocalStorage(item) {
  const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  const currentData = new Date();
  const currentDataString = `${currentData.getDate()}/${
    currentData.getMonth() + 1
  }/${currentData.getFullYear()}`;

  if (!dataLocalStorage) {
    const newData = [{ data: currentDataString, items: [item] }];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    return;
  }

  const dataArr = JSON.parse(dataLocalStorage);

  let goodDataFlag = true;

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
  id: '5454',
  text: 'rtrt',
});
const createCardItem = data => {
  return `<summary>${data}</summary>`;
};

function getItemFromLocalStorage() {
  const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!dataLocalStorage) {
    return;
  }

  const content = JSON.parse(dataLocalStorage);
  const contentArr = content.map(element => {
    const itemsAll = element.item.map(el => {
      return getCardsList(el);
    });
    return ` <details >
    <div class="content">
      ${itemsAll.join('')}
    </div>
    <summary>${el.date}</summary>
  </details>
  `;
  });
  cardEl.insertAdjacentHTML('beforeend', contentArr.join(''));
}
// getItemFromLocalStorage();

// const arr23 = [
//   {
//     date: `21/12/2021`,
//     items: [
//       {
//         name: `lal`,
//         description: '123',
//       },
//       {
//         name: `lal2`,
//         description: '1234',
//       },
//       {
//         name: `lal3`,
//         description: '12345',
//       },
//       {
//         name: `lal4`,
//         description: '123456',
//       },
//     ],
//   },
//   {
//     date: `21/12/2022`,
//     items: [
//       {
//         name: `lal`,
//         description: '123',
//       },
//       {
//         name: `lal2`,
//         description: '1234',
//       },
//       {
//         name: `lal3`,
//         description: '12345',
//       },
//       {
//         name: `lal4`,
//         description: '123456',
//       },
//     ],
//   },
//   {
//     date: `21/12/2023`,
//     items: [
//       {
//         name: `lal`,
//         description: '123',
//       },
//       {
//         name: `lal2`,
//         description: '1234',
//       },
//       {
//         name: `lal3`,
//         description: '12345',
//       },
//       {
//         name: `lal4`,
//         description: '123456',
//       },
//     ],
//   },
//   {
//     date: `21/12/2024`,
//     items: [
//       {
//         name: `lal`,
//         description: '123',
//       },
//       {
//         name: `lal2`,
//         description: '1234',
//       },
//       {
//         name: `lal3`,
//         description: '12345',
//       },
//       {
//         name: `lal4`,
//         description: '123456',
//       },
//     ],
//   },
//   {
//     date: `21/12/2024`,
//     items: [
//       {
//         name: `lal`,
//         description: '123',
//       },
//       {
//         name: `lal2`,
//         description: '1234',
//       },
//       {
//         name: `lal3`,
//         description: '12345',
//       },
//       {
//         name: `lal4`,
//         description: '123456',
//       },
//     ],
//   },
//   {
//     date: `21/12/2024`,
//     items: [
//       {
//         name: `lal`,
//         description: '123',
//       },
//       {
//         name: `lal2`,
//         description: '1234',
//       },
//       {
//         name: `lal3`,
//         description: '12345',
//       },
//       {
//         name: `lal4`,
//         description: '123456',
//       },
//     ],
//   },
// ];

// const macCard = ({ name, description }) => {
//   return `<div>
//     <p>${name}</p>
//     <p>${description}</p>
//     </div>
//     `;
// };

// const x = arr => {
//   const result = arr.map(el => {
//     const itemsAll = el.items.map(el => {
//       return macCard(el);
//     });

//     return ` <details >
//     <div class="content">
//       ${itemsAll.join('')}
//     </div>
//     <summary>${el.date}</summary>
//   </details>
//   `;
//   });
//   cardEl.insertAdjacentHTML('beforeend', result.join(''));
// };

// x(arr23);
