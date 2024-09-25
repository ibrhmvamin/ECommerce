// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.getElementById('searchInput').addEventListener('input', function () {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();
    const productList = document.getElementById('productList');

    if (searchQuery === '') {
        productList.innerHTML = '';
        return;
    }

    fetch(`/Product/Search?search=${encodeURIComponent(searchQuery)}`)
        .then(response => response.json())
        .then(data => {
            productList.innerHTML = ''; 

            let rows = '';
            let rowNumber = 0;

            data.forEach(product => {
                rowNumber += 1;
                rows += `<tr>
                    <th scope="row">${rowNumber}</th>
                    <td>${product.productName}</td>
                    <td>${product.unitPrice}</td>
                    <td>${product.unitsInStock}</td>
                    <td>
                        <a
                            href="/Cart/AddToCart?productId=${product.productId}&search=${encodeURIComponent(searchQuery)}"
                            class="btn btn-xs btn-success">Add To Cart</a>
                    </td>
                </tr>`;
            });

            productList.innerHTML = rows;
        })
        .catch(error => console.error('Error:', error));
});
