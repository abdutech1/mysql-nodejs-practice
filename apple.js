document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('http://localhost:5000/iphones');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        console.log(response);
        
        const data = await response.json();
        console.log(data);
        
        const container = document.getElementById('products-container');
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const image = document.createElement('img');
            image.src = product.image_url;
            productCard.appendChild(image);

            const title = document.createElement('h2');
            title.textContent = product.product_name;
            productCard.appendChild(title);

            const description = document.createElement('p');
            description.textContent = product.description;
            productCard.appendChild(description);

            const briefDescription = document.createElement('p');
            briefDescription.textContent = `${product.brief_description}`;
            productCard.appendChild(briefDescription);

            const storageRange = document.createElement('p');
            storageRange.textContent = `Storage: ${product.storage_range}`;
            productCard.appendChild(storageRange);

            const priceRange = document.createElement('p');
            priceRange.textContent = `Price: ${product.price_range}`;
            productCard.appendChild(priceRange);

            const buyingLink = document.createElement('a');
            buyingLink.href = product.buying_link;
            buyingLink.textContent = "Buy Now";
            buyingLink.target = "_blank";
            productCard.appendChild(buyingLink);

            const paymentOptions = document.createElement('p');
            paymentOptions.textContent = `Payment Options: ${product.payment_options}`;
            productCard.appendChild(paymentOptions);

            const appleTVPlus = document.createElement('p');
            appleTVPlus.textContent = `Apple TV+: ${product.Apple_TV_plus}`;
            productCard.appendChild(appleTVPlus);

            const appleFitnessPlus = document.createElement('p');
            appleFitnessPlus.textContent = `Apple Fitness+: ${product.Apple_Fitness_plus}`;
            productCard.appendChild(appleFitnessPlus);

            const appleArcade = document.createElement('p');
            appleArcade.textContent = `Apple Arcade: ${product.Apple_Arcade}`;
            productCard.appendChild(appleArcade);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';

            container.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});




