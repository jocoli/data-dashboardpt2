import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const RecipeDetail = () => {
    const { id } = useParams();
    const [ information, setInformation ] = useState([]);
    const [ aDescription, setDescription] = useState([]);

    useEffect(() => {
        const getRecipeDetail = async () => {
            const details = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            );
            const description = await fetch(
                `https://api.spoonacular.com/recipes/${id}/summary?apiKey=${API_KEY}`
            );

            const detailsJson = await details.json();
            const descripJson = await description.json();

            console.log("Details JSON:", detailsJson);
            console.log("Description JSON:", descripJson);

            setInformation(detailsJson);
            setDescription(descripJson);
        
        };
        getRecipeDetail().catch(console.error);

    }, [id] );

    console.log("Information:", information);
    console.log("Description:", aDescription);
    return(
        <div>
            
            {information ? (
                <div>
                    <h1>{information.title}</h1>
                    <img
                        src={information.image}
                        alt={`Image of ${information.title}`}
                    />
                    <p>{aDescription.summary}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
};

export default RecipeDetail;