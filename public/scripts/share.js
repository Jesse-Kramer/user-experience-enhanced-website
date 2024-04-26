/* Client sided share function */
 
//Add an event listener to the share button
document.getElementById("share-button").addEventListener("click", async(event) => {
 
    // Get the post and category slug from the hidden input field
    const postSlugInput = document.querySelector('input[name="slug"]');
    const postSlug = postSlugInput.value;
    const categorySlugInput = document.querySelector('input[name="category"]');
    const categorySlug = categorySlugInput.value;
 
    try {
        // Send a POST request to the server to share the post
        const response = await fetch(`/${categorySlug}/${postSlug}`, {
            method: 'POST',
            headers: {
                // Setting the request header to specify JSON content
                'Content-Type': 'application/json'
            },
            // Sending the post slug as JSON in the request body
            body: JSON.stringify({ slug: postSlug })
        });
 
        // If the response is successful
        if (response.ok) {
            // Update the share count displayed on the client side
            const shareCountElement = document.getElementById("shareCount");
            // Incrementing the share count displayed on the client side
            shareCountElement.innerText = parseInt(shareCountElement.innerText) + 1;
            
 
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }

        event.preventDefault();
});