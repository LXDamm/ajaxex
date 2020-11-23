const categoriesListE = document.querySelector('.categories-list')
const jokeE = document.querySelector('.joke-container')

let categories;

const populateCategories = function() {
    categories.forEach(element => {
        categoriesListE.innerHTML += `
            <li>${element}</li>
        `
    })
}

const getCategories = function() {
    const request = new XMLHttpRequest
    request.open('GET', 'https://api.chucknorris.io/jokes/categories', false);
    request.onload = function() {
        if (this.status == 200) {
            console.log(this.responseText)
            let data = JSON.parse(this.responseText)
            console.log(data);
            categories = data;
        }
    }
    request.send()
}

const getRandomJoke = function() {
    const request = new XMLHttpRequest
    request.open('GET', 'https://api.chucknorris.io/jokes/random', true);
    request.onload = function() {
        if (this.status == 200) {
            let data = JSON.parse(this.responseText)
            jokeE.innerHTML = `
                ${data.value}
            `
        }
    }
    request.send()
}

const addEventListeners = function() {
    const randomBtnE = document.querySelector('.random-btn')
    randomBtnE.addEventListener('click', () => {
        getRandomJoke()
    })
}

const populate = function() {
    addEventListeners()
    getCategories()
    populateCategories()
}

populate()