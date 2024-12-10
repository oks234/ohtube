const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(textarea.value);
};

btn.addEventListener("click", handleSubmit);
