// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example
var request = new XMLHttpRequest();
request.open("GET", "generated_files/spring-projects-spring-boot.json", true);
request.send(null);
request.onreadystatechange = () => {
  if ( request.readyState === 4 && request.status === 200 ) {
    var json = JSON.parse(request.responseText);
	var dlabels = [];
	var dtotal = [];
	var dmerged = [];
	
	Object.keys(json.datePRInfos).forEach((key, index) => {
		dlabels.push(key);
		dtotal.push(json.datePRInfos[key].total);
		dmerged.push(json.datePRInfos[key].merged);
    });
	
	console.log(dlabels);
	console.log(dtotal);
	console.log(dmerged);
	
	document.getElementById("areaChartDescription").innerHTML = `<b>Owner:</b> ${json.cowner} <b>Repository:</b> ${json.crepo}`;
    var ctx = document.getElementById("myAreaChart");
	var myLineChart = new Chart(ctx, {
	  type: 'line',
	  data: {
		labels: dlabels,
		datasets: [{
		  label: "Total pull requests",
		  lineTension: 0.3,
		  backgroundColor: "rgba(2,117,216,0.2)",
		  borderColor: "rgba(2,117,216,1)",
		  pointRadius: 5,
		  pointBackgroundColor: "rgba(2,117,216,1)",
		  pointBorderColor: "rgba(255,255,255,0.8)",
		  pointHoverRadius: 5,
		  pointHoverBackgroundColor: "rgba(2,117,216,1)",
		  pointHitRadius: 20,
		  pointBorderWidth: 2,
		  data: dtotal,
		}, { label: "pull requests merged",
		  lineTension: 0.3,
		  backgroundColor: "rgba(255, 0, 0, 0.3)",
		  borderColor: "rgba(255, 0, 0, 1)",
		  pointRadius: 5,
		  pointBackgroundColor: "rgba(255, 0, 0, 1)",
		  pointBorderColor: "rgba(255,255,255,0.8)",
		  pointHoverRadius: 5,
		  pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
		  pointHitRadius: 20,
		  pointBorderWidth: 2,
		  data: dmerged,
		}],
	  },
	  options: {
		scales: {
		  xAxes: [{
			time: {
			  unit: 'date'
			},
			gridLines: {
			  display: false
			},
			ticks: {
			  maxTicksLimit: 7
			}
		  }],
		  yAxes: [{
			ticks: {
			  min: 0,
			  max: 100,
			  maxTicksLimit: 5
			},
			gridLines: {
			  color: "rgba(0, 0, 0, .125)",
			}
		  }],
		},
		legend: {
		  display: false
		}
	  }
	});
  }
}


// -- Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "Revenue",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 15000,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
// -- Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Blue", "Red", "Yellow", "Green"],
    datasets: [{
      data: [12.21, 15.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});
