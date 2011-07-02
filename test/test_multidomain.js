
module('multidomain');

test('_setMultiDomain now', function() {
    //This test should run on domain www.example.com
    expect(4);

    $('body').append('<div id="testlinks1"></div>');
    $('#testlinks1').append('<a href="http://www.example.com/path">test1</a>');
    $('#testlinks1').append('<a href="http://www.example2.com/path">test2</a>');
    $('#testlinks1').append('<a href="http://www.nexample.com/path">test3</a>');
    $('#testlinks1').append('<a href="http://subd.example.com/path">test4</a>');
    stop();

    _gas.push(['_setAccount', 'UA-XXXXX-X']);
    _gas.push(['_setDomainName', 'example.com']);
    _gas.push(['_setDomainName', 'example2.com']);
    _gas.push(['_trackPageview']);
    _gas.push(['_setMultiDomain', 'now']);

    _gas.push(function() {
        $('#testlinks1 a').each(function(i, v) {
            switch (i) {
                case 0:
                    equal(v.href, 'http://www.example.com/path');
                    break;
                case 1:
              var pat = 'path\\?__utma=.*__utmb=.*__utmc=.*__utmz=.*__utmv=.*';
                    pat = new RegExp(pat);
                    ok(pat.test(v.href), v.href);
                    break;
                case 2:
                    equal(v.href, 'http://www.nexample.com/path');
                    break;
                case 3:
                    equal(v.href, 'http://subd.example.com/path');
                    break;
            }
        });
    });

    _gas.push(function() {start();});

    _gas.push(function() {
        console.log($('#testlinks1').html());
        $('#testlinks1').remove();
    });
});

test('Don\'t Tag subdomain', function() {
    //This test should run on domain www.example.com
    expect(2);

    $('body').append('<div id="testlinks2"></div>');
    $('#testlinks2').append('<a href="http://www.example.com/path">test1</a>');
    $('#testlinks2').append('<a href="http://subd.example.com/path">test4</a>');
    stop();

    _gas.push(['_setAccount', 'UA-XXXXX-X']);
    _gas.push(['_setDomainName', 'www.example.com']);
    _gas.push(['_trackPageview']);
    _gas.push(['_setMultiDomain', 'now']);

    _gas.push(function() {
        $('#testlinks2 a').each(function(i, v) {
            switch (i) {
                case 0:
                    equal(v.href, 'http://www.example.com/path');
                    break;
                case 1:
                    equal(v.href, 'http://subd.example.com/path');
                    break;
            }
        });
    });

    _gas.push(function() {start();});

    _gas.push(function() {
        $('#testlinks2').remove();
    });
});

test('Tag subdomain', function() {
    //This test should run on domain www.example.com
    expect(2);

    $('body').append('<div id="testlinks3"></div>');
    $('#testlinks3').append('<a href="http://www.example.com/path">test1</a>');
    $('#testlinks3').append('<a href="http://subd.example.com/path">test4</a>');
    stop();

    _gas.push(['_setAccount', 'UA-XXXXX-X']);
    _gas.push(['_setDomainName', 'www.example.com']);
    _gas.push(['_setDomainName', 'subd.example.com']);
    _gas.push(['_trackPageview']);
    _gas.push(['_setMultiDomain', 'now']);

    _gas.push(function() {
        $('#testlinks3 a').each(function(i, v) {
            switch (i) {
                case 0:
                    equal(v.href, 'http://www.example.com/path');
                    break;
                case 1:
             var pat = 'path\\?__utma=.*__utmb=.*__utmc=.*__utmz=.*__utmv=.*';
                    pat = new RegExp(pat);
                    ok(pat.test(v.href), v.href);
                    break;
            }
        });
    });



    _gas.push(function() {start();});

    _gas.push(function() {
        $('#testlinks3').remove();
    });
});

test('_setMultiDomain click', function() {
    //This test should run on domain www.example.com
    expect(3);

    $('body').append('<div id="testlinks4"></div>');
    $('#testlinks4').append('<a href="http://www.example.com/path">test1</a>');
    $('#testlinks4').append('<a href="http://www.example2.com/path">test2</a>');
    stop();

    _gas.push(['_setAccount', 'UA-XXXXX-X']);
    _gas.push(['_setDomainName', 'example.com']);
    _gas.push(['_setDomainName', 'example2.com']);
    _gas.push(['_trackPageview']);
    _gas.push(['_setMultiDomain', 'click']);

    _gas.push(['_addHook', '_link', function(url, hash) {
        ok(true, '_link url:' + url + ' opt_anchor:' + hash);
        return false;
    }]);

    $('#testlinks4 a').click(function(e) {return false;});
    $('#testlinks4 a').each(function() {
        try {
            this.click();
        }catch (e) {
            ok(false, 'This Browser don\'t support click via js');
        }
    });
    _gas.push(function() {
        $('#testlinks4 a').each(function(i, v) {
            switch (i) {
                case 0:
                    equal(v.href, 'http://www.example.com/path', 'after');
                    break;
                case 1:
                    equal(v.href, 'http://www.example2.com/path', 'after');
                    break;
            }
        });
    });

    _gas.push(function() {start();});

    _gas.push(function() {
        _gas.push(['_popHook', '_link']);
        console.log($('#testlinks4').html());
        $('#testlinks4').remove();
    });
});


