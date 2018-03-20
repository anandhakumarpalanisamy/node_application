
// Http Request Variables

var http = require('http');
var REST_API_HOST_NAME = "139.162.230.113";
var REST_API_PATH = "/ent";
var REST_API_PORT = 8888;


// Get message from command line

var message;
if (process.argv.length > 2 ) {
	message = process.argv[2];
}
else { 
	// No input was given -> so process a default input message.
	message = "I was born in Springfield and grew up in Boston.";
}


// POST Request Data

var post_data = JSON.stringify({
    text: message,
    model: "en"
});


// Http Request Header Informations

var headers = {
    'text': 'application/json',
    'Content-Length': post_data.length
};


// Http Request Options

var options = {
    host: REST_API_HOST_NAME,
    path: REST_API_PATH,
    port: REST_API_PORT,
    method: 'POST',
    headers: headers
};


// function to tag a given message with entities identified using the Named Entity Recognition REST API
// param message as string [input message]
// param response as list of dictionaries [json response]
// returns array containing tag_count and tagged_message

function tag_message_with_entities(message,response) {
	
	// to hold the tag count
	var count = 0;

	// helper variables to do the tagging part
	var replace_pattern;
	var replaced_message;
	var split_message;
	var tagged_message = '';
	var regx_split_pattern = "</span>" + '(.+)';
	var split_condition = new RegExp(regx_split_pattern);


	for(var i in response) {
		replace_pattern = '<mark data-entity="'+response[i].type+'">'+response[i].text+'</span>';
		replaced_message =  message.replace(response[i].text, replace_pattern);
		split_message = replaced_message.split(split_condition);
		tagged_message = tagged_message + split_message[0] + '</span>';
		message = split_message[1];
		count = count + 1;
	}

	tagged_message = tagged_message + message;
	return [count,tagged_message];

}

// Http Request Callback function (Response handler)

var response_handler = function(response) {

	// to receive messaged
	var str = '';

	// to convert string response to JSON format for parsing
	var json_response;


	// Handle http error
	response.on('error', function(err) {
		console.log(err);
	});

	// Receive the response
	response.on('data', function(response_data) {
		str = str + response_data; 
	});


	// Entire response has been received
	// Tag the message with the identified entities
	response.on('end', function() {
		//console.log(str);
		json_response = JSON.parse(str);
		//console.log(json_response);
		tagged_message = tag_message_with_entities(message,json_response);
		if (process.argv.length <= 2) {
			console.log('\nNo Input was given - Showing output for a default input message = "',message,'"')
        		console.log('\nRun as :\n--------\n\tnode task2.js "YOUR TEXT HERE"\nOutput :\n--------')
		}
		console.log("Total tags identified = ",tagged_message[0]);
		console.log(tagged_message[1]);
	});


};



// Make http request
var post_request = http.request(options, response_handler);


// Handle request Error
post_request.on('error', function(err) {
    console.log("error : ",err);
});



// Post the data
post_request.write(post_data);
post_request.end();

