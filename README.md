# Bump, Set, Bash!

![alt tag](https://media.tenor.co/images/e389808cf8a8536e6a1deb55ddcd3c64/raw)

## Introduction
Thanks for checking out Bump, Set, Bash!  
The game of volleyball is played by serving a ball into the opponents' court.  Each team then has three hits to return the ball in attempt to land the ball in the opponent's court.  Play continues until the ball hits the ground or a fault occurs.

## Approach Taken and Planning Phase
Much of my initial focus was animating the sprites to mimic realistic volleyball physiology using retro 8-bit graphics.  I found a simple skeleton with several positions and then sketched which movements needed to be put in what order to create movement.  The main player goes through bumping and attacking motions, while the setter can undergo one of two setting movements.
Once the player animations were finalized, a ball was added.  Again, I wanted the ball to move in realistics directions, so I worked with a script that models simple physics [see Ball Physics under works cited].  The ball's position and velocity are established at given points in the game (serving, bumping, setting, and attacking), and using formulas for acceleration and drag, the ball appears to move in realistic arcs over the course of a given interval.  The script also accounts for collisions when the ball bounces off the ground or border of the playing area.
Once the animations were complete, I added a behind-the-scene counter to time the flow from the beginning to end of a single point.  The game logic uses this timer to determine if a mouse or click happens at an appropriate time, and the progresses animations and game states along if so.
Other graphic elements such as the court, alert messages, fans in the bleachers, scoreboard, and whistle were also added.


## Instructions
In Bump, Set, Bash, you control the actions of a single team.  By timing your mouse click or button press, you can bump, set, and attack the ball.  Attack the ball 10 times and win the game!  If your timing is off, you'll get a whistle tweet... but no worries, you can try again.

## Technologies Used
CSS Keyframe Animations and spritesheets
Javascript intervals and timers
jQuery DOM manipulation

## Installation
Bump, Set, Spike is intended for online play and can be found at https://jdneb220.github.io

## Unsolved Problems
- The crowd will slowly increase jumping intensity as the game progresses, and jump together when the game is over.  Because there are intervals running at the time the game ends, the timing is slightly off.
- When the crowd reaches maximum intensity, the game experiences slowdown due the fequency of the bounceFan interval.  Optimizing the approach should reduce lag.


## Sources Cited
Ball Physics:
https://www.burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/

Sprites:
http://pfunked.deviantart.com/art/Sprite-Sheet-test-80837813
http://geminid.tumblr.com/post/133234850046/the-haikyuu-pixel-masterpost-here-i-will-update

Whistle Sound FX:
http://www.mobcup.net/browse/ringtones/mp3/0/downloads/chirp

8-Bit Texts:
https://textcraft.net/

Repeating Key Down Fix:
http://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript


```javascript

  let volleyball = {
    why: "fun",
    rules: "time your bump, set, attack to the ball"
    how: ["spacebar/mouse to perform action",
    "timing is everything",
    "special messages for good timing!"]
  }

```

