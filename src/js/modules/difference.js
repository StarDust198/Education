export default class Difference {
    constructor (container, items) {
        this.container = document.querySelector(container);
        try {this.items = this.container.querySelectorAll(items);} catch(e){}
        this.counter = 0;
    }

    hideItems() {
        this.items.forEach((item, i) => {
            if (i !== this.items.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    bindTrigger() {
        this.items[this.items.length - 1].querySelector('.plus').addEventListener('click', () => {
            this.items[this.counter].classList.add('animated', 'fadeIn');
            this.items[this.counter].style.display = '';
            this.counter++;
            if (this.counter === this.items.length - 1) {
                this.items[this.items.length - 1].style.display = 'none';
            }
        });
    }

    init() {
        try {
            this.hideItems();        
            this.bindTrigger();
        } catch(e){}
    }
}