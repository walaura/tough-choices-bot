var photoGetter = require('./lib/photoGetter.js');
var makeColors = require('./lib/makeColors.js');
var random = require('./lib/random.js');

var capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var people = require('./data/people.js');
var things = require('./data/things.js');
var verbs = require('./data/verbs.js');

var query = '';

var posts = [];


var makeChoices = function() {

	var sameVerb = Math.random() > .75;
	var choices = [];

	var makeChoice = function(params) {

		var useables = ['person','thing'];

		if(!params) params = {};

		if(!params.verb) params.verb = random(verbs);
		if(!params.personObject) params.personObject = random(people);
		if(!params.thing) params.thing = random(things);
		if(!params.use) params.use = random([0,1]);

		params.person = capitalizeFirstLetter(params.personObject.name);
		params.verb = params.verb.replace('$1',random(things));

		if (params.use === 0) query = params.personObject.search;

		return capitalizeFirstLetter(params.verb)+' '+params[useables[params.use]];

	}

	if(sameVerb) {
		var verb = random(verbs);
		choices.push(makeChoice({
			verb: verb
		}));
		choices.push(makeChoice({
			verb: verb
		}));
	}
	else {
		choices.push(makeChoice());
		choices.push(makeChoice());
	}

	return choices;

}


var makeCss = function() {

	var css = require('template/post.css');

	var alignments = ['left','right'];
	var alignmentsWithCenter = ['left','right','center'];
	var verticalAlignments = ['top','bottom'];

	var alignment = random(alignments);
	var verticalAlignment = random(verticalAlignments);

	css = css
	.replace(new RegExp('-@align-vertical-alt-', 'g'),verticalAlignment)
	.replace(new RegExp('-@align-vertical-', 'g'),verticalAlignment === verticalAlignments[0]?verticalAlignments[1]:verticalAlignments[0])
	.replace(new RegExp('-@align-with-center-', 'g'),random(alignmentsWithCenter))
	.replace(new RegExp('-@align-alt-', 'g'),alignment)
	.replace(new RegExp('-@align-', 'g'),alignment === alignments[0]?alignments[1]:alignments[0])
	.replace(new RegExp('-@negaposi-alt-', 'g'),random(['-','']))
	.replace(new RegExp('-@negaposi-', 'g'),random(['-','']));

	css = css
	.replace(/\-@\-maybe\-\{([\s\S]+?)\}/mg,function(match,m1){
		return Math.random()>.5?m1:'';
	})

	$('head').append(
		$('<style></style>').text(css)
	);
}


var makePost = function() {

	var $post = $('<post></post>');

	var layout = random([0,1,2,3,4]);
	var choices = makeChoices();

	if(!query) {
		query = random(people).query;
	}

	var getPhotos = new photoGetter(query,{
		debug: true
	});

	$post.addClass('layout-'+layout);
	$post.append('<x1></x1><x2></x2><x3></x3>');

	var $choices = $('<choices></choices>');

	choices.map(function(choice){
		$choices.append('<choice><span>'+choice);
	})
	$post.append($choices);

	getPhotos.done(function(photos){
		$post.append($('<bg></bg>').css({backgroundImage:'url('+photos[0]+')'}))
	})


	$('body').append($post);

}



module.exports = (function(){

	var lib = {};

	lib.makePost = makePost;
	lib.posts = posts;

	makeCss();

	return lib;
})()
