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
        "Ex Machina",
        "Blade Runner",
        "Total Recall",
        "The Matrix",
        "Minority Report",
        "Looper",
        "The Avengers"
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
      
      // gate
      var start = 0;


      // check user input
      document.onkeyup = function(event) {

        // make everything lowercase so it's easier to parse and check
        var userKey = event.key.toLowerCase();

          // this segment runs only once to start the game
        if(start === 0){

            // RESET - to restart the game
          game.currentGame = [];     // This is the current game word
          game.gameObject = {};      // This object keeps track of the letters in play 
          game.userInput = [];       // Array to hold all user input
          game.inCorrectInput = [];  // Array to hold all incorrect input
          game.userLimit  = 10;      // Amount of incorrect tries
          
          // Choose a random word from Game Words
          var randomIndex = Math.floor(Math.random() * gameWords.length);
          game.currentGame = gameWords[randomIndex];
          gameWords.splice(randomIndex,1); // remove item from the array

          generateGame(game);
          emptyMessage();
          
          start++; // update start so this section will not run unless 0

        // check if the user pressed it already
        } else {

          checkUserInput(userKey);

        }
      }

      
      // Mobile Specific 
      var mobile = document.getElementById('activateKeyword');
      document.getElementById("hiddenInput").focus(); // for mobile devices
      // Enable mobile keyword by focusing on a hidden input field
      mobile.addEventListener("click", function(){
        document.getElementById("hiddenInput").focus();
      });


      // Choose a random word and create the ? boxes
      // obj - the curret game
      function generateGame(obj) {

        var newGame = false; // gate for new game
        var gameObject = obj.gameObject;
        var currentGame = obj.currentGame;
        
        // if the gameObject is empty, it means that we are starting a new game
        if(Object.values(gameObject).length === 0){
          newGame = true; 
        };

         // start the game HTML and fill in ? boxes
         var content = document.createElement("ul"); 
         
         for(i = 0; i < currentGame.length; i++){

            if(currentGame[i] == " "){
            
              var space = document.createElement('li');
              space.setAttribute('class','space');
              content.appendChild(space);
            
            } else {

              // assign letter as keys to the object
              if(newGame){ gameObject[currentGame[i].toLowerCase()] = false; }
              
              if(newGame === false && gameObject[currentGame[i].toLowerCase()]){ 

                // display the letter
                var answer = document.createElement('li');
                answer.setAttribute('class','blank answer');
                answer.textContent = currentGame[i];
                content.appendChild(answer);

              } else {

                // create empty '?' boxes
                var blank = document.createElement('li');
                blank.setAttribute('class','blank');
                blank.textContent = "?";
                content.appendChild(blank);

              }

            }

        };

        // put the content to the game
        gameContainer.innerHTML = "";
        gameContainer.appendChild(content);

      }

      function updateUserGuesses(obj) {

        var guessContainer = document.getElementById("userGuesses");
        var guessContainerNumber = document.getElementById("userGuessesNumber");
        var userGuessesList = document.getElementById("userGuessesList");
        
      
        // start HTML for user guessed words
        userGuessesNumber.textContent = obj.userLimit;

        // create element of all incorrect user entries
        var userGuesses = document.createElement("ul"); 
         
        for(var j = 0; j < obj.inCorrectInput.length; j++){
          var incorrectItem = document.createElement('li');
          incorrectItem.textContent = obj.inCorrectInput[j];
          userGuesses.appendChild(incorrectItem);  
        }
        
        if(obj.inCorrectInput.length){ 

          guessContainer.style.display = 'block';
          userGuessesList.innerHTML = "";
          userGuessesList.appendChild(userGuesses);

        } else {

          guessContainer.style.display = 'none';

        }

      }

      function checkWinLose(obj) {

        var messageContainer = document.getElementById("userGuesses");
        
        // if no more false items in the object, the user wins!
            if(Object.values(obj.gameObject).indexOf(false) === -1){
              obj.userWins++;
              var message = "<div class='endMessage'><h3>&ldquo;"+ obj.currentGame +"&rdquo;<br><br>CON<span class='tile'>G</span>RATULATI<span class='tile'>O</span>NS!!! <br><span class='fireworks'><strong>(fireworks goes here!)</strong></span><br><br><strong>Wins</strong> : "+ obj.userWins +", <strong>Loses</strong> : " + obj.userLoses + "<br><br><span class='startNew'>Press any key to start again!</span></h3></div>";
              messageContainer.style.display = 'none';
              showMessage(message);
              start = 0; // restart game
            }

            // if limit is now 0, the user loses
            if(obj.userLimit === 0) {
              obj.userLoses++;
              var message = "<div class='endMessage'><h3>GA<span class='tile'>M</span>E OVER, TR<span class='tile'>Y</span> AGAIN <br><br><span class='startNew'>Press any key to start again!</span></h3></div>";
              showMessage(message);
              messageContainer.style.display = 'none';
              gameWords.push(obj.currentGame); // put back the word
              start = 0; // restart game
            }

      }


      function showMessage(msg) {

        var userMessage =  document.getElementById("userMessage");
        userMessage.innerHTML = msg;

      }

      function emptyMessage() {

        var userMessage =  document.getElementById("userMessage");
        userMessage.innerHTML = "";
        
      }

      function checkUserInput(userInput){

        userKey = userInput;

         if (game.userInput.indexOf(userKey) > -1) {

            showMessage("<p>You entered that already, type another letter.</p>");

          // check if the key pressed is a letter or number
          } else if(/^[a-z0-9]$/i.test(event.key) && game.userLimit > 0){

            game.userInput.push(userKey); // keep track of all user input

            if(game.gameObject[userKey] === false){
                
              game.gameObject[userKey] = true; // update key to true
            
            } else {
               
               game.inCorrectInput.push(event.key); // keep track of all incorrect input
               game.userLimit--; // decrement user limit

            }

            emptyMessage(); // clear messages

            updateUserGuesses(game); // show incorrect input

            generateGame(game); // update game screen

            checkWinLose(game); // check if the user wins or loses

          } 

      }