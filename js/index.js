const url = "https://www.reddit.com/r/funny.json";
const btn = document.querySelector(".btn");
let myData = '';


btn.addEventListener("click", function() {
  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
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
      str = JSON.stringify(myData);
      document.querySelector('.posts').innerHTML = str;
      console.log(myData);
    });
});