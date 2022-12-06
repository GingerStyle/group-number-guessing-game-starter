$(document).ready(handleReady);

let number = 0;

function handleReady() {
  console.log("jquery is loaded!")
  getRandomNum();

  $('#submit').on('click', getInputs);
}

function getRandomNum(){
  $.ajax({
    method: 'GET',
    url: '/randomNum',
  }).then(function(response){
    number = response;
    console.log('number =', number);
  }).catch(function(error){
    console.log(error);
    alert(error.responseText);
  });
}

function getInputs(){
  let guesses = {
    first: $('#firstGuess').val(),
    second: $('#secondGuess').val(),
    third: $('#thirdGuess').val(),
  }
  $.ajax({
    method: 'POST',
    url: '/randomNum',
    data: guesses,
  }).then(function(response){
    
  }).catch(function(error){
    console.log(error);
    alert(error.responseText);
  });
  getResults();
}

function getResults(){
  $.ajax({
    method: 'GET',
    url: '/compare',
  }).then(function(response){
    render(response);
  }).catch(function(error){
    console.log(error);
    alert(error.responseText);
  });
}

function render(response){
  for (item of response){
    $('#result').append(`
      <li>
        ${item.name}'s guess was ${item.status}, and their guess was ${item.guess}.
      </li>
    `)
  }
}