function calculateDays() {
    const input = document.getElementById("dateInput").value.trim();
    const result = document.getElementById("result");

    if (!input) {
        result.textContent = "Enter a date first (YYYY-MM-DD or YYYY-MM-DD HH:MM:SSS)";
        return;
    }

    // Accept both "YYYY-MM-DD" and "YYYY-MM-DD HH:MM:SSS" formats
    const dateRegex = /^\d{4}-\d{2}-\d{2}(\s+\d{2}:\d{2}:\d{3})?$/;
    if (!dateRegex.test(input)) {
        result.textContent = "Invalid format! Use YYYY-MM-DD or YYYY-MM-DD HH:MM:SSS";
        return;
    }

    // Extract just the date part (YYYY-MM-DD)
    const datePart = input.split(' ')[0];

    const today = new Date();
    const selected = new Date(datePart + 'T00:00:00');

    // Check if date is valid
    if (isNaN(selected.getTime())) {
        result.textContent = "Invalid date!";
        return;
    }

    // Reset
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    const diffTime = selected - today;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        result.textContent = "It's today!";
    } else if (diffDays > 0) {
        result.textContent = `${diffDays} days left until ${selected.toLocaleDateString("sv-SE")}`;
    } else {
        result.textContent = `${Math.abs(diffDays)} days since ${selected.toLocaleDateString("sv-SE")}`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add Enter key listener to date input
    document.getElementById('dateInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateDays();
        }
    });
});
