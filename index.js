(function () {
    const out = window.em = window.emcat = {};

    let loadedCode = {};

    /**
     * Loads a commonjs module.
     *
     * @param {string} url - The location of the module
     * @return {object} The exports of the module
     *
     * @example
     *
     *     require('./module.js')
     */
    window.require = function (url) {
        const module = {
            id: 'untitled',
            exports: {},
            parent: undefined,
            filename: null,
            loaded: false,
            children: [],
            paths: []
        };
        typeof loadedCode[url] === "function" ? loadedCode[url](module, module.exports) : fetch(url)
            .then((res) => res.text())
            .then((txt) => {
                let func = Function(["module", "exports"], txt);
                loadedCode[url] = func;
                func(module, module.exports);
            });
        return module.exports;
    };

    /**
     * Loads a emcat module.
     *
     * @param {string} modName - The name of the module
     * @return {number} Error code. 0 means no error
     *
     * @example
     *
     *     use('template')
     * 
     * @example
     *
     *     use `template`
     */
    out.use = function (modName) {
        let codeLink = `https://raw.githubusercontent.com/RGFTheCoder/EMCatModules/master/emcat-module-${modName}/index.js`;
        out[modName] = win.require(codeLink);
        return 0;
    }

})