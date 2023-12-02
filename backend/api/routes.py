from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import GameModel
import axios

router = APIRouter()

class GameThumbnail(BaseModel):
    _id: str
    Name: str
    Platform: str
    Year_of_Release: int
    Genre: str
    Critic_Score: int
    imageLink: str

class GameResponse(BaseModel):
    Name: str
    Platform: str
    Year_of_Release: int
    Genre: str
    Publisher: str
    NA_Sales: float
    EU_Sales: float
    JP_Sales: float
    Other_Sales: float
    Global_Sales: float
    Critic_Score: int
    Critic_Count: int
    User_Score: float
    User_Count: int
    imageLink: str

class SearchResponse(BaseModel):
    _id: str
    Name: str

@router.get('/')
async def get_home_games():
    cached_response = gameCache.get('homeGames')
    if cached_response:
        return cached_response

    home_response = await GameModel.filter(Year_of_Release__gt=2010).order_by('-NA_Sales').limit(6)
    updated_home_response = await append_images(home_response)

    gameCache.set('homeGames', updated_home_response, 45000)
    return updated_home_response

@router.get('/home')
async def get_all_games():
    cached_response = gameCache.get('games')
    if cached_response:
        return cached_response

    response = await GameModel.all().order_by('-Critic_Score').limit(20)
    updated_response = await append_game_thumbnail(response)

    gameCache.set('games', updated_response, 45000)
    return updated_response

@router.get('/game/{game_id}')
async def get_game(game_id: str):
    try:
        if not game_id:
            raise HTTPException(status_code=400, detail='Bad request! Game id required!')

        game = await GameModel.get_or_none(id=game_id)

        if not game:
            raise HTTPException(status_code=404, detail='Game not found')

        response = GameResponse(
            Name=game.Name,
            Platform=game.Platform,
            Year_of_Release=game.Year_of_Release,
            Genre=game.Genre,
            Publisher=game.Publisher,
            NA_Sales=game.NA_Sales,
            EU_Sales=game.EU_Sales,
            JP_Sales=game.JP_Sales,
            Other_Sales=game.Other_Sales,
            Global_Sales=game.Global_Sales,
            Critic_Score=game.Critic_Score,
            Critic_Count=game.Critic_Count,
            User_Score=game.User_Score,
            User_Count=game.User_Count,
            imageLink=await get_image_link(game.Name),
        )

        return response
    except Exception as error:
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')

@router.get('/search')
async def search_games():
    try:
        games = await GameModel.all().values('id', 'Name')

        if not games:
            raise HTTPException(status_code=404, detail='API Error!')

        return games
    except Exception as error:
        raise HTTPException(status_code=500, detail=f'Internal server error: {str(error)}')

async def append_game_thumbnail(db_response):
    updated_response = []
    for game in db_response:
        image_link = await get_image_link(game.Name, is_original=False)
        response = GameThumbnail(
            _id=game.id,
            Name=game.Name,
            Platform=game.Platform,
            Year_of_Release=game.Year_of_Release,
            Genre=game.Genre,
            Critic_Score=game.Critic_Score,
            imageLink=image_link,
        )
        updated_response.append(response)

    return updated_response

async def append_images(db_response):
    updated_response = []
    for game in db_response:
        image_link = await get_image_link(game.Name)
        response = GameThumbnail(_id=game.id, imageLink=image_link)
        updated_response.append(response)

    return updated_response

async def get_image_link(name, is_original=True):
    image_link = 'No Image Available!'

    if name.strip():
        response = await axios.get('http://www.gamespot.com/api/games', params={
            'api_key': '502f699ca28dbbc8f9a6a081596739b63ec93507',
            'format': 'json',
            'field_list': 'name,image',
            'filter': f'name:{name}',
        })

        if response.data.get('results') and response.data['results']:
            if not is_original and response.data['results'][0]['image'].get('square_tiny'):
                image_link = response.data['results'][0]['image']['square_tiny']
            elif response.data['results'][0]['image'].get('original'):
                image_link = response.data['results'][0]['image']['original']

    return image_link
