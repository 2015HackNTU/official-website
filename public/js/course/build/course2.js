/**
 * Created by pilagod on 4/11/15.
 */

/*
 *  Make Sure Course Panel List can Access
 */
var guard = function(key, fn){
    return function(){
        if (guard.flags[key]) {
            return fn.apply(this, arguments);
        }
    };
};

guard.flags = {};
guard.activate = function(key){ guard.flags[key] = true };
guard.deactivate = function(key){ guard.flags[key] = false };
guard.activate('list');


/*
 *  Course Panel
 */

var CoursePanel = React.createClass({displayName: "CoursePanel",
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data.course_panel_data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleClick: function(page){
        $('#' + page).addClass('show-content');
        $('#' + page).removeClass('list');
        $('#' + page).prevAll().addClass('margin-25');

        setTimeout(function(){
            $('#' + page).siblings().addClass('hide');
            React.render(
                React.createElement(CoursePanelContent, {url: "/json/course/course.json", page: page}),
                $('#' + page + ">.color")[0]
            );
            $('#' + page).addClass('overflow-visible');
        }, 700);
        guard.deactivate('list');
    },
    onMouseOver: function(page){
        $("#" + page + ".list>.course-panel-header>img").attr('src', '/imgs/course/' + page + '_w.png');
    },
    onMouseOut: function(page){
        $("#" + page + ".list>.course-panel-header>img").attr('src', '/imgs/course/' + page + '_b.png');
    },
    render: function(){
        var coursePanelNodeClassDefault = "course-panel text-vertical-center list";
        var handleClick = this.handleClick;
        var onMouseOver = this.onMouseOver;
        var onMouseOut = this.onMouseOut;
        var coursePanelNode = this.state.data.map(function(data){
            var coursePanelNodeClass = coursePanelNodeClassDefault ;//+ (data.backgroundColorClass? " " + data.backgroundColorClass: "");
            var colorClass = "color " + data.backgroundColorClass;
            return (
                React.createElement("div", {id: data.id, className: coursePanelNodeClass, onClick: guard('list', handleClick.bind(null, data.id)), onMouseOver: onMouseOver.bind(null, data.id), onMouseOut: onMouseOut.bind(null, data.id)}, 
                    React.createElement("div", {className: colorClass}), 
                    React.createElement(CoursePanelHeader, {title: data.title}), 
                    React.createElement(CoursePanelFooter, {footer: data.footer})
                )
            );
        });
        return (
            React.createElement("div", {id: "main", className: "main", onClick: this.handleClick}, 
                coursePanelNode
            )
        );
    }
});

// Course Panel Header
var CoursePanelHeader = React.createClass({displayName: "CoursePanelHeader",
    render: function(){
        return (
            React.createElement("div", {className: "course-panel-header"}, 
                React.createElement("img", {src: this.props.title})
            )
        );
    }
});

// Course Panel Footer
var CoursePanelFooter = React.createClass({displayName: "CoursePanelFooter",
    render: function(){
        return (
            React.createElement("div", {className: "course-panel-footer"}, 
                React.createElement("img", {src: this.props.footer})
            )
        );
    }
});


/*
 *  Course Panel Content (Introduction, Syllabus, Lecturers)
 */

