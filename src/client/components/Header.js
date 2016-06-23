"use strict";

var React = require('react');

var Header = React.createClass({
    render: function () {
        var hasWord = (this.props.selectedWord) ? true : false;
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">My Standard Boilerplate starter kit</a>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <div className="btn-toolbar">
                        </div>
                    </div>
                </div>
            </nav >
        );
    }
});

module.exports = Header;