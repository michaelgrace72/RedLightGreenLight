class RedLightGreenLight {
    constructor() {
        this.lightDisplay = document.getElementById('light-display');
        this.lightText = document.getElementById('light-text');
        this.redSound = document.getElementById('red-sound');
        this.greenSound = document.getElementById('green-sound');
        
        this.currentState = 'neutral';
        this.lastKeyPress = 0;
        this.keyPressDelay = 200; // 1 second delay between key presses
        
        this.init();
    }
    
    init() {
        // Add keyboard event listeners
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });
        
        // Prevent default behavior for specific keys
        document.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 'r' || 
                event.key.toLowerCase() === 'g' || 
                event.key === 'ArrowLeft' || 
                event.key === 'ArrowRight' ||
                event.key === 'ArrowUp' ||
                event.key === 'ArrowDown' ||
                event.key === 'PageUp' ||
                event.key === 'PageDown') {
                event.preventDefault();
            }
        });
        
        console.log('Red Light Green Light game initialized!');
        console.log('Press R for Red Light, G for Green Light');
        console.log('Or use PowerPoint controls: Left/Down/PageDown for Red Light, Right/Up/PageUp for Green Light');
    }
    
    handleKeyPress(event) {
        const key = event.key.toLowerCase() === 'r' || event.key.toLowerCase() === 'g' 
            ? event.key.toLowerCase() 
            : event.key; // Keep arrow keys as-is
        const currentTime = Date.now();
        
        // Check if enough time has passed since the last key press
        if (currentTime - this.lastKeyPress < this.keyPressDelay) {
            console.log(`Please wait ${Math.ceil((this.keyPressDelay - (currentTime - this.lastKeyPress)) / 1000)} more seconds before pressing again`);
            return;
        }
        
        switch (key) {
            case 'r':
            case 'ArrowLeft': // PowerPoint back button for red light
            case 'ArrowDown': // PowerPoint down button for red light
            case 'PageDown': // PowerPoint page down button for red light
                this.showRedLight();
                this.lastKeyPress = currentTime;
                break;
            case 'g':
            case 'ArrowRight': // PowerPoint next button for green light
            case 'ArrowUp': // PowerPoint up button for green light
            case 'PageUp': // PowerPoint page up button for green light
                this.showGreenLight();
                this.lastKeyPress = currentTime;
                break;
        }
    }
    
    showRedLight() {
        // Update visual state
        this.lightDisplay.className = 'red-light';
        this.lightText.textContent = '';
        this.currentState = 'red';
        
        // Play red light sound
        this.playSound(this.redSound, 'red');
        
        console.log('Red Light activated!');
    }
    
    showGreenLight() {
        // Update visual state
        this.lightDisplay.className = 'green-light';
        this.lightText.textContent = '';
        this.currentState = 'green';
        
        // Play green light sound
        this.playSound(this.greenSound, 'green');
        
        console.log('Green Light activated!');
    }
    
    playSound(audioElement, type) {
        try {
            // Reset the audio to the beginning
            audioElement.currentTime = 0;
            
            // Play the sound
            const playPromise = audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`${type} light sound played successfully`);
                    })
                    .catch((error) => {
                        console.log(`Could not play ${type} light sound:`, error.message);
                        console.log('This might be due to browser autoplay policies. Try clicking on the page first.');
                    });
            }
        } catch (error) {
            console.log(`Error playing ${type} light sound:`, error.message);
        }
    }
    
    // Method to reset to neutral state (could be used for future features)
    reset() {
        this.lightDisplay.className = 'neutral';
        this.lightText.textContent = 'Press R for Red Light or G for Green Light';
        this.currentState = 'neutral';
        console.log('Game reset to neutral state');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new RedLightGreenLight();
    
    // Make game instance globally accessible for debugging
    window.game = game;
});

// Handle page visibility change to ensure audio works properly
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Page is now visible - audio should work properly');
    }
});
