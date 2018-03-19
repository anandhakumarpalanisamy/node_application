# node_application
This Node application does the following:
  - Takes a text as input (e.g. “I was born in Springfield and grew up in Boston”).
  - Makes a POST request to a "Named Entity Recognition API"  available at 139.162.230.113:8888.
  - Returns or prints the input text with the identified entities tagged 
  - (e.g. ‘I was born in <mark data-entity=”gpe”>Springfield</span> and grew up in <mark data-entity=”gpe”>Boston</span>.’)


Run as :
--------
	node task2.js "YOUR TEXT HERE"
