
document.getElementById('quoteForm').addEventListener('submit', function(e){
  e.preventDefault();

  // ---- OPTION 1: mailto (uncomment to use) ----
  // const data = new FormData(this);
  // const subject = encodeURIComponent('Free Quote Request - SA Property Care');
  // const body = encodeURIComponent(
  //   `Name: ${data.get('name')}
  //Phone: ${data.get('phone')}
  //Email: ${data.get('email') || '-'}
  //Address: ${data.get('address') || '-'}
  //Message: ${data.get('message')}`
  // );
  // window.location.href = `mailto:info@sapropertycare.com?subject=${subject}&body=${body}`;
  // alert('Thanks! Your email app should open shortly. If not, please call us.');
  // return;

  // ---- OPTION 2: Formspree (recommended) ----
  const FORM_ID = 'YOUR_FORM_ID';
  if(FORM_ID === 'YOUR_FORM_ID'){
    alert('Form is not connected yet. Replace YOUR_FORM_ID in script.js with your Formspree ID or enable the mailto option.');
    return;
  }
  fetch(`https://formspree.io/f/${FORM_ID}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(this)
  }).then(res => res.json())
    .then(data => {
      if(data.ok !== false){
        alert('Thanks! We received your request and will reply shortly.');
        this.reset();
      } else {
        alert('There was an issue sending your request. Please call us.');
      }
    })
    .catch(()=> alert('Network error. Please call us.'));
});
