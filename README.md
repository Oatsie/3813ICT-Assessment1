# 3813ICT-Assessment2

## Git repository Organization
For my git repository I created a development branch from the main branch, and then for each feature I was adding I branched off the development branch.
I never directly committed to the main or development branches, changes were made in the feature branches and then merged into development.
Once the code was ready for release, I merged the Development branch into the Main branch.
Commits and pushes to the code were made every hour or two, or at least at the end of a coding session, or when a significant milestone had been completed. 
## Data Structures 
### User
Object takes in a username, password, and email on creation. Has a addRole and addGroup methods for adding roles and groups <br>
<br>
&emsp; _id: UUID string <br>
&emsp; username: string <br>
&emsp; email: string <br>
&emsp; password: string <br>
&emsp; groups: string list <br>
&emsp; roles: role list
### Group
Object takes in a group name and the id of the user creating the group on creation<br>
<br>
&emsp; _id: UUID string <br>
&emsp; name: string <br>
&emsp; creater: string
### Channel
Object takes in a name and group id<br>
<br>
&emsp; _id: UUID string <br>
&emsp; name: string <br>
&emsp; groupId: string
### Message
Object takes in a user id, username, message content, time, and channel id on creation <br>
<br>
&emsp; _id: UUID string <br>
&emsp; userId: string <br>
&emsp; username: string <br>
&emsp; content: string <br>
&emsp; time: Date <br>
&emsp; channelId: string
### Role
Object takes in a name and group id on creation <br>
<br>
&emsp; _id: UUID string <br>
&emsp; name: string <br>
&emsp; groupId: string <br>

## Angular architecture
### Component - Users
The users componenet displays the list of users within the selected group as well as what role they have in that group. It also contains the log out button for the user.
### Component - Groups
THe groups component displays the list of groups in the databse, and allows new groups to be added, or existing groups to be deleted. 
### Component - Channels
The Channels component displays a list of channels for the selected group. It also has a button to create a new channel for the group
### Component - Messagage-View
The message view component displays all the messages for a channel in a scrollable view. Each message diplays the user that sent it, what time it was sent, and the message content
### Component - Message-Create
The message create component has a text box for entering a new channel message, and a submit button to create the new messgae
### Component - Login
THe login component displays a login screen for users to either log in or register as a new user
### Component - Channel-Create-Modal
The channel crete modal is a modal that creates a new channel for a group with the name the user inputs
### Component - Group-Create-Modal
The group create modal creates a new group with the name the user inputs
### Component - User-Edit-Modal
The user edit modal allows an admin to adjust the role level a user has in the current group, or remove the user from the group. 
### Component - Main
The main component wraps the users, groups, channels, message view, and message create components to create a single screen display
### Service - API
The API service is used for handling all requests to the API and the reponses
### Service - Refresh
The refresh service was used for refreshing the lists when a new item was creted in that list, this has now been replaced by the socket service
### Service - Session
The session service keeps track of the currently selected group and channel, as well as the logged in user. Components are subscribed to the changes in this values to grab the data relavant to the updated value
### Service - Socket
The socket service is used for message communication with the server socket. Newly created items will generate a new message, and components with lists will listen to messages to know if thier list needs to be refreshed

## Node server architecture
In the Node server I hade the main server file which stored all the API endpoints. These endpoints would utalise the different entity repositories. The entity repositories had various functions in them for CRUD (Create, Read, Update, Delete) database commands.
The entities were represented by object classes
## Routes
### GET api/users
Retrieves a list of all existing users
### GET api/groups/${groupId}/users
Gets all the users of a group. Group Id (string) is required
### POST api/users/login
Returns the user with the provided login details. Takes in a username (string) and password (string). Used to set the session user
### POST api/users
Creates a new user from the provided user details. Takes in a username (string), password (string), email (string), groupId (string), role (string)
### POST api/users/update
Updates a user details. Takes in id (string), username (string), password (string), email (string), groups (string list), roles (roles list)
### GET api/groups
Returns a list of groups.
### POST api/groups
Created a new group from the provided details. Takes in a group name (string), and the id (string) of the user creating the group
### DELETE api/groups/${groupId}
Deletes a group. Takes in the group id (string) of the group to delete
### GET api/groups/${groupId}/channels
Returns all the channels belonging to a group. Takes in the id (string) of the group 
### POST api/channels
Creates a new channel. Takes in the channell name (string) and a group id (string)
### DELETE api/channels/${channelId}
Deletes a channel. Takes in the channel id (string)
### GET api/channels/${channelId}/messages
Gets all the messages of a channel. Takes in the channel id (string)
### POST api/messages
Creates a new message. Takes in the userId (string), username (string), channelId (string), content (string), time (number)

## Client Server Interaction
An API service was used in the front end to handle all the calls to the API. The refresh service would be used every time the front end made a change to data in the database. 
The components listening to the refresh updates would call to the API for the new list of data and then populate the UI with the new data.
