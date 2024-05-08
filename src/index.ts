import express, { Request, Response } from 'express';
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express Hok 123');
});

app.post('/roman-to-integer', (req: Request, res: Response) => {

    const { roman } = req.body;
    const integer = translateRomanToInt(roman); // Implement translateRomanToDecimal function

    res.json({ integer });

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Function to translate Roman numerals to decimal numbers
function translateRomanToInt(romanString:string) {
    // Define the type for the Roman mapping object
    type RomanMapping = {
        [key: string]: number; // Key is a string (Roman numeral), value is a number
    };
    
    // define roman mapping
    const romanMapping: RomanMapping  = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    let romanNumeral = romanString.toUpperCase();

    let result:number = 0;


    for (let i = 0; i < romanNumeral.length; i++) {
        // get the current letter and the next letter

        // example: romanNumeral = 'IV'
        let currentLetter:string = romanNumeral[i];
        let nextLetter: string = romanNumeral[i + 1];

        // get the value of the current letter
        let currentValue = romanMapping[currentLetter];
        let nextValue = romanMapping[nextLetter];

        // validate if the current value is invalid input or not
        // Check for invalid input
        if (currentValue === undefined) {
               throw new Error('Invalid Roman numeral: ' + currentLetter);
        }

        // if the current letter is less than the next letter, subtract the current letter from the result
        if (nextValue && (currentValue < nextValue)) {
            result -= currentValue;
        } else {
            result += currentValue;
        }

    }

    return result;

}
