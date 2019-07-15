const userData = require('./userData.json')

let id = userData[userData.length -1].id

module.exports = {
  getAllUsers: (req, res) => {

    let data = [...userData]

    const {age, email, favorites} = req.query

    if(age){
      data = data.filter(element => {
        return element.age < age
      })
    }

    if(email){
      data = data.filter(element => {
        return element.email === email
      })
    }

    if(favorites) {
      data = data.filter(element => {
        return element.favorites.includes(favorites)
      })
    }

    res.status(200).send(data)
  },
  getUserById: (req, res) => {
    let data = [...userData]
    const {id} = req.params

    let result = data.filter(element => {
      return element.id === +id
    })

    if(result[0]){
      res.status(200).send(result[0])
    } else {
      res.status(404).send('User not found')
    }
  },
  
  getAdmins: (req, res) => {
    let data = [...userData]
    let result = data.filter(element => {
      return element.type === 'admin'
    })

    res.status(200).send(result)
  },
  
  getNonAdmins: (req, res) => {
    let data = [...userData]
    let result = data.filter(element => {
      return element.type !== 'admin'
    })

    res.status(200).send(result)
  },

  getByType: (req, res) => {
    let data = [...userData]
    const {userType} = req.params
    let result = data.filter(element => {
      return element.type === userType
    })

    res.status(200).send(result)
  },

  updateUser: (req, res) => {
    let data = [...userData]
    const {id} = req.params
    let index = data.findIndex(element => {
      return element.id === +id
    })

    let user = {...req.body}

    user.id = +id

    data.splice(index, 1, user)

    res.status(200).send(data)
  },

  addUser: (req, res) => {
    id++
    let user = {...req.body}
    user.id = id
    userData.push(user)
    res.status(200).send(userData)
  },

  deleteUser: (req, res) => {
    const {id} = req.params

    let index = userData.findIndex(element => {
      return element.id === +id
    })

    if(index !== -1){
      userData.splice(index, 1)
  
      res.status(200).send(userData)
    } else {
      res.status(404).send('User not found')
    }

  }
}