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

const musicPack = value => {
	audioSettings.main.volume(value);
	audioSettings.snake.volume(value);
	audioSettings.gameOver.volume(value);
};

const sfxPack = value => {
	audioSettings.highScoreVoiceover.volume(value);
	audioSettings.gameOverVoiceover.volume(value);
	audioSettings.hit.volume(value);
	audioSettings.eat.volume(value);
	audioSettings.digitalBeeping.volume(value);
	audioSettings.snakeHissing.volume(value);
	audioSettings.completeQuest.volume(value);
	audioSettings.newQuest.volume(value);
	audioSettings.initNpcConversation.volume(value);
	audioSettings.npcWalking.volume(value);
	audioSettings.walking.volume(value);
	audioSettings.start.volume(value);
	audioSettings.select.volume(value);
};

export const musicSwitcher = e => {
	if (localStorage.getItem('musicOff')) {
		musicPack(0);
	} else {
		musicPack(1);
	}
	if (localStorage.getItem('sfxOff')) {
		sfxPack(0);
	} else {
		sfxPack(1);
	}
};
