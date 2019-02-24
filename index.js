(function () {
    const out = window.em = window.emcat = {};

    out.config = {
        MODULE: {
            DOWNLOAD: "https://cdn.jsdelivr.net/gh/RGFTheCoder/EMCatModules/emcat-module-${}/index.js",
            COMMIT: "097d40a09d14f06570b6d7b48123c0aa77154b74"
        }
    }
    // .match(/commit\/([0-9a-z]+)/)[1]

    out.config.MODULE.DOWNLOAD = "https://raw.githubusercontent.com/RGFTheCoder/EMCatModules/master/emcat-module-${}/index.js";

    let loadedCode = {};

    // (async function () {

    //     fetch("https://github.com/RGFTheCoder/EMCatModules/commits/master",{
    //         mode: "no-cors"
    //     })
    //         .then((res) => res.text())
    //         .then((txt) => {
    //             out.config.MODULE.COMMIT = txt.match(/commit\/([0-9a-z]+)/)[1];
    //         });
    // })();

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
     * @param {string} saveName - The id to save the module in. Default to modName
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
    out.use = function (modName, saveName) {
        saveName = saveName || modName;
        let codeLink = out.config.MODULE.DOWNLOAD.replace("${}", modName);
        out[saveName] = window.require(codeLink);
        return 0;
    }

})();