import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import { v4 as uuidv4 } from 'uuid'



export default function RecipeEdit({selectedRecipe}) {
    const {handleRecipeChange, handleRecipeSelect} = useContext(RecipeContext)

    function handleChange(changes) {
        //add everyting from selectedRecipe
        //and then adding everything from changes and overwriting anything there
        handleRecipeChange(selectedRecipe.id, {...selectedRecipe, ...changes})
        //so by the means of that fucntion now selectedRecipe is going to have 
        //all same info except the things that we changes (they will be overwritten)
    }

    //function for changin the ingredients (same as handleRecipeChange func)
    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...selectedRecipe.ingredients]
        const index = newIngredients.findIndex(ingredient => ingredient.id === id)
        newIngredients[index] = ingredient
        //setting the ingredients to a newIngredients value
        handleChange({ingredients: newIngredients})
    }

    function handleIngredientAdd() {
        const newIngredient = {
            id: uuidv4(),
            name: '',
            amount: ''
        }
        handleChange({ingredients: [...selectedRecipe.ingredients, newIngredient] })
    }

    function handleIngredientDelete(id) {
        handleChange({ingredients: selectedRecipe.ingredients.filter(i => i.id !== id)})
    }

    return (
        <div className='recipe-edit'>
            <div className='recipe-edit-remove-button-container'>
                {/*code for the X button*/}
                <button 
                //deleting the edit filed (undefined === nothing selected)
                onClick={() => handleRecipeSelect(undefined)}
                className='recipe-edit-remove-button'
                >
                &times;
                </button>
            </div>
            <div className='recipe-edit-details-grid'>
                <label className='recipe-edit-label' htmlFor='name'>Name</label>
                <input 
                value={selectedRecipe.name}
                className='recipe-edit-input gr' 
                type='text' 
                name='name' 
                id='name' 
                //every single time when we want to make change
                onInput={e => handleChange({name: e.target.value})}
                />

                <label className='recipe-edit-label' htmlFor='cookTime'>Cook Time</label>
                <input
                value={selectedRecipe.cookTime}
                className='recipe-edit-input gr' 
                ecipe-edit-inputtype='text' 
                name='cookTime' 
                id='cookTime'
                onInput={e => handleChange({cookTime: e.target.value})}
                />
                
                <label className='recipe-edit-label' htmlFor='servings'>Servings</label>
                <input 
                value={selectedRecipe.servings}
                className='recipe-edit-input gr' 
                type='number' 
                min='1' 
                name='servings' 
                id='servings'
                //using parseInt to get number, not string, and after empty string as a fallback value
                onInput={e => handleChange({servings: parseInt(e.target.value) || ''})} 
                />
                
                <label className='recipe-edit-label' htmlFor='instructions'>Instructions</label>
                <textarea name='instructions' 
                id='instructions' 
                className='recipe-edit-input gr'
                onInput={e => handleChange({instructions: e.target.value})}
                //to avoid console mistake
                value={selectedRecipe.instructions}
                >
                </textarea>
            </div>
            <br />
            <label className='recipe-edit-label'>Ingredients</label>
            <div className='recipe-edit-ingredient-grid'>
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {selectedRecipe.ingredients.map(ingredient => {
                    return (
                        <RecipeIngredientEdit 
                        key={ingredient.id}
                        handleIngredientDelete={handleIngredientDelete}
                        ingredient={ingredient}
                        handleIngredientChange={handleIngredientChange}
                        />
                    )
                })}
            </div>
            <div className='recipe-edit-add-ingredient-btn-container'>
                <button
                onClick={() => handleIngredientAdd()}
                className='btn btn-primary'
                >
                Add Ingredient</button>
            </div>
        </div>
    )
}
