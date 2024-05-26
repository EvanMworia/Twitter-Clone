const UsersURL = 'https://jsonplaceholder.typicode.com/users/';

const PostsURL = 'https://jsonplaceholder.typicode.com/posts/';
const CommentsURL = 'https://jsonplaceholder.typicode.com/comments/';
let contentArea = document.getElementById('content-area');
let profileArea = document.getElementById('profile-info');
let profileName = document.getElementById('profile-name');
let profileInfo = document.getElementById('profile-info');
let profileUsername = document.getElementById('profile-username');

function captureSelectedDropdownValue() {
    const dropdown = document.getElementById('dropdown');
    const selectedIndex = dropdown.value;
    return selectedIndex;
}
function timeGenerator() {
    let timePosted = Math.ceil(Math.random() * 5);
    return timePosted;
}

async function getUsers() {
    const response = await fetch(UsersURL, { method: 'GET' });
    const data = await response.json();
    return data;
}
//The display single user info fxn targets the profile area -- displaying details about the selected user
//Additionaly acts as the parent to the display header fxn
//----------WORKS---------
async function displaySingleUserInfo() {
    const uid = captureSelectedDropdownValue();

    let html = '';
    await fetch(UsersURL + uid)
        .then((res) => res.json())
        .then((user) => {
            html += `<div class="profile-name" id="profile-name">${user.name}</div>
            <div class="profile-username" id="profile-username">@${user.username}</div>
            <br /><br />
            <div class="catch-phrase" id="catch-phrase">${user.company.catchPhrase}</div>
            <br />
            <div class="links-container">
                <div class="website" id="website">
                    <i class="fa-solid fa-globe"></i>
                    ${user.website}
                </div>
                <br />

                <div class="city" id="city">
                    <i class="fas fa-map-marker-alt"></i>
                    ${user.address.city}
                </div>
                <br />
            </div>`;
        });
    profileInfo.innerHTML = html;
    // displaytweetHeader();
    displaySingleUserPosts();
}
//display Header, targets the content area, here displaying the users name and username and time
//---------WORKS----------
// async function displaytweetHeader() {
//     const uid = captureSelectedDropdownValue();
//     const divToAppendTo = document.getElementById('tweet-header');

//     let html = '';
//     await fetch(UsersURL + uid)
//         .then((res) => res.json())
//         .then((user) => {
//             html += `<span class="tweet-name" id="tweet-name">${user.name}</span>
//                         <span class="tweet-username" id="tweet-username"
//                             >@${user.username}</span
//                         >
//                         <span class="tweet-time" id="tweet-time">1h</span>`;
//             displayUsersPost(user);
//         });
//     divToAppendTo.innerHTML = html;
//     displayUsersPost();
// }

//------------WORKS----Fetches posts by a single user correctly
async function displaySingleUserPosts() {
    let htmlToBeRendered = '';
    const uid = captureSelectedDropdownValue();
    const users = await getUsers();
    const tweepName = users.find((user) => user.id == uid);

    const allPosts = await getPosts();
    const postsBySingleUser = allPosts.filter(
        (post) => post.userId == Number(uid)
    );
    console.log(postsBySingleUser);
    postsBySingleUser.forEach((post) => {
        htmlToBeRendered += `<div class="tweet">
                <div class="profile-picture-small"></div>
                <div class="tweet-content">
                    <div class="tweet-header">
                        <span class="tweet-name">${tweepName.name}</span>
                        <span class="tweet-username">@${
                            tweepName.username
                        }</span>
                        <span class="tweet-time">${timeGenerator()}h</span>
                    </div>
                    <div class="tweet-text">
                        ${post.body}
                    </div>
                </div>
            </div>`;
    });
    contentArea.innerHTML = htmlToBeRendered;
}

displaySingleUserInfo();

async function getPosts() {
    const response = await fetch(PostsURL, { method: 'GET' });
    const data = await response.json();
    return data;
}
//----NOT COMPLETED----
// async function displayUsersPost(user) {
//     const fetchedPosts = await getPosts();
//     const uid = captureSelectedDropdownValue();
//     console.log(uid);
//     const filteredPosts = fetchedPosts.filter(
//         (post) => post.userId === Number(uid)
//     );
//     console.log(filteredPosts);
//     let htmlToBeRendered = '';
// }

getPosts();
