

Interieur = document.getElementById("h2_int")
Exterieur = document.getElementById("h2_ext")

let socket = new WebSocket("ws://javascript.info")



fetch("https://hothothot.dog/api/capteurs",
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })

.then(function(response) {
    return response.json().then(function(O_json) {
        let Valeur_int = O_json.capteurs[0].Valeur;
        let Where_int = O_json.capteurs[0].Nom;

        let Valeur_ext = O_json.capteurs[1].Valeur;
        let Where_ext = O_json.capteurs[1].Nom;

        Array.from(document.querySelectorAll('div ul li a')).forEach(function(element_a) {
            element_a.addEventListener('click', 
                function(event) {
                    Array.from(document.querySelectorAll('.active')).forEach(function(element_section_ou_table) {
                        element_section_ou_table.removeAttribute('class');
                    });
                    let element_a_id = event.target.attributes.href.value.replace('#', '');
                    document.getElementById(element_a_id).setAttribute('class', 'active');
                }
            );
        });

        // ---------------------------------------------------------------------------------------------------------------------------------

        (function() {

            if (Valeur_ext < 10) {
                document.body.style.backgroundColor="#A3B5F6";
            }
            else document.body.style.backgroundColor="#F9DF74"
            
            var A_temperatures = [];
            for(var i = 3; i > 0; --i) {
                var x = Valeur_int;
                A_temperatures.push(x);
                
            }

            var B_temperatures = [];
            for(var i = 20; i > 0; --i) {
                var y = Valeur_ext;
                B_temperatures.push(y);
            }
            
    
            
            console.log(A_temperatures);
            console.log(B_temperatures);
            console.log(O_json);

            var p_temperature = document.getElementById('p_temperature');
            var section = p_temperature.parentNode;
            var span_temperature =  document.getElementById('span_temperature');
            var i = 0;


            var interval = setInterval(function() {
                if(i < A_temperatures.length) {
                    if(document.getElementById('titre_message'))
                        document.getElementById('titre_message').remove();
                        
                    let I_temperature = A_temperatures[i];
                    
                    let color = 'blue';
                    if( 0 < I_temperature && I_temperature <= 20 ) {
                        color = 'green';
                    }
                    else if( 20 < I_temperature && I_temperature <= 30 ) {
                        color = 'orange';
                    }
                    else if( 30 < I_temperature && I_temperature <= 40 ) {
                        color = 'red';
                    }
                    
                    ++i;
                    span_temperature.setAttribute("class", color);
                    span_temperature.innerText = I_temperature;
                    
                    let titre_message = document.createElement("h4")
                    titre_message.setAttribute('id', 'titre_message');
                    if( I_temperature < 0 ) {
                        titre_message.innerText = 'Il fait froid';
                    } 
                    else if ( 30 < I_temperature ) {
                        titre_message.innerText = 'Il fait chaud';
                    }
                    // https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
                    section.insertBefore(titre_message, p_temperature); 
                    
                    
                    let clone_historique_ligne = document.getElementById("ligne_modele").cloneNode(true);
                    clone_historique_ligne.setAttribute("id", "");	
                    clone_historique_ligne.querySelector(".td_date").innerText = Date().toString();
                    clone_historique_ligne.querySelector(".td_temperature").innerText = I_temperature;
                    clone_historique_ligne.style.display = "table-row";
                    let table_tbody = document.querySelector("table tbody");
                    // https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
                    table_tbody.insertBefore(clone_historique_ligne, table_tbody.querySelector("#ligne_modele").nextSibling);

                } else {
                    clearInterval(interval);
                    interval = null;
                    var element = Array.from(document.querySelectorAll('table tr'));
                    element[element.length -1].remove();

                }
            }, 2000)
        }());
    });
})