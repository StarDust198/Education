const mask = (selector) => {
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
        let matrix = '+1 (___) ___-____',                  // создание шаблона
            i = 0,                                          // создание итератора
            def = matrix.replace(/\D/g, ''),                // выделение цифр из матрицы, значение поля ввода по ум.
            val = this.value.replace(/\D/g, '');            // выделение цифр из поля ввода

        if (def.length >= val.length) {                     // если длина цифр матрицы больше длины цифр поля ввода
            val = def;                                      // то заменить на значение по умолчанию
        }

        this.value = matrix.replace(/./g, function(a) {     // приравниваем значение поля воода к шаблону, тестируя
                                                            // каждый символ шаблона:
            // return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            
            if (/[_\d]/.test(a) && i < val.length) {       // если подчеркивание или цифры -
                if (val.charAt(0) != '1' && val.charAt(1) == '1') {
                    val = val.slice(1);
                } else if (val.charAt(0) != '1' && val.charAt(1) != '1' && i == 0) {
                    i++;
                    return '1';
                }
                let b = val.charAt(i);                     // узнаём символ в цифрах поля ввода под номером итератора,
                i++;                                       // затем итератор увеличивается и                 
                return b;                                  // возвращаем узнанное значение
            } else if (i >= val.length) {                  // если итератор больше или равен длине цифр поля ввода
                return '';                                 // возвращаем пустоту
            } else {                                       // во всех других случаях
                return a;                                  // возвращаем тестируемый символ
            }
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;