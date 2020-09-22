$( function() {
  console.log("ready;");

  //loadModule
  loadModules();
  let searchCard = $(".content .card");


  var availableTags = [
    "module",
    "mod",
    "mo",
    "Lorem",
  ];
  $( "#searchBar" ).autocomplete({
    source: availableTags
  });
} );

$("#searchBar").keyup(function () {
  // Search text
  var text = $(this).val().toLowerCase();
  // Hide all content class element
  $(".content").hide();

  // Search
  $(".content .card-title").each(function () {
    if (
      $(this)
        .text()
        .toLowerCase()
        .indexOf("" + text + "") != -1
    ) {
      $(this).closest(".content").show();
    } 
  });
});




function loadModules(){

$.getJSON( 'modules.json', function( data ) {
    console.log(data);
    
   var modules;
    $.each(data,function(ddata){

        modules = '<a href="module.html?id='+ data[ddata]['moduleID'] +'"><div class="card content"> <div class="card-body"><h5 class="card-title title">' + data[ddata]['moduleName'] + '</h5><p class="card-text"> '+ data[ddata]['section'][0]['sectionContent'] +' </p></div></div></a>';
        
        $('.search-result').append(modules);
        

    });
    searchCard.hide();

});

function supportsLocalStorage() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}

function getRecentSearches() {
  var searches = localStorage.getItem("recentSearches");
  if (searches) {
    return JSON.parse(searches);
  } else {
    return [];
  }
}

function saveSearchString(str) {
  var searches = getRecentSearches();
  if (!str || searches.indexOf(str) > -1) {
    return false;
  }

  searches.push(str);
  localStorage.setItem("recentSearches", JSON.stringify(searches));
  return true;
}

function removeSearches() {
  localStorage.removeItem("recentSearches");
}

// Create an li, given string contents, append to the supplied ul
function appendListItem(listElement, string) {
  var listItemElement = document.createElement("A");
  listItemElement.setAttribute("href", "#");
  listItemElement.setAttribute("class", "badge badge-dark");
  listItemElement.innerHTML = string;
  listElement.appendChild(listItemElement);
}

// Empty the contents of an element (a)
function clearList(listElement) {
  listElement.innerHTML = "";
}

window.onload = function () {
  if (localStorage) {
    var searchForm = document.getElementById("searchForm");
    var searchBar = document.getElementById("searchBar");
    var recentSearchList = document.getElementById("recentSearchList");
    var clearButton = document.getElementById("clearStorage");

    // Initialize display list
    var recentSearches = getRecentSearches();
    recentSearches.forEach(function (searchString) {
      appendListItem(recentSearchList, searchString);
    });

    // Set event handlers
    searchForm.addEventListener("submit", function (event) {
      var searchString = searchBar.value;
      if (saveSearchString(searchString)) {
        appendListItem(recentSearchList, searchString);
      }
    });

    clearButton.addEventListener("click", function (event) {
      removeSearches();
      clearList(recentSearchList);
    });
  }
};
}