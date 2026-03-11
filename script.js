const button = document.querySelector(".bleh")
const progress = document.querySelector("progress")
const calculator = document.querySelector(".input")

counter = 0

button.addEventListener("click", () => {
    button.textContent = "Clicked!"
    counter += 1
    progress.value = counter * 5
    if (counter == 5){
        button.textContent = ("Really Clicked")
        button.style.backgroundColor= "blue"
    }
    if (counter == 10){
        button.textContent = ("Really Really Clicked")
        button.style.backgroundColor= "purple"
    }
    if (counter == 20){
        button.textContent = ("Seriously Really Really Clicked")
        button.style.backgroundColor = "orange"
    }
    if (counter == 30){
        button.textContent = ("You are really really really really clicking")
        button.style.backgroundColor = "red"
    }
    if (counter == 40){
        button.textContent = ("You are really really really really really clicking")
        button.style.backgroundColor = "green"
    }
    if (counter == 50){
        button.textContent = ("You are really really really really really really clicking")
        button.style.backgroundColor = "yellow"
    }
    if (counter == 60){
        button.textContent = ("You are really really really really really really really clicking")
        button.style.backgroundColor = "black"
    }
    if (progress.value == 250){
        document.querySelector(".win").style.display = "block"
    }
})

calculator.addEventListener("input", () => {
    calculator.value = calculator.value.replace(/[^0-9+\-*/().]/g, "")
})

calculator.addEventListener("change", () => {
    try {
        const result = eval(calculator.value)
        if (result !== undefined) {
            calculator.value = result
        }
    } catch (e) {
        calculator.value = "Error"
    }
})

const messagesContainer = document.getElementById("messages-container");
const messageInput = document.getElementById("message-input");
const usernameInput = document.getElementById("username-input");
const sendButton = document.getElementById("send-button");
const activeGroup = document.getElementById("active-group");
const nameStatus = document.getElementById("name-status");
const resetButton = document.getElementById("reset-button");

let currentUser = localStorage.getItem("chatCurrentUser") || "";
let activeUsers = new Set(); 

function loadMessages() {
    const saved = localStorage.getItem("chatMessages");
    messagesContainer.innerHTML = '';
    activeUsers.clear();

    if (saved) {
        const messages = JSON.parse(saved);
        messages.forEach(msg => {
            const sender = msg.sender || "Guest"; 
            activeUsers.add(sender);
            
            const currentUsername = usernameInput ? (usernameInput.value.trim() || "") : "";
            const isMe = currentUsername && sender === currentUsername; 
            
            createMessageElement(msg.text, isMe ? "sent" : "received", sender);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    updateActiveGroup();
    if (usernameInput) checkUsername();
}

function updateActiveGroup() {
    if (activeUsers.size === 0) {
        if (activeGroup) activeGroup.textContent = "To: Waiting for people to join...";
    } else {
        const usersArray = Array.from(activeUsers);
        if (activeGroup) activeGroup.textContent = "To: " + usersArray.join(", ");
    }
}

function checkUsername() {
    const enteredName = usernameInput.value.trim();
    
    if (!enteredName) {
        messageInput.disabled = true;
        sendButton.disabled = true;
        nameStatus.textContent = "";
        return;
    }

    if (activeUsers.has(enteredName) && enteredName !== currentUser) {
        usernameInput.classList.add("error");
        nameStatus.textContent = "Name taken";
        nameStatus.style.color = "red";
        messageInput.disabled = true;
        sendButton.disabled = true;
    } else {
        usernameInput.classList.remove("error");
        nameStatus.textContent = "";
        messageInput.disabled = false;
        sendButton.disabled = false;
        
        if (enteredName !== currentUser) {
            currentUser = enteredName;
            localStorage.setItem("chatCurrentUser", currentUser);

            const saved = localStorage.getItem("chatMessages");
             if (saved) {
                 messagesContainer.innerHTML = '';
                 const messages = JSON.parse(saved);
                 messages.forEach(msg => {
                    const sender = msg.sender || "Guest"; 
                    const isMe = sender === enteredName;
                    createMessageElement(msg.text, isMe ? "sent" : "received", sender);
                 });
                 messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }
}

function createMessageElement(text, type, sender) {
    const messageWrapper = document.createElement("div");
    messageWrapper.style.display = "flex";
    messageWrapper.style.flexDirection = "column";
    messageWrapper.style.marginBottom = "10px";
    
    if (type === "received") {
        const nameLabel = document.createElement("div");
        nameLabel.textContent = sender;
        nameLabel.style.fontSize = "12px";
        nameLabel.style.color = "#888";
        nameLabel.style.marginBottom = "4px";
        nameLabel.style.marginLeft = "12px";
        messageWrapper.appendChild(nameLabel);
        
        messageWrapper.style.alignItems = "flex-start";
    } else {
        messageWrapper.style.alignItems = "flex-end";
    }

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    
    if (type === "sent") {
        bubble.classList.add("message-sent");
        bubble.style.maxWidth = "fit-content";
    } else {
        bubble.classList.add("message-received");
        bubble.style.maxWidth = "fit-content";
    }
    
    bubble.textContent = text;
    messageWrapper.appendChild(bubble);
    
    messagesContainer.appendChild(messageWrapper);
}

function addMessage() {
    const text = messageInput.value.trim();
    const sender = usernameInput ? (usernameInput.value.trim() || "Guest") : "Guest";

    if (activeUsers.has(sender) && sender !== currentUser) {
         alert("Please choose a unique name.");
         return;
    }

    if (text === "") return;

    const saved = localStorage.getItem("chatMessages");
    const messages = saved ? JSON.parse(saved) : [];
    
    messages.push({ text: text, sender: sender, timestamp: Date.now() });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    
    localStorage.setItem("chatCurrentUser", sender);
    currentUser = sender;

    loadMessages();
    
    messageInput.value = "";
}


window.addEventListener('storage', (e) => {
    if (e.key === 'chatMessages') {
        loadMessages();
    }
});


if (usernameInput) {
    if (currentUser) {
        usernameInput.value = currentUser;
    }

    usernameInput.addEventListener('change', () => {
         checkUsername();
         loadMessages();
    });
    
    usernameInput.addEventListener('input', () => {
        checkUsername();
    });
}


loadMessages();
if (usernameInput) checkUsername();

if (sendButton) {
    sendButton.addEventListener("click", addMessage);
}

if (messageInput) {
    messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addMessage();
        }
    });
}

if (resetButton) {
    resetButton.addEventListener("click", () => {
        localStorage.clear();
        loadMessages();
        window.location.reload();
    });
}
