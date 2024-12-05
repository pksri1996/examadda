const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization.js');


router.get('/createOrg', async (req, res) => {
    res.render('createOrg');
});

router.post('/createOrg',async (req,res)=>{
    const newOrg = new Organization ({
        orgName: req.body.orgName
    });
    await newOrg.save()
    .then((data)=>{
        console.log(data);
        res.redirect('/createOrg');
    })
    .catch((err)=>{
        console.log(err);
        res.render("The Organization Already exist");
    })
})

module.exports = router;