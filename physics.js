/* Burak Kanber */

// https://www.burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/

  let width = 1100;
  let height = 800;
  let frameRate = 1/80; // Seconds
  let frameDelay = frameRate * 1000; // ms
  let loopTimer = false;

  let ball = {
      position: {x: width/2, y: 0},
      velocity: {x: 10, y: 0},
      mass: 0.27, //kg
      radius: 15, // 1px = 1cm
      restitution: -0.85
      };

  let Cd = 0.47;  // Dimensionless
  let rho = 1.22; // kg / m^3
  let A = Math.PI * ball.radius * ball.radius / (10000); // m^2
  let ag = 9.81;  // m / s^2


  let serve = function() {
      ball.velocity.x = -5.4
      ball.velocity.y = -12
      ball.position.x = 1032
      ball.position.y = 536
      startBall()
  }

  let bump = function() {
      ball.velocity.x = 1.6
      ball.velocity.y = -8.2
      ball.position.x = 272
      ball.position.y = 522
      $('.ball').css('animation-duration','.2s');
      console.log (gameState, gameTimer, bounce);
  }


  let set = function() {
      ball.velocity.x = 517
      ball.velocity.y = 670
      ball.velocity.x = .6
      ball.velocity.y = -10.5
      $('.ball').css('animation-duration','12s');
      console.log(ball.position.x,ball.position.y)
      console.log (gameState, gameTimer, bounce);
  }

  let athleticSet = function() {
      ball.velocity.x = .55
      ball.velocity.y = -11.2
      $('.ball').css('animation-duration','5s');
      console.log (gameState, gameTimer, bounce);
  }

  let attack = function() {
      ball.velocity.x = 20
      ball.velocity.y = 15
      ball.position.x = 577
      ball.position.y = 309
      console.log (gameState, gameTimer, bounce);
  }

  let stopBall = function(){
    clearInterval(loopTimer)
    loopTimer = false
    gameTimer = 0
  }

  let startBall = function(){
    gameTimer = 0
    bounce = 0
    winState = false
    if (!loopTimer){
      loopTimer = setInterval(loop, frameDelay);
    }
  }


  let loop = function() {
    if (!winState)
      gameTimer++;
    //console.log(gameTimer, gameState, ball.velocity.x, ball.velocity.y, ball.position.x, ball.position.y)





          // Do physics
              // Drag force: Fd = -1/2 * Cd * A * rho * v * v
          let Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
          let Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

          Fx = (isNaN(Fx) ? 0 : Fx);
          Fy = (isNaN(Fy) ? 0 : Fy);

              // Calculate acceleration ( F = ma )
          let ax = Fx / ball.mass;
          let ay = ag + (Fy / ball.mass);
              // Integrate to get velocity
          ball.velocity.x += ax*frameRate;
          ball.velocity.y += ay*frameRate;

              // Integrate to get position
          ball.position.x += ball.velocity.x*frameRate*100;
          ball.position.y += ball.velocity.y*frameRate*100;

      // Handle collisions
      if (ball.position.y > height - ball.radius) {
          ball.velocity.y *= ball.restitution;
          ball.position.y = height - ball.radius;
          bounce++;
          console.log("hit the ground time:" + gameTimer)
          if (bounce === 1 && !winState && gameState != "prepping"){
            showText('oops')
            document.querySelector('#whistle').play();
            resetBoard()
          }
          if (bounce >= 30){
            stopBall()
            bounce = 0
          }
      }
      if (ball.position.x > width - ball.radius) {
          ball.velocity.x *= ball.restitution;
          ball.position.x = width - ball.radius;
      }
      if (ball.position.x < ball.radius) {
          ball.velocity.x *= ball.restitution;
          ball.position.x = ball.radius;
      }
      // Draw the ball

      $('.ball').css('left', Math.floor(ball.position.x) + 'px')
      $('.ball').css('top', Math.floor(ball.position.y) + 'px');


  }


