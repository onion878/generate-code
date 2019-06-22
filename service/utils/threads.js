const electron = require('electron');
const os = require('os');
const path = require('app-root-path').path;

class Threads {

    constructor() {
        this.size = os.cpus().length;
        this.pools = [];
        this.cache = [];
    }

    initPool() {
        if (this.size > 4) {
            this.size = 4;
        }
        for (let i = 0; i < this.size; i++) {
            this.cache.push(true);
            const t = new electron.BrowserWindow({ show: false, title: 'Thread-' + i });
            t.loadURL(path + '/service/threads.html');
            this.pools.push(t);
        }
    }

    runCode(code) {
        const index = Math.ceil(Math.random() * this.size);
        this.cache.some((c, i) => {
            if (c) {
                this.cache[i] = false;
                index = i;
                return true;
            }
        });
        const t = this.pools[index];
        return new Promise(function (resolve, reject) {
            t.webContents.executeJavaScript(code).then(d => {
                resolve(d);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = new Threads();