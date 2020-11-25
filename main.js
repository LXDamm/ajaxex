const categoriesListE = document.querySelector('.categories-list')
const jokeE = document.querySelector('.joke-container')

class App {
    #categories
    constructor() {
        this.#categories = []
    }
    get categories() {
        return this.#categories
    }
    set categories(categories) {
        this.#categories = categories
    }
    getCategories() {
        self = this
        const request = new XMLHttpRequest
        request.onload = function () {
            if (this.status == 200) {
                let data = JSON.parse(this.responseText)
                self.categories = data
                self.renderCategories()
            }
        }
        request.open('GET', 'https://api.chucknorris.io/jokes/categories', true)
        request.send()
    }
    renderCategories() {
        if (this.categories) {
            this.categories.forEach(element => {
                categoriesListE.innerHTML += `<li><button class="btn">${element}</button></li>`
            })
        }
    }
    getRandomJoke() {
        const request = new XMLHttpRequest
        request.open('GET', 'https://api.chucknorris.io/jokes/random', true);
        request.onload = function () {
            if (this.status == 200) {
                let data = JSON.parse(this.responseText)
                jokeE.innerHTML = `"${data.value}"`
            }
        }
        request.send()
    }
    getRandomJokeByCategory(event) {
        const category = event.srcElement.innerText
        const request = new XMLHttpRequest
        request.open('GET', `https://api.chucknorris.io/jokes/random?category=${category}`, true);
        request.onload = function () {
            if (this.status == 200) {
                let data = JSON.parse(this.responseText)
                jokeE.innerHTML = `"${data.value}"`
            }
        }
        request.send()
    }
    addEventListeners() {
        const randomBtnE = document.querySelector('.random-btn')
        randomBtnE.addEventListener('click', () => { this.getRandomJoke() })
        categoriesListE.addEventListener('click', this.getRandomJokeByCategory)
    }
    render() {
        this.renderCategories()
        this.addEventListeners()
    }
}

const app = new App

app.getCategories()
app.render()