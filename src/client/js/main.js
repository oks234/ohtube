import "../scss/styles.scss";

showAndHideMessages();
editProfile();
initAddMessage();

function initAddMessage() {
  if (window.addMessage) return;

  window.addMessage = (type, msg) => {
    let messages = document.querySelector(".messages");

    if (!messages) {
      messages = document.createElement("div");
      messages.classList.add("messages");
      document.body.append(messages);
    }

    messages.style.setProperty("transform", "translateY(-100%)");
    messages.innerHTML = "";
    const message = document.createElement("div");
    message.className = type;
    message.innerHTML = msg;
    messages.append(message);
    showAndHideMessages();
  };
}

function showAndHideMessages() {
  const messages = document.querySelector(".messages");

  if (!messages) return;

  const DELAY = 5000;
  let timeoutId;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  setTimeout(() => {
    messages.style.setProperty("transform", "translateY(0)");
  }, 150);
  timeoutId = setTimeout(() => {
    messages.style.setProperty("transform", "translateY(-100%)");
  }, DELAY);
}

function editProfile() {
  const main = document.querySelector("main.edit-profile");

  // 1.

  if (!main) return;

  const input = document.getElementById("avatar");
  const img = main.querySelector(".avatar > img");
  const svg = main.querySelector(".avatar > svg");
  const originalImgSrc = img.src;

  const handeInput = () => {
    const fileList = input.files;
    if (fileList.length === 0) {
      if (svg) {
        img.hidden = true;
        svg.style.removeProperty("display");
        return;
      }
      img.src = originalImgSrc;
      return;
    }
    if (svg) {
      img.hidden = false;
      svg.style.setProperty("display", "none");
    }
    const [file] = fileList;
    img.src = URL.createObjectURL(file);
  };

  input.addEventListener("input", handeInput);
}
