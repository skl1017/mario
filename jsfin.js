// Classe Obstacle, pour la gestion des collisions (rectangle / rectangle => collision()
// point / rectangle => getDistanceX() et getDistanceY() ....
// Auteur : Olivier Le Cadet

function Obstacle (p_x,p_y,p_largeur,p_hauteur) {
	
	// variables de classe. Position et dimensions de l'obstacle.
	this.x = p_x;
	this.y = p_y;
	this.hauteur = p_hauteur;
	this.largeur = p_largeur;
	
	// Pour savoir si le point de coordonnées 
	// (a,b) est compris dans la zone interdite par
	// la présence de l'obstacle
	Obstacle.prototype.notAllowed = function(a,b){
		if (a>=this.x&&a<=this.x+this.largeur&&b>=this.y&&b<=this.y+this.hauteur)
			return true;
		else	
			return false;
	};
	
	// Distance euclidienne 
	// entre l'obstacle et un point de coordonnées (a,b)
	Obstacle.prototype.getDistanceEuclidienne = function(a,b){
		if (a<this.x&&b<this.y)
			return Math.sqrt((this.x-a)^2+(this.y-b)^2);
		else if (a>=this.x&&a<=this.x+this.largeur&&b<this.y)
			return this.y-b;
		else if (a>this.x+this.largeur&&b<this.y)
			return Math.sqrt((this.x+this.largeur-a)^2+(this.y-b)^2);
		else if (a>=this.x+this.largeur&&b>=this.y&&b<=this.y+this.hauteur)
			return a-this.x-this.largeur;
		else if (a>this.x+this.largeur&&b>this.y+this.hauteur)
			return Math.sqrt((this.x+this.largeur-a)^2+(this.y+this.hauteur-b)^2);
		else if (a>=this.x&&a<=this.x+this.largeur&&b>this.y+this.hauteur)
			return b-this.y-this.hauteur;
		else if (a<this.x&&b>this.y+this.hauteur)
			return Math.sqrt((this.x-a)^2+(this.y+this.hauteur-b)^2);
		else
			return this.x-a;
	};
	
	// Retourne la distance à l'obstacle d'un point de 
	// coordonnées (a,b) suivant l'axe des abscisses (prolection
	//horizontale)
	// ou l'opposé de la distance si on se trouve à droite de 
	// l'obstacle
	Obstacle.prototype.getDistanceX = function(a,b){
		if (a<this.x)
			return this.x-a;
		else if (a>this.x+this.largeur)
			return this.x+this.largeur-a;
		else
			return 0;
	};
	
	// Retourne la distance à l'obstacle d'un point de 
	// coordonnées (a,b) suivant l'axe des ordonnées (projection
	//verticale)
	// ou l'opposé de la distance si on se trouve en bas de 
	// l'obstacle
	Obstacle.prototype.getDistanceY = function(a,b){
		if (b<this.y)
			return this.y-b;
		else if (b>this.y+this.hauteur)
			return this.y+this.hauteur-b;
		else
			return 0;
	};
	
	Obstacle.prototype.toString = function(){
		console.log("position :"+this.x+","+this.y+". Dimensions : "+this.largeur+","+this.hauteur);
	};
	// Collision: collision entre deux rectangles (AABB-AABB)
	// Fonction qui retourne true s'il y a collision entre l'obstacle
	// et un autre rectangle de coin supérieur gauche de coordonnées
	// (x,y) et de largeur l et hauteur h
	Obstacle.prototype.collision = function(x2,y2,l,h){
		if (this.x-x2>l||this.y-y2>h||x2-this.x>this.largeur||y2-this.y>this.hauteur)
			return false;
		else
			return true;
	};
	
		
	
	
	
	
}

