// ================== HAMBURGER MENU ==================
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleButton || !navMenu) return;

  toggleButton.addEventListener('click', () => {
    const isVisible = navMenu.classList.toggle('nav-menu_visible');
    toggleButton.setAttribute('aria-expanded', isVisible);
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('nav-menu_visible')) {
        navMenu.classList.remove('nav-menu_visible');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

// ================== UPLOAD SECTION ==================
/**
 * Toggles visibility of upload sections with id 'uploadSection'.
 * Requires password "27056".
 */
function toggleUploadSections() {
  const uploadSections = document.querySelectorAll('#uploadSection');
  if (uploadSections.length === 0) return;

  const enteredPassword = prompt("Enter upload password:");
  if (enteredPassword !== "27056") {
    alert("Incorrect password.");
    return;
  }

  uploadSections.forEach(section => {
    section.style.display = section.style.display === "flex" ? "none" : "flex";
  });
}

/**
 * Handles preview of uploaded images/videos.
 * Can be attached to each page's upload button.
 */
function handleUpload() {
  const gallery = document.getElementById("mediaGallery");
  const imageFile = document.getElementById("uploadImage")?.files[0];
  const videoFile = document.getElementById("uploadVideo")?.files[0];

  if (!imageFile && !videoFile) {
    alert("Please select an image or video file to upload.");
    return;
  }

  if (imageFile) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(imageFile);
    img.alt = imageFile.name;

    const caption = document.createElement("p");
    caption.textContent = imageFile.name;

    const container = document.createElement("div");
    container.className = "gallery-item";
    container.appendChild(img);
    container.appendChild(caption);

    gallery.appendChild(container);
  }

  if (videoFile) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(videoFile);
    video.controls = true;

    const caption = document.createElement("p");
    caption.textContent = videoFile.name;

    const container = document.createElement("div");
    container.className = "gallery-item";
    container.appendChild(video);
    container.appendChild(caption);

    gallery.appendChild(container);
  }

  if (document.getElementById("uploadImage")) document.getElementById("uploadImage").value = "";
  if (document.getElementById("uploadVideo")) document.getElementById("uploadVideo").value = "";
}

// ================== KEY & CONTEXT MENU BLOCKING ==================
function blockRestrictedKeys(e) {
  if (e.key === "F11") {
    e.preventDefault();
    alert("Fullscreen mode is disabled.");
  }

  const isCtrlShiftI = e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i");
  const isCmdShiftI = e.metaKey && e.shiftKey && (e.key === "I" || e.key === "i");
  if (e.key === "F12" || isCtrlShiftI || isCmdShiftI) {
    e.preventDefault();
    alert("Developer tools are disabled.");
  }
}

function disableContextMenu(e) {
  e.preventDefault();
}

// ================== GLOBAL LISTENERS ==================
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "5") {
    e.preventDefault();
    toggleUploadSections();
  }

  blockRestrictedKeys(e);
});

document.addEventListener("contextmenu", disableContextMenu);