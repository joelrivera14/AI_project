document.querySelector("button").addEventListener("click", async () => {
  const textarea = document.querySelector("textarea");
  const responseElem = document.querySelectorAll("p")[1];
  const prompt = textarea.value.trim();

  if (!prompt) {
    responseElem.textContent = "Please enter a prompt.";
    return;
  }

  responseElem.textContent = "Loading...";

  try {
    const res = await fetch("http://localhost:3000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      responseElem.textContent =
        "Error: " + (errorData.error || "Unknown error");
      return;
    }

    const data = await res.json();
    responseElem.textContent = data.response;
  } catch (err) {
    responseElem.textContent = "Error: " + err.message;
  }
});
