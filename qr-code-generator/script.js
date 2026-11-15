/**
 * ==========================================================================
 * QR Code Generator - Scripting Language Lab
 * Vanilla JavaScript Implementation
 * ==========================================================================
 */

// Wait for the DOM to be fully loaded before attaching events
document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------------
    // 1. DOM Element References
    // ----------------------------------------------------------------------
    const textInput = document.getElementById("text-input");
    const generateBtn = document.getElementById("generate-btn");
    const clearBtn = document.getElementById("clear-btn");
    const downloadBtn = document.getElementById("download-btn");
    const qrPreview = document.getElementById("qr-preview");
    const errorMessage = document.getElementById("error-message");

    // Default placeholder HTML displayed when no QR code has been generated
    const defaultPlaceholderHTML = '<p class="preview-placeholder">Your QR code will appear here</p>';

    // Variable to track the active QRCode instance
    let qrCodeInstance = null;

    // ----------------------------------------------------------------------
    // 2. Helper & Validation Functions
    // ----------------------------------------------------------------------

    /**
     * Display a validation error message and highlight the input field.
     * @param {string} message - The error message text to present to the user.
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add("visible");
        textInput.classList.add("input-error");
    }

    /**
     * Clear any active validation error message and restore input styling.
     */
    function clearError() {
        errorMessage.textContent = "";
        errorMessage.classList.remove("visible");
        textInput.classList.remove("input-error");
    }

    /**
     * Validate the user input.
     * Checks whether the user entered non-empty text or URL.
     * @param {string} value - The raw text entered by the user.
     * @returns {boolean} - True if input is valid; false otherwise.
     */
    function validateInput(value) {
        if (!value || value.trim().length === 0) {
            showError("Please enter a URL or plain text to generate a QR code.");
            return false;
        }
        clearError();
        return true;
    }

    // ----------------------------------------------------------------------
    // 3. Core Feature Functions
    // ----------------------------------------------------------------------

    /**
     * Generate a new QR code from the user input.
     * Validates input, clears previous output, and invokes QRCode.js.
     */
    function generateQRCode() {
        const rawValue = textInput.value;

        // Perform validation
        if (!validateInput(rawValue)) {
            // Keep download button disabled when input is invalid
            downloadBtn.disabled = true;
            return;
        }

        const trimmedValue = rawValue.trim();

        // Check if external QRCode library is loaded
        if (typeof QRCode === "undefined") {
            showError("QRCode library failed to load. Please check your internet connection.");
            return;
        }

        // Clean previous QR preview content to ensure only one code is shown
        qrPreview.innerHTML = "";
        qrCodeInstance = null;

        try {
            // Instantiate QRCode.js to render into qrPreview container
            qrCodeInstance = new QRCode(qrPreview, {
                text: trimmedValue,
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Enable download button once QR code has been generated
            downloadBtn.disabled = false;
        } catch (error) {
            console.error("Error generating QR Code:", error);
            showError("An unexpected error occurred while generating the QR code.");
            downloadBtn.disabled = true;
        }
    }

    /**
     * Download the rendered QR code as a PNG image file.
     * Extracts image data from the generated <canvas> or <img> element.
     */
    function downloadQRCode() {
        // QRCode.js outputs either a <canvas> element or an <img> with data URL
        const canvas = qrPreview.querySelector("canvas");
        const image = qrPreview.querySelector("img");

        let downloadUrl = "";

        if (canvas) {
            // Convert HTML5 canvas to a PNG Base64 Data URL
            downloadUrl = canvas.toDataURL("image/png");
        } else if (image && image.src) {
            // Use existing image src if available
            downloadUrl = image.src;
        }

        if (!downloadUrl) {
            showError("Unable to locate generated QR code image for download.");
            return;
        }

        // Create a temporary hidden anchor tag to trigger browser download
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    /**
     * Reset the application state, clearing inputs, previews, and errors.
     */
    function clearApp() {
        // Reset input value
        textInput.value = "";

        // Reset QR preview container to initial placeholder
        qrPreview.innerHTML = defaultPlaceholderHTML;
        qrCodeInstance = null;

        // Disable download button
        downloadBtn.disabled = true;

        // Clear any error messages
        clearError();

        // Return focus to input field for convenience
        textInput.focus();
    }

    // ----------------------------------------------------------------------
    // 4. Event Listeners
    // ----------------------------------------------------------------------

    // Generate button click
    generateBtn.addEventListener("click", generateQRCode);

    // Clear button click
    clearBtn.addEventListener("click", clearApp);

    // Download button click
    downloadBtn.addEventListener("click", downloadQRCode);

    // Clear error message automatically as user types into the input field
    textInput.addEventListener("input", () => {
        if (textInput.value.trim().length > 0) {
            clearError();
        }
    });

    // Keyboard shortcut: Ctrl + Enter generates the QR code
    textInput.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            generateQRCode();
        }
    });
});
