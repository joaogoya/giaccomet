google.charts.load("current", { packages: ["geochart"] });
google.charts.setOnLoadCallback(drawRegionsMap);

dicEstados = {
  "1": "Acre",
  "2": "Alagoas",
  "3": "Amapa",
  "4": "Amazonas",
  "5": "Bahia",
  "6": "Ceara",
  "7": "Distrito Federal",
  "8": "Espirito Santo",
  "9": "Goias",
  "10": "Maranhao",
  "11": "Mato Grosso",
  "12": "Mato Grosso do Sul",
  "13": "Minas Gerais",
  "14": "Para",
  "15": "Paraiba",
  "16": "Parana",
  "17": "Pernambuco",
  "18": "Piaui",
  "19": "Rio de Janeiro",
  "20": "Rio Grande do Norte",
  "21": "Rio Grande do Sul",
  "22": "Rondonia",
  "23": "Roraima",
  "24": "Santa Catarina",
  "25": "Sao Paulo",
  "26": "Sergipe",
  "27": "Tocantins",
};
//o array abaixo pode ser alimentado por uma base de dados, ou api rest. no exemplo, deixei fixo.
unidades = {
  Acre: {
    "0": {
      Loja: "IT-Milano",
      Fone: "",
      Endereco: "",
    },
    "1": {
      Loja: "*PT-Lisboa Centro",
      Fone: "0000-0000",
      Endereco: "Praça Doutor Teixeira Aragão 4 2D",
    },
  },
  Maranhao: {
    "0": {
      Loja: "Sao Luis Centro",
      Fone: "",
      Endereco: "",
    },
    "1": {
      Loja: "Renascenca",
      Fone: "0000-0000",
      Endereco: "Renascenca 2 Rua 7",
    },
    "2": {
      Loja: "Caolho",
      Fone: "0000-1234",
      Endereco: "Av. Avivares 2 Rua 7",
    },
  },
  "Sao Paulo": {
    "0": {
      Loja: "Araçatuba",
      Fone: "18 3117 7471",
      Endereco: "Acesse o site",
    },
    "1": {
      Loja: "Bauru",
      Fone: "(14) 3014-9181",
      Endereco: "",
    },
  },
  Bahia: {
    "0": {
      Loja: "Feira de Santana",
      Fone: "71 3488-6577",
      Endereco: "Rua Senador Theotonio Vilela, 110",
    },
    "1": {
      Loja: "Ilheus",
      Fone: "0000-0000",
      Endereco: "Rua Duque de Caxias, 465, sala 01, 02 e 03",
    },
  },
};

var ultimoEstadoSelecionado = "";

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ["Country"],
    ["Brazil"],
    ["Acre"],
    ["Alagoas"],
    ["Amapa"],
    ["Amazonas"],
    ["Bahia"],
    ["Ceara"],
    ["Distrito Federal"],
    ["Espirito Santo"],
    ["Goias"],
    ["Maranhao"],
    ["Mato Grosso"],
    ["Mato Grosso do Sul"],
    ["Minas Gerais"],
    ["Para"],
    ["Paraiba"],
    ["Parana"],
    ["Pernambuco"],
    ["Piaui"],
    ["Rio de Janeiro"],
    ["Rio Grande do Norte"],
    ["Rio Grande do Sul"],
    ["Rondonia"],
    ["Roraima"],
    ["Santa Catarina"],
    ["Sao Paulo"],
    ["Sergipe"],
    ["Tocantins"],
  ]);

  var options = {
    region: "BR",
    resolution: "provinces",
    datalessRegionColor: "none",
    defaultColor: "#3ba8cd",
    enableRegionInteractivity: true,
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById("regions_div")
  );

  function myClickHandler() {
    var selection = chart.getSelection();

    var message = "";
    for (var i = 0; i < selection.length; i++) {
      var item = selection[i];
      if (item.row != null && item.column != null) {
        message += "{" + item.row + ",column:" + item.column + "}";
      } else if (item.row != null) {
        message += "" + item.row + "";
      } else if (item.column != null) {
        message += "{column:" + item.column + "}";
      }
    }
    if (message == "") {
      message = ultimoEstadoSelecionado;
    } else {
      ultimoEstadoSelecionado = message;
    }
   
    console.log(dicEstados[message]);
    

    // document.getElementById("dadosLojas").innerHTML = "";
    // for (var i = 0; i < Object.keys(unidades).length; i++) {
    //   document.getElementById("estado").innerHTML = dicEstados[message];
    //   //Ponto de melhoria, percorrer o array apenas nos itens relacionados ao estado clicado/marcado. (lazy)
    //   if (unidades[dicEstados[message]][i] != undefined) {
    //     document.getElementById("dadosLojas").innerHTML +=
    //       "<br>Unidade: " +
    //       unidades[dicEstados[message]][i]["Loja"] +
    //       "<br>Fone: " +
    //       unidades[dicEstados[message]][i]["Fone"] +
    //       "<br>Endereco: " +
    //       unidades[dicEstados[message]][i]["Endereco"] +
    //       "<br>";
    //   }
    // }
  }

  google.visualization.events.addListener(chart, "select", myClickHandler);

  chart.draw(data, options);

  $("#seletorCombo").change(function () {
    valEstado = $(this).val();
    arraySelection = [];
    arraySelection.push({ column: null, row: Number(valEstado) });

    function myComboHandler(option) {
      var selection = option;
      console.log(selection);
      var message = "";
      for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (item.row != null && item.column != null) {
          message += "{" + item.row + ",column:" + item.column + "}";
        } else if (item.row != null) {
          message += "" + item.row + "";
        } else if (item.column != null) {
          message += "{column:" + item.column + "}";
        }
      }
      if (message == "") {
        message = "nothing";
        return false;
      }
      document.getElementById("dadosLojas").innerHTML = "";
      for (var i = 0; i < Object.keys(unidades).length; i++) {
        document.getElementById("estado").innerHTML = dicEstados[message];
        document.getElementById("dadosLojas").innerHTML +=
          "<br>Unidade: " +
          unidades[dicEstados[message]][i]["Loja"] +
          "<br>Fone: " +
          unidades[dicEstados[message]][i]["Fone"] +
          "<br>Endereco: " +
          unidades[dicEstados[message]][i]["Endereco"] +
          "<br>";
      }
    }

    google.visualization.events.addListener(chart, "select", myComboHandler);

    chart.draw(data, options);

    myComboHandler(arraySelection);
  });
}
