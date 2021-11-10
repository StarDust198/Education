import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns, prev, next) {
        super(btns, prev, next);
    }

    showSlides(n = this.slideIndex) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        for (let slide of this.slides) {
            slide.style.display = 'none';
        }

        this.slides[this.slideIndex-1].style.display = 'block';

        try {          
            if (this.slideIndex === 3 && ! this.counter) {
                let showByTime = this.slides[2].querySelector('.hanson');
                showByTime.style.display = 'none';
                showByTime.classList.add('animated', 'fadeInUp');
    
                setTimeout(() => showByTime.style.display = 'block', 3000);    
                setTimeout(() => showByTime.classList.remove('animated', 'fadeInUp'), 5000);

                this.counter++;
            }
        } catch(e){}
    }

    plusSlides(n = 1) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => this.plusSlides());

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides();
            });
        });

        this.next.forEach(btn => btn.addEventListener('click', () => this.plusSlides()));
        this.prev.forEach(btn => btn.addEventListener('click', () => this.plusSlides(-1)));
    }

    render() {
        if (this.container) {
            this.bindTriggers();
            this.showSlides();
        }
    }
}