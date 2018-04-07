/*global path, define*/
define([
    'path',
    'fs'
], function (path, fs) {

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  return {
    cfgPath: getCfgPath(),
	cfgFilePath: path.join(getCfgPath(), 'config.json'),
	cacheFilePath: path.join(getCfgPath(), 'cache.json'),
    auth: {},
    options: {}
  };

    function getCfgPath () {
	/**
	 * if windows then check if .jira/ present in home folder then use that, else use AppData folder
	 *
	 */
	var systemHomePath = process.env[(process.platform == 'win32') ? (fs.existsSync(path.join(process.env['HOMEPATH'], '/.jira/')) ? 'HOMEPATH' : 'AppData') : 'HOME'];
	return path.join(systemHomePath, '/.jira/');
  }
});
