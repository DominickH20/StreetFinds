import express = require('express');
import Find from '../models/find.model';
const findsRouter = express.Router();

findsRouter.route('/').get((req, res, next) => {
  Find.find()
    .then(finds => res.json(finds))
    .catch(next)
});

findsRouter.route('/add').post((req, res, next) => {
  const geolocation = req.body.geolocation;
  const address_near = req.body.address_near;
  const main_street = req.body.main_street;
  const cross_street = req.body.cross_street;
  const title = req.body.title;
  const quality = req.body.quality;
  const description = req.body.description;
  const tags = req.body.tags;
  const img_ts = req.body.img_ts;
  const img_user = req.body.img_user;
  const img_s3_url = req.body.img_s3_url;

  const newFind = new Find({
    geolocation,
    address_near,
    main_street,
    cross_street,
    title,
    quality,
    description,
    tags,
    img_ts,
    img_user,
    img_s3_url
  });

  newFind.save()
    .then(() => res.json('Find added!'))
    .catch(next);
});

export default findsRouter; 
