window.onload = function () {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	//Variaveis para o jogo:
	snake = [];
	positionX = 10;
	positionY = 10;
	foodX = 15;
	foodY = 15;
	velX = 0;
	velY = 0;
	grid = 20;
	tam = 2;

	//Chamando a função jogo a cada 100 milisegundos:
	setInterval(jogo, 100);

	//Controles:
	document.addEventListener("keydown", function (e) {
		switch (e.keyCode) {
			// Seta direita = 39
			case 39:
				if (velX !== -1) {
					// Verifica se não está indo para a esquerda
					velX = 1;
					velY = 0;
				}
				break;
			// Seta esquerda = 37
			case 37:
				if (velX !== 1) {
					// Verifica se não está indo para a direita
					velX = -1;
					velY = 0;
				}
				break;
			// Seta pra cima = 38
			case 38:
				if (velY !== 1) {
					velX = 0;
					velY = -1;
					break;
				}
			// Seta pra baixo = 40
			case 40:
				if (velY !== -1) {
					velX = 0;
					velY = 1;
					break;
				}
		}
	});
};

function jogo() {
	//Config da tela:
	ctx.fillStyle = "#2980b9";

	//Distancia da borda horizontal, distancia da borda vertical, largura, altura
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//Deslocamento da cobra:
	positionX += velX;
	positionY += velY;

	//Espelhamento da cobra:
	if (positionX < 0) {
		positionX = grid;
	}

	if (positionX > grid) {
		positionX = -1;
	}

	if (positionY < 0) {
		positionY = grid;
	}

	if (positionY > grid) {
		positionY = -1;
	}

	//Configurando a cobra:
	ctx.fillStyle = "#00f102";
	for (let i = 0; i < snake.length; i++) {
		ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 1, grid - 1);
		if (snake[i].x == positionX && snake[i].y == positionY && tam > 2) {
			alert("Morreu, clique no 'ok' para reiniciar");
			tam = 2;
		}
	}

	//Posição da cobra:
	snake.push({ x: positionX, y: positionY });

	//Apagando a cobra:
	while (snake.length > tam) {
		snake.shift();
	}

	//Configurando comida:
	ctx.fillStyle = "#f1c40f";
	ctx.fillRect(foodX * grid, foodY * grid, grid - 1, grid - 1);

	//Comendo a comida:
	if (positionX == foodX && positionY == foodY) {
		tam++;
		foodX = Math.floor(Math.random() * grid);
		foodY = Math.floor(Math.random() * grid);
	}

	//Para mostrar os pontos na tela conforme vai pegando comida
	var pontos = document.getElementById("pontos");
	pontos.textContent = `Pontos: ${tam - 2}`;
}
