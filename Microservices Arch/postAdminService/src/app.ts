import * as express from 'express';
import { Request, Response } from 'express';
import * as cors from 'cors';
import {createConnection} from "typeorm"
import { Post } from './entity/post';

createConnection().then(db=>{
    const postRespository = db.getRepository(Post)

    const app = express();
    app.use(cors({
        origin:['http://localhost:3000']
    }))
    
    app.use(express.json());

    app.get('/api/posts', async (req: Request, res: Response) =>{
        const posts = postRespository.find();
        res.json(posts)
    })
    
    console.log('Listening to port 8000')
    app.listen(8000)
})
