const pokemon_list = document.getElementById("pokemon-list");
const type_filter = document.getElementById("type_filter");
const poke_info = document.getElementById("poke-info");
const close_button = document.getElementById("close-button");
const poke_area = document.getElementById("poke-area");

let pokemon_types = [];
let pokemons = [];

eventListeners();

function eventListeners() {

    type_filter.addEventListener("change", filtroCambio);

    close_button.addEventListener("click", cierraInfo);

    document.addEventListener("DOMContentLoaded", documentListo);
}

function filtroCambio() {
    var type_id = type_filter.value;
    llenaLista(type_id);
}

function cierraInfo() {
    poke_info.innerHTML = "";
}

function documentListo() {
    leerJSON();
}

function leerJSON() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "pokedex.json", true);

    xhttp.onload = function() {
        if (this.status == 200) {
            var file_info = JSON.parse(this.responseText);

            pokemon_types = file_info.types;
            llenaCombo();

            pokemons = file_info.pokemons;
            llenaLista(0);
        }
    };

    xhttp.send();
}

function llenaCombo() {
    let html = '<option value="0">TODOS</option>';
    
    pokemon_types.forEach(type => {
        html += `<option value="${type.id}">${type.name}</option>`
    });

    type_filter.innerHTML = html;
}

function llenaLista(type_id) {
    let html = '';
    
    let id = parseInt(type_id);
    pokemons.forEach(pokemon => {
        if (id === 0 || pokemon.type.includes(id)) {
            html += 
            `<div class="col-s-4 col-m-1 poke-card" onclick="loadPokemon(${pokemon.id})">
                <div class="text-center">
                    CP <span class="">${pokemon.cp}</span>
                </div>
                <div class="">
                    <img src="${pokemon.sprite}" alt="" class="img-fluid">
                </div>
                <div class="text-center">
                    ${pokemon.name}
                </div>
                <div class="poke-hp"></div>
            </div>`;
        }
    });

    pokemon_list.innerHTML = html;
}

function loadPokemon(poke_id) {
    let id = parseInt(poke_id);

    let pokemon = pokemons.find(element => element.id === id);

    let html = '';

    html = 
    `<h2 class="text-center">
        CP ${pokemon.cp}
    </h2>
    <div class="text-center">
        <img src="${pokemon.sprite}" alt="" class="img-fluid">
    </div>
    <h2 class="text-center">
        ${pokemon.name}
    </h2>
    <div class="flex-column flex-all-center">
        <div class="poke-hp w-75"></div>
        <div class="py-1">${pokemon.hp} / ${pokemon.hp} HP</div>
    </div>
    <div class="flex-row flex-all-center p-4">`;

    let type;
    pokemon.type.forEach(t => {
        type = pokemon_types.find(tp => tp.id === t);

        html += 
        `<div class="poke-type">
            <div style="background-color: ${type.color};">${type.name}</div>
        </div>`;
    });
    
    html += `</div>
    <h3 class="text-center">
        Attack 128 / Defense 118
    </h3>`;

    poke_info.innerHTML = html;
}