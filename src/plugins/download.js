/*!
 * GAS - Google Analytics on Steroids
 * Download Tracking plugin
 *
 * Copyright 2011, Direct Performance
 * Copyright 2011, Cardinal Path
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * $Date$
 */

/**
 * Extracts the file extension and check it against a list
 *
 * Will extract the extensions from a url and check if it matches one of
 * possible options. Used to verify if a url corresponds to a download link.
 *
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
 * @param {Array} extensions List of possible extensions for download links.
 */
function _trackDownloads(extensions) {
var gh = this;
    // Uses live tracking to make it faster.
    this._addEventListener(window, 'mousedown', function(e) {
        if (e.target && e.target.tagName === 'A') {
            var ext = _checkFile.call(gh, e.target.href, extensions);
            if (ext) {
                _gas.push(['_trackEvent',
                    'Download', ext, e.target.href
                ]);
            }
        }
    });
}

/**
 * TODO: Write doc
 *
 * @param {string|Array} extensions additional file extensions to track as
 * downloads.
 */
window._gas.push(['_addHook', '_trackDownload', function(extensions) {
    var ext = 'xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip';
    ext += ',rar,7z,exe,wma,mov,avi,wmv,mp3';
    ext = ext.split(',');
    if (typeof extensions === 'string') {
        ext = ext.concat(extensions.split(','));
    }else if (this.isArray(extensions)) {
        ext = ext.concat(extensions);
    }
    _trackDownloads.call(this, ext);
    return false;
}]);

