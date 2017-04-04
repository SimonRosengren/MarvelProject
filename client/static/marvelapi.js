var privateKey = "c49d621e8cb90e99dcc76543a1c6682863ca9ece"
var publicKey = "4e4c4629dc02b846216360561c9aa443"
document.addEventListener("DOMContentLoaded", getHero)
function getHero(event) {
  var req = new XMLHttpRequest()
  var number = event.timestamp
  var website = "http://gateway.marvel.com/v1/public/characters?name="
  var name = "Iron-Man"
  var URL = website + name + "ts=" + number + "&apikey=" + publicKey + "&hash=" + privateKey

  document.getElementById('vs').addEventListener('click', function (event) {
    document.getElementById('heroInfo').textContent = ""
  })

  req.addEventListener('load', function () {

    console.log(req.status)
    if (req.status >= 200 && req.status < 400) {

      var result = JSON.parse(req.responseText)
      document.getElementById('heroInfo').textContent = result.name
      console.log('HERE I AM')
    }
    event.preventDefault()
  })
  req.open('GET', URL, true)
  req.setRequestHeader('Content-Type', 'application/json')
  req.send()
}