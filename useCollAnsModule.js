const collectAnswers = require("./lib/collectAnswers");

const questions = [
    "What is your name?",
    "What would you rather be doing?",
    "What is your prefered programming language?"
];

collectAnswers(questions, answers => {
    console.log(answers);
    process.exit();
});