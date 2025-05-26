const commentForm = document.querySelector(".comment-form");
if (commentForm) {
    commentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const contentInput = commentForm.querySelector('textarea[name="content"]');
        const content = contentInput ? contentInput.value.trim() : "";

        const url = commentForm.getAttribute("action");

        const res = await fetchWithRefresh(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content })
        });

        if (res.ok) {
            window.location.reload();
        }
        else {
            handleErrorResponse(res);
        }
    });
}

const deleteCommentForm = document.querySelector(".delete-comment-form");
if (deleteCommentForm) {
    deleteCommentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const url = deleteCommentForm.getAttribute("action");

        const res = await fetchWithRefresh(url, {
            method: "DELETE",
            credentials: "include",
        });

        if (res.ok) {
            window.location.reload();
        }
        else {
            handleErrorResponse(res);
        }
    });
}