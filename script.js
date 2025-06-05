async function sendMessage() {
  const input = document.getElementById('userInput');
  const chatbox = document.getElementById('chatbox');
  const userText = input.value.trim();
  if (!userText) return;

  chatbox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
  input.value = '';

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();
  chatbox.innerHTML += `<p><strong>Jaswant AI:</strong> ${data.reply}</p>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}
