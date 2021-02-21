import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import "./App.css";
const App = () => {
  // api details
  const id = "4cbd6aa9";
  const key = "aa5cd345bc8af6cd59008673ed951453	";

  const [recipes, setrecipes] = useState([]);
  const [search, setsearch] = useState("");
  const [query, setquery] = useState("banana");

  // fetching data

  const getRecipies = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}`
    );
    const data = await response.json();
    setrecipes(data.hits);
  };

  useEffect(() => {
    getRecipies();
  }, [query]);

  // get input

  const text = (e) => {
    setsearch(e.target.value);
  };

  // update search on click

  const update = (e) => {
    e.preventDefault();
    setquery(search);
    setsearch("");
  };

  //main return

  return (
    <div className="App">
      <form className="form" onSubmit={update}>
        <input className="search" onChange={text} type="text" />
        <button className="button" type="text">Search</button>
      </form>
      <div className="recipies">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={ recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
