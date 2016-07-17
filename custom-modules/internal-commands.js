var fs = require('fs');
var dir = {};

//create directory function
dir.makeDir = function(name)
{
	
	var dir = 'appDir';
	if (!fs.existsSync(dir)) 
	{
		fs.mkdirSync(dir);
		process.chdir(dir);

		if (!fs.existsSync(name)) {

			fs.mkdirSync(name);
			process.chdir('..');

			return "dir " + name + " created";
		}
		else
		{
			process.chdir('..')
			return "dir " + name + " already exist";
		}	
	}
	else
	{
		process.chdir(dir);
		if (!fs.existsSync(name)) {

			fs.mkdirSync(name);
			process.chdir('..');

			return "dir " + name + " created";
		}
		else
		{
			process.chdir('..')
			return "dir " + name + " already exist";
		}
	}
}

//list files in directory
dir.listFiles = function ()
{
	var files = fs.readdirSync("appDir");
	var msg = files.join("\n");

	console.log(msg);

	return msg;
}

dir.listFilesIn = function (dir)
{
	if (fs.existsSync('appDir/' + dir)) {
		process.chdir()
		
	}
}

module.exports = dir;