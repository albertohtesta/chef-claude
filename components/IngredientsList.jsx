export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));
  return (
    <section aria-busy={props.isLoading ? "true" : "false"}>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.isLoading && (
        <div className="loading-spinner" aria-live="assertive">
          <div className="spinner"></div>
          <p>Generating your recipe…</p>
        </div>
      )}
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe} disabled={props.isLoading}>
            {props.isLoading ? "Loading..." : "Get a recipe"}
          </button>
        </div>
      )}
    </section>
  );
}
