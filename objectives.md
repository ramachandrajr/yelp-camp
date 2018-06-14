Restful Routes

name      url         verb   desc.
==============================================================
INDEX    /dogs        GET    Gives a list of all dogs.
NEW      /dogs/new    GET    Form to create a new dog.
CREATE   /dogs        POST   Add a new dog to db.
SHOW     /dogs/:id    GET    Show detailed info about a dog.

RESTful table with full CRUD

name      url             verb   desc.
==============================================================
Index    /dogs            GET    Lists all dogs.
New      /dogs/new        GET    Show a new dog form.
Create   /dogs            POST   Create a new dog and Redirect somewhere.
Show     /dogs/:id        GET    Shows info about one specific dog.
Edit     /dogs/:id/edit   GET    Edit form for one dog.
Update   /dogs/:id
PUT    Update a particular dog, then redirect.
Destroy  /dogs/:id        DELETE DeletShowe a particular dog then redirect somewhere. 