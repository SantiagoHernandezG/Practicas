// Node.js server with express. Recieves POST request with json format
// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const rp = require('request-promise');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const person = req.body;
    console.log(person);
    /*
    ===================STATUS CODE RESPONSES=========================
    ||  status code: 201 y el json que devuelve el post en caso de  ||
    ||               que se haya ingresado exitosamente             ||
	||  status code 400 si el formato del json es inválido          ||
    ||  status code 500 por cualquier otro error no previsto        ||
    =================================================================
    */


    // Validating RFC, not null, number and not more than 10 digits.
    if ((typeof person.dni === 'undefined' || isNaN(parseInt(person.dni)) || (''+person.dni).length > 10)){
        return res.sendStatus(400)
    }
    //Validate Nombre, might be null, only string. 
    if(typeof person.nombre !== 'string' || !isNaN(parseInt(person.nombre))){
        return res.sendStatus(400);
    }
    if (person.nombre.length === 0){
        person.nombre = undefined;
    }

    //Validating Apellido, not null, string.
    if(typeof person.apellido !=='string' || !isNaN(parseInt(person.apellido)) || person.apellido.length===0){
        return res.sendStatus(400);
    }

  // Don't recieve more than the specified keys
    const validKeys = ['apellido', 'dni', 'nombre'];
    const invalidKeys = Object.keys(person).filter(
        (k) => !validKeys.includes(k),
    );
    if (invalidKeys.length > 0) {
        return res.sendStatus(400);
    }
  // POST to given URL
    try {
        const response = await requestPromise('https://reclutamiento-14cf7.firebaseio.com/personas.json',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: person,
            json: true,
        },);
         // Responding correct status 
        res.status(201).send(response);
    } catch (error) {
        // Any unexpected error
        res.status(500).send(error); 
    }
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});