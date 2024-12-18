const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector("#videoComments");
const noComments = videoComments.querySelector(".no-comments");

const deleteComment = async (e) => {
  const { id } = e.currentTarget.parentNode.dataset;
  const videoId = videoContainer.dataset.id;
  const response = await fetch(`/api/videos/${videoId}/comment?id=${id}`, {
    method: "DELETE",
  });
  if (response.status === 204) {
    const comment = videoComments.querySelector(`[data-id="${id}"]`);
    comment.remove();
    window.addMessage("success", "Comment deleted.");
  }
};

const addComment = (text, id) => {
  const template = document.querySelector("#videoCommentTemplate");
  const cloned = template.content.cloneNode(true);
  const list = videoComments.querySelector("ul");
  const li = cloned.querySelector("li");
  const p = cloned.querySelector("p");
  const button = cloned.querySelector("button");
  p.innerText = text;
  li.dataset.id = id;
  list.prepend(cloned);
  button.addEventListener("click", deleteComment);
  noComments.style.setProperty("display", "none");
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;

  if (text === "") return;

  const videoId = videoContainer.dataset.id;
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
    window.addMessage("success", "Comment Created.");
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  Array.from(document.querySelectorAll(".video__comment__delete-btn")).forEach(
    (btn) => {
      btn.addEventListener("click", deleteComment);
    }
  );
}
