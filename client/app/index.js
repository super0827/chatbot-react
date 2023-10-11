window.onload = () =>
  document.getElementById("prompt-form").addEventListener("submit", (e) => {
    // prevent the form from refreshing the page
    e.preventDefault();

    // get the value of the input
    const message = document.getElementById("prompt-input").value;

    // call the function that handles the fetch request
    // (we'll create this function next)
    handleSubmitMessage(message).then((data) => {
      // add the chatbot's response to the DOM
      // when the fetch request is complete
      // (we'll create this function later)
      addBotMessageToDialogueBox(data);
    });
    async function handleSubmitMessage(message) {
      // input validation
      if (!message) {
        return alert("Please enter your support question");
      }

      // add the user's message to the DOM
      // (we'll implement this later)
      addUserMessageToDialogueBox(message);

      // send fetch request to our backend api
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      // parse our server's response as json
      const payload = await response.json();

      // return the response
      return payload;
    }
    function addUserMessageToDialogueBox(message) {
      // create a new li element
      const userMessage = document.createElement("li");

      // add user-specific styling to element
      // so that it's obvious this is the user's prompt
      // and not a response from the chatbot
      userMessage.classList.add(
        "bg-indigo-500",
        "text-white",
        "rounded",
        "p-2",
        "w-fit",
        "self-end",
        "break-words"
      );

      // add the user's message to the li element
      userMessage.innerText = message;

      // add the li element to the DOM
      document.getElementById("dialogue").appendChild(userMessage);

      // clear the input for the next question
      document.getElementById("prompt-input").value = "";

      // display loading indicator in dialogue box
      addLoadingIndicatorToDialogueBox();
    }
    function addLoadingIndicatorToDialogueBox() {
      // create a new li element
      const loadingIndicator = document.createElement("li");

      // set the id of the loading indicator
      loadingIndicator.id = "loading-indicator";

      // add loading indicator styling
      loadingIndicator.classList.add(
        "bg-gray-500",
        "text-white",
        "rounded",
        "p-2",
        "w-fit",
        "self-start",
        "w-12"
      );

      // create a new image element
      const loadingImage = document.createElement("img");

      // set the image source
      loadingImage.src = "../images/loading.svg";

      // add loading indicator image as a child to li element
      loadingIndicator.appendChild(loadingImage);

      // add the li element to the DOM
      document.getElementById("dialogue").appendChild(loadingIndicator);
    }
    function addBotMessageToDialogueBox(response) {
      // remove the loading indicator now that the response has been received
      removeLoadingIndicatorFromDialogueBox();

      // create a new li element
      const botMessage = document.createElement("li");

      // style the bot response element based on the status
      if (response.status === "error") {
        // add error styling
        botMessage.classList.add(
          "bg-red-500",
          "text-white",
          "rounded",
          "p-2",
          "w-fit",
          "self-start"
        );

        // add error text
        botMessage.innerText =
          "Oh no! Something went wrong. Please try again later.";
      } else {
        // add user-specific styling to element
        botMessage.classList.add(
          "bg-gray-500",
          "text-white",
          "rounded",
          "p-2",
          "w-fit",
          "self-start"
        );

        // add the user's response to the element
        botMessage.innerText = response.data.trim();
      }

      // add the li element to the DOM
      document.getElementById("dialogue").appendChild(botMessage);

      // clear the input for the next response
      document.getElementById("prompt-input").value = "";
    }
    function removeLoadingIndicatorFromDialogueBox() {
      // get the loading indicator element
      const loadingIndicator = document.getElementById("loading-indicator");

      // remove the loading indicator from the DOM
      loadingIndicator.remove();
    }
  });
