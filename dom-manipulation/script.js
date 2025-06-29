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
