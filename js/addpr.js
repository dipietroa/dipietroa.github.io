const request = new XMLHttpRequest();
request.open('GET', 'generated_files/config.json', true);
request.send(null);
request.onreadystatechange = () => {
	if ( request.readyState === 4 && request.status === 200 ) {
		const json = JSON.parse(request.responseText);
		let htmlstruct = '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0"><thead><tr><th>Owner</th><th>Repository</th><th>Added on</th></tr></thead><tfoot><tr><th>Owner</th><th>Repository</th><th>Date of request</th></tr></tfoot><tbody>';
		let date;
		let hours;
		let minutes;
		for (let i = 0; i < json.length; i += 1) {
			date = new Date(json[i].date);
			hours = ("0" + date.getHours()).slice(-2);
			minutes = ("0" + date.getMinutes()).slice(-2);
			htmlstruct += `<tr><td>${json[i].owner}</td><td>${json[i].repo}</td><td>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${hours}:${minutes}</td></tr>`;
		}
		htmlstruct += '</tbody></table>';
		document.getElementById('myTable').innerHTML = htmlstruct;
	}
}

function processRequest() {
	document.getElementById('myButton').disabled = true;
	document.getElementById('infoPan').innerHTML = '<div class="alert alert-info"><h6 style="font-size:10px"><strong>Info:</strong> Sending request...</h6></div>'
	const xhr = new XMLHttpRequest();
	const url = 'https://apirest-gitanalytics.herokuapp.com/addpr';
	//const url = 'http://localhost:3000/addpr';
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			const json = JSON.parse(xhr.responseText);
			if (json.status === 'error') {
				document.getElementById('infoPan').innerHTML += `<div class="alert alert-danger"><h6 style="font-size:10px"><strong>Error:</strong> ${json.message}</h6></div>`
			} else {
				document.getElementById('infoPan').innerHTML += `<div class="alert alert-success"><h6 style="font-size:10px"><strong>Success:</strong> ${json.message}</h6></div>`
			}
		} else if(xhr.status != 0 && xhr.status != 200) {
			document.getElementById('infoPan').innerHTML += '<div class="alert alert-danger"><h6 style="font-size:10px"><strong>Error:</strong> Our API rest server is not running!</h6></div>'
		}
		document.getElementById('myButton').disabled = false;
	};
	const data = JSON.stringify({ owner: document.getElementById('txtOwner').value, repo: document.getElementById('txtRepo').value });
	xhr.send(data);
}
