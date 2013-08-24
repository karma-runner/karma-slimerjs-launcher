webpage
  .open('') // loads a page
  .then(function(){ // executed after loading
    // store a screenshot of the page
    webpage.viewportSize =
        { width:650, height:320 };
    webpage.render('page.png',
                   {onlyViewport:true});
    // then open a second page
    return webpage.open(url2);
  })
  .then(function(){
    // click somewhere on the second page
    webpage.sendEvent("click", 5, 5,
                        'left', 0);
    slimerjs.exit()
  });
