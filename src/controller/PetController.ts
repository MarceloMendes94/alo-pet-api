import { Request, Response } from "express";

let listaDePet = [];
export default class PetController{
    criaPet(req:Request,res:Response){
        //code here
        const novoPet = req.body;
        listaDePet.push(novoPet);
        return res.status(201).json(novoPet);
    }
}