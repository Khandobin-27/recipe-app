import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/App.css'
import { v4 as uuidv4 } from 'uuid'
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'recipe-app'

export default function App() {
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)


   //set recipes according to local-storage
   useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    //check if any recipes are exist in local storage
    //if yes, then we are setting the setRecipe state to that at start
    if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  
  //adding recipes to the local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(recipes))
  }, [recipes])


  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeChange(id, recipe) {
    //copying recipes array, to be able to modify it
    //as we cannot just change the state recipes
    const newRecipes = [...recipes]
    //geeting the index of selected recipe
    const index = newRecipes.findIndex(recipe => recipe.id === id)
    //now we addig this new modified recipe
    newRecipes[index] = recipe
    //updating the state
    setRecipes(newRecipes)
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }
    //below two setStates
    //after adding new recipe to the list, the fields will automatically 
    //appear in the recipeEdit section
    setSelectedRecipeId(newRecipe.id)
    //adding new recipe to the recipes list
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    //clearing out the selected recipe id, 
    //when there is no recipe corresponding to that id
    if (selectedRecipeId !== 0 && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }
  

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {/*have the recipeEdit section blank/empty until no recipe is selected
      so this code is based on short circuit evaluation*/}
      {selectedRecipe && <RecipeEdit selectedRecipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
}


const sampleRecipes = [
  {
    id: 1,
    name: 'Chicken',
    servings: 3,
    cookTime: '1:27',
    instructions: '1. Put salt on Chicken\n2. In owen\n3. Enjoy',
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '400g'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '10g'
      }
    ]
  },
  {
    id: 2,
    name: 'Beef',
    servings: 2,
    cookTime: '1:23',
    instructions: '1. Put pepper on pork\n2. In owen\n3. Enjoy',
    ingredients: [
      {
        id: 1,
        name: 'Beef',
        amount: '400g'
      },
      {
        id: 2,
        name: 'Pepper',
        amount: '127g'
      }
    ]
  }
]

