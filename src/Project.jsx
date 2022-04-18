import React from "react";
import "./Project.css";

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            repos: this.props.project,
            projectInfo: undefined,
            language: undefined,
            loaded: false,
            error: undefined
        };
        this.getProjectJson = this.getProjectJson.bind(this);
    }

    getProjectJson() {
        // retrieve the project information
        fetch(`https://api.github.com/repos/${this.state.user}/${this.state.repos}`)
             .then((res) => res.json())
             .then(
                 (result) => {
                     this.setState({
                         ...this.state,
                         projectInfo: result,
                     });
                 },
                 (error) => {
                     this.setState({
                         ...this.state,
                         loaded: true,
                         error: error.message
                     });
                 }
             );

        // now get the top language for this project
        fetch(`https://api.github.com/repos/${this.state.user}/${this.state.repos}/languages`)
        .then((res) => res.json())
        .then(
            (result) => {
                let topLang = Object.keys(result)[0];
                this.setState({
                    ...this.state,
                    language: topLang ? topLang : "None",
                    loaded: true
                });
            },
            (error) => {
                this.setState({
                    ...this.state,
                    loaded: true,
                    error: error.message
                })
            }
        )
    }

    componentDidMount() {
        this.getProjectJson();
    }

    render() {
        if(this.state.error) {
            return (
                <div className="oopsie">
                    {this.state.error}
                </div>
            );
        }

        if(! this.state.loaded) {
            return (
                <div className="loading">
                    <p>
                        Loading...
                    </p>
                </div>
            );
        }

        const project = this.state.projectInfo;

        return (
            <div className="gitHubProject">
                <h2>{project.name}</h2>
                <p className="description">
                    {project.description}
                </p>
                <p className="language">
                    Language: {this.state.language}
                </p>
                <p className="link">
                    <a href={project.html_url} target="_blank">
                        GitHub Repository
                    </a> &bull;
                    <a href={`/projects/${project.name}`} target="_blank">
                        More Information
                    </a>
                </p>
            </div>
        )
    }
}
