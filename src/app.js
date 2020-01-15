//Core modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecastRqst = require('./utils/forecast')
const geoCodeRqst = require('./utils/geoCode')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath) // customized path
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Me'
    })
})


app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        msg: 'This is an example msg.',
        name: 'Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Me'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address.'
        })
    }

    geoCodeRqst(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error){
            return res.send({error})
        }

        forecastRqst(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Help Resource Not Found',
        name: 'Me',
        notFoundMsg : 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Page Not Found',
        name: 'Me',
        notFoundMsg : 'You have reached a deadend.'
    })
})

app.listen(3000, () => {
    console.log('Server has started on port 3000')
})