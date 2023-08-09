# pong_clone
pong clone in vanilla javascript 

basic canvas game

the ball appear on start button

the ball speed increases on every touch with one of the paddels

move the paddels left with A and Y key.
move the paddels right with A and Y key.




how it works in js:

Code:

main.js:

line 01 - 56 :
get the canvas and
declare the main objects variables

line 58 - 63:
declare a function to clear the canvas after every (intervall) animation frame

line 66- 79:
draw the paddles on canvas

line 82-92:
draw a center line in the middle of the canvas for the table field

line 95-117:
creat the ball values random direction, speed and tell js where they are on the canvas
here you invoke an random direction for every new ball

line 120-125:
x and y position of the ball gets pointed to the ball direction -> with adding the direction and the ball speed

line 128-139:
draw the ball

line 142-201:
check the collison -> 
when you track the x,y positions of every object on the canvas. like you do with for example ballX.
then you can define the outer borders of each object by define the measures of width or height with x, y, width and height
values. 
when done you change the direction of x, y direction for the collison objects.
thats it...

line 204-228
update score function.

line 232-245
update animation function. 
put the functions in an interval inside a variable so you can invoke it somewehre else 
-> here in the gamestart function


line 249-255
gameStart get the update and draw ball function

line 257-287
reset...cancel the interval and set all main values back to the starting point.

line 290-404
set the event listeners to the keys and the buttons..
add the functions for direction change and active color change with a switch method

thats it have fun!



