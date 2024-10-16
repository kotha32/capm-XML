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

            let mParameters = {
                contexts: aSelectedContexts[0],
                label: 'Confirm',
                invocationGrouping: true
            };

            // Create a status text element
            var oStatusText = new Text({ text: "Starting to Fetch XML Data" });

            // Create a TextArea for displaying the XML data
            var oXMLDataTextArea = new TextArea({
                width: "100%",
                rows: 10,
                editable: false,
                value: ""
            });

            var oDialog = new Dialog({
                title: "Fetching Details",
                content: [oStatusText, oXMLDataTextArea],
                beginButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: "Render PDF",
                    press: async () => { 
                        try {
                            const xmlData = oXMLDataTextArea.getValue(); // Get XML data from TextArea
                            await this.renderPdf(xmlData); // Call renderPdf function with the fetched XML data
                            MessageToast.show("PDF rendered successfully! Check the console for base64.");
                        } catch (error) {
                            console.error("Error rendering PDF:", error);
                            MessageToast.show("Error rendering PDF.");
                        }
                        oDialog.close();
                    }
                })
            });

            oDialog.open();

            // Invoke the action to fetch the product data
            this.editFlow.invokeAction('capm.data', mParameters)
                .then(function (result) {
                    const abc = result.getObject().value; // Assuming this is the Base64 data you want to display
                    oXMLDataTextArea.setValue(abc); // Set the fetched Base64 data in TextArea
                    oStatusText.setText("XML Data fetched successfully."); // Update status text
                })
                .catch(function (error) {
                    console.error("Error fetching product data:", error);
                    oStatusText.setText("Error fetching product data."); // Update status on error
                });
        },

        renderPdf: async function (xmlData) {
            console.log("PDF rendering initiated with data:", xmlData);
            // Add your PDF rendering logic here
        }
    };
});