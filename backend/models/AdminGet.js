const  adminlogin= require('../models/adminmodel');


const fs = require('fs');
const path = require('path')

exports.getadmin =async (username) => {
  

    const bufferData = await adminlogin.find({});

    // const jsonData = JSON.parse(bufferData);

    const filteredUser =  bufferData .username == username
   

    

    if(filteredUser.length > 0) {
        return filteredUser[0];
    }
    return null
}
