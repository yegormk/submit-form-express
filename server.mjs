import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;

// app.all("*", (req, res) => {
//     res.send('HEHE!');
// })

app.get('/users-form', (req, res) => {
    res.send(
      JSON.stringify({
        name: 'Yehor Petrov',
        email: 'yehorpetrov@gmail.com',
        note: 'National Aviation University, 511 group'
      })
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.get('/users-list', (req, res) => {
//     // Get complete list of users
//     const usersList = [];
//
//     // Send the usersList as a response to the client
//     res.send(usersList);
// });