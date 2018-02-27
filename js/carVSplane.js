var INTERVAL_VALUE = 3;
var car;
var plane;
var carPoint;
var obstacle;
var obstacle2;
var rocket;
var rocket2;
var score;
var background;
var message;
var messageEl = document.getElementById('message');

function startGame() {
	car = new component(130, 70, "img/car.png", 10, 350, "car");
	plane = new component(200, 137, "img/plane.png", 10, 150, "plane");
	carPoint = new component(77, 0, "img/point.png", 36, 413, "carPoint");
	planePoint = new component(177, 50, "img/planePoint.png", 20, 180, "planePoint");
	obstacle = new component(103, 30, "img/obstacle.png", 700, 410, "obstacle");
	obstacle2 = new component(34, 45, "img/obstacle2.png", 500, 360, "obstacle2");
	rocket = new component(53, 25, "img/rocket.png", 750, 160, "rocket");
	rocket2 = new component(53, 25, "img/rocket.png", 450, 190, "rocket2");
	score = new component("25px", "Consolas", "black", 610, 40, "text");
	background = new component(852, 480, "img/background1.jpg", 0, 0, "background");
	gameArea.start();
}

var gameArea = {
	canvas : document.getElementById("myCanvas"),
	start : function() {
		this.context = this.canvas.getContext("2d");
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, INTERVAL_VALUE);
		window.addEventListener('keydown', function (e) {
			gameArea.keys = (gameArea.keys || []);
			gameArea.keys[e.keyCode] = (e.type == "keydown");
		})
		window.addEventListener('keyup', function (e) {
			gameArea.keys[e.keyCode] = (e.type == "keydown");            
		})
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() {
		clearInterval(this.interval);
	}
}

