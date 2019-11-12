const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


clsapp.use(express.static(publicDirectory))


app.get('', (req, res) => {
 res.render('index', {
     title: 'Weather',
     name: 'Neeraj Nandakumar'
 })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Neeraj Nandakumar'
    })
   })

   app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Neeraj Nandakumar'
    })
   })


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {

        if(error){
            return res.send({
                error: error
            })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
    
            if(error){
                return res.send({
                    error: error
                })
            }
        
            
            return res.send({
                forecast: forecastData,
                place,
                address:req.query.address
            })
          })
          
    })


    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 404,
        error: 'Help article not found!',
        name: 'Neeraj Nandakumar'
    })
   })

   app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        error: 'Page Not Found!',
        name: 'Neeraj Nandakumar'
    })
   })

app.listen('3000', () => {
    console.log('Server up and running!')
})