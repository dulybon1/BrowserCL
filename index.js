var fs = require('fs');
var exphbs = require('express-handlebars');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var iCommands = require("./custom-modules/internal-commands");
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
			message = iCommands.makeDir(argments[1]);
		}
	}
	if (name == "ls") 
	{
		// not finished here unsafe
		//makeDir('appDir');
		message = iCommands.listFiles();
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


