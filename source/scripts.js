// initialize array
var pushList = [];
var columnList;

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

    document.getElementById('TagContainer').innerHTML = '';
    for(i=0; i < pushList.length; i++) {
        var value = pushList[i];
        const tagHtml = `<div class="tag">` + value + `</div>`;
        document.getElementById('TagContainer').innerHTML += tagHtml;
    };

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

// function to create list entries for all columns
function listItems(){

    // get all elements form the list
    const columnMap = document.getElementById('columnMap');
    var index = Object.keys(data);

    // for object key in data add a list item
    for (index in data){
       const listTag = `<li class="selectable" onclick="AddColumn('${index}')"><a>${index}</a></li>`;
       console.log(listTag);
       columnMap.innerHTML += listTag;
    }
};