const Joi = require('@hapi/joi');
const moment = require('moment');

/**
 * This method returns @hap/joi schema to validate
 * is given datetime is greater than current time.
 * It assumes, timezone is in utc
 * and takes Date time in format YYYY-MM-DD HH:mm:ss
 */
module.exports.isSameOrAfter = () => {
	return Joi.extend((joi) => {

		return {
			type: 'isSameOrAfter',
			base: joi.any(),
			messages: {
				'invalid.max': 'Must be same or greater than current time.',
				'invalid.datetime': 'Datetime format YYYY-MM-DD HH:mm:ss'
			},
			validate(value, helpers) {

				const givenDate = moment.utc(value, 'YYYY-MM-DD HH:mm:ss', true);

				if (!givenDate.isValid()) {
					return {
						value,
						errors: helpers.error('invalid.datetime')
					};
				}

				const isSameOrAfter = givenDate.isSameOrAfter(moment.utc())
				if (!isSameOrAfter) {
					return {
						value,
						errors: helpers.error('invalid.max')
					};
				}


			},
			rules: {}
		};
	}).isSameOrAfter();
}