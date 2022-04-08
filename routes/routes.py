#import statements
from fastapi import APIRouter, HTTPException, exceptions, status
from fastapi.responses import RedirectResponse
from mail import sendMail
from models.models import *
from database.database import *


# App declaration
apiRouter = APIRouter()

def isValidId(evgId:str):
    if not evgId[:5] == "22EVG":
        return False
    else:
        return True

@apiRouter.get("/")
async def root():
    '''
    Redirects users to Documentation page.
    '''
    return RedirectResponse("/docs")

@apiRouter.post("/register")
async def register(evgId: str):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    body = f"""
Greetings from Bizverse,

Your registration is now complete. We welcome you to be a part of Bizverse.
Your evg-ID is: {evgId}. Please don't share your evgID with others.

You can now visit our website to get the latest updates on our Events, Guest lectures, Exhibitions. You can register for our competitions, workshops, technology summits and other events using this website. Stay informed by checking our website and make use of this exciting opportunity to the fullest, by participating in our events.

Hope to see you soon in our upcoming events.

Regards,
Bizverse Team 
    """
    subject = "Registration Successful for Bizverse 2022"
    
    if not isValidId(evgId):
        raise exception
    try:
        mail = await getUserMail(evgId)
        await sendMail(subject, body, mail)
    except:
        raise exception

@apiRouter.post("/brainitout")
async def brain_it_out(evgId: str):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    
    subject = "Successfully Registered for Brain-It-Out, Bizverse 2022"
    body = """
Greetings from Bizverse,

Regards,
Bizverse Team 
    """

    if not isValidId(evgId):
        raise exception
    
    try:
        mail = await getUserMail(evgId)
        await sendMail(subject, body, mail)
    except:
        raise exception

@apiRouter.post("/iprworkshop")
async def ipr_workshop(evgId: str):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    
    subject = "Successfully Registered for IPR Workshop, Bizverse 2022"
    body = """
Greetings from Bizverse,

Regards,
Bizverse Team 
    """

    if not isValidId(evgId):
        raise exception
    
    try:
        mail = await getUserMail(evgId)
        await sendMail(subject, body, mail)
    except:
        raise exception

@apiRouter.post("/logoandposter")
async def logo_and_poster(evgId: str):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    
    subject = "Successfully Registered for Logo and Poster Designing, Bizverse 2022"
    body = """
Greetings from Bizverse,

Regards,
Bizverse Team 
    """

    if not isValidId(evgId):
        raise exception
    
    try:
        mail = await getUserMail(evgId)
        await sendMail(subject, body, mail)
    except:
        raise exception

@apiRouter.post("/hackathon")
async def hackathon(teamEvgId: str, evgId: str):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    
    subject = "Successfully Registered for HackUrWay, Bizverse 2022"
    body = """
Greetings from Bizverse,

Regards,
Bizverse Team 
    """

    if not isValidId(evgId):
        raise exception
    
    try:
        mail = await getUserMail(evgId)
        await sendMail(subject, body, mail)
    except:
        raise exception