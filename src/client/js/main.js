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

  if (!main) return;

  const input = document.getElementById("avatar");
  const img = main.querySelector(".avatar > img");
  const defaultSvg = main.querySelector(".avatar > svg");
  const originalImgSrc = img.src;

  const handeInput = () => {
    const fileList = input.files;
    if (fileList.length === 0) {
      img.src = originalImgSrc;
      if (defaultSvg) {
        defaultSvg.style.removeProperty("display");
      }
      return;
    }
    const [file] = fileList;
    img.src = URL.createObjectURL(file);
    defaultSvg.style.setProperty("display", "none");
  };

  input.addEventListener("input", handeInput);
}
