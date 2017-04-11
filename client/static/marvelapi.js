var privateKey = "c49d621e8cb90e99dcc76543a1c6682863ca9ece"
var publicKey = "4e4c4629dc02b846216360561c9aa443"


document.addEventListener("DOMContentLoaded", getHero)

function addToDatabase(temp) {
  $.ajax({
    type: 'POST',
    url: '/vote',
    data: { winner: temp }
  })
}
function updateList(){
  $.ajax({
    type: 'GET', 
    url: '/toplist'
  })
}

function getHero(event) {
  var req = new XMLHttpRequest()
  var req2 = new XMLHttpRequest()
  var number = event.timeStamp
  var website = 'http://gateway.marvel.com/v1/public/characters?'
  var limit = 30

  //Construct the URL
  var URL = website + "orderBy=-modified" + "&limit=" + limit /*+ "&ts=" + number*/ + '&apikey=' + publicKey /*+ "&hash=" + hash*/

  //Actions when you click the pictures
  document.getElementById('pic').addEventListener('click', function (event) {
    //Send who won to the database
    addToDatabase(document.getElementById('name').textContent)
    //Add the init here so new heroes reloads
    location.reload()
  })
  document.getElementById('pic2').addEventListener('click', function (event) {
    //Send who won to the database
    addToDatabase(document.getElementById('name2').textContent)
    //Add the init here so new heroes reloads
    location.reload()
  })

  //Wait for the httpreq to load
  req.addEventListener('load', function () {
    if (req.status >= 200 && req.status < 400) {

      //getting two random numbers between 0 and 29
      var randomInt = Math.floor(Math.random() * 29)
      var randomInt2 = Math.floor(Math.random() * 29)
      //Update the top list
      

      //Prints out the name in the HTML
      var result = JSON.parse(req.responseText)
      console.log(result.data.results[randomInt])
      document.getElementById('name').textContent = result.data.results[randomInt].name
      document.getElementById('name2').textContent = result.data.results[randomInt2].name

      
      //Show the picture in the HTML
      var img = document.createElement('img')
      img.className += "pic"
      img.src = result.data.results[randomInt].thumbnail.path + '/standard_fantastic.jpg'
      document.getElementById('pic').appendChild(img)

      var img2 = document.createElement('img')
      img2.className += "pic"
      img2.src = result.data.results[randomInt2].thumbnail.path + '/standard_fantastic.jpg'
      document.getElementById('pic2').appendChild(img2)

      //Prints out the description of the hero in the HTML
      document.getElementById('info').textContent = result.data.results[randomInt].description
      if (result.data.results[randomInt].description === "") {
        document.getElementById('info').textContent = "No description, sorry! :("
      }
      document.getElementById('info2').textContent = result.data.results[randomInt2].description
      if (result.data.results[randomInt2].description === "") {
        document.getElementById('info2').textContent = "No description, sorry! :("
      }
      
    }
    event.preventDefault()
  })
  req2.addEventListener('load', function(){
    document.getElementById('leadingHero').textContent = req2.responseText
    console.log(req2)
  })
  req.open('GET', URL, true)
  req.setRequestHeader('Content-Type', 'application/json')
  req.send()
  req2.open('GET', '/toplist', true)
  req2.setRequestHeader('Content-Type', 'application/json')
  req2.send()
}