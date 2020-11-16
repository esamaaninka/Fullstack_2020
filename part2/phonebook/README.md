Phonebook front-end.
http://localhost:3000

with backend change the baseURL path in ../services/persons.js to:
- json-server        baseUrl = 'http://localhost:3001/persons' 
- phonebook-backend  baseUrl = 'http://localhost:3001/api/persons'
- Heroku             baseUrl = 'https://safe-lake-35420.herokuapp.com/api/persons/'



To use the json-server locally in the project

%npm install json-server --save-dev 
add to package.json scripts part:
"server": "json-server -p3001 --watch db.json"

and to run:
%npm run server

In browser localhost:3001/persons to see the database content-

write some predefined data to project root dir to file db.json, e.g:
{
  "persons":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    }
  ]
}