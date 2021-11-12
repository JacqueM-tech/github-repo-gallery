// This div is where your profile information will appear
const overview = document.querySelector(".overview");
const username = "JacqueM-tech";
const repoList = document.querySelector(".repo-list");

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
    const repoData = await reposList.json();
     console.log(repoData);
    repoInfo(repoData);
};
 
// Below the async function fetching the repos, create and name a function to display information about each repo. Use repos as a parameter so that the function accepts the data returned from your last API call. Inside the function, loop and create a list item for each repo and give each item: A class of “repo” and An <h3> element with the repo name. Append the list item to the global variable that selects the unordered repos list. 
    const repoInfo = function (repos) {
        for (const allRepos of repos) {
        const list = document.createElement("li"); 
        list.classList.add("allRepos");
        list.innerHTML = `<h3>${allRepos.name}</h3>`;
        repoList.append(list);
        }
    };


