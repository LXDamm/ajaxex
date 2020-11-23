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
        const request = new XMLHttpRequest
        request.onload = function() {
            if (this.status == 200) {
                let data = JSON.parse(this.responseText)
                console.log(this)
                this.categories = data
                this.renderCategories()
            }
        }.bind(this)
        request.open('GET', 'https://api.chucknorris.io/jokes/categories', true)
        request.send()
    }
    renderCategories() {
        this.categories.forEach(element => {
            categoriesListE.innerHTML += `<li><button class="btn">${element}</button></li>`
        })
    }
    getRandomJoke() {
        const request = new XMLHttpRequest
        request.open('GET', 'https://api.chucknorris.io/jokes/random', true);
        request.onload = function() {
            if (this.status == 200) {
                let data = JSON.parse(this.responseText)
                jokeE.innerHTML = `"${data.value}"`
            }
        }
        request.send()
    }
    addEventListeners() {
        const randomBtnE = document.querySelector('.random-btn')
        randomBtnE.addEventListener('click', () => {
            this.getRandomJoke()
        })
    }
    render() {
        this.renderCategories()
        this.addEventListeners()
    }
}

const app = new App

app.getCategories()
app.render()