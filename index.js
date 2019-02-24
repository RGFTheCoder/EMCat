(function () {
    const out = window.em = window.emcat = {};
    const win = window;

    let loadedCode = {};

    win.require = function (url) {
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

    out.use = function(modName) {
        
    }

})