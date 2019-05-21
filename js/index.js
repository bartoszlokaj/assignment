const url = "https://www.reddit.com/r/funny.json";
const btn = document.querySelector(".btn");
let myData = '';

btn.addEventListener("click", getData());


formatThisShit = (responseObject) => { 
  
  return `<ul>
             <li>Title: ${responseObject.title}</li>
            <li>Upvotes: ${responseObject.upvotes}</li>
             <li>Downvotes: ${responseObject.downvotes}</li>
             <li>Score: ${responseObject.score}</li>
             <li>Comments: ${responseObject.num_comments}</li>
             <li>Created: ${responseObject.created}</li>
           </ul>`;
};

function getData(){
  fetch(url)
    .then(resp => resp.json())
    .then(resp => {

      myData = resp.data.children.map(child => {
        
        return {
          
              title: child.data.title,
              upvotes: child.data.ups,
              downvotes: child.data.downs,
              score: child.data.score,
              num_comments: child.data.num_comments,
              created: new Date(child.data.created * 1000)
        };
      });

      let html = myData.map(entry => { 
          return formatThisShit(entry);
      });

       document.querySelector(".posts").innerHTML = html;

    });
};
