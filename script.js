document.addEventListener('DOMContentLoaded', (event) => {
    const items = document.querySelectorAll('#parent .image');
    let dragSrcEl = null;

    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.id);
        this.style.opacity = '0.4';
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter() {
        this.classList.add('over');
    }

    function handleDragLeave() {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        const srcId = e.dataTransfer.getData('text/plain');
        const dragSrcEl = document.getElementById(srcId);

        if (dragSrcEl !== this) {
            // Swap the inner HTML
            const tempHTML = dragSrcEl.innerHTML;
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = tempHTML;

            // Swap the background images
            const tempBackground = window.getComputedStyle(this).backgroundImage;
            this.style.backgroundImage = window.getComputedStyle(dragSrcEl).backgroundImage;
            dragSrcEl.style.backgroundImage = tempBackground;

            // Swap the ids
            const tempId = dragSrcEl.id;
            dragSrcEl.id = this.id;
            this.id = tempId;
        }
        return false;
    }

    function handleDragEnd() {
        this.style.opacity = '1';
        items.forEach(item => item.classList.remove('over'));
    }

    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
});
