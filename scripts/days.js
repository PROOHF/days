function calculateDays() {
    const input = document.getElementById("dateInput").value;
    const result = document.getElementById("result");

    if (!input) {
        result.textContent = "Choose a date first";
        return;
    }

    const today = new Date();
    const selected = new Date(input);

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