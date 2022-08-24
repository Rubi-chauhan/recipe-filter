const recipeModel = require('../Models/recipeModel')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  
  const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
  };

  const createRecipe = async function (req, res){
    try{
        const data = req.body
        let {id, name, ingredients} = data

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide input" });
          }

          if (!isValid(id)) 
            {
              return res.status(400).send({ status: false, message: "Please provide id" });
            }
          if (!isValid(name)) 
            {
              return res.status(400).send({ status: false, message: "Please provide name" });
            }
          
          if (!isValid(ingredients)) 
            {
              return res.status(400).send({ status: false, message: "Please provide ingredients" });
            }

            if (ingredients) {
                // const parsedAddress = JSON.parse(data.ingredients);
                // ingredients = parsedAddress;

                // JSON.parse(JSON.stringify)
                data.ingredients = ingredients

                if (!isValid(ingredients.quantity)) {
                  return res.status(400).send({ status: false, message: "Quantity is required" })
                }
                if (!ingredients.name) {
                  
                    return res.status(400).send({ status: false, message: "Please provide name of ingredient" });
                  
                }
          
                if (!ingredients.type) {
                    return res.status(400).send({ status: false, message: "Please provide type of ingredient" });
                  
                }
            }
          

            //create body
    let recipeCreated = await recipeModel.create(data);
    res.status(201).send({ status: true, message: "Recipe created successfully", recipeCreated });
    }
    catch (error) {
        res.status(500).send({ status: false, Error: "Server not responding", message: error.message, });
    }
  }

  const getRecipeById = async function(req,res){
    try{
        const id = req.query.id

        if (!id) {
            return res.status(400).send({ status: false, message: "Please provide product Id" })
        }

        const findRecipe = await recipeModel.findOne({ id: id, isDeleted: false })

        if (!findRecipe) {
            return res.status(404).send({ status: false, message: "Recipe not found or it maybe deleted" })
        }
        return res.status(200).send({ status: true, message: "Recipe details", data: findRecipe })

    }
    catch (error) {
        res.status(500).send({ status: false, Error: "Server not responding", message: error.message, });
    }

  }
  module.exports = {createRecipe, getRecipeById}