const express = require('express')
const app = express()
const usersCtrl = require('./usersCtrl')

app.use(express.json())


app.get('/api/user', usersCtrl.getAllUsers)
app.get('/api/user/:id', usersCtrl.getUserById)
app.get('/api/admin', usersCtrl.getAdmins)
app.get('/api/nonadmin', usersCtrl.getNonAdmins)
app.get('/api/type/:userType', usersCtrl.getByType)
app.put('/api/user/:id', usersCtrl.updateUser)
app.post('/api/user', usersCtrl.addUser)
app.delete('/api/user/:id', usersCtrl.deleteUser)

app.listen(3000, ()=>console.log('Listening on port 3000'))