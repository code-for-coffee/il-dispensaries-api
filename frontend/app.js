const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
// const Chart = require('chartjs');
// const Moment = require('moment');
//
// console.log('chart')
// console.log(Chart)

// $(document).ready(() => {
//
//   class MonthOpenedChart {
//     constructor() {
//       this.dataset = {};
//       this.props = {};
//       console.log('hi mom');
//       $.ajax({
//         url: 'http://illinoisdispensaries.space/api-v1',
//         dataType: 'json',
//         success: function(data) {
//           console.log('uh...')
//           let tempData = {};
//           for (let disp in data) {
//             let dispensary = data[disp];
//             let date = Moment(dispensary.licenseIssueDate);
//             //console.log("" + date.get('year') + '-' + date.get('month'));
//             var m = date.get('month') + 1;
//             if (m < 10) {
//               m = "0" + m;
//             }
//             var x = "" + date.get('year') + '-' + m;
//             // console.log(x);
//             // console.log(typeof x);
//             if (!tempData.hasOwnProperty(x)) {
//               tempData[x] = 1;
//             } else {
//               tempData[x] = tempData[x] + 1;
//             }
//           }
//           //console.log('chart props');
//           //console.log(Object.keys(tempData).sort());
//           var dataArray = [];
//           var labels = Object.keys(tempData).sort();
//           console.log(labels);
//           for (var i = 0; i < labels.length; i++) {
//             let mo = labels[i];
//             console.log(i);
//             console.log(mo);
//             dataArray.push(tempData[mo]);
//           }
//           console.log('--------')
//           console.log(dataArray);
//
//           var dataset = {
//             labels: labels,
//             datasets: [
//               {
//                 label: "Dispensary Licenses Issued by Month",
//                 fill: false,
//                 lineTension: 0.1,
//                 backgroundColor: "rgba(75,192,192,0.4)",
//                 borderColor: "rgba(75,192,192,1)",
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 pointBorderColor: "rgba(75,192,192,1)",
//                 pointBackgroundColor: "#fff",
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                 pointHoverBorderColor: "rgba(220,220,220,1)",
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 10,
//                 data: dataArray,
//                 spanGaps: false,
//               }
//             ]
//           };
//           console.log(dataset);
//           var ctx = document.getElementById("line-chart").getContext("2d");
//           var myLineChart = new Chart(ctx, {
//             type: 'line',
//             data: dataset
//           });
//         },
//         error: function(xhr, status, err) {
//           console.log('Error', err);
//           console.log(err);
//         }
//       });
//     }
//   }
//   new MonthOpenedChart();
//
// })


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

const City = React.createClass({
  render: function() {
    let city = this.props.city;
    let count = this.props.count;
    let word;
    if (count < 2) {
      word = 'dispensary';
    } else {
      word = 'dispensaries';
    }
    return (
      <li>{city} contains {count} {word}.</li>
    )
  }
});

const Year = React.createClass({
  render: function() {
    let year = this.props.year;
    let count = this.props.count;
    return (
      <li>{count} dispensaries opened in {year}.</li>
    )
  }
})

const DispensaryFacts = React.createClass({
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
    let cities = {};
    let years = {};
    let totalCount = this.state.data.length;
    this.state.data.forEach(function(dispensary) {
      let city = dispensary.city;
      let year = dispensary.licenseIssueDate.slice(0,4);
      if (!cities.hasOwnProperty(city)) {
        cities[city] = 1;
      } else {
        cities[city] = cities[city] + 1;
      }
      if (!years.hasOwnProperty(year)) {
        years[year] = 1;
      } else {
        years[year] = years[year] + 1;
      }
    });
    let cityNodes = [];
    let yearNodes = [];
    for (var city in cities) {
      let loc = cities[city];
      if (loc > 1) {
        cityNodes.push(
          <City city={city} count={loc} />
        )
      }
    }
    for (var yr in years) {
      let date = years[yr];
      yearNodes.push(
        <Year year={yr} count={date} />
      )
    }
    return (
      <p>
        <li>Total number of dispensaries in IL: <strong>{totalCount}</strong>.</li>
        <h5>The following cities have more than one dispensary:</h5>
          {cityNodes}
        <h5>Dispensaries by year</h5>
        {yearNodes}
      </p>
    )
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

ReactDOM.render(
  <DispensaryFacts url="http://illinoisdispensaries.space/api-v1" />,
  document.getElementById('dispensary-facts')
);
