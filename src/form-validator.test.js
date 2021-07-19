const { initFormValidator } = require('./form-validator');

describe('Form Validator', () => {
    test('it initialises', () => {
        document.body.innerHTML = `
        <form>
        <button type="submit">submit</button>
        </form>
        `
        expect(() => initFormValidator()).not.toThrow();
    });

    test('it adds the event listener', () => {
        document.body.innerHTML = `
        <form action="/example">
        <button type="submit">submit</button>
        </form>
        `
        initFormValidator();

        document.querySelector('button[type="submit"]').click()
    });

    test('it adds the event listener', () => {
        document.body.innerHTML = `
        <form action="/example">
        <button type="submit">submit</button>
        </form>
        `
        initFormValidator();

        document.querySelector('button[type="submit"]').click()
    });
});