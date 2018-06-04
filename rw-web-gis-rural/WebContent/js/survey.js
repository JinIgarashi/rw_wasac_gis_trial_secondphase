var survey = {
		json:{
			questionTitleTemplate: "{no}) {title} {require}:",
		    questionStartIndex: "1",
		    showProgressBar: "top",
		    requiredText: "(required)",
			pages:[
				{
					title: "Feedback form for water services in Rwanda:",
					questions: [
						{
		                    "type": "rating",
		                    "name": "satisfaction",
		                    "title": "How satisfied are you with the our Services?",
		                    "mininumRateDescription": "Not Satisfied",
		                    "maximumRateDescription": "Completely satisfied",
		                    isRequired: true,
		                }
					]
				},{
					title: "Feedback form for water services in Rwanda:",
					questions: [
						{
        		            type: "radiogroup",
        		            name: "type_facility",
        		            title: "Please select water facility",
        		            isRequired: true,
        		            colCount: 3,
        		            choices: [
        		                "Public Tap",
        		                "Water Kiosk",
        		                "Hand Pump",
        		                "Improved Spring",
        		                "Your connection",
        		                "Pipeline",
        		                "Others"
        		            ]
        		        }, {
        		            type: "checkbox",
        		            name: "status_facility",
        		            title: "How is status of the facility (multipul selection)?",
        		            isRequired: true,
        		            colCount: 4,
        		            choices: [
        		                "No water",
        		                "No operator",
        		                "Water is dirty",
        		                "Meter is not functional",
        		                "Leakage",
        		                "My bill has probrems",
        		                "Others"
        		            ]
        		        }, {
        		            "type": "nouislider",
        		            "name": "range",
        		            "title": "When did it happened?"
        		        }, {
        		            type: "radiogroup",
        		            name: "howmanydaysago",
        		            title: "How many days ago did it happened?",
        		            isRequired: true,
        		            colCount: 0,
        		            choices: [
        		                "1 day",
        		                "3 days",
        		                "7 days",
        		                "15 days",
        		                "30 days",
        		                "Always",
        		            ]
        		        }, {
        		            type: "comment",
        		            name: "suggestions",
        		            title: "Please leave your comments for our services. (optional)"
        		        }
					]
				},{
					title: "Feedback form for water services in Rwanda:",
					questions: [
						{
        		            type: "radiogroup",
        		            name: "sex",
        		            title: "Please select your sex",
        		            isRequired: true,
        		            colCount: 3,
        		            choices: [
        		                "Male",
        		                "Female",
        		                "Other"
        		            ]
        		        },{
        		            name: "name",
        		            type: "text",
        		            title: "Please enter your name",
        		            placeHolder: "Jon Snow",
        		            isRequired: false
        		        }, {
        		            name: "mobilenumber",
        		            type: "text",
        		            inputType: "number",
        		            title: "Your mobile phone number (optional)",
        		            placeHolder: "0712345678",
        		            isRequired: false,
        		            validators: [
        		                {
        		                    type: "number"
        		                }
        		            ]
        		        }, {
        		            name: "email",
        		            type: "text",
        		            inputType: "email",
        		            title: "Your e-mail (optional)",
        		            placeHolder: "info@wasac.rw",
        		            isRequired: false,
        		            validators: [
        		                {
        		                    type: "email"
        		                }
        		            ]
        		        }
					]
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
			survey.location = "POINT(" + params['lng'] + " " + params['lat'] + ")";
			var model = new Survey.Model(survey.json);
			model
			    .onComplete
			    .add(function (result) {
			    	result.data['location'] = survey.location;
			    	var data = {
			    			location : survey.location,
			    			contents: JSON.stringify(result.data)
			    	};
			    	$.post("./rest/Feedbacks",data);
			    	
			    	var html = "<div align='center'><button id='btnClose_surveyform'>Close</button></div>"
			    	document
		            .querySelector('#surveyResult')
		            .innerHTML = html;
			    	
			    	$("#btnClose_surveyform").on('click', function(e){
			    		window.open('', '_self', ''); 
			    		window.close();
			    	});
			    });

			$("#surveyElement").Survey({model: model});
		}
}

$(document).ready(function() {
	survey.init();
});