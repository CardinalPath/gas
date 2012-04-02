/**
 * GAS - Google Analytics on Steroids
 *
 * Download Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Extracts the file extension and check it against a list
 *
 * Will extract the extensions from a url and check if it matches one of
 * possible options. Used to verify if a url corresponds to a download link.
 *
 * @this {GasHelper} GA Helper object.
 * @param {string} src The url to check.
 * @param {Array} extensions an Array with strings containing the possible
 * extensions.
 * @return {boolean|string} the file extension or false.
 */
function _checkFile(src, extensions) {
    if (typeof src !== 'string') {
        return false;
    }
    var ext = src.split('?')[0];
    ext = ext.split('.');
    ext = ext[ext.length - 1];
    if (ext && this.inArray(extensions, ext)) {
        return ext;
    }
    return false;
}

/**
 * Register the event to listen to downloads
 *
 * @this {GasHelper} GA Helper object.
 * @param {Array|object} opts List of possible extensions for download
 * links.
 */
function _trackDownloads(opts) {
    var gh = this;
    gh._liveEvent('a', 'mousedown', function(e) {
        var el = this;
        if (el.href) {
            var ext = _checkFile.call(gh,
                el.href, opts['extensions']
            );
            if (ext) {
                _gas.push(['_trackEvent',
                    opts['category'], ext, el.href
                ]);
            }
        }
    });
}

/**
 * GAA Hook, receive the extensions to extend default extensions. And trigger
 * the binding of the events.
 *
 * @param {string|Array|object} opts GAs Options. Also backward compatible
 * with array or string of extensions.
 */
_gas.push(['_addHook', '_trackDownloads', function(opts) {
    if (!this._downloadTracked) {
        this._downloadTracked = true;
    }else {
        //Oops double tracking detected.
        return;
    }
    if (!opts) {
        opts = {'extensions': []};
    } else if (typeof opts === 'string') {
        // support legacy opts as String of extensions
        opts = {'extensions': opts.split(',')};
    } else if (opts.length >= 1) {
        // support legacy opts Array of extensions
        opts = {'extensions': opts};
    }
    opts['category'] = opts['category'] || 'Download';

    var ext = 'xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip';
    ext += ',rar,7z,exe,wma,mov,avi,wmv,mp3,csv,tsv';
    ext = ext.split(',');
    opts['extensions'] = opts['extensions'].concat(ext);

    _trackDownloads.call(this, opts);
    return false;
}]);

