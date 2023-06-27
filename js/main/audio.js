export const audioSettings = {
	main: new Howl({
		src: './src/main/audio/mainSound.mp3',
		html5: true,
		loop: true,
		volume: 0.7,
	}),
	select: new Howl({
		src: './src/main/audio/select.mp3',
		html5: true,
	}),
	start: new Howl({
		src: './src/main/audio/start.mp3',
		html5: true,
	}),
	walking: new Howl({
		src: './src/main/audio/walking.mp3',
		html5: true,
		loop: true,
		volume: 0.5,
	}),
	npcWalking: new Howl({
		src: './src/main/audio/walking.mp3',
		html5: true,
		volume: 0.5,
	}),
	initNpcConversation: new Howl({
		src: './src/main/audio/initNpcConversation.mp3',
		html5: true,
		volume: 0.5,
	}),
	newQuest: new Howl({
		src: './src/main/audio/newQuest.mp3',
		html5: true,
		volume: 0.5,
	}),
	completeQuest: new Howl({
		src: './src/main/audio/completeQuest.mp3',
		html5: true,
		volume: 0.5,
	}),

	snake: new Howl({
		src: './src/snake/audio/snakeSound.mp3',
		html5: true,
		loop: true,
		volume: 0.3,
	}),
	snakeHissing: new Howl({
		src: './src/snake/audio/snakeHissing.mp3',
		html5: true,
	}),
	digitalBeeping: new Howl({
		src: './src/snake/audio/digitalBeeping.mp3',
		html5: true,
	}),
	eat: new Howl({
		src: './src/snake/audio/crunch.mp3',
		html5: true,
	}),
	hit: new Howl({
		src: './src/snake/audio/hit.mp3',
		html5: true,
	}),
	gameOver: new Howl({
		src: './src/snake/audio/gameOver.mp3',
		html5: true,
		loop: true,
	}),
	gameOverVoiceover: new Howl({
		src: './src/snake/audio/gameOverVoiceover.ogg',
		html5: true,
	}),
	highScoreVoiceover: new Howl({
		src: './src/snake/audio/highScore.mp3',
		html5: true,
	}),
};

