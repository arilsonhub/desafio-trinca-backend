(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
            METIS MENU 
            ======================================*/
            $('#main-menu').metisMenu();

            /*====================================
              LOAD APPROPRIATE MENU BAR
           ======================================*/
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });     
        },

        initialization: function () {
            mainApp.main_fun();
        }
    }    

    $(document).ready(function () {
        mainApp.main_fun();
    });

}(jQuery));

var BASE_URL = "/churrasTrinca/";

var app = angular.module('churrasTrinca', []);

var dateISOStringPattern = "YYYY-MM-DD";

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

app.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    },
                	beforeShow: function()
			        {
			           setTimeout(function() { $(".ui-datepicker").css("z-index", 1051); },10);
			        },
			        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
			        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
			        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
			        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
			        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
                });
            });
        }
    }
});

function isNull(data){
	if(data == undefined || data == null) return true;
	return false;
}

function showHideLoader(showOrHide,callback){
	if(!isNull(showOrHide)){
		if(showOrHide){
			$('#gifLoader').show();
			var alturaTela = $(document).height();
	        var larguraTela = $(window).width();
	        $('#fundoEscuro').css({'width':larguraTela,'height':alturaTela});        
	        
	        $("#fundoEscuro").fadeTo("fast",0.8,function() {
	        	if(!isNull(callback)){
	        		callback();
	        	}
	        });
	        
		}else{
			if(!isNull(callback)){
				callback();
			}
			$('#gifLoader').hide();
			$("#fundoEscuro").hide();		
		}
	}else{
		if(!isNull(callback)){
    		callback();
    	}
	}
}

function showUIAlert(content,callback,params){
	 $('#fundoEscuro').show();
	 $("#messageDialog").dialog({		
		resizable : false,		
		modal : false,
		buttons : {
			"ok" : function() {
				if(!isNull(callback)){
					if(!isNull(params)){
						callback(params);
					}else{
						callback();
					}					
				}
				$('#fundoEscuro').hide();
				$('#messageDialog').dialog("close");				
			}
		},
	 	close: function(ev, ui){
	 		$('#fundoEscuro').hide();
	 	},
	});
	$("#messageDialogText").html(content);
}

function showConfirmUIMessage(content,confirmCallback,params){
	$('#fundoEscuro').show();
	 $("#messageConfirmDialog").dialog({		
		resizable : false,		
		modal : false,
		buttons : {
			"ok" : function() {				
				if(!isNull(params)){
					confirmCallback(params);
				}else{
					confirmCallback();
				}
				$('#fundoEscuro').hide();
				$('#messageConfirmDialog').dialog("close");				
			},
			"Cancelar" : function() {
				$('#fundoEscuro').hide();
				$('#messageConfirmDialog').dialog("close");				
			}
		},
	 	close: function(ev, ui){
	 		$('#fundoEscuro').hide();
	 		$('#messageConfirmDialog').dialog("close");
	 	},
	});
	$("#messageConfirmDialogText").html(content);
}

function BrDateStringTOISODateString(data) {
    if (isNull(data)) return null;
    var dataSplit = data.split("/");
    var data = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0];
    return moment(data).format(dateISOStringPattern);
}

function formatMoneyMoedaReal(obj) {
    obj = parseFloat(Math.round(obj * 100) / 100).toFixed(2);
    return obj;
}