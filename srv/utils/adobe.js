const { struct } = require("@sap/cds");

var num = {
    "uri": "https://adsrestapi-formsprocessing.cfapps.us10.hana.ondemand.com",
    "clientid": "sb-d048091c-4a76-4da3-a23e-9b375d1dacd1!b142994|ads-xsappname!b65488",
    "clientsecret": "ea0f7840-8901-4cd0-935e-74060b93a875$9NsNX51HL0kkIpd3FfEi46Gcvs90zYngyxTBJTItSSw=",
    "url": "https://chembonddev.authentication.us10.hana.ondemand.com"
};

var accessToken;

jQuery.ajax({
    url: num.url + "/oauth/token",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    headers: {
        "Authorization": "Basic " + btoa(num.clientid + ":" + num.clientsecret)
    },
    data: {
        "grant_type": "client_credentials"
    },
    success: function(response) {
        accessToken = response.access_token;
        console.log("Access Token:", accessToken);
    },
    error: function(xhr, status, error) {
        console.error("Error obtaining access token:", error);
    }   
});