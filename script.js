document.addEventListener('DOMContentLoaded', function() {
    const robotCheck = document.getElementById('robotCheck');
    const scanButton = document.getElementById('scanButton');
    const bruteforceContainer = document.getElementById('bruteforceContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const statusMessage = document.getElementById('statusMessage');
    const passwordAttempts = document.getElementById('passwordAttempts');
    
    // Enable scan button only when "I'm not a robot" is checked
    robotCheck.addEventListener('change', function() {
        scanButton.disabled = !this.checked;
    });
    
    // Scan button click handler
    scanButton.addEventListener('click', function() {
        bruteforceContainer.classList.remove('hidden');
        startBruteForce();
    });
    
    function startBruteForce() {
        let progress = 0;
        const totalAttempts = 50;
        let attempts = 0;
        
        const interval = setInterval(() => {
            attempts++;
            progress = Math.min(100, Math.floor((attempts / totalAttempts) * 100));
            
            progressBar.style.width = progress + '%';
            progressText.textContent = progress + '%';
            
            // Generate random password attempt
            const password = generateRandomPassword();
            const attemptDiv = document.createElement('div');
            attemptDiv.className = 'failed';
            attemptDiv.textContent = `Attempt ${attempts}: Trying "${password}"... FAILED`;
            passwordAttempts.appendChild(attemptDiv);
            passwordAttempts.scrollTop = passwordAttempts.scrollHeight;
            
            // Update status message
            if (progress < 30) {
                statusMessage.textContent = `Brute-forcing password (${progress}%)...`;
            } else if (progress < 70) {
                statusMessage.textContent = `Bypassing security (${progress}%)...`;
            } else {
                statusMessage.textContent = `Extracting cookies (${progress}%)...`;
            }
            
            // When complete
            if (attempts >= totalAttempts) {
                clearInterval(interval);
                progressText.textContent = "100%";
                statusMessage.textContent = "Success! Authentication cookie extracted: ROBLOSECURITY=ABCDEF123456...";
                
                // Show "successful" password
                const successDiv = document.createElement('div');
                successDiv.className = 'success';
                successDiv.textContent = `Attempt ${attempts+1}: Found password "qwerty12345"! SUCCESS`;
                passwordAttempts.appendChild(successDiv);
                passwordAttempts.scrollTop = passwordAttempts.scrollHeight;
            }
        }, 300);
    }
    
    function generateRandomPassword() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 8 + Math.floor(Math.random() * 5); i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
});