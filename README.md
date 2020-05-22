# WELCOME TO CCHUGS

This is our web application for Group 27 in BCIT's COMP 2800 Course (May - 2020).
It's a web application that allows users to chat and send hugs to each other. 

**Go check it out at [cchugs.xyz](cchugs.xyz)**

## 3rd party sources we'd like to thank
- anchor tag styling: https://www.itsupportguides.com/knowledge-base/tech-tips-tricks/how-to-offset-anchor-tag-link-using-css/
- list styling: https://stackoverflow.com/questions/41351197/how-to-create-ordered-list-with-different-circle-ring-colors
- transitions: https://svelte.dev/tutorial/custom-css-transitions
- modal: https://www.w3schools.com/howto/howto_css_modals.asp
- bootstrap elements: https://getbootstrap.com/docs/4.3/components/collapse/

## Working locally
The repo is setup so that everything is done inside of the CCHugs-project folder. The public folder
is used to contain things that the app would like to render that should be accessible to every page 
like a global CSS or images. The src folder contains all the components that we used to create the app. 
The components are divided into sub folders based on what features of the product they are part of. 
The App.svelte file is used a router to all other pages and is where you would need to link your
components to have them rendered.

Before setting up the project you must download and install Node.js and Git.
    Node.js: Can be installed by going to https://nodejs.org/en/ then downloading the LTS version.
        Open the download and follow the instruction to install Node.js.
    Git: Can be installed by going to https://git-scm.com/downloads then clicking on the download for your OS.
        Open the download then follow the instructions to install Git.

The languages we are using are HTML, CSS, and JavaScript which require no setup
along with svelte which will be ready after installing the dependencies in a later step.

Our team used visual studio code for the text editor, but any text editor would work.

For access to the firebase database you will need to contact us with your email so we can add you to the project.

You can run the website locally by cloning this repository into your local
machine

To clone the file run these commands in the console:
````bash
cd DIRECTORY_WHERE_YOU_WANT_THE_FILE_STORED
git clone https://github.com/AVL-3/COMP-2800-Team-BBY-27-CCHugs.git
````

Once you finished cloning this repository, run:

```bash
cd DIRECTORY_OF_YOUR_LOCAL_COPY
cd CCHugs-Project
npm install
```
to install all the dependencies

Git development strategies:
Our team uses a gitflow workflow where when you add a feature you 
create a branch off of the dev branch then merge back to the dev branch.
After merging to the dev branch you will need to create pull request where 
the rest of the team will look over and check if the code is good for the master branch.

To create a branch off of dev
```bash
git checkout -b NAME_OF_NEW_BRANCH dev
```

To merge back into dev:

Make sure you are in the dev branch by using
```bash
git branch -a
```
Then merge the branch into dev using:
```bash
git merge NAME_OF_BRANCH_TO_MERGE
```
After the merge is successful push the changes to the dev branch
```bash
git push origin dev
```

To run this website on your localhost:

While in the CCHugs-Project folder
```bash
npm run dev
```
and the site will be launched on `localhost:5000`


To host the website:

While in the CCHugs-Project folder
```bash
npm install -g firebase-tools
npm run build
firebase login
firebase deploy
```
The site will be hosted to https://cchugs.xyz

The tests that we have previously run.
https://docs.google.com/spreadsheets/d/1ZaWQ7mHHh5gAqI01_rLD12p3zDccKa_C2FHjKLVS9bE/edit?usp=sharing

Attributes:
https://firebase.google.com/docs/guides
