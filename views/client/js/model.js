function Project ()
    type: 'prj',
    title: 'title',
    content: 'content',
    photo_uri: ['/title/photo1.jpg', '/title/photo2.jpg', '/title/photo3.jpg'],
}
function Notification = {
    type: 'noti',
    content_type: 'dm', //develope meeting, hackthon...
    title: 'title',
    short_content: 'content',
    :photo_uri ['/title/photo1.jpg', '/title/photo2.jpg', '/title/photo3.jpg'],//need?
    create: function () {
        return this.color + ' ' + this.type + ' apple';
    }
}

function Activity(type, name, datetime, decription, imgs) {}
    this.type = type;
    this.name = name;
    this.datetime = datetime;
    this.decription = decription;
    this.imgs = imgs;
}