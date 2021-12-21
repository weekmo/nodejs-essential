const readline = require("readline");
//const { EventEmitter } = require("events");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = (questions, callback = f => f) => {
    answers = [];
    const [firstQuestion] = questions;
    const questionAnswerd = answer => {
        answers.push(answer);
        if (answers.length < questions.length) {
            rl.question(questions[answers.length], questionAnswerd);
        } else {
            callback(answers);
        }
    };
    rl.question(firstQuestion, questionAnswerd);
};