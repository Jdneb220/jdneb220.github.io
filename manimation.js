
  let $man = $('.player_one')
  let $setter = $('.setter')
  let $alertBox = $('#alert_box')
  const WIN_CONDITION = 10

  //function makeFans
  //add fans to the bleachers
  let makeFans = function(){
    //first fan is seated in top left most section of bleachers
    let fanX = 300;
    let fanY = 10;

    //helper function, make individual fan
    let addFan = function(specialFan = false){
      let fanNum = Math.floor(Math.random()*7.99999999+1)
      if (specialFan)
        fanNum = 9
      let $fan = $('<div class="fan fan' + fanNum + '"></div>')
      $fan.css('left',fanX+'px')
      fanX+=40
      $fan.css('top',fanY+'px')
      $('.court').append($fan)
    }

    //remove any prior fans from previous game
    $('.court').children().remove()

    //for each row make 19 fans
    for(let row = 1; row <= 8; row++){
      for(let seat = 0; seat < 18; seat++){
        if (row === 6 && seat === 5)
          addFan(true)
        else
          addFan()
      }

      //the first 5 rows get extra fans to fill seats around scoreboard
      if (row<=4){
        for(let extraSeat = 0; extraSeat < row; extraSeat++){          addFan()
        }
      }

      //move the x,y coordinate to seat fan
      fanX = 300 - 36*row
      fanY += 40
    }
  }

  //function bounceFans
  //everytime the score is updated, bounce a larger percentage of the fans
  let fanInterval = false
  let bounceFans = function(){
    $('.fan').removeClass('mover')
    for (i = 0; i <= $('.fan').length; i++){
      if (numWins != 0 && i % (WIN_CONDITION-numWins+1) === 0){
        $($('.fan')[i]).addClass('mover')
        console.log (i)
      }
    }

    //OLD BOUNCE LOGIC, CAUSED LAG
    //anytime the score is updated, grab a random fan and bounce him
    //as the number of wins increases, the interval at which a fan is selected also increases, represented by fanBounceSpeed
    /*
    if (numWins === WIN_CONDITION){
      $('.fan').not('.mover').addClass('mover')
      setTimeout(function(){$('.fan').not('.mover').addClass('mover')},500)
    }
    else{
      let fanBounceSpeed = (WIN_CONDITION-numWins)*(WIN_CONDITION+5-numWins)

      fanInterval = setInterval(function(){
      let $randoFan = $($('.fan').not('.mover')[Math.floor(Math.random()*$('.fan').not('.mover').length)])
      if ($('.fan').not('.mover').length != 0){
        $randoFan.addClass('mover')
        setTimeout(function(){
            $randoFan.removeClass('mover')
          },500)}
      }, fanBounceSpeed)
    }
    */
  }

  let clearFanInterval = function(){
    clearInterval(fanInterval)
  }


  //function moveMan
  //using nInterval, moveMan goes through the footwork
  //of attack approach.  the entire sequence is 24 frames (counted with variable moveManFrame)
  let moveManFrame = 1
  let nInterval
  let moveMan = function(){

    //heights throughout jump
    switch (moveManFrame){
      case 15:  $man.css('top','492px'); break;
      case 16:  $man.css('top','450px'); break;
      case 17:  $man.css('top','410px'); break;
      case 18:  $man.css('top','360px'); break;
      case 19:  $man.css('top','350px'); break;
      case 20:  $man.css('top','360px'); break;
      case 21:  $man.css('top','390px'); break;
      case 22:  $man.css('top','440px'); break;
      default:  $man.css('top','480px'); break;
    }

    //animations throughout jump
    switch (moveManFrame) {
      case 1: $man.addClass('right1'); break;
      case 2: $man.addClass('right2'); break;
      case 3: $man.addClass('right3'); break;
      case 4: $man.addClass('right4'); break;
      case 5: $man.attr('class', 'player_one left1'); break;
      case 6: $man.addClass('left2'); break;
      case 7: $man.addClass('left3'); break;
      case 8: $man.addClass('left4'); break;
      case 9: $man.attr('class', 'player_one right1'); break;
      case 10: $man.addClass('right2'); break;
      case 11: $man.addClass('right3'); break;
      case 12: $man.addClass('right4'); break;
      case 13: $man.attr('class', 'player_one jump1'); break;
      case 14: $man.removeClass('jump1').addClass('jump2');
               break;
      case 15: $man.removeClass('jump2').addClass('jump3');
               break;
      case 16: $man.removeClass('jump3').addClass('jump4');
               break;
      case 17: //stay at jump5
      case 18: //float up
      case 19: //float up
      case 20: if (winState)
                $man.attr('class', 'player_one jump5');break; //float slight down
      case 21: $man.removeClass('jump5').addClass('jump6');
               break; //drop jump5, jump6 slight down
      case 22: break; //stay at jump 6 float down
      case 23: $man.attr('class', 'player_one'); break;
      default:  //reset moveManFrame, player's left position, and stop the animation
      $man.attr('style','');  moveManFrame = 3; clearInterval(nInterval)
    }

    //move man to the right each frame by 18px
    if (moveManFrame > 3 && moveManFrame <= 20)
      $man.css('left', (Number($man.css('left').slice(0,-2))+18)+'px')
    moveManFrame++;
  }


  //function setterReady
  //animate the setter to have hands above head, ready to set
  let setterReady = function(){
      $setter.addClass('set1')
  }

  //function setterReset
  //remove all classes from setter so that they are standing at the net; default position
  /*
    parameters:
    t (number) - time in ms to wait before resetting the setter animation
  */
  let setterReset = function(t){
    setTimeout(function(){
      $setter.attr('class','setter')
    }, t)
  }

  //function lowSetRoll
  //animate the setter to perform an athletic set, then stand up
  let lowSetRoll = function(){
    console.log ('DUCK N ROLL')
    let lowSetRollInterval
    $setter.addClass('low-set1')
    let rollCounter = 2
    lowSetRollInterval = setInterval(function(){
        $setter.addClass('low-set' + rollCounter)
        rollCounter++
        if (rollCounter === 9) {
          clearInterval(lowSetRollInterval)
          setTimeout(function(){setterReset()},100)
        }
    }, 100)
  }

  //function setGo
  //animate the setter to either roll if the set is late but athletic, or jump set if the timing is superb
  /*
    parameters:
    athletic (boolean) [optional] - true if athletic
  */
  let setGo = function(athletic = false){
    if (athletic) {
      lowSetRoll()
      showText("athletic")

    }
    else{
      $setter.addClass('set2')
      if (Math.random()<.5)
        showText('superb')
      else
        showText("wow")
    }
  }

  //function bumpGo
  //animate the player to crouch position, delay into pass position
  let bumpGo = function() {
    //animate pass
    $man.addClass('crouch')
    setTimeout(function(){
      $man.addClass('pass')
    },100);
  }

  //function bumpStop
  //depending how quiclkly the user presses the spacebar, the player may either be in crouch or pass position.  bumpStop removes .pass first, then .crouch to return player to standing position

  let bumpStop = function(){
    setTimeout(function(){
      $man.removeClass('pass')
    },100);

    setTimeout(function(){
      $man.removeClass('crouch')
    },200);
  }


  //function showText
  //appends an animated message to $alertBox when the game state changes
  //message slides down then fades out gradually
  /*
    parameters:
    msgClass (string) - corresponding css class image and positioning
    fade (boolean) [optional] - default fades message after 800ms, otherwise message stays on screen until next message
  */
  let showText = function(msgClass, fade = true){
    $msg = $("<div class='" + msgClass + "'>")
    $alertBox.children().remove()
    $alertBox.append($msg)
    if (fade)
      setTimeout(function(){
        $msg.fadeOut(500, function(){
          $(this).remove()
        })
      }, 800)
  }

  //function updateScore
  //adds two spans to the scoreboard for each digit of the numWins.  removes any priors spans in the scoreboard.  called after every win
  let numWins = 0;
  let updateScore = function(){
    $('#scoreboard').children().remove()
    $('#scoreboard').append('<span>' + Math.floor(numWins / 10) + '</span>')
    $('#scoreboard').append('<span>' + numWins % 10 + '</div>')
    clearFanInterval()
    bounceFans()
  }


  let gameState = "welcome"
  let gameTimer = 1
  let bounce = 0

  //function resetBoard
  //if its the beginning of the game, create the fans, scoreboard, and show the instructions
  //otherwise in midgame, set the gameState to prepping.  During that time, the gameTimer is reset to 0 while the setter is reset to ready position (in the case that they are ready and the ball drops to the floor).  The user will not be able to input clicks/key presses until everything is reset
  //if the end game is reached, a congratulatory message is displayed and the option to restart the game is provided
  //otherwise, send the ball to the serving position, stop it from moving, and let the user know they can begin play
  let resetBoard = function(){
    if (gameState === "welcome"){
      numWins = 0
      makeFans()
      updateScore()
      $alertBox.children().remove()
      $('#overlay').show()
      $('#overlay').children().each(function(i, elem){
        $(elem).show((i+1)*1000)
      })
    }

    else {
      gameState = "prepping"
      gameTimer = 1
      setterReset(0)
      if (numWins === WIN_CONDITION) {
        gameState = "donothing"
        showText("youwin",false)
        gameTimer = 1
        setTimeout(function(){
          showText("playagain",false)
          gameState = "gameover"
        }, 2000)
      }
      else
        setTimeout(function(){
          $('.ball').css('top','536px').css('left','1032px').css('animation-duration','8.4s')
          stopBall()
          showText("ready",false)
          gameState = "ready"
        }, 1500)
    }
  }
  resetBoard()


  //function gameLogic
  //checks gameState on keypress/click, if timing is correct, progress game.
  let gameLogic = function(){
    if (gameState === "donothing"){
      //do not allow clicks to do anything
    }
    else if (gameState === "gameover") {
      gameState = "welcome"
      resetBoard()
    }
    else if (gameState === "welcome") {
      gameState = "prepping"
      $('#overlay').fadeOut().children().hide()
      $('#athletic_award').fadeOut()
      resetBoard()
    }
    else if (gameState != "prepping")
      {
        //check gameState to start a bump
        //if timer is good pass, otherwise, just bump motion
        if (gameState === "bump") {
          if (gameTimer >= 140 && gameTimer <= 165){
            bumpGo();
            bump();
            if (Math.random()<.5)
              showText("perfect")
            else
              showText("great")
            gameState = "set"
            //animate setter to ready position
            setTimeout(function(){setterReady()},500);
          }
          else {
            bumpGo();
            console.log (gameTimer, gameState, winState)
            if (gameTimer > 100){
              showText("oops")
              document.querySelector('#whistle').play();
              resetBoard()
            }
          }
        }

        //check gameState for setting
        //two sets possible: standard (superb) set, or athletic roll set
        else if (gameState === "set") {
          if (gameTimer> 275 && gameTimer < 290) {
          setGo(false)
          set()
          nInterval = setInterval(moveMan, 60)
          setterReset(700)
          gameState = "attack"
         }

        //second setter check, low set
         else if (gameTimer>= 290 && gameTimer <= 300)  {
          setGo(true)
          $("#athletic_award").show()
          nInterval = setInterval(moveMan, 60)
          athleticSet()
          setterReset(700)
          gameState = "attack"
         }

         else if (gameTimer > 200) {
            setterReset(100)
            showText("tweet")
            document.querySelector('#whistle').play();
            resetBoard()
         }
        }

        //check timer for attack
       else if (gameTimer >= 360 && gameTimer <= 387 && gameState === "attack") {
          attack()
          if (Math.random()<.5)
            showText("bash")
          else
            showText("bounce")
          winState = true
          numWins += 1
          document.querySelector('#attack_win').play();
          updateScore()
          resetBoard()
        }


       else if (gameState === "ready") {
          setTimeout(serve(), 200)
          showText("ballup")
          gameState = "bump"
        }

       else {
          console.log (gameTimer, gameState, winState)
          if (gameTimer > 100){
          showText("oops")
          document.querySelector('#whistle').play();
          resetBoard()
         }
        }
      }

  }




  //Prevent events from firing multiple times if key is held down (answer #2 on stackoverflow)
  //http://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript
  let keyIsDown = 0;
  let mouseIsUp = true;

  //gameStates are: ready, serve, bump, set, attack
  $(document).keydown(function(e){
    console.log(e.which)
    if (keyIsDown || !mouseIsUp) return false;
    else {
      gameLogic()
      keyIsDown++
    }
  })

  $(document).keyup(function(e){
    keyIsDown--
    if (mouseIsUp && !keyIsDown)
      setTimeout(bumpStop(), 200)

  })

  $(document).mousedown(function(e){
    mouseIsDown = true
    if (keyIsDown) return false;
    gameLogic()
  })

  $(document).mouseup(function(e){
    mouseIsUp = true;
    if (!keyIsDown)
      setTimeout(bumpStop(), 200)
  })
/*
7/4/25 remove touchstart and touchend event listeners.  mousedown should already trigger event on mobile.

  document.addEventListener('touchstart', function(){
      mouseIsDown = true
    if (keyIsDown) return false;
    gameLogic()
  }, false);
document.addEventListener('touchend', function(){
    mouseIsUp = true;
    if (!keyIsDown)
      setTimeout(bumpStop(), 200)
  }, false);
*/

