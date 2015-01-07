var settings=require('./settings.json')

var sendgrid=require('sendgrid')(settings.userName, settings.password);

module.exports={name:"sendgrid", "trigger":{}, "actions":[{name:"send", fields:[{ name:"to", displayName:"A"},{ name:"subject", displayName:"Sujet"}{ name:"body", displayName:"Message"}], delegate:function(fields){
        var result= function(fields){
			try
			{
				sendgrid.send($.extend({}, fields, settings), function(err, result){
					if(err)
						console.log(err);
				});
			}
			catch (ex)
			{
				console.log(ex);
			}
        };
        result.fields=fields;
        return result;
}}]}