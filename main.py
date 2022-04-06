import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud import storage
import asyncio

# Use the application default credentials
cred = credentials.Certificate('bizverse-2k22-key.json')
firebase_admin.initialize_app(cred)


# Fetch user datils from Auth database
# from firebase_admin import auth
# email = "bizverse2k22@gmail.com"
# user = auth.get_user_by_email(email)
# print(user.__dict__)


# Post data
db = firestore.client()

# doc_ref = db.collection(u'users').document(user.uid)
# doc_ref.set({
#     u'name': {
#         u'first': u'Shubhayu',
#         u'last': u'Majumdar',
#     },
#     u'email': user.email,
#     u'number': 7679325872,
#     u'gender': u'male',
#     u'college': u'Techno Main Saltlake',
#     u'college_id': u'1234567890',
#     u'department': u'CSE-AIML',
#     u'city': u'Kolkata',
#     u'state': u'West Bengal',
#     u'evg_id': u'22EVGABC123456',
#     u'regd_events': []
# })

events = ["hackathon", "brain_it_out", "logo_and_poster", "ipr_workshop"]
col = db.collection(u"events")
for idx in events:
    col.document(idx).set({
        u'registered':[]
    })


# Fetch all user data
# users_ref = db.collection(u'users')
# docs = users_ref.stream()

# for doc in docs:
#     print(f'{doc.id} => {doc.to_dict()}')

# Fetch all Auth user data
# Iterate through all users. This will still retrieve users in batches,
# buffering no more than 1000 users in memory at a time.
# for user in auth.list_users().iterate_all():
#     print('User: ' + user.uid)
