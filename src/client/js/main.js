import "../scss/styles.scss";

messages();
editProfile();

function messages() {
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
