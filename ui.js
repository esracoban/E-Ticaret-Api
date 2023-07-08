// arayüz işlemleri


const categoryList = document.querySelector('.categories');

const productList = document.querySelector('.products');

const basketList = document.querySelector ('.list');


export function renderCategories(categories){
// kategoriler dizisindeki her bir obje için ekrana kart basma
    categories.slice(0,5).forEach((category) => {
        // div oluşturma
       const categoryDiv = document.createElement('div');
    
       //   dive class ekleme
        categoryDiv.classList.add("category")

        // divin içeriğini belirleme (span ve img ekleddğim kısım)
        categoryDiv.innerHTML = `
        <img src="${category.image}"/>
        <span>${category.name}</span>
        `;

        // elemanı htmldeki categories divine ekleme
        categoryList.appendChild(categoryDiv); 
    });

}



export function renderProducts(products){
    products.slice(1,40).forEach((product) =>{
        

        
        // div oluşturma
        const productCard = document.createElement('div');

        // diva class ataması yapma
        productCard.className ="product";

        // classın içeriğini belirleme
        productCard.innerHTML = `
        <img src=${product.images[0]} />
        <p>${product.title}</p>
        <p>${product.price}</p>
        <div class="product-info">
        <p>${product.price}</p>
        <button id="add-btn" data-id=${product.id}>Sepete Ekle</button>
        </div>
        `;
        
        // elemanı html'e gönderme
        productList.appendChild(productCard);
    } );
}


export function renderBasketItem(product){
   
   const basketItem =  document.createElement("div");

   basketItem.classList.add("list-item");

   basketItem.innerHTML =`
   <img src=${product.images[0]} />
   <h2>${product.title}</h2>
   <h2>${product.category.name}</h2>
   <p>Miktar: ${product.amount}</p>
   <button id="del-button" data-id=${product.id}>Sil</button>
   `;

   basketList.appendChild(basketItem);
}

