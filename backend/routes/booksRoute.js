import express from "express"
import {Book} from '../models/bookModel.js' 

const router= express.Router();

//route for save a new book
router.post('/',async (req, res)=>{
    try{
        if(!req.body.title ||!req.body.author || !req.body.publishYear ){
            return res.status(400).send({message:'send all required fields: title,auther,published year'})
        }
        const newBook={
            title: req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };

        const book=await Book.create(newBook);
        return res.status(201).send(book); //json
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

//get all books
router.get('/',async (req, res)=>{
    try{
        const books=await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

//get one book using id
router.get('/:id',async (req, res)=>{
    try{
        const {id} =req.params;

        const book=await Book.findById(id);
        return res.status(200).json(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

//update a book using id
router.put('/:id',async (req, res)=>{
    try{

        if(!req.body.title ||!req.body.author || !req.body.publishYear ){
            return res.status(400).send({message:'send all required fields: title,auther,published year'})
        }

        const {id} =req.params;

        const result=await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).send({message:'Book not found!'})
        }
        return res.status(200).send({message:'Book updated sucsessfully!'})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

//delete a book using id
router.delete('/:id',async (req, res)=>{
    try{
        const {id} =req.params;

        const result=await Book.findByIdAndDelete(id, req.body);
        if(!result){
            return res.status(404).send({message:'Book not found!'})
        }
        return res.status(200).send({message:'Book deleted sucsessfully!'})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

export default router;