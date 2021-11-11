export default class Download {
    constructor (links, files) {
        this.links = document.querySelectorAll(links);
        this.files = files;
    }

    init() {
        this.links.forEach((link, i) => {
            link.addEventListener('click', () => {
                const anchor = document.createElement('a');
                anchor.href = Array.isArray(this.files) ? this.files[i] : this.files;
                anchor.download = 'filename.jpg';
                anchor.style.display = 'none';
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
            });
        });
    }
}