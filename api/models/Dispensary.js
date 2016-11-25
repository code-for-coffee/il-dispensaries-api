/**
* Dispensary.js
*
* @description :: Basic model for a Dispensary object.
* @docs        :: https://github.com/code-for-coffee/il-dispensaries-api/README.md
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    phone: {
      type: 'string',
      required: true
    },
    city: {
      type: 'string',
      required: true
    },
    lat: {
      type: 'string'
    },
    long: {
      type: 'string'
    },
    medicalCannabisDistrict: {
      type: 'integer',
      required: true
    },
    licenseIssueDate: {
      type: 'date',
      required: true
    },
    licenseExpirationDate: {
      type: 'date',
      required: true
    },
    credentialNumber: {
      type: 'string',
      required: true
    },
    registryId: {
      type: 'string',
      required: true
    }
  }

};
