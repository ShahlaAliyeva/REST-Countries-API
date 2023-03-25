window.addEventListener('load', function () {
    let toggleMode = document.querySelector('.toggle-mode')
    let header = document.querySelector('.header')
    let body = document.querySelector('body')
    let input = document.getElementById('country-input')
    let searchIcon = document.querySelector(".search-icon")
    let filter = document.getElementById('filter')
    let filterElements = document.querySelectorAll('ul#filter li')
    let goBackBtn = document.querySelector('.btn-section button')
    let detailedPageInfo = document.querySelector('.country-info')

    let lightModeIcon = 'sunny'
    let darkModeIcon = 'moon'

    //box-shadow: 1px 0px 7px hsl(195, 6%, 26%);
    //<ion-icon name="sunny" aria-hidden="false" aria-label="light-mode"></ion-icon>
    //<span>light mode</span>

    function getLightMode() {
        let countryCards = document.querySelectorAll('.main-section> div')
        let countryCardsImg = document.querySelectorAll('.card-img img')
        let countryCardsInfo = document.querySelectorAll('.card-info')
        let detailedPageSpans = document.querySelectorAll('.border-countries span')

        header.style.backgroundColor = 'hsl(0, 0%, 100%)'
        header.style.color = 'hsl(200, 15%, 8%)'
        body.style.backgroundColor = 'hsl(0, 0%, 98%)'
        input.style.backgroundColor = 'hsl(0, 0%, 100%)'
        input.style.color = 'hsl(202, 8%, 26%)'
        searchIcon.style.color = 'hsl(202, 8%, 26%)'
        input.style.boxShadow = '1px 0px 5px hsl(195, 6%, 26%)'
        filter.style.color = 'hsl(202, 8%, 26%)'
        filterElements[0].style.boxShadow = '1px 0px 2px hsl(195, 6%, 26%)'

        filterElements.forEach((element) => {
            element.style.backgroundColor = 'hsl(0, 0%, 100%)'
        })

        countryCards.forEach((card) => {
            card.style.backgroundColor = 'hsl(0, 0%, 100%)'
            card.style.boxShadow = '1px 0px 5px hsl(216, 2%, 57%)'
            card.style.borderRadius = '.4rem'
        })

        countryCardsImg.forEach((img) => {
            img.style.borderBottom = '.1px solid hsl(216, 2%, 57%)'
        })

        countryCardsInfo.forEach((info) => {
            info.style.color = 'hsl(202, 8%, 26%)'
        })

        goBackBtn.style.backgroundColor = 'hsl(0, 0%, 100%)'
        goBackBtn.style.color = 'hsl(202, 8%, 26%)'
        detailedPageInfo.style.color = 'hsl(202, 8%, 26%)'

        detailedPageSpans.forEach(detailedSpan => {
            detailedSpan.style.backgroundColor = 'hsl(0, 0%, 100%)'
        })
    }

    function getDarkMode() {
        let countryCards = document.querySelectorAll('.main-section> div')
        let countryCardsImg = document.querySelectorAll('.card-img img')
        let countryCardsInfo = document.querySelectorAll('.card-info')
        let detailedPageSpans = document.querySelectorAll('.border-countries span')

        header.style.backgroundColor = 'hsl(209, 23%, 22%)'
        header.style.color = 'hsl(0, 0%, 100%)'
        body.style.backgroundColor = 'hsl(207, 26%, 17%)'
        input.style.backgroundColor = 'hsl(209, 23%, 22%)'
        input.style.color = 'hsl(0, 0%, 100%)'
        searchIcon.style.color = 'hsl(0, 0%, 100%)'
        input.style.boxShadow = 'none'
        filter.style.color = 'hsl(0, 0%, 100%)'
        // filterElements[0].style.boxShadow = '1px 0px 2px hsl(195, 6%, 26%)'

        filterElements.forEach((element) => {
            element.style.backgroundColor = 'hsl(209, 23%, 22%)'
        })

        countryCards.forEach((card) => {
            card.style.backgroundColor = 'hsl(209, 23%, 22%)'
            card.style.boxShadow = '2px 0px 10px hsl(200, 15%, 8%)'
            // card.style.borderRadius = '.4rem'
        })

        countryCardsImg.forEach((img) => {
            img.style.borderBottom = 'none'
        })

        countryCardsInfo.forEach((info) => {
            info.style.color = 'hsl(0, 0%, 100%)'
        })

        goBackBtn.style.backgroundColor = 'hsl(209, 23%, 22%)'
        goBackBtn.style.color = 'hsl(0, 0%, 100%)'
        detailedPageInfo.style.color = 'hsl(0, 0%, 100%)'

        detailedPageSpans.forEach(detailedSpan => {
            detailedSpan.style.backgroundColor = 'hsl(209, 23%, 22%)'
        })
    }

    function changeMode() {
        let icon = document.querySelector('.mode-icon')
        let modeSpan = document.querySelector('.mode-span')
        toggleMode.addEventListener('click', function () {
            // let isDarkMode = icon.getAttribute('name').includes(darkModeIcon)
            if (icon.getAttribute('name').includes(darkModeIcon)) {
                icon.setAttribute('name', lightModeIcon)
                modeSpan.innerText = 'light mode'
                getDarkMode()

            } else if (icon.getAttribute('name').includes(lightModeIcon)) {
                icon.setAttribute('name', darkModeIcon)
                modeSpan.innerText = 'dark mode'
                getLightMode()
            }

            console.log(icon.getAttribute('name'))
        })
    }

    changeMode()

})