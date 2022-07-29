const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const lists__pokemons = document.getElementById('lists__pokemons')
const buttons = document.getElementById('buttons')
let urlPokemon = ' https://pokeapi.co/api/v2/pokemon'
let btnNext;
let btnPrevious;
let templateHtml;
const GetPokemons = async (url) => {
    try {
        const response = await fetch(url)
        const results = await response.json();
        console.log(results)
        DataPokemons(results.results)
        btnNext = results.next ? `<button class="btn" data-url=${results.next}>⏩
</button>` : ''
        btnPrevious = results.previous ? `<button class="btn" data-url=${results.previous}>⏮️</button>` : ''
        buttons.innerHTML = btnPrevious + " " + btnNext
    } catch (error) {
        console.log(error)
    }
}
GetPokemons(urlPokemon)
const DataPokemons = async (data) => {
    lists__pokemons.innerHTML = '';
    try {
        for (let index of data) {
            const resp = await fetch(index.url)
            const resul = await resp.json();
            console.log(resul)
            templateHtml = `
            <div class="pokemon__img">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <p>${resul.name}</p>
            </div>
            `
            lists__pokemons.innerHTML += templateHtml
        }
    } catch (error) {
        console.log(error)
    }
}
buttons.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        let value = e.target.dataset.url
        console.log(value)
        GetPokemons(value)
    }
})
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}
const imagePokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonImg(response))
        .catch(err => renderNotFound())
}
const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}
const renderPokemonImg = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
}
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}
const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}
const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', '/img/Error.jpg');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}