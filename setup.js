var getSetup = function(baseUrl) {
	return {
		prr: {
			url: baseUrl + '/PRR',
			title: 'PRR',
			adapt: prrAdapter,
			height: 23 * 42 + 40,
			count: 23,
			palette: [
				{ "color": "OrangeRed",     "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "Orange",        "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "LimeGreen",     "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "DarkSlateGray", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "LightGray",     "dark": "MediumBlue", "light": "LightGray" },
			],
		},
		execucao: {
			url: baseUrl + '/Execução',
			resourcesUrl: baseUrl + '/PRR',
			title: 'Execução',
			adapt: execucaoAdapter,
			height: 70 * 42 + 40,
			count: 70,
			palette: [
				{ "color": "#34568B", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#CD212A", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#FFA500", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#56C6A9", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#4B5335", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#798EA4", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#FA7A35", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#00758F", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#EDD59E", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#E8A798", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#9C4722", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#6B5876", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#B89B72", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#282D3C", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#A09998", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#DC793E", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#A2242F", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#C48A69", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#D9CE52", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#D19C97", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#006B54", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#6A2E2A", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#6C244C", "dark": "MediumBlue", "light": "LightGray" },
			],
		},
		contratacao: {
			url: baseUrl + '/Contratação',
			resourcesUrl: baseUrl + '/Procedimentos',
			title: 'Contratação',
			adapt: contratacaoAdapter,
			height: 41 * 42 + 40,
			count: 41,
			palette: [
				{ "color": "#5e97f6", "dark": "#2a56c6", "light": "#c6dafc" },
				{ "color": "#db4437", "dark": "#a52714", "light": "#f4c7c3" },
				{ "color": "#f2a600", "dark": "#ee8100", "light": "#fce8b2" },
				{ "color": "#0f9d58", "dark": "#0b8043", "light": "#b7e1cd" },
				{ "color": "#ab47bc", "dark": "#6a1b9a", "light": "#e1bee7" },
				{ "color": "#00acc1", "dark": "#00838f", "light": "#b2ebf2" },
				{ "color": "#ff7043", "dark": "#e64a19", "light": "#ffccbc" },
				{ "color": "#9e9d24", "dark": "#827717", "light": "#f0f4c3" },
				{ "color": "#5c6bc0", "dark": "#3949ab", "light": "#c5cae9" },
				{ "color": "#f06292", "dark": "#e91e63", "light": "#f8bbd0" },
				{ "color": "#00796b", "dark": "#004d40", "light": "#b2dfdb" },
				{ "color": "#c2185b", "dark": "#880e4f", "light": "#f48fb1" },
			],
		},
		integracao: {
			url: baseUrl + '/Visão Integrada',
			title: 'Visão Integrada',
			adapt: integratedAdapter,
			height: 30 * 42 + 40,
			count: 30,
			palette: [
				{ "color": "#34568B", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#CD212A", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#FFA500", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#56C6A9", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#4B5335", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#798EA4", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#FA7A35", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#00758F", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#EDD59E", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#E8A798", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#9C4722", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#6B5876", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#B89B72", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#282D3C", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#A09998", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#DC793E", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#A2242F", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#C48A69", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#D9CE52", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#D19C97", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#006B54", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#6A2E2A", "dark": "MediumBlue", "light": "LightGray" },
				{ "color": "#6C244C", "dark": "MediumBlue", "light": "LightGray" },
			],
		},
		a20: {
			url: baseUrl + '/A20',
			resourcesUrl: baseUrl + '/PRR',
			title: 'A20',
			subtitle: 'Concurso Público',
			adapt: mneAdapter,
			height: 9 * 42 + 40,
			count: 9,
		},
		s20: {
			url: baseUrl + '/S20',
			resourcesUrl: baseUrl + '/PRR',
			title: 'S20',
			subtitle: 'Consulta Prévia',
			adapt: mneAdapter,
			height: 11 * 42 + 40,
			count: 11,
		},
	}
}
