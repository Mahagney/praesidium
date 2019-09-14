run the app debug mode:
     > SET DEBUG=praesidium:* & npm run devstart
	 
	 
run the app in normal mode(no logs):
	 > npm start
	 
initialize db:
insert db data in knexfile.js development
run following:
    knex migrate:latest
    knex seed:run


Usefull links
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf?fbclid=IwAR0bvInUwReXCytjV7ko_fZ-kRZtIau4jbfw5xy4zCSkTwvnTEhiVnfMCW8#di