function component(width, height, color, x, y, type) {
	this.type = type;
	if (type) {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;    
	this.x = x;
	this.y = y;    
	this.update = function() {
		ctx = gameArea.context;
		if (this.type !== "text") {
			ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
			if (this.type == "background") {
				ctx.drawImage(this.image, 
					this.x + this.width, 
					this.y,
					this.width, this.height);
			}
		} else if (this.type == "text") {
				ctx.font = this.width + " " + this.height;
				ctx.fillStyle = color;
				ctx.fillText(this.text, this.x, this.y);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.type == "background") {
			if (this.x == -(this.width)) {
				this.x = 0;
			}
		}
		if (this.type == "obstacle") {
			if (this.x == gameArea.canvas.width - 860) {
				this.x = 800;
				this.y = Math.floor(Math.random()*(420 - 360 + 1) + 360);
			}
		}
		if (this.type == "obstacle2") {
			if (this.x == gameArea.canvas.width - 860) {
				this.x = 800;
				this.y = Math.floor(Math.random()*(410 - 370 + 1) + 370);
			}
		}
		if (this.type == "rocket") {
			if (this.x == gameArea.canvas.width - 860) {
				this.x = 800;
				this.y = Math.floor(Math.random()*(250 - 120 + 1) + 120);
			}
		}
		if (this.type == "rocket2") {
			if (this.x == gameArea.canvas.width - 860) {
				this.x = 800;
				this.y = Math.floor(Math.random()*(230 - 100 + 1) + 100);
			}
		}
		if (this.type == "car") {
			this.hitTopCar();
			this.hitBottomCar();
			this.hitLeftCar();
			this.hitRightCar();
		}
		if (this.type == "plane") {
			this.hitTopPlane();
			this.hitBottomPlane();
			this.hitLeftPlane();
			this.hitRightPlane();
		}
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) ||
			   (mytop > otherbottom) ||
			   (myright < otherleft) ||
			   (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
	this.hitBottomCar = function() {
		var roadBottom = gameArea.canvas.height - 110;
		if (this.y > roadBottom) {
			car.speedY = carPoint.speedY = 0;
			this.y = roadBottom;
		}
	}
	this.hitTopCar = function() {
		var roadTop = gameArea.canvas.height - 180;
		if (this.y < roadTop) {
			car.speedY = carPoint.speedY = 0;
			this.y = roadTop;
		}
	}
	this.hitRightCar = function() {
		var roadRight = gameArea.canvas.width - 130;
		if (this.x > roadRight) {
			car.speedX = carPoint.speedX = 0;
			this.x = roadRight;
		}
	}
	this.hitLeftCar = function() {
		var roadLeft = gameArea.canvas.width - 800;
		if (this.x < roadLeft) {
			car.speedX = carPoint.speedX = 0;
			this.x = roadLeft;
		}
	}
	this.hitBottomPlane = function() {
		var roadBottom = gameArea.canvas.height - 340;
		if (this.y > roadBottom) {
			plane.speedY = planePoint.speedY = 0;
			this.y = roadBottom;
		}
	}
	this.hitTopPlane = function() {
		var roadTop = gameArea.canvas.height - 440;
		if (this.y < roadTop) {
			plane.speedY = planePoint.speedY = 0;
			this.y = roadTop;
		}
	}
	this.hitRightPlane = function() {
		var roadRight = gameArea.canvas.width - 130;
		if (this.x > roadRight) {
			plane.speedX = planePoint.speedX = 0;
			this.x = roadRight;
		}
	}
	this.hitLeftPlane = function() {
		var roadLeft = gameArea.canvas.width - 800;
		if (this.x < roadLeft) {
			plane.speedX = planePoint.speedX = 0;
			this.x = roadLeft;
		}
	}
}

function updateGameArea() {
	if (carPoint.crashWith(obstacle) || carPoint.crashWith(obstacle2)) {
		gameArea.stop();
		message = "Plane win!";
		messageEl.innerHTML = message;
		document.getElementById('game-over').style.display = 'block';
		reset();
	} else if (planePoint.crashWith(rocket) || planePoint.crashWith(rocket2)) {
		gameArea.stop();
		message = "Car win!";
		messageEl.innerHTML = message;
		document.getElementById('game-over').style.display = 'block';
		reset();
	} else {
		gameArea.clear();
		gameArea.frameNo++;
		background.speedX = -1;
		car.speedX = 0;
		car.speedY = 0;
		carPoint.speedX = 0;
		carPoint.speedY = 0;
		plane.speedX = 0;
		plane.speedY = 0;
		planePoint.speedX = 0;
		planePoint.speedY = 0;
		if (gameArea.keys && gameArea.keys[100]) {car.speedX = carPoint.speedX = -1; }
		if (gameArea.keys && gameArea.keys[102]) {car.speedX = carPoint.speedX = 1; }
		if (gameArea.keys && gameArea.keys[104]) {car.speedY = carPoint.speedY = -1; }
		if (gameArea.keys && gameArea.keys[98]) {car.speedY = carPoint.speedY = 1; }
		if (gameArea.keys && gameArea.keys[65]) {plane.speedX = planePoint.speedX = -1; }
		if (gameArea.keys && gameArea.keys[68]) {plane.speedX = planePoint.speedX = 1; }
		if (gameArea.keys && gameArea.keys[87]) {plane.speedY = planePoint.speedY = -1; }
		if (gameArea.keys && gameArea.keys[83]) {plane.speedY = planePoint.speedY = 1; }
		background.newPos();    
		background.update();
		obstacle.newPos();
		obstacle.x--;
		obstacle.update();
		obstacle2.newPos();
		obstacle2.x--;
		obstacle2.update();
		rocket.newPos();
		rocket.x--;
		rocket.update();
		rocket2.newPos();
		rocket2.x--;
		rocket2.update();
		score.text="SCORE: " + gameArea.frameNo;
		score.update();
		car.newPos();    
		car.update();
		carPoint.newPos();
		carPoint.update();
		plane.newPos();    
		plane.update();
		planePoint.newPos();
		planePoint.update();
	}				
}

function reset() {
	document.getElementById('play-again2Player').addEventListener('click', function() {
		document.getElementById('game-over').style.display = 'none';
		clearInterval(gameArea.interval);
		startGame();
	});
}