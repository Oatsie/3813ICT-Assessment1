# 3813ICT-Assessment1

### Git repository Organization
For my git repository I created a development branch from the main branch, and then for each feature I was adding I branched off the development branch.
I never directly committed to the main or development branches, changes were made in the feature branches and then merged into development.
Once the code was ready for release, I merged the Development branch into the Main branch.
Commits and pushes to the code were made every hour or two, or at least at the end of a coding session, or when a significant milestone had been completed. 
### Data Structures 
On the client side I used interfaces to represent the entities. On the server side I used objects with constructors and functions. The server side structure were what were saved in the Mongo DB
### Angular architecture
For the angular components I had the login screen as a component, then I had a main component which was used to wrap the components the made up the main app UI. These were the groups, user, message view, and message create components.
I also made a few modal components for creating or editing certain entities. 
I created 3 differnet services. An API service, which was used for all the api calls, a session service, which kept track of all the current session entites, and a refresh service, which was used to update lists when data changed. 
### Node server architecture
In the Node server I hade the main server file which stored all the API endpoints. These endpoints would utalise the different entity repositories. The entity repositories had various functions in them for CRUD (Create, Read, Update, Delete) database commands.
The entities were represented by object classes
### Client Server Interaction
An API service was used in the front end to handle all the calls to the API. The refresh service would be used every time the front end made a change to data in the database. 
The components listening to the refresh updates would call to the API for the new list of data and then populate the UI with the new data.
