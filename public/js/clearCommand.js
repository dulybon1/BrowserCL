var command = {
	name: "",
	args:[]
}

//write result to the output box



//detect when enter is pressed 
$(document).ready(function(){
    $("#command").keypress(function(e){
        var key = e.which
        //console.log(key);
        if (key == 13) {

        	//make post request with command

        	//make an array of the texts in command input
        	var commandText = $("#command").val().split(" ");

        	//get the command
        	command.name = commandText[0];

        	//get the command and arguments
        	command.args = commandText;

        	$.post("command", command, function writeToOutput(data, status)
        	{
        		var output = $("#output-text");
        		if (status) {
        			console.log(status);
        			console.log(data);
        			output.val(output.val() + data + "\n");
        		}
        	});

        	console.log(command);
        	var output = $("#output-text");
        	output.val(output.val() + '> ' + command.args.join(" ") + "\n");
        	$("#command").val("");

        }
    });
});

