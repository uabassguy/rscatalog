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
        if (result){
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
  var text = $(this).find('.artist').replaceWith(/[\W_]+/g," ") + ' ' + $(this).find('.song').replace(/[\W_]+/g," ");
  text = '!sr ' + text;
  const textArea = document.createElement("textarea");
  textArea.value = text;
  $(this).appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  $(this).removeChild(textArea);
  $(this).innerText = 'Copied!';
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
			
			newElem.append('<td><span>Copy</span></td>');
			newElem.removeAttr('id');
			newElem.insertAfter('tbody tr:last');
		}
	}).done(function() {
		$('#loading').hide();
	});
}