# NodeJS-MongoDB-Express-Backend-Server
Example server based on NodeJS, MongoDB and Express

Todo:  
 - add authorisation  
 - add modify, delete endpoints to articles  
 - add delete endpoint to comments  
 - automate assigning ID to articles  

Prerequisites:
- Installed MonoDB community ver > 4.4.1 (https://www.mongodb.com/try/download/community)  
- Installed NodeJS ver > 12.19 (https://nodejs.org/en/download/)    
- Any browser/http request client (ie. postman)  
- restored db (found in /dbdump directory, restored used mongorestore tool)  

Running the app:  
`npm run dev` in the /server directory - by default, app starts at port 5000  

# Endpoints  
(also to be found in x.route.js files)  

## Generic:
- `/api/config` - info about server, can be changed by editing /config/meta.json  //  GET
- `/api/licence` - licence, can be changed by editing /config/licence.json  //GET

Articles:  
- `/api/AddArticle` - add an article via POST request, by model as seen in the /models/article.model.js:  //POST
```javascript
    ID: Number,  
    title: String,  
    body: String,  
    tags: Array,  
    date: Object
```  
    
so, for example:  
    
```JSON
    {  
    "ID": 1,  
    "title": "Artykuł nr 1",  
    "body": "loooooooooooooooong string",  
    "tags": ["cillum", "sed", "eiusmod"],  
    "date": "2012-04-23T18:25:43.511Z"  
    }  
```

- `/api/GetAllArticles` - get all articles //GET  
- `/api/Articles/:ArticleID` - get an article by replacing ArticleID with adequate number (its the same as "ID" in the article model) //GET  
- `/api/ArticleSearch/:query` - search an article by "query", you can search by title, tags, or body //GET  

## Comments  

- `/api/comments/add` - add a comment via POST request, comment model, see below: //POST  
 ```javascript
    parent: Number, //ID of an article that a comment belongs to
    author: String,
    body: String,
    createdAt: Object
```  
so, for example:  

```JSON
{  
    "parent" : 1,  
    "author" : "Nickname12",  
    "body" : "loongstring123"  
}  
```  
- `/api/comments` - get all comments //GET  
- `/api/comments/:parentID` - get all commets belonging to a parent //GET  