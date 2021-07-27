var banner = document.querySelector('.start')
var flappy = document.querySelector('#banner')
var button = document.querySelector('.play-button')
var ready = document.querySelector('#ready')

var board = document.querySelector(".game-container")
var bird = document.querySelector(".bird")
var pipe1 = document.querySelector(".pipe1")
var pipe2 = document.querySelector(".pipe2")
var gap = document.querySelector(".gap")
var birdImage = document.getElementById("bird-img")
var scoreContainer = document.querySelector(".score-text")
var gravity = 10
var birdpos = parseInt(window.getComputedStyle(bird).getPropertyValue("top"))
var birdFlyTop = 20
var birdFlyNumber = 10
var t = 0
var isFlying = false
var bird_top_text = ''
var bird_top = 0
var pipe_height = 0
var gappos = 0
var pipepos = 0
var score = 0
var gameOver = false
var backPos = 0
var gameLoop = 0

function playClicked(){
	score = 0
	banner.style.display = 'none'
	board.style.display = 'block'
	gameLoop = setInterval(birdFall,30)
	
}

function init(){
	score = 0
	banner.style.display = 'block'
	board.style.display = 'none'
	bird.style.top = '200px'
	scoreContainer.innerHTML = '0'
}


function getBirdPos(){
	return parseInt(window.getComputedStyle(bird).getPropertyValue("top"))
}

function getGapPos(){
	return [parseInt(window.getComputedStyle(gap).getPropertyValue("left")),
	parseInt(window.getComputedStyle(pipe1).getPropertyValue("height"))]
}
function getPipePos(){
	return parseInt(window.getComputedStyle(pipe1).getPropertyValue("left"))
}


function birdFall(){
	checkCollision()
	birdpos = getBirdPos()	
	birdpos = birdpos + gravity
	bird.style.top = birdpos+"px"
	birdImage.classList.add('bird-anim-fall')
	console.log(gameOver)
}

document.addEventListener("keydown",(e) => {
	birdpos = getBirdPos()	
	if((birdpos >= 50)&&(e.keyCode == 32)){
		if(isFlying){
			clearInterval(birdjump)
		}
		clearInterval(gameLoop)
		birdFly()
	}	
})

pipe1.addEventListener('animationiteration',() => {
	pipe_height = Math.random()*400 + 50
	pipe1.style.height = pipe_height+"px"
	backPos = pipe_height-460
	pipe1.style.backgroundPositionY = backPos+'px'
	scoreIncrease()
})
function birdFly(){
	checkCollision() 
	if(gameOver){
		gameLoop = setInterval(birdFall,30)
		return
	}
	birdpos = getBirdPos()	
	birdImage.classList.add('bird-anim-fly')
	setTimeout(() => {
		birdImage.classList.remove('bird-anim-fly')
		birdImage.classList.remove('bird-anim-fall')

	},110) 
 
	var birdjump = setInterval(function(){
		isFlying = true
		birdpos -= birdFlyTop
		bird.style.top = birdpos+"px"
		birdFlyNumber = birdFlyNumber - 1 
		birdFlyTop = birdFlyTop - 1
		if(birdFlyNumber <= 0){
			birdFlyNumber = 10
			birdFlyTop = 20
			clearInterval(birdjump)
			isFlying = false
			gameLoop = setInterval(birdFall, 30)
		}
	},35)
}


function checkCollision(){

	gappos = getGapPos()
	birdpos = getBirdPos()
	if(gappos[0]<=100){
		if((gappos[1]>birdpos)||((gappos[1]+200)<birdpos)){
			console.log('game over')
			alert('Game Over'+ '\r\n'+'Score is '+score)
			score = 0
			clearInterval(gameLoop)
			init()
			
		}
	}
	if(birdpos >= 750){
		console.log('game over')
			alert('Game Over'+ '\r\n'+'Score is '+score)

			score = 0
			clearInterval(gameLoop)
			init()

	}
}

function scoreIncrease(){
	score = score+1
	scoreContainer.innerHTML = score
}
