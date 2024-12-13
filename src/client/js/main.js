import "../scss/styles.scss";

editProfile();

function editProfile() {
  const main = document.querySelector("main.edit-profile");

  if (!main) return;

  const input = document.getElementById("avatar");
  const img = main.querySelector(".avatar > img");
  const originalImgSrc = img.src;

  const handeInput = () => {
    const fileList = input.files;
    if (fileList.length === 0) {
      img.src = originalImgSrc;
      return;
    }
    const [file] = fileList;
    img.src = URL.createObjectURL(file);
  };

  input.addEventListener("input", handeInput);
}
