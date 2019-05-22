const url = "https://www.reddit.com/r/funny.json";

const btnUps = document.querySelector(".button-ups");
const btnComm = document.querySelector(".button-comments");
const btnScore = document.querySelector(".button-score");
const btnDate = document.querySelector('.button-date');

let myData = "";
let sortDirection = 1;

getData();

render = collection => {
  let html = collection.map(entry => {
    return formatThis(entry);
  });

  document.querySelector(".posts").innerHTML = html;
};

formatThis = responseObject => {
  return `<ul class="post">
             <h4>${responseObject.title}</h4>
             <li>Upvotes: ${responseObject.upvotes}</li>
             <li>Downvotes: ${responseObject.downvotes}</li>
             <li>Score: ${responseObject.score}</li>
             <li>Comments: ${responseObject.num_comments}</li>
             <li>Created: ${responseObject.created}</li>
           </ul>`;
};

sortByArgument = sortField => {
  if (sortField === undefined) {
    sortField = "upvotes";
  }

  let sorted = myData.sort((prev, next) => {
    prevElement = prev[sortField] !== undefined ? prev[sortField] : null;
    nextElement = next[sortField] !== undefined ? next[sortField] : null;

    if (prevElement === null || nextElement === null) {
      throw `Undefined field ${sortField}, cannot sort fuck of`;
    }

    if (sortDirection == 1) {
      return prevElement < nextElement ? 1 : -1;
    } else {
      return prevElement > nextElement ? 1 : -1;
    }
  });

  sortDirection = sortDirection == 1 ? 0 : 1;
  return sorted;
};


function getData() {
  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      myData = resp.data.children.map(child => {
        return {
          title: child.data.title,
          upvotes: parseInt(child.data.ups),
          downvotes: parseInt(child.data.downs),
          score: parseInt(child.data.score),
          num_comments: parseInt(child.data.num_comments),
          created: new Date(child.data.created * 1000)
        };
      });
      console.log(myData); // Struktura danych z zadania

      btnUps.addEventListener("click", event => {
        render(sortByArgument());
      });

      btnComm.addEventListener("click", event => {
        render(sortByArgument("num_comments"));
      });

      btnScore.addEventListener("click", event => {
        render(sortByArgument("score"));
      });

      btnDate.addEventListener("click", event => {
        render(sortByArgument("created"));
      });

      render(myData);
    });
}
