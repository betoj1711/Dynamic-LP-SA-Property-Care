// script.js
document.getElementById('quoteForm').addEventListener('submit', function(e){
  e.preventDefault();

  const FORM_ID = 'xnnzwgvq'; // <-- replace with your real ID
  fetch(`https://formspree.io/f/${FORM_ID}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(this)
  })
  .then(res => res.json())
  .then(data => {
    if (!data.error) {
      alert('Thanks! We received your request and will reply shortly.');
      this.reset();
    } else {
      alert('There was an issue sending your request. Please call us.');
    }
  })
  .catch(()=> alert('Network error. Please call us.'));
});
