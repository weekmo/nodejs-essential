const beep = () => process.stdout.write("\x07");

var counter = 0;
setInterval(()=> {
    beep();
    console.log(`Interval ${counter} times ....`);
    if(counter > 10 ) process.exit();
    counter+=1;
}, 500);