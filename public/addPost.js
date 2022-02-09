async function addPostForm(event) {
    event.preventDefault();

const title = document.querySelector('input[name="post-title"]').value.trim();
const postContent = document.querySelector('textarea[name="post-content"]').value.trim();

const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({title, postContent}),

    headers: {
        'Content-Type': 'application/json'
    }
});

if (response.ok) {
    document.location.replace('/dashboard');
} else {
    alert(response.statusText);
    }
}

document.querySelector('.add-post-form').addEventListener('submit', addPostForm);