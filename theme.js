(function () {
    const storageKey = "studentWishDarkMode";

    function applyTheme(enabled) {
        const theme = enabled ? "dark" : "light";
        document.documentElement.dataset.theme = theme;
        if (document.body) {
            document.body.dataset.theme = theme;
        }
        document.querySelectorAll("#dark-mode-toggle").forEach(function (toggle) {
            toggle.checked = enabled;
        });
    }

    let darkModeEnabled;
    try {
        const savedPreference = localStorage.getItem(storageKey);
        darkModeEnabled = savedPreference === null
            ? localStorage.getItem("studentWishAdminDarkMode") === "true"
            : savedPreference === "true";
        if (savedPreference === null && darkModeEnabled) {
            localStorage.setItem(storageKey, "true");
        }
    } catch (error) {
        console.error("Could not read saved appearance settings.", error);
        darkModeEnabled = false;
    }
    applyTheme(darkModeEnabled);

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("#dark-mode-toggle").forEach(function (toggle) {
            toggle.addEventListener("change", function () {
                applyTheme(toggle.checked);
                try {
                    localStorage.setItem(storageKey, String(toggle.checked));
                } catch (error) {
                    console.error("Could not save appearance settings.", error);
                }
            });
        });
    });

    window.addEventListener("storage", function (event) {
        if (event.key === storageKey) {
            applyTheme(event.newValue === "true");
        }
    });
})();
