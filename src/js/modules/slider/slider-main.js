import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
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
            if (this.slideIndex === 3) {
                this.showByTime = this.slides[2].querySelector('.hanson');
                this.showByTime.style.display = 'none';
                this.showByTime.classList.add('animated', 'fadeInUp');
    
                setTimeout(() => this.showByTime.style.display = 'block', 3000);    
                setTimeout(() => this.showByTime.classList.remove('animated', 'fadeInUp'), 5000);
            }
        } catch(e){}
    }

    plusSlides (n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides();
            });
        });

        this.showSlides();
    }
}