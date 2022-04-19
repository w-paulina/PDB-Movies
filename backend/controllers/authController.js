const bcrypt = require('bcrypt'); // hashowanie haseł
const pool = require('../models/db');  //database   
const Joi = require('joi'); 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const signUp = async(req,res) =>{
   
    const schema = Joi.object({
        nickname: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).required(),
        repeatPassword: Joi.any().valid(Joi.ref('password')).required()
    });

    const validation = schema.validate(req.body);    //sprawdzenie walidacji 
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }   

    try{  

    const hashedPassword =  await bcrypt.hash(req.body.password, 10); //hashowanie hasła       
   

    pool.query(
        'SELECT * FROM users' + 
        ' WHERE email = $1', [req.body.email],
        (err, results) => {
            if(err){
                throw err;
            }        

            if(results.rows.length >0){
                res.status(422).send('Email is already registered');
               //render Email is already registered
            }else{                    
                pool.query(
                    'INSERT INTO users (nickname,email,password)' +
                     'VALUES ($1, $2, $3)' +
                     'RETURNING user_id, password', [req.body.nickname, req.body.email, hashedPassword],  
                    (err, results) => {
                        if(err){
                            throw err;                        
                    } 
                    else{
                        res.status(200).send('Signup succesfull');
                    }
                })             
            }
      }
    )   
    }catch(err){
        console.log(req.email,req.password)
        res.status(500).send()
   }  
   
};

const signIn = async (req,res) =>{

    try{

    pool.query('SELECT * FROM users' + 
    ' WHERE email = $1', [req.body.email],
    (err, results) => {
        if(err){
            throw err;
        }

        if(results.rows.length > 0){


            bcrypt.compare(req.body.password,results.rows[0].password).then((result)=>{ //porownanie zahashowanego hasla
            if(result){
                //console.log(results.rows[0].user_id) 
                const token = jwt.sign({
                    user_id : results.rows[0].user_id,
                }, process.env.TOKEN_SECRET);

                // res.cookie('token', token, {
                //     secure: true, // set to true if your using https
                //     httpOnly: true,
                //     sameSite: 'lax'
                //   }).send(token);
                // res.end();
                res.status(200).send({
                    status : "Ok",
                    token : token
                })
                //res.send('Login success');
                // do stuff
            } else {
                res.status(401).send('Wrong email or password');
                // do other stuff
            }
            })
            .catch((err)=>console.error(err))


        }
         else{ 
            res.status(401).send("Wrong email or password");
         }

        })
    }catch(err){
         console.log(err)
         res.status(500).send()
     } 



};

const signOut = async(req,res) =>{
    res.clearCookie("token");
    res.status(200).send('User signed out successfully');
}

const getCurrentUser = async(req,res) => {
    const currentUser = req.user;

    if(!currentUser) res.status(400).send('User is not logged in'); 

    try{
        pool.query('SELECT * FROM users WHERE user_id=$1',[currentUser.user_id],(err,results)=>{

            res.status(200).send(results.rows[0]);
            //console.log(results.rows[0]);
        })
    }catch(err){
        console.log(err);
        return res.status(500).send('Database err'); 
    }
};



module.exports = {
    signUp,
    signIn,    
    signOut,
    getCurrentUser 
};