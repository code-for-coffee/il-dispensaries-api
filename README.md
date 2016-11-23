# Illinois Dispensary API: http://illinoisdispensaries.space/ 

The first public API for Illinois dispensaries. This is an open project that is aimed to publish data released via **IDFPR**'s [Medical Cannabis Pilot Program](http://www.idfpr.com/profs/medcan.asp).

## Data Sources

* http://www.idfpr.com/Forms/MC/ListofLicensedDispensaries.pdf

## Sample Usage 

```javascript
$.getJSON('http://illinoisdispensaries.space/api-v1', function(data) {
	console.log(data);
});
```

## Technology

This is a full stack application written in Node.js with Express using  [Sails](http://sailsjs.org). It requires LTS support of Node (v4.~). Grunt tasks have been disabled for future builds and will be migrated to Gulp. This is due to references in the Grunt tasks with Sails.js internally. It appears that it relied on hardcoded entries into `node_modules/` that are no longer up-to-date and I do not want to modify the core of the Sails.js framework for a simple API.

## Data Models

#### Dispensary

* Access via `/api-v1`

```javascript
attributes: {
  name: {
    type: 'string',
    required: true
  },
  address: {
    type: 'string',
    required: true
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
```

#### Maintenance Notes

##### MongoDB Importing

`mongoimport --collection dispensary --file dispensary.json --type json -d il-dispensary-api --jsonArray`
