from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from urllib.parse import quote_plus
from pymongo import MongoClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import traceback


import re
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL/public url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"Hello": "World"}

def make_connection():
    username = "adt_group19"
    password = "adt_group19"
    cluster_address = "cluster0.cumon8s.mongodb.net"
    database_name = "MovieIndustryAnalysis"

    escaped_username = quote_plus(username)
    escaped_password = quote_plus(password)
    connection_string = f"mongodb+srv://{escaped_username}:{escaped_password}@{cluster_address}/"

    client = AsyncIOMotorClient(connection_string)  # Use AsyncIOMotorClient for asynchronous operations

    return client


class UserCreate(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str = ''

class UserValidate(BaseModel):
    email: str
    password: str

class loginModel(BaseModel):  # Assuming you have a LoginModel defined
    email: str
    password: str
    first_name: str
    last_name: str
class deleteModel(BaseModel):  # Assuming you have a LoginModel defined
    email: str
    password: str

class UserResponse(BaseModel):
    message: str
    user_id: str
    
@app.post('/addUser', response_model=dict)
async def add_user(user: UserCreate):
    try:
        email_regex = r'^\S+@\S+\.\S+$'
        pass_regex = r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$'

        if not re.match(email_regex, user.email) or not re.match(pass_regex, user.password):
            raise HTTPException(status_code=422, detail='Unprocessable Entity: Email or password does not meet requirements!')

        new_user = {
            'email': user.email,
            'password': user.password,
            'first_name': user.firstName,
            'last_name': user.lastName,
        }
        client = make_connection()
        db = client["MovieIndustryAnalysis"]
        collection_users = client["MovieIndustryAnalysis"]["users"]
        login_user = await collection_users.insert_one(new_user)

        return {'message': 'User Added Successfully!', 'user_id': str(login_user.inserted_id)}
        #return UserResponse(message='User Added Successfully!', user_id=str(login_user.inserted_id))
    
    except Exception as e:
        #pass
        raise HTTPException(status_code=402, detail=f'Error while trying to parse the req body: {str(e)}')
        # raise HTTPException(status_code=402, detail=f'Error while trying to parse the req body: {str(e)}')
        

@app.get("/users", response_model=List[loginModel])
async def get_users():
    try:
        client = make_connection()
        db = client["MovieIndustryAnalysis"]
        collection_users = db["users"]
        users_cursor = collection_users.find()

        users = await users_cursor.to_list(length=None)
        
        response = [loginModel.parse_obj(user) for user in users]
        return response
    except Exception as error:
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')
    
@app.get("/usersValidate", response_model=List[loginModel])
async def get_users(email: str, password: str):
    try: 
        if email and password:
                client = make_connection()
                db = client["MovieIndustryAnalysis"]
                collection_users = db["users"]
                print("Hi1:", email, password)
                
                # Assuming LoginModel has a find_one method
                user = await collection_users.find_one({"email": email, "password": password}, {"_id": 0})
                print(user)
                if user:
                    return [user]
                else:
                    raise HTTPException(status_code=401, detail="Invalid email or password!")
        else:
            raise HTTPException(status_code=400, detail="Email or Password missing!")
    except Exception as error:
        print(f"Error in get_users: {error}")
        traceback.print_exc()  # Print the traceback for detailed error information
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')
    
@app.get("/usersDelete", response_model=dict)
async def delete_user(email: str, password: str):
    try: 
        if email and password:
                client = make_connection()
                db = client["MovieIndustryAnalysis"]
                collection_users = db["users"]

                result = await collection_users.delete_one({"email": email, "password": password})

                if result.deleted_count > 0:
                    return {'message': 'User deleted Successfully!'}

                else:
                    raise HTTPException(status_code=404, detail="User not found!")
        else:
            raise HTTPException(status_code=400, detail="Email or Password missing!")
    except Exception as error:
        print(f"Error in get_users: {error}")
        traceback.print_exc()  # Print the traceback for detailed error information
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')
    
@app.get("/updatePassword", response_model=List[loginModel])
async def update_Password(email: str, current_password: str, new_password: str):
    try: 
        if email and current_password and new_password:
                client = make_connection()
                db = client["MovieIndustryAnalysis"]
                collection_users = db["users"]
                print(email, new_password, current_password)
                # Assuming LoginModel has a find_one method
                user = await collection_users.find_one_and_update(
                    {"email": email, "password": current_password},
                    {"$set": {"password": new_password}},
                    projection={"_id": False},
                    return_document=True
                )
                print(user)
                if user:
                    return [user]
                else:
                    raise HTTPException(status_code=401, detail="Invalid email or current password!")
        else:
            raise HTTPException(status_code=400, detail="Email, current password, or new password missing!")
    except Exception as error:
        print(f"Error in update_password: {error}")
        traceback.print_exc()  # Print the traceback for detailed error information
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')

# @app.get("/users/{email}", response_model=loginModel)
# async def get_user(email: str):
#     try:

#         client = make_connection()
#         db = client["MovieIndustryAnalysis"]
#         collection_users = db["users"]

#         # Assuming LoginModel has a find_one method
#         user = await collection_users.find_one({"email": email})
#         if user:
#             return user
#         else:
#             raise HTTPException(status_code=404, detail="User not found")
#     except Exception as error:
#         raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')
















####route apis


class MovieThumbnail(BaseModel):
    id: str
    title: str
    genre: str
    released_year: int
    imdb_score: float
    Poster: str

class MovieResponse(BaseModel):
    title: str
    rating: str
    genre: str
    released_year: int
    imdb_score: float
    imdb_votes: int
    director: str
    writer: str
    star: str
    country: str
    budget: int
    revenue: int
    production_company: str
    duration: int
    released_date: str
    released_country: str
    Poster: str


@app.get('/movies', response_model=List[MovieThumbnail])
async def get_all_movies():
    try:
        # Connect to MongoDB
        client = make_connection()
        db = client["MovieIndustryAnalysis"]
        collection_movies = db["movies"]
        collection_users = db["users"]

        # Retrieve movies from MongoDB
        movies_cursor = collection_movies.find().sort('imdb_score', -1).limit(20)
        #print(movies_cursor)
        
        movies = await movies_cursor.to_list(length=None)
        response = await append_movie_thumbnail(movies)
        return response
    except Exception as error:
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')

@app.get('/movie/{movie_id}', response_model=MovieResponse)
async def get_movie(movie_id: str):
    try:
        if not movie_id:
            raise HTTPException(status_code=400, detail='Bad request! Movie id required!')
        print("Movie id:", movie_id)
        # Connect to MongoDB
        client = make_connection()
        db = client["MovieIndustryAnalysis"]
        collection_movies = db["movies"]
        object_id = ObjectId(movie_id)

        movie = await collection_movies.find_one({"_id": object_id})


        if not movie:
            raise HTTPException(status_code=404, detail='Movie not found')

        response = MovieResponse(
            title=movie.get('title'),
            rating=movie.get('rating'),
            genre=movie.get('genre'),
            released_year=movie.get('released_year'),
            imdb_score=movie.get('imdb_score'),
            imdb_votes=movie.get('imdb_votes'),
            director=movie.get('director'),
            writer=movie.get('writer'),
            star=movie.get('star'),
            country=movie.get('country'),
            budget=movie.get('budget'),
            revenue=movie.get('revenue'),
            production_company=movie.get('production_company'),
            duration=movie.get('duration'),
            released_date=movie.get('released_date'),
            released_country=movie.get('released_country'),
            Poster=movie.get('Poster'),
        )

        return response

    except Exception as error:
        print(error)
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')


from typing import List

# @app.get('/top_movies/{n}', response_model=List[MovieResponse])
# async def get_top_movies(n: int):
#     try:
#         if n <= 0:
#             raise HTTPException(status_code=400, detail='Bad request! n should be a positive integer.')

#         client = make_connection()
#         db = client["MovieIndustryAnalysis"]
#         collection_movies = db["movies"]

#         top_movies = await get_top_movies_from_database(collection_movies, n)

#         if not top_movies:
#             raise HTTPException(status_code=404, detail='Top movies not found')

#         response_movies = [
#             MovieResponse(
#                 title=movie.get('title'),
#                 rating=movie.get('rating'),
#                 genre=movie.get('genre'),
#                 released_year=movie.get('released_year'),
#                 imdb_score=movie.get('imdb_score'),
#                 imdb_votes=movie.get('imdb_votes'),
#                 director=movie.get('director'),
#                 writer=movie.get('writer'),
#                 star=movie.get('star'),
#                 country=movie.get('country'),
#                 budget=movie.get('budget'),
#                 revenue=movie.get('revenue'),
#                 production_company=movie.get('production_company'),
#                 duration=movie.get('duration'),
#                 released_date=movie.get('released_date'),
#                 released_country=movie.get('released_country'),
#                 Poster=movie.get('Poster'),
#             )
#             for movie in top_movies
#         ]

#         return response_movies

#     except Exception as error:
#         print(error)
#         raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')


# async def get_top_movies_from_database(collection, n):
#     try:
#         pipeline = [
#             {"$sort": {"imdb_score": -1}},  # Sort by imdb_score in descending order
#             {"$limit": n}  # Limit the number of results to 'n'
#         ]
#         client = make_connection()
#         db = client["MovieIndustryAnalysis"]
#         collection_movies = db["movies"]

#         top_movies_cursor = await collection_movies.aggregate(pipeline).to_list(length=n)

#         # Convert ObjectId to str for JSON serialization
#         top_movies = [
#             {**movie, "_id": str(movie["_id"])} for movie in top_movies_cursor
#         ]

#         return top_movies

#     except Exception as error:
#         print(f"Error fetching top movies: {error}")
#         raise


async def append_movie_thumbnail(db_response):
    updated_response = []
    for movie in db_response:
        response = MovieThumbnail(
            id=str(movie.get('_id')),
            title=movie.get('title'),
            genre=movie.get('genre'),
            released_year=movie.get('released_year'),
            imdb_score=movie.get('imdb_score'),
            Poster=movie.get('Poster'),
        )
        updated_response.append(response)

    return updated_response

@app.get('/search')
async def search_movies(query: str):
    try:
        client = make_connection()
        db = client["MovieIndustryAnalysis"]
        collection_movies = db["movies"]

        # Perform a case-insensitive search using regex
        regex_query = {"$regex": f".*{query}.*", "$options": "i"}
        movies = await collection_movies.find({"title": regex_query}).to_list(length=None)

        if not movies:
            raise HTTPException(status_code=404, detail='No movies found for the given query')

        # Transform data for response
        response = [{
            "_id": str(movie.get('_id')),
            "title": movie.get('title'),
            "genre": movie.get('genre'),
            "released_year": movie.get('released_year'),
            "imdb_score": movie.get('imdb_score'),
            "Poster": movie.get('Poster'),
        } for movie in movies]

        return response
    except Exception as error:
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')
    
    
# @app.get('/search/{query}')
# async def search_movies(query: str):
#     try:
#         client = make_connection()
#         db = client["MovieIndustryAnalysis"]
#         collection_movies = db["movies"]

#         # Perform a case-insensitive search using regex
#         regex_query = {"$regex": f".*{query}.*", "$options": "i"}
#         movies = await collection_movies.find({"title": regex_query}).to_list(length=None)

#         if not movies:
#             raise HTTPException(status_code=404, detail='No movies found for the given query')

#         # Transform data for response
#         response = [{
#             "_id": str(movie.get('_id')),
#             "title": movie.get('title'),
#             "genre": movie.get('genre'),
#             "released_year": movie.get('released_year'),
#             "imdb_score": movie.get('imdb_score'),
#             "Poster": movie.get('Poster'),
#         } for movie in movies]

#         return response
#     except Exception as error:
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
