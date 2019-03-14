# @converse/headless example

This is a quick and dirty example of how you can use @converse/headless.

While working on this example I've made changes to @converse/headless that are
not yet released. You'll therefore need a source checkout of converse.js
available.

    git clone git@github.com:conversejs/converse.js.git
    cd converse.js/src/headless
    npm link

Now that you've created a link for @converse/headless, you can link it in
your checkout of this repo:

    git clone git@github.com:conversejs/headless-example.git
	cd headless-example
	npm link @converse/headless

You can run `make watchjs` to build the distribution file.

Then run `make serve` and open https://localhost:7080 in your browser.
