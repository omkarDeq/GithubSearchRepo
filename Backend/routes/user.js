const { default: axios } = require('axios');
const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

// Helper Function to get User Details
const getUserDetails = async (url)=>{
    const header = {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };
    const response = await axios.get(url, { headers: header });
    return response.data;
}

// Get All Users with Pagination
router.get('/users', async (req,res)=>{
    
    console.log(req.originalUrl)
    
    try{
        const search = req.query.q;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page * limit) - limit || 0;
        let results = [];

        const searchRegex = new RegExp(search, "i");
        const users_count = await User.countDocuments({ name: { $regex: searchRegex } });
        const db_users = await User.find({ name: { $regex: searchRegex } }).skip(skip);

        // When we find the user in our DB
        if(db_users.lenght>0){
            console.log('Found Users')
            res.send({ statusCode: 200, data: { items: db_users, total_counts: users_count }, message: 'Users fetched' });
        }
        else // User not found in DB
        {
            const headerData = {
                Authorization: `token ${process.env.GITHUB_TOKEN}`
            }
    
            axios
                .get(
                    `https://api.github.com/search/users?q=${search}&page=${page}&per_page=${limit}`,
                    { headers: headerData }
                )
                .then(response=>{
                    results = response.data.items;
                    let promises = [];
                    let users = [];
                    results.forEach((user) => {
                        promises.push(
                            getUserDetails(user.url).then((result) => {
                            if (result.name || result.login) {
                                const regex = new RegExp(search, "i");
                                if (result.name?.match(regex) || result.login.match(regex)) {
                                    users.push(result);
                                }
                            }
                            })
                            .catch(err=>{
                                console.log("Error in getting user details:", err)
                            })
                        );
                    });
    
                    return Promise.all(promises).then(() => {
                        const saveData = User.insertMany(users);
                        res.send({ statusCode: 200, data: { items: users, total_counts: response.data.total_count }, message: 'Successfully fetched Users' });
                    });  
                })
                .catch(err=>{
                    console.log("Error:", err.message)
                    res.send({statusCode:400, data:null, message: 'Error in Fetching Users!'})
                })
        }


    }
    catch(err){
        console.log('Error in processing Get Repos Request:', err.message)
    }
})




module.exports = router;