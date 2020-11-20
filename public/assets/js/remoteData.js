
function getInfo() {
  let url = 'https://api.github.com/graphql';
  let queryData = {
    query: `
    {
      viewer {
        login
        repositories(affiliations: OWNER, orderBy: {field: CREATED_AT, direction: ASC}, isFork: false, last: 20, privacy: PUBLIC) {
          totalCount
          edges {
            node {
              description
              url
              name
              isPrivate
              updatedAt
              object(expression: "master") {
                ... on Commit {
                  history {
                    totalCount
                  }
                  committedDate
                }
                repository {
                  refs(refPrefix: "refs/heads/", first: 10) {
                    totalCount
                  }
                  stargazerCount
                }
              }
              primaryLanguage {
                color
                name
                id
              }
              pullRequests {
                totalCount
              }
            }
          }
        }
        avatarUrl(size: 20)
        bio
        bioHTML
        name
      }
      user(login: "tbanj") {
        avatarUrl(size: 280)
      }
    }       
          `
  }
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(queryData),
    headers: {
      'Authorization': `Bearer  EMPTY`,
      'Content-Type': 'Application/json'
    }
  }).then(res => {

    if (res.status === 400) { return res.json(); }
    if (res.ok) {
      return res.json();
    } else { throw new Error('network error'); }
  })
    .then(async (parsedRes) => {
      getRepoList(parsedRes);
    })
}

getInfo();



