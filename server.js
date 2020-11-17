const jsonServer = require('json-server');
const auth = require('json-server-auth')
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3002;

const rules = auth.rewriter({
    // Permission rules
    vrscans: 640,
    materials: 640,
    colors: 640,
    tags: 640,

    industries: 640,
    manufacturers: 640,

    favorites: 660,
})

server.db = router.db;

server.use(middlewares);
server.use(rules)
server.use(auth);
server.use(router);

server.listen(port, "0.0.0.0", function () {
    console.log("Listening on Port 3000");
});