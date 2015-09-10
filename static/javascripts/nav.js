var Navbar = React.createClass({
  getInitialState: function () {
    return { fullSize: $(window).width() < 768 };
  },
  handleClick: function (e) {
    if (this.state.fullSize) {
      this.setState({ fullSize:false });
    } else {
      this.setState({ fullSize:true });
    };
    $( "#wrapper" ).toggleClass("toggled");
  },
  render: function () {
      return (
        <ul className="nav nav-tabs navbar-fixed-bottom">
          <li>
            <a href="#menu-toggle" className={this.state.fullSize ? "" : "hidden"} onClick={this.handleClick}><span className="glyphicon glyphicon-menu-hamburger"></span></a>
          </li>
          <li className="pull-right">
            <a href="#menu-toggle" className={this.state.fullSize ? "hidden" : ""} onClick={this.handleClick}><span className="glyphicon glyphicon-resize-full"></span></a>
          </li>
          <li className="pull-right">
            <a href="#"><span className="glyphicon glyphicon-edit"></span></a>
          </li>
        </ul>
      );
  }
});

React.render(<Navbar />, document.getElementById("navigation"));