async function fetchWithRefresh(url, options = {}) {
    const defaultOptions = {
        credentials: "include",
        ...options,
    };

    let response = await fetch(url, defaultOptions);

    if (response.status === 401) {
        const refreshResponse = await fetch("/auth/token", {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.status === 200) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            response = await fetch(url, defaultOptions);
        }
        else {
            alert("Token has been expired");
            window.location.href = "/auth/login";
        }
    }

    return response;
}

async function handleErrorResponse(res) {
    let message = "Something went wrong. Please try it again later.";
    try {
        const err = await res.json();
        message = err.message || message;
    }
    catch (error) {
        console.error("Failed to parse error response:", error);
    }
    alert(message);
}

// window.fetch = fetchWithRefresh;
