import firebase_admin
from firebase_admin import firestore
from firestore_operations import insertuser,getusers,printdb,checkuser,checkfriends,removefriend,addfriend,searchfriend,updatesched,getsched,addblog,getuserblogs,login_required
from flask import Flask,render_template,request,session,redirect

app = Flask(__name__)
firebase_app = firebase_admin.initialize_app()
db = firestore.client()
app.config["SECRET_KEY"] = "syncrogym"
#GET request pathing
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/about")
def about():
    return render_template("about.html")
@app.route("/schedule")
@login_required
def schedule():
    return render_template("schedule.html")

@app.route("/friends")
@login_required
def friends():
    return render_template("friends.html")

@app.route("/tips")
@login_required
def tips():
    return render_template("tips.html")
@app.route("/tips/push")
@login_required
def push():
    return render_template("push.html")

@app.route("/tips/pull")
@login_required
def pull():
    return render_template("pull.html")

@app.route("/tips/legs")
@login_required
def legs():
    return render_template("legs.html")

@app.route("/tips/injuries")
@login_required
def injuries():
    return render_template("injuries.html")
@app.route('/blog')
@login_required
def blog():
    return render_template('blog.html')
@app.route('/schedule/<string:username>')
def viewSchedule(username):
    for user in getusers(db):
        if user.id == username:
            return render_template('viewschedule.html')
    return render_template('error.html')
#Login Logic
@app.route("/login",methods = ["GET","POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    else:
        username = request.form.get("username")
        password = request.form.get("password")
        user_info = checkuser(db,username,password)
        if(user_info == ''):
            return {"success":"false","info":''}
        else:
            session['username'] = user_info['username']
            return {'success':'true','info':user_info}
@app.route("/logout",methods = ["POST"])
def logout():
    session['username'] = None
    return {'success':'true'}
#Signup Logic
@app.route("/signup",methods = ["POST"])
def signup():
    username = request.form.get("username")
    password = request.form.get("password")
    if(checkuser(db,username,password) != ''):
        return {"success":"false"}
    else:
        insertuser(db,username,password)
        return {"success":"true"}
@app.route("/getfriends",methods = ["POST"])
def getfriends():
    return {"success":"true","friends":checkfriends(db,session['username'])}
@app.route("/removefriend",methods = ["POST"])
def remove():
    username = request.form.get("username")
    removefriend(db,session['username'],username)
    removefriend(db,username,session['username'])
    return {"success":"true"}
@app.route('/addfriend',methods=["POST"])
def add():
    username = request.form.get("username")
    addfriend(db,session['username'],username)
    addfriend(db,username,session['username'])
    return {"success":"true"}
@app.route('/searchfriend',methods=["POST"])
def search():
    query = request.form.get("query").lower()
    return {"success":"true","friends":searchfriend(db,query)}
@app.route('/schedule/push',methods=["POST"])
def push_sched():
    schedule = request.form.get('schedule')
    updatesched(db,session['username'],schedule)
    return {"success":"true"}
@app.route('/schedule/get',methods=["POST"])
def get():
    username = request.form.get('username')
    if username == '':
        return {"success":"true","schedule":getsched(db,session['username'])}
    else:
        return {"success":"true","schedule":getsched(db,username)}
@app.route('/blog/get',methods=["POST"])
def getblogs():
    return {"success":"true","blogs":getuserblogs(db)}
@app.route('/blog/push',methods=["POST"])
def pushblog():
    payload = request.form.get('payload')
    addblog(db,session['username'],payload)
    return {"success":"true"}
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)