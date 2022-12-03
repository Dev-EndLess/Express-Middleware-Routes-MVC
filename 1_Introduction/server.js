const express = require('express')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 5000

// Express handle routes like waterfall ( like css )

app.get('/', (req, res) => {
    // res.send('Hello Guys') // send text
    // res.sendFile('./views/index.html', { root: __dirname })
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})


// request page with or without .html using regEx // (.html)? //
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})


// redirect to new-page html file
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html') //302 by default
});


// Route handlers
// Try to get a file it dont exist and get the next file next() func
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html')
    next()
}, (req, res) => {
    res.send('Hello World!')
})


// chaining route handlers
const one = (req, res, next) => {
    console.log('I')
    next()
}

const two = (req, res, next) => {
    console.log('II')
    next()
}

const three = (req, res) => {
    console.log('III')
    res.send('Finished!')
}

app.get('/chain(.html)?', [one, two, three])


// sending custom 404 file
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

