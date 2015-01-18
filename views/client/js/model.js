var Project = {
    type: 'prj',
    title: 'title',
    content: 'content',
    photo_uri: ['/title/photo1.jpg', '/title/photo2.jpg', '/title/photo3.jpg'],
    create: function () {
        return this.color + ' ' + this.type + ' apple';
    }
}
var Notification = {
    type: 'noti',
    content_type: 'dm', //develope meeting, hackthon...
    title: 'title',
    short_content: 'content',
    :photo_uri ['/title/photo1.jpg', '/title/photo2.jpg', '/title/photo3.jpg'],//need?
    create: function () {
        return this.color + ' ' + this.type + ' apple';
    }
}
var Activity = {
    type: "act",
    color: "red",
    getInfo: function () {
        return this.color + ' ' + this.type + ' apple';
    }
}