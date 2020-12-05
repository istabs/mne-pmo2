// An AirTable table adapter for Google Charts
function mneAdapter(airtableData, presenter) {
	var rows = []
	airtableData.records.forEach(item => {
		if (item.fields["Sumário"]) {
			var fim = new Date(item.fields["Fim"])
			fim.setDate(fim.getDate() + 1)
			deps = ""
			if (item.fields["Predecessor"])
				item.fields["Predecessor"].forEach(pred => deps += "," + pred)
			deps = deps.substring(1)
			rows.push([
				item.id, // Task ID
				item.fields["Atividade"], // Task Name
				item.fields["Classificação"],
				new Date(item.fields["Inicio"]), // Start Date
				fim, // End Date
				0, // Duration
				item.fields["Progresso"], // Percent Complete
				deps // Dependencies
			]);
		}
	});
	presenter(rows);
}

// An AirTable table adapter for Google Charts
function detailsAdapter(id, airtableData, presenter) {
	var rows = []
	var classificacao = ""
	airtableData.records.forEach(item => {
		if (item.id === id) classificacao = item.fields["Classificação"]
	})
	airtableData.records.forEach(item => {
		if (item.id === id || (item.fields["Classificação"] && item.fields["Classificação"] === classificacao)) {
			var fim = new Date(item.fields["Fim"])
			fim.setDate(fim.getDate() + 1)
			if (item.fields.Inicio && item.fields.Fim)
				rows.push([
					item.id, // Task ID
					item.fields["Atividade"], // Task Name
					item.fields["Classificação"],
					new Date(item.fields["Inicio"]), // Start Date
					fim, // End Date
					0, // Duration
					item.fields["Progresso"], // Percent Complete
					null, // Dependencies
				]);
		}
	});
	presenter(rows);
}

// An AirTable table adapter for Google Charts
function projetosAdapter(airtableData, presenter) {
	var rows = []
	airtableData.records.forEach(item => {
		var fim = new Date(item.fields["Fim"])
		fim.setDate(fim.getDate() + 1)
		rows.push([
			item.id, // Task ID
			item.fields["Projeto"], // Task Name
			item.fields["Criticidade"], // Group (string)
			new Date(item.fields["Inicio"]), // Start Date
			fim, // End Date
			null, // Duration (number)
			null, // Percent Complete (number)
			null, // Dependencies (string / comma separated)
		]);
	});
	presenter(rows);
}

// An AirTable table adapter for Google Charts
function integratedAdapter(airtableData, presenter) {
	var rows = []
	airtableData.records.sort((a, b) => a.fields.Inicio[0] < b.fields.Inicio[0]).forEach(item => {
		console.log(item.fields.Inicio[0])
		var preds = item.fields.Predecessores ? item.fields.Predecessores[0] : null;
		var fim = new Date(item.fields["Fim"])
		fim.setDate(fim.getDate() + 1)
		if (item.fields.Inicio && item.fields.Fim) {
			rows.push([
				item.id, // Task ID
				item.fields["Name"], // Task Name
				item.fields["Projeto"], // Group (string)
				new Date(item.fields["Inicio"]), // Start Date
				fim, // End Date
				null, // Duration (number)
				0, // Percent Complete (number)
				preds, // Dependencies (string / comma separated)
			]);
		}
	});
	presenter(rows);
}

var firebaseRead = false;
var authorization = ""
var projectKey = ""

function fbCache(stuff, ...params) {
	if (firebaseRead) {
		console.log('cached')
		console.log(authorization);
		console.log(projectKey);
		stuff(params);
	} else {
		var dbRef = firebase.database().ref("/mne-pmo");
		dbRef.once('value', snap => {
			firebaseRead = true;
			authorization = snap.child('authorization').val();
			projectKey = snap.child('projectKey').val();
			console.log('caching now')
			stuff(params);
		});
	}
}

// An AirTable table adapter for Google Charts
function execucaoAdapter(airtableData, presenter) {
	fbCache(() => 
		$.ajax({
			url: target.resourcesUrl,
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", authorization)
			},
			success: function (rawData) {
				projetos = {};
				rawData.records.forEach(item => projetos[item.id] = item.fields.Projeto);
				var rows = []
				airtableData.records.forEach(item => {
					var fim = new Date(item.fields["Fim"])
					var preds = item.fields['Finish-Start'] ? item.fields['Finish-Start'][0] : null;
					fim.setDate(fim.getDate() + 1)
					rows.push([
						item.id, // Task ID
						item.fields["Projeto"], // Task Name
						projetos[item.fields["Projeto Alvo"][0]], // Group (string)
						new Date(item.fields["Inicio"]), // Start Date
						fim, // End Date
						null, // Duration (number)
						0, // Percent Complete (number)
						preds, // Dependencies (string / comma separated)
					]);
				});
				presenter(rows);
			}
		})
	, airtableData, presentGantt)
}

// An AirTable table adapter for Google Charts
function contratacaoAdapter(airtableData, presenter) {
	fbCache(() => 
		$.ajax({
			url: target.resourcesUrl,
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", authorization)
			},
			success: function (rawData) {
				resources = {};
				rawData.records.forEach(item => resources[item.id] = item.fields.Procedimento);
				var rows = []
				airtableData.records.forEach(item => {
					var fim = new Date(item.fields["Fim"])
					fim.setDate(fim.getDate() + 1)
					rows.push([
						item.id, // Task ID
						item.fields["Projeto"], // Task Name
						resources[item.fields["Procedimento"][0]], // Group (string)
						new Date(item.fields["Inicio"]), // Start Date
						fim, // End Date
						null, // Duration (number)
						0, // Percent Complete (number)
						null, // Dependencies (string / comma separated)
					]);
				});
				presenter(rows);
			}
		})
	, airtableData, presentGantt)
}

function resetChart(ganttTag) {
	fbCache(() => {

		setMenu(ganttTag)

		if (target.title) {
			document.getElementById("chart_title_div").innerHTML = target.title + (target.subtitle ? " - " + target.subtitle : "")
		}
		$.ajax({
			url: target.url,
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", authorization)
			},
			success: function (rawData) {
				const HTML_POSITION = 'chart_div';

				var gantt = {
					sortTasks: true,
					criticalPathEnabled: false,
					criticalPathStyle: { strokeWidth: 0, stroke: '#e64a19', },
					arrow: { width: 0, radius: 10, length: 0, spaceAfter: -275, },
				};
				if (target.palette) gantt['palette'] = target.palette;

				var options = {gantt: gantt, height: target.height, width: 960, };

				var presenter = _.partial(presentGantt, HTML_POSITION, options, rawData);
				google.charts.setOnLoadCallback(() => googleChartAirtableAdapt(rawData, target.adapt, presenter));
			}
		})
	}, null, null)
}