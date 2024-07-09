document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.querySelector('.products');

    const products = [
        { name: 'Energia renovable', price: 60.00, image: '/images/icono-1.png' },
        { name: 'Elictricidad', price: 60.00, image: 'images/icono-2.png' }
        // Add more initial products if needed
    ];

    const renderProducts = () => {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="delete-btn">Eliminar</button>
            `;
            productItem.querySelector('.delete-btn').addEventListener('click', () => {
                const index = products.indexOf(product);
                products.splice(index, 1);
                renderProducts();
            });
            productList.appendChild(productItem);
        });
    };

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const image = document.getElementById('image').value;

        if (name && !isNaN(price) && image) {
            products.push({ name, price, image });
            renderProducts();
            productForm.reset();
        } else {
            alert('Agregaste el Producto exitosamente.');
        }
    });

    renderProducts();
});
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.querySelector('.products');
    const apiUrl = 'http://localhost:3000/products'; // Asegúrate de que este sea el URL correcto de tu json-server

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch(apiUrl);
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Render products to the DOM
    const renderProducts = (products) => {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="delete-btn" data-id="${product.id}">Eliminar</button>
            `;
            productItem.querySelector('.delete-btn').addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await deleteProduct(id);
                fetchProducts();
            });
            productList.appendChild(productItem);
        });
    };

    // agregamos producto
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const image = document.getElementById('image').value;

        if (name && !isNaN(price) && image) {
            await addProduct({ name, price, image });
            fetchProducts();
            productForm.reset();
        } else {
            alert('.Agregaste el producto exitosamente');
        }
    });

    const addProduct = async (product) => {
        try {
            await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    const deleteProduct = async (id) => {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    
    fetchProducts();
});
