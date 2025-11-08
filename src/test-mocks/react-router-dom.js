const React = require('react');

exports.BrowserRouter = ({ children }) => children;
exports.Routes = ({ children }) => children;
exports.Route = ({ element }) => element || null;
exports.useNavigate = () => () => { };
exports.Link = ({ children }) => children;

module.exports = exports;
