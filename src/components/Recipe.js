import React, { useContext } from 'react'
import IngredientList from './IngredientList'
import { RecipeContext  } from './App'

export default function Recipe(props) {
    const {handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext)

    const {
        id,
        name,
        cookTime,
        servings,
        instructions,
        ingredients
    } = props 
    return (
        <div className='recipe'>
            <header className='recipe-header'>
                <h1 className='recipe-title'>{name}</h1>
                <div>
                    <button 
                    onClick={() => handleRecipeSelect(id)}
                    className='btn btn-primary mr-1'
                    >
                    Edit
                    </button>
                    <button 
                    onClick={() => handleRecipeDelete(id)}
                    className='btn btn-danger
                    '>
                        Delete
                    </button>
                </div>
            </header>
            <div className='recipe-row'>
                <span className='recipe-label'>Cook Time:</span>
                <span className='recipe-value'>{cookTime}</span>
            </div>
            <div className='recipe-row'>
                <span className='recipe-label'>Servings:</span>
                <span className='recipe-value'>{servings}</span>
            </div>
            <div className='recipe-row'>
                <span className='recipe-label'>Instructions:</span>
                <div className='recipe-value recipe-instructions recipe-value-indented'>{instructions}</div>
            </div>
            <div className='recipe-row'>
                <span>Ingredients</span>
                <div className="recipe-value recipe-value-indented">
                    <IngredientList ingredients={ingredients}/>
                </div>
            </div>
        </div>
    )
}
