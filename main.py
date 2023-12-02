from fastapi import APIRouter, HTTPException
from typing import List
import httpx

router = APIRouter()

base_uri = 'http://your-api-base-url/'  # Replace with your actual API base URL

@router.get('/home')
async def get_home_games():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f'{base_uri}home')

        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=f'Error occurred: {exc}')

@router.get('/game/{game_id}')
async def get_game_detail(game_id: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f'{base_uri}game/{game_id}')

        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=f'Error occurred: {exc}')

@router.get('/search')
async def search_games():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f'{base_uri}search')

        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=f'Error occurred: {exc}')

