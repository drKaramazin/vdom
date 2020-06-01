'use strict';

(function() {

    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    function prepareCount(count) {
        if (!count) {
            throw new Error('Пожалуйста, введите число');
        }
        const result = Number(count);
        if (count < 1) {
            throw new Error('Введите число больше 0');
        }

        return result;
    }

    function prepareVDOM(count) {
        const vdom = {
            tagName: 'ol',
            children: [],
        };

        for (let i = 0; i < count; i++) {
            vdom.children.push({
                tagName: 'li',
                children: [
                    {
                        tagName: 'span',
                        innerText: randomInteger(0, 8).toString(),
                    }
                ],
            });
        }

        return vdom;
    }

    function renderVDOMElement(vdomElement) {
        const element = document.createElement(vdomElement.tagName);
        if (vdomElement.innerText) {
            element.innerText = vdomElement.innerText;
        }
        if (vdomElement.children && vdomElement.children.length && vdomElement.children.length > 0) {
            for (const child of vdomElement.children) {
                element.appendChild(renderVDOMElement(child));
            }
        }
        return element;
    }

    function renderVDOM(containerElement, vdom) {
        containerElement.innerHTML = '';
        containerElement.appendChild(renderVDOMElement(vdom));
    }

    window.submitForm = (event) => {
        event.preventDefault();
        const userCount = event.target.querySelector('#user-count').value;
        const resultElement = document.getElementById('result');
        try {
            const vdom = prepareVDOM(prepareCount(userCount));
            renderVDOM(resultElement, vdom);
            document.getElementById('error-message').innerText = '';
        } catch (e) {
            console.error(e);
            document.getElementById('error-message').innerText = e.message;
        }
    }

})();
