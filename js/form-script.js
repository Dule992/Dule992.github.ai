const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse.length > 0) {
    alert('Please complete the captcha');
    throw new Error('Captcha is required');
  }
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);

  fetch('http://localhost:3000/submit', {
    method: 'POST',
    body: params,
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Form submitted successfully');
    } else {  
      alert('Captcha failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});