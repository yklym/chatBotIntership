# chatBotIntership - Rest Api server for school

My enter task for chtBotsStudio intership.

My project represents a school in which teachers are user and can use CRUD due to their abilities. Teacher can have role 0(usual teacher) or 1(head teacher). Database and database functions are very simple because of task's conditions.

Requests fields are sent as form-data. CRUD operations are made as Rest methods get, post, put, patch and delete and are similar, so i'll give an example for one of the entitites.

They are available by /api/{entities}/{operation}/{:id} like /api/teachers/get

#### get: /api/teachers
- returns list of all entities
#### get: /api/teachers/:id
- returns an entity by id or null. If id parametr is invalid returns code 400.
#### post: /api/teachers 
- creates new entity. If some fields are empty, the will be set to default. If there are no required fields like username or password for teacher in request, status 400 will be returned.
#### put: /api/teachers/:id
- completely updates entity, empty fields are set to default. In case no id parametr or required fields in body, returns status 400
#### patch: /api/teachers/id
- the same as put, but doesn't replace empty fields with default. Modifies only send fields.
#### delete/:id
- deletes entity, sends status 400 in case no id

Teacher's crud is available only for HeadTeacher, so i created /api/teachers/getMe so that usual teacher can get info about himself.

### Auth
Some routers are available for unauthorized users, others return status codes 401 and 403.

### Status codes and errors
Server responces with standart Rest status codes 200, 201, 400, 401, 403, 500.
- 200 - OK
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Internal Server Error

In case of errors, the're send as JSON object with status codes:

    {
     err: errMsg
    }

Any problem with DB operations or server returns status code 500. Wrong requests returns status code 400. Wrong request URI returns code 404.
