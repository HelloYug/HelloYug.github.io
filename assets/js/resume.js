// Initialize download and view links with timestamp
const timestamp = new Date().getTime();

document.getElementById('download-link-header').href = `YugAgarwal.pdf?v=${timestamp}`;
document.getElementById('view-link-header').href = `YugAgarwal.pdf?v=${timestamp}`;

document.getElementById('download-link-footer').href = `YugAgarwal.pdf?v=${timestamp}`;
document.getElementById('view-link-footer').href = `YugAgarwal.pdf?v=${timestamp}`;

// Handle back button clicks
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        // Try to close the tab/window
        const closed = window.close();

        // If close didn't work (returns undefined or false), navigate back
        if (closed === false || closed === undefined) {
            // Try using history back if available
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Otherwise navigate to index
                window.location.href = 'index.html';
            }
        }
    });
});

// PDF viewer functionality
document.addEventListener('DOMContentLoaded', function () {
    // Configuration
    const config = {
        pdfUrl: 'YugAgarwal.pdf?v=' + new Date().getTime(),
        scale: 4, // Quality of preview images
        maxWidth: 800 // Maximum width for preview images
    };

    // DOM Elements
    const pdfGrid = document.getElementById('pdf-grid');
    const pdfModal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    const closeModal = document.getElementById('close-modal');

    // Initialize PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Load PDF and generate previews
    pdfjsLib.getDocument(config.pdfUrl).promise.then(pdf => {
        pdfGrid.innerHTML = ''; // Clear loading message

        // Create an array to store our page promises
        const pagePromises = [];

        // First create all page containers in order
        for (let i = 1; i <= pdf.numPages; i++) {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'pdf-page';
            pageDiv.dataset.page = i;
            pdfGrid.appendChild(pageDiv);

            // Store the promise for rendering this page
            pagePromises.push(
                createPagePreview(pdf, i)
                    .then(img => {
                        pageDiv.appendChild(img);
                        pageDiv.addEventListener('click', () => {
                            openModal(i);
                        });
                    })
            );
        }

        // Wait for all pages to render
        return Promise.all(pagePromises);
    }).catch(error => {
        console.error('Error loading PDF:', error);
        pdfGrid.innerHTML = '<p style="text-align:center;color:red;padding:20px;">Error loading PDF previews. Please download the full resume.</p>';
    });

    // Create a preview image for a single page
    async function createPagePreview(pdf, pageNumber) {
        try {
            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale: config.scale });

            // Create canvas for rendering
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Render the page to canvas
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            // Convert canvas to image
            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/jpeg', 0.8);
            img.alt = `Resume Page ${pageNumber}`;

            return img;
        } catch (error) {
            console.error(`Error rendering page ${pageNumber}:`, error);
            const errorImg = document.createElement('div');
            errorImg.textContent = `Page ${pageNumber} preview unavailable`;
            return errorImg;
        }
    }

    // Open modal with specific page
    function openModal(pageNum) {
        pdfViewer.src = `${config.pdfUrl}#page=${pageNum}&toolbar=0&navpanes=0&scrollbar=0`;
        pdfModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModalFunc() {
        pdfModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    closeModal.addEventListener('click', closeModalFunc);

    // Close modal when clicking outside
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closeModalFunc();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.style.display === 'flex') {
            closeModalFunc();
        }
    });
});
