import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate('bizverse-2k22-key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

async def getUserNameAndMail(evgId: str):
    users = db.collection("users")
    query_ref = users.where("evg_id","==",evgId)
    doc = query_ref.stream()

    for idx in doc:
        data = idx.to_dict()
        name = data["name"]
        mail = data["email"]
        name = name["first"] + " " + name["last"]
        return name, mail

async def getUserMail(evgId: str):
    users = db.collection("users")
    query_ref = users.where("evg_id","==",evgId)
    doc = query_ref.stream()

    for idx in doc:
        data = idx.to_dict()
        mail = data["email"]
        return mail

async def updateUserHackathon(evgId: str, teamId: str):
    user = db.collection("users").where("evg_id", "==", evgId).stream()
    
    for idx in user:
        doc = idx.to_dict()
        idx = idx.id

    doc["reg_events"]["hackathon"]["is_registered"] = True
    doc["reg_events"]["hackathon"]["team_id"] = teamId

    doc_ref = db.collection("users").document(idx)
    doc_ref.update(doc)
    