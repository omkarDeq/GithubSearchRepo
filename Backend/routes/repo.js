const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get All Repositories with Pagination
router.get('/repos', async (req,res)=>{
    
    console.log(req.originalUrl)

    try{
        const search = req.query.q;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page * limit) - limit || 0;
        let results = [];

        const headerData = {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        };

        axios
            .get(
              `https://api.github.com/search/repositories?q=${search}&page=${page}&per_page=${limit}`,
              { headers: headerData }
            )
            .then(function (response) {
              res.send({statusCode: 200, data: response.data, message: 'Successfully Fetched Repositories' });
            })
            .catch(function (err) {
              res.send({statusCode: 400, data: null, message: err.message });
            });
    }
    catch (err){
        console.log('Error in processing Get Repos Request:', err)
    }
})

module.exports = router;