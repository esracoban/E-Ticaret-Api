// Diğer dosyalardan gelenler
import { renderCategories, renderProducts, renderBasketItem } from './ui.js';

// HTML'in yüklenme anını izleme
document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();
  fetchProducts();
});

const baseUrl = 'https://api.escuelajs.co/api/v1';

// Kategori bilgilerini çekme
function fetchCategories() {
  fetch(`${baseUrl}/categories`)
    .then(res => res.json())
    .then(data => {
      renderCategories(data);
    })
    .catch(error => console.log(error));
}

let globalData = [];

// Ürünler bilgisini çekme
async function fetchProducts() {
  try {
    const res = await fetch(`${baseUrl}/products`);
    const data = await res.json();
    globalData = data;
    renderProducts(data);
  } catch (err) {
    console.log(err);
  }
}

// Sepet işlemleri
let basket = [];
let total = 0;

const modal = document.querySelector('.modal-wrapper');
const sepetBtn = document.querySelector('#sepet-btn');
const closeBtn = document.querySelector('#close-btn');
const basketList = document.querySelector('.list');
const modalInfo = document.querySelector('.total-span');

sepetBtn.addEventListener('click', () => {
  modal.classList.add('active');
  addList();
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  basketList.innerHTML = '';
  total = 0;
  modalInfo.textContent = '0';
});

document.addEventListener('click', e => {
  const clickedEl = e.target;
  if (clickedEl.classList.contains('modal-wrapper')) {
    modal.classList.remove('active');
    basketList.innerHTML = '';
    total = 0;
    modalInfo.textContent = '0';
  }
});

document.body.addEventListener('click', findItem);

function findItem(e) {
  const ele = e.target;
  if (ele.id === 'add-btn') {
    const selected = globalData.find(product => product.id == ele.dataset.id);
    if (!selected.amount) {
      selected.amount = 1;
    }
    addToBasket(selected);
  }
  if (ele.id === 'del-button') {
    ele.parentElement.remove();
    const selected = globalData.find(item => item.id == ele.dataset.id);
    deleteItem(selected);
  }
}

function addToBasket(product) {
  const foundItem = basket.find(item => item.id == product.id);
  if (foundItem) {
    foundItem.amount++;
  } else {
    basket.push(product);
  }
}

function addList() {
  basket.forEach(product => {
    renderBasketItem(product);
    total += product.price * product.amount;
  });
  modalInfo.textContent = total;
}

function deleteItem(deletingItem) {
  const filteredData = basket.filter(item => item.id !== deletingItem.id);
  basket = filteredData;
  total -= deletingItem.price * deletingItem.amount;
  modalInfo.textContent = total;
}
