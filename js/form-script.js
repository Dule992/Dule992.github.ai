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

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: params,
  })
  .then(response => response.json())
  .then(data => {
    if (data.captchaSuccess) {
      alert('Form submitted successfully');
    } else {  
      alert('Captcha failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});