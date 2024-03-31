document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('changeBackgroundBtn').addEventListener('click', function() {
        fetch('https://api.unsplash.com/photos/random?client_id=huG7zI9YNa-CdXr5A6JBuh20y3Fc5wmUjKLBF8aZo_U')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                const imageUrl = data.urls.full;
                document.body.style.backgroundImage = `url(${imageUrl})`; 
                
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundAttachment = 'fixed';
            })
            .catch(error => console.error('Error fetching image:', error));
    });
});


/*https://api.unsplash.com/photos/random?client_id=huG7zI9YNa-CdXr5A6JBuh20y3Fc5wmUjKLBF8aZo_U*/