const reqlib = require('app-root-path').require;
const fs = require('fs');
const path = require('path');
const appPath = require('app-root-path');
const defaultPath = appPath.path + '';
const cjson = require('cjson');

const folder = 'C:\\workspace\\themes';
let themes = [
    {
        label: 'Abyss',
        uiTheme: 'vs-dark',
        path: './themes/abyss-color-theme.json',
        folder: 'D:\\themes/theme-abyss',
        file: 'D:\\themes\\theme-abyss\\themes\\abyss-color-theme.json'
    },
    {
        id: 'Default Dark+',
        label: 'Dark+ (default dark)',
        uiTheme: 'vs-dark',
        path: './themes/dark_plus.json',
        folder: 'C:\\workspace\\themes\\theme-defaults',
        file: 'C:\\workspace\\themes\\theme-defaults\\themes\\dark_plus.json'
    },
    {
        id: 'Default Light+',
        label: 'Light+ (default light)',
        uiTheme: 'vs',
        path: './themes/light_plus.json',
        folder: 'C:\\Users\\22148\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions/theme-defaults',
        file: 'C:\\Users\\22148\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\theme-defaults\\themes\\light_plus.json'
    },
    {
        id: 'Visual Studio Dark',
        label: 'Dark (Visual Studio)',
        uiTheme: 'vs-dark',
        path: './themes/dark_vs.json',
        folder: 'D:\\themes/theme-defaults',
        file: 'D:\\themes\\theme-defaults\\themes\\dark_vs.json'
    }, {
        id: 'Visual Studio Light',
        label: 'Light (Visual Studio)',
        uiTheme: 'vs',
        path: './themes/light_vs.json',
        folder: 'D:\\themes/theme-defaults',
        file: 'D:\\themes\\theme-defaults\\themes\\light_vs.json'
    },
    {
        id: 'Default High Contrast',
        label: 'High Contrast',
        uiTheme: 'hc-black',
        path: './themes/hc_black.json',
        folder: 'D:\\themes/theme-defaults',
        file: 'D:\\themes\\theme-defaults\\themes\\hc_black.json'
    },
    {
        label: 'Kimbie Dark',
        uiTheme: 'vs-dark',
        path: './themes/kimbie-dark-color-theme.json',
        folder: 'D:\\themes/theme-kimbie-dark',
        file:
            'D:\\themes\\theme-kimbie-dark\\themes\\kimbie-dark-color-theme.json'
    },
    {
        label: 'Monokai',
        uiTheme: 'vs-dark',
        path: './themes/monokai-color-theme.json',
        folder: 'D:\\themes/theme-monokai',
        file:
            'D:\\themes\\theme-monokai\\themes\\monokai-color-theme.json'
    },
    {
        label: 'Monokai Dimmed',
        uiTheme: 'vs-dark',
        path: './themes/dimmed-monokai-color-theme.json',
        folder: 'D:\\themes/theme-monokai-dimmed',
        file:
            'D:\\themes\\theme-monokai-dimmed\\themes\\dimmed-monokai-color-theme.json'
    },
    {
        label: 'Quiet Light',
        uiTheme: 'vs',
        path: './themes/quietlight-color-theme.json',
        folder: 'D:\\themes/theme-quietlight',
        file:
            'D:\\themes\\theme-quietlight\\themes\\quietlight-color-theme.json'
    },
    {
        label: 'Red',
        uiTheme: 'vs-dark',
        path: './themes/Red-color-theme.json',
        folder: 'D:\\themes/theme-red',
        file: 'D:\\themes\\theme-red\\themes\\Red-color-theme.json'
    },
    {
        label: 'Solarized Dark',
        uiTheme: 'vs-dark',
        path: './themes/solarized-dark-color-theme.json',
        folder: 'D:\\themes/theme-solarized-dark',
        file:
            'D:\\themes\\theme-solarized-dark\\themes\\solarized-dark-color-theme.json'
    },
    {
        label: 'Solarized Light',
        uiTheme: 'vs',
        path: './themes/solarized-light-color-theme.json',
        folder: 'D:\\themes/theme-solarized-light',
        file:
            'D:\\themes\\theme-solarized-light\\themes\\solarized-light-color-theme.json'
    },
    {
        label: 'Tomorrow Night Blue',
        uiTheme: 'vs-dark',
        path: './themes/tomorrow-night-blue-theme.json',
        folder: 'D:\\themes/theme-tomorrow-night-blue',
        file:
            'D:\\themes\\theme-tomorrow-night-blue\\themes\\tomorrow-night-blue-theme.json'
    }];

class Theme {

    getTheme() {
        const v = themes[1];
        return this.readData(v);
    }

    getAll(dir) {
        const files = fs.readdirSync(dir), that = this;
        let flag = false;
        files.some(f => {
            if (f == 'package.json') {
                flag = true;
                return flag;
            }
        });
        if (!flag) {
            //listing all files using forEach
            files.some(function (file) {
                const folderStatus = fs.statSync(dir + '/' + file).isDirectory();
                if (folderStatus) {
                    that.getAll(dir + '/' + file);
                }
            });
        } else {
            const c = require(dir + '/package.json')['contributes'];
            if (c === undefined) return;
            const list = c['themes'];
            if (list instanceof Array) {
                appPath.setPath(dir);
                list.forEach(l => {
                    l.folder = dir;
                    l.file = appPath.resolve(l.path);
                });
                themes = themes.concat(list);
            }
        }
    }

    readData({ file, uiTheme }) {
        const d = cjson.load(file, true);
        const paths = [file];
        if (d['include']) {
            this.readInclude(d, file, paths);
        }
        paths.push(uiTheme == 'vs-dark' ? defaultPath + '/ui/theme/night.json' : defaultPath + '/ui/theme/light.json');
        const data = cjson.load(paths.reverse(), true);
        data.theme = uiTheme;
        return data;
    }

    readInclude(d, file, paths) {
        if (d['include']) {
            const onlyPath = path.dirname(file);
            appPath.setPath(onlyPath);
            const f = appPath.resolve(d['include']);
            const c = cjson.load(f, true);
            paths.push(f);
            this.readInclude(c, f, paths);
        }
    }
}

module.exports = new Theme();
