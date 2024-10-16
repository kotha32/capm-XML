const cds = require('@sap/cds');
const json2xml = require('json2xml');
const axios = require('axios');
module.exports = cds.service.impl(async function () {
const {student}=this.entities
    this.on('data','student', async (req) => {
        console.log(req.params);
        const { ID } = req.params[0];  
        const mentor = await SELECT.one.from(student).where({ ID: ID });

        if (!mentor) {
            return req.error(404, `No data found for ID: ${ID}`);
        }

        console.log("Row data:", mentor);

        const xmlfun = (mentor) => {

            const xmlData = json2xml({student: mentor}, {header: true});
            return xmlData;
        }

        const callxml = xmlfun(mentor);


        console.log("Generated XML:", callxml);
        const base64EncodedXML = Buffer.from(callxml).toString('base64');

        console.log("Base64 Encoded XML:", base64EncodedXML);
        try {
          const authResponse = await axios.get('https://chembonddev.authentication.us10.hana.ondemand.com/oauth/token', {
              params: {
                  grant_type: 'client_credentials'
              },
              auth: {
                  username: 'sb-ffaa3ab1-4f00-428b-be0a-1ec55011116b!b142994|ads-xsappname!b65488',
                  password: 'e44adb92-4284-4c5f-8d41-66f8c1125bc5$F4bN1ypCgWzc8CsnjwOfT157HCu5WL0JVwHuiuwHcSc='
              }
          });
          const accessToken = authResponse.data.access_token;
          console.log("Access Token:", accessToken);
          const pdfResponse = await axios.post('https://adsrestapi-formsprocessing.cfapps.us10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName', {
              xdpTemplate: "PrePrintedLabel/Default",
              xmlData: base64EncodedXML, 
              formType: "print",
              formLocale: "",
              taggedPdf: 1,
              embedFont: 0
          }, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
              }
          });
          const fileContent = pdfResponse.data.fileContent;
          console.log("File Content:", fileContent);
          return fileContent;

      } catch (error) {
          console.error("Error occurred:", error);
          return req.error(500, "An error occurred while processing your request.");
      }
        

       
    });
});