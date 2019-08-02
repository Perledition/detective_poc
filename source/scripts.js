// initialize array
var pushList = [];
var columnList;
var backup;

// Search Function -> Allows you to filter for a Column
function ColumnSearch(div_id, searchBar){
    const list = document.querySelector('#' + div_id);

    // filter all columns that fit to the search input
    const FilterBar = document.forms[searchBar].querySelector('input');

    // add event listener, so we recognize each type
    FilterBar.addEventListener('keyup', function(e){

         // transform everything to lower case to avoid casing issues
        const term = e.target.value.toLowerCase();

        // get all elements form the list
        const columns = list.getElementsByTagName('li');

        // check for the current search input if a column includes the input text
        // this does not make a difference if the input is included in at the start or end
        // simple for loop to each element in the list
        Array.from(columns).forEach(function(column){
            const title = column.textContent;
            if(title.toLowerCase().indexOf(term) != -1){
                column.style.display = 'block';
            }
            else {
                column.style.display = 'none';
            }
        })
    });
};

// This function adds the selected column to the list to filter
function AddColumn(column) {

    // filter for the column name in the list
    pushList.push(column);

    // Create all Tags for each element in the global column list
    createColumnTags('TagContainer');

    // get all elements form the list
    const list = document.querySelector('#columnMap');
    const columns = list.getElementsByTagName('li');

    // if column is activated and in the list change display to none, since it cannot be selected anymore
    Array.from(columns).forEach(function(col){
        if(col.firstChild.innerHTML === column){
           col.style.display = 'none';
        }
    });
};

// this function adds all values to the global variable for the column list
function loadColumns(){
    columnList = Object.keys(data);
};

// creates all Tags for the column selections
function createColumnTags(element_id, remover='True'){

    document.getElementById(element_id).innerHTML = '';
    for(i=0; i < pushList.length; i++) {
        var value = pushList[i];
        if (remover==='True'){
            const tagHtml = `<div class="tag" onclick="removeColumn('${value}')">` + value + `</div>`;
            document.getElementById(element_id).innerHTML += tagHtml;
        }
        else{
            const tagHtml = `<p class="tag">` + value + `</p>`;
            document.getElementById(element_id).innerHTML += tagHtml;
        };


    };
};

// function to create list entries for all columns
function listItems(){

    // get all elements form the list
    const columnMap = document.getElementById('columnMap');
    var index = Object.keys(data);

    // for object key in data add a list item
    for (index in data){
       const listTag = `<li class="selectable" onclick="AddColumn('${index}')"><a>${index}</a></li>`;
       columnMap.innerHTML += listTag;
    }
};

// removes an element from the selection list (TagContainer)
function removeColumn(ele){

   // remove the column from the global list
   var index = pushList.indexOf(ele);
   pushList.splice(index, 1);

  // display the column in the columnMap again, since it's not selected anymore
  const list = document.querySelector('#columnMap');
  const columns = list.getElementsByTagName('li');

  // if column is activated and in the list change display to none, since it cannot be selected anymore
  Array.from(columns).forEach(function(col){
    if(col.firstChild.innerHTML === ele){
        col.style.display = 'block';
    }
  });

  createColumnTags('TagContainer');
};

// post data to the api backend
function postData(url = '', content = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(content), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native JavaScript objects
};

// this function makes an simple api call to send the data to the api
function _data(url, post_data) {
   postData(url, post_data)
  .then(content => data=content) // JSON-string from `response.json()` call
  .catch(error => console.error(error));

  //console.log(data);
};

// send filter options and data to the api to filter for all needed Columns
function ColumnFilter(){

    backup = data;
    _data('http://localhost:5001/ColumnFilter', {columns: pushList, dataset:[data]});
    // create a new HTML element to show, that the loaded data set was was filtered
    var filterBox = `<div class="container mb-2 align-items-center text-center float-center">
                        <div class="card m-2 p-2 mx-auto align-items-center text-center">
                            <div class="row p-2">
                                <p>DataSet was filtered to columns: </p>
                                <div class="row p-2" id="filterTags"></div>
                            </div>
                        </div>
                     </div>`;

    // add the filterBox to the Elements
    document.getElementById('GraphBox').insertAdjacentHTML('beforeend', filterBox);

    // insert all filterTags in the filterBox
    createColumnTags('filterTags', remover='False');
    pushList = [];


};

// generate id by generating a random number
function randomGenerator(){
    var id = '_' + Math.random().toString(36).substr(2, 9)
    return id
};

// create an html table within the workspace of the current data
function createTable(){

    // Create a random id number
    var randid = randomGenerator();

    // Create a new Card element with an random id number
    var TableBox = `<div class="container mb-2 align-items-center text-center float-center" id="card_${randid}">
                        <div class="card m-2 p-2 mx-auto align-items-center text-center" id="TableBox${randid}" style="overflow-x: auto;">
                         <!-- define delete icon -->
                         <a class="float-right p-2" onclick="delete_graph('${randid}')" id="delete_btn"><i class="fas fa-times"></i></a>
                        </div>
                     </div>`;
    // add the TableBox to the GraphBox
    document.getElementById('GraphBox').insertAdjacentHTML('beforeend', TableBox);


    // create the table based on the current data im local drive
    var html = "<table class='table'><thead class='thead'><tr>";

    // add column names
    for (column in data){
        html += "<th scope='col'>" + column + "</th>";
    }
    html += "</tr></thead><tbody>";

    // create sub function to create row entries
    var len = Object.keys(data)[0].length;
    for (var ix=0; ix<len; ix++){
        html += "<tr>";
        for (column in data){
            html += "<th scope='row'>" + data[column][ix] + "</th>";
        }
        html += "</tr>";
    }

    html += "</tbody>";

    // create all rows for each column



    html += "</table>";
    doc_id = "TableBox" + randid;
    document.getElementById(doc_id).innerHTML += html;
    console.log(document.getElementById(doc_id));
};


// convert the data to a usable json object
function DataConverter(){

    _data('http://localhost:5001/DataConverter', {data_set: data});

};

// delete a card from the GraphBox
function delete_graph(id){
    var element = document.getElementById("card_" + id);
    element.parentNode.removeChild(element);
    return false;
};
