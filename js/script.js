const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#author-list-link').innerHTML)
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  // eslint-disable-next-line no-unused-vars
  optTagsListSelector = '.list .tags',
  // eslint-disable-next-line no-unused-vars
  optAuthorListSelector = '.list .authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this,
    activeLinks = document.querySelectorAll('.titles a.active'),
    activeArticles = document.querySelectorAll('.posts article.active');

  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

};

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  console.log(customSelector);
  console.log(optArticleSelector + customSelector);

  for(let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* * [DONE] create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* [DONE] insert link into html variable */

    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function calculateTagsParams(tags){

  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }


  return params;
}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;

}

function generateTags(){

  /* [NEW DONE] create a new variable allTags with an empty object */

  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find tags wrapper */

    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* [DONE] generate HTML of the link */

      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* [DONE] add generated code to html variable */

      html = html + linkHTML;

      /* [NEW DONE] check if this link is NOT already in allTags */

      if(!allTags.hasOwnProperty(tag)){

        /* [NEW DONE] add generated code to allTags object */

        allTags[tag] = 1;

      } else {

        allTags[tag]++;

      }

      /* END LOOP: for each tag */

    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */

  }

  /* [NEW DONE] find list of tags in right column */

  const tagList = document.querySelector('.tags'),
    tagsParams = calculateTagsParams(allTags);



  /* [NEW DONE] create variable for all links HTML code */

  const allTagsData = {tags: []};

  /* [NEW DONE] START LOOP: for each tag in allTags: */

  for(let tag in allTags){

    /* [NEW DONE] generate code of a link and add it to allTagHTML */

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }

  /* [NEW DONE] END LOOP: for each tag in allTags: */

  /* [NEW DONE] add html from allTagsHTML to taglist */

  tagList.innerHTML = templates.tagCloudLink(allTagsData);

}

generateTags();

function tagClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const tags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for(let activeTag of tags){

    /* [DONE] remove class active */

    activeTag.classList.remove('active');

  }

  /* [DONE] END LOOP: for each active tag link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const tagsConstant = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for(let tagConstant of tagsConstant){

    /* [DONE] add class active */

    tagConstant.classList.add('active');

  }
  /* [DONE] END LOOP: for each found tag link */

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){

  /* [DONE] find all links to tags */

  const allLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* [DONE] START LOOP: for each link */

  for(let allLink of allLinks){

    /* [DONE] add tagClickHandler as event listener for that link */

    allLink.addEventListener('click', tagClickHandler);

  }

  /* [DONE] END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){

  /* [NEW DONE] create a new variable allAuthors with an empty object */

  let allAuthors = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find author wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */

    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    /* [DONE] add generated code to html variable */

    html = html + linkHTML;

    /* [NEW DONE] check if this link is NOT already in allAuthors */

    if(!allAuthors.hasOwnProperty(articleAuthor)){

      /* [NEW DONE] add generated code to allTags object */

      allAuthors[articleAuthor] = 1;

    } else {

      allAuthors[articleAuthor]++;

    }

    /* [DONE] insert HTML of all the links into the author wrapper */

    authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */

  }

  /* [NEW DONE] find list of authors in right column */

  const authorList = document.querySelector('.authors');

  /* [NEW DONE] create variable for all links HTML code */

  const allAuthorsData = {authors: []};

  /* [NEW DONE] START LOOP: for each author in allAuthors: */

  for(let author in allAuthors){

    /* [NEW DONE] generate code of a link and add it to allAuthorsHTML */

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });

  }

  /* [NEW DONE] END LOOP: for each author in allAuthors: */

  /* [NEW DONE] add html from allAuthorsHTML to authorlist */

  authorList.innerHTML = templates.authorListLink(allAuthorsData);

}

generateAuthors();

function authorClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');

  /* [DONE] find all author links with class active */

  const authors = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */

  for(let activeAuthor of authors){

    /* [DONE] remove class active */

    activeAuthor.classList.remove('active');

  }

  /* [DONE] END LOOP: for each active author link */

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */

  const authorsConstant = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found author link */

  for(let authorConstant of authorsConstant){

    /* [DONE] add class active */

    authorConstant.classList.add('active');

  }
  /* [DONE] END LOOP: for each found author link */

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  /* [DONE] find all links to authors */

  const allLinks = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */

  for(let allLink of allLinks){

    /* [DONE] add authorClickHandler as event listener for that link */

    allLink.addEventListener('click', authorClickHandler);

  }

  /* [DONE] END LOOP: for each link */
}

addClickListenersToAuthors();

