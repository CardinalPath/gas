/**
 * GAS - Google Analytics on Steroids
 *
 * Download Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
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
 * @param {Array|object} extensions List of possible extensions for download links.
 */
function _trackDownloads(opts) {
    var gh = this;
    var links = document.getElementsByTagName('a');
    if(!opts){
        opts = {'extensions': []};
    } else if(opts.length >= 0){
        // support legacy opts as Array of extensions
        opts = {'extensions': opts};
    }
    opts['category'] = opts['category'] || 'Download';
    for (var i = 0; i < links.length; i++) {
        this._addEventListener(links[i], 'mousedown', function(e) {
            if (e.target && e.target.tagName === 'A') {
                var ext = _checkFile.call(gh, 
                    e.target.href, opts['extensions']
                );
                if (ext) {
                    _gas.push(['_trackEvent',
                        opts['category'], ext, e.target.href
                    ]);
                }
            }
        });
    }
}

/**
 * GAA Hook, receive the extensions to extend default extensions. And trigger
 * the binding of the events.
 *
 * @param {string|Array} extensions additional file extensions to track as
 * downloads.
 */
_gas.push(['_addHook', '_trackDownloads', function(extensions) {
    var ext = 'xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip';
    ext += ',rar,7z,exe,wma,mov,avi,wmv,mp3,csv,tsv';
    ext = ext.split(',');
    if (typeof extensions === 'string') {
        ext = ext.concat(extensions.split(','));
    }else if (this.isArray(extensions)) {
        ext = ext.concat(extensions);
    }
    _trackDownloads.call(this, ext);
    return false;
}]);

