/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojcollectiontabledatasource', 'ojs/ojpagingtabledatasource', 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojbutton'],
        function (oj, ko, $) {

            function DashboardViewModel() {
                var self = this;
                console.log('test');
                self.deptId = ko.observable();
                self.deptName = ko.observable();
                self.locationId = ko.observable();
                self.managerId = ko.observable();

                self.serviceURL = 'http://localhost:7101/MyADFRestAppV1Rest/rest/1/deptu';
                self.DeptCol = ko.observable();
                self.datasource = ko.observable();
                self.pagingDatasource = ko.observable();

                self.parseDept = function (response) {
                    return {DepartmentId: response['DepartmentId'],
                        DepartmentName: response['DepartmentName'],
                        LocationId: response['LocationId'],
                        ManagerId: response['ManagerId']};
                };
                self.Department = oj.Model.extend({
                    urlRoot: self.serviceURL,
                    parse: self.parseDept,
                    idAttribute: 'DepartmentId'
                });

                self.myDept = new self.Department();
                self.DeptCollection = oj.Collection.extend({
                    url:  self.serviceURL + "?limit=50",
                    model: self.myDept,
                    comparator: "DepartmentId"
                });

                self.DeptCol(new self.DeptCollection());
              //  self.datasource(new oj.CollectionTableDataSource(self.DeptCol()));
               self.pagingDatasource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.DeptCol())));

                self.buttonClick = function (model, event) {
                   
                    var recordAttrs = {DepartmentId: model.deptId(), DepartmentName: model.deptName(), LocationId: model.locationId(), ManagerId: model.managerId()};
                    this.DeptCol().create(recordAttrs, {wait: true,
                         contentType: 'application/vnd.oracle.adf.resourceitem+json',
                        success: function (model, response) {
                            
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Error in Create: ' + textStatus);
                        }
                    });
                };
                //create function 

                // Create handler
                self.Create = function (model, event) {
                    console.log("Hello");
                    alert("Hello");
                    var recordAttrs = {DepartmentId: model.deptId(), DepartmentName: model.deptName(), LocationId: model.locationId(), ManagerId: model.managerId()};
                    this.DeptCol().create(recordAttrs, {wait: true,
                        contentType: 'application/vnd.oracle.adf.resource+json',
                        success: function (model, response) {
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Error in Create: ' + textStatus);
                        }
                    });
                };


                //end of create function

                self.buildModel = function ()
                {
                    return {
                        'DepartmentId': self.deptId(),
                        'DepartmentName': self.deptName(),
                        'LocationId': self.locationId(),
                        'ManagerId': self.managerId()
                    };
                },
                        self.resetFields = function ()
                        {
                            console.log('in reset');
                            alert('sf');
                            self.deptId('');
                            self.deptName('');
                            self.locationId('');
                            self.managerId('');

                        },
                        self.Create = function ()
                        {
                            console.log('Create');


                        },
                        self.Delete = function ()
                        {
                            console.log('Create');


                        },
                        self.Update = function ()
                        {
                            console.log('Update');


                        };

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new DashboardViewModel();
        }
);
