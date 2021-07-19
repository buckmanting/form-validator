import errorKeys from './error-keys.json';

class FormValidator {
    private _form: HTMLFormElement;
    private _submitButton: HTMLButtonElement;

    constructor(form: HTMLFormElement) {
        console.log(form);
        this._form = form;

        const formsSubmitButton: HTMLButtonElement | null = this._form.querySelector('button[type="submit"]');
        if (formsSubmitButton) {
            this._submitButton = formsSubmitButton;
        } else {
            throw new Error('Cannot find a submit button. The form must contain an button of type SUBMIT.');
        }

        this._submitButton.addEventListener('click', this.checkForm);
    }

    private checkForm = (event: Event) => {
        if (this._form.checkValidity()) {
            return true;
        }

        // we want to stop submission in its tracks a this point.
        // we don't want the client to send the request or to do any validation of its own.
        event.preventDefault();

        this.checkInputs();
        this.checkSelects();
    }

    private checkInputs = () => {
        const inputs = Array.from(this._form.querySelectorAll('input'));

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checkValidity()) {
                continue;
            }

            this.addInputErrors(inputs[i]);
        }
    };

    private addInputErrors = (element: HTMLInputElement) => {
        let errors: string[] = [];

        const validity = element.validity;
        for (var key in validity) {
            // @ts-ignore
            if (!validity[key]) {
                // @ts-ignore
                let error = element.getAttribute(errorKeys[key]);
                if (!error) {
                    // @ts-ignore
                    console.error(`missing error attribute "${errorKeys[key]}" on ... COMPLETE THIS BIT`);
                } else {
                    errors.push(error.toString());
                }
            }
        }

        // if (!element.validity.badInput) {
        //     let error = element.getAttribute(errorKeys.badInput);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.badInput}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        // if (!element.validity.customError) {
        //     let error = element.getAttribute(errorKeys.customError);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.customError}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        // if (!element.validity.patternMismatch) {
        //     let error = element.getAttribute(errorKeys.pattern);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.pattern}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        // if (!element.validity.rangeOverflow) {
        //     let error = element.getAttribute(errorKeys.max);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.pattern}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        // if (!element.validity.rangeUnderflow) {
        //     let error = element.getAttribute(errorKeys.min);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.min}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        // if (!element.validity.stepMismatch) {
        //     let error = element.getAttribute(errorKeys.step);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.step}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        // if (!element.validity.tooLong) {
        //     let error = element.getAttribute(errorKeys.maxlength);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.maxlength}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        // if (!element.validity.tooShort) {
        //     let error = element.getAttribute(errorKeys.minlength);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.minlength}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        // if (!element.validity.valueMissing) {
        //     let error = element.getAttribute(errorKeys.required);
        //     if (!error) {
        //         console.error(`missing error attribute "${errorKeys.required}" on ... COMPLETE THIS BIT`);
        //     } else {
        //         errors.push(error.toString());
        //     }
        // }
        if (!element.validity.typeMismatch) {
            const expectedType = element.getAttribute('type');
            if (expectedType) {
                // todo get TS to play nice with accessing obj keys with a string
                // element.getAttribute(errorKeys.type[expectedType]);
            } else {
                // todo make this work much nicer
                throw new Error(`no type found on ${element}`)
            }
        }

        const builtErrorList = this.buildErrorList(errors);

        element.insertAdjacentElement('afterend', builtErrorList);
    };

    private checkSelects = () => {
        const selects = Array.from(this._form.querySelectorAll('select'));

        for (let i = 0; i < selects.length; i++) {
            if (selects[i].checkValidity()) {
                continue;
            }

            this.addSelectErrors(selects[i]);
        }
    };

    private addSelectErrors = (element: HTMLSelectElement) => {
        if (!element.validity.badInput) {

        }
        if (!element.validity.customError) {

        }
        if (!element.validity.patternMismatch) {

        }
        if (!element.validity.rangeOverflow) {

        }
        if (!element.validity.rangeUnderflow) {

        }
        if (!element.validity.stepMismatch) {

        }
        if (!element.validity.tooLong) {

        }
        if (!element.validity.tooShort) {

        }
        if (!element.validity.typeMismatch) {

        }
        if (!element.validity.valueMissing) {

        }
    };

    private buildErrorList(errors: string[]): HTMLUListElement {
        let list = document.createElement('ul');
        list.className = 'c-error-list__error-list';

        for (let i = 0; i < errors.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = errors[i];
            listItem.className = 'c-error-list__error-text';

            list.appendChild(listItem);
        }

        return list;
    }
}

const initFormValidator = () => {
    document.querySelectorAll('form').forEach(element => new FormValidator(element));
};

module.exports = { initFormValidator };