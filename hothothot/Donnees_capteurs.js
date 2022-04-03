var myChart;
var A_temperatures = [];
var E_temperatures = [];
var tabi = [];
var nbr = 0;
fetch("https://hothothot.dog/api/capteurs", {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "GET",
}).then(function (response) {
  return response.json().then(function (O_json) {
    let Valeur_int = O_json.capteurs[0].Valeur;
    let Where_int = O_json.capteurs[0].Nom;

    let Valeur_ext = O_json.capteurs[1].Valeur;
    let Where_ext = O_json.capteurs[1].Nom;

    Array.from(document.querySelectorAll("div ul li a")).forEach(function (element_a) {
      element_a.addEventListener("click", function (event) {
        Array.from(document.querySelectorAll(".active")).forEach(function (element_section_ou_table) {
          element_section_ou_table.removeAttribute("class");
        });
        let element_a_id = event.target.attributes.href.value.replace("#", "");
        document.getElementById(element_a_id).setAttribute("class", "active");
      });
    });

    // ---------------------------------------------------------------------------------------------------------------------------------
    (function () {
      // console.log(A_temperatures);

      var p_temperature = document.getElementById("p_temperature");
      var section = p_temperature.parentNode;
      var span_temperature = document.getElementById("span_temperature");
      var span_temperatureext = document.getElementById("span_temperatureext");
      var span_minint = document.getElementById("span_minint");
      var span_minext = document.getElementById("span_minext");
      var span_maxint = document.getElementById("span_maxint");
      var span_maxExt = document.getElementById("span_maxext");
      var i = 0;

      var interval = setInterval(function () {
        A_temperatures.push(Valeur_int);
        E_temperatures.push(Valeur_ext);
        tabi.push(nbr++);

        if (i < A_temperatures.length) {
          if (document.getElementById("titre_message")) document.getElementById("titre_message").remove();

          let I_temperature = A_temperatures[i];
          let H_temperature = E_temperatures[i];
          // Bordure de couleur
          var minInt = Math.min.apply(null, A_temperatures);
          var maxInt = Math.max.apply(null, A_temperatures);
          var minExt = Math.min.apply(null, E_temperatures);
          var maxExt = Math.max.apply(null, E_temperatures);

          span_minint.innerText = minInt;
          span_minext.innerText = minExt;
          span_maxint.innerText = maxInt;
          span_maxext.innerText = maxExt;
          let color = "blue";
          if (0 < I_temperature && I_temperature <= 20) {
            color = "green";
          } else if (20 < I_temperature && I_temperature <= 30) {
            color = "orange";
          } else if (30 < I_temperature && I_temperature <= 40) {
            color = "red";
          }

          if (H_temperature > 35){
            alert("Hothothot!")
          }

          if (H_temperature < 0){
            alert("Banquise en vue !")
          }

          if (I_temperature > 22){
            alert("Baissez le chauffage !")
          }
          
          if (I_temperature > 50){
            alert(" Appelez les pompiers ou arrêtez votre barbecue !")
          }
          
          if (I_temperature < 12){
            alert("montez le chauffage ou mettez un gros pull  !")
          }

          if (I_temperature < 0){
            alert("canalisations gelées, appelez SOS plombier et mettez un bonnet !")
          }



          //affichage température du premier cardre

          ++i;
          span_temperature.setAttribute("class", color);
          span_temperature.innerText = I_temperature;
          span_temperatureext.setAttribute("class", color);
          span_temperatureext.innerText = H_temperature;

          let titre_message = document.createElement("h4");
          titre_message.setAttribute("id", "titre_message");
          if (I_temperature < 0) {
            titre_message.innerText = "Il fait froid";
          } else if (30 < I_temperature) {
            titre_message.innerText = "Il fait chaud";
          }

          // https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
          section.insertBefore(titre_message, p_temperature);

          // Pour le graphique

          let dataForChart = A_temperatures;
          dataForChart.push(I_temperature);

          let dataForChartExt = E_temperatures;
          dataForChartExt.push(H_temperature);

          if (typeof myChart !== "undefined") {
            myChart.destroy();
          }

          myChart = new Chart(document.getElementById("line-chart"), {
            type: "line",
            ticks: {
              autoSkip: true,
              maxTicks: 10
            },
            data: {
              labels: tabi,
              datasets: [
                {
                  data: dataForChart,
                  label: "Température int",
                  borderColor: "#3e95cd",
                  fill: false,
                },{
                  data: dataForChartExt,
                  label: "Température ext",
                  borderColor: "#3E12cd",
                  fill: false,
                }
              ],
            },
            options: {
              scales:{
              x : {
                ticks: {
                  maxTicksLimit: 10,
                },
              },
              },
              title: {
                display: true,
                text: "",
              },
              animation: {
                duration: 0,
              },
            },
          });
        } else {
          clearInterval(interval);
          interval = null;
        }
      }, 2000);
    })();
  });
});
