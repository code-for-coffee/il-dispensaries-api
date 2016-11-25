/**
 * DispensaryController
 *
 * @description :: Server-side logic for managing dispensaries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
    Retrieval.create({
      host: req.hostname,
      ip: req.ip,
      date: new Date()
    }).exec(function(err, results) {
      //console.log(results)
    });
		Dispensary.find({}).exec(function(err, dispensaries) {
			if (err) {
				res.json({
					message: 'An error occured when querying the datasource.'
				});
			} else {
				res.json(dispensaries);
			}
		})
	}

};
