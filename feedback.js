
document.addEventListener('DOMContentLoaded', () => {
    const productInput = document.getElementById('productInput');
    const reviewInput = document.getElementById('reviewInput');
    const addFeedbackBtn = document.getElementById('addFeedbackBtn');
    const productsList = document.getElementById('products');
    const productFeedbacks = document.getElementById('productFeedbacks');

    addFeedbackBtn.addEventListener('click', () => {
        const productName = productInput.value.trim();
        const review = reviewInput.value.trim();

        if (productName && review) {
            addFeedbackStorage(productName, review);
            productInput.value = '';
            reviewInput.value = '';
        } else {
            alert('Нельзя отправлять пустое поле');
        }
    });

    productsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const productName = event.target.textContent;
            showFeedbacks(productName);
        }
    });

    productFeedbacks.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const reviewText = event.target.getAttribute('data-review');
            const productName = event.target.getAttribute('data-product');
            deleteFeedbackStorage(productName, reviewText);
            showFeedbacks(productName);
        }
    });

    loadProducts();
});

function addFeedbackStorage(product, review) {
    let products = JSON.parse(localStorage.getItem('products')) || {};
    if (!products[product]) {
        products[product] = [];
    }
    products[product].push(review);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

function deleteFeedbackStorage(product, review) {
    let products = JSON.parse(localStorage.getItem('products')) || {};
    if (products[product]) {
        products[product] = products[product].filter(r => r !== review);
        localStorage.setItem('products', JSON.stringify(products));
    }
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || {};
    const productsList = document.getElementById('products');
    productsList.innerHTML = '';

    for (const product in products) {
        const li = document.createElement('li');
        li.textContent = product;
        productsList.appendChild(li);
    }
}

function showFeedbacks(product) {
    const products = JSON.parse(localStorage.getItem('products')) || {};
    const reviews = products[product] || [];

    const productReviews = document.getElementById('productFeedbacks');
    productFeedbacks.innerHTML = '';

    if (reviews.length === 0) {
        const noFeedback = document.createElement('p');
        noFeedback.textContent = 'Отзывов нет.';
        productFeedbacks.appendChild(noFeedback);
    } else {
        reviews.forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.textContent = review;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete-button');
            deleteButton.setAttribute('data-product', product);
            deleteButton.setAttribute('data-review', review);
            reviewDiv.appendChild(deleteButton);
            productReviews.appendChild(reviewDiv);
        });
    }
}