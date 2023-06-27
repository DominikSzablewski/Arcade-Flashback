import { Character } from '../Character.js';
import { Text } from '../Text.js';
import { TileForCollision } from '../TileForCollision.js';
import { audioSettings } from '../audio.js';
import { NpcHoverStyle } from '../menuStyles/NpcHoverStyle.js';

export class Npc {
	constructor(game, { firstSpriteFrameX, frameX, frameXTemp, endFrameX, frameY, position = { x, y } }) {
		this.game = game;
		this.firstSpriteFrameX = firstSpriteFrameX;
		this.frameX = frameX;
		this.frameXTemp = frameXTemp;
		this.endFrameX = endFrameX;
		this.frameY = frameY;
		this.position = position;
		this.movesCount = 0;
		this.dialogueNumber = 1;
		this.npcScene = null;
		this.dialogueCountingFlag = false;
		this.dialogueFlag = true;
		this.arrayStopFlag = false;
		this.questTextFlag = false;
		this.completedQuest = {
			npcDominik: { snake: localStorage.getItem('completedQuestSnake') || false },
		};
		this.soundFlag = {
			npcDominik: {
				conversation1: { sound1: false, sound2: false, sound3: false, sound4: false },
				conversation2_3_5_6: { sound1: false },
				conversation4: { sound1: false, sound2: false },
			},
		};

		this.npcConversation = Number(localStorage.getItem('npcConversation')) || 1;
		this.test1 = Number(localStorage.setItem('test1', 1)) || 0;
		this.npcDominicSecondLocation = { position: [[{ x: 44, y: 35 }], [{ x: 45, y: 35 }], [{ x: 46, y: 35 }]] };

		this.npcStopPlayerArea = [
			'value for better counting ',
			{ npcDominik: { position: [[{ x: 14, y: 41 }], [{ x: 14, y: 42 }], [{ x: 13, y: 41 }], [{ x: 13, y: 42 }]] } },
			{ npcDominik: this.npcDominicSecondLocation },
			{ npcDominik: this.npcDominicSecondLocation },
			{ npcDominik: this.npcDominicSecondLocation },
			{ npcDominik: this.npcDominicSecondLocation },
			{ npcDominik: this.npcDominicSecondLocation },
		];
		this.npcCollisionArray = [];

		this.character = new Character(this.game, {
			spriteSetup: {
				src: 'player',
				firstSpriteFrameX: this.firstSpriteFrameX,
				frameX: this.frameX,
				frameXTemp: this.frameXTemp,
				endFrameX: this.endFrameX,
				frameY: this.frameY,
				spriteWidth: 48,
				spriteHeight: 72.5,
				edit: {
					resize: 2.4,
				},
			},
			characterSetup: {
				x: this.position.x,
				y: this.position.y,
				characterSpeed: 13,
				characterFps: 16,
				delta: 0,
				lastTime: 0,
			},
			collisionSetup: {
				x: this.position.x + 20,
				y: this.position.y + 140,
				predictCollisionPerPixel: 13,
				width: 60,
				height: 50,
			},
		});
		this.npcHoverStyle = new NpcHoverStyle(this);
	}

	createNpcCollisionArray(conversation) {
		if (!this.arrayStopFlag) {
			for (const element of this.npcStopPlayerArea[conversation].npcDominik.position) {
				for (const el of element) {
					this.npcCollisionArray.push(new TileForCollision(this.game, { tile: { x: el.x, y: el.y } }));
				}
			}
			this.arrayStopFlag = true;
		}
	}

	drawCollisionArea(ctx) {
		for (const el of this.npcCollisionArray) {
			el.draw(ctx);
		}
	}

	initAreaForPlayerFreeze(ctx) {
		this.createNpcCollisionArray(this.npcConversation);
		this.drawCollisionArea(ctx);
	}

