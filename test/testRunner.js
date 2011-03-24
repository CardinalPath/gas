var results = {};

var TestRunner = function(id){
    this.id = id;
    this.results = [];
}

TestRunner.prototype._update_results = function(){
    var div_id = this.id;
    component_div = $(div_id);
    results_div = component_div.find('.results');
    errors_div = component_div.find('.errors');

    var count_total = 0;
    var count_success = 0;
    var r;
    for (var i in this.results){
        r = this.results[i];
        count_total += 1;
        if(r.status === 'success'){
            count_success+=1
        }else if(r.status === 'error' && r.message !== undefined){
            errors_div.append('<li>'+r.message+'</li>')
        }
    }
    results_div.find('.bar').width(400*(count_success/count_total));
    results_div.find('span').text(count_success + '/' + count_total);
}

TestRunner.prototype._processSuccess = function(statement){
    this.results.push({
        status: 'success'
    });
    this._update_results();
}

TestRunner.prototype._processException = function(statement, e){
    this.results.push({
        status: 'error',
        message: String(e.message) +': '+ String(statement)
    });
    this._update_results();
}

TestRunner.prototype.assertTrue = function(message,statement){
    if(statement){
        this._processSuccess();
    }else{
        var e = {
            message: message
        };
        this._processException(statement, e)
    }
}

