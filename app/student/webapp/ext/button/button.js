sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "jquery.sap.global",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/TextArea"
], function (MessageToast, JSONModel, jQuery, Dialog, Text, Button, TextArea) {
    'use strict';

    return {
        fetch: function (oBindingContext, aSelectedContexts) {
            console.log(aSelectedContexts);

            // Ensure selected contexts are available
            if (!aSelectedContexts || aSelectedContexts.length === 0) {
                MessageToast.show("No items selected.");
                return;
            }

            let mParameters = {
                contexts: aSelectedContexts,
                label: 'Confirm',
                invocationGrouping: true  // Fixed capitalization
            };

            // Create a status text element
            var oStatusText = new Text({ text: "Starting to Fetch Student Data" });

            // Create a TextArea for displaying the student data
            var oDataTextArea = new TextArea({
                width: "100%", // Adjusted width to a sensible value
                rows: 20,
                editable: false,
                value: ""
            });

            // Create a dialog to show the status and student data
            var oDialog = new Dialog({
                title: "Fetching Student Details",
                content: [oStatusText, oDataTextArea],
                beginButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: "OK",
                    press: function () {
                        oDialog.close();
                    }
                })
            });

            // Open the dialog
            oDialog.open();

            // Fetch student data using the action
            this.editFlow.invokeAction('capm.data', mParameters) // Fixed mParameters variable name
                .then(function (result) { // Corrected the arrow function syntax
                    // Assuming result contains the data you want to display
                    oDataTextArea.setValue(result); // You may need to format this based on actual result structure
                    oStatusText.setText("Student Data Fetched Successfully");
                })
                .catch(function (error) { // Added error handling
                    console.error("Error fetching student data:", error);
                    MessageToast.show("Error fetching student data.");
                    oStatusText.setText("Error fetching student data.");
                });
        }
    };
});
