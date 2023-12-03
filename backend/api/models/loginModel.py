from fastapi import FastAPI, HTTPException
from mongoengine import Document, connect, StringField
from typing import List
from pydantic import BaseModel



class LoginModel(BaseModel):
    email = StringField(required=True, unique=True, lowercase=True, trim=True)
    password = StringField(required=True, trim=True)
    first_name = StringField(required=True, trim=True)
    last_name = StringField(trim=True)

