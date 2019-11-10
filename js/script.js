const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this,
    activeLinks = document.querySelectorAll('.titles a.active'),
    activeArticles = document.querySelectorAll('.posts article.active'),
    articleSelector = clickedElement.getAttribute("href"),
    targetArticle = document.querySelector(articleSelector);

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

    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
    
}

{

    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

    function generateTitleLinks(){

        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        
        /* [DONE] for each article */

        const articles = document.querySelectorAll(optArticleSelector);

        let html = '';
        
        for(let article of articles){

            /* [DONE] get the article id */

            const articleId = article.getAttribute("id");

            /* [DONE] find the title element */
            /* [DONE] get the title from the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* [DONE] create HTML of the link */

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log(linkHTML);

            /* [DONE] insert link into html variable */

            html = html + linkHTML;
        
        }

        titleList.innerHTML = html;

        const links = document.querySelectorAll('.titles a');
        console.log(links);
    
        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }

    }

    generateTitleLinks();

}

