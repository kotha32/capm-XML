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
            // Create a status text element
            var oStatusText = new Text({ text: "Starting to Fetch Student XML Data" });

            // Create a TextArea for displaying the XML data
            var oXMLDataTextArea = new TextArea({
                width: "100%",
                rows: 10,
                editable: false, 
                value: "" 
            });

            // Create a dialog to show the status and XML data
            var oDialog = new Dialog({
                title: "Fetching Student Details",
                content: [oStatusText, oXMLDataTextArea],
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

            oDialog.open();

            // Send the AJAX request to fetch student data
            jQuery.ajax({
                url: "/odata/v4/capm/data", // Adjusted endpoint for student data
                method: "POST",  // Assuming POST based on your previous example
                contentType: "application/json",

                success: function (oData) {
                    console.log("Student XML Data: ", oData);

                    oStatusText.setText("Student XML fetched successfully!");

                    // Convert the response to a readable format (assuming it's JSON encoded as XML string)
                    oXMLDataTextArea.setValue(JSON.stringify(oData, null, 2));  // Display the JSON string for now
                },

                error: function (oError) {
                    console.error("ERROR fetching student data: ", oError);
                    oStatusText.setText("Error fetching student data!");
                },
            });
        }
    };
});
