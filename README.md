# Node Application
This Node application does the following:
  - Takes a text as input message.
  - Makes a POST request to a "Named Entity Recognition API"  available at 139.162.230.113:8888.
  - Returns or prints the input message with the identified entities tagged 
  - Example : 
  	- Input : 
		I was born in Springfield and grew up in Boston.
	- Output : 		
		I was born in \<mark data-entity=”gpe”\>Springfield\</span\> and grew up in \<mark data-entity=”gpe”\>Boston\</span\>.


Run as :
--------
	node task2.js "YOUR TEXT HERE"
	
Sample Command:

	node task2.js "I was born in Springfield and grew up in Boston and Microsoft campus is near my house."
	
Output :

	Total tags identified =  3
	
	I was born in <mark data-entity="GPE">Springfield</span> and grew up in <mark data-entity="GPE">Boston</span> and <mark data-entity="ORG">Microsoft</span> campus is near my house.

