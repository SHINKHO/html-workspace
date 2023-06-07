const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const db = require('./db');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const crypto = require('crypto');

const oneday = 1000*60*60*24;
const secretKey = crypto.randomBytes(64).toString('hex');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret : secretKey,
    saveUninitialized :true,
    coockie : {maxAge : oneday},
    resave : false
}));
app.use(cookieParser());


io.on('connection', (socket)=>{
    console.log('a user connected');

    
    socket.on('chat message',(msg)=>{
        console.log('message : '+msg);
        io.emit('chat message',msg);
    });
    
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/demo/index.html');
});

app.post('/login', async (req,res)=>{
    let user_id = req.body['user_id'];
    let user_pw = req.body['user_pw'];
    console.log('user_id ,user_pw:',user_id,',',user_pw);
    let conn;
    try{
        conn = await db.getConn();
        //:1 :2 위치 바인딩
        //:emp_id :nm 이름 바인딩
        const result = db.selectData("SELECT count(*) FROM user_catch WHERE user_id = :1 AND user_pw=:2 ",[user_id,user_pw]);
        console.log(result);
    
        // Check if the user is authenticated
        if (result.rows[0][0] > 0) {
        // Set the user_id in the session
        req.session.user_id = user_id;
        
        // Set a cookie with the user_id
        res.cookie('user_id', user_id);
        
        res.send('Logged in successfully!');
        } else {
        res.send('Invalid credentials');
        }       
    }catch(err){
        console.log(err);
        res.status(500).send('error');
    }finally{
        if(conn){
            try{
                await conn.close();
            }catch(err){
                console.log(err);
            }
        }
    }
});

server.listen(3000,()=>{
    console.log('listening on * : 3000')
});