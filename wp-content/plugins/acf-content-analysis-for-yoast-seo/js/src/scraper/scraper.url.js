/* global _ */

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( field.type !== "url" ) {
			return field;
		}

		field.content = field.$el.find( "input[type=url][id^=acf]" ).val();

		return field;
	} );

	return fields;
};

module.exports = Scraper;
