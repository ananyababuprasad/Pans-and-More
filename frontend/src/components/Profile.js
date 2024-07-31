import React,{useEffect,useState} from 'react'
import {useAuthContext} from '../hooks/useAuthContext';
import {useNavigate,useParams} from 'react-router-dom'
import RecipeList from './RecipeList';
import {useRecipesContext} from '../hooks/useRecipesContext'
import {toast} from 'react-toastify';

const Profile =()=>{
    const {user}=useAuthContext();
    const {uid}=useParams();
    const {state,dispatch}=useRecipesContext();
    const navigate=useNavigate();
    const {recipes}=state;
    const [username,setusername]=useState('');
    const [bio,setbio]=useState('');

    useEffect(()=>{
        const fetchRecipes=async(id)=>{
            const response=await fetch('/api/other/'+id+'/recipes');
            const json=await response.json();
            if(!response.ok){
                toast.error("Couldn't fetch recipes");
            }
            else{
                dispatch({type:"SET_RECIPES",payload:json.recipes});
            }
        }
        
        const fetchuser=async(id)=>{
            const response=await fetch('/api/other/'+id+'/profile')
            const json=await response.json()
            if(response.ok){
                setusername(json.username);
                setbio(json.bio);
            }
            else{
                toast.error("Couldn't get profile details")
            }
        }
            fetchRecipes(uid)
        if(uid && user && user.user._id!==uid){
            fetchuser(uid)
        }
        else{
            if(user && user.user){
                setusername(user.user.username)
                setbio(user.user.bio)
            }
        }
    },[user,uid])

    const handleClick=()=>{
        navigate('/updateprofile')
    }

    const clickLiked=()=>{
        navigate('/user/liked');
    }
    const clickSaved=()=>{
        navigate('/user/saved');
    }

    return(
        <div className="profile">
            {
                user && (user.user._id===uid) &&
                <div>
                    <div className="user-info-profile">
                    <h2>{username}</h2>
                    <span className="material-symbols-outlined" onClick={handleClick}>
                        edit
                    </span>
                    </div>
                    <p>{bio}</p>
                    <br/>
                    <button onClick={clickLiked}>Liked Recipes</button>
                    <button onClick={clickSaved}>Saved Recipes</button>
                    <br/>
                    <h3>My recipes</h3>
                </div>
            }
            {
                ((!user) || (user.user._id!==uid)) &&
                <div>
                    <h2>{username}</h2>
                    <p>{bio}</p>
                    <h3>recipes by {username}</h3>
                </div>
            }
                <div className="recipe-list">
                    {recipes.length===0 && <p>No recipes yet</p>}
                    {recipes && recipes.length >0 && recipes.map((recipe)=>(<RecipeList key={recipe._id} recipe={recipe}/>))}
                </div>
        </div>
    )
}

export default Profile;