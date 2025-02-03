import express from 'express';
import initApp from './src/index.router.js';

const app = express();
app.use(express.json());

initApp(app);

app.listen(9000,()=>{
    console.log("running on port 9000...");
});