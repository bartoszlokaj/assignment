# PostSorting
Hello! This app is sorting posts from URL by given argument.

## General info
This project was an assignment given for interview. App will take data from .json url, render it within HTML structure and sort objects in the array by given argument (date, upvotes, etc...). I used mainly higher order functions (such as 'map' and 'filter') for the result. There was no external libraries or frameworks added (one of the requirements), just pure JavaScript.

## Used functions
We start with getData function. Fetch API to get data from 'https://www.reddit.com/r/funny.json' url by fetch() method.
Next, by using map() method, we get an array of objects with few values that we'll later use for sorting. We inject our data in HTML document through render() function witch calls for formatThis() function to give it HTML tags with our custom CSS class.
By now we have our data displayed on screen with some nice styling.
On top of the screen we'll find a User Interface with 6 buttons. 4 of the button have assingned sortByArgument() function witch is responsible for sorting our objects by given data (date, number of comments, upvotes and score). This function also alows us to change the direction of sorting. For example, we could click 'sort by upvotes' button twice to see posts with least upvotes on top. To display our sorted array, we used render() function as well. The click on 'ratio' button will call for a getRatio() function witch will
map our myData array adding ratio value. Ratio is a result of dividing  number of upvotes by number of commets. The lower the result, the higher our ratio will by sorted by our sortRatio() function, witch also returns title of the post with higher ratio.
dateCheck() function is searching for posts from 24h period taking time from Your local machine as starting point.
And that will be it!
Hope You like it.


## Technologies
Project is created with: 
* JavaScript (using some ES06 syntax)
* CSS (minor styling)
* no installation 

## Setup
To run this project simply open html file.