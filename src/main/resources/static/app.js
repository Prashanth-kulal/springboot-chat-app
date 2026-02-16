let stompClient = null;
let username = "";

function connect() {
    username = document.getElementById("name").value;

    const socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        stompClient.subscribe('/topic/public', function (message) {
            showMessage(JSON.parse(message.body));
        });
    });
}

function sendMessage() {
    const content = document.getElementById("message").value;

    stompClient.send("/app/sendMessage", {}, JSON.stringify({
        sender: username,
        content: content,
        type: "CHAT"
    }));
}

function showMessage(message) {
    const chat = document.getElementById("chat");
    chat.innerHTML += `<p><b>${message.sender}:</b> ${message.content}</p>`;
}
