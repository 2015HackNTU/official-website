/**
 * Created by pilagod on 4/11/15.
 */


/*
 *  Course Panel
 */

var CoursePanel = React.createClass({
    getInitialState: function() {
        return {data: []};
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
    render: function(){
        var coursePanelNodeClassDefault = "course-panel text-vertical-center";
        var coursePanelNode = this.state.data.map(function(data){
            var coursePanelNodeClass = coursePanelNodeClassDefault + (data.backgroundColorClass? " " + data.backgroundColorClass: "");
            return (
                <div id={data.id} className={coursePanelNodeClass}>
                    <CoursePanelHeader title={data.title}/>
                    <CoursePanelFooter footer={data.footer}/>
                </div>
            );
        });
        return (
            <div className="main">
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
            return <div>Loading...</div>;
        }
        var coursePanelNodeContentClass = "course-panel-content";

        return (
            <div className={coursePanelNodeContentClass}>
                <CoursePanelContentIntroduction data={this.state.data.introduction}/>
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
    //<CoursePanelContent url="/json/course/course.json" page="iot" pollInterval="2000" />,
    $('body')[0]
);