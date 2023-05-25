const oracledb = require('oracledb');
const app = express();

app.set('view engine','ejs');
//oracle 정보
const dbConfig={
    user:'java'
    ,password:'oracle'
    ,connectString:'127.0.01:1521/XE'
}
app.get('/',async(req,res)=>{
    let conn;

    try{
        conn = await oracledb.getConnection(dbConfig);
        const result = await conn.execute(' SELECT * FROM employees  ');
        res.render('index',{data:result.rows});
    }catch(err){
        console.log(err);
        res.status(500).send('error');
    }finally{
        if(conn){
            try{
                conn.close();
            }catch(e){
                console.log(e);
            }
        }
    }
});

app.listen(3000,()=>{
    console.log('wart server');
});