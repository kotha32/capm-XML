const cds = require('@sap/cds');
const { XMLParser } = require('fast-xml-parser');
const { Buffer } = require('buffer');

module.exports = cds.service.impl(async function () {
    const { student } = this.entities;

    this.on('data', 'student', async (req) => {
        try {
            // Ensure that req.params is not empty and has the expected structure
            if (!req.params || !Array.isArray(req.params) || req.params.length === 0) {
                throw new Error("Invalid request parameters");
            }

            const { ID } = req.params[0];

            // Fetch the product based on ID
            const pro = await SELECT.one.from(student).where({ ID: ID });

            if (!pro) {
                throw new Error("Product not found");
            }

            console.log(pro);
            const xmlData = jsonToXml(pro);
            console.log(xmlData);

            if (!validateXml(xmlData)) {
                throw new Error("Invalid XML format");
            }

            const base64Data = Buffer.from(xmlData).toString('base64');
            return base64Data;
        } catch (error) {
            console.error("Error fetching product data:", error);
            return Buffer.from("<error>Failed to fetch product data</error>").toString('base64');
        }
    });

    function jsonToXml(jsonData) {
        // Handle single product object instead of an array
        if (Array.isArray(jsonData)) {
            jsonData = jsonData[0]; // Use the first product in the array
        }

        let xml = '<?xml version="1.0" ?>\n<products>\n';
        xml += '    <product>\n';
        xml += `        <product_id>${jsonData.name || 'N/A'}</product_id>\n`;
        xml += `        <product_name>${jsonData.addr1 || 'N/A'}</product_name>\n`;
        xml += `        <product_img>${jsonData.addr2 || 'N/A'}</product_img>\n`;
        xml += `        <product_sell>${jsonData.city || 'N/A'}</product_sell>\n`;
        xml += `        <product_cost>${jsonData.state || 'N/A'}</product_cost>\n`;
        xml += `        <product_sell>${jsonData.pincode || 'N/A'}</product_sell>\n`;
        xml += `        <product_cost>${jsonData.phone || 'N/A'}</product_cost>\n`;
        
        xml += '    </product>\n';
        xml += '</products>';
        return xml;
    }

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