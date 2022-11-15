import firebase_admin
from firebase_admin import firestore
from flask import session,redirect,url_for
from functools import wraps
def getusers(db):
    users = db.collection('users')
    docs = users.stream()
    return docs
def getblog(db):
    blogs = db.collection('blog')
    docs = blogs.stream()
    return docs
def printdb(db):
    users_ref = db.collection(u'users')
    docs = users_ref.stream()
    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')

def insertuser(db,username,password):
    doc_ref = db.collection(u'users').document(username)
    doc_ref.set({
        u'username': username,
        u'password': password,
        u'friends':[],
        u'schedule':''
    })
def checkuser(db,username,password):
    for doc in getusers(db):
        doc_dict = doc.to_dict()
        if doc_dict['username'] == username and doc_dict['password'] == password:
            return doc_dict
    return ''
def checkfriends(db,username):
    for doc in getusers(db):
        if doc.id == username:
            return doc.to_dict()['friends']
def removefriend(db,username,friend):
    friends = checkfriends(db,username)
    friends.remove(friend)
    doc = db.collection(u'users').document(username)
    doc.update({
        'friends':friends
    })
def addfriend(db,username,friend):
    friends = checkfriends(db,username)
    if friend not in friends:
        friends.append(friend)
        doc = db.collection(u'users').document(username)
        doc.update({
            'friends':friends
        })
def searchfriend(db,query):
    usernames = []
    for doc in getusers(db):
        if doc.id[:len(query)] == query:
            usernames.append(doc.id)
    return usernames
def updatesched(db,username,schedule):
    doc = db.collection(u'users').document(username)
    doc.update({
        'schedule':schedule
    })
def getsched(db,username):
    for user in getusers(db):
        if user.id == username:
            return user.to_dict()['schedule']
def addblog(db,username,payload):
    doc_ref = db.collection(u'blog').document(username)
    blogs = getblog(db)
    bloglist = []
    found = False
    for blog in blogs:
        bloglist.append(blog)
        if blog.id == username:
            doc_ref.update({
            u'content':payload
            })
            found = True
    if found == False:
        doc_ref.set({
            u'username':username,
            u'content':payload
        })
    if len(bloglist) > 20:
        bloglist[len(bloglist)-1].reference.delete()
def getuserblogs(db):
    blogs = []
    for blog in getblog(db):
        blogs.append(blog.to_dict())
    return blogs

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        print(session.get("username"))
        if session.get("username") is None:
            return redirect(url_for('login')) # , next=request.url
        return f(*args, **kwargs)
    return decorated_function

