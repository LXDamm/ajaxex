
    getRandomJokeByCategory(category) {
        const request = new XMLHttpRequest
        request.open('GET', `https://api.chucknorris.io/jokes/random?category=${category}`, true)
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
        populateCategories = function() {
        categories.forEach(element => {
            categoriesListE.innerHTML += `
                <li><button id="cat-${element}" class="btn">${element}</button></li>
            `
        })
        }
        getCategories = function() {
        const request = new XMLHttpRequest
        request.open('GET', 'https://api.chucknorris.io/jokes/categories', true);
        request.onload = function() {
            if (this.status == 200) {
                categories = JSON.parse(this.responseText)
                populateCategories()
            }
        }
        request.send()
    }


addCatEventListeners = function() {
    categories.forEach(element => {
        const button = document.getElementById(`cat-${element}`)
        button.addEventListener('click', function() {
            getRandomJokeByCategory('animal')
        })
    })
}