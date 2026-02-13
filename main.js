const THEME_KEY = "theme";

function safeGetTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch (error) {
    // localStorage may be blocked in some environments.
  }

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch (error) {
    return "light";
  }
}

function safeSaveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // Ignore storage errors and keep in-memory behavior.
  }
}

function applyTheme(theme, button) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  if (button) {
    button.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton) {
    return;
  }

  let currentTheme = safeGetTheme();
  applyTheme(currentTheme, toggleButton);

  toggleButton.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    safeSaveTheme(currentTheme);
    applyTheme(currentTheme, toggleButton);
  });
});
