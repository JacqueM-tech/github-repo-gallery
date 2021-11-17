// This div is where your profile information will appear
const overview = document.querySelector(".overview");
const username = "JacqueM-tech";
const repoList = document.querySelector(".repo-list");
const repoInfoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const viewGalleryButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

// async function to fetch information from my GitHub profile using the GitHub API address: https://api.github.com. Target the “users” endpoint and use a template literal to add the global username variable to the endpoint: users/${username}
const getProfileInfo = async function () {
    const profileInfo = await fetch (`https://api.github.com/users/${username}`);
// In your next await statement, resolve the JSON response. Log out the response to the console and call your function to see your results. 
    const data = await profileInfo.json();
    displayProfileInfo(data);
};
getProfileInfo();

// Below the async function to fetch your GitHub user data, create and name a new function to display the fetched user information on the page. This function should accept the JSON data as a parameter.Inside the function, create a new div and give it a class of “user-info”. Using innerHTML, populate the div, with the elements for figure, image, and paragraphs: 

const displayProfileInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
// Append the div to the overview element.

    overview.append(div);
    getReposList();
};

// At the bottom of your code, create and name a new async function to fetch your repos. Use the List Repositories of User(opens in a new tab) section of the documentation to find the endpoints for your API URL to fetch the list of repos.
const getReposList = async function () {
    const reposList = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); 
// Your second await statement should return the JSON response. Log out the response and call the function. 
    const repoDataSection = await reposList.json();
    //  console.log(repoDataSection);
    displayRepos(repoDataSection);
};
 
// Below the async function fetching the repos, create and name a function to display information about each repo. Use repos as a parameter so that the function accepts the data returned from your last API call. Inside the function, loop and create a list item for each repo and give each item: A class of “repo” and An <h3> element with the repo name. Append the list item to the global variable that selects the unordered repos list.At the top of the function that displays all your repos, show the filterInput element.  
    const displayRepos = function (repos) {
        filterInput.classList.remove("hide");
        for (const repo of repos) {
        const repoItem = document.createElement("li"); 
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
        }
    };
// Create an event listener called repoList for a click event on the unordered list with a class of “repo-list.” Pass the event (e) in the callback function. Add a conditional statement to check if the event target (i.e., the element that was clicked on) matches the <h3> element (i.e., the name of the repo): if (e.target.matches("h3")).In the body of the conditional statement, create a variable called repoName to target the innerText where the event happens. Log out the variable to the console. Try clicking on a few repo names to see if your event listener is working as expected.

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
      const repoName = e.target.innerText;
    //   console.log(repoName);
      getRepoInfo(repoName);

    }
});

// Below the event listener, create and name an async function to get specific repo information that accepts repoName as a parameter. In the function, make a fetch request to grab information about the specific repository. To discover the endpoints, take a look at the Get a Repository(opens in a new tab) section of the repository.Declare a variable called repoInfo to resolve and save the JSON response.Log out repoInfo. Return to repoList click event listener. Inside the if statement, replace the console.log() with a call to this async function, passing repoName as an argument.

const getRepoInfo = async function (repoName) {
    const specificInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificInfo.json();
    console.log(repoInfo);
// Still inside the async function to get specific repo information, create a variable called fetchLanguages to fetch data from language_url property of your repoInfo.Create a variable called languageData to save the JSON response.
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //  console.log(languageData);

// Add each language to an empty array called languages. Hint: The languageData is an object. Remember how to loop through an object? You’ll want to add the languages to the end of the array.
    const languages = [];
    for (const language in languageData) {
    languages.push(language);
}
    // console.log(languages);

// At the bottom of the async function to get specific repo information, call the function to display the repo info. Pass it the repoInfo object and the languages array.
    displayRepoInfo(repoInfo, languages);
};
// Below the async function create and name a new function to display the specific repo information. The function should accept two parameters:  repoInfo and languages.Inside the function, empty the HTML of the section with a class of “repo-data” where the individual repo data will appear.Create a new div element and add the selected repository’s name, description, default branch, and link to its code on GitHub.Inside the 5 placeholders, use the JSON data to grab the relevant properties to display on the page. Use the properties from the object you retrieved when you fetched the specific repos. Hint: You want the URL to the repo on GitHub, not the repo’s API address.Append the new div element to the section with a class of “repo-data”. Unhide (show) the “repo-data” element. Hide the element with the class of “repos”.
const displayRepoInfo = function (repoInfo, languages) {
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide");
    repoInfoSection.classList.add("hide");

    const div = document.createElement("div");
        div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoDataSection.append(div);
    viewGalleryButton.classList.remove("hide");
};

// At the bottom of your code, create a click event listener attached to your variable that points to the Back to Repo Gallery button. In the body of the callback function, unhide (display) the section with the class of “repos”, the location where all the repo information appears. Add the “hide” class to the section where the individual repo data will appear. Also, add the “hide” class to the Back to Repo Gallery button itself. In the function responsible for displaying the individual repo information, remove the class of “hide” from the Back to Repo Gallery button.
viewGalleryButton.addEventListener("click", function () {
    repoInfoSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    viewGalleryButton.classList.add("hide"); 

}); 

// Add an Input Event to the Search Box. At the bottom of your code, attach an "input" event listener to filterInput. Pass the event (e) the callback function.Inside the callback function, create a variable to capture the value of the search text. Log out the variable and enter some text in the input to ensure that you’ve successfully captured it. Create a variable called repos to select ALL elements on the page with a class of “repo”.Create a variable and assign it to the lowercase value of the search text. Loop through each repo inside your repos element. Inside the loop, create a variable and assign it to the lowercase value of the innerText. of each repo.Check to see if the lowercase repo text includes the lowercase search text. If the repo contains the text, show it. If it doesn’t contain the text, hide the repo.
filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    // console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();
    for (const repo of repos){ 
        const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLowerText)) {
        repo.classList.remove("hide");
    } else {
        repo.classList.add("hide");
     }
    }
});

