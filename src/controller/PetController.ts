import { Request, response, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";




let listaDePet: Array<TipoPet> = [];
let id = 0;
function geraId() {
  id = id + 1;
  return id;
}
export default class PetController{
    criaPet(req:Request,res:Response){
        //code here
        const {nome,dataNascimento,adotado,especie} = <TipoPet>req.body;
        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({mensagem: "tipo de especie não aceitado no sistema"})
        }
        const novoPet: TipoPet = {id:geraId(),nome,dataNascimento,adotado,especie};
        listaDePet.push(novoPet);
        return res.status(201).json(novoPet);
    }
    listaPets(req:Request,res:Response){
        return res.status(200).json(listaDePet);
    }
    atualizaPet(req:Request,res:Response){
        // verificar se o pet existe
        const id = req.params.id;
                const pet = listaDePet.find((pet)=>pet.id===Number(id));
        if(!pet){
            return res.status(404).json({"erro": "Pet não encontrado!"});
        }
        //caso existir atualiza
        const { adotado, especie, nome, dataNascimento } = <TipoPet>req.body;
        pet.nome = nome;
        pet.adotado = adotado;
        pet.dataNascimento = dataNascimento;
        pet.especie = especie;        
        return res.status(200).json(pet);
    }
    deletaPet(req:Request,res:Response){
        const {id}= req.params;
        const pet = listaDePet.find((pet)=>pet.id===Number(id));
        if(!pet){
            return res.status(404).json({"erro": "Pet não encontrado!"});
        }
        const index = listaDePet.indexOf(pet);
        listaDePet.splice(index,1);
        return res.status(200).json({mensagem:"Pet removido da lista"});
    }
}