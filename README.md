# Grocery List

[Live link](https://main--venerable-cendol-3fdaaa.netlify.app/)

### Inspiration

![](https://jschris.com/41168097024a0b0e7b306a91023114b8/project.gif)

### Install Instructions

- clone this repo
- cd into the directory and install dependenies
- run npm run start and see if you see anything at http://localhost:3000/
- create a .env file and add REACT_APP_SERVER_URL="http://localhost:2995/"

- In a seperate directory, clone the [server](https://github.com/Jamelscott/groceryList-server)
- create a .env file and add PORT=2996

- run nodemon in server directory and check if you receive the two console logs seen in server.js and /models/index.js

- open mongo in cli with command "mongo"

  - type `show dbs` and check if you see the groceryList database
  - type `use groceryList` then `show collections`, you should see the `Items` collection

- if you get to this point, you should be able to use the app and add an item to the grocery list, click the save button and refresh the screen. if your item is still there, you're ready to go.

### Figma

[click here](https://www.figma.com/file/WuCQlipQIFhyiGQadXUYli/Grocery-List?t=oFABnZbMFF5K9OdC-1)

### To Do

- [ ] Bug: we don't want to show the unsaved items if a user removes and adds back the same item/quantity to the grocery list (but we currently do). To do this I started us off by creating a snapshot that is created after we receive new items back from the db. Please create logic that checks the items against the snapshot, if they are the same, we dont want the save icon to appear.

- [ ] Small task: Update UI to include drop shadows and remove text next to the save button, as per the linked Figma file
- [ ] Small task: add onhover and onclick CSS to the arrow that add or siubtract from an item quantity

- [x] Medium task: Create Login and Sign up component as per the Figma file. Include adding state for input fields as {name : this.state.name, password: this.state.password} or similar.
 
- [ ] Large task: Create Users model, setup server to receive user data
  - [ ] apply salt rounds to password and store hashed passwords. research industry standard salt rounds.
  - [ ] look into possible security threats
