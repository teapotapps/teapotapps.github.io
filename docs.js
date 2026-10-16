/**
 * TeapotApps Documentation Utilities
 * Universal Code Copy & Interactive Helpers
 */

function initCodeCopy() {
    document.querySelectorAll('pre').forEach(pre => {
        // Prevent duplicate copy buttons
        if (pre.querySelector('.copy-code-btn')) return;

        // Ensure parent has relative positioning for absolute placement
        pre.style.position = 'relative';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-code-btn';
        btn.setAttribute('aria-label', 'Copy code snippet to clipboard');
        btn.innerHTML = '<i class="ri-file-copy-line"></i> <span>Copy</span>';

        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const codeEl = pre.querySelector('code');
            const rawText = codeEl ? codeEl.innerText : pre.innerText;
            const cleanText = rawText.trim();

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(cleanText);
                } else {
                    const textarea = document.createElement('textarea');
                    textarea.value = cleanText;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                }

                btn.classList.add('copied');
                btn.innerHTML = '<i class="ri-check-line"></i> <span>Copied!</span>';

                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="ri-file-copy-line"></i> <span>Copy</span>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code snippet: ', err);
                btn.innerHTML = '<i class="ri-close-line"></i> <span>Failed</span>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="ri-file-copy-line"></i> <span>Copy</span>';
                }, 2000);
            }
        });

        pre.appendChild(btn);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopy);
} else {
    initCodeCopy();
}
