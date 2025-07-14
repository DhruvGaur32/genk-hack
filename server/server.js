const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/kgen");
app.use(express.json());
app.use(cors());

const imageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  previewImage: { type: String, required: true },
  tags: { type: [String], required: true },
  html: { type: String, default: "" },
});
const Image = mongoose.model("games", imageSchema);

app.post("/createimage", async (req, res) => {
  const { imageUrl, fileName, id } = req.body;
  console.log("imageUrl", imageUrl);
  try {
    if (!imageUrl || !fileName || !id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingImage = await Image.findOne({ id: id });

    if (!existingImage) {
      return res.status(404).json({ error: "Image with given ID not found" });
    }
    existingImage.previewImage = imageUrl;
    console.log("existingImage", existingImage);
    await existingImage.save();
    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(`Error uploading images: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

app.post("/templates", async (req, res) => {
  try {
//     const templates = [
//       {
//         id: "whackamole",
//         title: "WhackAMole",
//         description: "Catch the whack who pop ups from holes.",
//         category: "Web Game",
//         previewImage:
//           "https://image.pollinations.ai/prompt/monkey%20king?width=120&height=240&seed=42&model=flux&nologo=true&transparent=true",
//         tags: ["React", "Charts", "Analytics"],
//         html: `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Whack-a-Mole Game</title>
//     <style>
//       /* Reset and Base Styles */
//       * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//       }
      
//       body {
//         font-family: 'Arial', sans-serif;
//         background: linear-gradient(135deg, #87ceeb 0%, #98fb98 50%, #90ee90 100%);
//         background-size: cover;
//         background-repeat: no-repeat;
//         background-position: center center;
//         background-attachment: fixed;
//         min-height: 100vh;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         padding: 20px;
//         position: relative;
//         overflow-x: hidden;
//       }
      
//       /* Grass Background Effect */
//       body::before {
//         content: '';
//         position: absolute;
//         bottom: 0;
//         left: 0;
//         right: 0;
//         height: 200px;
//         background: linear-gradient(to top, #228b22 0%, #32cd32 50%, transparent 100%);
//         z-index: -1;
//       }
      
//       /* Header Styles */
//       .header {
//         text-align: center;
//         margin-bottom: 30px;
//         animation: slideDown 1s ease-out;
//       }
      
//       .title {
//         font-size: 3rem;
//         color: #2f4f2f;
//         text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
//         margin-bottom: 10px;
//         font-weight: bold;
//       }
      
//       .subtitle {
//         font-size: 1.2rem;
//         color: #556b2f;
//         font-weight: 500;
//       }
      
//       /* Audio Controls */
//       .audio-controls {
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: rgba(255, 255, 255, 0.9);
//         padding: 15px;
//         border-radius: 15px;
//         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
//         backdrop-filter: blur(10px);
//         z-index: 100;
//         display: flex;
//         align-items: center;
//         gap: 10px;
//       }
      
//       .audio-btn {
//         background: none;
//         border: none;
//         font-size: 1.5rem;
//         cursor: pointer;
//         padding: 8px;
//         border-radius: 50%;
//         transition: all 0.3s ease;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         width: 40px;
//         height: 40px;
//       }
      
//       .audio-btn:hover {
//         background: rgba(47, 79, 47, 0.1);
//         transform: scale(1.1);
//       }
      
//       .audio-btn.playing {
//         color: #32cd32;
//         background: rgba(50, 205, 50, 0.1);
//       }
      
//       .volume-control {
//         display: flex;
//         align-items: center;
//         gap: 8px;
//       }
      
//       .volume-slider {
//         width: 80px;
//         height: 4px;
//         background: #ddd;
//         border-radius: 2px;
//         outline: none;
//         cursor: pointer;
//       }
      
//       .volume-slider::-webkit-slider-thumb {
//         appearance: none;
//         width: 16px;
//         height: 16px;
//         background: #32cd32;
//         border-radius: 50%;
//         cursor: pointer;
//       }
      
//       .volume-slider::-moz-range-thumb {
//         width: 16px;
//         height: 16px;
//         background: #32cd32;
//         border-radius: 50%;
//         cursor: pointer;
//         border: none;
//       }
      
//       /* Difficulty Selection */
//       .difficulty-section {
//         background: rgba(255, 255, 255, 0.9);
//         padding: 20px;
//         border-radius: 15px;
//         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
//         margin-bottom: 20px;
//         backdrop-filter: blur(10px);
//         text-align: center;
//       }
      
//       .difficulty-label {
//         font-size: 1.1rem;
//         color: #2f4f2f;
//         margin-bottom: 15px;
//         font-weight: bold;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//       }
      
//       .difficulty-buttons {
//         display: flex;
//         gap: 10px;
//         justify-content: center;
//         flex-wrap: wrap;
//       }
      
//       .difficulty-btn {
//         padding: 12px 24px;
//         font-size: 1rem;
//         font-weight: bold;
//         border: 2px solid #2f4f2f;
//         border-radius: 20px;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         background: white;
//         color: #2f4f2f;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         min-width: 100px;
//       }
      
//       .difficulty-btn:hover {
//         background: #f0f8f0;
//         transform: translateY(-2px);
//         box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
//       }
      
//       .difficulty-btn.active {
//         background: linear-gradient(145deg, #32cd32, #228b22);
//         color: white;
//         border-color: #228b22;
//         box-shadow: 0 4px 15px rgba(50, 205, 50, 0.3);
//       }
      
//       .difficulty-btn:disabled {
//         opacity: 0.5;
//         cursor: not-allowed;
//         transform: none;
//       }
      
//       .difficulty-btn.easy.active {
//         background: linear-gradient(145deg, #90ee90, #32cd32);
//         border-color: #32cd32;
//       }
      
//       .difficulty-btn.medium.active {
//         background: linear-gradient(145deg, #ffd700, #ffa500);
//         border-color: #ffa500;
//         color: #2f4f2f;
//       }
      
//       .difficulty-btn.hard.active {
//         background: linear-gradient(145deg, #ff6347, #dc143c);
//         border-color: #dc143c;
//       }
      
//       /* Game Info Panel */
//       .game-info {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         background: rgba(255, 255, 255, 0.9);
//         padding: 20px 30px;
//         border-radius: 15px;
//         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
//         margin-bottom: 30px;
//         min-width: 300px;
//         backdrop-filter: blur(10px);
//       }
      
//       .info-item {
//         text-align: center;
//       }
      
//       .info-label {
//         font-size: 0.9rem;
//         color: #666;
//         margin-bottom: 5px;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//       }
      
//       .info-value {
//         font-size: 2rem;
//         font-weight: bold;
//         color: #2f4f2f;
//       }
      
//       /* Game Board */
//       .game-board {
//         display: grid;
//         grid-template-columns: repeat(3, 1fr);
//         grid-template-rows: repeat(3, 1fr);
//         gap: 20px;
//         margin-bottom: 30px;
//         padding: 30px;
//         background: rgba(139, 69, 19, 0.1);
//         border-radius: 20px;
//         box-shadow: inset 0 4px 15px rgba(0, 0, 0, 0.1);
//       }
      
//       /* Hole Styles */
//       .hole {
//         width: 120px;
//         height: 120px;
//         background: radial-gradient(circle, #654321 0%, #8b4513 50%, #a0522d 100%);
//         border-radius: 50%;
//         position: relative;
//         cursor: pointer;
//         box-shadow: inset 0 8px 20px rgba(0, 0, 0, 0.4), 0 4px 15px rgba(0, 0, 0, 0.2);
//         transition: transform 0.1s ease;
//       }
      
//       .hole::before {
//         content: '';
//         position: absolute;
//         top: 10px;
//         left: 10px;
//         right: 10px;
//         bottom: 10px;
//         background: radial-gradient(circle, #2f1b14 0%, #4a2c17 100%);
//         border-radius: 50%;
//         box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.6);
//       }
      
//       .hole:hover {
//         transform: scale(1.05);
//       }
      
//       /* Mole Styles - Updated for Image */
//       .mole {
//         width: 80px;
//         height: 80px;
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%) scale(0);
//         cursor: pointer;
//         transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//         z-index: 2;
//         border-radius: 50%;
//         overflow: hidden;
//         box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
//       }
      
//       .mole img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         border-radius: 50%;
//         transition: filter 0.1s ease;
//       }
      
//       .mole:hover img {
//         filter: brightness(1.1);
//       }
      
//       .mole.show {
//         transform: translate(-50%, -50%) scale(1);
//         animation: moleAppear 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//       }
      
//       .mole.hit {
//         animation: moleHit 0.3s ease-out forwards;
//       }
      
//       .mole.hit img {
//         filter: brightness(1.5) saturate(1.5);
//       }
      
//       /* Control Buttons */
//       .controls {
//         display: flex;
//         gap: 20px;
//         margin-bottom: 20px;
//       }
      
//       .btn {
//         padding: 15px 30px;
//         font-size: 1.1rem;
//         font-weight: bold;
//         border: none;
//         border-radius: 25px;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
//       }
      
//       .btn-start {
//         background: linear-gradient(145deg, #32cd32, #228b22);
//         color: white;
//       }
      
//       .btn-start:hover {
//         background: linear-gradient(145deg, #228b22, #006400);
//         transform: translateY(-2px);
//         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
//       }
      
//       .btn-restart {
//         background: linear-gradient(145deg, #ff6347, #dc143c);
//         color: white;
//       }
      
//       .btn-restart:hover {
//         background: linear-gradient(145deg, #dc143c, #b22222);
//         transform: translateY(-2px);
//         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
//       }
      
//       .btn:disabled {
//         opacity: 0.6;
//         cursor: not-allowed;
//         transform: none;
//       }
      
//       /* Game Over Modal */
//       .modal {
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(0, 0, 0, 0.7);
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         z-index: 1000;
//         opacity: 0;
//         visibility: hidden;
//         transition: all 0.3s ease;
//       }
      
//       .modal.show {
//         opacity: 1;
//         visibility: visible;
//       }
      
//       .modal-content {
//         background: white;
//         padding: 40px;
//         border-radius: 20px;
//         text-align: center;
//         box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
//         transform: scale(0.7);
//         transition: transform 0.3s ease;
//       }
      
//       .modal.show .modal-content {
//         transform: scale(1);
//       }
      
//       .modal h2 {
//         color: #2f4f2f;
//         margin-bottom: 20px;
//         font-size: 2.5rem;
//       }
      
//       .modal p {
//         font-size: 1.3rem;
//         margin-bottom: 30px;
//         color: #666;
//       }
      
//       /* Animations */
//       @keyframes slideDown {
//         from {
//           opacity: 0;
//           transform: translateY(-50px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }
      
//       @keyframes moleAppear {
//         0% {
//           transform: translate(-50%, -50%) scale(0) rotate(0deg);
//         }
//         50% {
//           transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
//         }
//         100% {
//           transform: translate(-50%, -50%) scale(1) rotate(0deg);
//         }
//       }
      
//       @keyframes moleHit {
//         0% {
//           transform: translate(-50%, -50%) scale(1);
//         }
//         50% {
//           transform: translate(-50%, -50%) scale(1.3);
//         }
//         100% {
//           transform: translate(-50%, -50%) scale(0);
//         }
//       }
      
//       /* Responsive Design */
//       @media (max-width: 768px) {
//         .title {
//           font-size: 2rem;
//         }
      
//         .game-board {
//           gap: 15px;
//           padding: 20px;
//         }
      
//         .hole {
//           width: 80px;
//           height: 80px;
//         }
      
//         .mole {
//           width: 60px;
//           height: 60px;
//         }
      
//         .game-info {
//           flex-direction: column;
//           gap: 15px;
//           min-width: auto;
//         }
      
//         .controls {
//           flex-direction: column;
//           align-items: center;
//         }
      
//         .difficulty-buttons {
//           flex-direction: column;
//           align-items: center;
//         }
      
//         .difficulty-btn {
//           min-width: 120px;
//         }
      
//         .audio-controls {
//           position: relative;
//           top: auto;
//           right: auto;
//           margin-bottom: 20px;
//         }
//       }
      
//       @media (max-width: 480px) {
//         .game-board {
//           gap: 10px;
//           padding: 15px;
//         }
      
//         .hole {
//           width: 70px;
//           height: 70px;
//         }
      
//         .mole {
//           width: 50px;
//           height: 50px;
//         }
      
//         .audio-controls {
//           padding: 10px;
//         }
      
//         .volume-control {
//           display: none; /* Hide volume control on very small screens */
//         }
//       }
//     </style>
//   </head>
//   <body>
//     <!-- Audio Controls -->
//     <div class="audio-controls">
//       <button class="audio-btn" id="musicToggle" title="Toggle Background Music">🎵</button>
//       <div class="volume-control">
//         <span style="font-size: 0.8rem;">🔊</span>
//         <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="50" title="Volume" />
//       </div>
//     </div>

//     <!-- Background Music Audio Element -->
//     <audio id="backgroundMusic" loop preload="auto">
//       <source src="/assets/whackamole.mp3" type="audio/mpeg" />
//       <!-- Fallback for browsers that don't support MP3 -->
//       <source src="background-music.ogg" type="audio/ogg" />Your browser does not support the audio element.
//     </audio>

//     <!-- Game Header -->
//     <div class="header">
//       <h1 class="title">🔨 Whack-a-Mole</h1>
//       <p class="subtitle">Hit the moles before they disappear!</p>
//     </div>

//     <!-- Difficulty Selection -->
//     <div class="difficulty-section">
//       <div class="difficulty-label">Choose Difficulty Level</div>
//       <div class="difficulty-buttons">
//         <button class="difficulty-btn easy" data-difficulty="easy">Easy</button>
//         <button class="difficulty-btn medium active" data-difficulty="medium">Medium</button>
//         <button class="difficulty-btn hard" data-difficulty="hard">Hard</button>
//       </div>
//     </div>

//     <!-- Game Information Panel -->
//     <div class="game-info">
//       <div class="info-item">
//         <div class="info-label">Score</div>
//         <div class="info-value" id="score">0</div>
//       </div>
//       <div class="info-item">
//         <div class="info-label">Time</div>
//         <div class="info-value" id="timer">30</div>
//       </div>
//       <div class="info-item">
//         <div class="info-label">High Score</div>
//         <img src="/assets/whackamole.png" alt="Test Mole" style="width:100px;">

//         <div class="info-value" id="highScore">0</div>
//       </div>
//     </div>

//     <!-- Game Board -->
//     <div class="game-board" id="gameBoard">
//       <!-- Holes will be generated by JavaScript -->
//     </div>

//     <!-- Control Buttons -->
//     <div class="controls">
//       <button class="btn btn-start" id="startBtn">Start Game</button>
//       <button class="btn btn-restart" id="restartBtn">Restart</button>
//     </div>

//     <!-- Game Over Modal -->
//     <div class="modal" id="gameOverModal">
//       <div class="modal-content">
//         <h2>🎉 Game Over!</h2>
//         <p>
//           Your final score: <span id="finalScore">0</span>
//         </p>
//         <p>
//           Difficulty: <span id="finalDifficulty">Medium</span>
//         </p>
//         <button class="btn btn-start" onclick="closeModal()">Play Again</button>
//       </div>
//     </div>

//     <script>
//       // Difficulty Settings Configuration
//       const difficultySettings = {
//         easy: {
//           moleShowDuration: { min: 1500, max: 2500 }, // How long mole stays visible
//           spawnInterval: { min: 1000, max: 1500 }, // Time between mole spawns
//           name: 'Easy',
//           color: '#90EE90'
//         },
//         medium: {
//           moleShowDuration: { min: 1000, max: 2000 },
//           spawnInterval: { min: 800, max: 1200 },
//           name: 'Medium',
//           color: '#FFD700'
//         },
//         hard: {
//           moleShowDuration: { min: 600, max: 1200 },
//           spawnInterval: { min: 500, max: 800 },
//           name: 'Hard',
//           color: '#FF6347'
//         }
//       }
      
//       // Game State Variables
//       let gameState = {
//         score: 0,
//         timeLeft: 30,
//         isGameActive: false,
//         gameTimer: null,
//         moleTimer: null,
//         activeMoles: new Set(),
//         highScore: localStorage.getItem('whackMoleHighScore') || 0,
//         currentDifficulty: 'medium', // Default difficulty
//         musicEnabled: localStorage.getItem('whackMoleMusicEnabled') !== 'false' // Default to enabled
//       }
      
//       // DOM Elements
//       const elements = {
//         scoreDisplay: document.getElementById('score'),
//         timerDisplay: document.getElementById('timer'),
//         highScoreDisplay: document.getElementById('highScore'),
//         startBtn: document.getElementById('startBtn'),
//         restartBtn: document.getElementById('restartBtn'),
//         gameBoard: document.getElementById('gameBoard'),
//         modal: document.getElementById('gameOverModal'),
//         finalScore: document.getElementById('finalScore'),
//         finalDifficulty: document.getElementById('finalDifficulty'),
//         difficultyButtons: document.querySelectorAll('.difficulty-btn'),
//         backgroundMusic: document.getElementById('backgroundMusic'),
//         musicToggle: document.getElementById('musicToggle'),
//         volumeSlider: document.getElementById('volumeSlider')
//       }
      
//       // Initialize Game
//       function initGame() {
//         createGameBoard()
//         updateDisplay()
//         setupEventListeners()
//         setupAudioControls()
      
//         // Display saved high score
//         elements.highScoreDisplay.textContent = gameState.highScore
//       }
      
//       // Setup audio controls and background music
//       function setupAudioControls() {
//         // Set initial volume
//         elements.backgroundMusic.volume = elements.volumeSlider.value / 100
      
//         // Update music toggle button appearance
//         updateMusicToggleButton()
      
//         // Auto-play background music if enabled (with user interaction requirement)
//         if (gameState.musicEnabled) {
//           // Note: Most browsers require user interaction before playing audio
//           document.addEventListener('click', playBackgroundMusicOnFirstInteraction, { once: true })
//         }
//       }
      
//       // Play background music on first user interaction (required by browsers)
//       function playBackgroundMusicOnFirstInteraction() {
//         if (gameState.musicEnabled) {
//           playBackgroundMusic()
//         }
//       }
      
//       // Toggle background music on/off
//       function toggleBackgroundMusic() {
//         gameState.musicEnabled = !gameState.musicEnabled
//         localStorage.setItem('whackMoleMusicEnabled', gameState.musicEnabled)
      
//         if (gameState.musicEnabled) {
//           playBackgroundMusic()
//         } else {
//           pauseBackgroundMusic()
//         }
      
//         updateMusicToggleButton()
//       }
      
//       // Play background music
//       function playBackgroundMusic() {
//         if (elements.backgroundMusic && gameState.musicEnabled) {
//           elements.backgroundMusic.play().catch((error) => {
//             console.log('Background music play failed:', error)
//             // This is normal for browsers that require user interaction
//           })
//         }
//       }
      
//       // Pause background music
//       function pauseBackgroundMusic() {
//         if (elements.backgroundMusic) {
//           elements.backgroundMusic.pause()
//         }
//       }
      
//       // Update music toggle button appearance
//       function updateMusicToggleButton() {
//         if (gameState.musicEnabled) {
//           elements.musicToggle.classList.add('playing')
//           elements.musicToggle.textContent = '🎵'
//           elements.musicToggle.title = 'Pause Background Music'
//         } else {
//           elements.musicToggle.classList.remove('playing')
//           elements.musicToggle.textContent = '🔇'
//           elements.musicToggle.title = 'Play Background Music'
//         }
//       }
      
//       // Handle volume change
//       function handleVolumeChange() {
//         const volume = elements.volumeSlider.value / 100
//         elements.backgroundMusic.volume = volume
      
//         // Save volume preference
//         localStorage.setItem('whackMoleVolume', volume)
//       }
      
//       // Create the game board with holes
//       function createGameBoard() {
//         elements.gameBoard.innerHTML = ''
      
//         // Create 9 holes (3x3 grid)
//         for (let i = 0; i < 9; i++) {
//           const hole = document.createElement('div')
//           hole.className = 'hole'
//           hole.dataset.index = i
      
//           // Create mole element with image
//           const mole = document.createElement('div')
//           mole.className = 'mole'
      
//           // Create mole image element
//           const moleImg = document.createElement('img')
//           moleImg.src = '/assets/mole.png' // Generate mole image using canvas
//           moleImg.alt = 'Moleee'
//           moleImg.draggable = false // Prevent image dragging
      
//           mole.appendChild(moleImg)
//           mole.addEventListener('click', hitMole)
      
//           hole.appendChild(mole)
//           elements.gameBoard.appendChild(hole)
//         }
//       }
      
//       // Create a mole image using canvas (since we can't use external images)
//       function createMoleImage() {
//         const canvas = document.createElement('canvas')
//         const ctx = canvas.getContext('2d')
//         canvas.width = 80
//         canvas.height = 80
      
//         // Draw mole body (brown circle)
//         ctx.fillStyle = '#8B4513'
//         ctx.beginPath()
//         ctx.arc(40, 40, 35, 0, Math.PI * 2)
//         ctx.fill()
      
//         // Add gradient effect
//         const gradient = ctx.createRadialGradient(30, 30, 0, 40, 40, 35)
//         gradient.addColorStop(0, '#CD853F')
//         gradient.addColorStop(1, '#8B4513')
//         ctx.fillStyle = gradient
//         ctx.beginPath()
//         ctx.arc(40, 40, 35, 0, Math.PI * 2)
//         ctx.fill()
      
//         // Draw ears
//         ctx.fillStyle = '#654321'
//         ctx.beginPath()
//         ctx.ellipse(25, 25, 8, 12, -Math.PI / 4, 0, Math.PI * 2)
//         ctx.fill()
//         ctx.beginPath()
//         ctx.ellipse(55, 25, 8, 12, Math.PI / 4, 0, Math.PI * 2)
//         ctx.fill()
      
//         // Draw eyes
//         ctx.fillStyle = '#000'
//         ctx.beginPath()
//         ctx.arc(32, 35, 4, 0, Math.PI * 2)
//         ctx.fill()
//         ctx.beginPath()
//         ctx.arc(48, 35, 4, 0, Math.PI * 2)
//         ctx.fill()
      
//         // Draw eye highlights
//         ctx.fillStyle = '#FFF'
//         ctx.beginPath()
//         ctx.arc(33, 33, 1.5, 0, Math.PI * 2)
//         ctx.fill()
//         ctx.beginPath()
//         ctx.arc(49, 33, 1.5, 0, Math.PI * 2)
//         ctx.fill()
      
//         // Draw nose
//         ctx.fillStyle = '#FF69B4'
//         ctx.beginPath()
//         ctx.ellipse(40, 45, 3, 2, 0, 0, Math.PI * 2)
//         ctx.fill()
      
//         // Draw mouth
//         ctx.strokeStyle = '#000'
//         ctx.lineWidth = 2
//         ctx.beginPath()
//         ctx.arc(40, 50, 8, 0.2 * Math.PI, 0.8 * Math.PI)
//         ctx.stroke()
      
//         // Draw whiskers
//         ctx.strokeStyle = '#000'
//         ctx.lineWidth = 1
//         ctx.beginPath()
//         // Left whiskers
//         ctx.moveTo(15, 40)
//         ctx.lineTo(25, 42)
//         ctx.moveTo(15, 45)
//         ctx.lineTo(25, 45)
//         // Right whiskers
//         ctx.moveTo(55, 42)
//         ctx.lineTo(65, 40)
//         ctx.moveTo(55, 45)
//         ctx.lineTo(65, 45)
//         ctx.stroke()
      
//         return canvas.toDataURL()
//       }
      
//       // Setup event listeners
//       function setupEventListeners() {
//         elements.startBtn.addEventListener('click', startGame)
//         elements.restartBtn.addEventListener('click', restartGame)
      
//         // Setup difficulty button listeners
//         elements.difficultyButtons.forEach((button) => {
//           button.addEventListener('click', handleDifficultyChange)
//         })
      
//         // Setup audio control listeners
//         elements.musicToggle.addEventListener('click', toggleBackgroundMusic)
//         elements.volumeSlider.addEventListener('input', handleVolumeChange)
      
//         // Load saved volume preference
//         const savedVolume = localStorage.getItem('whackMoleVolume')
//         if (savedVolume !== null) {
//           elements.volumeSlider.value = savedVolume * 100
//           elements.backgroundMusic.volume = savedVolume
//         }
//       }
      
//       // Handle difficulty selection
//       function handleDifficultyChange(event) {
//         // Don't allow difficulty change during active game
//         if (gameState.isGameActive) return
      
//         const selectedDifficulty = event.target.dataset.difficulty
      
//         // Update active button styling
//         elements.difficultyButtons.forEach((btn) => {
//           btn.classList.remove('active')
//         })
//         event.target.classList.add('active')
      
//         // Update game state
//         gameState.currentDifficulty = selectedDifficulty
      
        
//       }
      
//       // Toggle difficulty buttons enabled/disabled state
//       function toggleDifficultyButtons(enabled) {
//         elements.difficultyButtons.forEach((button) => {
//           button.disabled = !enabled
//         })
//       }
      
//       // Start the game
//       function startGame() {
//         if (gameState.isGameActive) return
      
//         // Reset game state
//         gameState.score = 0
//         gameState.timeLeft = 30
//         gameState.isGameActive = true
//         gameState.activeMoles.clear()
      
//         // Update UI
//         updateDisplay()
//         elements.startBtn.disabled = true
//         elements.startBtn.textContent = 'Game Active'
      
//         // Disable difficulty selection during game
//         toggleDifficultyButtons(false)
      
//         // Start background music if enabled
//         if (gameState.musicEnabled) {
//           playBackgroundMusic()
//         }
      
//         // Start timers
//         startGameTimer()
//         startMoleSpawning()
      
//         // Play start sound
//         playSound('start')
      
        
//       }
      
//       // Restart the game
//       function restartGame() {
//         endGame()
//         setTimeout(startGame, 100)
//       }
      
//       // Start the main game timer
//       function startGameTimer() {
//         gameState.gameTimer = setInterval(() => {
//           gameState.timeLeft--
//           updateDisplay()
      
//           // End game when time runs out
//           if (gameState.timeLeft <= 0) {
//             endGame()
//           }
//         }, 1000)
//       }
      
//       // Start spawning moles at random intervals based on difficulty
//       function startMoleSpawning() {
//         const spawnMole = () => {
//           if (!gameState.isGameActive) return
      
//           // Get available holes (without active moles)
//           const holes = Array.from(document.querySelectorAll('.hole'))
//           const availableHoles = holes.filter((hole, index) => !gameState.activeMoles.has(index))
      
//           if (availableHoles.length === 0) {
//             // Schedule next spawn if no holes available
//             gameState.moleTimer = setTimeout(spawnMole, getRandomSpawnInterval())
//             return
//           }
      
//           // Select random hole
//           const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)]
//           const holeIndex = parseInt(randomHole.dataset.index)
//           const mole = randomHole.querySelector('.mole')
      
//           // Show mole
//           showMole(mole, holeIndex)
      
//           // Schedule next mole spawn based on current difficulty
//           gameState.moleTimer = setTimeout(spawnMole, getRandomSpawnInterval())
//         }
      
//         // Start first mole spawn
//         gameState.moleTimer = setTimeout(spawnMole, 1000)
//       }
      
//       // Show a mole in a hole with difficulty-based duration
//       function showMole(mole, holeIndex) {
//         // Add to active moles
//         gameState.activeMoles.add(holeIndex)
      
//         // Show mole with animation
//         mole.classList.add('show')
      
//         // Hide mole after duration based on current difficulty
//         const hideDelay = getRandomMoleShowDuration()
//         setTimeout(() => {
//           hideMole(mole, holeIndex)
//         }, hideDelay)
//       }
      
//       // Hide a mole
//       function hideMole(mole, holeIndex) {
//         if (!gameState.activeMoles.has(holeIndex)) return
      
//         mole.classList.remove('show')
//         gameState.activeMoles.delete(holeIndex)
//       }
      
//       // Handle mole hit
//       function hitMole(event) {
//         if (!gameState.isGameActive) return
      
//         const mole = event.target.closest('.mole') // Handle clicks on both mole and image
//         const hole = mole.parentElement
//         const holeIndex = parseInt(hole.dataset.index)
      
//         // Check if mole is active
//         if (!gameState.activeMoles.has(holeIndex) || !mole.classList.contains('show')) {
//           return
//         }
      
//         // Add hit animation
//         mole.classList.add('hit')
      
//         // Update score (bonus points for harder difficulties)
//         const difficultyMultiplier = {
//           easy: 1,
//           medium: 1.5,
//           hard: 2
//         }
//         const basePoints = 10
//         const points = Math.round(basePoints * difficultyMultiplier[gameState.currentDifficulty])
//         gameState.score += points
//         updateDisplay()
      
//         // Play hit sound
//         playSound('hit')
      
//         // Remove mole from active set
//         gameState.activeMoles.delete(holeIndex)
      
//         // Remove hit class after animation
//         setTimeout(() => {
//           mole.classList.remove('hit', 'show')
//         }, 300)
//       }
      
//       // End the game
//       function endGame() {
//         gameState.isGameActive = false
      
//         // Clear timers
//         if (gameState.gameTimer) {
//           clearInterval(gameState.gameTimer)
//           gameState.gameTimer = null
//         }
      
//         if (gameState.moleTimer) {
//           clearTimeout(gameState.moleTimer)
//           gameState.moleTimer = null
//         }
      
//         // Hide all active moles
//         document.querySelectorAll('.mole.show').forEach((mole) => {
//           mole.classList.remove('show')
//         })
//         gameState.activeMoles.clear()
      
//         // Update high score
//         if (gameState.score > gameState.highScore) {
//           gameState.highScore = gameState.score
//           localStorage.setItem('whackMoleHighScore', gameState.highScore)
//           elements.highScoreDisplay.textContent = gameState.highScore
//         }
      
//         // Reset UI
//         elements.startBtn.disabled = false
//         elements.startBtn.textContent = 'Start Game'
      
//         // Re-enable difficulty selection
//         toggleDifficultyButtons(true)
      
//         // Show game over modal
//         showGameOverModal()
//       }
      
//       // Show game over modal
//       function showGameOverModal() {
//         elements.finalScore.textContent = gameState.score
//         elements.finalDifficulty.textContent = difficultySettings[gameState.currentDifficulty].name
//         elements.modal.classList.add('show')
//       }
      
//       // Close game over modal
//       function closeModal() {
//         elements.modal.classList.remove('show')
//       }
      
//       // Update display elements
//       function updateDisplay() {
//         elements.scoreDisplay.textContent = gameState.score
//         elements.timerDisplay.textContent = gameState.timeLeft
//       }
      
//       // Get random spawn interval based on current difficulty
//       function getRandomSpawnInterval() {
//         const settings = difficultySettings[gameState.currentDifficulty].spawnInterval
//         return Math.random() * (settings.max - settings.min) + settings.min
//       }
      
//       // Get random mole show duration based on current difficulty
//       function getRandomMoleShowDuration() {
//         const settings = difficultySettings[gameState.currentDifficulty].moleShowDuration
//         return Math.random() * (settings.max - settings.min) + settings.min
//       }
      
//       // Play sound effects
//       function playSound(type) {
//         // Create audio context for sound effects
//         const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
//         if (type === 'hit') {
//           // Create hit sound (short beep)
//           const oscillator = audioContext.createOscillator()
//           const gainNode = audioContext.createGain()
      
//           oscillator.connect(gainNode)
//           gainNode.connect(audioContext.destination)
      
//           oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
//           oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      
//           gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
//           gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
//           oscillator.start(audioContext.currentTime)
//           oscillator.stop(audioContext.currentTime + 0.1)
//         } else if (type === 'start') {
//           // Create start sound (ascending notes)
//           const frequencies = [262, 330, 392] // C, E, G
//           frequencies.forEach((freq, index) => {
//             setTimeout(() => {
//               const oscillator = audioContext.createOscillator()
//               const gainNode = audioContext.createGain()
      
//               oscillator.connect(gainNode)
//               gainNode.connect(audioContext.destination)
      
//               oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
//               gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
//               gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
//               oscillator.start(audioContext.currentTime)
//               oscillator.stop(audioContext.currentTime + 0.2)
//             }, index * 100)
//           })
//         }
//       }
      
//       // Make closeModal function globally accessible
//       window.closeModal = closeModal
      
//       // Initialize the game when page loads
//       document.addEventListener('DOMContentLoaded', initGame)
//     </script>
//   </body>
// </html>
// `,
//       },
//       {
//         id: "bombfinder",
//         title: "Bomb finder",
//         description:
//           "Click safe tiles to avoid hidden bombs and clear the grid.",
//         category: "Web Game",
//         previewImage:
//           "https://image.pollinations.ai/prompt/minesweeper?width=120&height=240&seed=42&model=flux&nologo=true&transparent=true",
//         tags: ["Minesweeper", "Puzzle", "Clicker"],
//         html: `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <title>Mini Bomb Finder</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//           background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-attachment: fixed;
//         text-align: center;
//         padding: 20px;
//       }
//       h1 {
//         color: #444;
//       }
//       #game {
//         display: grid;
//         grid-template-columns: repeat(5, 60px);
//         gap: 10px;
//         justify-content: center;
//         margin-top: 20px;
//       }
//       .tile {
//         width: 60px;
//         height: 60px;
//         background-color: #ddd;
//         border: 1px solid #aaa;
//         cursor: pointer;
//         font-size: 20px;
//         line-height: 60px;
//         user-select: none;
//       }
//       .tile.clicked {
//         background-color: #9fd;
//         cursor: default;
//       }
//       .tile.bomb {
//         background-color: #f66;
//       }
//       #status {
//         margin-top: 20px;
//         font-size: 18px;
//       }
//       button {
//         margin-top: 15px;
//         padding: 8px 16px;
//         font-size: 16px;
//       }
//     </style>
//   </head>
//   <body>
//     <h1>💣 Bomb Finder Game</h1>
//     <div id="game"></div>
//     <div id="status"></div>
//     <button onclick="startGame()">Restart Game</button>

//     <script>
//       const gridSize = 5;
//       const bombCount = 3;
//       let bombPositions = new Set();
//       let revealedTiles = 0;

//       function startGame() {
//         const game = document.getElementById("game");
//         game.innerHTML = "";
//         document.getElementById("status").textContent = "";
//         revealedTiles = 0;

//         // Generate bomb positions
//         bombPositions = new Set();
//         while (bombPositions.size < bombCount) {
//           bombPositions.add(Math.floor(Math.random() * (gridSize * gridSize)));
//         }

//         // Create tiles
//         for (let i = 0; i < gridSize * gridSize; i++) {
//           const tile = document.createElement("div");
//           tile.className = "tile";
//           tile.dataset.index = i;
//           tile.onclick = handleClick;
//           game.appendChild(tile);
//         }
//       }

//       function handleClick() {
//         const index = parseInt(this.dataset.index);
//         if (this.classList.contains("clicked")) return;

//         if (bombPositions.has(index)) {
//           this.classList.add("bomb");
//           this.textContent = "💥";
//           document.getElementById("status").textContent =
//             "Game Over! You hit a bomb!";
//           revealAllBombs();
//           disableAllTiles();
//         } else {
//           this.classList.add("clicked");
//           this.textContent = "✔️";
//           revealedTiles++;
//           if (revealedTiles === gridSize * gridSize - bombCount) {
//             document.getElementById("status").textContent = "🎉 You Win!";
//             disableAllTiles();
//           }
//         }
//       }

//       function revealAllBombs() {
//         const tiles = document.querySelectorAll(".tile");
//         bombPositions.forEach((index) => {
//           const tile = tiles[index];
//           tile.classList.add("bomb");
//           tile.textContent = "💣";
//         });
//       }

//       function disableAllTiles() {
//         const tiles = document.querySelectorAll(".tile");
//         tiles.forEach((tile) => (tile.onclick = null));
//       }

//       startGame(); // Start game on load
//     </script>
//   </body>
// </html>
// `,
//       },
//       {
//         id: "tictactoe",
//         title: "TicTacToe",
//         description: "Classic two-player game to align three marks in a row.",
//         category: "Simple Game",
//         previewImage:
//           "https://image.pollinations.ai/prompt/tictactoe%20game?width=120&height=240&seed=42&model=flux&nologo=true&transparent=true",
//         tags: ["Strategy", "Classic", "Two-player"],
//         html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Tic Tac Toe</title>
//   <style>
//     body {
//       font-family: sans-serif;
//       text-align: center;
//       margin-top: 40px;
//         background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-attachment: fixed;
//     }
//     h1 {
//       margin-bottom: 10px;
//     }
//     #board {
//       display: grid;
//       grid-template-columns: repeat(3, 80px);
//       grid-gap: 5px;
//       justify-content: center;
//       margin: 20px auto;
//     }
//     .cell {
//       width: 80px;
//       height: 80px;
//       font-size: 40px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f0f0f0;
//       cursor: pointer;
//       border: 2px solid #888;
//     }
//     .cell.disabled {
//       pointer-events: none;
//     }
//     #status {
//       font-size: 18px;
//       margin-top: 15px;
//     }
//     button {
//       margin-top: 20px;
//       padding: 8px 14px;
//       font-size: 16px;
//     }
//   </style>
// </head>
// <body>

//   <h1>Tic Tac Toe</h1>
//   <div id="board"></div>
//   <div id="status"></div>
//   <button onclick="resetGame()">Restart</button>

//   <script>
//     const board = document.getElementById('board');
//     const status = document.getElementById('status');
//     let cells = [];
//     let currentPlayer = 'X';
//     let gameOver = false;

//     function createBoard() {
//       board.innerHTML = '';
//       cells = [];
//       gameOver = false;
//       currentPlayer = 'X';
//       status.textContent = "Player X's turn";

//       for (let i = 0; i < 9; i++) {
//         const cell = document.createElement('div');
//         cell.className = 'cell';
//         cell.dataset.index = i;
//         cell.onclick = () => handleMove(cell);
//         board.appendChild(cell);
//         cells.push(cell);
//       }
//     }

//     function handleMove(cell) {
//       if (cell.textContent || gameOver) return;

//       cell.textContent = currentPlayer;
//       if (checkWin(currentPlayer)) {
//         status.textContent = "🎉 Player " + currentPlayer + " wins!";
//         gameOver = true;
//         disableBoard();
//       } else if (cells.every(c => c.textContent)) {
//         status.textContent = "It's a draw!";
//         gameOver = true;
//       } else {
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         status.textContent = "Player " + currentPlayer + "'s turn";
//       }
//     }

//     function checkWin(player) {
//       const winPatterns = [
//         [0,1,2],[3,4,5],[6,7,8], // rows
//         [0,3,6],[1,4,7],[2,5,8], // cols
//         [0,4,8],[2,4,6]          // diagonals
//       ];
//       return winPatterns.some(pattern =>
//         pattern.every(i => cells[i].textContent === player)
//       );
//     }

//     function disableBoard() {
//       cells.forEach(cell => cell.classList.add('disabled'));
//     }

//     function resetGame() {
//       createBoard();
//     }

//     createBoard(); // start game on load
//   </script>

// </body>
// </html>
// `,
//       },
//       {
//         id: "catchthedot",
//         title: "Catch the Dot",
//         description:
//           "Click the moving red dot as many times as you can before time runs out.",
//         category: "Web Game",
//         previewImage:
//           "https://image.pollinations.ai/prompt/running%20dot?width=120&height=240&seed=42&model=flux&nologo=true&transparent=true",
//         tags: ["Reflex", "Speed", "Timer"],
//         html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>Catch the Dot</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       text-align: center;
//       padding: 30px;
//         background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-attachment: fixed;
//     }
//     h1 {
//       margin-bottom: 20px;
//     }
//     #gameArea {
//       position: relative;
//       width: 300px;
//       height: 300px;
//       margin: 0 auto;
//       border: 3px solid #333;
//       background: #f9f9f9;
//     }
//     #dot {
//       position: absolute;
//       width: 40px;
//       height: 40px;
//       background: red;
//       border-radius: 50%;
//       cursor: pointer;
//     }
//     #scoreBoard {
//       margin-top: 15px;
//       font-size: 20px;
//     }
//     #timer {
//       font-weight: bold;
//       margin-top: 10px;
//       font-size: 18px;
//     }
//     button {
//       margin-top: 20px;
//       padding: 8px 16px;
//       font-size: 16px;
//     }
//   </style>
// </head>
// <body>

//   <h1>Catch the Dot</h1>
//   <div id="gameArea">
//     <div id="dot"></div>
//   </div>
//   <div id="scoreBoard">Score: 0</div>
//   <div id="timer">Time left: 15s</div>
//   <button id="startBtn">Start Game</button>

//   <script>
//     const gameArea = document.getElementById('gameArea');
//     const dot = document.getElementById('dot');
//     const scoreBoard = document.getElementById('scoreBoard');
//     const timerDisplay = document.getElementById('timer');
//     const startBtn = document.getElementById('startBtn');

//     let score = 0;
//     let timeLeft = 15;
//     let gameInterval;
//     let timerInterval;

//     function getRandomPosition() {
//       const maxX = gameArea.clientWidth - dot.clientWidth;
//       const maxY = gameArea.clientHeight - dot.clientHeight;
//       const x = Math.floor(Math.random() * maxX);
//       const y = Math.floor(Math.random() * maxY);
//       return { x, y };
//     }

//     function moveDot() {
//       const pos = getRandomPosition();
//       dot.style.left = pos.x + 'px';
//       dot.style.top = pos.y + 'px';
//     }

//     function startGame() {
//       score = 0;
//       timeLeft = 15;
//       scoreBoard.textContent = 'Score: 0';
//       timerDisplay.textContent = "Time left: " + timeLeft + "s";
//       dot.style.display = 'block';
//       startBtn.disabled = true;

//       moveDot();
//       gameInterval = setInterval(moveDot, 800);

//       timerInterval = setInterval(() => {
//         timeLeft--;
//         timerDisplay.textContent = "Time left:" + timeLeft + "s;

//         if (timeLeft <= 0) {
//           endGame();
//         }
//       }, 1000);
//     }

//     function endGame() {
//       clearInterval(gameInterval);
//       clearInterval(timerInterval);
//       dot.style.display = 'none';
//       startBtn.disabled = false;
//       alert("Time's up! Your score is " + score);
//     }

//     dot.addEventListener('click', () => {
//       if (timeLeft > 0) {
//         score++;
//         scoreBoard.textContent = "Score: " + score;
//         moveDot();
//       }
//     });

//     startBtn.addEventListener('click', startGame);
//   </script>

// </body>
// </html>
// `,
//       },
//       {
//         id: "memorymatch",
//         title: "Memory Match",
//         description: "Flip cards to find matching pairs and clear the board",
//         category: "Board Game",
//         previewImage:
//           "https://image.pollinations.ai/prompt/brain%20memory?width=120&height=240&seed=42&model=flux&nologo=true&transparent=true",
//         tags: ["Memory", "Matching", "Concentration"],
//         html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>Memory Match</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       text-align: center;
//       padding: 30px;
//       background: #f0f0f0;
//         background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-attachment: fixed;
//     }
//     h1 {
//       margin-bottom: 20px;
//     }
//     #game {
//       display: grid;
//       grid-template-columns: repeat(4, 80px);
//       grid-gap: 15px;
//       justify-content: center;
//       max-width: 350px;
//       margin: 0 auto;
//     }
//     .card {
//       width: 80px;
//       height: 80px;
//       background: #333;
//       border-radius: 10px;
//       cursor: pointer;
//       position: relative;
//       perspective: 600px;
//     }
//     .card-inner {
//       position: relative;
//       width: 100%;
//       height: 100%;
//       text-align: center;
//       transition: transform 0.5s;
//       transform-style: preserve-3d;
//     }
//     .card.flipped .card-inner {
//       transform: rotateY(180deg);
//       cursor: default;
//     }
//     .card-front, .card-back {
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       border-radius: 10px;
//       backface-visibility: hidden;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 40px;
//       color: white;
//       user-select: none;
//     }
//     .card-front {
//       background: #666;
//       transform: rotateY(180deg);
//     }
//     .card-back {
//       background: #444;
//     }
//     #status {
//       margin-top: 20px;
//       font-size: 18px;
//     }
//     button {
//       margin-top: 25px;
//       padding: 10px 18px;
//       font-size: 16px;
//       cursor: pointer;
//     }
//   </style>
// </head>
// <body>

//   <h1>Memory Match Game</h1>
//   <div id="game"></div>
//   <div id="status"></div>
//   <button onclick="startGame()">Restart</button>

//   <script>
//     const game = document.getElementById('game');
//     const status = document.getElementById('status');
//     const symbols = ['🍎', '🍌', '🍇', '🍒', '🍉', '🥝', '🍍', '🍓'];
//     let cards = [];
//     let firstCard = null;
//     let secondCard = null;
//     let lockBoard = false;
//     let matches = 0;

//     function shuffle(array) {
//       for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//       }
//       return array;
//     }

//     function createCards() {
//       // Duplicate symbols for pairs
//       const pairSymbols = [...symbols, ...symbols];
//       shuffle(pairSymbols);

//       game.innerHTML = '';
//       cards = [];
//       matches = 0;
//       status.textContent = '';

//       pairSymbols.forEach((symbol, index) => {
//         const card = document.createElement('div');
//         card.classList.add('card');
//         card.dataset.symbol = symbol;
//         card.dataset.index = index;

//         card.innerHTML = "
//           <div class="card-inner">
//             <div class="card-front">" + symbol + "</div>
//             <div class="card-back">?</div>
//           </div>
//         ";

//         card.addEventListener('click', () => flipCard(card));
//         game.appendChild(card);
//         cards.push(card);
//       });
//     }

//     function flipCard(card) {
//       if (lockBoard) return;
//       if (card === firstCard) return;
//       if (card.classList.contains('flipped')) return;

//       card.classList.add('flipped');

//       if (!firstCard) {
//         firstCard = card;
//         return;
//       }
//       secondCard = card;
//       lockBoard = true;

//       checkForMatch();
//     }

//     function checkForMatch() {
//       const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
//       if (isMatch) {
//         matches++;
//         resetTurn();
//         if (matches === symbols.length) {
//           status.textContent = '🎉 You matched all pairs!';
//         }
//       } else {
//         setTimeout(() => {
//           firstCard.classList.remove('flipped');
//           secondCard.classList.remove('flipped');
//           resetTurn();
//         }, 1000);
//       }
//     }

//     function resetTurn() {
//       [firstCard, secondCard] = [null, null];
//       lockBoard = false;
//     }

//     function startGame() {
//       createCards();
//       status.textContent = 'Find all matching pairs!';
//     }

//     startGame();
//   </script>

// </body>
// </html>
// `,
//       },
//       {
//         id: "rockpaperscissors",
//         title: "Rock Paper Scissors",
//         description:
//           "Play the classic hand game against the computer to win rounds",
//         category: "Hand Game",
//         previewImage:
//           "https://image.pollinations.ai/prompt/rock%20paper%20scissors%20hand%20game?width=120&height=240&seed=42&model=flux&nologo=true&transparent=true",
//         tags: ["Luck", "Hand game", "Multiplayer"],
//         html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>Rock Paper Scissors</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       text-align: center;
//       padding: 40px;
//       background: #f5f5f5;
//         background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-attachment: fixed;
//     }
//     h1 {
//       margin-bottom: 30px;
//     }
//     .choices {
//       margin-bottom: 20px;
//     }
//     button {
//       font-size: 30px;
//       margin: 0 15px;
//       padding: 10px 20px;
//       cursor: pointer;
//       border: none;
//       border-radius: 8px;
//       transition: background-color 0.3s;
//     }
//     button:hover {
//       background-color: #ddd;
//     }
//     #result {
//       font-size: 22px;
//       margin-top: 25px;
//       min-height: 40px;
//     }
//     #scoreboard {
//       margin-top: 20px;
//       font-size: 18px;
//     }
//   </style>
// </head>
// <body>

//   <h1>Rock Paper Scissors</h1>
//   <div class="choices">
//     <button data-choice="rock">✊ Rock</button>
//     <button data-choice="paper">✋ Paper</button>
//     <button data-choice="scissors">✌️ Scissors</button>
//   </div>
//   <div id="result"></div>
//   <div id="scoreboard">Player: 0 | Computer: 0 | Ties: 0</div>

//   <script>
//     const buttons = document.querySelectorAll('button[data-choice]');
//     const result = document.getElementById('result');
//     const scoreboard = document.getElementById('scoreboard');

//     let playerScore = 0;
//     let computerScore = 0;
//     let ties = 0;

//     function computerPlay() {
//       const choices = ['rock', 'paper', 'scissors'];
//       return choices[Math.floor(Math.random() * choices.length)];
//     }

//     function playRound(playerSelection, computerSelection) {
//       if (playerSelection === computerSelection) return 'Tie!';

//       if (
//         (playerSelection === 'rock' && computerSelection === 'scissors') ||
//         (playerSelection === 'paper' && computerSelection === 'rock') ||
//         (playerSelection === 'scissors' && computerSelection === 'paper')
//       ) {
//         return 'You win!';
//       }
//       return 'You lose!';
//     }

//     buttons.forEach(button => {
//       button.addEventListener('click', () => {
//         const playerChoice = button.dataset.choice;
//         const compChoice = computerPlay();
//         const roundResult = playRound(playerChoice, compChoice);

//         if (roundResult === 'You win!') playerScore++;
//         else if (roundResult === 'You lose!') computerScore++;
//         else ties++;

//         result.textContent = "You chose " + playerChoice + ", computer chose " + compChoice + "." + roundResult;
//         scoreboard.textContent = "Player: " + playerScore + " | Computer: " + computerScore + " | Ties:  " + ties};
//       });
//     });
//   </script>

// </body>
// </html>
// `,
//       },
//     ];
    const result = await Image.insertMany(templates);
    res.status(200).json(templates);
  } catch (error) {
    console.error(`Error fetching images: ${error}`);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
