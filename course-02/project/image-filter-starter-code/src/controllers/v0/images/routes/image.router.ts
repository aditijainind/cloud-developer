import { Router, Request, Response } from 'express';
import { requireAuth } from '../../users/routes/auth.router';
import {filterImageFromURL, deleteLocalFiles} from '../../../../util/util';

const router: Router = Router();

router.get( "/filteredimage", 
    requireAuth,
    async ( req: Request, res: Response ) => {
        const imageUrl = req.query.image_url;
        console.log('Requested url:', imageUrl);

        if(typeof imageUrl==='undefined' || !imageUrl.trim())
            res.status(400).send(`Missing parameter: image_url`);

        let filepath = await filterImageFromURL(imageUrl);
        console.log("FILEPATH: ", filepath);

        res.status(200).sendFile(filepath,(err) => {
            if (err) { return res.status(422).send(err.message); }
            deleteLocalFiles([filepath]);
        });
    });

export const ImageRouter: Router = router;
