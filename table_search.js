function table_search(search,tr,indexSearch='0') {
    //check if element don't exist in dom
    var regEx=/^[0-9]*$/;
    if (tr.length==0 || !regEx.test(indexSearch)){
        return;
    }
    /*hide tr don't contain search in input*/
    for (var i = 0; i <tr.length ; i++) {
        var result=false;
        for (var j = 0; j < indexSearch.length ; j++) {
            if (tr.eq(i).children().length > indexSearch[j]) {
                if (tr.eq(i).children().eq(indexSearch[j]).text().toLowerCase().replace(/[\W_]+/g," ").indexOf(search.toLowerCase().replace(/[\W_]+/g," "))!=-1){
                    result=true;
                    break;
                }
            }
        }
        if (result && i !== 0){
            tr.eq(i).show();
        } else {
            tr.eq(i).hide();
        }
    }
}

function copyClip(text)
{
	navigator.clipboard.writeText(text);
}

function unsecuredCopyToClipboard(ev) {
  var text = $(this).find('td:nth-child(1)').html().replace(/[\W_]+/g," ") + ' ' + $(this).find('td:nth-child(2)').html().replace(/[\W_]+/g," ");
  text = '!sr ' + text;
  const textArea = document.createElement("textarea");
  textArea.value = text;
  $(this).append(textArea);
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0,9999);
  try {
    //document.execCommand('copy');
    navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  $(this).find('textarea').remove();
  $(this).find('td:last').html('<svg class="bi" width="32" height="32" fill="#3a3"><use xlink:href="bootstrap-icons.svg#clipboard-check-fill"/></svg>');
  $(this).addClass('flash');
  var thisElem = $(this);
  setTimeout(function() {
  	thisElem.removeClass('flash');
  }, 3000)
  ev.preventDefault();
  ev.stopPropagation();
  return false;
}

$(document).on('ready', loadCatalog());

function loadCatalog() {
	$.getJSON('./SongsMasterGrid.json', function(obj) {
		for (var r in obj.dgvSongsMaster) {
			let row = obj.dgvSongsMaster[r];
			var newElem = $('#dummy').clone();
			newElem.on('click', unsecuredCopyToClipboard)
			newElem.append("<td class='artist'>" + row.colArtist + "</td>");
			newElem.append("<td class='song'>" + row.colTitle + "</td>");
			newElem.append("<td>" + row.colArrangements + "</td>");
			newElem.append('<td class="action"><svg class="bi" width="32" height="32" fill="currentColor"><use xlink:href="bootstrap-icons.svg#clipboard"/></svg></td>');
			newElem.removeAttr('id');
			newElem.insertAfter('tbody tr:last');
		}
	}).done(function() {
		$('#loading').hide();
	});
}