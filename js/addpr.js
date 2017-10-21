const request = new XMLHttpRequest();
request.open('GET', 'generated_files/config.json', true);
request.send(null);
request.onreadystatechange = () => {
	if ( request.readyState === 4 && request.status === 200 ) {
		const json = JSON.parse(request.responseText);
		let htmlstruct = '';
		for (let i = 0; i < json.length; i += 1) {
			htmlstruct += `<tr><td>${json[i].owner}</td><td>${json[i].repo}</td></tr>`;
		}
		document.getElementById('myTable').innerHTML = htmlstruct;
	}
}

function processRequest() {
	document.getElementById('myButton').disabled = true;
	const xhr = new XMLHttpRequest();
	const url = "https://apirest-gitanalytics.herokuapp.com/addpr";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			JSON.parse(xhr.responseText);
			document.getElementById('myButton').disabled = false;
		}
	};
	const data = JSON.stringify({ owner: document.getElementById('txtOwner').value, repo: document.getElementById('txtRepo').value });
	xhr.send(data);
}