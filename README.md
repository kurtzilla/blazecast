

### Blazecast

---

#API Documentation

Blazecast documentation found [here](README_API_DOCS.md)

---

Mega Boilerplate GitHub - DOCS -

https://github.com/sahat/megaboilerplate#express

https://github.com/sahat/hackathon-starter#prerequisites


---
# Pivotal Stories

https://www.pivotaltracker.com/n/projects/1678005


---
# Heroku

http://blazecast.herokuapp.com/

http://stackoverflow.com/questions/2971550/how-to-push-different-local-git-branches-to-heroku-master

git push heroku yourbranch:master


# Git

https://github.com/kurtzilla/blazecast
https://git.heroku.com/blazecast.git


---
# Sass

sass --watch public/css/main.scss:public/css/main.css


---
# Database

DATABASE_URL='postgres://localhost:5432/blazecast'


---
# Auth

!!!!NOTE!!!!
Facebook and Google (everything but twitter?) client ids must be hardcoded into
public/js/app.js

Facebook  oAuth: blazecast

https://developers.facebook.com/apps/866227026817147/fb-login/


Google    oAuth: Blazecast
https://console.cloud.google.com/apis/credentials?project=blazecast-1381

Twitter   oAuth: gPodcaster
https://apps.twitter.com/app/12633107/settings


Twitter - production - Blazecast-g23
https://apps.twitter.com/app/12637284


---
# Rss Feed Service


courtesy of: https://www.youtube.com/watch?v=5r5RYlpZYPY
One caveat - his code does not specify a limit for number of entries returned.
The default is 4 entries. You can get around this by specifying num=xxx in the
url. -1 returns all (up to 100). I have set at 1000 and (so far) have seen only
250 of 274 results for feedUrl
http://feeds.feedburner.com/KevinPollaksChatShow-Audio

the 274 figure is from here:
https://itunes.apple.com/us/podcast/kevin-pollaks-chat-show/id314845608?mt=2&ign-mpt=uo%3D4


---
#Audiosearch

TODO get keys for Heroku
AUDIOSEARCH_KEY
AUDIOSEARCH_SECRET


---
# Notes for add_player_from_tutorial branch

FYI this branch may be doa
>run the following commands

npm i -g yo
npm i -g grunt
npm i -g bower
bower install

run npm install
