const deleteForm = document.querySelector(".delete-post-form");
if (deleteForm) {
    deleteForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const url = deleteForm.getAttribute("action");

        const res = await fetchWithRefresh(url, {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            window.location.href = "/";
        }
        else {
            handleErrorResponse(res);
        }
    });
}
