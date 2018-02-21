# JamSesh

## Description
JamSesh is a mobile app built using React Native with a Rails backend. It incorporates a Songkick API as well as Google Maps API. With JamSesh the user is able to search their favorite artists and view their upcoming event calendar if they are currently on tour. The user is then able to view the location of the concert venue on a displayed map component. Other functionalities including adding and deleting artists to a favorited list.

## [Wireframes, Priority Matrix, MVP & POST MVP](http://res.cloudinary.com/camcash17/image/upload/v1519225304/Image_uploaded_from_iOS_cbrbep.jpg "Wireframe Photo")

Image includes:
* Original concepts for how the app should be laid out with wireframes
* Priority Matrix for app implementation
* A list of what to include on a Minimum Viable Product
* A list of what could be added to the project POST

## Functional Components
Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions.  Does your logic indicate that code could be encapsulated for the purpose of reusablility.  Once a function has been defined it can then be incorporated into a class as a method.

## Time Frames
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| Database Setup | H | 3hrs | 2hrs | 2hrs |
| Crud Functionality | H | 3hrs | 3hrs | 3hrs |
| API Implementation | H | 3hrs | 5hrs | 5hrs |
| Styling | H | 4hrs | 5hrs | 5hrs |

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Component 1 | H | 10hrs| 12hrs | 12hrs |

## Helper Functions
| Function | Description |
| axios.get(`http://173.2.2.152:3000/api/artists`) | API Call to receive data from Rails backend database |

| Function | Description |
| --- | :---: |  
| Capitalize | This will capitalize the first letter in a string | 

## Additional Libraries/Frameworks
* React Native
* Rails
* Flex-Box
* External API's
  * Songkick
  * Google Maps
* Axios
* Expo

## Code Snippet
`code(onPress={() => this.searchButton(rowData.artistId)})`
* This code demonstrates the action of clicking a button and sending specific artist ID data to be used in the searchButton method.

## Change Log
* Was initially planning to set up the project all in one file structure. Decided to separate the back and front end files.

## Issues and Resolutions
**ERROR**: Network Error                              
**RESOLUTION**: Local Host was not working to fetch backend data. I need to change 'localhost' to my current IP address.
