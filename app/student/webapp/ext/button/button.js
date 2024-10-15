/* sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/TextArea",
    "sap/m/MessageBox"
], function (MessageToast, Dialog, Button, Text, TextArea, MessageBox) {
    'use strict';

    return {
        fetch: function () {
            var messageTimeout;

            // Create a status text element
            var oStatusText = new Text({ text: "Starting to fetch documents..." });

            // Initialize the dialog for fetching status
            var oDialog = new Dialog({
                title: "Fetching Details",
                content: [oStatusText],
                beginButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                        clearTimeout(messageTimeout);
                    }
                })
            });

            oDialog.open();

            // Update the dialog status text
            function updateStatus(message, closeDialog = false) {
                oStatusText.setText(message);
                if (messageTimeout) clearTimeout(messageTimeout);

                if (closeDialog) {
                    oDialog.close();
                    MessageBox.success("Fetching completed successfully");
                } else {
                    messageTimeout = setTimeout(() => oStatusText.setText(""), 10000);
                }
            }

            // Function to fetch XML data from the backend
            function fetchDocuments() {
                // Use an AJAX call to get the XML data from the CAP service
                $.ajax({
                    url: "http://localhost:4004/odata/v4/capm/student",
                    method: "GET",
                    headers: {
                        "Accept": "application/xml"
                    },
                    success: function (xmlData) {
                        updateStatus("Fetching completed successfully");

                        // Debugging: Log the XML string to ensure it is correct
                        console.log("Fetched XML Data:", xmlData);

                        // Create a TextArea to display the XML data
                        var oTextArea = new TextArea({
                            value: new XMLSerializer().serializeToString(xmlData),
                            rows: 20,
                            cols: 60,
                            editable: false,
                            wrapping: "Soft"
                        });

                        // Replace the status text with the TextArea in the dialog content
                        oDialog.removeAllContent();
                        oDialog.addContent(oTextArea);
                    },
                    error: function (xhr, status, error) {
                        // Debugging: Log any errors that occur during the request
                        console.error("Error fetching documents:", error);
                        updateStatus("Error fetching documents", true);
                    }
                });
            }

            // Call the fetch function to get data from the backend
            fetchDocuments();
        }
    };
});
 */

/* sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/TextArea",
    "sap/m/MessageBox"
], function (Dialog, Button, TextArea, MessageBox) {
    'use strict';

    return {
        fetch: function () {
            var oDialog = new Dialog({
                title: "Fetching Student Data in XML",
                content: new TextArea({
                    value: "Fetching data...",
                    rows: 20,
                    cols: 80,
                    editable: false,
                    wrapping: "Soft"
                }),
                beginButton: new Button({
                    text: "Close",
                    press: function () {
                        oDialog.close();
                    }
                })
            });

            oDialog.open();

            // Function to fetch XML data from the backend
            function fetchDocuments() {
                // Use AJAX to call the backend and retrieve XML data
                $.ajax({
                    url: "http://localhost:4004/odata/v4/capm/student",
                    method: "GET",
                    headers: {
                        "Accept": "application/xml"
                    },
                    success: function (xmlData) {
                        var xmlString = new XMLSerializer().serializeToString(xmlData);

                        // Update the dialog content with fetched XML
                        var oTextArea = oDialog.getContent()[0];
                        oTextArea.setValue(xmlString);
                    },
                    error: function (xhr, status, error) {
                        // Display error message if fetching fails
                        MessageBox.error("Error fetching data: " + error);
                    }
                });
            }

            // Fetch the data after opening the dialog
            fetchDocuments();
        }
    };
});
 */

sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/TextArea",
    "sap/m/MessageBox"
], function (Dialog, Button, TextArea, MessageBox) {
    'use strict';

    return {
        fetch: function () {
            var oDialog = new Dialog({
                title: "Fetching Student Data in XML",
                content: new TextArea({
                    value: "Fetching data...",
                    rows: 20,
                    cols: 80,
                    editable: false,
                    wrapping: "Soft"
                }),
                beginButton: new Button({
                    text: "Close",
                    press: function () {
                        oDialog.close();
                    }
                })
            });

            oDialog.open();

            // Function to fetch XML data from the backend
            function fetchDocuments() {
                // Use AJAX to call the backend and retrieve XML data
                $.ajax({
                    url: "http://localhost:4004/odata/v4/capm/student",
                    method: "GET",
                    headers: {
                        "Accept": "application/xml"
                    },
                    success: function (xmlData) {
                        var xmlString = new XMLSerializer().serializeToString(xmlData);

                        // Update the dialog content with fetched XML
                        var oTextArea = oDialog.getContent()[0];
                        oTextArea.setValue(xmlString);
                    },
                    error: function (xhr, status, error) {
                        // Display error message if fetching fails
                        MessageBox.error("Error fetching data: " + error);
                    }
                });
            }

            // Fetch the data after opening the dialog
            fetchDocuments();
        }
    };
});
