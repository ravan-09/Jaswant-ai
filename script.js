async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
  input.value = "";

  const response = await fetch("/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: message }),
  });

  const data = await response.json();
  chatBox.innerHTML += `<div><strong>Jaswant AI:</strong> ${data.answer}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
