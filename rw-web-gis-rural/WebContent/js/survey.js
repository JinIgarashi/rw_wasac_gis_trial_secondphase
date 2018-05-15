var survey = {
		json:{
		    questions: [
		        {
		            name: "name",
		            type: "text",
		            title: "Please enter your name:",
		            placeHolder: "Jon Snow",
		            isRequired: true
		        }, {
		            name: "mobilenumber",
		            type: "text",
		            inputType: "number",
		            title: "Your mobile phone number:",
		            placeHolder: "0712345678",
		            isRequired: true,
		            validators: [
		                {
		                    type: "number"
		                }
		            ]
		        }, {
		            name: "email",
		            type: "text",
		            inputType: "email",
		            title: "Your e-mail (optional):",
		            placeHolder: "info@wasac.rw",
		            isRequired: false,
		            validators: [
		                {
		                    type: "email"
		                }
		            ]
		        }, {
		            type: "dropdown",
		            name: "type_facility",
		            title: "Please select type of facility which you want to report:",
		            isRequired: true,
		            colCount: 0,
		            choices: [
		                "Public Tap",
		                "Water Kiosk",
		                "Hand Pump",
		                "Improved Spring",
		                "Pipeline",
		                "Others"
		            ]
		        }, {
		            type: "dropdown",
		            name: "status_facility",
		            title: "Please select status of facility:",
		            isRequired: true,
		            colCount: 0,
		            choices: [
		                "No water",
		                "No operator",
		                "Water meter is not functional",
		                "There is leakage",
		                "Others"
		            ]
		        }, {
		            type: "dropdown",
		            name: "whenhappened",
		            title: "When did it happened?:",
		            isRequired: true,
		            colCount: 0,
		            choices: [
		                "1 day ago",
		                "3 days ago",
		                "7 days ago",
		                "15 days ago",
		                "30 days ago",
		                "Always",
		            ]
		        }, {
		            type: "comment",
		            name: "suggestions",
		            title: "Please leave your comments for our services?"
		        }
		    ]
		},
		
		getParams:function(){
			var url   = $(location).attr('search');
			if (!url){
				return;
			}
			params   = url.replace("?","").split("&");
			var paramArray = {};
			for ( i = 0; i < params.length; i++ ) {
			    neet = params[i].split("=");
			    paramArray[neet[0]] = neet[1];
			}
			return paramArray;
		},
		
		init:function(){
			var params = survey.getParams();
			if (params){
				survey.json.questions.push({
		            name: "lng",
		            type: "text",
		            inputType: "number",
		            defaultValue:params['lng'],
		        	visible: false
		        });
				survey.json.questions.push({
		            name: "lat",
		            type: "text",
		            inputType: "number",
		            defaultValue:params['lat'],
		            visible: false
		        });
			}
			
			var model = new Survey.Model(survey.json);
			model
			    .onComplete
			    .add(function (result) {
			    	//send data JSON.stringify(result.data)
			    	alert("Thanks, " + result.data.name + ". We will reply to you later about the issue.");	
			    	window.open('', '_self', ''); 
			    	window.close();
			    });

			$("#surveyElement").Survey({model: model});
		}
}

$(document).ready(function() {
	survey.init();
});