$(document).ready(function(){     
      // VARIABLES
      var gameWords = [
        "Madonna",
        'Pizza Pie',
        "Batteries Not Included",
        "Short Circuit"
      ]

      var currentGame = [];   // This is the current game word
      var gameObject = {};    // This object keeps track of the letters in play 
      var userInput = [];     // Array to hold all user input
      var inCorrectInput = [] // Array to hold all incorrect input
       var userLimit = "5";   // Amount of incorrect tries

      
      // Choose a random word and create the ? boxes
      function generateGame(arr,id,obj){
         
         // randomly get a word from gameWords
         currentGame = arr[Math.floor(Math.random() * arr.length)];
         
         // start the game HTML and fill in ? boxes
         var content = "<ul>";
         
         for(i = 0; i < currentGame.length; i++){

            if(currentGame[i] == " "){
            
               content += "</ul><ul>";
            
            } else {

               // assign letter as keys to the object
               obj[currentGame[i].toLowerCase()] = false;
               content += "<li class='blank'>?</li>";
            }

         };

         // put the content to the game
        $("#"+id).html(content+"</ul>");

      }

      // Updates the word with letters chosen by user
      function checkAnswer(arr,id,obj){

        var content="<ul>";

        for(i = 0; i < arr.length; i++){

            if(arr[i] == " "){

               content += "</ul><ul>";

            } else {

                // Check if the object key is set to true
                if(obj[arr[i].toLowerCase()]){

                  // display the letter
                  content += "<li class='blank answer'>"+arr[i]+"</li>";

                } else {

                  // display the ?
                  content += "<li class='blank'>?</li>";

                }
   
            }
          
        }

        $("#"+id).html(content+"</ul>");
        
      }

      // gate
      var start = 0;

      document.onkeyup = function(event) {

          var userKey = event.key.toLowerCase();
          var userMessage =  $("#userMessage");
          var score = $("#score");

          if(start === 0){
            generateGame(gameWords,'game',gameObject);
            start++;

          // check if the user pressed it already
          } else if (userInput.indexOf(userKey) > -1){

            userMessage.html("<p>You entered that already, type another letter.</p>");

          // check if the key pressed is a letter or number
          } else if(/^[a-z0-9]$/i.test(event.key) && userLimit > 0){

            userInput.push(event.key);

            if(gameObject[userKey] === false){
               gameObject[userKey] = true;
            } else {
               inCorrectInput.push(event.key);
               userLimit--; // decrenent user limit
            }

            // start HTML for user guessed words

            var userGuesses = "<h5>Incorrect Guesses : You have " + userLimit + " more tries!</h5><ul>";

            for(var j = 0; j < inCorrectInput.length; j++){
              userGuesses += "<li>"+inCorrectInput[j]+"</li>";
            }
            userMessage.innerHTML = " ";
            if(inCorrectInput.length){ score.innerHTML = userGuesses+"</ul>"; }

            checkAnswer(currentGame,'game',gameObject);

          }

      }
});