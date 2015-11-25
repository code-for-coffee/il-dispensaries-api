/**
 * DispensaryController
 *
 * @description :: Server-side logic for managing dispensaries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {

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
