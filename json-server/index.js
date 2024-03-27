const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

const DB_PROFILE = 'profile';

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 500)
  });
  next();
})


server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  try {
        const { login, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.json'), 'UTF-8'));

        const { users = [] } = db;
        
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

server.get('/profile', (_, res) => {
  try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'profile.json'), 'UTF-8'));
        const { profile } = db;

        if (profile) {
            return res.json(profile);
        }

        return res.status(403).json({ message: 'Something went wrong' });
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


server.put('/profile', (req, res) => {
  try{
    let data = req.body;
 
    writeDb(DB_PROFILE, {profile: {...data}});

    return res.status(200).json({message: 'Profile was updated'});
  }catch (e){
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});



server.use(router);

server.listen(8000, () => {
  console.log('Server is running on 8000 port');
})

// ----------------------------------------------------------------------- //

function getDb(name){
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, `${name}.json`), 'UTF-8'));
}

function writeDb(target, body){
  return fs.writeFileSync(path.resolve(__dirname, `${target}.json`), JSON.stringify(body, null, 2), 'utf-8');
}

// ----------------------------------------------------------------------- //

function isInArray(elem, array){
  return array.find(({en}) => en === elem.en);
}

// ----------------------------------------------------------------------- //

function selectRandomWords(count, words){
  const result = new Set();

  while (result.size <= count && result.size <= count){
    let rdm = Math.floor(Math.random() * words.length);
    result.add(words[rdm].en);
  }

  return [...result].map(word => words.find(w => w.en === word));
}