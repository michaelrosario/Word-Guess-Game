
      var gameWords = [
        "Madonna",
        'Pizza Pie',
        "Batteries Not Included"
      ]

      var gameObject = {};
      var currentGame = [];
      var userInput = [];

      function generateGame(arr,id,obj){

         currentGame = arr[Math.floor(Math.random() * arr.length)];
         var content = "<ul>";
         

         for(i = 0; i < currentGame.length; i++){

            if(currentGame[i] == " "){
               content += "</ul><ul>";
            } else {
               obj[currentGame[i].toLowerCase()] = false;
               content += "<li class='blank'>?</li>";
            }

         };

         document.getElementById(id).innerHTML = content+"</ul>";

      }

      function checkAnswer(arr,id,obj){

        var content="<ul>";

        for(i = 0; i < arr.length; i++){

            if(arr[i] == " "){
               content += "</ul><ul>";
            } else {
                if(obj[arr[i].toLowerCase()]){
                  content += "<li class='blank answer'>"+arr[i]+"</li>";
                } else {
                  content += "<li class='blank'>?</li>";
                }
               
            }
          
        }

        document.getElementById(id).innerHTML = content+"</ul>";
        
      }

      var start = 0;

      document.onkeyup = function(event) {

          var userKey = event.key.toLowerCase();
          var userMessage =  document.getElementById("userMessage");
          var score = document.getElementById("score");

          if(start === 0){
            generateGame(gameWords,'game',gameObject);
            start++;

          } else if (userInput.indexOf(userKey) > -1){


            userMessage.innerHTML = "<p>You entered that already, type another letter.</p>";

          
          } else if(/^[a-z0-9]$/i.test(event.key)){

            userInput.push(event.key);
            console.log(gameObject[userKey]);
            if(gameObject[userKey] === false){
                gameObject[userKey] = true;
            }

            var userGuesses = "<h5>User Guesses</h5><ul>";

            for(var j = 0; j < userInput.length; j++){
              userGuesses += "<li>"+userInput[j]+"</li>";
            }
            userMessage.innerHTML = " ";
            score.innerHTML = userGuesses+"</ul>";

            checkAnswer(currentGame,'game',gameObject);

          }

      }