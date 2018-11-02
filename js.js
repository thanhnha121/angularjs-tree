var app = angular.module('App', []);

function AtScriptController($scope, $rootScope) {
	$rootScope.loaded = false;
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

	if (!$rootScope.loaded) {
		$rootScope.loaded = true;
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
};

app.controller('Tree', ['$scope', '$rootScope', AtScriptController]);

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
					<div class="at-li-step-title" ng-click="step_click(step)">
						<i class="{{get_step_icon(step.type)}}"></i>
						<div>{{step.title}}</div>

						<div class="at-step-ul-btn" ng-show="step.type === 'menu'">
							<div ng-repeat="btn in step.list_buttons">
								<div class="at-btn-title" 
									ng-click="btn_click(btn)">
									{{btn.title}}</div>

								<at-script scripts='btn.scripts' 
									ng-if='btn.clicked'
									></at-script>
							</div>
						</div>	
					</div>
					
				</div>
			</div>
		</div>
    `,
    controller: [ '$scope', '$rootScope', AtScriptController ],
    bindings: {
        scripts: '=',
        typex: '@'
    }
});