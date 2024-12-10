const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;

  if (text === "") return;

  const videoId = videoContainer.dataset.id;
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  location.reload();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
