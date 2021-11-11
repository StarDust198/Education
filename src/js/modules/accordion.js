export default class Accordion {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
        this.text = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ' + 
            'excepturi, eaque dolorem fugit veritatis assumenda, ut quae sed porro ' + 
            'eligendi, expedita dolores culpa magni unde delectus officiis ex hic quo!';
        this.styles = `
            padding: 5px 14px 10px 14px;
            transition: all 0.5s ease-out;
            background: rgba(109,83,175,.03);
            border: 1px solid rgba(109,83,175,.101432);
            border-radius: 15.5px;
            color: #7b6ca1;
        `;
        this.counter = [];        
    }

    bindTriggers() {
        this.triggers.forEach((btn, i) => {
            this.counter[i] = 0;
            btn.parentElement.insertAdjacentHTML('afterend', `                
                <div class="hint-text" style="${this.styles}
                    margin-top: 0;
                    max-height: 0;
                    opacity: 0;
                ">${this.text}</div>
            `);
            const hintText = btn.parentElement.nextElementSibling;

            btn.addEventListener('click', () => {
                if (!this.counter[i]) {
                    hintText.style.cssText = `${this.styles}
                        margin-top: 10px;
                        max-height: ${hintText.scrollHeight + 10 + 'px'};
                        opacity: 1;
                    `;
                    this.counter[i] = 1;
                } else {
                    hintText.style.cssText = `${this.styles}
                        margin-top: 0;
                        max-height: 0;
                        opacity: 0;
                    `;
                    this.counter[i] = 0;
                }
            });
        });
    }

    init() {
        this.bindTriggers();
    }
}