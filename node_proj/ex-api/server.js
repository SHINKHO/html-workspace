// npm install node-fetch@2 cors express ejs

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.set('view engine','ejs');
const url = require('url');

const cors = require('cors');
//특정 오리진 허용
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
//전체 허용
app.use(cors());
app.get('/',async(req,res)=>{
    res.render('index');
});

app.get('/search', async(req,res)=>{
    console.log(req.query);
    const apiUrl = new url.URL('https://openapi.naver.com/v1/search/local');
    //key value 찾아서 url 인코딩
    apiUrl.search =  new url.URLSearchParams({
        query : req.query.query,
        display : req.query.display
    }).toString();

    const response = await fetch(apiUrl,{
        method : 'GET',
        headers : {'X-Naver-Client-Id':'Hdt08MnJNiqX9AkF9jAN' ,
                   'X-Naver-Client-Secret':'R41Z6RcvvI',
                   'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
    res.json(data);
});

app.listen(port,()=>{
    console.log('start');
});

