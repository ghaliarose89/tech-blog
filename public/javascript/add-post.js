async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const blog_details = document.querySelector('#post-url').value;
  const user_id = document.querySelector('#user_id').value;
  const response = await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      blog_details,
      user_id

    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/createPost');
  } else {
    alert(response.statusText);
  }
}



async function deleteFormHandler(event) {
  event.preventDefault();
  const post_id = document.querySelector('#post_id').value;
  const response = await fetch(`/api/blogs/${post_id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/createPost');
  } else {
    alert(response.statusText);
  }
}


async function addCommentBtn(thisBtn) {
  const post_id = thisBtn.getAttribute("data-post-id")//document.querySelector('#post_id').value;
  document.location.replace(`/singlePost/${post_id}`);
};

async function editPosttBtn(thisBtn) {
  const post_id = thisBtn.getAttribute("data-post-id")
  document.location.replace(`/editPost/${post_id}`);
};


if (document.querySelector('.deletePostBtn')){
  document.querySelector('.deletePostBtn').addEventListener('click',deleteFormHandler)
}
