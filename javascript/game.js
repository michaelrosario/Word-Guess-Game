      // VARIABLES
      var gameWords = [
        "Batteries Not Included",
        "Short Circuit",
        "Star Wars",
        "Flight of the Navigator",
        "Star Trek",
        "Ready Player One",
        "Inception",
        "Back to the Future",
        "Robocop",
        "Terminator",
        "Total Recall"
      ]

      var currentGame = [];   // This is the current game word
      var gameObject = {};    // This object keeps track of the letters in play 
      var userInput = [];     // Array to hold all user input
      var inCorrectInput = [] // Array to hold all incorrect input
      var userLimit = 5;   // Amount of incorrect tries
      var wins = 0;

      // Choose a random word and create the ? boxes
      function generateGame(arr,id,obj){
         
         // randomly get a word from gameWords
         var randomIndex = Math.floor(Math.random() * arr.length);
         currentGame = arr[randomIndex];
         
         arr.splice(randomIndex,1); // remove item from the array

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
      // arr - is the string with the current word
      // id - this is the id of the game div
      // obj - object to keep track of the game true/false 
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

      // check user input
      document.onkeyup = function(event) {

          var userKey = event.key.toLowerCase();
          var userMessage =  document.getElementById("userMessage");
          var score = document.getElementById("score");

          // this segment runs only once to start the game
          if(start === 0){

            // RESET
            currentGame = [];   // This is the current game word
            gameObject = {};    // This object keeps track of the letters in play 
            userInput = [];     // Array to hold all user input
            inCorrectInput = [] // Array to hold all incorrect input
            userLimit = 5;      // Amount of incorrect tries
            
            generateGame(gameWords,'game',gameObject);
            userMessage.innerHTML = "";
            score.innerHTML = "";
      
            start++;

          // check if the user pressed it already
          } else if (userInput.indexOf(userKey) > -1){

            userMessage.innerHTML = "<p>You entered that already, type another letter.</p>";

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
            userMessage.innerHTML = "";
            if(inCorrectInput.length){ score.innerHTML = userGuesses+"</ul>"; }

            checkAnswer(currentGame,'game',gameObject);

            if(Object.values(gameObject).indexOf(false) === -1){
              wins++;
              userMessage.innerHTML = "<div class='endMessage'><h3><br>Wins : "+wins+"<br>C O N G R A T U L A T I O N S ! ! ! <br><span><strong>(firework goes here!)</strong></span><br><span>Press any key to start again!</span></h3></div>";
              start = 0; // restart game
            }
            if(userLimit === 0) {
            
              userMessage.innerHTML = "<div class='endMessage'><h3>SORRY YOU DON'T HAVE ANY MORE TRIES ! ! ! <br><br><span>Press any key to start again!</span></h3></div>";
              gameWords.push(currentGame); // put back the word
              start = 0; // restart game

            }

          } 

      }