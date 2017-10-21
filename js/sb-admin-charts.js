// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

document.getElementById('mySelect2').disabled = true;
document.getElementById('txtOwner').disabled = true;
const request = new XMLHttpRequest();
request.open('GET', 'generated_files/config.json', true);
request.send(null);
request.onreadystatechange = () => {
	if ( request.readyState === 4 && request.status === 200 ) {
		const json = JSON.parse(request.responseText);
		let htmlstruct = '';
		document.getElementById('txtOwner').value = json[0].owner
		for (let i = 0; i < json.length; i += 1) {
			htmlstruct += `<option>${json[i].repo}</option>`;
		}
		document.getElementById('mySelect2').innerHTML = htmlstruct;
		document.getElementById('mySelect2').disabled = false;
	}
}

function listChange() {
	const json = JSON.parse(request.responseText);
	for (let i = 0; i < json.length; i += 1) {
		if (document.getElementById('mySelect2').value === json[i].repo) {
			document.getElementById('txtOwner').value = json[i].owner;
		}
	}
}

// -- Area Chart Example
function displayCharts() {
	let theowner = document.getElementById("txtOwner").value;
	let therepo = document.getElementById("mySelect2").value;
	if (theowner == '' || therepo == '') {
		theowner = 'spring-projects';
		therepo = 'spring-boot';
	}
	
	document.getElementById('areaRelease').innerHTML = '<canvas id="myAreaChart" width="100%" height="30"></canvas>';
	document.getElementById('pieRelease').innerHTML = '<canvas id="myBarChart" width="100" height="50"></canvas>';
	document.getElementById('pieRelease2').innerHTML = '<canvas id="myPieChart" width="100%" height="100"></canvas>';
	
	const request = new XMLHttpRequest();
	request.open('GET', `generated_files/${theowner}-${therepo}.json`, true);
	request.send(null);
	request.onreadystatechange = () => {
		if ( request.readyState === 4 && request.status === 200 ) {
			const json = JSON.parse(request.responseText);
			const dlabels = [];
			const dtotal = [];
			const dmerged = [];
			const dlu = new Date(json.lastUpdate);
			
			Object.keys(json.datePRInfos).forEach((key, index) => {
				dlabels.unshift(key);
				dtotal.unshift(json.datePRInfos[key].total);
				dmerged.unshift(json.datePRInfos[key].merged);
			});
			
			const maxArray = Math.max.apply(Math, dtotal);
			const hours = ("0" + dlu.getHours()).slice(-2);
			const minutes = ("0" + dlu.getMinutes()).slice(-2);
			
			
			document.getElementById("areaChartDescription").innerHTML = `<b>Owner:</b> ${json.cowner} <b>Repository:</b> ${json.crepo} - PR (not merged and merged) in time`;
			document.getElementById("areaChartLastUpdate").innerHTML = `Last update: ${dlu.getDate()}/${dlu.getMonth() + 1}/${dlu.getFullYear()} at ${hours}:${minutes}`;
			document.getElementById("pieChartLastUpdate").innerHTML = `Last update: ${dlu.getDate()}/${dlu.getMonth() + 1}/${dlu.getFullYear()} at ${hours}:${minutes}`;
			document.getElementById("pieChartLastUpdate2").innerHTML = `Last update: ${dlu.getDate()}/${dlu.getMonth() + 1}/${dlu.getFullYear()} at ${hours}:${minutes}`;
			let ctx = document.getElementById("myAreaChart");
			const myLineChart = new Chart(ctx, {
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
							max: maxArray,
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
			
			let percentMerged = dmerged.reduce((a, b) => { return a + b; }, 0);
			percentMerged = (percentMerged / json.totalPR) * 100;
			const percentNotMerged = 100 - percentMerged;
			
			ctx = document.getElementById("myPieChart");
			const myPieChart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: ['% Merged PR', '% Not merged PR'],
					datasets: [{
						data: [percentMerged.toFixed(2), percentNotMerged.toFixed(2)],
						backgroundColor: ['#007bff', '#dc3545'],
					}],
				},
			});
			
			const usernames = [];
			const contribUsernames = [];
			const imagePath = [];
			const userTotal = [];
			const userMerged = [];
			const colors = [];
			
			Object.keys(json.userPRInfos).forEach((key, index) => {
				usernames.push(key);
				imagePath.push(json.userPRInfos[key].avatarUrl);
				userTotal.push(json.userPRInfos[key].total);
				if (json.userPRInfos[key].merged != 0) {
					userMerged.push(json.userPRInfos[key].merged);
					contribUsernames.push(key);
				}
			});
			
			for (let i = 0; i < contribUsernames.length; i++) {
				colors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
			}
			
			// -- Bar Chart Example
			ctx = document.getElementById("myBarChart");
			const myLineChart2 = new Chart(ctx, {
					type: 'doughnut',
					data: {
							labels: contribUsernames,
							datasets: [
									{
											data: userMerged,
											backgroundColor: colors
									}
							]
					},
					options: {
							responsive: true,
							legend: {
								display: false
							}
					}    
			});
		}
	}
}

displayCharts();