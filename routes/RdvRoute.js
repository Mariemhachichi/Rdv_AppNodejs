const express = require('express')
const Rdv = require('../models/Rdv')
const auth = require('../middelware/auth')
const router = express.Router()

//Ajouter Rdv
router.post('/rdv/add', async (req, res) => {
    const { date, professional, client, description } = req.body

    if (!professional) {
        return res.status(400).send({ message: 'Le champ professional est requis' })
    }

    if (!client) {
        return res.status(400).send({ message: 'Le champ client est requis' })
    }

    try {
        const newRdv = new Rdv({
            date,
            professional,
            client,
            description
        })

        // Sauvegarde du rendez-vous
        await newRdv.save()
        return  res.status(201).send({ message: 'Rendez-vous créé avec succès', rdv: newRdv })
    } catch (err) {
        return res.status(500).send({ message: 'Erreur serveur lors de la création du rendez-vous' })
    }
})
//Modifoer Rdv
router.put('/rdv/:id',async(req,res)=>{
    const {date,professional,client,description,status} = req.body
    const rdvId = req.params.id

    if (!professional){
        return res.status(400).send({message : 'le champ prof est requis'})
    }
    if (!client){
        return res.status(400).send({message : 'le champ client est requis'})
    }

try{
    const rdv = await Rdv.findById(rdvId)

    if (!rdv){
        return res.status(404).send({message:'Rendez-vous non trouvé'})
    }

    //mise à jour
    rdv.date = date || rdv.date
    rdv.professional = professional || rdv.professional
    rdv.client = client || rdv.client
    rdv.description = description || rdv.description
    rdv.status = status || rdv.status

    await rdv.save()
    res.status(200).send({ message: 'Rendez-vous modifié', rdv })
} catch(err){
    return res.status(500).send({ message: 'Erreur serveur' })
}
})
//Get all
router.get('/Rdvs',async (req,res)=>{
    try{
        const rdvs = await Rdv.find()
        // pour afficher le nom du professionnel
        .populate('professional', 'name') 
        .populate('client', 'name')       

        res.status(200).send(rdvs)
    }
    catch(err){
        res.status(500).send({message:'erreur serveur'})
    }
})
//delete
router.delete('/rdv/:id', async (req,res)=> {
    const rdvId = req.params.id
    try{
        const rdv = await Rdv.findByIdAndDelete(rdvId)

        if (!rdv) {
            return res.status(404).send({ message: 'Rendez-vous non trouvé' })
        }
        res.status(200).send({ message: 'Rendez-vous supprimé' })
    } catch (err) {
        res.status(500).send({ message: 'Erreur serveur lors de la suppression' })
    } 
})

module.exports = router;