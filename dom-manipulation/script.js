let quotes = [];

// Load quotes from Local Storage, if available
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
} else {
  // If not in localStorage, use default quotes

  quotes = [
    {
      text: "Believe that all things are possible and you're halfway to achieving your goals.",
      category: "Motivation",
    },
    { text: "What you focus on expands.", category: "Law of Attraction" },
    {
      text: "In the middle of every difficulty lies opportunity.",
      category: "Resilience",
    },
    {
      text: "You miss 100% of the shots you don't take.",
      category: "Risk-Taking",
    },
    {
      text: "Art enables us to find ourselves and lose ourselves at the same time.",
      category: "Creativity / Art",
    },
    {
      text: "The only true wisdom is knowing that you know nothing.",
      category: "Philosophy / wisdom",
    },
    {
      text: "Be the change that you wish to see in the world.",
      category: "Personal Growth",
    },
    {
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      category: "Leadership / Perseverance",
    },
  ];

  // Save initial default code to localStorage
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a Random Quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${randomQuote.text}" - [${randomQuote.category}]`;
}

// Add a new quote and save to localStorage
function createAddQuoteForm() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newQuote = quoteInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newQuote && newCategory) {
    const newQuoteObj = { text: newQuote, category: newCategory };
    quotes.push(newQuoteObj);

    // Save updated quotes array to localStorage
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Create New DOM Element
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteElement = document.createElement("p");
    newQuoteElement.innerHTML = `"${randomQuote.text}" - [${randomQuote.category}]`;

    // Append to DOM
    quoteDisplay.appendChild(newQuoteElement);

    alert("Quote added successfully!");
    quoteInput.value = "";
    categoryInput.value = "";
  }
}

// Event Listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// New Code
// ✅ Export quotes to JSON file
function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2); // Pretty format
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  downloadLink.click();

  URL.revokeObjectURL(url);
}

// ✅ Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      // Optional: Validate format before adding
      const validQuotes = importedQuotes.filter((q) => q.text && q.category);

      if (validQuotes.length > 0) {
        quotes.push(...validQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("No valid quotes found in the file.");
      }
    } catch (error) {
      alert("Invalid JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// ✅ Helper to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Task #3

// Populate Categories Dynamically

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing options except 'All'
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map((q) => q.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Set previous selected filter if available
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes(); // Auto-apply filter on load
  }
}

// Filter Quotes Based on Selected Category

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory); // Save selection

  let filteredQuotes;

  if (selectedCategory === "all") {
    filteredQuotes = quotes;
  } else {
    filteredQuotes = quotes.filter((q) => q.category === selectedCategory);
  }

  renderFilteredQuotes(filteredQuotes);
}

// Remember the Last Selected Filter

function renderFilteredQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ""; // Clear old quotes

  filteredQuotes.forEach((quote) => {
    const p = document.createElement("p");
    p.textContent = `"${quote.text}" - [${quote.category}]`;
    quoteDisplay.appendChild(p);
  });
}

// Call populateCategories() and apply filter automatically on load:

document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  fetchQuotesFromServer?.(); // optional if using
});

// ----------------------------------------------

// Fetch simulated server data

async function fetchFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverData = await response.json();

    console.log("Fetched from server:", serverData);

    // Optional: Simulate server quotes from the first 5 items
    const serverQuotes = serverData.slice(0, 5).map((post) => ({
      text: post.title,
      category: "Server",
    }));

    syncWithLocalData(serverQuotes);
    notifyUserOfSync();
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

// Send data (simulate pushing new quote to server)
async function postToServer(newQuote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newQuote),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const result = await response.json();
    console.log("Posted to server:", result);
  } catch (error) {
    console.error("Failed to post:", error);
  }
}
const newQuote = { text: newQuoteText, category: newCategory };
quotes.push(newQuote);
saveQuotes();
postToServer(newQuote); // Simulate sync

// Add Periodic Sync (every 30s or on page load)
setInterval(fetchFromServer, 30000);
document.addEventListener("DOMContentLoaded", fetchFromServer);
