const { error } = require('console');
const express= require('express');
const fs = require('fs')
const port=process.env.PORT || 5000;
const app = express();
app.use(express.static('client'))
app.use(express.urlencoded())


app.post('/formpost',(req,res)=>{
    fs.writeFileSync('writeMe.txt', JSON.stringify(req.body))
    res.sendFile(__dirname+'/client/signup.html')
})

app.get("/read", (req, res)=>{
    const file = JSON.stringify(fs.readFileSync("writeMe.txt", {encoding: 'utf-8'}))
    res.send(file)
})
app.post('/login',(req,res)=>{
    const file2 = JSON.parse (fs.readFileSync('writeMe.txt', {encoding: 'utf-8'}))
    console.log(file2)
    console.log(req.body)
    if(file2.username == req.body.username){
        if(file2.password == req.body.password){
            res.sendFile(__dirname+'/client/home.html')
            console.log('match')
        }
        else{
            res.send('invalid username or password')
        }
    }
    else {
        res.send('invalid username or password')
    }
})


app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
});

