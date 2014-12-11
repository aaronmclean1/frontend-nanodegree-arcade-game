var Engine = (function(global) {
	var doc = global.document,
		win = global.window,
		canvas = doc.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		lastTime;
		
	//Build a player, Build 3 Enemies for the 3 rock paths
	//Initialize();

	canvas.width = 505,
	canvas.height = 606,
	doc.body.appendChild(canvas);


	/* This function serves as the kickoff point for the game loop itself
	 * and handles properly calling the update and render methods.
	 */
	function main() 
	{
		var now = Date.now(),
			dt = (now - lastTime) / 1000.0;

		/* Call our update/render functions, pass along the time delta to
		 * our update function since it may be used for smooth animation.
		 */
		update(dt);
		render();

		/* Set our lastTime variable which is used to determine the time delta
		 * for the next time this function is called.
		 */
		lastTime = now;

		/* Use the browser's requestAnimationFrame function to call this
		 * function again as soon as the browser is able to draw another frame.
		 */
		win.requestAnimationFrame(main);		
	};

	//This function does some initial setup
	function init() 
	{	
		//Build a player, 
		this.player = new Player(2,4);
		
		//Build 3 Enemies for the 3 rock paths
		allEnemies = [];

		for (var i = 1; i < 4; ++i) 
		{	
			var enemy = new Enemy(1,i,i);
			allEnemies.push(enemy);	
		}
		
		lastTime = Date.now();
		main();
	}

	/* This function is called by main (our game loop) and itself calls all
	 * of the functions which may need to update entity's data. 
	 */
	function update(dt) 
	{
		//move enemies across the screen
		updateEntities(dt);
		
		//check to see if an ememy and player are touching. If so reset the player
		checkCollisions();
	}
	
	function checkCollisions()
	{
		//loop through all enemies so we can find their location
		allEnemies.forEach(function(enemy) 
		{
			//see if an enemy is touching a player
			if((Math.abs(+enemy.x.toFixed(1) - this.player.x ) < .8) && (this.player.y === enemy.y))
			{
				//if enemy is touching a player send the player back to the start and take away a life
				this.player.x = 2;
				this.player.y = 5;
				this.player.lives--;				
				
				//if player is out of lives start game over
				if(this.player.lives == 0)
				{					
					pickPlayer = true;
					this.player.y = 5;	
					this.player.lives = 3;
					this.player.level = 1;
				}
			}
		});	
	}

	function updateEntities(dt) 
	{
		//this controls the enemy movement
		allEnemies.forEach(function(enemy) 
		{
			enemy.update(dt);
		});		
	}

	function render() {

		var rowImages = 
			[
				'images/water-block.png',   // Top row is water
				'images/stone-block.png',   // Row 1 of 3 of stone
				'images/stone-block.png',   // Row 2 of 3 of stone
				'images/stone-block.png',   // Row 3 of 3 of stone
				'images/grass-block.png',   // Row 1 of 2 of grass
				'images/grass-block.png'	// Row 2 of 2 of grass
			],
			numRows = 6,
			numCols = 5,
			row, col;

		/* Loop through the number of rows and columns we've defined above
		 * and, using the rowImages array, draw the correct image for that
		 * portion of the "grid"
		 */
		for (row = 0; row < numRows; row++) 
		{
			for (col = 0; col < numCols; col++) 
			{
				/* The drawImage function of the canvas' context element
				 * requires 3 parameters: the image to draw, the x coordinate
				 * to start drawing and the y coordinate to start drawing.
				 * We're using our Resources helpers to refer to our images
				 * so that we get the benefits of caching these images, since
				 * we're using them over and over.
				 */
				ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);				
			}
		}


		renderEntities();
	}

	/* This function is called by the render function and is called on each game
	 * tick. It's purpose is to then call the render functions you have defined
	 * on your enemy and player entities within app.js
	 */
	function renderEntities() 
	{
		/* Loop through all of the objects within the allEnemies array and call
		 * the render function you have defined.
		 */
		allEnemies.forEach(function(enemy) 
		{
			enemy.render();
		});

		player.render();
	}



	/* Go ahead and load all of the images we know we're going to need to
	 * draw our game level. Then set init as the callback method, so that when
	 * all of these images are properly loaded our game will start.
	 */
	Resources.load
	(
		[
		'images/stone-block.png',
		'images/water-block.png',
		'images/grass-block.png',
		'images/enemy-bug.png',
		'images/char-boy.png',
		'images/Selector.png',
		'images/char-boy.png',
		'images/char-cat-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-princess-girl.png'		
		]
	);
	Resources.onReady(init);

	/* Assign the canvas' context object to the global variable (the window
	 * object when run in a browser) so that developer's can use it more easily
	 * from within their app.js files.
	 */
	global.ctx = ctx;
})(this);



