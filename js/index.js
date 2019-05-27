const url = "https://www.reddit.com/r/funny.json";

const btnUps = document.querySelector("button");
const btnComm = document.querySelector(".button-comments");
const btnScore = document.querySelector(".button-score");
const btnDate = document.querySelector(".button-date");
const btnRatio = document.querySelector(".button-ratio");
const btnNewest = document.querySelector(".button-newest");

let myData = "";
let sortDirection = 1;

getData();

render = collection => {
  let html = collection.map(entry => {
    return formatThis(entry);
  });

  document.querySelector(".posts").innerHTML = html.join('');
};

formatThis = responseObject => {
  return `<ul class="post">
             <h4>${responseObject.title}</h4>
             <li>Upvotes: ${responseObject.upvotes}</li>
             <li>Downvotes: ${responseObject.downvotes}</li>
             <li>Score: ${responseObject.score}</li>
             <li>Comments: ${responseObject.num_comments}</li>
             <li>Created: ${new Date(
               responseObject.created
             ).toLocaleString()}</li>
           </ul>`;
};

sortByArgument = sortField => {
  console.log(sortField);
  if (sortField === undefined) {
    sortField = "upvotes";
  }

  let sorted = myData.sort((prev, next) => {
    prevElement = prev[sortField] !== undefined ? prev[sortField] : null;
    nextElement = next[sortField] !== undefined ? next[sortField] : null;

    if (prevElement === null || nextElement === null) {
      throw `Undefined field ${sortField}, cannot sort this shit`;
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

function getRatio() {
  let ratioData = myData.map(el => {
    
    if (el.num_comments > 0) {
      return {
        title: el.title,
        ratio: el.upvotes / el.num_comments,
        created: el.created
      };
    }

    if (el.num_comments == 0) {
      return {
        title: el.title,
        ratio: "give me more",
        created: el.created
      };
    }
  });

  sortRatio(ratioData);
}

function sortRatio(unsorted) {
  let sorted = unsorted.sort((prev, next) => {
    if (prev.ratio == next.ratio) return next.created - prev.created;
    else return prev.ratio - next.ratio;
  })
  console.log(sorted[0].title);
  alert("Post with highest comments to upvotes ratio: " + sorted[0].title);
}

dateCheck = today => {
  myData = myData.filter(value => {
    return today - value.created <= 86400000;
    // 86400000milisek = 24h
  });

  render(sortByArgument("created"));
};

function getData() {
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
          created: child.data.created * 1000 // zamiana na milisekundy
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

      btnRatio.addEventListener('click', event => {
        getRatio();
      });

      btnNewest.addEventListener("click", event => {
        dateCheck(Date.now());
      });

      render(myData);
    });
}
