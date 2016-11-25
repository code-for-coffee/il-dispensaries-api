const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const Dispensary = React.createClass({
  render: function() {
    let phone = this.props.phone;
    let address = this.props.address;
    return (
      <article className="dispensary">
      <h6>
      {this.props.name} in {this.props.city}
      </h6>
      <ul>
        <li><em>Phone:</em> <a href={'tel:+1' + phone}>{this.props.phone}</a></li>
        <li><a href={"http://maps.google.com/?q=" + address}>{this.props.address}</a></li>
      </ul>

    </article>
    );
  }
});

const DispensaryList = React.createClass({
  getInitialState: function() {
    console.log('set initial state');
    return { data: [] };
  },
  componentDidMount: function() {
    console.log('component mounted');
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    console.log(this.props);
    console.log(this.state.data);
    var dispensaryNodes = this.state.data.map(function(dispensary) {
      return (
        <Dispensary key={dispensary.id} name={dispensary.name} city={dispensary.city} phone={dispensary.phone} address={dispensary.address} />
      );
    });
    console.log(dispensaryNodes);
    return (
      <div>{dispensaryNodes}</div>
    )
  }
});

ReactDOM.render(
<DispensaryList url="http://illinoisdispensaries.space/api-v1" />,
  document.getElementById('dispensary-locations')
);
