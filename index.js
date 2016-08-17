var settings=require('./settings.json')

var sendgrid=require('sendgrid')(settings.userName, settings.password);

module.exports={
    name:"sendgrid", 
    "trigger":{}, 
    "actions":[
        {
            name:"send", 
            fields:[
                { name:"to", displayName:"A"},
                { name:"subject", displayName:"Sujet"},
                { name:"text", displayName:"Message"}
            ],
            delegate:function(fields){
                var result=function(fields){
                    var helper = require('sendgrid').mail
                    from_email = new helper.Email(settings.from)
                    to_email = new helper.Email(fields.to)
                    subject = fields.subject
                    content = new helper.Content('text/plain', fields.text)
                    mail = new helper.Mail(from_email, subject, to_email, content)

                    var sg = require('sendgrid')(settings.apiKey);
                    var request = sg.emptyRequest({
                        method: 'POST',
                        path: '/v3/mail/send',
                        body: mail.toJSON()
                    });

                    sg.API(request, function(error, response) {
                        console.log(response.statusCode)
                        console.log(response.body)
                        console.log(response.headers)
                    })
                };
                result.fields=fields;
                return result;
            }
        }
    ]
};