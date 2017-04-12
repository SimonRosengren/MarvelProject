
Marvel.heroes = {

    get: function() {
        
        this.getFromMarvel(function(req) {
            //getting two random numbers between 0 and 29
            var randomInt = Math.floor(Math.random() * 29)
            var randomInt2 = Math.floor(Math.random() * 29)
            //So that we don't get the same hero twice
            while(randomInt === randomInt2)
            {
                randomInt2 = Math.floor(Math.random() * 29)
            }            
            

            //Prints out the name in the HTML
            var result = JSON.parse(req.responseText)
            //console.log(result.data.results[randomInt])
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
        });

        this.getToplist(function(req){
            var result = JSON.parse(req.responseText)
            for (i = 0; i < 5; i++) { 
                document.getElementById('leadingHero' + i).textContent = result[i]._id + " - " + result[i].count
            }
        });

        //Actions when you click the pictures
        document.getElementById('pic').addEventListener('click', function (event) {
            //Send who won to the database
            Marvel.database.addWinnerToDatabase(document.getElementById('name').textContent)
            //Add the init here so new heroes reloads
            location.reload()
        })
        document.getElementById('pic2').addEventListener('click', function (event) {
            //Send who won to the database
            Marvel.database.addWinnerToDatabase(document.getElementById('name2').textContent)
            //Add the init here so new heroes reloads
            location.reload()
        })
    },

    getFromMarvel: function(success) {
        var website = 'http://gateway.marvel.com/v1/public/characters?'
        var limit = 30
        var URL = website + "orderBy=-modified" + "&limit=" + limit + '&apikey=' + Marvel.publicKey

        Marvel.apiHelper.get(URL, success);
    },

    getToplist: function(success) {
        Marvel.apiHelper.get('/toplist', success);
    }
}