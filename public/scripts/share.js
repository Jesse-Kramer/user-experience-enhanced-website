function shareButton() {
    const shareUrl = currentUrl; // Assuming currentUrl is defined elsewhere

    // Check if the share API is supported by the browser
    if (navigator.share) {
        // Use the Share API
        navigator.share({ url: shareUrl })
            .then(() => console.log('Link shared successfully'))
            .catch(error => console.error('Error sharing link:', error));
    } else { // UGLY FIX FOR NOW, BUT IT WORKS. (Mostly)
        console.error('Sharing not supported');
        // Fallback behavior for browsers that do not support the Share API

        // Create a temporary input element for copying the link
        const tempInput = document.createElement('input');
        tempInput.setAttribute('type', 'text');
        tempInput.setAttribute('value', shareUrl);
        tempInput.setAttribute('readonly', '');

        // Append the input element to the document body
        document.body.appendChild(tempInput);

        // Select the content of the input element
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices

        // Copy the URL to the clipboard
        document.execCommand('copy');

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        alert("Link is gekopieerd.")
    }
}

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