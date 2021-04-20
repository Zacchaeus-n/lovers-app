/**References
 * https://daily-dev-tips.com/posts/vanilla-javascript-live-search/
 * https://codepen.io/michaelpanik/pen/wpNJLV
 * https://www.florin-pop.com/blog/2019/06/vanilla-javascript-instant-search/
 */

/**Selecting elements */
const results = document.querySelector(".results__wrap");
const submitBtn = document.querySelector(".submit");
const hobbyField = document.querySelector("#hobby");
const genderField = document.querySelector("#gender");
let hobby = hobbyField.value;

const selectedIndex = genderField.selectedIndex;
const gender = genderField.options[selectedIndex].value;
const searchParams = [hobby, gender];

let users = [];
fetch("/js/users.json")
  .then((res) => res.json())
  .then((usersData) => {
    users = usersData;
    loadUsers(usersData);
  });

const loadUsers = (data) => {
  //making a copy of users data
  let dataOfUsers = [...data];
  let displayResults = "";
  dataOfUsers.map((user) => {
    displayResults += `
      <div class="message__wrap">   
      <div class="auther">
      <div>
      <img src="${user.avatar}" alt="">
      <h3>${user.name}</h3>
      <p>${user.hobbies}</p>
      </div>
      </div>
      </div>
      `;
  });
  //and then display
  results.innerHTML = displayResults;
};

function search(arr, val) {
  let results = [];
  arr
    .filter((matchFound) => {
      const matchedHobbiesData = matchFound.hobbies.toLowerCase();
      const matchedGenderData = matchFound.gender.toLowerCase();
      const matchedHobbyValue = val[0].toLowerCase();
      const matchedGenderValue = val[1].toLowerCase();
      if (
        matchedHobbiesData === matchedHobbyValue ||
        matchedHobbyValue === ""
      ) {
        if (
          matchedGenderValue === "all" ||
          matchedGenderValue === matchedGenderData
        ) {
          return matchFound;
        }
      }
    })
    .forEach((e) => {
      results.push(e);
      loadUsers(results);
    });
}

const searchPerson = (e) => {
  e.preventDefault();
  const hobbyField = document.querySelector("#hobby");
  const genderField = document.querySelector("#gender");

  let hobby = hobbyField.value;

  const selectedIndex = genderField.selectedIndex;
  const gender = genderField.options[selectedIndex].value;

  const searchParams = [hobby, gender];
  //users is the usersData from the the fetch
  //calling the search function
  search(users, searchParams);
};

submitBtn.addEventListener("click", searchPerson);
