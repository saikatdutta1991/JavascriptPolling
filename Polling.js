/******************************************************************************

author : saikat dutta
description : This class can be used to make short polling and as well as long polling.
			  To know more see the bottom example. This is very simple class for polling
			  not very efficient.

dependency : This class needs jQuery for ajax call.

******************************************************************************/

var Polling = function(config, sCallback, errCallback, scope, pollTimeStep = 5)
{

	/* initializing construct properties */
	this.config        = config ? config : {};
	this.url           = config.url ? config.url : "";
	this.requestMethod = config.requestMethod ? config.requestMethod : "GET";
	this.requestData   = config.requestData ? config.requestData : {};
	this.scope         = scope;
	this.sCallback      = sCallback;
	this.errCallback   = errCallback;
	this.pollTimeStep  = pollTimeStep;


	//base on this property this class will request to server
	this.polling = false;



	this.ajaxSuccessCallback = function(response)
	{
		this.sCallback.call(this, response);
		this.polling = false;
	}


	this.ajaxErrorCallback = function(jqXHR, textStatus, errorThrown)
	{
		this.errCallback.call(this, jqXHR, textStatus, errorThrown);
		this.polling = false;
	}


	this.intervalCallback = function()
	{
		if(this.polling) return;

		$.ajax({
			type    : this.requestMethod,
			url     : this.url,
			data    : this.requestData,
			success : this.ajaxSuccessCallback.bind(this),
			error   : this.ajaxErrorCallback.bind(this)
		});

		this.polling = true;
		
	}


	/* this method will start the pollig with every pollTimeStep */
	this.startPoll = function()
	{
		this.intervalObject = setInterval(this.intervalCallback.bind(this), this.pollTimeStep);
	}


	/* this method will stop the polling by removing interval timer */
	this.stopPoll = function()
	{
		clearInterval(this.intervalObject);
	}
	

}



/*example code*/

// var poll = new Polling(
// 	{
// 		url : "http://localhost/test.php",
// 		requestMethod : 'GET',
// 		requestData : {}
// 	}, 
// 	function(response){
// 		console.log(response);
// 	},
// 	function(adf,textStatus,aasf){
// 		console.log(textStatus);

// 	},
// 	window, 
// 	1000
// );


// poll.startPoll();
// poll.stopPoll();

/*end example*/