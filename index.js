var fs = require('fs');
var exphbs = require('express-handlebars');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

function makeInitialDir()
{
	const dir = 'appDir';
	if (!fs.existsSync(dir)) 
	{
		fs.mkdirSync(dir);
		return 'Initial appDir created';
	}
	{
		return 'Initial appDir already exist';
	}
}

//create directory function
function makeDir(name)
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
function listFiles()
{
	var files = fs.readdirSync("appDir");
	var msg = files.join("\n");

	console.log(msg);

	return msg;
}

function listFilesIn(dir)
{
	if (fs.existsSync('appDir/' + dir)) {
		process.chdir()
	}
}



//set the view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {

  res.render('linewindow');
});

app.post('/command', function(req, res){

	var message = "";
	var name = req.body.name;
	var argments = req.body.args;

	if (name == "mkdir")
	{
		if (argments.length > 2) {
			message = "Too many arguments provided!"
		}
		else if(argments.length < 2)
		{
			message = "Too few arguments provided!"
		}
		else
		{
			message = makeDir(argments[1]);
		}
	}
	if (name == "ls") 
	{
		// not finished here unsafe
		//makeDir('appDir');
		message = listFiles();
	}

	console.log(argments);
	res.send(message);
});

var port = process.env.PORT || 3000;

app.listen(port, function()
	{
		makeInitialDir();
		console.log('listening on port:' + port);
	});