var CoursePanelContent = React.createClass({displayName: "CoursePanelContent",
    getInitialState: function() {
        return {
            data: [],
            leftHover: false,
            rightHover: false
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                this.setState({data: data.course_content_data[this.props.page]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    closeOnClick: function(){
        var page = this.props.page;
        var $this =  $(this.getDOMNode());

        // Show Other Panel
        $('#' + page).siblings().removeClass('hide');

        // Remove Show From Bottom
        $this.removeClass($this.attr('class').split(' ')[1]);
        setTimeout(function(){
            $this.addClass('hide-to-bottom');
        }, 10);

        setTimeout(function(){
            $('#' + page).removeClass('show-content');
            $('#' + page).removeClass('overflow-visible');
            $('#' + page).prevAll().removeClass('margin-25');
            $('#' + page + '>.color').html('');
            setTimeout(function(){
                $('#' + page).addClass('list');
                $('#' + page + ':not(:hover)>.course-panel-header>img').attr('src', '/imgs/course/' + page + '_b.png');
                guard.activate('list');
            }, 350);
        }, 1000);

    },
    arrowOnClick: function(pageObject, direction, page){
        var $this =  $(this.getDOMNode());

        // Show Target Panel
        pageObject.removeClass('hide');

        // Hide Content and Show Next Panel
        if(direction == "right"){
            setTimeout(function(){
                $this.addClass('hide-to-left');
                $('#' + page).addClass('margin-25');
            }, 10);
        }
        if(direction == "left"){
            setTimeout(function(){
                $this.addClass('hide-to-right');
                pageObject.removeClass('margin-25');
            }, 10);
        }

        setTimeout(function(){
            // Remove Content Class 'Show From Bottom'
            $this.removeClass($this.attr('class').split(' ')[1]);

            setTimeout(function(){
                // Hide Current Page
                $('#' + page).removeClass('show-content');
                $('#' + page).removeClass('overflow-visible');
                setTimeout(function(){
                    $('#' + page).addClass('list');
                    $('#' + page).addClass('hide');
                    $('#' + page + '>.color').html('');
                    $('#' + page + ':not(:hover)>.course-panel-header>img').attr('src', '/imgs/course/' + page + '_b.png');
                }, 400);

                // Show Other Page
                pageObject.removeClass('list');
                pageObject.addClass('show-content');
                setTimeout(function(){
                    React.render(
                        React.createElement(CoursePanelContent, {url: "/json/course/course.json", page: pageObject.attr('id')}),
                        pageObject.children('.color')[0]
                    );
                    pageObject.addClass('overflow-visible');
                }, 700);
            }, 300);
        }, 150);

    },
    leftArrowOnMouseEnter: function(){
        this.setState({leftHover: true});
    },
    leftArrowOnMouseLeave: function(){
        this.setState({leftHover: false});
    },
    rightArrowOnMouseEnter: function(){
        this.setState({rightHover: true});
    },
    rightArrowOnMouseLeave: function(){
        this.setState({rightHover: false});
    },
    render: function(){
        if (this.state.data.length == 0) {
            console.log('loading');
            return React.createElement("div", null);
        }
        var page = this.props.page;
        var prev = $('#' + page).prev();
        var next = $('#' + page).next();

        var coursePanelNodeContentClass = "course-panel-content show-from-bottom";
        var leftArrowClass = "left-arrow text-vertical-center" + (prev.length == 0 ? " hide" : "");
        var rightArrowClass = "right-arrow text-vertical-center" + (next.length == 0 ? " hide" : "");

        var prev_color = (prev.length > 0 ? prev.children('.color').attr('class').split(' ')[1] : "");
        var next_color = (next.length > 0 ? next.children('.color').attr('class').split(' ')[1] : "");

        if(this.state.leftHover){
            leftArrowClass += " " + prev_color;
            $('#' + page + '>.color').addClass('shrink-left');
        }else{
            $('#' + page + '>.color').removeClass('shrink-left');
        }

        if(this.state.rightHover){
            rightArrowClass += " " + next_color;
            $('#' + page + '>.color').addClass('shrink-right');
        }else{
            $('#' + page + '>.color').removeClass('shrink-right');
        }

        return (
            React.createElement("div", {className: coursePanelNodeContentClass}, 
                React.createElement("div", {className: leftArrowClass, onClick: this.arrowOnClick.bind(null, prev, "left", page), onMouseEnter: this.leftArrowOnMouseEnter, onMouseLeave: this.leftArrowOnMouseLeave}, React.createElement("span", {className: "glyphicon glyphicon-chevron-left", "aria-hidden": "true"})), 
                React.createElement("div", {className: rightArrowClass, onClick: this.arrowOnClick.bind(null, next, "right", page), onMouseEnter: this.rightArrowOnMouseEnter, onMouseLeave: this.rightArrowOnMouseLeave}, React.createElement("span", {className: "glyphicon glyphicon-chevron-right", "aria-hidden": "true"})), 
                React.createElement("div", {className: "close-button", onClick: this.closeOnClick}, "×"), 
                React.createElement(CoursePanelContentIntroduction, {data: this.state.data.introduction}), 
                React.createElement(CoursePanelContentSyllabus, {data: this.state.data.syllabus}), 
                React.createElement(CoursePanelContentLecturer, {data: this.state.data.lecturer})
            )
        );

    }
});

var SectionHeader = React.createClass({displayName: "SectionHeader",
    render: function(){
        return (
            React.createElement("div", {className: "section-header"}, 
                React.createElement("h2", {className: "section-title"}, 
                    this.props.title
                )
            )
        );
    }
});

var SectionContent = React.createClass({displayName: "SectionContent",
    render: function(){
        var contentNode = this.props.content.map(function(content){
            var parsed_content = content.paragraph.replace(/\n/gi, "<br>");
            return (
                React.createElement("p", {dangerouslySetInnerHTML: {__html: parsed_content}})
            )
        });
        return (
            React.createElement("div", {className: "section-inner-content"}, 
                contentNode
            )
        )
    }
});

var SectionTable = React.createClass({displayName: "SectionTable",
    render: function(){
        var headerNode = this.props.header.map(function(column) {
            return (
                React.createElement("th", null, column.col_name)
            )
        });
        var tableHeader = React.createElement("tr", null, headerNode);
        var tableBody = this.props.data.map(function(row){
            return (
                React.createElement("tr", null, 
                    React.createElement("td", null, row.date), 
                    React.createElement("td", null, row.description), 
                    React.createElement("td", null, row.link), 
                    React.createElement("td", null, row.homework)
                )
            )
        });
        return (
            React.createElement("div", {className: "section-content"}, 
                React.createElement("table", {className: "table table-striped table-bordered"}, 
                    React.createElement("thead", null, tableHeader), 
                    React.createElement("tbody", null, tableBody)
                )
            )
        )
    }
});

// Course Panel Content Layout
var CoursePanelContentIntroduction = React.createClass({displayName: "CoursePanelContentIntroduction",
    render: function(){
        return (
            React.createElement("section", null, 
                React.createElement(SectionHeader, {title: "Introduction"}), 
                React.createElement("div", {className: "section-content"}, 
                    React.createElement(SectionContent, {content: this.props.data.content})
                )
            )
        );
    }
});

// Course Panel Content Layout
var CoursePanelContentSyllabus = React.createClass({displayName: "CoursePanelContentSyllabus",
    render: function(){
        console.log(this.props.data);
        return (
            React.createElement("section", null, 
                React.createElement(SectionHeader, {title: "Syllabus"}), 
                React.createElement(SectionTable, {data: this.props.data.table_data, header: this.props.data.header_data})
            )
        );
    }
});

// Course Panel Content Layout
var CoursePanelContentLecturer = React.createClass({displayName: "CoursePanelContentLecturer",
    render: function(){
        return (
            React.createElement("section", null, 
                React.createElement(SectionHeader, {title: "Lecturer"}), 
                React.createElement("div", {className: "section-content"}, 
                    React.createElement("img", {src: this.props.data.image}), 
                    React.createElement(SectionContent, {content: this.props.data.content})
                )
            )
        );
    }
});


React.render(
    React.createElement(CoursePanel, {url: "/json/course/course.json"}),
    $('#course-main')[0]
);
