const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

msgOne.textContent = ''
msgTwo.textContent = ''

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    getWeather(search.value)
})

const getWeather = (address) => {
    msgOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        
        response.json().then((data)=>{
            if (data.error){
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast.fullSummary
                
            }        
        })
    })
}