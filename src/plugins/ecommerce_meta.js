/**
 * GAS - Google Analytics on Steroids
 *
 * Ecommerce Meta
 *
 * Copyright 2012, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

function _gasMetaEcommerce() {
    var i, meta,
        f_trans = 0,
        f_item = 0,
        metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].name === 'ga_trans') {
            // Fire transaction
            meta = metas[i].content.split('^');
            if (meta.length < 3) {
                // 3 is the minimum for transaction
                break;
            }
            // Add default values for remaining params
            while (meta.length < 8) {
                meta.push('');
            }
            _gas.push(['_addTrans',
                    meta[0],
                    meta[1],
                    meta[2],
                    meta[3],
                    meta[4],
                    meta[5],
                    meta[6],
                    meta[7]
                    ]);
            f_trans++;
        }
        else if (metas[i].name === 'ga_item') {
            // Fire item
            meta = metas[i].content.split('^');
            if (meta.length === 6) {
                _gas.push(['_addItem',
                        meta[0],
                        meta[1],
                        meta[2],
                        meta[3],
                        meta[4],
                        meta[5]
                        ]);
                f_item++;
            }
        }
    }
    if (f_trans > 0 && f_item > 0) {
        _gas.push(['_trackTrans']);
        //_gas.push(['_clearTrans']);
    }
}

_gas.push(['_addHook', '_gasMetaEcommerce', _gasMetaEcommerce]);

