import { postData } from "../services/requests";
import mask from "../services/mask";

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
    }

    checkEmailInput(input) {
        input.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^a-z0-9\.\_\@]/ig, '');
        });
    }

    checkPhoneInput() {
        mask('#phone');
    }


    bindForms() {
        this.checkPhoneInput();

        this.forms.forEach(form => {
            this.checkEmailInput(form.querySelector('input[type="email"]'));

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                form.appendChild(statusMessage);    

                let statusImg = document.createElement('img');
                statusImg.src = this.message.spinner;
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.appendChild(statusImg);

                let textMessage = document.createElement('div');
                textMessage.textContent = this.message.loading;
                statusMessage.appendChild(textMessage);   

                const formData = new FormData(form);
                const obj = {};
                formData.forEach((value, key) => obj[key] = value);
                const json = JSON.stringify(obj);

                postData('https://jsonplaceholder.typicode.com/posts', json)
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
                        }, 3000);
                    });
            });
        });
    }
}