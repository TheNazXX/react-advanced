const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 1000)
  });
  next();
})


server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  try {
        const { login, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        console.log(login)
        console.log(password)
        console.log('1')

        const userFromBd = users.find(
            (user) => user.login === login && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
})

// server.use((req, res, next) => {
//   if(!req.headers.authorization){
//     return res.status(403).json({message: 'AUTH ERROR'});
//   }

//   next();
// })


server.get('/words', (req, res) => {
  try {
      
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { words = [] } = db;

        const response = words.flatMap(elem => elem.words);

        if (response) {
            return res.json(response);
        }

        return res.status(403).json({ message: 'Words not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
})



server.use(router);

server.listen(8000, () => {
  console.log('Server is running on 8000 port');
})