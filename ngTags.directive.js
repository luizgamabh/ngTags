;(function () {
  'use strict';
  angular.module('itsTags')
    .directive('itsTags', itsTags)
    .directive('itsTag', itsTag);

  /** @ngInject */
  function itsTags() {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      controller: function () {
        var vm = this;
        vm.tags = [];
        vm.addTag = function addTag(tag) {
          vm.tags.push(tag);
        };
        vm.removeTag = function removeTag(index) {
          var removedTag = vm.tags.splice(index, 1);
          typeof removedTag[0].deleteCallback === 'function' && removedTag[0].deleteCallback.call(this, removedTag[0]);
        };
        vm.action = function(index) {
        }
      },
      controllerAs: 'itsTagsCtrl',
      link: function ($scope, element, attrs, controller) {
        // controller.selectTag(attrs.active || 0);
      },
      template: '<div class="tags"><ul class="its-tags__list"><li class="its-tags__tag" ng-repeat="tag in itsTagsCtrl.tags track by $index"><a href="" ng-click="itsTagsCtrl.action(tag)" class="its-tags__link  blue">{{tag.label}}</a><a href="" ng-click="itsTagsCtrl.removeTag($index)" class="its-tags__action">x</a></li></ul><div style="display:none;" ng-transclude></div></div>'
    }
  }

  /** @ngInject */
  function itsTag() {
    return {
      restrict: 'E',
      scope: {
        actionCallback: '=?action',
        deleteCallback: '=?delete',
        params: '=?',
        color: '@?',
        label: '@'
      },
      replace: true,
      require: '^itsTags',
      transclude: true,
      link: function($scope, element, attrs, controller) {
        $scope.tag = {
          actionCallback: $scope.actionCallback,
          deleteCallback: $scope.deleteCallback,
          params: $scope.params,
          color: $scope.color,
          label: $scope.label
        };
        controller.addTag($scope.tag);
      },
      template: '<ng-transclude></ng-transclude>'
    }
  }
})();
