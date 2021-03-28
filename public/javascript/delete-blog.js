async function deleteBlog(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString('/').length - 1];
    const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert.toString(response.statusText);
    }
}

document.querySelector('.delete-btn').addEventListener('click', deleteBlog);