	npcText({
		setup = { nr, x, y },
		font = { size: '27.5px', color: '255, 220, 40, 1.0', shadowColor: '255, 0, 0, 1.0', shadowX: 1.5, shadowY: 1 },
		text,
	}) {
		this[setup.nr] = new Text({
			words: [text],
			position: {
				x: this.game.canvas.width / 2,
				y: this.game.canvas.height / 2,
			},
			offsetPosition: { x: setup.x, y: setup.y },
			font: { size: `${font.size}`, color: `rgba(${font.color})` },
			shadow: { color: `rgba(${font.shadowColor})`, blur: 3.5, OffsetX: font.shadowX, OffsetY: font.shadowY },
			letterSpacing: 1,
			wordSpacing: 5,
		});
	}

	npcInitWithMoves({ movesCount, frameY, characterPositionX, collisionPositionX }) {
		this.movesCount += movesCount;
		this.character.inputHandler.animationStart = true;
		this.character.spriteSetup.frameY = frameY;
		this.character.characterPosition.x += characterPositionX;
		this.character.collisionPosition.x += collisionPositionX;
	}

	npcStopMovesAnimation() {
		this.character.inputHandler.animationStart = false;
		audioSettings.npcWalking.stop();
	}

	npcInitStatic(ctx, { npcScene, freezeArea = { flag: true } }) {
		freezeArea.flag && this.initAreaForPlayerFreeze(ctx);
		this.game.mouseService.npcScene = `${npcScene}`;
		this.game.mouseService.click();
		this.dialogue(ctx);
	}

	initSound({ npcScene, conversation, sound, audio }) {
		!this.soundFlag[npcScene][`conversation${conversation}`][`sound${sound}`] && audioSettings[audio].play();
		this.soundFlag[npcScene][`conversation${conversation}`][`sound${sound}`] = true;
	}

	npcInit(ctx, timeStamp) {
		switch (this.npcScene) {
			case 'npcDominik':
				switch (this.npcConversation) {
					case 1:
						if (this.dialogueFlag) {
							this.initAreaForPlayerFreeze(ctx);
							if (this.movesCount < 1100) {
								this.npcInitWithMoves({ movesCount: 4, frameY: 1, characterPositionX: -4, collisionPositionX: -4 });
								this.initSound({ npcScene: 'npcDominik', conversation: 1, sound: 1, audio: 'npcWalking' });
							} else {
								this.npcStopMovesAnimation();
								this.dialogueCountingFlag = true;
								this.npcInitStatic(ctx, { npcScene: 'npcDominik', freezeArea: { flag: false } });
								this.initSound({ npcScene: 'npcDominik', conversation: 1, sound: 2, audio: 'initNpcConversation' });
							}
							this.character.animate(timeStamp);
						} else {
							this.initAreaForPlayerFreeze(ctx);
							if (this.movesCount > 0) {
								this.npcInitWithMoves({ movesCount: -10, frameY: 2, characterPositionX: 10, collisionPositionX: 10 });
								this.initSound({ npcScene: 'npcDominik', conversation: 1, sound: 3, audio: 'npcWalking' });
							} else {
								this.npcStopMovesAnimation();
								localStorage.setItem('npcDominikPositionX', 45.1 * 128);
								localStorage.setItem('npcDominikPositionY', 33.5 * 128);
								this.character.characterPosition.x = 45.1 * 128 + this.game.gameSetup.position.x;
								this.character.characterPosition.y = 33.5 * 128 + this.game.gameSetup.position.y;
								this.character.collisionPosition.x = 45.1 * 128 + this.game.gameSetup.position.x + 20;
								this.character.collisionPosition.y = 33.5 * 128 + this.game.gameSetup.position.y + 140;
							}
							this.character.animate(timeStamp);
							this.dialogue(ctx);
						}
						break;
					case 2:
					case 3:
					case 5:
					case 6:
						if (this.dialogueFlag) {
							this.npcInitStatic(ctx, { npcScene: 'npcDominik' });
							this.initSound({
								npcScene: 'npcDominik',
								conversation: '2_3_5_6',
								sound: 1,
								audio: 'initNpcConversation',
							});
						}
						break;
					case 4:
						if (this.dialogueFlag) {
							this.npcInitStatic(ctx, { npcScene: 'npcDominik' });
							this.initSound({ npcScene: 'npcDominik', conversation: 4, sound: 1, audio: 'initNpcConversation' });
							this.dialogueCountingFlag = true;
						}
						break;
				}

				break;
		}
	}

