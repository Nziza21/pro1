document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the gallery container
    const gallery = document.getElementById("gallery");
  
    // Define the API URL for cat images
    const apiUrl = "http://localhost:3000/cats";
  
    let catData; // To store the cat data
  
    // Function to display cat images
    function displayCatImages(cats) {
      gallery.innerHTML = ""; // Clear the gallery
  
      cats.forEach((cat) => {
        const catContainer = document.createElement("div");
        catContainer.className = "cat-container";
  
        const catImage = document.createElement("img");
        catImage.className = "cat-image";
        catImage.src = cat.url;
        catImage.alt = `Cat Image ID: ${cat.id}`;
  
        // Create and initialize a "likes" counter
        const likeCounter = document.createElement("p");
        likeCounter.textContent = `Likes: ${cat.likes}`;
        likeCounter.className = "cat-likes";
  
        // Create a "like" button with a transparent heart symbol
        const likeButton = document.createElement("button");
        likeButton.innerHTML = "&hearts;"; // Insert a heart symbol entity
        likeButton.className = "like-button";
        likeButton.addEventListener("click", () => {
          // Increase the likes count when the button is clicked
          cat.likes++;
          likeCounter.textContent = `Likes: ${cat.likes}`;
        });
  
        // Append the cat elements to the container
        catContainer.appendChild(catImage);
        catContainer.appendChild(likeButton);
        catContainer.appendChild(likeCounter);
  
        // Append the cat container to the gallery
        gallery.appendChild(catContainer);
      });
    }
  
    // Fetch cat images from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        catData = data; // Store the cat data for filtering
  
        // Display all cat images
        displayCatImages(catData);
      })
      .catch((error) => {
        console.error("Error fetching cat images:", error);
      });
  
    // Get references to filter elements
    const filterWidthInput = document.getElementById("filter-width");
    const filterHeightInput = document.getElementById("filter-height");
    const applyFiltersButton = document.getElementById("apply-filters");
  
    // Add an event listener to the "Apply Filters" button
    applyFiltersButton.addEventListener("click", () => {
      // Get filter values from inputs
      const minWidth = parseInt(filterWidthInput.value, 10);
      const minHeight = parseInt(filterHeightInput.value, 10);
  
      // Filter cat images based on width and height
      const filteredCats = catData.filter((cat) => {
        return cat.width >= minWidth && cat.height >= minHeight;
      });
  
      // Display filtered cat images
      displayCatImages(filteredCats);
    });
  });
