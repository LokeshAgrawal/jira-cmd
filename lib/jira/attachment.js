/*global requirejs,console,define,fs*/
define([
  'commander',
  'request',
  '../../lib/config',
    '../../lib/cache',
    'fs'
], function (program, request, config, cache, fs) {

    /**
     * requires reqOpts.issue
     * requires reqOpts.path
     */
    function callAttach(reqOpts, cb){
	var formData = {
	    file: fs.createReadStream(reqOpts.path)
	}; 
	var opts = {
	    url : config.auth.url + 'rest/api/2/issue/'+reqOpts.issue+'/attachments',
	    method: 'POST',
	    json: true,
	    headers: {
		'ContentType': 'multipart/form-data',
		'Authorization': 'Basic ' + config.auth.token,
		'X-Atlassian-Token': 'nocheck'		
	    },
	    formData: formData
	};
	request(opts, function (err,res, body) {
	    if (err) {
		return cb(err);
	    }
	    if(!res || !res.statusCode==200){
		return cb(new Error('some problem uploading attachment'));
	    }
	    console.log('attached');
	    return cb(body);
	});
    }

    function attach(issue, path, cb){
	var reqOpts = {
	    issue: issue,
	    path: path
	}
        callAttach(reqOpts, cb);
    } 
    
    return  {
	callAttach: callAttach,
	attach: attach
    }
});
