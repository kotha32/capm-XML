const cds = require('@sap/cds');
const { create } = require('xmlbuilder2');

module.exports = cds.service.impl(async function () {
    const { student } = this.entities; // Define the entity

    this.on('data', 'student', async (req) => {
        console.log(req.params); // Log the request parameters
        const { ID } = req.params[0];  

        // Fetch the student record by ID
        const rowData = await SELECT.one.from(student).where({ ID : ID});

        // Check if the student data was found
        if (!rowData) {
            return req.error(404, `No data found for ID: ${ID}`);
        }

        console.log("Row data:", rowData); // Log the fetched row data

        // Create XML from the rowData
        const xmlData = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('student')  // Root element
            .ele('ID').txt(rowData.ID).up()
            .ele('name').txt(rowData.name).up()
            .ele('addr1').txt(rowData.addr1).up()
            .ele('addr2').txt(rowData.addr2).up()
            .ele('city').txt(rowData.city).up()
            .ele('state').txt(rowData.state).up()
            .ele('pincode').txt(rowData.pincode).up()
            .ele('phone').txt(rowData.phone).up()
            .end({ prettyPrint: true }); // Pretty print the XML

        console.log("Generated XML:", xmlData); // Log the generated XML

        // Return the generated XML as a string
        return xmlData;  
    });
});
