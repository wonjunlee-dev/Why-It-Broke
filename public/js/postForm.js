document.querySelectorAll(".post-form").forEach(form => {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = form.querySelector("#title").value;
        const description = form.querySelector("#description").value;
        const language = form.querySelector("#language").value;
        const image = form.querySelector("#image").files[0];
        const idInput = form.querySelector('input[name="id"]');
        const id = idInput ? idInput.value : null;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("language", language);
        formData.append("image", image);
        if (id)
            formData.append("id", id);

        const actionUrl = form.getAttribute("action");

        const res = await fetchWithRefresh(actionUrl, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        if (res.redirected && res.url.includes("/auth/login")) {
            alert("Your session has expired. Please log in again.");
            window.location.href = "/auth/login";
        }
        else if (res.ok) {
            window.location.href = "/";
        }
        else {
            await handleErrorResponse(res);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("image");
    const fileNameSpan = document.getElementById("file-name");

    if (input && fileNameSpan) {
        input.addEventListener("change", () => {
            const file = input.files[0];
            fileNameSpan.textContent = file ? file.name : "No file chosen";
        });
    }
});
