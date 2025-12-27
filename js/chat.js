// AI Chat functionality

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const chatReset = document.getElementById('chat-reset');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');

    // Mock AI responses database
    const responses = {
        'hello': 'Hello! Welcome to Aimen Tech Solutions. How can I help you today?',
        'hi': 'Hi there! I\'m here to assist you with any questions about our services.',
        'services': 'We offer a wide range of services including web development, mobile apps, AI solutions, and cloud services. Which service interests you most?',
        'pricing': 'Our pricing varies based on project complexity and requirements. We offer flexible plans starting from $2,999/month. Would you like me to explain our pricing tiers?',
        'contact': 'You can reach us at info@aimentech.com or call +1 (555) 123-4567. We\'re also available for a free consultation.',
        'portfolio': 'Check out our portfolio section to see examples of our recent projects. We\'ve worked with clients across various industries.',
        'timeline': 'Project timelines depend on complexity, but typically range from 2-6 months. We follow an agile development process with regular updates.',
        'support': 'We provide comprehensive support including 24/7 monitoring, regular maintenance, and technical assistance. Our enterprise plans include priority support.',
        'web development': 'Our web development services include custom websites, e-commerce platforms, and web applications using modern technologies like React, Vue.js, and Node.js.',
        'mobile apps': 'We create native and cross-platform mobile apps for iOS and Android using React Native, Flutter, and native development approaches.',
        'ai solutions': 'Our AI services include machine learning, natural language processing, computer vision, and intelligent automation solutions.',
        'cloud services': 'We help with cloud migration, infrastructure setup, DevOps, and management across AWS, Azure, and Google Cloud platforms.',
        'consulting': 'Our technology consulting services include digital transformation strategy, architecture review, security audits, and process optimization.',
        'default': 'I\'m here to help! Could you please provide more details about what you\'re looking for? I can assist with information about our services, pricing, or project inquiries.'
    };

    // Enable/disable send button based on input
    chatInput.addEventListener('input', function() {
        sendButton.disabled = this.value.trim().length === 0;
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !sendButton.disabled) {
            sendMessage();
        }
    });

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Handle suggestion button clicks
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            chatInput.value = this.textContent;
            sendButton.disabled = false;
            sendMessage();
        });
    });

    // Reset chat
    chatReset.addEventListener('click', function() {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <span>🤖</span>
                </div>
                <div class="message-content">
                    <p>Hello! I'm Aimen, your AI assistant. How can I help you today? You can ask me about our services, pricing, or anything related to IT outsourcing.</p>
                </div>
            </div>
        `;
        chatInput.value = '';
        sendButton.disabled = true;
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');

        // Clear input
        chatInput.value = '';
        sendButton.disabled = true;

        // Show typing indicator
        showTypingIndicator();

        // Simulate AI response delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = getAIResponse(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }

    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = type === 'bot' ? '<span>🤖</span>' : '<span>👤</span>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${content}</p>`;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = '<span>🤖</span>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);

        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function getAIResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Check for exact matches first
        for (const [key, response] of Object.entries(responses)) {
            if (key !== 'default' && lowerMessage.includes(key)) {
                return response;
            }
        }

        // Check for partial matches
        if (lowerMessage.includes('what') && lowerMessage.includes('do')) {
            return responses.services;
        }

        if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee')) {
            return responses.pricing;
        }

        if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('time')) {
            return responses.timeline;
        }

        if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
            return responses.support;
        }

        if (lowerMessage.includes('work') || lowerMessage.includes('project') || lowerMessage.includes('example')) {
            return responses.portfolio;
        }

        if (lowerMessage.includes('reach') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
            return responses.contact;
        }

        // Default response
        return responses.default;
    }

    // Initialize chat
    chatInput.focus();
});