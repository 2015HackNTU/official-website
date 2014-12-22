var db = require('../db');
var mongoose = require('mongoose');
var BreakingNews = mongoose.model('BreakingNews');
//var BlogPosts = mongoose.model('BlogPosts');
//var Users = mongoose.model('Users')

/* Breaking News Start*/
/* Breaking News Start*/
exports.breakingnews = function(req,res){
    console.log(">>>> through news.js <<<<<");
    BreakingNews.find(function(err, news){
        if(err){
            res.render('error', {
                message: err.message,
                err: err
            });
        }   
        res.render('news',{title:'Breaking News', news: news});
    });
};
exports.breakingnews.create = function(req,res){
    console.log(">>>> through news.js hi <<<<<");
    new BreakingNews({
        title : req.body.title,
        department : req.body.department,
        content : req.body.content,
        isImportant : req.body.isImportant,
        tag : req.body.tag,
        create_at : req.body.create_at
    }).save( function(err, news, count){
        if(err){
            res.render('error', {
                message: err.message,
                err: err
            });
        }   
        console.log("Breaking News " + req.body.title + " is created.")
        res.redirect('/news');
    })
};
exports.breakingnews.isImportant = function(req,res){
    console.log(">>>> through news.js hi <<<<<");
    BreakingNews.findById(req.params.id, function(err, news){

        if (news.isImportant===true) {
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
exports.breakingnews.modify = function(req,res){
    BreakingNews.findById(req.params.id, function(err,news){
        
    })

}
exports.breakingnews.destroy = function(req,res){
    console.log(req.body.title + ' removed');
    console.log('>>>>> route through news.js fn exports.breakingnews.destroy <<<<<');
    // Delete //
    BreakingNews.findById(req.params.id, function(err, news){
        if(err){
            res.status(err.status || 500);    
            res.render('error', {
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
