const bcrypt = require('bcrypt'); // hashowanie haseł
const pool = require('../models/db');  //database   
const Joi = require('joi'); 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const getUserById = async(req,res) =>{

    try{
        pool.query('SELECT * FROM users WHERE user_id=$1',[req.params.id],(err,results)=>{

            res.status(200).send(results.rows);
        })
    }catch(err){
        console.log(err);
    }
};

const getUsersToSearch = async (req,res) =>{
    const user_id = req.user.user_id
    try{
        pool.query('SELECT * FROM users WHERE user_id<>$1',[user_id],(err,results)=>{        
            if(err) throw err;
            else res.status(200).send(results.rows);
            //console.log(results);
        })
    }catch(err){
        console.log(err);
    }
   
}

const getUsers = async (req,res) =>{
   
    try{
        pool.query('SELECT * FROM users',(err,results)=>{        
            if(err) throw err;
            else res.status(200).send(results.rows);
            //console.log(results);
        })
    }catch(err){
        console.log(err);
    }
   
}

const changePassword = async(req,res) => {
    const user_id = req.user.user_id;
    const body = req.body;

    const schema = Joi.object({     
        currentPassword : Joi.required(),
        newPassword: Joi.string().min(8).required(),
        repeatNewPassword: Joi.any().valid(Joi.ref('newPassword')).required()
    });

    const validation = schema.validate(body);    //sprawdzenie walidacji 
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }   

    try
    {

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    
    pool.query('SELECT * FROM users' + 
    ' WHERE user_id = $1', [user_id],
    (err, results) => {
        if(err){
            throw err;
        }            
        
        if(results.rows.length > 0){   
            console.log(results.rows[0])
            bcrypt.compare(body.currentPassword,results.rows[0].password).then((result)=>{ //porownanie zahashowanego hasla
                if(result){
                           
                                  
                        pool.query('UPDATE users' + 
                        ' SET password=$1 WHERE user_id=$2', [hashedPassword, user_id],
                        (err, results) => {
                            if(err)
                            throw err;
                            else res.status(200).send('Password changed succesfully')
                        })
                }
                else res.status(401).send('Wrong current password');
            })            
          
        } else res.status(404).send('User not found')
               
            
    })}catch(err){
        console.log(err)
        res.status(500).send('Oops, something went wrong');
    }

}

const changeNickname = async(req,res) => {
    const user_id = req.user.user_id;
    const body = req.body;

    const schema = Joi.object({     
        newNickname : Joi.string().min(3).max(12).required()       
    });

    const validation = schema.validate(body);    //sprawdzenie walidacji 
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    } 
    
    try{
        pool.query('SELECT * FROM users WHERE user_id=$1',[user_id],(err,results)=>{        
            if(err) throw err;

            if(results.rowCount>0){

                pool.query('UPDATE users SET nickname=$1 WHERE user_id=$2',[body.newNickname,user_id],
                (err,results)=>{        
                        if(err) throw err;
                        else res.status(200).send('Nickname changed succesfully');
                        //console.log(results);
                    })
                }            
            else res.status(404).send('User not found');
            //console.log(results);
        })
    }catch(err){
        console.log(err);
    }
   
    
}

const changeProfilePic = async(req,res) =>{
    const user_id = req.user.user_id;
    const body = req.body;

    const schema = Joi.object({     
        newProfilePicture : Joi.string().required()       
    });

    const validation = schema.validate(body);    //sprawdzenie walidacji 
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    } 
    
    try{
        pool.query('SELECT * FROM photos WHERE photo_path=$1',[body.newProfilePicture],(err,results)=>{        
            if(err) throw err;

            if(results.rowCount>0){

                pool.query('UPDATE users SET profile_picture=$1 WHERE user_id=$2',[body.newProfilePicture,user_id],
                (err,results)=>{        
                        if(err) throw err;
                        else res.status(200).send('Profile picture changed succesfully');
                        //console.log(results);
                    })
                }            
            else res.status(404).send('Picture not found');
            //console.log(results);
        })
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getUsers,
    getUsersToSearch,
    getUserById,
    changePassword,
    changeNickname,
    changeProfilePic
};