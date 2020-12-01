const path = require('path');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3002;

const rules = auth.rewriter({
    // Permission rules
    vrscans: 664,
    materials: 664,
    colors: 664,
    tags: 664,

    industries: 664,
    manufacturers: 664,

    favorites: 664,
    index: 664
})

server.db = router.db;

server.use(middlewares);
server.use(rules)
server.use(auth);

server.get('/index', (req, res) => {
    const { userId, vrscansLimit } = req.query;

    const data = {
        'materials': server.db.get('materials'),
        'colors': server.db.get('colors'),
        'tags': server.db.get('tags')
    };

    if (vrscansLimit) {
        data.vrscans = server.db.get('vrscans').slice(0, vrscansLimit);
    }

    if (userId) {
        data.favorites = server.db.get('favorites').filter(fav => fav.userId === parseInt(userId));
    }

    res.jsonp(data);
})

server.use(router);

server.listen(port, "0.0.0.0", function () {
    console.log("Listening on Port 3002");
});
