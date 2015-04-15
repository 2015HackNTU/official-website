/**
 * Created by pilagod on 4/11/15.
 */


/*
 *  Course Panel
 */

//onMouseOver={onMouseOver} onMouseOut={onMouseOut}
var CoursePanel = React.createClass({
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

        $('#' + page).addClass(page + '_content');
        $('#' + page).removeClass('list');
        $('#' + page).prevAll().addClass('margin-25');
        //$('#' + page).prev().addClass('margin-75');
        //$('#' + page).siblings().addClass('hide');
        setTimeout(function(){
            React.render(
                <CoursePanelContent url="/json/course/course.json" page={page}/>,
                $('#' + page + ">.color")[0]
            );
            $('#' + page).addClass('overflow-visible');
        }, 700);

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
                <div id={data.id} className={coursePanelNodeClass} onClick={handleClick.bind(null, data.id)} onMouseOver={onMouseOver.bind(null, data.id)} onMouseOut={onMouseOut.bind(null, data.id)}>
                    <div className={colorClass}></div>
                    <CoursePanelHeader title={data.title}/>
                    <CoursePanelFooter footer={data.footer}/>
                </div>
            );
        });
        return (
            <div id="main" className="main" onClick={this.handleClick}>
                {coursePanelNode}
            </div>
        );
    }
});

// Course Panel Header
var CoursePanelHeader = React.createClass({
    render: function(){
        var imgStyle = {
            marginLeft: '-0.9em',
            width: '8em'
        };
        return (
            <div className="course-panel-header">
                <img src={this.props.title} style={imgStyle}></img>
            </div>
        );
    }
});

// Course Panel Footer
var CoursePanelFooter = React.createClass({
    render: function(){
        var imgStyle = {
            width: '100%'
        };
        return (
            <div className="course-panel-footer">
                <img src={this.props.footer} style={imgStyle}></img>
            </div>
        );
    }
});


/*
 *  Course Panel Content (Introduction, Syllabus, Lecturers)
 */

var CoursePanelContent = React.createClass({
    getInitialState: function() {
        return {data: []};
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
    render: function(){
        console.log(this.state.data);
        if (this.state.data.length == 0) {
            console.log('loading');
            return <div></div>;
        }
        var coursePanelNodeContentClass = "course-panel-content";

        console.log(this.state.data);

        return (
            <div className={coursePanelNodeContentClass}>
                <CoursePanelContentIntroduction data={this.state.data.introduction}/>
                <CoursePanelContentSyllabus data={this.state.data.syllabus}/>
                <CoursePanelContentLecturer data={this.state.data.lecturer} />
            </div>
        );

    }
});

var SectionHeader = React.createClass({
    render: function(){
        return (
            <div className="section-header">
                <h2 className="section-title">
                    {this.props.title}
                </h2>
            </div>
        );
    }
});

var SectionContent = React.createClass({
    render: function(){
        var contentNode = this.props.content.map(function(content){
            var parsed_content = content.paragraph.replace(/\n/gi, "<br>");
            return (
                <p dangerouslySetInnerHTML={{__html: parsed_content}}></p>
            )
        });
        return (
            <div className="section-inner-content">
                {contentNode}
            </div>
        )
    }
});

var SectionTable = React.createClass({
    render: function(){
        var headerNode = this.props.header.map(function(column) {
            return (
                <th>{column.col_name}</th>
            )
        });
        var tableHeader = <tr>{headerNode}</tr>;
        var tableBody = this.props.data.map(function(row){
            return (
                <tr>
                    <td>{row.date}</td>
                    <td>{row.description}</td>
                    <td>{row.link}</td>
                    <td>{row.homework}</td>
                </tr>
            )
        });
        return (
            <div className="section-content">
                <table className="table table-striped table-bordered">
                    <thead>{tableHeader}</thead>
                    <tbody>{tableBody}</tbody>
                </table>
            </div>
        )
    }
});

// Course Panel Content Layout
var CoursePanelContentIntroduction = React.createClass({
    render: function(){
        return (
            <section>
                <SectionHeader title="Introduction"/>
                <div className="section-content">
                    <SectionContent content={this.props.data.content} />
                </div>
            </section>
        );
    }
});

// Course Panel Content Layout
var CoursePanelContentSyllabus = React.createClass({
    render: function(){
        console.log(this.props.data);
        return (
            <section>
                <SectionHeader title="Syllabus"/>
                <SectionTable data={this.props.data.table_data} header={this.props.data.header_data}/>
            </section>
        );
    }
});

// Course Panel Content Layout
var CoursePanelContentLecturer = React.createClass({
    render: function(){
        return (
            <section>
                <SectionHeader title="Lecturer"/>
                <div className="section-content">
                    <img src={this.props.data.image}></img>
                    <SectionContent content={this.props.data.content} />
                </div>
            </section>
        );
    }
});


React.render(
    <CoursePanel url="/json/course/course.json"/>,
    //<CoursePanelContent url="/json/course/course.json" page="ios" />,
    $('body')[0]
);
