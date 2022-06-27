
# Language Translator Express backend

Authentication:

Sessions can be created useing the /user/login endpoint. The returned session id should be used

### Provides the following endpoints 
#### GET /languages
Get list of languages available for source/target language

Response: 
languages (array) : list of languages  
  language (string): short code for the language (used with the to/from parameter in translation/)  
  language_name (string): name of language in English  
  supported_as_source (boolean): indicates if this language can be used as a source  
  supported_as_target (boolean): indicates if this language can be used as a target  

#### POST /translation
Required Body parameters:  
to (string) : the language the text is to be translated to, list can be seen from /languages endpoint  
from (string) : the language the text is to be translated from, list can be seen from /languages endpoint  
text (string) : test that is to be translated

Response:
text (string) : 

Can translate between languages   

#### GET /translation/history
Get past translations for the user

#### GET /translation/saved
Get a list of saved translations 

#### POST /translation/saved
translation id (string): id of the translation that is to be saved  
Save a translation  

#### DELETE /translation/saved
translation id (string): id of the translation that is to be deleted
Delete a saved translation 

#### POST /user/
Required Body parameters
username (string): the users profile name
email (string): the users email
password (string): the users password
Register a new User

#### POST /user/login
Required Body parameters
email (string): the users email
password (string): the users password
Generate a new session for the user

#### GET /user/logout
Destroy the users current session 
