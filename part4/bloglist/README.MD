Local server running on port 3001 by default, see .env

localhost:3001/ returns json list of blogs
-------------------------------------------------------------------------------------

.env:
#Port the server to listen to
PORT=3009
#MongoDB path 
MONGODB_URI="mongodb+srv://esa-fullstack:XXXXXXXX@cluster0-fhhrm.mongodb.net/bloglist-app?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true"
TEST_MONGODB_URI="mongodb+srv://esa-fullstack:XXXXXXX@cluster0-fhhrm.mongodb.net/bloglist-app-test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true"
-------------------------------------------------------------------------------------
UTIL mongo.js
command line tool to work with database

-------------------------------------------------------------------------------------