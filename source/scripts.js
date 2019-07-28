// initialize array
var pushList = [];

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
    console.log(pushList);

    document.getElementById('TagContainer').innerHTML = '';
    for(i=0; i < pushList.length; i++) {
        var value = pushList[i];
        const tagHtml = `<div class="tag">` + value + `</div>`;
        document.getElementById('TagContainer').innerHTML += tagHtml;
    };
};