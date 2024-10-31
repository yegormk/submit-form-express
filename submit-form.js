async function getUserDataExpress() {
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

function sendUserData(data) {
  const jsonToSend = JSON.stringify(data);

  // console.log('DATA:', JSON.stringify(data));
  // console.log('jsonToSend', jsonToSend);
  // console.log('type:', typeof(jsonToSend));
  fetch("http://localhost:5001/api/user", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: jsonToSend,

  })
    .then((response) => response.json())
    .then(data => {
      console.log('data:', data);
      return data;
    });
}

getUserDataExpress();

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
  const description = document.getElementById('additional-info').value;
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
  } else {
    event.preventDefault();
    sendUserData({
      userName: username,
      email: email,
      password: password,
      description: description,
      agree: terms,
      limit: '600'
    });
  }
});

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));

  document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// Placeholder for fetching user data from the backend
function fetchUserData() {
  fetch("http://localhost:5001/api/user", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      const userTableBody = document.getElementById("userTableBody");

      // Clear any existing rows in the table
      userTableBody.innerHTML = '';

      // Loop through each user and create a row
      data.forEach(user => {
        const row = document.createElement("tr");

        // Create table cells for each piece of user data
        const usernameCell = document.createElement("td");
        usernameCell.textContent = user.userName || 'N/A';
        row.appendChild(usernameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email || 'N/A';
        row.appendChild(emailCell);

        const additionalInfoCell = document.createElement("td");
        additionalInfoCell.textContent = user.description || 'There is no description given.';
        row.appendChild(additionalInfoCell);

        // Append the row to the table body
        userTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}


// Fetch user data when User Info tab is clicked
document.querySelector('.tab[onclick="showTab(\'infoTab\')"]').addEventListener('click', fetchUserData);

