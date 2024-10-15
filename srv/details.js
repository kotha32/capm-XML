/* const cds = require('@sap/cds');
const xmlbuilder = require('xmlbuilder');

module.exports = cds.service.impl(async function () {

    const { data } = this.entities;

    // Handle requests to `/students` endpoint
    this.on('READ', data, async (req) => {
        const studentsData = await cds.tx(req).run(req.query);

        // Check if the request asks for XML format
        if (req.http && req.http.headers['accept'] === 'application/xml') {
            // Convert JSON to XML
            const xmlResponse = jsonToXml({ students: studentsData });
            return req.res.type('application/xml').send(xmlResponse);
        } else {
            // Return JSON by default
            return studentsData;
        }
    });

    // JSON to XML Conversion function
    function jsonToXml(jsonObject) {
        const xml = xmlbuilder.create('root');

        // Loop through each student in the array
        jsonObject.students.forEach(student => {
            const studentNode = xml.ele('student');
            Object.keys(student).forEach(key => {
                studentNode.ele(key, student[key]);
            });
        });

        // Return the XML string
        return xml.end({ pretty: true });
    }
});
 */

/* const cds = require('@sap/cds');
const xmlbuilder = require('xmlbuilder');

module.exports = async (srv) => {

    // Handle the 'READ' operation for 'student' entity
    srv.on('READ', 'student', async (req) => {
        // Fetch student data
        const students = await cds.tx(req).run(req.query);

        // Check if the client requested XML format
        if (req._.req.headers.accept && req._.req.headers.accept.includes('application/xml')) {
            // Convert the student data to XML
            const xmlData = convertToXml(students);
            req._.res.setHeader('Content-Type', 'application/xml');
            req._.res.end(xmlData);
        } else {
            // Default to JSON response
            return students;
        }
    });

    // Function to convert JSON data to XML format
    function convertToXml(jsonData) {
        const root = xmlbuilder.create('root');

        jsonData.forEach(student => {
            const studentElem = root.ele('student');
            studentElem.ele('ID', student.ID);
            studentElem.ele('name', student.name);
            studentElem.ele('addr1', student.addr1);
            studentElem.ele('addr2', student.addr2);
            studentElem.ele('city', student.city);
            studentElem.ele('state', student.state);
            studentElem.ele('pincode', student.pincode);
            studentElem.ele('phone', student.phone);
        });

        return root.end({ pretty: true });
    }
};
 */

const cds = require('@sap/cds');
const xmlbuilder = require('xmlbuilder');

module.exports = async (srv) => {
    // Handle the 'READ' operation for 'student' entity
    srv.on('READ', 'student', async (req) => {
        try {
            // Fetch student data from the database
            const students = await cds.tx(req).run(req.query);

            // If no data is found, return an empty array
            if (!students || students.length === 0) {
                return []; // Return an empty array if no students found
            }

            // Ensure that we have a proper request object
            if (req && req.headers) {
                // Check if the client requested XML format
                const acceptHeader = req.headers['accept'];
                if (acceptHeader && acceptHeader.includes('application/xml')) {
                    // Convert the student data to XML
                    const xmlData = convertToXml(students);
                    req.res.setHeader('Content-Type', 'application/xml');
                    req.res.end(xmlData);
                    return; // Ensure we return here to avoid further processing
                } else {
                    // Default to JSON response if XML is not requested
                    return students; // Return students data as JSON
                }
            } else {
                // If the request object is not valid
                throw new Error("Invalid request object");
            }
        } catch (error) {
            console.error("Error in READ operation:", error);
            req.reject(500, "Error fetching student data");
        }
    });

    // Function to convert JSON data to XML format
    function convertToXml(jsonData) {
        const root = xmlbuilder.create('students');

        jsonData.forEach(student => {
            const studentElem = root.ele('student');
            studentElem.ele('ID', student.ID);
            studentElem.ele('name', student.name);
            studentElem.ele('addr1', student.addr1);
            studentElem.ele('addr2', student.addr2);
            studentElem.ele('city', student.city);
            studentElem.ele('state', student.state);
            studentElem.ele('pincode', student.pincode);
            studentElem.ele('phone', student.phone);
        });

        return root.end({ pretty: true });
    }
};
