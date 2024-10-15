const cds = require('@sap/cds');
const { XMLParser } = require('fast-xml-parser');
const { Buffer } = require('buffer');

module.exports = cds.service.impl(async function () {
    const { student } = this.entities;

    // Event handler to fetch student data and return as XML
    this.on('data', async (req) => {
        try {
            const students = await SELECT.from(student); // Ensure SELECT is imported from '@sap/cds'
            const xmlData = jsonToXmlStudent(students);

            if (!validateXml(xmlData)) {
                throw new Error("Invalid XML format for student data");
            }

            const base64Data = Buffer.from(xmlData).toString('base64');
            return base64Data;
        } catch (error) {
            console.error("Error fetching student data:", error);
            return Buffer.from("<error>Failed to fetch student data</error>").toString('base64');
        }
    });

    // Function to convert students JSON to XML
    function jsonToXmlStudent(jsonData) {
        if (!Array.isArray(jsonData)) {
            return "<error>Invalid JSON data provided for students</error>";
        }

        let xml = '<?xml version="1.0" ?>\n<students>\n';
        jsonData.forEach(item => {
            xml += '    <student>\n';
            xml += `        <name>${item.name || 'N/A'}</name>\n`;
            xml += `        <addr1>${item.addr1 || 'N/A'}</addr1>\n`;
            xml += `        <addr2>${item.addr2 || 'N/A'}</addr2>\n`;
            xml += `        <city>${item.city || 'N/A'}</city>\n`;
            xml += `        <state>${item.state || 'N/A'}</state>\n`;
            xml += `        <pincode>${item.pincode || 'N/A'}</pincode>\n`;
            xml += `        <phone>${item.phone || 'N/A'}</phone>\n`;
            xml += '    </student>\n';
        });

        xml += '</students>';
        return xml;
    }

    // Function to validate XML structure
    function validateXml(xmlData) {
        const parser = new XMLParser();
        try {
            parser.parse(xmlData);
            return true; 
        } catch (error) {
            console.error("XML validation error:", error);
            return false;
        }
    }
});
