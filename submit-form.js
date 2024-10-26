async function hehe() {
  const response = await fetch("http://localhost:3000/users-form", {
    method: 'get'
  })
    .then((response) => response.json())
    .then(data => {
      console.log('data:', data);
      return data;
    })


  console.log('response', response);
}

hehe();

// fetch('http://localhost:3000/users-form', {
//   mode: 'no-cors',
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }
//     return response.json();
//   })
//   .then(response => {
//     console.log('fetch: ', response);
//     // Write an action that you want to perform with the response
//   })
//   .catch(error => {
//     console.log('Fetch error: ', error);
//     // Handle the error in case the request is not successful
//   });

document.getElementById('registrationForm').addEventListener('submit', function (event) {

  let isValid = true;

  // Get the form values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const terms = document.getElementById('terms').checked;

  // Simple validation checks
  if (!username) {
    isValid = false;
    alert('Please enter your username.');
  } else if (!email) {
    isValid = false;
    alert('Please enter your email.');
  } else if (!password) {
    isValid = false;
    alert('Please enter your password.');
  } else if (password !== confirmPassword) {
    isValid = false;
    alert('Passwords do not match.');
  } else if (!terms) {
    isValid = false;
    alert('You must agree to the terms and conditions.');
  }

  // Prevent form submission if validation fails
  if (!isValid) {
    event.preventDefault();
  }
});