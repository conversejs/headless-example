import '@converse/headless';

window.converse.plugins.add('headless-example', {

    initialize: function () {
        const { _converse } = this;
        const log = _converse.log;
        const body = document.querySelector('body');
        const login_form = document.querySelector('form.login');
        const logout_form = document.querySelector('form.logout');
        const output_el = document.querySelector('.output');

        login_form.addEventListener('submit', ev => {
            ev.preventDefault();
            const form_data = new FormData(ev.target);
            login_form.style.display = 'none';
            logout_form.style.display = 'block';

            _converse.api.user.login({
                jid: form_data.get('jid'),
                password: form_data.get('password'),
            });
        });

        logout_form.addEventListener('submit', ev => {
            ev.preventDefault();
            login_form.style.display = 'block';
            logout_form.style.display = 'none';
            _converse.api.user.logout();
        });

        _converse.api.listen.on('disconnected', () => {
            output_el.innerHTML = '';
        });

        _converse.api.listen.on('connectionInitialized', () => {
            const xmlInput = _converse.connection.xmlInput;
            const xmlOutput = _converse.connection.xmlOutput;

            _converse.connection.xmlInput = function (body) {
                const el = document.createElement('pre');
                el.textContent = body.outerHTML;
                output_el.insertAdjacentElement('beforeend', el);
                xmlInput.apply(this, arguments);
            };
            _converse.connection.xmlOutput = function (body) {
                const el = document.createElement('pre');
                el.textContent = body.outerHTML;
                output_el.insertAdjacentElement('beforeend', el);
                xmlOutput.apply(this, arguments);
            };
        });
    }
});

window.converse.initialize({
    bosh_service_url: 'https://conversejs.org/http-bind/', // Please use this connection manager only for testing purposes
    authentication: 'login',
    whitelisted_plugins: ['headless-example'],
    debug: true
});
