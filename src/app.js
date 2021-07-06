const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { send } = require('process')

//Define Paths or Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setu Up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Lalo HJ'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Lalo HJ'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'This page is to help the users',
        name: 'Eduardo HJ'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address term'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{ 
            console.log(latitude + '  '+ longitude)
            if(error){
                return res-send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help Article',
        errorMessage: 'Help article not found',
        name: 'Eduardo HJ'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Eduardo HJ'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})