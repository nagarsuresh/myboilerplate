"use strict";

var React = require('react');
var Header = require('./Header');

var Main = React.createClass({

    componentDidMount: function () {
        var me = this;
        $.get('/service/ajax1', function (data) {
            me.setState({
                msg: data
            });
        });
    },

    getInitialState: function () {
        return {
            msg: 'Static message'
        };
    },


    render: function () {
        return (
            <div>
                <Header />
                <h1>{this.state.msg}</h1>
            </div>
        );
    }
});

module.exports = Main;
