const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    const newQuote = getRandomElement(quotes);
    res.status(200).send({
        quote: {
            ...newQuote
        }

    });
});

app.get('/api/quotes', (req, res) => {
    const { person } = req.query;
    if (person) {
        const personQuotes = quotes.filter(quote => {
            return quote.person === person;
        });
        res.status(200).send({
            quotes: personQuotes
        });
    }
    if (!person) {
        res.status(200).send({
            quotes: quotes
        });
    }

});

app.post('/api/quotes',(req,res) =>{
    const { quote,person } = req.query;
    if(!quote || !person){
        res.status(400).send();
    }
    else{
        const newQuote = {
            quote: quote,
            person: person
        }
        quotes.push(newQuote);
        res.send({
            quote: newQuote
        });
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});