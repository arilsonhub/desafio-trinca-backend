$("#datetimepicker1").mask("99/99/9999");

app.controller('ListaChurrasController', function ($scope, $http) {
	
	$scope.abrirModalCadastroChurras = function() {
	  $('#modalCadastroChurras').modal('show');
	}
	
    $scope.abrirModalDetalhesChurras = function (id) {
        $scope.idChurrasco = id;
        $('#modalDetalheChurras').modal('show');
        $scope.detalhesChurrasco(id);
	}
	
	$scope.abrirModalAdicionarParticipante = function() {
	  $('#modalAdicionarParticipante').modal('show');
	  $('#modalDetalheChurras').modal('hide');
	}
	
    $scope.abrirModalListaParticipantesChurras = function () {      
	  $('#modalListaParticipantesChurras').modal('show');
      $('#modalDetalheChurras').modal('hide');      
      $scope.buscarParticipantes();
    }

    $scope.buscarParticipantes = function () {
        
        var dadosRequest = {
            "churrascoId": $scope.idChurrasco
        };
        
        showHideLoader(true, function () {
            $http.post('ListaChurras/listarParticipantes', dadosRequest)
                .success(function (jsonResponse) {

                    for (var i = 0; i < jsonResponse.length; i++) {
                        var isPago = (jsonResponse[i]['isPago'] == "1" ? true : false);
                        jsonResponse[i]['isPago'] = isPago;
                        jsonResponse[i]['valorContribuicao'] = formatMoneyMoedaReal(jsonResponse[i]['valorContribuicao']);
                    }
                    
                    $scope.tabelaParticipante = jsonResponse;
                    showHideLoader(false);
                })
                .error(function () {
                    showUIAlert("Houve um erro ao tentar listar os participantes");
                    showHideLoader(false);
                });
        });
    }

    $scope.buscarChurrascos = function () {        
        showHideLoader(true, function () {
            $http.post('ListaChurras/listarChurrascos', {})
                .success(function (jsonResponse) {                    
                    for (var i = 0; i < jsonResponse.length; i++) {
                        var parsedDate = moment(jsonResponse[i]['data']).format('DD/MM/YYYY');
                        jsonResponse[i]['data'] = parsedDate;
                        jsonResponse[i]['totalArrecadado'] = formatMoneyMoedaReal(jsonResponse[i]['totalArrecadado']);
                    }

                    $scope.tabelaChurrasco = jsonResponse;                    
                    showHideLoader(false);                    
                })
                .error(function () {
                    showUIAlert("Houve um erro ao tentar listar os churrascos");
                    showHideLoader(false);
                });
        });
    }

    $scope.detalhesChurrasco = function (id) {

        var dadosRequest = {
            "id": id 
        };

        showHideLoader(true, function () {
            $http.post('ListaChurras/detalhesChurrasco', dadosRequest)
                .success(function (jsonResponse) {
                    jsonResponse['data'] = moment(jsonResponse['data']).format('DD/MM/YYYY');
                    jsonResponse['totalArrecadado'] = formatMoneyMoedaReal(jsonResponse['totalArrecadado']);
                    jsonResponse['valorASerArrecadado'] = formatMoneyMoedaReal(jsonResponse['valorASerArrecadado']);
                    $scope.dadosChurrasco = jsonResponse;                    
                    showHideLoader(false);
                })
                .error(function () {
                    showUIAlert("Houve um erro ao tentar exibir detalhes do churrasco");
                    showHideLoader(false);
                });
        });
    }

    $scope.limparCadastroParticipante = function () {
        $scope.nomeParticipante = "";
        $scope.valorContribuicaoParticipante = "";
        $scope.observacaoParticipante = "";
        document.getElementById("checkCadastroValorPagoParticipante").checked = false;
        document.getElementById("isComBebida0").checked = false;
        document.getElementById("isComBebida1").checked = false;        
    }

    $scope.AdicionarParticipante = function (idChurrasco) {
        
        $scope.isPago = (document.getElementById("checkCadastroValorPagoParticipante").checked == true ? 1 : 0);
        var dadosRequest = {
            "churrascoId": idChurrasco,
            "nome": $scope.nomeParticipante,
            "valorContribuicao": $scope.valorContribuicaoParticipante,
            "observacao": $scope.observacaoParticipante,
            "isPago": $scope.isPago,
            "isBebida": $scope.isBebida            
        };

        var dadosValidacao = dadosRequest;

        if (dadosValidacao['nome'] == null || dadosValidacao['nome'].replace(/\s/g, '').length == 0) {
            showUIAlert("Favor informar o campo Nome.");
            return;
        }

        if (dadosValidacao['valorContribuicao'] == null || dadosValidacao['valorContribuicao'].replace(/\s/g, '').length == 0) {
            showUIAlert("Favor informar o campo Valor de contribui&ccedil;&atilde;o.");
            return;
        }

        if (dadosValidacao['isBebida'] == null || dadosValidacao['isBebida'].replace(/\s/g, '').length == 0) {
            showUIAlert("Favor informar se deseja bebida.");
            return;
        }

        showHideLoader(true, function () {
            $http.post('ListaChurras/adicionarParticipante', dadosRequest)
                .success(function (jsonResponse) {
                    if (jsonResponse['insertResult'] == true) {
                        showUIAlert("Participante adicionado com sucesso.");                       
                        $('#modalAdicionarParticipante').modal('hide');
                        $scope.buscarChurrascos();
                        $scope.limparCadastroParticipante();
                    }
                    else
                        showUIAlert("Falha ao adicionar participante.");

                    showHideLoader(false);
                })
                .error(function () {
                    showUIAlert("Houve um erro ao tentar adicionar participante");
                    showHideLoader(false);
                });
        });
    }

    $scope.limparCadastroChurrasco = function () {
        $scope.churrascoCadastroData = "";
        $scope.churrascoCadastroDescricao = "";
        $scope.churrascoCadastroObservacao = "";
    }

    $scope.adicionarChurrasco = function () {
        
        var dadosRequest = {
            "data": BrDateStringTOISODateString($scope.churrascoCadastroData),
            "descricao": $scope.churrascoCadastroDescricao,
            "observacao": $scope.churrascoCadastroObservacao,
            "listaParticipante" : null
        };

        var dadosValidacao = dadosRequest;

        if (dadosValidacao['data'] == null || dadosValidacao['data'].replace(/\s/g, '').length == 0) {
            showUIAlert("Favor informar o campo Quando.");
            return;
        }

        if (dadosValidacao['descricao'] == null || dadosValidacao['descricao'].replace(/\s/g, '').length == 0) {
            showUIAlert("Favor informar o campo porque.");
            return;
        }

        showHideLoader(true, function () {
            $http.post('ListaChurras/adicionarChurrasco', dadosRequest)
                .success(function (jsonResponse) {
                    if (jsonResponse['insertResult'] == true){
                        showUIAlert("Churrasco adicionado com sucesso.");
                        $scope.buscarChurrascos();
                        $('#modalCadastroChurras').modal('hide');
                        $scope.limparCadastroChurrasco();
                    }
                    else
                        showUIAlert("Falha ao adicionar churrasco.");

                    showHideLoader(false);
                })
                .error(function () {
                    showUIAlert("Houve um erro ao tentar adicionar churrasco");
                    showHideLoader(false);
                });
        });
    }

    $scope.cancelarChurrasco = function (id) {
        
        var dadosRequest = {
            "id": id
        };

        showConfirmUIMessage("Tem certeza que deseja cancelar o churrasco?", function () {
            showHideLoader(true, function () {
                $http.post('ListaChurras/cancelarChurrasco', dadosRequest)
                    .success(function (jsonResponse) {
                        if (jsonResponse['deleteResult'] == true){
                            showUIAlert("Churrasco cancelado com sucesso.");
                            $scope.buscarChurrascos();
                        }
                        else
                            showUIAlert("Falha ao cancelar churrasco.");

                        showHideLoader(false);
                    })
                    .error(function () {
                        showUIAlert("Houve um erro ao tentar cancelar churrasco");
                        showHideLoader(false);
                    });
            });
        });
    }

    $scope.removerParticipante = function (id) {

        var dadosRequest = {
            "id": id
        };

        showConfirmUIMessage("Tem certeza que deseja remover o participante?", function () {
            showHideLoader(true, function () {
                $http.post('ListaChurras/removerParticipante', dadosRequest)
                    .success(function (jsonResponse) {
                        if (jsonResponse['deleteResult'] == true) {
                            showUIAlert("Participante removido com sucesso.");
                            $scope.buscarParticipantes();
                            $scope.buscarChurrascos();
                        }
                        else
                            showUIAlert("Falha ao remover Participante.");

                        showHideLoader(false);
                    })
                    .error(function () {
                        showUIAlert("Houve um erro ao tentar remover participante");
                        showHideLoader(false);
                    });
            });
        });
    }

    $scope.buscarChurrascos();
});