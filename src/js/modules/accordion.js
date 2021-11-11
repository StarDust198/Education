export default class Accordion {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
        this.styles = `
            display: block;
            padding-right: 14px;
            padding-left: 14px;
            transition: all 0.5s ease-out;
            background: rgba(109,83,175,.03);
            border: 1px solid rgba(109,83,175,.1);
            border-radius: 15.5px;
            color: #7b6ca1;
        `;
        this.counter = [];        
    }

    init() {
        this.btns.forEach((btn, i) => {
            this.counter[i] = 0;
            const hintText = btn.parentElement.nextElementSibling;
            hintText.style.cssText = `
                ${this.styles}                
                margin-top: 0;
                max-height: 0;
                opacity: 0;
            `;

            btn.addEventListener('click', () => {
                if (!this.counter[i]) {
                    hintText.style.cssText = `
                        ${this.styles}
                        padding-top: 5px;
                        padding-bottom: 5px;
                        margin-top: 10px;
                        max-height: ${hintText.scrollHeight + 15 + 'px'};
                        opacity: 1;
                    `;
                    this.counter[i] = 1;
                } else {
                    hintText.style.cssText = `
                        ${this.styles}
                        margin-top: 0;
                        max-height: 0;
                        opacity: 0;
                    `;
                    this.counter[i] = 0;
                }
            });
        });
    }
}