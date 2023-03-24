window.addEventListener('load', function () {
    let body = document.querySelector('body')
    let mainSection = document.querySelector('.main-section')

    let filter = document.querySelector('.filter-by')
    let defaultFilterValue = document.querySelector('.filter-by span')
    let regionsOnFilter = document.querySelectorAll('.region')

    function openRegionFilter() {
        regionsOnFilter.forEach((region) => {
            region.style.display = 'flex'
            filter.classList.add('opened')
        })
    }

    function closeRegionFilter() {
        regionsOnFilter.forEach((region) => {
            region.style.display = 'none'
            filter.classList.remove('opened')
        })
    }

    fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            for (i = 0; i < data.length; i++) {

                let countryCard = document.createElement('div')
                countryCard.classList.add('country-card')
                countryCard.setAttribute('id', `${i}`)

                let cardImg = document.createElement('div')
                cardImg.classList.add('card-img')
                let img = document.createElement('img')
                img.setAttribute('src', `${data[i].flags.svg}`)
                img.setAttribute('alt', `${data[i].name.common}`)

                let cardInfo = document.createElement('div')
                cardInfo.classList.add('card-info')
                let countryName = document.createElement('h4')
                countryName.innerText = data[i].name.common
                let population = document.createElement('p')
                population.innerText = 'Population: ' + data[i].population
                let region = document.createElement('p')
                region.setAttribute('class', 'countryRegion')
                region.innerText = 'Region: ' + data[i].region
                let capital = document.createElement('p')
                if (data[i].capital !== undefined) {
                    capital.innerText = 'Capital: ' + data[i].capital[0]
                } else {
                    capital.innerText = 'Capital: None'
                }

                cardImg.append(img)
                cardInfo.append(countryName, population, region, capital)
                countryCard.append(cardImg, cardInfo)
                mainSection.append(countryCard)

                let regionInfoarr = region.innerText.split(' ')
                regionsOnFilter.forEach(region => {
                    region.addEventListener('click', function () {
                        defaultFilterValue.innerHTML = region.innerText
                        closeRegionFilter()
                        if (!regionInfoarr[1].toLocaleLowerCase().includes(defaultFilterValue.innerText.toLocaleLowerCase())) {
                            countryCard.style.display = 'none'
                            // console.log(defaultFilterValue.innerText.toLocaleLowerCase());
                            // console.log(regionInfoarr[1].toLocaleLowerCase());
                        } else {
                            countryCard.style.display = 'block'
                        }
                    })
                })
            }

            let cardsArr = document.querySelectorAll('.country-card')
            let homePage = document.querySelector('.homepage')
            let detailedPage = document.querySelector('.detailed-page')
            //Detailed page elements
            let countryFlag = document.querySelector('.country-flag')
            let detailedPageImg = document.createElement('img')
            let countryInfo = document.querySelector('.country-info')
            let detailedPageName = document.createElement('h3')
            let mainDetailsContent = document.querySelectorAll('.main-details p')
            let nativeName = document.createElement('span')
            let detailedPagePopulation = document.createElement('span')
            let detailedPageRegion = document.createElement('span')
            let detailedPageSubRegion = document.createElement('span')
            let detailedPageCapital = document.createElement('span')
            let otherDetails = document.querySelectorAll('.other-details p')
            let topLeveldomain = document.createElement('span')
            let currencies = document.createElement('span')
            let languages = document.createElement('span')
            let borderCountries = document.querySelector('.border-countries')
            let contentOfBordercountries = document.querySelector('.border-countries p')

            function getCardDetails() {
                cardsArr.forEach(card => {
                    card.addEventListener('click', function () {
                        let selectedCardId = card.getAttribute('id')
                        homePage.style.display = 'none'
                        detailedPage.style.display = 'flex'

                        detailedPageImg.setAttribute('src', `${data[selectedCardId].flags.svg}`)
                        detailedPageName.innerText = data[selectedCardId].name.common
                        if (data[selectedCardId].altSpellings[1] !== undefined) {
                            nativeName.innerHTML = data[selectedCardId].altSpellings[1]
                        } else {
                            nativeName.innerHTML = data[selectedCardId].name.common
                        }

                        detailedPagePopulation.innerHTML = data[selectedCardId].population
                        detailedPageRegion.innerHTML = data[selectedCardId].region
                        detailedPageSubRegion.innerHTML = data[selectedCardId].subregion
                        detailedPageCapital.innerHTML = data[selectedCardId].capital[0]

                        topLeveldomain.innerHTML = data[selectedCardId].tld

                        for (let key in data[selectedCardId].currencies) {
                            currencies.innerHTML = data[selectedCardId].currencies[key].name
                        }

                        let langArr = []
                        for (let key in data[selectedCardId].languages) {
                            langArr.push(' ' + data[selectedCardId].languages[key])
                        }
                        languages.innerHTML = langArr

                        let bordersArr = data[selectedCardId].borders
                        console.log('bordersArr: ', bordersArr);
                        let borders = []
                        if (bordersArr == undefined) {
                            borders = []
                            borderCountries.replaceChildren(contentOfBordercountries)
                        } else {
                            borders = []
                            borderCountries.replaceChildren(contentOfBordercountries)
                            bordersArr.forEach(element => {
                                for (j = 0; j < data.length; j++) {
                                    if (element == data[j].cca3) {
                                        borders.push(' ' + data[j].name.common)
                                    }
                                }
                            })
                            borders.forEach(element => {
                                let span = document.createElement('span')
                                console.log('BORDERS Element: ', element);
                                span.innerHTML = element
                                borderCountries.append(span)
                            })
                        }


                        otherDetails[2].append(languages)
                        otherDetails[1].append(currencies)
                        otherDetails[0].append(topLeveldomain)

                        mainDetailsContent[4].append(detailedPageCapital)
                        mainDetailsContent[3].append(detailedPageSubRegion)
                        mainDetailsContent[2].append(detailedPageRegion)
                        mainDetailsContent[1].append(detailedPagePopulation)
                        mainDetailsContent[0].append(nativeName)
                        countryFlag.append(detailedPageImg)
                        countryInfo.prepend(detailedPageName)
                        console.log(data[selectedCardId]);
                    })
                })
            }

            getCardDetails()

            let goBackBtn = document.querySelector('.btn-section')

            goBackBtn.addEventListener('click', function () {
                homePage.style.display = 'block'
                detailedPage.style.display = 'none'
            })

        })

    let searchInput = document.getElementById('country-input')

    filter.addEventListener('click', function () {
        searchInput.value = ''
        if (filter.classList[1] !== 'opened') {
            openRegionFilter()
            cardsArr = document.querySelectorAll('.country-card')
        } else if (filter.classList[1] === 'opened') {
            console.log('Input val: ', searchInput.value);
            closeRegionFilter()
        }
    })

    function searchBycountryName() {
        searchInput.addEventListener('input', (input) => {
            input.preventDefault()
            let visibleCardsArr = document.querySelectorAll('.country-card')
            let inputValue = input.target.value.toLocaleLowerCase()

            if (inputValue.trim() !== '') {
                console.log(inputValue);

                visibleCardsArr.forEach((cards) => {
                    let visibleCardRegion = cards.lastChild.querySelector('.countryRegion').innerText.split(' ')[1].toLocaleLowerCase()
                    const isVisible = cards.lastChild.firstChild.innerText.toLocaleLowerCase().includes(inputValue)
                    const filterVal = defaultFilterValue.innerText.split(' ')[0].toLocaleLowerCase()
                    if (isVisible) {
                        console.log('region: ', visibleCardRegion, defaultFilterValue.innerText.split(' ')[0]);
                        cards.style.display = 'block'
                        console.log(cards.lastChild.querySelector('.countryRegion').innerText.split(' '));
                        // if(visibleCardRegion === filterVal) {
                        //     cards.style.display = 'block'
                        //     // console.log(cards.lastChild.querySelector('.countryRegion').innerText.split(' '));
                        //     // console.log(cards.lastChild.firstChild.innerText.toLocaleLowerCase());
                        // }
                    } else if (!isVisible) {
                        cards.style.display = 'none'
                    } else {
                        cards.style.display = 'block'
                    }
                    // cards.classList.toggle('hide', !isVisible)
                })
            }

        })
    }

    searchBycountryName()

})