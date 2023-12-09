from fastapi import FastAPI, HTTPException
from mongoengine import Document, connect, StringField, IntField, FloatField
from typing import List


class MovieModel(Document):
    name = StringField()
    rating = StringField()
    genre = StringField()
    year = IntField()
    released = StringField()
    score = FloatField()
    votes = IntField()
    director = StringField()
    writer = StringField()
    star = StringField()
    country = StringField()
    budget = IntField()
    gross = IntField()
    company = StringField()
    runtime = IntField()

# @app.get("/movies", response_model=List[MovieModel])
# async def get_movies():
#     movies = MovieModel.objects().all()
#     return movies

# @app.get("/movies/{movie_id}", response_model=MovieModel)
# async def get_movie(movie_id: str):
#     movie = MovieModel.objects(id=movie_id).first()
#     if movie:
#         return movie
#     else:
#         raise HTTPException(status_code=404, detail="Movie not found")
