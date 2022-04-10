#import statements
from fastapi import APIRouter, HTTPException, exceptions, status
from fastapi.responses import RedirectResponse
from mail import sendMail
from typing import Optional
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
Greetings from BizVerse,

Your registration is now complete. We welcome you to be a part of Bizverse.
Your evg-ID is: {evgId}. Please don't share your evgID with others.

You can now visit our website to get the latest updates on our Events, Guest lectures, Exhibitions. You can register for our competitions, workshops, technology summits and other events using this website. Stay informed by checking our website and make use of this exciting opportunity to the fullest, by participating in our events.

Hope to see you soon in our upcoming events.

Regards,
BizVerse Team 
    """
    subject = "Registration Successful for BizVerse 2022"
    
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
    try:
        name, mail = await getUserNameAndMail(evgId)
    except:
        raise exception
    
    subject = "Successfully Registered for Brain-It-Out, BizVerse 2022"
    body = f"""
Dear {name}

Greetings from BizVerse,

We have successfully received your registration for the event “Brain-It-Out”. 

Brain-It-Out is a fun event where teams will be quizzed on topics such as business, technology, innovation and the market scenario of today’s world. The team with the most answers correct, will win the game. 

For rules and further details, please keep checking your email. 

We hope you enjoy the event!

Regards,
BizVerse Team
    """

    if not isValidId(evgId):
        raise exception
    
    try:
        await sendMail(subject, body, mail)
    except:
        raise exception

@apiRouter.post("/iprworkshop")
async def ipr_workshop(evgId: str):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    
    try:
        name, mail = await getUserNameAndMail(evgId)
    except:
        raise exception
    
    subject = "Successfully Registered for IPR Workshop, BizVerse 2022"
    body = f"""
Dear {name}

Greetings from BizVerse,

We have successfully received your registration for the event “IPR Workshop”. 

In this workshop, you will get to know about the importance of Intellectual Property Rights(IPR) amongst start-ups and the need of adopting a proactive approach towards protecting IPRs. Moreover, the topics such as trademark, copyright, patents and trade secrets will be thoroughly explained.

For rules and further details, please keep checking your email.

We hope you enjoy the event!

Regards,
BizVerse Team
    """

    if not isValidId(evgId):
        raise exception
    
    try:
        await sendMail(subject, body, mail)
    except:
        raise exception

@apiRouter.post("/logoandposter")
async def logo_and_poster(evgId: str):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    
    try:
        name, mail = await getUserNameAndMail(evgId)
    except:
        raise exception
    
    subject = "Successfully Registered for Logo and Poster Designing, BizVerse 2022"
    body = f"""
Dear {name}

Greetings from BizVerse,

We have successfully received your registration for the event “Logo and Poster Designing”. 

Logo and Poster Designing is an event where you can showcase your creative and marketing side by designing some of the most intriguing and expressive logos and posters.

For rules and further details, please keep checking your email.

We hope you enjoy the event!

Regards,
BizVerse Team
    """

    if not isValidId(evgId):
        raise exception
    
    try:
        await sendMail(subject, body, mail)
    except:
        raise exception


@apiRouter.post("/hackathon")
async def hackathon(teamEvgId: str, evgId: str):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    
    try:
        mail = await getUserMail(evgId)
    except:
        raise exception
    
    print("done")

    subject = "Successfully Registered for HackUrWay, BizVerse 2022"
    body = f"""

Greetings from BizVerse,

We have successfully received your registration for the event “HackUrWay”. 

Your team evg-Id : {teamEvgId}

HackUrWay is an exciting hackathon where teams will compete against each other to solve some of the relevant problems we face in our daily lives by inculcating their problem-solving skills. 

For rules and further details, please keep checking your email.

We hope you enjoy the event!

Regards,
BizVerse Team
    """

    if not isValidId(evgId):
        raise exception
    
    try:
        await sendMail(subject, body, mail)
    except:
        raise exception




async def getBody(name, id):
    body = f"""
Dear {name}

Greetings from BizVerse,

We have successfully received your registration for the event “HackUrWay”. 

Your team evg-Id : {id}

HackUrWay is an exciting hackathon where teams will compete against each other to solve some of the relevant problems we face in our daily lives by inculcating their problem-solving skills. 

For rules and further details, please keep checking your email.

We hope you enjoy the event!

Regards,
BizVerse Team
    """
    return str(body)

# def mails(name: str, evgId: str, teamEvgId: str,update: bool ):



@apiRouter.post("/mailteam")
async def hackathon(teamEvgId: str, leadEvgId: str, member1EvgId: Optional[str] = None, member2EvgId: Optional[str] = None, member3EvgId: Optional[str] = None):
    exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND)
    
    subject = "Successfully Registered for HackUrWay, BizVerse 2022"
    
    if not isValidId(teamEvgId) and isValidId(leadEvgId):
        raise exception
    
    if member1EvgId:
        if not isValidId(member1EvgId):
            raise exception
        await updateUserHackathon(member1EvgId,teamEvgId)
        try:
            member1Name, member1Mail = await getUserNameAndMail(member1EvgId)
            await sendMail(subject, await getBody(member1Name, teamEvgId), member1Mail)
        except:
            raise exception

    if member2EvgId:
        if not isValidId(member2EvgId):
            raise exception
        await updateUserHackathon(member2EvgId,teamEvgId)
        try:
            member2Name, member2Mail = await getUserNameAndMail(member2EvgId)
            await sendMail(subject, await getBody(member2Name, teamEvgId), member2Mail)
        except:
            raise exception
    
    if member3EvgId:
        if not isValidId(member3EvgId):
            raise exception
        await updateUserHackathon(member3EvgId,teamEvgId)
        try:
            member3Name, member3Mail = await getUserNameAndMail(member3EvgId)
            await sendMail(subject, await getBody(member3Name, teamEvgId), member3Mail)
        except:
            raise exception
    
    # try:
    #     name, mail = await getUserNameAndMail(leadEvgId)
    #     await sendMail(subject, await getBody(name, teamEvgId), mail)
    # except:
    #     raise exception
    

    