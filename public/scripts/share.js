// Get the post and category slug from the hidden input field
const postSlugInput = document.querySelector('input[name="slug"]');
const categorySlugInput = document.querySelector('input[name="category"]');
const shareBtn = document.getElementById("share-button");
 
 
//Add an event listener to the share button
shareBtn.addEventListener("click", (event) => {

    // Send a POST request to the server to share the post
    fetch(`/${categorySlugInput.value}/${postSlugInput.value}`, {
        method: 'POST',
        headers: {
            // Setting the request header to specify JSON content
            'Content-Type': 'application/json'
        },
        // Sending the post slug as JSON in the request body
        body: JSON.stringify({ slug: postSlugInput.value })
    })
    .then(response => {
        // Update the share count displayed on the client side
        const shareCountElement = document.getElementById("shareCount");
        // Incrementing the share count displayed on the client side
        shareCountElement.innerText = parseInt(shareCountElement.innerText) + 1;
    })
    .catch(error => {
        console.error('Error:', error);
    });
    event.preventDefault();
});