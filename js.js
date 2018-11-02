var app = angular.module('App', []);

app.controller('Tree', AtScriptController);

app.component('atScript', {
    template: `
    	<div ng-repeat="script in $ctrl.scripts"
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
							<div ng-repeat="btn in step.list_buttons">
								<div class="at-btn-title" 
									ng-click="$ctrl.btn_click(btn)">
									{{btn.title}}</div>

								<at-script scripts='btn.scripts' 
									type='sub' 
									ng-if='btn.clicked'
									></at_script>
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
        scripts: '=',
        type: '@'
    }
});


function AtScriptController() {
	$scope = this;
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
	
	if ($scope.type === 'parent') {
		$scope.scripts = angular.copy($scope.scripts_copy);
	}

	$scope.btn_click = (btn) => {
		btn.clicked = true;
		if (btn.type === 'script') 
			btn.scripts = [$scope.get_script(btn.scripts[0].id)];
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
}