var db = require('../config/db');
var mongoose = require('mongoose');
var BreakingNews = mongoose.model('BreakingNews');
//var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users')

/* Breaking News Start*/
/* Breaking News Start*/
exports.breakingnews = function(req,res){
    console.log(">>>> through news.js <<<<<");
    BreakingNews.find(function(err, news){
        if(err){
            res.status(err.status || 500);
            res.render('client/error', {
                message: err.message,
                err: err
            });
        }   
        //res.render('news',{title:'Breaking News', news: news});
        res.send(news.toString("utf8"))
        //res.setEncoding('utf8');
        //res.json(news.toString("UTF-8"))
    });
};
exports.breakingnews.newPosts =function(req,res){
    res.render('admin/newNews',{
        user : req.user
    })
}
exports.breakingnews.create = function(req,res){
    console.log(">>>> through news.js hi <<<<<");
    new BreakingNews({
        user_id : req.body.user_id,
        title : req.body.title,
        department : req.body.department,
        author : req.body.author,
        content : req.body.content,
        isImportant : true,
        tag : req.body.tag,
        create_at : req.body.create_at
    })
    .save( function(err, news, count){
        if(err){
            res.status(err.status || 500);
            res.render('client/error', {
                message: err.message,
                err: err
            });
        }   
        console.log("Breaking News " + req.body.title + " is created.")
        res.redirect('/profile');
    })
};
exports.breakingnews.edit = function(req,res){
    BreakingNews.findById(req.params.id,function(err,news){
        console.log("GET:"+req.news)
        res.render('admin/editNews',{
            news : news,
            user : req.user
        })
    })
}
exports.breakingnews.editUpdate = function(req,res){
    console.log('update'+req.body.user_id)
    BreakingNews.findById(req.params.id, function(err, news){
        Users.findById(req.body.user_id, function(err, user){
            if(err)
                res.redirect('error',{ message : err.message, err:{} })
            // Update //
            news.user_id = req.body.user_id;
            news.title = req.body.title;
            news.department = req.body.department;
            news.author = user.local.name;
            news.content = req.body.content;
            news.tag = req.body.tag;
            // Update //

            news.save(function(err, news, count){
                if(err)
                    res.render('client/error',{message:err.message, err:{}})
                res.redirect('/profile');
            })
        })
    })
}
exports.breakingnews.isImportant = function(req,res){
    console.log(">>>> through news.js hi <<<<<");
    BreakingNews.findById(req.params.id, function(err, news){

        if (news.isImportant === true) {
            console.log(news.isImportant)
            news.isImportant = false;
        }
        else
            news.isImportant = true;
        news.save(function(err, news, count){
            res.redirect('/news');
        });

    })
}

exports.breakingnews.destroy = function(req,res){
    console.log(req.body.title + ' removed');
    console.log('>>>>> route through news.js fn exports.breakingnews.destroy <<<<<');
    // Delete //
    BreakingNews.findById(req.params.id, function(err, news){
        if(err){
            res.status(err.status || 500);    
            res.render('client/error', {
                message: err.message,
                error: {}
            });
        }   
        news.remove( function(err, news){
            res.redirect('/news');
        });
    });
};
/* Breaking News End*/
