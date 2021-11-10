export default class Forms {
    constructor (forms) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Loading...',
            success: 'Success! Thank you!',
            failure: 'Something went wrong..',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
        this.path = 'assets/question.php';
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data            
        });
    
        return await res.text();
    }

    checkEmailInput(input) {
        input.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^a-z 0-9\.\_\@]/ig, '');
        });
    }

    checkPhoneInput() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',                
                i = 0,                                        
                def = matrix.replace(/\D/g, ''),                
                val = this.value.replace(/\D/g, '');           
    
            if (def.length >= val.length) {                    
                val = def;                                      
            }
    
            this.value = matrix.replace(/./g, function(a) {                                                            
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('#phone');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    init() {
        this.checkPhoneInput();

        this.forms.forEach(form => {
            this.checkEmailInput(form.querySelector('input[type="email"]'));

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                form.appendChild(statusMessage);

                let statusImg = document.createElement('img');
                statusImg.src = this.message.spinner;
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.appendChild(statusImg);

                let textMessage = document.createElement('div');
                textMessage.textContent = this.message.loading;
                statusMessage.appendChild(textMessage);   

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusImg.setAttribute('src', this.message.ok);
                        textMessage.textContent = this.message.success;
                    })
                    .catch((e) => {
                        console.error(e);
                        statusImg.setAttribute('src', this.message.fail);
                        textMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        form.reset();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
        });
    }
}