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
         document.getElementById(id).innerHTML = content+"</ul>";

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

        document.getElementById(id).innerHTML = content+"</ul>";
        
      }

      // gate
      var start = 0;

      document.onkeyup = function(event) {

          var userKey = event.key.toLowerCase();
          var userMessage =  document.getElementById("userMessage");
          var score = document.getElementById("score");

          if(start === 0){
            generateGame(gameWords,'game',gameObject);
            start++;

          // check if the user pressed it already
          } else if (userInput.indexOf(userKey) > -1){

            userMessage.innerHTML = "<p>You entered that already, type another letter.</p>";

          // check if the key pressed is a letter or number
          } else if(/^[a-z0-9]$/i.test(event.key)){

            userInput.push(event.key);

            console.log(gameObject[userKey]);

            if(gameObject[userKey] === false){
               gameObject[userKey] = true;
            } else {
               inCorrectInput.push(event.key); 
            }
            
            var userGuesses = "<h5>User Guesses</h5><ul>";

            for(var j = 0; j < inCorrectInput.length; j++){
              userGuesses += "<li>"+inCorrectInput[j]+"</li>";
            }
            userMessage.innerHTML = " ";
            score.innerHTML = userGuesses+"</ul>";

            checkAnswer(currentGame,'game',gameObject);

          }

      }