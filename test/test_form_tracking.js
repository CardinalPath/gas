
module('form_tracking');

test('Test Fields (Won\'t pass)', function() {
    // I don't expect this test to pass
    expect(7);

    $('body').append('<form method="post" id="testform"></form>');
    $('#testform').append('<input type="text" name="Name" />');
    $('#testform').append('<input type="password" name="Password" />');
    $('#testform').append('<input type="checkbox" name="CB" value="1"/>');
    $('#testform').append('<input type="checkbox" name="CB" value="2"/>');
    $('#testform').append('<input type="radio" name="RA" value="1"/>');
    $('#testform').append('<input type="radio" name="RA" value="2"/>');
    $('#testform').append('<textarea name="Description"></textarea>');
    $('#testform').append('<select id="SL" name="SL" ></select>');
    $('#SL').append('<option value="opt1">opt1</option>');
    $('#SL').append('<option value="opt2">opt2</option>');
    $('#testform').append('<input type="reset" name="RST" value="RST"/>');
    $('#testform').append('<input type="button" name="BT" value="Button"/>');
    $('#testform').append('<input type="image" name="IM" value="Image"/>');
    $('#testform').append(
        '<input type="submit" name="SBMT" value="Continue Tests"/>');

    stop();

    _gas._accounts = {};
    _gas._accounts_length = 0;
    _gas.push(['_setAccount', 'UA-XXXXX-X']);
    _gas.push(['_trackPageview']);
    _gas.push(['_gasTrackForms', true]);


    _gas.push(['_addHook', '_trackEvent', function(cat, act, lab) {
        equals('Form Tracking', cat, act + lab);
        console.log(cat, act, lab);
        return false;
    }]);

    function fake_submit() {
        start();
        _gas.push(['_popHook', '_trackEvent']);
        _gas._accounts = {};
        _gas._accounts_length = 0;
        $('#testform').remove();
    }
    $('#testform').submit(function() {
        fake_submit();
        return false;
    });

});

