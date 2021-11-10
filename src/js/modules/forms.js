import { postData } from "../services/requests";
import mask from "../services/mask";

export default class Forms {
    constructor (forms) {
        this.forms = document.querySelectorAll(forms);
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

                const formData = new FormData(form);
                const obj = {};
                formData.forEach((value, key) => obj[key] = value);
                const json = JSON.stringify(obj);

                postData('https://jsonplaceholder.typicode.com/posts', json)
                    .then(res => console.log(res))
                    .catch((e) => console.error(e));
            });
        });
    }
}