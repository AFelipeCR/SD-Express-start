const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const contacts=[
	{name:"Andrés", surname:'Chaparro'}
];

//create
app.post('/contacts/insert', (req, res) => {
	let con = req.body;
	contacts.push(con)
	res.send("Agregado: " + con.name + " " + con.surname)
})

//read
app.get('/contacts/:contactId', (req, res) => {
	let con = contacts[req.params.contactId]
	if(con)
		res.send("Nombre: " + con.name + "<br>Apellido: " + con.surname)
	else
		res.send("No existe")
})

//update
app.put('/contacts/update/:contactId', (req, res) => {
	let con = contacts[req.params.contactId]
	if(con){
		con = contacts[req.params.contactId] = req.body
		res.send("Nombre: " + con.name + "<br>Apellido: " + con.surname)
	}else
		res.send("No existe")
})

//delete
app.delete('/contacts/remove/:contactId', (req, res) => {
	let con = contacts[req.params.contactId]
	contacts.splice(req.params.contactId,1)
	res.send("Eliminado: " + req.params.contactId)
})

app.get('/contacts', (req, res) => {
	res.send(contacts)
})

app.get('/', (req, res) => {
	res.send('Bienvenido<br><a href="contacts">Ver contactos</a>')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
