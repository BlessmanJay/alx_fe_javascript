// Create Quotes Array
const quotes = [
  {
    text: "Believe that all things are possible and you're halfway to achieving your goals.",
    category: "Motivation",
  },
  { text: "What you focus on expands.", category: "Attraction" },
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
// Function to display a Random Quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${randomQuote.text}" - [${randomQuote.category}]`;
}

// Function to add a new quote
function createAddQuoteForm() {
  const quoteInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newQuote = quoteInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newQuote && newCategory) {
    const newQuoteObj = { text: newQuote, category: newCategory };
    quotes.push(newQuoteObj);

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
