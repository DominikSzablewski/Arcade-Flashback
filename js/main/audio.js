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
	snakeUp: new Howl({
		src: './src/snake/audio/snakeUp.mp3',
		html5: true,
	}),
	snakeDown: new Howl({
		src: './src/snake/audio/snakeDown.mp3',
		html5: true,
	}),
	snakeLeft: new Howl({
		src: './src/snake/audio/snakeLeft.mp3',
		html5: true,
	}),
	snakeRight: new Howl({
		src: './src/snake/audio/snakeRight.mp3',
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

const musicPack = ({ value1, value2, value3 }) => {
	audioSettings.main.volume(value1);
	audioSettings.snake.volume(value2);
	audioSettings.gameOver.volume(value3);
};

const sfxPack = ({ value1, value2 }) => {
	audioSettings.highScoreVoiceover.volume(value1);
	audioSettings.gameOverVoiceover.volume(value1);
	audioSettings.hit.volume(value1);
	audioSettings.eat.volume(value1);
	audioSettings.snakeUp.volume(value1);
	audioSettings.snakeDown.volume(value1);
	audioSettings.snakeLeft.volume(value1);
	audioSettings.snakeRight.volume(value1);
	audioSettings.snakeHissing.volume(value1);
	audioSettings.completeQuest.volume(value2);
	audioSettings.newQuest.volume(value2);
	audioSettings.initNpcConversation.volume(value2);
	audioSettings.npcWalking.volume(value2);
	audioSettings.walking.volume(value2);
	audioSettings.start.volume(value1);
	audioSettings.select.volume(value1);
};

export const musicSwitcher = e => {
	if (localStorage.getItem('musicOff')) {
		musicPack({ value1: 0, value2: 0, value3: 0 });
	} else {
		musicPack({ value1: 0.7, value2: 0.3, value3: 1 });
	}
	if (localStorage.getItem('sfxOff')) {
		sfxPack({ value1: 0, value2: 0 });
	} else {
		sfxPack({ value1: 1, value2: 0.5 });
	}
};
