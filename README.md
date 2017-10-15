## Project overview
The goal of this project is to build and test mass voting systems in Javascript. In the running instance, a test is run which will build a random number of voters who vote for a number of parties. The application can run assessments on the data and return a candidate with the most votes, or alternatively all tied candidates.

### Running the project ###
The application can be run at https://izzykupferstein.github.io/js-election-simulator/. There will be a 2+ second delay as data is being generated. See console for logged output.

There is an exposed variable `election` you can use to access the Election Object.

The `election` Object's structure is as follows:

`{ candidates: [{ name: 'Abe Lincoln', votes: [{ name: 'James Green', age: 42, gender: 'male' }, ... ], ... ] }`
