const newCommentHandler = async (event) => {
  event.preventDefault();

  const response = document.querySelector("#comment-desc").value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1];

  console.log("post_id ->", post_id)
  // need to send the correct information here.
  console.log("Comment ->", response);
  if (response) {
    try {
      const fetchResponse = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({
          response: response,
          post_id: post_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (fetchResponse.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        document.location.replace('/login')
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the comment");
    }
  }
};

document.querySelector(".new-comment-form").addEventListener("submit", newCommentHandler);