function Clavier () {
	
	// console.log('----- class.clavier.js');
	
	var HAUT					= 38;
	var DROITE					= 39;
	var BAS						= 40;
	var GAUCHE					= 37;
	var ESPACE                  = 32;
	
	var _touche					= this;
	_touche.press				= false;
	_touche.haut				= false;
	_touche.droite				= false;
	_touche.bas					= false;
	_touche.gauche				= false;
	_touche.espace				= false;
	
	var _evt					= null;
	var _statut					= false;
	
	document.onkeydown = function (evt) {
		_evt = evt || window.event;
		// console.log('document.onkeydown ' + _evt.keyCode);
		touche(_evt.keyCode, _evt.type);
	};
	
	document.onkeyup = function (evt) {
		_evt = evt || window.event;
		touche(_evt.keyCode, _evt.type);
	};
	
	// METHODES
	
	function touche(code, statut) {
		
		_statut = false;
		if (statut == 'keydown') {
			_statut				= true;
		};
		
		switch (code) {
			case HAUT :
				_touche.press	= _statut;
				_touche.haut	= _statut;
				break;
			case DROITE :
				_touche.press	= _statut;
				_touche.droite	= _statut;
				break;
			case BAS :
				_touche.press	= _statut;
				_touche.bas		= _statut;
				break;
			case GAUCHE :
				_touche.press	= _statut;
				_touche.gauche	= _statut;
				break;
			case ESPACE :
				_touche.press	= _statut;
				_touche.espace	= _statut;
				break;
			default :
				break;
		};
	};
	
};

// JavaScript Document

window.onload = function(){		
	var canvas					= document.getElementById('canvas');
	var ctx      				= canvas.getContext('2d');
	var clavier  = new Clavier();
	var fond = new Image();
	var fond2 = new Image();
	var perso = new Image();
	var portal = new Image();
	var coin = new Image();
	// Chargement de l'image
	fond.src                    = 'decor.png';    
	perso.src				= 'angel.png';// Path par rapport au document HTML, pas par rapport au document JS

	

		
	var portal2 = new Obstacle(10, 300, 50, 50);
	var coin2 = new Obstacle(400, 300, 30, 30);
	var plateforme = new Obstacle(450,241,112,25);
	var sol = new Obstacle(0,342,800,30);
	var x = 100;
	var y = 30;
	var yinit = 30;
	var droite = true;
	var compteur = 0;
	var pas = 0;
	var telep = false;
	var ramasse_coin = false;
	var gravite = false; //pour savoir si on est en train de tomber. On ne saute pas.
	//var theta = 0; // Pour faire tourner
	fond.onload = function(){

		setInterval(boucle,20); //FPS : 1000/20
		

	}

	function boucle(){
		/***** on positionne les variables ****/
		//theta = theta +0.2;

		if (clavier.droite){
			if (!plateforme.collision(x+3,y,32,64))
				x=x+3;
			pas++;droite=true;
			
		}
		else if(clavier.gauche){ 
			if (!plateforme.collision(x-3,y,32,64))
				x=x-3;	
			pas++;	droite = false;
		}
		if (!sol.collision(x,y+6,32,64)&&!plateforme.collision(x,y+6,32,64)){
			y=y*1.05; //gravité avec accélération
		    //y=y+5 par ex pour une gravité à vitesse constante
		    gravite = true;
		}
		else 
			gravite = false;
		if (clavier.haut && compteur<=0&&!gravite){
			yinit = y;
			compteur = 40;
		}

		if (compteur>=0){
			if (compteur >20 && plateforme.collision(x,y-5,32,64)) 
					compteur = 40-compteur; // le perso vient de 
				//se cogner la tête on va directement à la fin du saut
				// pour le faire retomber
			else if (compteur > 20 || !plateforme.collision(x,y+15,32,64))
				y=yinit+ (20-compteur)*(20-compteur)/4*1.5-150;
			//on ne fait pas évoluer l'équation si dans la deuxième partie du 
			// saut on a collision vers le bas avec la plateforme.
			compteur--;
			if (droite)
				if (!plateforme.collision(x+1,y,32,64))
					x++;
			else
				if (!plateforme.collision(x-1,y,32,64))
					x--;
		}
		if (pas>=3)
			pas=0;

		if (coin2.collision(x,y,32,64)&&ramasse_coin==false){
			ramasse_coin = true;
			pick.play();
		}
		if (portal2.collision(x,y,32,64))
			telep = true;
        /***** Les fonctions de dessin ********/
		ctx.save();
		if (telep ==false)
			ctx.drawImage(fond,0,0,600,400);
		else
			ctx.drawImage(fond2,0,0,600,400);
		if (ramasse_coin==false)
			ctx.drawImage(coin, 400,300, 30,30);
		if (telep==false)
			ctx.drawImage(portal, 10, 300, 50, 50);
		//ctx.fillRect(450,241,112,25);
		ctx.translate(x+16,y+32); //
		//ctx.rotate(theta); scale(), ...
		if (!droite)
			ctx.scale(-1,1)
		
		ctx.drawImage(perso,pas*48,64,48,64,-16,-64,48,64);
		ctx.restore();
	}
	
}	
	


