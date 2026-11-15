# Minimalist QR Code Generator

A lightweight, single-page web application built with pure HTML5, CSS3, and vanilla JavaScript. The application enables users to input URLs or plain text, dynamically generates an interactive QR code preview using QRCode.js via CDN, and allows exporting the result as a PNG image file.

Hosted on **GitHub Pages**: [https://hitsgit0707.github.io/SL-Glob/](https://hitsgit0707.github.io/SL-Glob/)

---

## 🎯 Project Objectives

1. **Practical Scripting Experience**: Demonstrate fundamental frontend web technologies (HTML, CSS, and vanilla JavaScript) without reliance on complex frameworks or build pipelines.
2. **Interactive DOM Manipulation**: Showcase clean event-driven programming, real-time DOM updates, dynamic state management, and user input validation.
3. **Third-Party Library Integration**: Integrate an external JavaScript library (`QRCode.js`) via a CDN and handle canvas-to-image exports.
4. **Responsive UI/UX**: Provide an accessible, mobile-friendly interface adhering to modern design principles.
5. **Seamless Deployment**: Deploy the single-page application directly via GitHub Pages using the root directory.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic elements (`<main>`, `<header>`, `<section>`, `<textarea>`, `<button>`).
- **CSS3**: Custom design utilizing CSS Flexbox, CSS Grid, media queries for responsiveness, and pseudo-classes (`:focus`, `:disabled`, `:hover`).
- **Vanilla JavaScript (ES6+)**: DOM element selection, event listeners, input validation, canvas data extraction, and asynchronous-friendly workflow.
- **QRCode.js (v1.0.0)**: Client-side QR code generation library served via Cloudflare CDN.

---

## ✨ Features

- **Dual Input Support**: Accepts both standard web URLs (e.g., GitHub links, Google Forms) and arbitrary multiline plain text.
- **Instant Client-Side QR Generation**: Generates high-correction (Level H) QR codes instantly in the browser.
- **Safe Replacement**: Subsequent generations cleanly overwrite previous codes without UI clutter or duplicate canvas stacking.
- **Direct PNG Image Download**: Exports the rendered QR code as a standard `.png` image file.
- **State Management & Validation**:
  - The "Download PNG" button is automatically disabled when no QR code is active.
  - Submitting empty or whitespace-only inputs displays an accessible inline warning and highlights the input box.
  - Typing in the input box immediately clears any active error indication.
- **Complete Reset (Clear)**: The "Clear" button resets input fields, restores preview placeholders, and disables actions.
- **Responsive Layout**: Designed for both desktop displays and mobile screens (tested down to 375px viewports).
- **Keyboard Shortcut**: Press `Ctrl + Enter` (or `Cmd + Enter`) inside the text area to quickly generate the QR code.

---

## 📁 Project Folder Structure

```
SL-Glob/
├── index.html       # Application markup and structure (GitHub Pages entry point)
├── style.css        # Responsive styling and design system
├── script.js        # Core JavaScript logic and event handlers
├── .gitignore       # Git ignore rules
├── README.md        # Main repository and deployment documentation
└── qr-code-generator/
    └── README.md    # Lab project notes and module documentation
```

---

## 🌐 GitHub Pages Deployment

The application is deployed to GitHub Pages using the standard root publishing configuration:
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch: `main` and folder: `/ (root)`.
4. Click **Save**.
5. The live site will be accessible at: `https://hitsgit0707.github.io/SL-Glob/`

---

## 🚀 Instructions to Run the Project Locally

Since the project uses only client-side web technologies and a CDN-hosted library, no installation (`npm install`), compilers, or backend servers are required.

### Method 1: Direct File Opening
1. Clone the repository:
   ```bash
   git clone https://github.com/hitsgit0707/SL-Glob.git
   ```
2. Double-click `index.html` in the root folder to open it in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Method 2: Local Static Server (Optional)
Run a local static server using Python:
```bash
cd SL-Glob
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

---

## 🔍 How QRCode.js is Used

The project includes `QRCode.js` via the CDNJS network in `index.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

When the user clicks **Generate QR Code**, the JavaScript handler initializes the library:
```javascript
new QRCode(qrPreviewElement, {
    text: trimmedInputText,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});
```
- **Target Container (`qrPreviewElement`)**: The DOM `<div>` where the library injects the output elements.
- **Output Structure**: QRCode.js creates an HTML5 `<canvas>` element (and fallback `<img>` element) representing the matrix modules.
- **Error Correction (`QRCode.CorrectLevel.H`)**: Uses High (30%) Reed-Solomon error correction, ensuring high scan reliability even if partially obscured.

---

## 💡 JavaScript Concepts Demonstrated

1. **DOM Selection & Traversal**: Using `document.getElementById()`, `querySelector()`, and `querySelectorAll()` for element access.
2. **Event Listeners**: Handling `click`, `input`, `keydown`, and `DOMContentLoaded` lifecycle events cleanly without inline HTML event attributes.
3. **Form Validation & Conditionals**: String trimming, empty input detection, and conditional UI updates (e.g., toggling `.visible` and `.input-error` classes).
4. **HTML5 Canvas to Image Export**: Using `canvas.toDataURL("image/png")` to convert raw pixel data into a Base64-encoded Data URI for image download.
5. **Dynamic Link Creation**: Programmatically generating and dispatching a click event on an in-memory `<a>` element with a `download` attribute to trigger browser file downloads.
6. **State Synchronization**: Enabling/disabling buttons (`disabled = true/false`) and managing container contents (`innerHTML = ""`) based on application state.