	drawNpcNameHeader(ctx, { name, font = { size, x, y } }) {
		this.npcText({
			setup: { nr: 'npcName', x: font.x, y: font.y },
			font: { size: `${font.size}`, shadowX: 3, shadowY: 2 },
			text: `${name}`,
		});
		this.npcName.draw(ctx);
	}

	drawQuestHeader(ctx) {
		this.npcText({
			setup: { nr: 'questHeader', x: -425, y: 145 },
			font: { size: '55px', shadowX: 3, shadowY: 2 },
			text: 'Quest',
		});
		this.questHeader.draw(ctx);
	}

	drawConversation(
		ctx,
		{ npc = { name }, flag = { t1: false, t2: false, t3: false, t4: false, t5: false, npc: false, quest: false } }
	) {
		this.npcHoverStyle.draw(ctx);
		flag.t1 && this.text1.draw(ctx);
		flag.t2 && this.text2.draw(ctx);
		flag.t3 && this.text3.draw(ctx);
		flag.t4 && this.text4.draw(ctx);
		flag.t5 && this.text5.draw(ctx);
		flag.npc && this.drawNpcNameHeader(ctx, { name: `${npc.name}`, font: { size: '55px', x: -454, y: 145 } });
		flag.quest && this.drawQuestHeader(ctx);
	}

