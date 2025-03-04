const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const keysPressed = {};
        const mainMenu = document.getElementById('mainMenu');
const startGameButton = document.getElementById('startGameButton');

// Ensure the level selector and canvas are hidden initially
// Hide the level selector and canvas when the game starts
document.addEventListener('DOMContentLoaded', () => {
    const levelSelector = document.getElementById('levelSelector');
    const canvas = document.getElementById('gameCanvas');

    levelSelector.style.display = 'none'; // Hide the level selector
    canvas.style.display = 'none'; // Hide the game canvas
});
// Hide the main menu and show the level selector
startGameButton.addEventListener('click', () => {
    mainMenu.style.display = 'none'; // Hide main menu
    showLevelSelector(); // Show level selector
});
const howToPlayButton = document.getElementById('howToPlayButton');
const howToPlay = document.getElementById('howToPlay');
const backButton = document.getElementById('backButton');

// Show the How to Play screen
howToPlayButton.addEventListener('click', () => {
    document.getElementById('mainMenu').style.display = 'none'; // Hide main menu
    howToPlay.style.display = 'block'; // Show instructions
});

// Return to the main menu
backButton.addEventListener('click', () => {
    howToPlay.style.display = 'none'; // Hide instructions
    document.getElementById('mainMenu').style.display = 'flex'; // Show main menu
});

        let currentLevel = 0;

        const levels = [
    {
        player: { x: 50, y: 50, width: 30, height: 30, color: 'red', speed: 3 },
        pressurePlate: { x: 400, y: 400, width: 50, height: 50, color: 'yellow', activated: false },
        spikeWall: { x: 500, y: 0, width: 50, height: 700, color: 'black', visible: true },
        key: { x: 700, y: 250, width: 20, height: 20, color: 'gold', collected: false },
        door: { x: 750, y: 300, width: 30, height: 100, locked: true },
        box: { x: 200, y: 300, width: 40, height: 40, color: 'brown', initialX: 200, initialY: 300 },
        walls: [
            // Border walls
            { x: 0, y: 0, width: 10, height: canvas.height },
            { x: 0, y: 0, width: canvas.width, height: 10 },
            { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
            { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },

            // Inner walls (examples)
            { x: 200, y: 100, width: 400, height: 10 }, // Horizontal wall in the middle
            { x: 300, y: 200, width: 10, height: 200 }, // Vertical wall splitting a section
        ]
    },
    {
        player: { x: 50, y: 50, width: 30, height: 30, color: 'red', speed: 3 },
        pressurePlate: { x: 300, y: 200, width: 50, height: 50, color: 'yellow', activated: false },
        spikeWall: { x: 400, y: 0, width: 50, height: 700, color: 'black', visible: true },
        key: { x: 600, y: 150, width: 20, height: 20, color: 'gold', collected: false },
        door: { x: 700, y: 200, width: 30, height: 100, locked: true },
        box: { x: 100, y: 400, width: 40, height: 40, color: 'brown', initialX: 100, initialY: 400 },
        walls: [
            // Border walls
            { x: 0, y: 0, width: 10, height: canvas.height },
            { x: 0, y: 0, width: canvas.width, height: 10 },
            { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
            { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },

            // Inner walls (examples)
            { x: 150, y: 150, width: 500, height: 10 }, // Long horizontal wall
            { x: 250, y: 250, width: 10, height: 300 }, // Tall vertical wall
        ]
    },
    {
    player: { x: 50, y: 50, width: 30, height: 30, color: 'red', speed: 3 },
    walls: [
        { x: 0, y: 0, width: 10, height: canvas.height },
        { x: 0, y: 0, width: canvas.width, height: 10 },
        { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
        { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },

        { x: 100, y: 100, width: 300, height: 10 },
        { x: 400, y: 100, width: 10, height: 200 },
        { x: 100, y: 300, width: 310, height: 10 },
        { x: 200, y: 200, width: 10, height: 100 },
        { x: 500, y: 100, width: 10, height: 300 },
        { x: 500, y: 400, width: 200, height: 10 },
        { x: 700, y: 100, width: 10, height: 310 },
        {x: 500, y: 0, width: 10, height: 700},
    ],
    teleporters: [
        { x: 250, y: 250, width: 40, height: 40, color: 'blue',  targetX: 650, targetY: 400},
        { x: 600, y: 400, width: 40, height: 40, color: 'purple', targetX: 300, targetY: 250  }
    ],
    door: { x: 600, y: 300, width: 100, height: 20, color: 'brown', locked: true },
    key: { x: 250, y: 210, width: 20, height: 20, color: 'gold' },

    // Add pressure plate and spike wall (needed for the level)
    pressurePlate: { x: 400, y: 400, width: 50, height: 50, color: 'yellow', activated: false },
    spikeWall: { x: 200, y: 100, width: 10, height: 100, color: 'black', visible: true },
    
    // Add a box that can be moved
    box: { x: 200, y: 300, width: 40, height: 40, color: 'brown', initialX: 200, initialY: 300 }
},
{
    player: { x: 50, y: 50, width: 30, height: 30, color: 'red', speed: 3 },
    walls: [
        { x: 0, y: 0, width: 10, height: canvas.height },
        { x: 0, y: 0, width: canvas.width, height: 10 },
        { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
        { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },

        { x: 175, y: 250, width: 190, height: 30 }, // Horizontal wall below spike wall
        {x: 300, y:0, width: 30, height:700} ,  
        { x: 120, y: 350, width: 190, height: 30 },
    ],
    teleporters: [
        { x: 200, y: 200, width: 40, height: 40, color: 'blue', targetX: 650, targetY: 300 },
        { x: 600, y: 300, width: 40, height: 40, color: 'purple', targetX: 250, targetY: 200 },
    ],
    pressurePlate: { x: 400, y: 400, width: 50, height: 50, color: 'yellow', activated: false },
    spikeWall: { x: 110, y: 250, width: 10, height: 100, color: 'black', visible: true },
    box: { x: 100, y: 400, width: 30, height: 30, color: 'brown', initialX: 200, initialY: 300 },
    door: { x: 750, y: 300, width: 30, height: 100, locked: true },
    key: { x: 200, y: 300, width: 20, height: 20, color: 'gold', collected: false },
    enemies: [
            { x: 140, y: 300, width: 30, height: 30, speed: 2, direction: 1, color: 'red', initialX: 140, initialY: 300 },  // Moving right
            { x: 350, y: 400, width: 30, height: 30, speed: 1, direction: -1, color: 'green', initialX: 350, initialY: 400 }, // Moving left
        ],

},
{
    player: { x: 50, y: 50, width: 30, height: 30, color: 'red', speed: 3 },
    walls: [
        { x: 0, y: 0, width: 10, height: canvas.height },
        { x: 0, y: 0, width: canvas.width, height: 10 },
        { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
        { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },
        
        { x: 175, y: 250, width: 190, height: 30 }, // Horizontal wall below spike wall
        {x: 300, y:0, width: 30, height:700} ,  
        { x: 120, y: 350, width: 190, height: 30 },
    ],
    
    entrance:{ x: 200, y: 200, width: 40, height: 40, color: 'green', active:true },
    exit:{ x: 600, y: 300, width: 40, height: 40, color: 'blue', active:false },
    originalEntrance: { x: 200, y: 200 }, // Store the original entrance position
        originalExit: { x: 600, y: 300 },     // Store the original exit position
    switches:[{x: 600, y: 400, width: 40, height: 40, color: 'yellow', activated:false},
    {x:200, y:140, width: 40, height: 40, color: 'yellow', activated:false},
],
    pressurePlate: { x: 400, y: 400, width: 50, height: 50, color: 'yellow', activated: false },
    spikeWall: { x: 110, y: 250, width: 10, height: 100, color: 'black', visible: true },
    box: { x: 170, y: 300, width: 30, height: 30, color: 'brown', initialX: 200, initialY: 300 },
    door: { x: 750, y: 250, width: 30, height: 100, locked: true },
    key: { x: 200, y: 300, width: 20, height: 20, color: 'gold', collected: false },
    enemies: [
            { x: 140, y: 300, width: 30, height: 30, speed: 2, direction: 1, color: 'red', initialX: 140, initialY: 300 },  // Moving right
            { x: 350, y: 400, width: 30, height: 30, speed: 1, direction: -1, color: 'green', initialX: 350, initialY: 400 }, // Moving left
        ],

},
{
    player: { x: 50, y: 300, width: 30, height: 30, color: 'red', speed: 3 },
    walls: [
        { x: 0, y: 0, width: 10, height: canvas.height },
        { x: 0, y: 0, width: canvas.width, height: 10 },
        { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
        { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },
],

    crates: [
    { x: 200, y: 300, width: 40, height: 40, originalWidth: 40, originalHeight: 40, initialX: 200, initialY: 300 },
    { x: 300, y: 300, width: 40, height: 40, originalWidth: 40, originalHeight: 40, initialX: 300, initialY: 300 },
    ],
    waterGaps: [
        { x: 400, y: 0, width: 40, height: 700, color: 'blue', obstacles: [] },
        { x: 500, y: 0, width: 40, height: 700, color: 'blue', obstacles: [] },
    ],
    key: { x: 650, y: 500, width: 20, height: 20, color: 'gold', collected: false },
    door: { x: 750, y: 300, width: 30, height: 100, locked: true },
}, 
{
    player: { x: 50, y: 50, width: 30, height: 30, color: 'red', speed: 3 },
    walls: [
        { x: 0, y: 0, width: 10, height: canvas.height },
        { x: 0, y: 0, width: canvas.width, height: 10 },
        { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
        { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },
        {x:0, y: 400, width: 300, height:30},
        {x:300, y:400, width: 30, height:300},
        {x:550, y:325, width:250, height:30},
],
teleporters: [
    { x: 50, y: 450, width: 40, height: 40, color: 'blue', targetX: 700, targetY: 150 },
    { x: 700, y: 200, width: 40, height: 40, color: 'purple', targetX: 50, targetY: 500 },
],

    crates: [
        { x: 200, y: 300, width: 40, height: 40, color: 'brown', originalWidth: 40, originalHeight: 40, initialX: 200, initialY: 300 },
        { x: 650, y: 400, width: 40, height: 40, color: 'brown', originalWidth: 40, originalHeight: 40, initialX: 650, initialY: 400 },
    ],
    waterGaps: [
        { x: 552, y: 355, width: 40, height: 240, color: 'blue' },
        {x:552, y:0, width:40, height:320, color: 'blue'},
    ],
    key: { x: 250, y: 450, width: 20, height: 20, color: 'gold', collected: false },
    door: { x: 750, y: 400, width: 30, height: 100, locked: true },
},
{
    message: "LEVELS COMING SOON!"
} 
];

// Create a separate canvas for tooltips
const tooltipCanvas = document.createElement('canvas');
tooltipCanvas.width = canvas.width;
tooltipCanvas.height = canvas.height;
tooltipCanvas.style.position = 'absolute';
tooltipCanvas.style.top = `${canvas.offsetTop}px`;
tooltipCanvas.style.left = `${canvas.offsetLeft}px`;
tooltipCanvas.style.pointerEvents = 'none'; // Allow clicks to pass through
tooltipCanvas.style.zIndex = 1000; // Ensure it's above the main game canvas
document.body.appendChild(tooltipCanvas);

// Get the context for the tooltip canvas
const tooltipCtx = tooltipCanvas.getContext('2d');

function resolveEnemyWallCollision(enemy, walls) {
    walls.forEach(wall => {
        if (isColliding(enemy, wall)) {
            // Reverse the direction when hitting a wall
            enemy.direction *= -1;  // Flip direction from left to right or right to left
        }
    });
}

function resolveEnemyBoxCollision(enemy, box) {
    if (isColliding(enemy, box)) {
        // Reverse the direction when hitting the box
        enemy.direction *= -1;  // Flip direction from left to right or right to left
    }
}
function resolveEnemySpikeWallCollision(enemy, spikeWall) {
    if (spikeWall.visible && isColliding(enemy, spikeWall))  {
        // Reverse the enemy's direction when hitting the spike wall
        enemy.direction *= -1;  // Flip direction from left to right or right to left
    }
}

function moveEnemies(levelData) {
    levelData.enemies?.forEach(enemy => {
        // Move the enemy
        enemy.x += enemy.speed * enemy.direction;

        // Reverse direction if the enemy hits a wall or the canvas boundary
        if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
            enemy.direction *= -1;  // Reverse direction
        }
    });
}
function isCollidingWithEnemies(player, enemies) {
    return enemies?.some(enemy => {
        return player.x < enemy.x + enemy.width &&
               player.x + player.width > enemy.x &&
               player.y < enemy.y + enemy.height &&
               player.y + player.height > enemy.y;
    });
}
function checkTeleport(levelData) {
        levelData.teleporters?.forEach(teleporter => {
            if (isColliding(levelData.player, teleporter)) {
                // Move the player to the target teleport location
                levelData.player.x = teleporter.targetX;
                levelData.player.y = teleporter.targetY;
            }
        });
    }

    function isColliding(rect1, rect2) {
    // Check if both objects exist and have necessary properties
    if (!rect1 || !rect2) return false;

    // ✅ NEW: Ignore crates that became bridges
    if (rect2.isBridge) return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
    if (rect1.width === 0 || rect1.height === 0 || rect2.width === 0 || rect2.height === 0) return false;
    // Check for overlap
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}


        function resolveCollision(entity, walls) {
    // Resolve collisions with walls
    walls.forEach(wall => {
        // Handle horizontal (left/right) collisions
        if (entity.x + entity.width > wall.x && entity.x < wall.x + wall.width) {
            if (entity.y < wall.y) {
                // If moving upwards, stop the player at the top of the wall
                entity.y = Math.min(entity.y, wall.y - entity.height);
            } else if (entity.y + entity.height > wall.y + wall.height) {
                // If moving downwards, stop the player at the bottom of the wall
                entity.y = Math.max(entity.y, wall.y + wall.height);
            }
        }

        // Handle vertical (up/down) collisions
        if (entity.y + entity.height > wall.y && entity.y < wall.y + wall.height) {
            if (entity.x < wall.x) {
                // If moving left, stop the player at the left of the wall
                entity.x = Math.min(entity.x, wall.x - entity.width);
            } else if (entity.x + entity.width > wall.x + wall.width) {
                // If moving right, stop the player at the right of the wall
                entity.x = Math.max(entity.x, wall.x + wall.width);
            }
        }
    });

  

    // Ensure player stays within the canvas boundaries
    if (entity.x < 0) entity.x = 0; // left border
    if (entity.y < 0) entity.y = 0; // top border
    if (entity.x + entity.width > canvas.width) entity.x = canvas.width - entity.width; // right border
    if (entity.y + entity.height > canvas.height) entity.y = canvas.height - entity.height; // bottom border
}

        function checkPressurePlate(levelData) {
            if(levelData.pressurePlate){
            if (isColliding(levelData.player, levelData.pressurePlate) || isColliding(levelData.box, levelData.pressurePlate)) {
                levelData.pressurePlate.activated = true;
                levelData.spikeWall.visible = false;
            } else {
                levelData.pressurePlate.activated = false;
                levelData.spikeWall.visible = true;
            }
        }
        }

        function handleSwitches(levelData, player) {
    if (levelData.switches) {
        levelData.switches.forEach((switchObj) => {
            // Check if the player is colliding with the current switch
            if (isColliding(player, switchObj)) {
                if (!switchObj.activated) {
                    // Activate the switch and toggle entrance/exit
                    switchObj.activated = true;

                    // Example: Swap entrance and exit when any switch is activated
                    const tempX = levelData.entrance.x;
                    const tempY = levelData.entrance.y;

                    levelData.entrance.x = levelData.exit.x;
                    levelData.entrance.y = levelData.exit.y;

                    levelData.exit.x = tempX;
                    levelData.exit.y = tempY;

                    // Swap active states
                    levelData.entrance.active = !levelData.entrance.active;
                    levelData.exit.active = !levelData.exit.active;
                }
            } else {
                // Reset switch to inactive when the player leaves
                switchObj.activated = false;
            }
        });
    }
}

function drawSwitches(levelData) {
    levelData.switches?.forEach(switchObj => {
        ctx.fillStyle = "darkgray";
        ctx.fillRect(switchObj.x, switchObj.y, switchObj.width, switchObj.height);

        ctx.fillStyle = switchObj.activated ? "green" : "red";
        ctx.beginPath();
        ctx.arc(
            switchObj.x + switchObj.width / 2,
            switchObj.y + switchObj.height / 2,
            Math.min(switchObj.width, switchObj.height) / 4,
            0, Math.PI * 2
        );
        ctx.fill();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(switchObj.x, switchObj.y, switchObj.width, switchObj.height);
    });
}

        function moveBox(player, box, walls) {
    // Only move the box if the player is colliding with it
    if (isColliding(player, box)) {
        // Move the box based on the player's direction
        if (keysPressed['ArrowUp']) box.y -= player.speed;
        if (keysPressed['ArrowDown']) box.y += player.speed;
        if (keysPressed['ArrowLeft']) box.x -= player.speed;
        if (keysPressed['ArrowRight']) box.x += player.speed;
        
        // Resolve the collision of the box with walls
        resolveCollision(box, walls);
    }

    // Prevent the player from moving into the box
    if (isColliding(player, box)) {
        if (keysPressed['ArrowUp']) player.y += player.speed; // Prevent player from moving up into the box
        if (keysPressed['ArrowDown']) player.y -= player.speed; // Prevent player from moving down into the box
        if (keysPressed['ArrowLeft']) player.x += player.speed; // Prevent player from moving left into the box
        if (keysPressed['ArrowRight']) player.x -= player.speed; // Prevent player from moving right into the box
    }
}
function drawEntranceExit(levelData) {
    const entrance = levelData.entrance;
    const exit = levelData.exit;

    // Draw Entrance Gate
    const entranceGradient = ctx.createLinearGradient(entrance.x, entrance.y, entrance.x + entrance.width, entrance.y + entrance.height);
    entranceGradient.addColorStop(0, entrance.active ? "green" : "darkgray");
    entranceGradient.addColorStop(1, entrance.active ? "lightgreen" : "gray");

    ctx.fillStyle = entranceGradient;
    ctx.fillRect(entrance.x, entrance.y, entrance.width, entrance.height);

    // Add glowing effect to entrance
    if (entrance.active) {
        ctx.strokeStyle = "rgba(0, 255, 0, 0.5)"; // Green glow
        ctx.lineWidth = 6;
        ctx.strokeRect(entrance.x - 2, entrance.y - 2, entrance.width + 4, entrance.height + 4);
    }

    // Draw inward arrows for entrance
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(entrance.x + entrance.width / 4, entrance.y + entrance.height / 2);
    ctx.lineTo(entrance.x + entrance.width / 2, entrance.y + entrance.height / 4);
    ctx.lineTo(entrance.x + entrance.width / 2, entrance.y + (entrance.height * 3) / 4);
    ctx.closePath();
    ctx.fill();

    // Draw Exit Gate
    const exitGradient = ctx.createLinearGradient(exit.x, exit.y, exit.x + exit.width, exit.y + exit.height);
    exitGradient.addColorStop(0, exit.active ? "blue" : "darkgray");
    exitGradient.addColorStop(1, exit.active ? "lightblue" : "gray");

    ctx.fillStyle = exitGradient;
    ctx.fillRect(exit.x, exit.y, exit.width, exit.height);

    // Add glowing effect to exit
    if (exit.active) {
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"; // Blue glow
        ctx.lineWidth = 6;
        ctx.strokeRect(exit.x - 2, exit.y - 2, exit.width + 4, exit.height + 4);
    }

    // Draw outward arrows for exit
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(exit.x + exit.width / 2, exit.y + exit.height / 4);
    ctx.lineTo(exit.x + (exit.width * 3) / 4, exit.y + exit.height / 2);
    ctx.lineTo(exit.x + exit.width / 2, exit.y + (exit.height * 3) / 4);
    ctx.closePath();
    ctx.fill();
}

function restrictGateMovement(player, levelData) {
    if (levelData.entrance?.active && isColliding(player, levelData.exit)) {
        // Block movement through the inactive exit
        resolveCollision(player, [levelData.exit]);
    }

    if (levelData.exit?.active && isColliding(player, levelData.entrance)) {
        // Block movement through the inactive entrance
        resolveCollision(player, [levelData.entrance]);
    }
}
function handleTeleport(levelData, player) {
    // Teleport from entrance to exit
    if (
        levelData.entrance?.active && // Check if entrance is active
        isColliding(player, levelData.entrance) // Player is colliding with entrance
    ) {
        // Move player to the exit
        player.x = levelData.exit.x + levelData.exit.width / 2 - player.width / 2;
        player.y = levelData.exit.y + levelData.exit.height / 2 - player.height / 2;

        // Deactivate entrance, activate exit (to prevent reverse movement)
        levelData.entrance.active = false;
        levelData.exit.active = true;
    }

    // Prevent reverse teleportation (exit to entrance)
    if (
        levelData.exit?.active && // Check if exit is active
        isColliding(player, levelData.exit) // Player is colliding with exit
    ) {
        // Block the player from moving through the exit back to the entrance
        resolveCollision(player, [levelData.exit]);
    }
}

// Example usage: Call this function when you need to reset

function startGame(level) {
    const levelData = levels[level];
    let baseSpeed = 3; // Default player speed
    let scaleFactor = canvas.width / 800;
    levelData.player.speed = baseSpeed * scaleFactor;
    if (levelData.message) {
        alert(levelData.message); // Show popup
        showLevelSelector(); // Return to level select
        return;
    }
    // Reset player position
    levelData.player.x = 50;
    levelData.player.y = 50;

    // Reset key and door states
    if (levelData.key) levelData.key.collected = false;
    if (levelData.door) levelData.door.locked = true;

    // Reset spike wall visibility
    if (levelData.spikeWall) levelData.spikeWall.visible = true;

    // Reset box position
    if (levelData.box) {
        levelData.box.x = levelData.box.initialX || 0; // Default to 0 if initialX is missing
        levelData.box.y = levelData.box.initialY || 0;
    }

    // Reset switches
    if (levelData.switches) {
        levelData.switches.forEach(switchObj => {
            switchObj.activated = false;
        });
    }

    // Reset entrance and exit gates
    if (levelData.entrance && levelData.exit) {
        levelData.entrance.x = levelData.originalEntrance.x || levelData.entrance.x;
        levelData.entrance.y = levelData.originalEntrance.y || levelData.entrance.y;
        levelData.entrance.active = true;

        levelData.exit.x = levelData.originalExit.x || levelData.exit.x;
        levelData.exit.y = levelData.originalExit.y || levelData.exit.y;
        levelData.exit.active = false;
    }

    // Reset enemies
    if (levelData.enemies) {
        levelData.enemies.forEach(enemy => {
            enemy.x = enemy.initialX || 0;
            enemy.y = enemy.initialY || 0;
            enemy.direction = enemy.initialDirection || 1;
        });
    }

    // Reset portals
    if (levelData.portals) {
        levelData.portals.forEach(portal => {
            // Ensure portal targets are valid
            if (!portal.targets || portal.targets.length === 0) {
                portal.targets = [{ x: 0, y: 0 }]; // Default target
            }
        });
    }

    // Reset crates
    // Reset crates
// ✅ Reset crates (bring them back to original positions)
if(levelData.waterGaps){
        levelData.waterGaps?.forEach(waterGap => {
            waterGap.filled = false;
            waterGap.obstacles = [];
    });
     }
     console.log("Before resetting crates:", levelData.crates);
console.log("Original crates from levels[level]:", levels[level].crates);

// ✅ Restore all crates
if (levelData.crates) {
    levelData.crates.forEach(crate => {
        crate.x = crate.initialX;
        crate.y = crate.initialY;
        crate.width = crate.originalWidth;  // ✅ Restore original width
        crate.height = crate.originalHeight;
        crate.isBridge = false;  // ✅ Reset the crate so it can be used again after restarting
        crate.hidden=false;
    });
}


    // Cancel any ongoing game loops before starting a new one
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
     // ✅ Reset water gap obstacles
     
    // Start the game loop
    gameLoop();
}

document.getElementById('mainMenuButton').addEventListener('click', () => {
    showLevelSelector();  // Show the level selector
    cancelAnimationFrame(gameLoopId); // Stop the game loop
});

function drawBox(levelData) {
    const box = levelData.box;
    const gradient = ctx.createLinearGradient(box.x, box.y, box.x + box.width, box.y + box.height);
    gradient.addColorStop(0, "brown");
    gradient.addColorStop(1, "darkorange");

    ctx.fillStyle = gradient;
    ctx.fillRect(box.x, box.y, box.width, box.height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, box.y, box.width, box.height);
}

function drawPressurePlate(levelData) {
    const plate = levelData.pressurePlate;
    ctx.fillStyle = plate.activated ? "green" : "yellow";
    ctx.fillRect(plate.x, plate.y, plate.width, plate.height);

    ctx.fillStyle = "darkgray";
    ctx.fillRect(plate.x, plate.y + plate.height - 5, plate.width, 5);
    ctx.fillStyle = "lightgray";
    ctx.fillRect(plate.x, plate.y, plate.width, 5);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(plate.x, plate.y, plate.width, plate.height);
}

function drawTeleporters(levelData) {
    levelData.teleporters?.forEach(teleporter => {
        const gradient = ctx.createRadialGradient(
            teleporter.x + teleporter.width / 2, teleporter.y + teleporter.height / 2, teleporter.width / 4,
            teleporter.x + teleporter.width / 2, teleporter.y + teleporter.height / 2, teleporter.width
        );
        gradient.addColorStop(0, teleporter.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(teleporter.x, teleporter.y, teleporter.width, teleporter.height);

        ctx.strokeStyle = teleporter.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(teleporter.x, teleporter.y, teleporter.width, teleporter.height);
    });
}

function drawKey(levelData) {
    if (!levelData.key.collected) {
        const key = levelData.key;

        // Draw the circular head of the key
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(
            key.x + key.width / 2, // Center X
            key.y + key.height / 2, // Center Y
            key.width / 3, // Radius
            0, Math.PI * 2 // Full circle
        );
        ctx.fill();

        // Draw the rectangular shaft of the key
        ctx.fillStyle = "darkgoldenrod";
        ctx.fillRect(
            key.x + key.width / 3, // Start X
            key.y + key.height / 2 - key.height / 8, // Start Y
            key.width / 3 * 2, // Width of the shaft
            key.height / 4 // Height of the shaft
        );

        // Add decorative teeth
        ctx.fillRect(key.x + key.width * 0.75, key.y + key.height / 2, key.width / 8, key.height / 8);
        ctx.fillRect(key.x + key.width * 0.85, key.y + key.height / 2 - key.height / 8, key.width / 8, key.height / 8);

        // Add outline
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(key.x, key.y, key.width, key.height);
    }
}

let gridOffSet = 0; // Initial offset for grid animation
function drawGridBackground() {
    // Fill the canvas with a base texture-like color
    ctx.fillStyle = "#2C2C54"; // Dark purple, RPG-like aesthetic
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add stone-like grid pattern
    const gridSpacing = 40;
    const secondaryGridSpacing = gridSpacing / 2;

    // Add primary grid lines (stone-like texture)
    ctx.strokeStyle = "rgba(173, 216, 230, 0.5)"; // Subtle blue lines
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Add subtle glowing effects on grid intersections
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; // Glowing intersections
    for (let x = 0; x <= canvas.width; x += gridSpacing) {
        for (let y = 0; y <= canvas.height; y += gridSpacing) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2); // Small dots
            ctx.fill();
        }
    }

    // Add decorative elements (e.g., faded runes)
    ctx.fillStyle = "rgba(255, 223, 186, 0.1)"; // Rune-like color
    ctx.font = "20px serif";
    ctx.fillText("✦", canvas.width / 4, canvas.height / 3); // Example rune
    ctx.fillText("✧", canvas.width / 2, canvas.height / 2); // Example rune
    ctx.fillText("✪", (canvas.width * 3) / 4, (canvas.height * 2) / 3); // Example rune
}

// Update the gameLoop to allow canceling
let gameLoopId;
// Tooltip toggle state
let tooltipsEnabled = true;

// Get the toggle button element
const toggleTooltipsButton = document.getElementById('toggleTooltipsButton');

// Add an event listener to toggle tooltips on/off
toggleTooltipsButton.addEventListener('click', () => {
    tooltipsEnabled = !tooltipsEnabled; // Toggle the state
    toggleTooltipsButton.textContent = tooltipsEnabled ? "Tooltips: On" : "Tooltips: Off";
});

// Draw tooltips only if tooltipsEnabled is true
function drawTooltips(levelData) {
    if (!tooltipsEnabled) return; // Skip rendering if tooltips are off

    const player = levelData.player;

    tooltipCtx.clearRect(0, 0, canvas.width, canvas.height);

    // Helper function to check if player is near an object
    function isPlayerCloseTo(player, object) {
        if (
            !object || 
            object.x === undefined || 
            object.y === undefined || 
            object.width === undefined || 
            object.height === undefined
        ) {
            console.warn('Invalid object passed to isPlayerCloseTo:', object);
            return false; // Skip invalid objects
        }

        const dx = player.x + player.width / 2 - (object.x + object.width / 2);
        const dy = player.y + player.height / 2 - (object.y + object.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        const proximityRange = 50; // Define the proximity range
        return distance <= proximityRange;
    }

    // Helper to render tooltip
    function renderTooltip(object, text) {
        if (!object) return;

        const tooltipX = object.x + object.width / 2;
        const tooltipY = object.y - 10; // Slightly above the object

        // Draw tooltip background
        tooltipCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        tooltipCtx.fillRect(tooltipX - 50, tooltipY - 20, 100, 20);

        // Draw tooltip text
        tooltipCtx.fillStyle = 'white';
        tooltipCtx.font = '12px Arial';
        tooltipCtx.fillText(text, tooltipX - 45, tooltipY - 5);
    }
    // Loop through each object type and render tooltips
    if (levelData.waterGaps) {
        levelData.waterGaps.forEach(waterGap => {
            if (isPlayerCloseTo(player, waterGap) && !waterGap.filled) {
                renderTooltip(waterGap, "Bridge with a crate");
            }
        });
    }

    if (levelData.crates) {
        levelData.crates.forEach(crate => {
            if (isPlayerCloseTo(player, crate)) {
                renderTooltip(crate, "Push the crate");
            }
        });
    }

    if (levelData.spikeWall && isPlayerCloseTo(player, levelData.spikeWall)) {
        renderTooltip(levelData.spikeWall, "Avoid the spike wall");
    }

    if (levelData.key && !levelData.key.collected && isPlayerCloseTo(player, levelData.key)) {
        renderTooltip(levelData.key, "Pick up the key!");
    }

    if (levelData.door && isPlayerCloseTo(player, levelData.door)) {
        const doorText = levelData.door.locked ? "Door is locked!" : "Enter the door";
        renderTooltip(levelData.door, doorText);
    }

    if (levelData.pressurePlate && isPlayerCloseTo(player, levelData.pressurePlate)) {
        renderTooltip(levelData.pressurePlate, "Step on the plate");
    }

    if (levelData.teleporters) {
        levelData.teleporters.forEach(teleporter => {
            if (isPlayerCloseTo(player, teleporter)) {
                renderTooltip(teleporter, "Use the teleporter");
            }
        });
    }

    if (levelData.enemies) {
        levelData.enemies.forEach(enemy => {
            if (isPlayerCloseTo(player, enemy)) {
                renderTooltip(enemy, "Danger! Enemy nearby!");
            }
        });
    }

    if (levelData.box && isPlayerCloseTo(player, levelData.box)) {
        renderTooltip(levelData.box, "Push the box");
    }
}

function handleCrates(levelData) {
    levelData.crates.forEach(crate => {
        if (crate.isBridge) return; // ✅ Ignore crates that are already bridges

        if (isColliding(levelData.player, crate)) {
            if (keysPressed['ArrowUp']) crate.y -= levelData.player.speed;
            if (keysPressed['ArrowDown']) crate.y += levelData.player.speed;
            if (keysPressed['ArrowLeft']) crate.x -= levelData.player.speed;
            if (keysPressed['ArrowRight']) crate.x += levelData.player.speed;

            resolveCollision(crate, levelData.walls);
            
            levelData.crates.forEach(otherCrate => {
                if (crate !== otherCrate && isColliding(crate, otherCrate)) {
                    resolveCollision(crate, [otherCrate]);
                }
            });
        }

        // ✅ Check if crate is already on a bridge
        let isOnBridge = levelData.waterGaps.some(waterGap =>
            waterGap.obstacles.some(bridge => isColliding(crate, bridge))
        );

        if (!isOnBridge) {
            levelData.waterGaps.forEach(waterGap => {
                if (isColliding(crate, waterGap)) {
                    // ✅ Try to find an existing bridge in this water gap
                    let existingBridge = waterGap.obstacles.find(b => b.isBridge);

                    if (existingBridge) {
                        // ✅ Merge the new bridge into the existing one
                        existingBridge.y = Math.min(existingBridge.y, crate.y);
                        existingBridge.height = Math.max(existingBridge.height, crate.height * 2);
                    } else {
                        // ✅ Create a new bridge if none exists
                        let bridge = {
                            x: waterGap.x,
                            y: crate.y,
                            width: waterGap.width,
                            height: crate.height * 2, 
                            isBridge: true
                        };

                        waterGap.obstacles.push(bridge);
                    }

                    crate.isBridge = true; // ✅ Mark crate as a bridge
                    crate.hidden = true; // ✅ Hide the crate
                    crate.width = 0; // ✅ Remove hitbox
                    crate.height = 0; // ✅ Remove hitbox
                }
            });
        }
    });
}

function drawCrates(levelData) {
    levelData.crates?.forEach(crate => {
        if (crate.hidden) return;
        const gradient = ctx.createLinearGradient(crate.x, crate.y, crate.x + crate.width, crate.y + crate.height);
        gradient.addColorStop(0, 'brown');
        gradient.addColorStop(1, 'darkorange');

        ctx.fillStyle = gradient;
        ctx.fillRect(crate.x, crate.y, crate.width, crate.height);

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(crate.x, crate.y, crate.width, crate.height);
    });
}

function drawWaterGaps(levelData) {
    levelData.waterGaps.forEach(waterGap => {
        ctx.fillStyle = waterGap.color || 'blue';
        let topY = waterGap.y; 

        let sortedBridges = [...waterGap.obstacles].sort((a, b) => a.y - b.y);
        
        sortedBridges.forEach(bridge => {
            // ✅ Draw water only above the bridge
            ctx.fillRect(waterGap.x, topY, waterGap.width, bridge.y - topY);
            topY = bridge.y + bridge.height;

            // ✅ Draw the extended bridge
            ctx.fillStyle = 'brown';
            ctx.fillRect(bridge.x, bridge.y, bridge.width, bridge.height);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.strokeRect(bridge.x, bridge.y, bridge.width, bridge.height);
            ctx.fillStyle = waterGap.color || 'blue';
        });

        // ✅ Draw remaining water below last bridge
        if (topY < waterGap.y + waterGap.height) {
            ctx.fillRect(waterGap.x, topY, waterGap.width, waterGap.y + waterGap.height - topY);
        }
    });

    // ✅ Fix Crates Floating on Water
    levelData.crates.forEach(crate => {
        let isOnBridge = false;
        levelData.waterGaps.forEach(waterGap => {
            waterGap.obstacles.forEach(bridge => {
                if (isColliding(crate, bridge)) {
                    isOnBridge = true;
                }
            });
        });

        if (!isOnBridge) {
            // ✅ Crate should sink
            levelData.waterGaps.forEach(waterGap => {
                if (isColliding(crate, waterGap)) {
                    waterGap.obstacles.push({
                        x: crate.x - (crate.width / 2), 
                        y: crate.y,
                        width: crate.width * 2, 
                        height: crate.height,
                        isBridge: true
                    });
                    crate.hidden = false; // ✅ Mark as inactive instead of deleting
                }
            });
        }
    });

    // ✅ Remove inactive crates after loop
    levelData.crates = levelData.crates.filter(crate => crate.isActive !== false);
}

function checkWaterGapCollision(player, waterGap) {
    // Check if the water gap is filled (blocked by a crate)
    if (waterGap.filled) {
        // Prevent player from crossing the blocked water gap
        if (
            player.x + player.width > waterGap.x &&
            player.x < waterGap.x + waterGap.width &&
            player.y + player.height > waterGap.y &&
            player.y < waterGap.y + waterGap.height
        ) {
            return true;  // Block player from passing
        }
    }
    return false; // No collision if water gap is not blocked
}

function resolvePlayerWaterGapCollision(levelData) {
    levelData.waterGaps.forEach(waterGap => {
        let isOnBridge = waterGap.obstacles.some(bridge => isColliding(levelData.player, bridge));

        if (!isOnBridge) {
            // ✅ Block movement in water only if no bridge is present
            resolveCollision(levelData.player, [waterGap]);
        }
    });

    levelData.crates.forEach(crate => {
        if (crate.isBridge) return; // ✅ Ignore bridge crates

        let isOnBridge = levelData.waterGaps.some(waterGap =>
            waterGap.obstacles.some(bridge => isColliding(crate, bridge))
        );

        if (!isOnBridge) {
            resolveCollision(crate, levelData.waterGaps);
        }
    });
}

function handleSwitchesWithBarriers(levelData) {
    levelData.switches?.forEach(switchObj => {
        if (isColliding(levelData.player, switchObj)) {
            if (!switchObj.activated) {
                switchObj.activated = true;
                const barrier = levelData.barriers.find(b => b.id === switchObj.target);
                if (barrier) {
                    barrier.active = !barrier.active;
                }
            }
        }
    });
}

function drawBarriers(levelData) {
    levelData.barriers?.forEach(barrier => {
        if (barrier.active) {
            ctx.fillStyle = barrier.color;
            ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
        }
    });
}

function handleSwitchesWithBarriers(levelData) {
    levelData.switches?.forEach(switchObj => {
        if (isColliding(levelData.player, switchObj)) {
            if (!switchObj.activated) {
                switchObj.activated = true;
                const barrier = levelData.barriers.find(b => b.id === switchObj.target);
                if (barrier) {
                    barrier.active = !barrier.active;
                }
            }
        }
    });
}

function drawBarriers(levelData) {
    levelData.barriers?.forEach(barrier => {
        if (barrier.active) {
            ctx.fillStyle = barrier.color;
            ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
        }
    });
}

// Update the game loop to include tooltip rendering
        function gameLoop() {
drawGridBackground();
    const levelData = levels[currentLevel];
    tooltipCtx.clearRect(0, 0, canvas.width, canvas.height);

    // Prevent player from moving beyond the borders (top, bottom, left, right)
    if (keysPressed['ArrowUp'] && levelData.player.y > 0) {
        levelData.player.y -= levelData.player.speed;
    }
    if (keysPressed['ArrowDown'] && levelData.player.y + levelData.player.height < canvas.height) {
        levelData.player.y += levelData.player.speed;
    }
    if (keysPressed['ArrowLeft'] && levelData.player.x > 0) {
        levelData.player.x -= levelData.player.speed;
    }
    if (keysPressed['ArrowRight'] && levelData.player.x + levelData.player.width < canvas.width) {
        levelData.player.x += levelData.player.speed;
    }

    // Resolve collision with walls and borders
    resolveCollision(levelData.player, levelData.walls);
    checkTeleport(levelData);
    // Handle door collision (locked door behavior)
    if (isColliding(levelData.player, levelData.door)) {
        if (levelData.door.locked) {
            // Prevent the player from moving through the locked door
            resolveCollision(levelData.player, [levelData.door]);
        } else {
            // If the door is unlocked, move to the next level
            if (currentLevel < levels.length - 1) {
                currentLevel++;
                startGame(currentLevel);
            }
        }
    }

    // Handle spike wall collision (kill the player if they collide with spikes)
if(levelData.spikeWall){
    if (levelData.spikeWall.visible && isColliding(levelData.player, levelData.spikeWall)) {
        startGame(currentLevel);  // Reset the game on collision with spikes
    }
    if (levelData.spikeWall.visible) {
        ctx.fillStyle = levelData.spikeWall.color;
        ctx.fillRect(levelData.spikeWall.x, levelData.spikeWall.y, levelData.spikeWall.width, levelData.spikeWall.height);
    }
}
    // Handle movement and collision of the box
 
if(tooltipsEnabled){
    drawTooltips(levelData);
}
    // Draw player
    ctx.fillStyle = levelData.player.color;
    ctx.fillRect(levelData.player.x, levelData.player.y, levelData.player.width, levelData.player.height);
   if(levelData.teleporters){
    drawTeleporters(levelData);
   }
    // Draw the box
if(levelData.box){
    drawBox(levelData);
    moveBox(levelData.player, levelData.box, levelData.walls);
}
    // Draw pressure plate
    checkPressurePlate(levelData);
    if(levelData.pressurePlate){
        drawPressurePlate(levelData);
    }
    // Draw spike wall


    // Draw walls
    levelData.walls.forEach(wall => {
        ctx.fillStyle = 'gray';
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    levelData.enemies?.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        resolveEnemyWallCollision(enemy, levelData.walls);
        resolveEnemyBoxCollision(enemy, levelData.box);
        resolveEnemySpikeWallCollision(enemy,levelData.spikeWall);
    });
    moveEnemies(levelData);
    if (isCollidingWithEnemies(levelData.player, levelData.enemies)) {
        startGame(currentLevel);  // Reset game if colliding with enemy
    }

    // Handle crates (Level 6)
    if (levelData.crates) {
        handleCrates(levelData); // Move and resolve crate collisions
        drawCrates(levelData);   // Render crates
    }

    // Handle water gaps (Level 6)
    if (levelData.waterGaps) {
        drawWaterGaps(levelData); // Render water gaps
        levelData.waterGaps.forEach(waterGap => {
    let canWalk = waterGap.obstacles.some(crate => isColliding(levelData.player, crate));

    if (!canWalk) {
        resolveCollision(levelData.player, [waterGap]);
    }
});

    }
    
    // Handle switches and barriers (Level 7)

    if (levelData.barriers) {
        drawBarriers(levelData); // Render active barriers
    }

    if (levelData.entrance && levelData.exit) {
        drawEntranceExit(levelData);
    }
    if(levelData.switches){
      drawSwitches(levelData); 
      handleSwitches(levelData, levelData.player); 
      if(levelData.barriers){
        handleSwitchesWithBarriers(levelData); // Check switch activations
      }
    }
    restrictGateMovement(levelData.player, levelData);
    handleTeleport(levelData, levelData.player);

    // Draw key
    if (!levelData.key.collected) {
        drawKey(levelData);
    }

    // Handle key collection
    if (isColliding(levelData.player, levelData.key) && !levelData.key.collected) {
        levelData.key.collected = true;
        levelData.door.locked = false; // Unlock the door
    }

    // Draw door (locked or unlocked)
    ctx.fillStyle = levelData.door.locked ? 'gray' : 'green';
    ctx.fillRect(levelData.door.x, levelData.door.y, levelData.door.width, levelData.door.height);

    gameLoopId = requestAnimationFrame(gameLoop);
}
// Add this inside your <script> tag in the HTML file

// Add an event listener to the retry button
document.getElementById('retryButton').addEventListener('click', () => {
    startGame(currentLevel);  // Reset the current level
    gameLoop();                // Restart the game loop
});
const levelSelector = document.getElementById('levelSelector');
const level1Btn = document.getElementById('level1Btn');
const level2Btn = document.getElementById('level2Btn');
const level3Btn = document.getElementById('level3Btn');
const level4Btn = document.getElementById('level4Btn');
const level5Btn = document.getElementById('level5Btn');
const level6Btn = document.getElementById('level6Btn');
const level7Btn = document.getElementById('level7Btn');
// Function to show the level selector and hide the game canvas
function showLevelSelector() {
    levelSelector.style.display = 'block';
    canvas.style.display = 'none';  // Hide the game canvas initially
}
// Function to start the game on a specific level
function startSelectedLevel(levelIndex) {
    currentLevel = levelIndex;
    startGame(currentLevel);
    gameLoop();
    levelSelector.style.display = 'none';  // Hide level selector after starting the game
    canvas.style.display = 'block';  // Show the game canvas
}

// Event listeners for the level selection buttons
level1Btn.addEventListener('click', () => startSelectedLevel(0));
level2Btn.addEventListener('click', () => startSelectedLevel(1));
level3Btn.addEventListener('click', () => startSelectedLevel(2));
level4Btn.addEventListener('click', () => startSelectedLevel(3)); // Index 3 for Level 4
level5Btn.addEventListener('click', () => startSelectedLevel(4));
level6Btn.addEventListener('click', () => startSelectedLevel(5)); // Index 3 for Level 4
level7Btn.addEventListener('click', () => startSelectedLevel(6));
// Initially show the level selector when the page loads
showLevelSelector();

        // Event listeners for keyboard
        window.addEventListener('keydown', e => keysPressed[e.key] = true);
        window.addEventListener('keyup', e => keysPressed[e.key] = false);

        // Event listeners for mobile controls
        document.getElementById('upBtn').addEventListener('touchstart', () => keysPressed['ArrowUp'] = true);
        document.getElementById('downBtn').addEventListener('touchstart', () => keysPressed['ArrowDown'] = true);
        
        document.getElementById('leftBtn').addEventListener('touchstart', () => keysPressed['ArrowLeft'] = true);
        document.getElementById('rightBtn').addEventListener('touchstart', () => keysPressed['ArrowRight'] = true);

        document.getElementById('upBtn').addEventListener('touchend', () => keysPressed['ArrowUp'] = false);
        document.getElementById('downBtn').addEventListener('touchend', () => keysPressed['ArrowDown'] = false);
        document.getElementById('leftBtn').addEventListener('touchend', () => keysPressed['ArrowLeft'] = false);
        document.getElementById('rightBtn').addEventListener('touchend', () => keysPressed['ArrowRight'] = false);

        function resizeCanvas() {
    const canvas = document.getElementById("gameCanvas");

    let aspectRatio = 4 / 3; // Keep a consistent game aspect ratio

    if (window.innerWidth < 800) {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = canvas.width / aspectRatio;
    } else {
        canvas.width = Math.min(800, window.innerWidth * 0.8);
        canvas.height = canvas.width / aspectRatio;
    }

    // ✅ Normalize speed based on screen width
    let baseSpeed = 3; // Default speed
    let scaleFactor = canvas.width / 800; // Compare to original width
    levels[currentLevel].player.speed = baseSpeed * scaleFactor;

    gameLoop(); // Re-run the game with updated settings
}


window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

        // Start the game
        startGame(currentLevel);
        gameLoop();
