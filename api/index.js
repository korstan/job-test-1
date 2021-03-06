const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const session = require('koa-session');
const passport = require('koa-passport');
const cors = require('koa-cors');

const indexRoutes = require('./src/server/routes/index');
const profilesRoutes = require('./src/server/routes/profiles');
const authRoutes = require('./src/server/routes/auth');

const app = new Koa();
const PORT = process.env.PORT || 4242;

app.use(cors());

// app.keys = ['secret-key'];
// app.use(session(app));

app.use(bodyParser());

require('./src/server/auth');
app.use(passport.initialize());
// app.use(passport.session());

app.use(indexRoutes.routes());
app.use(profilesRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
