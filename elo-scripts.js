// ko.validation.rules.pattern.message = 'Invalid.';

// ko.validation.init({
//     registerExtenders: true,
//     messagesOnModified: true,
//     insertMessages: true,
//     parseInputAttributes: true,
//     messageTemplate: null
// }, true);

function submissionViewModel() {
	var self = this;

	/*================================
	=            >Config             =
	================================*/

	this.settings = {
		minStep: 1,
		maxStep: 5,
		award  : '',
	};

	this.stepValues = [
		//Empty First item. Never used. Just keeps the index look up easy.
		{
			"text" : "",
			"class" : "",
			"id" : ""
		},
		{
			"text"  : "Step 1 of 4: Contact Info",
			"class" : "zero",
			"id"    : "step-one"
		},
		{
			"text"  : "Step 2 of 4: Submission Information",
			"class" : "one-fourth",
			"id"    : "step-two"
		},
		{
			"text"  : "Step 3 of 4: Verify Submission",
			"class" : "half",
			"id"    : "step-three"
		},
		{
			"text"  : "Step 4 of 4: Terms And Conditions",
			"class" : "three-fourths",
			"id"    : "step-four"
		},
		{
			"text"  : "Submission Complete",
			"class" : "complete",
			"id"    : "step-five"
		}
	];

	/*-----  End of Config  ------*/
	
	/*====================================
	=            >Form Values            =
	====================================*/

	/*==========  >>Observed Values  ==========*/

	this.submissionType = ko.observable("I am submitting my own work");


	/*==========  >>>Author  ==========*/
	
	this.author = ko.validatedObservable({
		name: ko.observable()
			.extend({
				required: true,
				minLength: 2,
				maxLength: 30,
				pattern: {
					params: '^[a-zA-Z]+(?:\s| )[a-zA-Z]+$',
					message: 'Please enter first and last name'
				}
			}),

		email: ko.observable()
			.extend({
				required: true,
				email: {
					params: true,
					message: 'Please enter a valid email'
				}
			}),

		tel: ko.observable()
			.extend({
				pattern: {
					minLength: 10,
					params: '^[0-9()\-\s ]+$',
					message: 'Please enter a valid phone number'
				}
			}),

		add1: ko.observable()
			.extend({
				required: true
			}),

		add2: ko.observable()
			.extend(),

		city: ko.observable()
			.extend({
				required: true,
				pattern: {
					params: '^[a-zA-Z\s ]+$',
					message: 'Please enter a valid city. No numbers or symbols may be used'
				}
			}),

		state: ko.observable()
			.extend({
				required: true,
				minLength: 2,
				maxLength: 12,
				pattern: {
					params: '^[a-zA-Z\s ]+$',
					message: 'Please enter a valid state. No number or symbaols may be used'
				}
			}),
		country: ko.observable()
			.extend({
				required: true,
				pattern: {
					params: '^[a-zA-Z\s ]+$',
					message: 'Please enter a valid state or province. No number or symbols may be used'
				}
			}),
		zip: ko.observable()
			.extend({
				required: true,
				minLength: 5,
				maxLength: 5,
				pattern: {
					params: '^[a-zA-Z0-9\s ]+$',
					message: 'Please enter a valid postal code'
				}
			})
	});
	/*-----  End of Author  ------*/

	/*==========  >>>Nominator  ==========*/
	this.isNomination = ko.computed(function() {

		var response = self.submissionType();

		return (response === "I am submitting my own work")? false : true ;

	});
	this.nominator = ko.validatedObservable({
		name: ko.observable()
			.extend({
				required: {
					onlyIf: function(){ return self.isNomination();}
				},
				minLength: 2,
				maxLength: 12,
				pattern: {
					params: '^[a-zA-Z]+(?:\s| )[a-zA-Z]+$',
					message: 'Please enter a first and last name'
				}
			}),

		email: ko.observable()
			.extend({
				required: {
					onlyIf: function(){ return self.isNomination();}
				},
				email: true
			}),

		tel: ko.observable()
			.extend({
				required: {
					onlyIf: function(){ return self.isNomination();}
				},
				pattern: {
					minLength: 10,
					params: '^[0-9()\-\s ]+$',
					message: 'Please enter a valid phone number'
				}
			}),

		add1: ko.observable()
			.extend({
				required: {
					onlyIf: function(){ return self.isNomination();}
				}
			}),

		add2: ko.observable(),

		city: ko.observable()
			.extend({
				required: {
					onlyIf: function(){ return self.isNomination();}
				},
				pattern: {
					params: '^[a-zA-Z\s ]+$',
					message: 'Please enter a valid city name. No numbers or symbols may be used'
				}
			}),

		state: ko.observable()
			.extend({
				required: {
					onlyIf: function(){ return self.isNomination();}
				},
				minLength: 2,
				maxLength: 12,
				pattern: {
					params: '^[a-zA-Z\s ]+$',
					message: 'Please enter a valid state or province. No number or symbols may be used'
				}
			}),

		country: ko.observable()
			.extend({
				required: {
					onlyIf: function(){ return self.isNomination();}
				},
				pattern: {
					params: '^[a-zA-Z\s ]+$',
					message: 'Please enter a valid state or province. No number or symbols may be used'
				}
			}),
		zip: ko.observable()
			.extend({
				required: {
					onlyIf: function(){ return self.isNomination();}
				},
				pattern: {
					params: '^[a-zA-Z0-9\s ]+$',
					message: 'Please enter a valid postal code. No special characters'
				}
			})
	});
	/*-----  End of Nominator  ------*/
	
	/*==========  >>>Work  ==========*/

	this.work = ko.validatedObservable({

		title: ko.observable()
			.extend({
				required: true,
			}),
			// @TODO  change label
		pubDate: ko.observable()
			.extend({
				date: true,
				
			}),

		publisher: ko.observable()
			.extend({
				pattern : {
					params: '^[a-zA-Z0-9\s \.\,]+$',
					message: 'Publisher name may not contain special characters'
				}
			}),

		contributors: ko.observable()
			.extend({
				pattern : {
					params: '^[a-zA-Z0-9\s \.\,]+$',
					message: 'Contributors names may not contain special characters'
				}
			}),

		description: ko.observable()
			.extend({
				require: true,
				minLength: 20,
				maxLength: 1600
			}),

		type: ko.observable('upload'),

		url: ko.observable(),

		fileURL: ko.observable()

	});

	/*-----  End of Work  ------*/
	
	/*==========  >>> Meta  ==========*/
	
	this.infoVerified = ko.observable();
	
	/*-----  End of Meta  ------*/
	/*-----  End of Observed Values  ------*/
	
	
	/*==========  >>Computed Values  ==========*/
	

	this.isPublished = ko.computed(function(){

		var hasPubDate = !!self.work().pubDate(),
			hasPublisher = !!self.work().publisher();

			// Excuse my shorthand
			return(hasPubDate || hasPublisher)? true : false ;

	});

	this.fileName = ko.computed(function() {
		var fullPath = self.work()
			.fileURL();
		if (fullPath) {
			var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
			var filename = fullPath.substring(startIndex);
			if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
				filename = filename.substring(1);
			}
			return filename;
		}
	});

	this.workIsUpload = ko.computed(function() {

		if (this.work()
			.type() === 'upload') {
			return true;
		}

		return false;

	}, this);

	this.workIsURL = ko.computed(function() {

		if (this.work()
			.type() === 'link') {
			return true;
		}
		return false;

	}, this);

	this.workIsURL = ko.computed(function() {

		if (this.work()
			.type() === 'link') {
			return true;
		}
		return false;

	}, this);

	/*-----  End of Computed Values  ------*/

	/*-----  End of Form Values  ------*/
	
	/*==========  >>Application Mode Values  ==========*/

	if (window.isNKHalyes === true) {
		
		self.settings.award = 'NKHalyes';

		console.log('Application Configured For N.K. Hayles');
		// Add a medium observable
		self.work.medium = ko.observable()
			.extend({
				require: true
			});

	} else if (window.isRCoover === true) {
		self.settings.award = 'RCoover';
		console.log('Application Configured For R.Coover');
	}
	/*-----  End of Application Mode Values  ------*/
	
	
	/*=====================================
	=            >State Values            =
	=====================================*/

	this.formCounter = ko.observable(1);

	this.formStep = ko.computed(function() {

		if (this.formCounter() < this.settings.minStep) {

			this.formCounter(this.settings.minStep);

		} else if (this.formCounter() > this.settings.maxStep) {

			this.formCounter(this.settings.maxStep);

		}

		return this.formCounter();

	}, this);

	this.progressInfo = ko.computed(function() {
		var step = this.formStep();
		return this.stepValues[step];
	}, this);

	this.userCanProgress = ko.computed(function() {

		switch (self.formStep()) {
			case 1:
				return self.author.isValid() && self.nominator.isValid();

			case 2:
				return self.work.isValid();

			case 3:
				return !!self.infoVerified();

			case 4:
				return false;

			default:
				return false;
		}

	}, this);
	/*-----  End of State Values  ------*/
	
	
	/*=================================
	=            >Controls            =
	=================================*/

	this.scrollToFormTop = function() {
		console.log('scrolling to top');
		jQuery('html, body')
			.animate({

				scrollTop: jQuery("#step-counter")
					.offset()
					.top - 200

			}, 500, 'swing', function() {

				jQuery(self.progressInfo()
					.id)
					.find('input')
					.first()
					.focus();

			});
	};

	this.previousStep = function() {
		var previous = this.formCounter();
		this.formCounter(previous - 1);
		this.scrollToFormTop();
		console.log('previous step', this.formCounter());
	};

	this.nextStep = function() {
		var previous = this.formCounter();
		this.formCounter(previous + 1);
		this.scrollToFormTop();
		console.log('next step', this.formCounter());

	};
	/*-----  End of Controls  ------*/
	
	
}

/*===================================
=            > Intialize            =
===================================*/

(function($) {

	$(document)
		.ready(function() {

			/*==========  >> Prepare data-bindings  ==========*/
			
			$('[data-bind-config]')
				.each(function() {

					var config = $(this)
						.data('bindConfig');

					var target = $(this)
						.find(config.target);

					$(target)
						.attr('data-bind', config.value);

				});

			/*==========  >> Add Placeholder For Date Format  ==========*/
			
			$('[type="date"]').attr('placeholder','mm/dd/yyyy');

			/*==========  >> Intialize KO.js  ==========*/
			

			viewModel = new submissionViewModel();

			ko.applyBindings(viewModel);
			
			/*==========  >> Add Form Submit Action (unused) ==========*/
			
			// $('input[type="submit"]')
			// 	.on('click', viewModel.nextStep);

		});

})(jQuery);