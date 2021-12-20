let hello = "Hello World from NODE JS";

console.log(hello);
console.log(process.pid);

const grab = flag => {
    let indexAfterFlag = process.argv.indexOf(flag) + 1;
    return process.argv[indexAfterFlag];
}

const greeting = grab("--greeting");
const user = grab("--user");

console.log(`${user} says ${greeting}`);