

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5001;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

let guesses = {};
let result = 0;

app.get('/randomNum', function (req, res) {
  result = Math.round(Math.random() * (25 - 1) + 1);
  console.log('result =', result);
  res.send(String(result));
})

app.post('/randomNum', function (req, res) {
  console.log("in post request", req.body);
  guesses = req.body;
  console.log(guesses);
  res.sendStatus(201);
})

app.get('/compare', function(req, res) {
  let firstGuess = {
    name: 'First person',
    status: compare(guesses.first),
    guess: guesses.first
  }
  let secondGuess = {
    name: 'Second person',
    status: compare(guesses.second),
    guess: guesses.second
  }
  let thirdGuess = {
    name: "Third person",
    status: compare(guesses.third),
    guess: guesses.third
  }
  let guessArray = [];
  guessArray.push(firstGuess, secondGuess, thirdGuess);
  res.send(guessArray);
})

function compare(num){
if (num < result){
  return "lesser";
}
else if(num > result){
  return "greater";
}
else if(num == result){
  return "bingo";
}
}