var pickPlayer = true;

var characterPngs = 
[
'images/char-boy.png',
'images/char-cat-girl.png',
'images/char-horn-girl.png',
'images/char-pink-girl.png',
'images/char-princess-girl.png'
];	
	

// Enemies our player must avoid
var Enemy = function(x, y, speed) 
{
	this.sprite = 'images/enemy-bug.png';
	this.speed = speed;
	this.x = x;
	this.y = y;   
	
}

// Update the enemy's position
Enemy.prototype.update = function(dt) 
{
	//moving the enemy by speed and level of the game. The higher the level the faster the enemies move, the harder the game.
	this.x += this.speed * dt * player.level;
	
	if( this.x > 6)
	{
		this.x = -1;		
	}   
}

// Draw the enemy on the screen
Enemy.prototype.render = function()
{	   
	ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 20);	
}

//Set default params for a player
var Player = function(x,y) 
{	
	this.lives = 3;
	this.level = 1;
	this.x = x;
	this.y = y;   	
}

//draw the players on the screen
Player.prototype.render = function(x,y)
{	
	//pick a player at the beginning of the game
	if (pickPlayer == true)
	{	
		//print some instructions to the screen for the user
		ctx.font = "38px Arial";
		ctx.fillStyle = 'green';	
		ctx.fillText("Let's Go For A Swim!",70,187);
		ctx.fillText("Select A Player And Hit Enter",5,267);
		ctx.fillText("Use The Arrow Keys To Move",0,347);
		
		//draw selector png in the middle bottom of screen
		this.y = 5;
		ctx.drawImage(Resources.get('images/Selector.png'), this.x * 101, this.y * 83 - 20);

		//draw characters on screen
		for (var i = 0; i < characterPngs.length; i++)
		{
			ctx.drawImage(Resources.get(characterPngs[i]), i * 101, this.y * 83 - 20);
		}
	} 
	
	// if not beginning of game then draw the normal player, lives, and level
	else
	{
		ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 20);		
		ctx.font = "18px Arial";
		ctx.fillStyle = 'black';		
		ctx.fillText("Level: " + player.level,10,580);		
		ctx.fillText("Lives: " + player.lives,110,580);		
	}
}

//this code executes based on what key the user pressed
Player.prototype.handleInput = function (key) 
{
	switch (key) 
	{
		//if the user pressed the left keyboard button move player left one x value
		case 'left':
			if (this.x > 0) 
			{
				this.x--;
			}
			break;
		//if the user pressed the up keyboard button move player up one y value		
		case 'up':			
			if (this.y > 0) 
			{
				this.y--;
			}
			//if the player made it to the top of the screen increment the Level value, clear the screen (due to the players big heads), and move player back to bottom of screen
			else
			{
				ctx.clearRect(0, 0, 500, 600);				
				player.level++;
				this.y = 5;				
			}			
			break;
		//if the user pressed the right keyboard button move player right one x value
		case 'right':
			if (this.x < 4) 
			{
				this.x++;
			}
			break;
		//if the user pressed the down keyboard button move player down one y value				
		case 'down':
			if (this.y < 5) 
			{
				this.y++;
			}
			break;
		//used to select a player
		case 'enter':			
			pickPlayer = false;
			this.y = 5;
			this.sprite = characterPngs[this.x];			   
			break;
		//used to quit and restart game
		case 'quit':
			pickPlayer = true;
			this.player.y = 5;	
			player.lives = 3;
			player.level = 1;
			break;			
		default:
			break;
	} 

};

//listen for these keys to be pressed
document.addEventListener
('keydown', function(e) 
	{
		var allowedKeys = 
		{
					13: 'enter',
					37: 'left',
					38: 'up',
					39: 'right',
					40: 'down',
					81: 'quit'
		};

		player.handleInput(allowedKeys[e.keyCode]);
	}
);	