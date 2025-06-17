// Wait for the page to finish loading before running the script
document.addEventListener("DOMContentLoaded", () => {

    // Get references to HTML elements
    const searchButton = document.getElementById("searchButton"); // Search button
    const clearButton = document.getElementById("clearButton");   // Reset/Clear button
    const searchInput = document.getElementById("searchInput");   // Input field for keyword
    const resultsDiv = document.getElementById("results");        // Area to display results

    let travelData = []; // This will hold the travel data fetched from the JSON file

    // Fetch data from the JSON file
    fetch("travel_recommendation_api.json")
        .then(response => response.json()) // Convert the response to JSON format
        .then(data => {
            travelData = data.places; // Save the 'places' array into our variable
            console.log("Travel data loaded", travelData); // Log data for confirmation
        })
        .catch(error => console.error("Error loading data:", error)); // Handle errors if file fails to load

    // When the Search button is clicked
    searchButton.addEventListener("click", () => {
        const keyword = searchInput.value.toLowerCase().trim(); // Get user input and convert to lowercase
        let matchedPlaces = []; // Create an empty array for matched places

        // Check the keyword and filter based on it
        if (keyword.includes("beach")) {
            matchedPlaces = travelData.filter(place => place.tags.includes("beach"));
        } else if (keyword.includes("temple")) {
            matchedPlaces = travelData.filter(place => place.tags.includes("temple"));
        } else if (keyword.includes("country")) {
            matchedPlaces = travelData.filter(place => place.tags.includes("country"));
        } else {
            // If keyword doesn't match anything, show a message
            resultsDiv.innerHTML = `<p>No results found for "${keyword}".</p>`;
            return; // Stop the function here
        }

        // Display up to 2 matching places
        displayResults(matchedPlaces.slice(0, 2));
    });

    // When the Clear button is clicked
    clearButton.addEventListener("click", () => { 
        searchInput.value = "";      // Clear the input field
        resultsDiv.innerHTML = "";   // Clear the displayed results
    });

    // Function to show places in the results section
    function displayResults(places) {
        resultsDiv.innerHTML = ""; // Clear previous results first

        places.forEach(place => {
            const div = document.createElement("div"); // Create a new div
            div.className = "result-card"; // Add a class for styling

            div.innerHTML = `
                <h3>${place.name}</h3>
                <img src="${place.imageUrl}" alt="${place.name}" />
                <p>${place.description}</p> 
            `;

            // Add the result card to the results container
            resultsDiv.appendChild(div);
        });
    }
});
