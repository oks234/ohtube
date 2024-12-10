const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const chatIcon = document.querySelector(".chatIconContainer svg");
  const newComment = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = text;
  newComment.className = "video__comment";
  newComment.appendChild(chatIcon.cloneNode(true));
  newComment.appendChild(span);
  videoComments.insertBefore(newComment, videoComments.childNodes.item(0));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;

  if (text === "") return;

  const videoId = videoContainer.dataset.id;
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
