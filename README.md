<h1 align="center">Table of contents</h1>

- [Arcade Flashback](#arcade-flashback)
- [Demo](#demo)
- [Functionality Overview - Key Features](#functionality-overview---key-features)
- [Used Libraries](#used-libraries)
- [Available Arcades in the Game](#available-arcades-in-the-game)
- [Dependencies graph](#dependencies-graph)
- [Future goals](#future-goals)
- [FAQ](#faq)
  - [How to navigate through the game world?](#how-to-navigate-through-the-game-world)
  - [How to return to the menu?](#how-to-return-to-the-menu)
  - [How to start playing on the arcade?](#how-to-start-playing-on-the-arcade)
  - [Why am I unable to access the main menu while having conversations with NPCs, playing the arcade game, or viewing the glory board?](#why-am-i-unable-to-access-the-main-menu-while-having-conversations-with-npcs-playing-the-arcade-game-or-viewing-the-glory-board)
  - [How to activate the Dev Mode and what does it do?](#how-to-activate-the-dev-mode-and-what-does-it-do)
  - [Does changing the audio settings in the arcade menu and the main menu affect the audio settings throughout the entire game, or do they work independently?](#why-am-i-unable-to-access-the-main-menu-while-having-conversations-with-npcs-playing-the-arcade-game-or-viewing-the-glory-board)
- [Sample Screenshots](#sample-screenshots)
- [Credits - images](#credits---images)
- [Credits - sounds](#credits---sounds)

<h2 align="center">Arcade Flashback</h2>

<p align="justify">
Arcade Flashback is an immersive gaming experience that allows you to relive the nostalgia of classic arcade games while embarking on exciting new adventures. Dive into a vibrant game world filled with vibrant visuals and captivating gameplay. Challenge yourself to master the refreshed versions of beloved arcade games and unlock hidden secrets along the way. Immerse yourself in the thrill of Arcade Flashback and let the arcade spirit reignite your gaming passion.

The project was developed using JavaScript, SCSS, and HTML. In JavaScript, modules were utilized to organize and structure the code, following object-oriented programming principles to create reusable and modular code components. The HTML canvas was used for rendering graphics and implementing interactive elements, allowing for a dynamic and visually engaging game experience. For audio handling, Howler.js, a JavaScript audio library, was employed to provide a straightforward and efficient way to work with sounds in the game. Additionally, the Tiled Map Editor was used to create the game map, providing a convenient tool for designing and building the game's environment.

</p>

<h2 align="center">Demo</h2>

https://arcade-flashback.netlify.app/

<h2 align="center">Functionality Overview - Key Features</h2>

- **NPC Interaction**:

  - <p align="justify">I introduced an NPC that provides players with a quest in the game to enrich the gameplay and provide them with new challenges. The aim was to allow interaction with an independent character. This feature adds depth and realism to the game world, giving players a sense of satisfaction from completing the quest and discovering new elements of the storyline.</p>

- **Character Selection**:
  - <p align="justify">I introduced a character selection feature in the game to increase player engagement. With this feature, players have the ability to choose their favorite avatar or character, allowing them to personalize their gameplay and encouraging more a player to interact with the game. </p>
- **Menus in game:**

  - <p align="justify">I developed a custom, flexible method for implementing styles in the menus, allowing for individual management of each style. This solution enables to easily customize the appearance and layout of menus element independently. Each style is defined separately, giving full control over their properties. This allows to create personalized and visually appealing menu that perfectly matches the game's atmosphere and meet my aesthetic expectations. </p>

- **Game Collisions:**

  - <p align="justify">I used the AABB (Axis-Aligned Bounding Box) method for collision detection in 2D games. This method involves creating rectangular bounding boxes around game objects and checking if these boxes overlap, indicating a potential collision. If a collision is detected, I can take appropriate actions such as stopping object movement, changing trajectories or triggering sound effects.</p>

- **Animations:**

  - <p align="justify">To create animations on the canvas, I used the "requestAnimationFrame" method. This method is a built-in function in web browsers that optimizes animations by synchronizing them with the browser's refresh rate. It allows for easy control of the frames per second (FPS), enabling smooth and efficient animations on the canvas. By dynamically adjusting the timing of each frame, I could easily control the animation's speed and achieve the desired visual effects. Thanks to this, I was able to create character movement.</p>

- **Mouse Control on Canvas:**

  - <p align="justify">To enhance the interactivity of the canvas, I developed a custom class for handling mouse movements and clicks. This class enables smooth interaction with the canvas by capturing mouse movements and handling click events. It seamlessly adapts to different screen sizes and ensures consistent functionality, regardless of the width and height of the game window. Users can effortlessly interact with the canvas, enjoying a seamless and responsive experience across various devices and screen resolutions.</p>

- **Letter spacing and word spacing:**

  - <p align="justify">I implemented my own method for letter spacing and word spacing on the canvas because the existing methods available, such as "CanvasRenderingContext2D's", "letterSpacing" and "wordSpacing", are not supported on all browsers. The following links provide information on the lack of support for these methods: </p>

    - [CanvasRenderingContext2D.letterSpacing](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/letterSpacing#browser_compatibility)
    - [CanvasRenderingContext2D.wordSpacing](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/wordSpacing#browser_compatibility).

- **Music:**

  - <p align="justify">I utilized the Howler.js library for sound handling in the game. I chose this library due to its ease of sound management. Howler.js allows convenient loading and playing of sound files, as well as simple control of volume and application of sound effects. With this tool, I could focus on implementing the game logic without worrying about the intricacies of sound handling.</p>

- **Devmode**:
  - Go to **FAQ** below.

<h2 align="center">Used Libraries</h2>

- [howler.js](https://howlerjs.com/ 'howler.js') for audio.

<h2 align="center">Available Arcades in the Game</h2>

- Snake Arcade.

<h2 align="center">Dependencies graph</h2>

<p align="center">
  <img src="https://img001.prntscr.com/file/img001/h1C8Jh8tSnOMKnzhF7HZug.png">
</p>

Used: [Dependency Cruiser Extension](https://marketplace.visualstudio.com/items?itemName=juanallo.vscode-dependency-cruiser 'Dependency Cruiser Extension')

<h2 align="center">Future goals</h2>

- <p align="justify">The grid consists of 21 * 18 cells, providing a total of 378 possibilities for the apple to spawn. The probability of the apple spawning directly on the snake at the beginning of the game is low, but as the snake grows, the likelihood increases. Therefore, I intend to make it impossible for the apple to spawn on the snake altogether.</p>
- Create Space Invaders.

- Create Pac-Man.

- Create Frogger.

<h2 align="center">FAQ</h2>

#### How to navigate through the game world?

- To navigate through the game world, use the WASD keys.

#### How to return to the menu?

- To return to the menu, you need to press the "Esc" key.

#### How to start playing on the arcade?

- To start playing on the arcade, you need to have your character stand on it.

#### Why am I unable to access the main menu while having conversations with NPCs, playing the arcade game, or viewing the glory board?

- <p align="justify">Restricting access to the main menu during NPC conversations, arcade gameplay, and when the glory board is displayed, is a deliberate design choice aimed at enhancing immersion and gameplay fluidity. By maintaining the continuity of interactions, the game ensures that players remain fully engaged in conversations and arcade action, without distracting menu navigation elements. This allows for a focused experience on the narrative and gameplay, creating a deeper and more immersive gaming experience. </p>

#### How to activate the Dev Mode and what does it do?

- <p align="justify">To activate Developer Mode, access the "Game" class and set the value of "devMode" to "true" in the game setup configuration. With Dev Mode enabled, you gain access to a powerful tool that allows to visualize all the collisions in the game, including those within the arcades. It provides valuable insights into the interaction between objects, helping fine-tune gameplay mechanics and ensures a smooth gaming experience.</p>

<p align="center">
  <img src="https://img001.prntscr.com/file/img001/WYvCRFZyRxKyqMpPEYkQLw.png">
</p>

#### Does changing the audio settings in the arcade menu and the main menu affect the audio settings throughout the entire game, or do they work independently?

<p align="justify">Changing the audio options in the arcade menu and the main menu affects the sound settings throughout the entire game. When the specific audio options are enabled or disabled, these changes will be applied globally to all game modes and menus. This ensures a consistent audio experience and allows to customize the sound settings according to personal preferences, regardless of which part of the game you are in.</p>

<h2 align="center">Sample Screenshots</h2>

<p align="center">
  <img src="https://img001.prntscr.com/file/img001/V-qpw9mJRee0nKA1w5woIA.png">
  <br>
  <img src="https://img001.prntscr.com/file/img001/HOHaBHoRQOSYjq0U8XQoiw.png">
  <br>
  <img src="https://img001.prntscr.com/file/img001/S2zokOICT_Ce_83_r5uahw.png">
  <br>
  <img src="https://img001.prntscr.com/file/img001/RvQ04lKMQheOGgt0slv01g.png">
  <br>
  <img src="https://img001.prntscr.com/file/img001/5gmK0Ew7T4K9Ow3dngchSw.png">
  <br>
  <img src="https://img001.prntscr.com/file/img001/GJkdN7pLSpSNMHAnS2BAvg.png">
  <br>
  <img src="  https://img001.prntscr.com/file/img001/StUeHaTtTwq9AVI1jXdh6Q.png">
  <br>
</p>

<h2 align="center">Credits - images</h2>

**For Main Game:**

- https://livingtheindie.itch.io/pixel-cyberpunk-interior

- https://xanderwood.itch.io/arcade-cabinet-sprites

- https://www.freepik.com/free-vector/retro-gaming-poster-template_11599085.htm#page=2&query=quote%20poster%20game&position=12&from_view=search&track=ais

- https://www.pikpng.com/pngvi/oTJJo_pac-man-imagens-em-png-pac-man-clipart/

- https://www.pngwing.com/en/free-png-zyfzp

- https://www.pngfind.com/mpng/JoTxww_space-invaders-png-space-invaders-transparent-png/

- https://www.vhv.rs/viewpic/iTxJTbm_frogger-png-frogger-game-logo-png-transparent-png/

- https://www.vhv.rs/viewpic/TTJmRoh_frog-frogger-hd-png-download/

- https://www.pngegg.com/en/png-iuihe/download

- https://pngtree.com/freepng/game-room-neon-label-icon-text-effect-png-vector-clipart-transparant-background_6003879.html

- https://limezu.itch.io/moderninteriors

- https://opengameart.org/content/16x16-fence-and-well-tiny-16

- https://www.pngwing.com/en/free-png-zudhz

- https://pngtree.com/freepng/lets-play-arcade-game-station-neon-sign_5980596.html

- https://toppng.com/free-image/construction-barrier-sprite-001-PNG-free-PNG-Images_214549

- https://www.pngwing.com/en/free-png-blgev

- https://www.frankslaboratory.co.uk/downloads/107/bonus.zip

- https://wallpapers.com/wallpapers/arcade-1x4typrk2o5uoyyy.html

- https://pl.freepik.com/darmowe-wektory/ustawiono-opcje-kreskowek-interfejsu-menu-gry_27846438.htm?query=game%20menu%20ux#from_view=detail_alsolike

- https://pl.freepik.com/darmowe-wektory/zlote-znaki-gry-tabliczki-z-nazwiskami-puste-zlote-tabliczki_34210821.htm#page=5&query=game%20board%20ux&position=14&from_view=search&track=ais

- https://www.cleanpng.com/png-mother-3-video-game-dialog-box-text-box-dialogue-t-803527/

**For Snake Arcade:**

- https://www.pngegg.com/en/png-iuihe

- https://www.flaticon.com/free-icon/wasd_4617727?related_id=4617690&origin=search

- https://opengameart.org/content/snake-sprites-sound

- https://opengameart.org/content/apple-2

- https://www.pngegg.com/en/png-bbskn

- https://www.freepik.com/free-vector/cartoon-jungle-background_14351507.htm#query=jungle&position=2&from_view=keyword&track=sph

- https://www.freepik.com/free-vector/wooden-game-buttons-cartoon-menu-interface-set_32591374.htm#query=wooden%20ux&position=2&from_view=search&track=ais

- https://www.freepik.com/free-vector/cartoon-snake-wounded-branch-background_4211077.htm#query=carton%20snake&position=46&from_view=search&track=ais

- https://www.freepik.com/free-vector/snakes-wild-tropical-serpents-isolated-white_13778464.htm#query=carton%20snake%20stick&position=30&from_view=search&track=ais

- https://www.freepik.com/free-vector/sticker-design-with-cute-rattlesnake-isolated_16855804.htm#query=brown%20snake&position=24&from_view=search&track=ais

**For icon:**

- https://icons8.com/icon/KKxGe84J0QF4/arcade-machine
- https://www.flaticon.com/free-icon/play_10238988?term=play&page=1&position=24&origin=search&related_id=10238988

<h2 align="center">Credits - sounds</h2>

**For Main Game:**

- https://pixabay.com/sound-effects/llv-132676/
- https://pixabay.com/sound-effects/notification-2-trial-125763/
- https://pixabay.com/sound-effects/success-fanfare-trumpets-6185/
- https://pixabay.com/sound-effects/game-start-6104/
- https://freesound.org/people/Disagree/sounds/433725/
- https://www.chosic.com/download-audio/45420/

**For Snake Arcade:**

- https://www.youtube.com/watch?v=CQir5c7wrP0
- https://pixabay.com/sound-effects/snake-hissing-6092/
- https://opengameart.org/content/hit-sound-effects
- https://opengameart.org/content/game-over-iv
- https://opengameart.org/content/voiceover-pack-fighter-40-taunts
- https://opengameart.org/content/platformer-game-music-pack
- https://micmonster.com/ (For High Score)

**For Select:**

- https://opengameart.org/content/8bit-menu-select
