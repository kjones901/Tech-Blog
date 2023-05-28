const newCommentHandler = async (event) => {
  event.preventDefault();

  const response = document.querySelector('#comment-desc').value.trim();

  // need to send the correct information here.
  console.log("Comment ->", response)
  if (response) {
    try {
      const fetchResponse = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ response }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (fetchResponse.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
