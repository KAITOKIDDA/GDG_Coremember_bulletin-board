// server.js
const jsonServer = require('C:/Users/user/AppData/Roaming/npm/node_modules/json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'build',  // React build 폴더를 정적 파일로 제공하려면 추가
  cors: true        // CORS 허용 설정
});
const cors = require('cors');
server.use(cors());  // 모든 도메인에서의 요청을 허용


server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST' && (!req.body.title || !req.body.content)) {
    res.status(400).jsonp({
      error: "Title and content are required."
    });
  } else {
    next();
  }
});

server.use('/api', router);
server.listen(4000, () => {
  console.log('JSON Server is running on http://localhost:4000/api');
});
