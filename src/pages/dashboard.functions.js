import { storage } from '../core/utils'

function getExcelKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function getAllTableRecords(sortType = 'date') {
  const keys = getExcelKeys()

  if (!keys.length) {
    return '<h1>Вы пока не создали ни одной таблицы.</h1>'
  }


  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
    ${keys
      .sort(sortBy(sortType))
      .map(toHTML)
      .join('')}
  </ul>
  `
}

function sortBy(sortType) {
  return (a, b) => {
    if (sortType === 'date') {
      const dateA = +a.split(':')[1]
      const dateB = +b.split(':')[1]
      return dateA - dateB
    } else {
      const titleA = storage(a).excelTitle
      const titleB = storage(b).excelTitle
      return titleA.localeCompare(titleB)
    }
  }
}

function toHTML(key) {
  const tableName = storage(key).excelTitle
  const id = key.split(':')[1]
  const dateObj = new Date(+storage(key).openDate)
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getFullYear()).slice(-2);
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `
    <li class="db__record">
      <a href="#excel/${id}">${tableName}</a>
      <div class="openTime">
        <strong>${day}.${month}.${year}.</strong>
        <strong>${hours}:${minutes}</strong>
      </div>
    </li>
    `
}