	dialogue(ctx) {
		switch (this.npcScene) {
			case 'npcDominik':
				switch (this.npcConversation) {
					case 1:
						switch (this.dialogueNumber) {
							case 1:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "Hello, I'm glad you're here. This is my home, you can call it",
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: 'Arcade Flashback. It took me a while to settle in here. I still',
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: "have renovations going on in the arcade room, but I'm optimistic",
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: 'because I know that everything will be done soon. The Celtic',
								});
								this.npcText({
									setup: { nr: 'text5', x: -450, y: 370 },
									text: "oracle told me so, and if that's what she said, then it shall be.",
								});
								break;
							case 2:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: 'The technologies used to create this world are HTML, SCSS, and',
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: "JavaScript. I didn't use any frameworks. I wanted to make this",
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: "game in Vanilla JavaScript. You know what, I won't bore you with",
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: 'those details here. You can find out everything in the technical',
								});
								this.npcText({
									setup: { nr: 'text5', x: -450, y: 370 },
									text: 'documentation of this game.',
								});
								break;
							case 3:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "Now let's move on to what everyone loves... playing games. First,",
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: 'I have a quest for you. Beat my high scores in the game Snake.',
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: "You'll find the arcade machine with this game in the arcade room.",
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: "You need to go up, then left, and up again. You'll surely find it.",
								});
								this.npcText({
									setup: { nr: 'text5', x: -450, y: 370 },
									text: "I'm a master at both levels - easy and hard ones.",
								});
								break;
							case 4:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "There's no chance you'll defeat me. Well, unless you put some",
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: "effort in. Just remember, don't attempt any tricks. Modifying the",
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: "code is a blasphemy. Gods won't forgive you, or maybe they will,",
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: "but cheating will make me sad. So don't do it!",
								});
								break;
							case 5:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: 'If you manage to defeat me and would like to claim the rewards',
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: "for completing the quest, I'll be in the kitchen. I've gotten quite",
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: 'hungry from all this talking and need to grab a bite. Remember,',
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: "if you don't want me to laugh at you for being worse at gaming,",
								});
								this.npcText({
									setup: { nr: 'text5', x: -450, y: 370 },
									text: "then don't approach me until you've actually defeated me.",
								});
								break;
							case 6:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: 'See you later!',
								});
								this.dialogueFlag = false;
								break;
							case 7:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "Beat Dominik's scores in the game Snake.",
								});
								this.initSound({ npcScene: 'npcDominik', conversation: 1, sound: 4, audio: 'newQuest' });
								this.questTextFlag = true;
								break;
						}

						switch (this.dialogueNumber) {
							case 1:
							case 2:
							case 3:
							case 5:
								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, t2: true, t3: true, t4: true, t5: true, npc: true },
								});
								break;
							case 4:
								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, t2: true, t3: true, t4: true, npc: true },
								});
								break;
							case 6:
								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, npc: true },
								});
								break;
							case 7:
								this.drawConversation(ctx, {
									flag: { t1: true, quest: true },
								});
								break;
						}
						break;
					case 2:
						switch (this.dialogueNumber) {
							case 1:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "I see that you haven't beaten my scores in the Snake game yet.",
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: "Hahaha. I knew I was a master and that defeating me wouldn't be ",
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: 'as easy as you might have thought. Come back when you manage',
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: 'to defeat me.',
								});
								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, t2: true, t3: true, t4: true, npc: true },
								});
								break;
						}
						break;
					case 3:
						switch (this.dialogueNumber) {
							case 1:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "Still haven't beaten me??? I am a player, and with players like",
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: "me, you won't win. My score is as distant for you as the distance",
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: "from Earth to the Sun. It won't be that easy for you. Come back",
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: 'when you defeat me.',
								});
								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, t2: true, t3: true, t4: true, npc: true },
								});
								break;
						}
						break;
					case 4:
						switch (this.dialogueNumber) {
							case 1:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "Wow, I can't believe it. It's impossible! You managed to defeat me.",
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: "I don't know how you did it, but according to our agreement, you ",
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: 'deserve a reward.',
								});
								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, t2: true, t3: true, npc: true },
								});
								break;
							case 2:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: 'You receive a badge as proof that you are a legendary master of',
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: "the Snake game. From now on, you've access to the Board of Glory.",
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: 'To enter, press the letter "B" on your keyboard. Remember, you can',
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: 'only enter if you are not playing in arcade and if you are not',
								});
								this.npcText({
									setup: { nr: 'text5', x: -450, y: 370 },
									text: 'interacting with NPCs.',
								});
								this.initSound({ npcScene: 'npcDominik', conversation: 4, sound: 2, audio: 'completeQuest' });
								this.drawConversation(ctx, {
									flag: { t1: true, t2: true, t3: true, t4: true, t5: true, quest: true },
								});
								break;
							case 3:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: 'Soon, new challenges await you, and you will have the opportunity',
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: 'to engrave your name in the Hall of Fame. The road ahead of you is ',
								});
								this.npcText({
									setup: { nr: 'text3', x: -450, y: 290 },
									text: 'challenging, to get there you will have to earn all the badges. ',
								});
								this.npcText({
									setup: { nr: 'text4', x: -450, y: 330 },
									text: 'Only a full Board of Glory grants you access to the Hall of Fame!',
								});

								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, t2: true, t3: true, t4: true, npc: true },
								});
								this.questTextFlag = true;
								this.completedQuest = {
									npcDominik: { snake: true },
								};
								localStorage.setItem('completedQuestSnake', true);

								break;
						}
						break;
					case 5:
						switch (this.dialogueNumber) {
							case 1:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "Soon, I'll have new challenges for you, and I promise it won't be as",
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: "easy as before. This time, you will fall, and I'll come out on top!",
								});

								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, t2: true, npc: true },
								});
								break;
						}
						break;
					case 6:
						switch (this.dialogueNumber) {
							case 1:
								this.npcText({
									setup: { nr: 'text1', x: -450, y: 210 },
									text: "Hi, unfortunately, I don't have any challenges for you right now.",
								});
								this.npcText({
									setup: { nr: 'text2', x: -450, y: 250 },
									text: 'Come back in a while.',
								});

								this.drawConversation(ctx, {
									npc: { name: 'Dominik' },
									flag: { t1: true, t2: true, npc: true },
								});
								break;
						}
						break;
				}
				break;
		}
	}
}
