"use strict";
module.exports = (answers) => {
    const isAdapter = answers.features.indexOf("Adapter") > -1;
    if (!isAdapter)
        return;
    const useReact = answers.adminReact === "yes";
    const template = `
<html>

<head>

	<!-- Load ioBroker scripts and styles-->
	<link rel="stylesheet" type="text/css" href="../../css/adapter.css" />
	<link rel="stylesheet" type="text/css" href="../../lib/css/materialize.css">

	<script type="text/javascript" src="../../lib/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="../../socket.io/socket.io.js"></script>

	<script type="text/javascript" src="../../js/translate.js"></script>
	<script type="text/javascript" src="../../lib/js/materialize.js"></script>
	<script type="text/javascript" src="../../js/adapter-settings.js"></script>

	<!-- Load our own files -->
	<link rel="stylesheet" type="text/css" href="style.css" />
	<script type="text/javascript" src="words.js"></script>

${useReact ? "" : (`
	<script type="text/javascript">
		// This will be called by the admin adapter when the settings page loads
		function load(settings, onChange) {
			// example: select elements with id=key and class=value and insert value
			if (!settings) return;
			$('.value').each(function () {
				var $key = $(this);
				var id = $key.attr('id');
				if ($key.attr('type') === 'checkbox') {
					// do not call onChange direct, because onChange could expect some arguments
					$key.prop('checked', settings[id])
						.on('change', () => onChange())
						;
				} else {
					// do not call onChange direct, because onChange could expect some arguments
					$key.val(settings[id])
						.on('change', () => onChange())
						.on('keyup', () => onChange())
						;
				}
			});
			onChange(false);
			// reinitialize all the Materialize labels on the page if you are dynamically adding inputs:
			if (M) M.updateTextFields();
		}

		// This will be called by the admin adapter when the user presses the save button
		function save(callback) {
			// example: select elements with class=value and build settings object
			var obj = {};
			$('.value').each(function () {
				var $this = $(this);
				if ($this.attr('type') === 'checkbox') {
					obj[$this.attr('id')] = $this.prop('checked');
				} else {
					obj[$this.attr('id')] = $this.val();
				}
			});
			callback(obj);
		}
	</script>
`)}
</head>

<body>

	<div class="m adapter-container">

		<!-- Put your content here -->
		<h1 class="translate">${answers.adapterName} adapter settings</h1>

		<!-- For example two columns with settings: -->
		<div class="row">
			<div class="col s6 input-field">
				<input type="checkbox" class="value" id="option1" />
				<label for="option1" class="translate">option 1 description</label>
			</div>
			<div class="col s6 input-field">
				<input type="text" class="value" id="option2" />
				<label for="option2" class="translate">option 2 description</label>
			</div>
		</div>

	</div>

</body>

</html>
`;
    return template.trim();
};