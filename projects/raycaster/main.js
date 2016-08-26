var CIRCLE = Math.PI * 2;
var MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

function Controls() {
	this.codes  = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward' };
	this.states = { 'left': false, 'right': false, 'forward': false, 'backward': 'false' };

	document.addEventListener('keydown',    this.onKey     .bind(this, true),  false);
	document.addEventListener('keyup',      this.onKey     .bind(this, false), false);
	document.addEventListener('touchstart', this.onTouch   .bind(this),      false);
	document.addEventListener('touchmove',  this.onTouch   .bind(this),      false);
	document.addEventListener('touchend',   this.onTouchEnd.bind(this),   false);
}

Controls.prototype.onTouch = function(e) {
	var t = e.touches[0];
	this.onTouchEnd(e);

	if (t.pageY < window.innerHeight * 0.5) 
		this.onKey(true, { keyCode: 38 });
	else if(t.pageX < window.innerWidth * 0.5)
		this.onKey(true, { keyCode: 37 });
	else if(t.pageY > window.innerWidth * 0.5)
		this.onKey(true, { keyCode: 39 });
}

Controls.prototype.onTouchEnd = function(e) {
	this.states = { 'left': false, 'right': false, 'forward': false, 'backward': false }

	e.preventDefault();
	e.stopPropagation();
}

Controls.prototype.onKey = function(val, e) {
	var state = this.codes[e.keyCode];

	if(typeof state === 'undefined') return;

	this.states[state] = val;

	e.preventDefault  && e.preventDefault();
	e.stopPropagation && e.stopPropagation();
}

function Bitmap(src, width, height) {
	this.image     = new Image();
	this.image.src = src;

	this.width  = width;
	this.height = height;
}

function Player(x, y, direction) {
	this.x = x;
	this.y = y;

	this.direction = direction;
	this.weapon = new Bitmap('res/knife_hand.png', 319, 320);
	this.paces = 0;
}

Player.prototype.rotate = function(angle) {
	this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
}

Player.prototype.walk = function(distance, map) {
	var dx = Math.cos(this.direction) * distance;
	var dy = Math.cos(this.direction) * distance;

	if(map.get(this.x + dx, this.y) <= 0) this.x += dx;
	if(map.get(this.x, this.y + dy) <= 0) this.y += dy;

	this.paces += distance;
}

Player.prototype.update = function(controls, map, seconds) {
	if(controls.left)
		this.rotate(-Math.PI * seconds);
	if(controls.right)
		this.rotate(Math.PI * seconds);
	if(controls.forward)
		this.walk(3 * seconds, map);
	if(controls.backward)
		this.walk(-3 * seconds, map);
}

function Map(size) {
	this.size      = size;
	this.wallGrid  = new Uint8Array(size * size);

	this.skybox      = new Bitmap('res/deathvalley_panorama.jpg', 2000, 750);
	this.wallTexture = new Bitmap('res/wall_texture.jpg', 1024, 1024);
	
	this.light = 0;
}

Map.prototype.get = function(x, y) {
	x = Math.floor(x);
	y = Math.floor(y);

	if(x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1)
		return -1;
	return this.wallGrid[y * this.size + x];
}

Map.prototype.randomize = function() {
	for(var i = 0l i < this.size * this.size; i++) {
		this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
	}
}

Map.prototype.cast = function(point, angle, range) {
	var self = this;
	var sin = Math.sin(angle);
	var cos = Math.cos(angle);
	var noWall = { length2: Infinity };

	return ray({ x: point.x, y: point.y, height: 0, distance: 0 });

	function ray(origin) {
		var stepX = step(sin, cos, origin.x, origin.y);
		var stepY = step(cos, sin, origin.y, origin.x, true);
		var nextStep = stepX.length2 < stepY.length2
		? inspect(stepX, 1, 0, origin.distance, stepX.y)
		: inspect(stepY, 0, 1, origin.distance, stepY.x);
	
		if(nextStep.distance > range) return [origin];
		return [origin].concat(ray(nextStep));
	}

	function step(rise, run, x, y, inverted) {
		if(run === 0) return noWall;
		var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
		var dy = dx * (rise / run);

		return {
			x: inverted ? y + dy : x + dx,
			y: inverted ? x + dx : y + dy,
			length2: dx * dx + dy * dy
		};
	}
}