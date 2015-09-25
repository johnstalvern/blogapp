// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Post        = require('./models/post.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static(__dirname)); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost'); // connect to our database


// ROUTES FOR OUR API
// =============================================================================
// get an instance of the express Router
var router = express.Router();              


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Hooray! welcome to our API!' });   
});

// more routes for our API will happen here

// on routes that end in /Posts
// ----------------------------------------------------
router.route('/blog')

    // create a Post (accessed at POST http://localhost:8080/api/Posts)
    .post(function(req, res) {
        
        var post = new Post();      // create a new instance of the Post model
        post.title = req.body.title;
        post.body = req.body.body;  // set the Posts title and body (comes from the request)

        // save the Post and check for errors
        post.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Post created!' });
            }
        });
        
    })
    // get all the Posts (accessed at GET http://localhost:8080/api/Posts)
    .get(function(req, res) {
        Post.find(function(err, posts) {
            if (err) {
                res.send(err);
            } else {
                res.json(posts);
            }
        });
    });

// on routes that end in /Posts/:Post_id
// ----------------------------------------------------
router.route('/blog/:post_id')

    // get the Post with that id (accessed at GET http://localhost:8080/api/Posts/:Post_id)
    .get(function(req, res) {
        Post.findById(req.params.post_id, function(err, post) {
            if (err) {
                res.send(err);
            } else {
                res.json(post);
            }
        });
    })

    // update the Post with this id (accessed at PUT http://localhost:8080/api/Posts/:Post_id)
    .put(function(req, res) {

        // use our Post model to find the Post we want
        Post.findById(req.params.post_id, function(err, post) {

            if (err) {
                res.send(err);
            } else {
                post.title = req.body.title;
                post.body = req.body.body;  // update the Posts info
            }

            // save the Post
            post.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'Post updated!' });
                }
            });

        });
    })

    // delete the Post with this id (accessed at DELETE http://localhost:8080/api/Posts/:Post_id)
    .delete(function(req, res) {
        Post.remove({
            _id: req.params.post_id
        }, function(err, post) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted' });
            }
        });
    });
    
//Loads Index when request comes in at localhost:8080
    // app.get('*', function(req, res) {
    //     res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
    // });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);