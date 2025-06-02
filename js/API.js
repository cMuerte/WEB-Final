document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=pub_be0ab0feaf2640a1bc5af6d11f0653c6&q=fitness`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById("news-container");
        if (data.results && data.results.length > 0) {
            data.results.forEach(article => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
            <div class="card h-100">
                ${article.image_url ? `<img src="${article.image_url}" class="card-img-top" alt="news image">` : ''}
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description || ''}</p>
                    <a href="${article.link}"><button>Read more</button></a>
                </div>
            </div>`;
            newsContainer.appendChild(card);
        });
        } else {
            newsContainer.innerHTML = "<p>No fitness news available at the moment.</p>";
        }
    })
    .catch(error => {
        console.error("Error fetching news:", error);
        document.getElementById("news-container").innerHTML = "<p>Error loading news.</p>";
    });
});
