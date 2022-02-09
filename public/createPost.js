async function createPost(event) {
    event.preventDefault();

    document.location.replace('/dashboard/new')
}

document.querySelector('#create-post').addEventListener('click', createPost);