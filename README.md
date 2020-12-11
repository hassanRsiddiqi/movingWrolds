# URL Shortner

## How to use?

```
git clone "https://github.com/hassanRsiddiqi/movingWrolds.git"
npm install
npm run start
```

## API's

we have total of five APIs in our system.

```
Create new user: (Post) http://localhost:5001/api/user/signup
Login: (Post) http://localhost:5001/api/user/signin
Create Short URL: (Post, Auth) http://localhost:5001/api/url/create
Full URL: (Get) http://localhost:5001/api/[SHORT_ID]
URL stats: (Get) http://localhost:5001/api/[SHORT_ID]/stats
```

#### Create New User

(Post) http://localhost:5001/api/user/signup
```
Body: {
"email": "google@test.com",
"password": "12345678"
}
Response: {
"success": true,
"message": "Successfully created new user."
}
```
#### Login

(Post) http://localhost:5001/api/user/signin
```
Body: {
"email": "google@test.com",
"password": "12345678"
}
Response: {
"success": true,
"token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQ2xpZW50IiwiX2lkIjoiNWZkMzBhNGYwNDU4MDkzM2EwZjEzNTVkIiwiZW1haWwiOiJ0ZXN0QHRzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDWS5qRVBhVXJGOXQxNC53M3pFNk51bHhKemtZZHovOFVkMG0uSjNzWVRvejVrWWtWRThhcSIsIl9fdiI6MCwiaWF0IjoxNjA3NjY2MzQ5LCJleHAiOjE2MDc2NzY0Mjl9.3H5UbuhIQsdaEU4yMU2aMk579Q-qF4G99cy80cz2Cm4",
"userId": "5fd30a4f04580933a0f1355d"
}
```
#### Create Short URL

(Post, Auth Required) http://localhost:5001/api/url/create
```
Headers: {
Authorization: [YOUR_TOKEN_FROM_LOGIN]
}
Body: {
"url": "https://github.com/ai/nanoid/",
"userId": [USER_ID_FROM_LOGIN],
"shortURL": "nan.id" [optional]
}
Response: {
"success": true,
"message": "Successfully associated.",
"shortURL": "lbGxof"
}
```
#### Get Long URL

(Get) http://localhost:5001/api/[shortURL]
```
Body: Nil,
Response: Redirection to url.
```
#### Get URL stats

(Get) http://localhost:5001/api/[shortURL]/stats
```
Body: Nil,
Response: {"Original URL": "https://github.com/ai/nanoid/","Total Views": 1}
```