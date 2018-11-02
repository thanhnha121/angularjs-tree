var app = angular.module('App', []);
app.controller('Tree', function($scope) {
	$scope.list_scripts = [
		{
			id: 1,
			title: 'Welcome',
			list_steps: [
				{
					title: 'Form Text',
					type: 'text'
				},
				{
					title: 'Form menu',
					type: 'menu',
					list_button: [
						{
							title: 'Script Btn',
							type: 'script',
							script: {
								title: 'Script 1',
								id: 2
							}
						},
						{
							title: 'Text Btn',
							type: 'text'
						}
					]
				}
			]
		},

		{
			id: 2,
			title: 'Script 1',
			list_steps: [
				{
					title: 'Form Text',
					type: 'text'
				},
				{
					title: 'Form menu',
					type: 'menu',
					list_button: [
						{
							title: 'Script Btn',
							type: 'script',
							script: {
								title: 'Script 1',
								id: 2
							}
						},
						{
							title: 'Text Btn',
							type: 'text'
						}
					]
				}
			]
		}

		
	];

	$scope.step_click = (step) => {
		step.clicked = true;

	};


	$scope.get_step_icon = (type) => {
		switch(type) {
			case 'text':
				return 'ti-menu';
				break;
			case 'menu':
				return 'ti-text';
				break;
		}
	};

	$scope.get_script = (id) => $scope.list_scripts.find(x => x.id == id);
});

app
.component('atScript', {
    template: `
    	<div ng-repeat="script in list_scripts track by script.id"
			class="at-script">
			<div class="at-script-title" ng-click="script.open = !script.open">
				<i class="ti-layers-alt"></i>
				<div>{{script.title}}</div>
			</div>

			<div class="at-ul-step" ng-show="script.open">
				<div class="at-li-step" ng-repeat="step in script.list_steps">
					<div class="at-li-step-title" ng-click="step_click(step)">
						<i class="{{get_step_icon(step.type)}}"></i>
						<div>{{step.title}}</div>
					</div>
					<at_script key='step'></at_script>
				</div>
			</div>

		</div>
    `,
    controller: [
        AtScriptController
    ],
    bindings: {
        key: '='
    }
});


function AtScriptController() {
    var vm = this;
    console.log(this);
    // vm.list_scripts = myObject.script;
}