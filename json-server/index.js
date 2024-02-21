const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const {subDays, format} = require('date-fns');
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 500)
  });
  next();
})

server.use(async (req, res, next) => {
  
  let {dayRepeating, repeatWords,} = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'repeat.json'), 'UTF-8'));
  const {words} = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

  if(dayRepeating !== format(new Date(), 'dd.MM.yyyy')){
    dayRepeating = format(new Date(), 'dd.MM.yyyy');

    if(words[words.length - 1].date === dayRepeating){
      repeatWords = [...words[words.length - 2].words]
    }else{
      repeatWords = [...words[words.length - 1].words]
    };

    fs.writeFileSync(path.resolve(__dirname, 'repeat.json'), JSON.stringify({
      dayRepeating,
      repeatWords,
    }, null, 2), 'utf-8');

  }

  next();
})



server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  try {
        const { login, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
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


server.get('/words', (req, res) => {
  try {
      
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { words = [] } = db;

        const response = words.flatMap(elem => elem.words);

        if (response) {
            return res.json(response);
        }

        return res.status(404).json({ message: 'Words not found' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
})


server.get('/words/:word', (req, res) => {

  const findWords = (all_words, searchValue, index = 0) => {
    if (index < all_words.length) {
      const findWord = (words, wordIndex = 0) => {
        if (wordIndex < words.length) {
          if (words[wordIndex].en === searchValue) {
            return words[wordIndex];
          }
          return findWord(words, wordIndex + 1);
        }
      }
  
      const result = findWord(all_words[index].words);
      if (result !== undefined) {
        return result;
      }
  
      return findWords(all_words, searchValue, index + 1);
    }
  }
  
  
  try {
      const {word} = req.params;
      const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
      const { words = [] } = db;

      const response = findWords(words, word, 0);
      
      if(response){
        return res.status(200).json(response);
      }

      return res.status(404).json({ message: 'Word not found' });

    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
})


server.post('/word', (req, res) => {

  const getDate = () => {
    return format(new Date(), 'dd.MM.yyyy')
  }

  try {
    
    let word = req.body;

    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const db_repeat = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'repeat.json'), 'UTF-8'));

    const { words = [] } = db;
    const { repeatWords = [] } = db_repeat;

    const lastWords = words[words.length - 1];

    let correctWord = {
      ...word,
      ua: word.ua.map(elem => elem.trim().toLowerCase())
    }
    
    if(lastWords.date === getDate()){
      lastWords.words.push(correctWord);
    }else{
      words.push({
        date: getDate(),
        words: [correctWord]
      })
    };

    repeatWords.push(correctWord)

    fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 2), 'utf-8');
    fs.writeFileSync(path.resolve(__dirname, 'repeat.json'), JSON.stringify(db_repeat, null, 2), 'utf-8');


    return res.json({statusCode: 200, message: 'success'});

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
})

server.post('/repeatWord', (req, res) => {
  try {
    const db_repeat = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'repeat.json'), 'UTF-8'));

    const {repeatWords} = db_repeat;
    const word = req.body;

    repeatWords.push(word);


    fs.writeFileSync(path.resolve(__dirname, 'repeat.json'), JSON.stringify(db_repeat, null, 2), 'utf-8');
    return res.json({statusCode: 200, message: 'success'});

} catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
}
})

server.get('/repeat', (req, res) => {
  try {
      
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'repeat.json'), 'UTF-8'));
    const { repeatWords = [] } = db;

    const response = [...repeatWords];

    if (response) {
        return res.json(response);
    }

    return res.status(404).json({ message: 'Words not found' });
} catch (e) {
    return res.status(500).json({ message: e.message });
}
})


server.post('/repeatWords', (req, res) => {
  try {      
    let {repeatWords} = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'repeat.json'), 'UTF-8'));
    repeatWords = [...req.body];
    dayRepeating = format(new Date(), 'dd.MM.yyyy');


    fs.writeFileSync(path.resolve(__dirname, 'repeat.json'), JSON.stringify({
      dayRepeating,
      repeatWords,
    }, null, 2), 'utf-8');

    
    return res.status(200).json({message: 'success'})
} catch (e) {
    return res.status(500).json({ message: e.message });
}
})





server.use(router);

server.listen(8000, () => {
  console.log('Server is running on 8000 port');
})