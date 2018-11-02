var app = angular.module('App', []);

app.controller('Tree', AtScriptController);

app.component('atScript', {
    template: `
    	<div ng-repeat="script in $ctrl.scripts track by script.id"
			class="at-script">
			<div class="at-script-title" ng-click="script.open = !script.open">
				<i class="ti-layers-alt"></i>
				<div>{{script.title}}</div>
			</div>

			<div class="at-ul-step" ng-show="script.open">
				<div class="at-li-step" ng-repeat="step in script.list_steps">
					<div class="at-li-step-title" ng-click="$ctrl.step_click(step)">
						<i class="{{$ctrl.get_step_icon(step.type)}}"></i>
						<div>{{step.title}}</div>

						<div class="at-step-ul-btn" ng-show="step.type === 'menu'">
							<div ng-repeat="btn in step.list_buttons track by $index"
								ng-click="$ctrl.btn_click(btn)"
							>
								{{btn.title}}

								<at-script scripts='btn.script' ng-if='btn.clicked'></at_script>
							</div>
						</div>	
					</div>
					
				</div>
			</div>

		</div>
    `,
    controller: [
        AtScriptController
    ],
    bindings: {
        scripts: '='
    }
});


function AtScriptController() {
	console.log(this);
	$scope = this;
	$scope.scripts = [
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
					list_buttons: [
						{
							title: 'Script Btn',
							type: 'script',
							scripts: [{
								title: 'Script 1',
								id: 2
							}]
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
					list_buttons: [
						{
							title: 'Script Btn',
							type: 'script',
							scripts: [{
								title: 'Script 1',
								id: 2
							}]
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

	$scope.scripts_copy = [
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
					list_buttons: [
						{
							title: 'Script Btn',
							type: 'script',
							scripts: [{
								title: 'Script 1',
								id: 2
							}]
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
					list_buttons: [
						{
							title: 'Script Btn',
							type: 'script',
							scripts: [{
								title: 'Script 1',
								id: 2
							}]
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

	$scope.btn_click = (btn) => {
		btn.clicked = true;
		if (btn.type === 'script' && $scope.get_script(btn.script.id)) btn.script = $scope.get_script(btn.script.id);
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

	$scope.get_script = (id) => $scope.scripts_copy.find(x => x.id == id);

	window.get_script = $scope.get_script;

}