
document.addEventListener('DOMContentLoaded', function () {
    

    const carouselContainer = document.getElementById('carousel')

    const previousButton = document.getElementById("previous-button");
    const nextButton = document.getElementById("next-button");

    let currentlyDisplayedProductNumber = 0;

    // Fetch JSON data (replace 'your-json-url' with the actual URL)
    fetch('./data/products.json')
        .then(response => response.json())
        .then(data => {

            const activeProducts = data.filter(product => product.active);
            // Map only active products to carousel items
            const productElements = activeProducts.map((product, i) => {
                const item = CarouselItem(product);
                item.classList.add('is-hidden');
                carouselContainer.appendChild(item);
                return item;
            });


            productElements[currentlyDisplayedProductNumber].classList.remove("is-hidden");

            nextButton.addEventListener("click", () => {
                productElements[currentlyDisplayedProductNumber].classList.add("is-hidden");
                currentlyDisplayedProductNumber = (currentlyDisplayedProductNumber + 1) % productElements.length;
                productElements[currentlyDisplayedProductNumber].classList.remove("is-hidden");
            });

            previousButton.addEventListener("click", () => {
                productElements[currentlyDisplayedProductNumber].classList.add("is-hidden");
                currentlyDisplayedProductNumber = (currentlyDisplayedProductNumber - 1 + productElements.length) % productElements.length;
                productElements[currentlyDisplayedProductNumber].classList.remove("is-hidden");
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
    
});



function CarouselItem({
    title, 
    imageUrl, 
    price, 
    paymentLink, 
    description, 
    active, 
    highlighted_features
}){

    const leftHandItem = document.createElement("div");
    leftHandItem.classList.add('column','is-half')
   
    leftHandItem.appendChild(_CarouselImage(imageUrl))
    
    
    const rightHandItem = document.createElement("div");
    rightHandItem.classList.add('column')
    rightHandItem.appendChild(_CarouselText({
        description,
        title,
        highlighted_features
    }))
    rightHandItem.appendChild(_CarouselButton({paymentLink}))

    const item = document.createElement('div')
    item.classList.add('columns')
    item.appendChild(leftHandItem)
    item.appendChild(rightHandItem)

    return item
}

function _CarouselImage(imageUrl){
    const imageContainer = document.createElement('figure');
    const imageEl = document.createElement('img');
    imageEl.src = imageUrl

    imageContainer.classList.add('image','is-4by5')
    imageContainer.appendChild(imageEl)

    imageEl.style.maxHeight = '80%'
    imageEl.style.maxWidth = '80%'

    return imageContainer
}


function _CarouselText({ title, description, highlighted_features}){

    const textContainer = document.createElement('div');
    
    // title
    const titleEl = document.createElement('h3')
    titleEl.innerText = title
    titleEl.classList.add("has-text-weight-bold")
    textContainer.appendChild(titleEl)

    // description
    const descriptionEl = document.createElement('p')
    descriptionEl.innerText = description
    textContainer.appendChild(descriptionEl)
    const PRODUCT_FEATURES_TEXT = "Product Features"

    const featureHeading = document.createElement('h4')
    featureHeading.classList.add("has-text-weight-semibold")
    featureHeading.innerText = PRODUCT_FEATURES_TEXT
    featureHeading.style.marginTop = '20px';
    
    textContainer.appendChild(featureHeading)

    const featuresListNode = document.createElement('ul')

    for (const feature of highlighted_features){
        const featureNode = document.createElement('li')
        const paragraphNode = document.createElement('p');
        featureNode.appendChild(paragraphNode);
        featureNode.style.listStyleType = 'disc'; 
        featureNode.classList
        paragraphNode.innerText = feature
        featuresListNode.appendChild(featureNode)

    }

    textContainer.appendChild(featuresListNode)




    return textContainer
}

function _CarouselButton({paymentLink}) {
    console.log(paymentLink)
    const buyButton = document.createElement('a')
    buyButton.classList.add('button', 'is-dark')
    buyButton.style.marginTop = '40px';
    buyButton.innerText = "Buy Now"
    buyButton.href = paymentLink

    return buyButton
}
