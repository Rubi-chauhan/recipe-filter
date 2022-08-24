const express = require('express')
const router = express.Router();

const {createRecipe, getRecipeById} = require('../Contollers/recipeController')

router.post('/recipes', createRecipe);
router.get('/recipesById', getRecipeById)


module.exports = router;