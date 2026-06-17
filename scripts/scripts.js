function calculateDays() {
    const input = document.getElementById("dateInput").value.trim();
    const result = document.getElementById("result");

    if (!input) {
        result.textContent = "Enter a date first (YYYY-MM-DD, YYYYMMDD, YYMMDD, or any with optional time)";
        result.classList.add("error");
        return;
    }

    // Parse different date formats
    let datePart;

    // Check for YYYY-MM-DD (with optional time after)
    const dashFormatRegex = /^\d{4}-\d{2}-\d{2}(\s|T|$)/;
    if (dashFormatRegex.test(input)) {
        datePart = input.substring(0, 10); // Take first 10 chars: YYYY-MM-DD
    }
    // Check for YYYYMMDD (8-digit format, with optional time after)
    else if (/^\d{8}/.test(input) && input.length >= 8) {
        const dateStr = input.substring(0, 8);
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        datePart = `${year}-${month}-${day}`;
    }
    // Check for YYMMDD (6-digit format, with optional time after)
    else if (/^\d{6}/.test(input) && input.length >= 6) {
        const dateStr = input.substring(0, 6);
        const year = parseInt(dateStr.substring(0, 2));
        // Assume 1900s for years >= 30, 2000s for years < 30
        const fullYear = year >= 30 ? 1900 + year : 2000 + year;
        const month = dateStr.substring(2, 4);
        const day = dateStr.substring(4, 6);
        datePart = `${fullYear}-${month}-${day}`;
    }
    else {
        result.textContent = "Invalid format! Use YYYY-MM-DD, YYYYMMDD, YYMMDD, or any with optional time";
        result.classList.add("error");
        return;
    }

    const today = new Date();
    const selected = new Date(datePart + 'T00:00:00');

    // Check if date is valid
    if (isNaN(selected.getTime())) {
        result.textContent = "Invalid date!";
        result.classList.add("error");
        return;
    }

    // Remove error class on success
    result.classList.remove("error");

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
