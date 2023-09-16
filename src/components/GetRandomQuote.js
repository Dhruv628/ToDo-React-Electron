// Function to get a random quote
const getRandomQuote=async ()=> {

  const data=await fetch('https://dummyjson.com/quotes')
  .then(res => res.json())
  const randomIndex = Math.floor(Math.random() * data.quotes.length);
  const Quote = data && data.quotes[randomIndex];
  const {quote,author}=Quote;

// Request User permission 
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    new Notification('Welcome to the To-Do List', {
      body: `${quote}- By ${author}`,
    });
  }
});
}

export default getRandomQuote;