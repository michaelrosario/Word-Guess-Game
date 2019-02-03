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

      var game = {
        currentGame: [],  // This is the current game word
        gameObject: {},   // This object keeps track of the letters in play 
        userInput: [],    // Array to hold all user input
        userLimit: 10,    // Amount of incorrect tries
        userWins: 0,      // Number of wins
        userLoses: 0,     // Number of loses
      }

      // ID of the game container
      var gameContainer =  document.getElementById("game");

      
      // Mobile Specific 
      var mobile = document.getElementById('activateKeyword');
      document.getElementById("hiddenInput").focus(); // for mobile devices
      // Enable mobile keyword by focusing on a hidden input field
      mobile.addEventListener("click", function(){
        document.getElementById("hiddenInput").focus();
      });


      // Choose a random word and create the ? boxes
      // arr - the gamewords
      // id  - the game container
      // obj - the curret game
      function generateGame(arr,obj) {
         
         // randomly get a word from gameWords
         var randomIndex = Math.floor(Math.random() * arr.length);
         
         obj.currentGame = arr[randomIndex];
         
         arr.splice(randomIndex,1); // remove item from the array

         // start the game HTML and fill in ? boxes
         var content = document.createElement("ul"); 
         
         for(i = 0; i < obj.currentGame.length; i++){

            if(obj.currentGame[i] == " "){
            
              var space = document.createElement('li');
              space.setAttribute('class','space');
              content.appendChild(space);
            
            } else {

              // assign letter as keys to the object
              obj.gameObject[obj.currentGame[i].toLowerCase()] = false;
              
              // create empty '?' boxes
              var blank = document.createElement('li');
              blank.setAttribute('class','blank');
              blank.textContent = "?";
              content.appendChild(blank);

            }

        };

        // put the content to the game
        gameContainer.innerHTML = "";
        gameContainer.appendChild(content);

      }

      // Updates the word with letters chosen by user
      // arr - is the string with the current word
      // id - this is the id of the game div
      // obj - object to keep track of the game true/false 
      function checkAnswer(obj) {

        var content = document.createElement("ul"); 
        var arr = obj.currentGame;
        var gameObject = obj.gameObject;

        for(i = 0; i < arr.length; i++){

            if(arr[i] == " "){

               var space = document.createElement('li');
               space.setAttribute('class','space');
               content.appendChild(space);

            } else {

                // Check if the object key is set to true
                if(gameObject[arr[i].toLowerCase()]){

                  // display the letter
                  var answer = document.createElement('li');
                  answer.setAttribute('class','blank answer');
                  answer.textContent = arr[i];
                  content.appendChild(answer);

                } else {

                  var blank = document.createElement('li');
                  blank.setAttribute('class','blank');
                  blank.textContent = "?";
                  content.appendChild(blank);

                }
            }
        }

        gameContainer.innerHTML = "";
        gameContainer.appendChild(content);
        
      }


      function showMessage(msg) {

        var userMessage =  document.getElementById("userMessage");
        userMessage.innerHTML = msg;

      }

      function emptyMessage() {

        var userMessage =  document.getElementById("userMessage");
        userMessage.innerHTML = "";
        
      }


      // gate
      var start = 0;

      // check user input
      document.onkeyup = function(event) {

          var userKey = event.key.toLowerCase();
          var score = document.getElementById("score");

          // this segment runs only once to start the game
          if(start === 0){

            // RESET - to restart the game
            game.currentGame = [];     // This is the current game word
            game.gameObject = {};      // This object keeps track of the letters in play 
            game.userInput = [];       // Array to hold all user input
            game.inCorrectInput = [];  // Array to hold all incorrect input
            game.userLimit  = 10;      // Amount of incorrect tries
        
            generateGame(gameWords,game);
            emptyMessage();
            score.innerHTML = "";
      
            start++;

          // check if the user pressed it already
          } else if (game.userInput.indexOf(userKey) > -1){

            showMessage("<p>You entered that already, type another letter.</p>");

          // check if the key pressed is a letter or number
          } else if(/^[a-z0-9]$/i.test(event.key) && game.userLimit > 0){

            game.userInput.push(userKey);

            if(game.gameObject[userKey] === false){
               game.gameObject[userKey] = true;
            } else {
               game.inCorrectInput.push(event.key);
               game.userLimit--; // decrenent user limit
            }

            // start HTML for user guessed words

            var userGuesses = "<h5>Incorrect Guesses : You have " + game.userLimit + " more tries!</h5><ul>";

            for(var j = 0; j < game.inCorrectInput.length; j++){
              userGuesses += "<li>"+game.inCorrectInput[j]+"</li>";
            }
            userMessage.innerHTML = "";
            
            if(game.inCorrectInput.length){ score.innerHTML = userGuesses+"</ul>"; }

            checkAnswer(game);

            if(Object.values(game.gameObject).indexOf(false) === -1){
              game.userWins++;
              var message = "<div class='endMessage'><h3><br>Wins : "+ game.userWins +"<br>C O N G R A T U L A T I O N S ! ! ! <br><span><strong>(firework goes here!)</strong></span><br><span class='startNew'>Press any key to start again!</span></h3></div>";
              showMessage(message);
              start = 0; // restart game
            }
            if(game.userLimit === 0) {
              var message = "<div class='endMessage'><h3>SORRY YOU DON'T HAVE ANY MORE TRIES ! ! ! <br><br><span class='startNew'>Press any key to start again!</span></h3></div>";
              showMessage(messsage);
              gameWords.push(game.currentGame); // put back the word
              start = 0; // restart game
            }
          } 
        }