import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor ( container, next, prev, activeClass, animate, autoplay ) {
        super( container, next, prev, activeClass, animate, autoplay );
    }

    decorateSlides() {
        for (let slide of this.slides) {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        }

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        this.container.appendChild(this.slides[0]);
        if (this.next.parentElement === this.container &&           // btns in sliderlist fix
                this.next.parentElement === this.container) {
            this.container.appendChild(this.prev);
            this.container.appendChild(this.next);
            console.log(this.container);
        }
        this.decorateSlides();
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {            
            // let active = this.slides[this.slides.length - 1];
            let active = this.next.parentElement === this.container ?   // btns in sliderlist fix
                this.slides[this.slides.length - 3] :
                this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);

            this.decorateSlides();
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorateSlides();

        let autoplayTimer ='';
        if (this.autoplay) {
            autoplayTimer = setInterval(() => this.nextSlide(), 5000);

            this.container.addEventListener('mouseenter', () => {
                clearInterval(autoplayTimer);
            });

            this.container.addEventListener('mouseleave', () => {
                autoplayTimer = setInterval(() => this.nextSlide(), 5000);
            });
        }
    }
}