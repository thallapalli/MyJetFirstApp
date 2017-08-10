/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * piechart module
 */
define(['ojs/ojcore', 'knockout','ojs/ojchart', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojmodule', 'ojs/ojmoduleanimations', 'ojs/ojanimation'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function piechartContentViewModel() {
        var self = this;
        self.effect = ko.observable('fadeIn');
                self.effectOptions = {};
                /**
                 self.dataSeries = [{name: "Series 1", items: [42]},
                 {name: "Series 2", items: [55]},
                 {name: "Series 3", items: [36]},
                 {name: "Series 4", items: [10]},
                 {name: "Series 5", items: [5]}]; **/
                self.dataSeries = ko.observableArray();
                $.getJSON("http://localhost:7101/MyRest6/rest/1/student")
                        .then(function (students) {
                            var test = [];
                            test = students.items;
                           oj.Logger.info("Size is", test.length); 
                            $.each(test, function () {
                                self.dataSeries.push({
                                    name: this.FirstName,
                                    items: [this.Id]
                                });
                            }
                            );
                        });
    }
    
    return piechartContentViewModel;
});