function getRepoList(arr) {
  let updateData = "";
  let updatedMoment = "";
  let profileName = "";
  let profileUsername = "";
  let profileBio = "";
  let repoPubCount = "";
  let profileImg = "";
  profileImg = arr.data.user.avatarUrl;
  profileAvatar = arr.data.user.avatarUrl;

  profileBio = arr.data.viewer.bio;
  profileName = arr.data.viewer.name;
  profileUsername = arr.data.viewer.login;
  repoPubCount = arr.data.viewer.repositories.totalCount;
  var repoArr = arr.data.viewer.repositories.edges;
  var dataList = "";
  var j;
  for (j = 0; j < repoArr.length; j++) {
    updatedMoment = getDate(repoArr[j]['node']['updatedAt']);
    dataList += `
            <div class="parentFlex bbgr mt4">
<div  class="parentFlex subRepoContainer">
 <div class="" style="flex-grow: inherit;">
     <h3 class="fzh3">
         <a id="repoText" href='${repoArr[j]['node']['url']}'>${repoArr[j]['node']['name'] || ""}</a>
         <span style='display: ${repoArr[j]['node']['isPrivate'] ? 'inline-block;' : 'none;'}' class="repoType">${repoArr[j]['node']['isPrivate'] ? 'Private' : ''}</span>
     </h3>
     <div class="mb8 col-75">
         <p class="flex2 fcolor fz14">
             ${repoArr[j]['node']['description'] ? `${repoArr[j]['node']['description']}` : ''}
         </p>
     </div>

     <div class="parentFlex">
         <div class="mr3 fz12 fcolor">
             <span><span style='display:  ${repoArr[j]['node']['primaryLanguage'] && `${repoArr[j]['node']['primaryLanguage']['color']}` ? 'inline-block' : 'none'}; background-color: ${repoArr[j]['node']['primaryLanguage'] && `${repoArr[j]['node']['primaryLanguage']['color']}` ? `${repoArr[j]['node']['primaryLanguage']['color']}` : '#ffffff'};
             ' class="priLangCrl"></span>
             <span class="fz12 fcolor">${repoArr[j]['node']['primaryLanguage'] && `${repoArr[j]['node']['primaryLanguage']['name']}` ? `${repoArr[j]['node']['primaryLanguage']['name']}` : ''}</span>
                </span>
            
                <span class="mr3 ml3" style='display:  ${repoArr[j]['node']['object'] && repoArr[j]['node']['object']['repository']
        && `${repoArr[j]['node']['object']['repository']['stargazerCount']}` > 0 ? 'inline-block' : 'none'}; 
             ' ><svg class="octicon octicon-star mr4"
                      viewBox="0 0 16 16" version="1.1" width="12" height="12" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
             <span class="fz12 fcolor">${repoArr[j]['node']['object']['repository']['stargazerCount']}</span>
                </span>

                <span class="mr10 ml10" style='display:  ${repoArr[j]['node']['object'] && repoArr[j]['node']['object']['repository']
        && `${repoArr[j]['node']['object']['repository']['refs']}`
        && `${repoArr[j]['node']['object']['repository']['refs']['totalCount']}` > 0 ? 'inline-block' : 'none'}; 
             ' ><span ><svg class="octicon octicon-git-branch text-gray" height="12" viewBox="0 0 16 16" version="1.1" width="12" aria-hidden="true"><path fill-rule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"></path></svg></span>
             <span class="fz12 fcolor">${repoArr[j]['node']['object']['repository']['refs']['totalCount']}</span>
                </span>
             Updated on
             <time datetime="2008-02-14 20:00" style="white-space: nowrap!important;"
             >${updatedMoment}</time>
         </div>
         <!-- <relative-time datetime="2020-10-28T09:32:10Z" class="no-wrap" title="28 Oct 2020, 10:32 GMT+1">20 days ago</relative-time>
          -->
         <div></div>
         <div></div>
     </div>
  </div>

  <div class=>
      <div class="fr ">
          <form class="fr">
             <button class="btnStar btnStarView" >
                 <div class="mt2">
                     <svg class="octicon octicon-star mr4"
                      viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                 
                 </div>
                Star
             </button>
          </form>

          <!-- graph -->
         
      </div>


      <div class="parentFlex graphActivity" style="display: none">
        <svg width="155" height="2">
         <defs>
           <linearGradient id="gradient-312443105" x1="0" x2="0" y1="1" y2="0">
               <stop offset="10%" stop-color="var(--color-calendar-graph-day-L1-bg)"></stop>
               <stop offset="33%" stop-color="var(--color-calendar-graph-day-L2-bg)"></stop>
               <stop offset="66%" stop-color="var(--color-calendar-graph-day-L3-bg)"></stop>
               <stop offset="90%" stop-color="var(--color-calendar-graph-day-L4-bg)"></stop>
           </linearGradient>
           <mask id="sparkline-312443105" x="0" y="0" width="155" height="28">
             <polyline transform="translate(0, 28) scale(1,-1)" points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,1 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,1 69,1 72,1 75,1 78,1 81,1 84,1 87,1 90,1 93,1 96,1 99,1 102,1 105,1 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,2 " fill="transparent" stroke="#8cc665" stroke-width="2">
           </polyline></mask>
         </defs>
   
         <g transform="translate(0, -12)">
           <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: #b8f0c1; mask: #b8f0c1"></rect>
         </g>
       </svg>
        </div>
  </div>
</div>
</div>`
  }

  document.getElementById("repoList").innerHTML = dataList;
  const profileNameText = document.getElementsByClassName("profileName");

  const usernameArr = document.getElementsByClassName("profileUsername");
  const profileBioText = document.getElementsByClassName("profileBio");

  document.getElementById("repoPubCount").innerHTML = repoPubCount;

  const profileImgSrc = document.getElementsByClassName("profileImg");
  document.getElementById("profileAvatar").src = profileAvatar;

  // loop through profileUsername class
  for (let un = 0; un < usernameArr.length; un++) {
    usernameArr[un].innerHTML = profileUsername;
  }

  for (let pb = 0; pb < profileBioText.length; pb++) {
    profileBioText[pb].innerHTML = profileBio;
  }

  for (let pn = 0; pn < profileNameText.length; pn++) {
    profileNameText[pn].innerHTML = profileName;
  }

  for (let pis = 0; pis < profileImgSrc.length; pis++) {
    profileImgSrc[pis].src = profileImg;
  }

}
