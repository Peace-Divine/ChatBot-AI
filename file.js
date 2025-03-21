document.addEventListener("DOMContentLoaded", function () {
  const botContainer = document.getElementById("container");
  const botCloseBtn = document.getElementById("close-btn");
  const botSendBtn = document.getElementById("send-btn");
  const botText = document.getElementById("text");
  const botMessages = document.getElementById("messages");
  const botIcon = document.getElementById("chatbot-icon");

  botIcon.addEventListener("click", function () {
    botContainer.classList.remove("hidden");
    botIcon.style.display = "none";
  });
  botCloseBtn.addEventListener("click", function () {
    botContainer.classList.add("hidden");
    botIcon.style.display = "flex";
  });
  botSendBtn.addEventListener("click", sendMessage);
  botText.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
  function sendMessage() {
    const userMessage = botText.value.trim();
    if (userMessage) {
      appendMessage("user", userMessage);
      botText.value = "";
      getBotResponse(userMessage);
    }
  }
  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    message.textContent = message;
    botMessages.appendChild(messageElement);
    botMessages.scrollTop = botMessages.scrollHeight;
  }
  async function getBotResponse(userMessage) {
    const apiKey =
      "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";
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
          max_completion_tokens: 150,
        }),
      });

      const data = await response.json();
      const botMessage = data.choices[0].message.content;
      appendMessage("bot", botMessage);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      appendMessage("bot", "Soory, something went wrong. Please try again.");
    }
  }
});
