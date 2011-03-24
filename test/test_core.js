
module('core');

test('_sanitizeString', function(){
    var san = _gas.gh._sanitizeString;
    expect(6);
    equals(san('  /tééééá íóú  '),'/teeeea_iou');
    equals(san(''),'');
    equals(san(' '),'');
    equals(san('ÇA ÄR'),'ca_ar');

    stop()
    _gas.push(function(){
        console.log('asdasd', this);
        equals(this._sanitizeString('Áéí óù '),'aei_ou', 
            'From within pushed function');
        start();
    });

    equals(san('&$*()[]/\éa', true), '_ea', 'strict mode');
});

