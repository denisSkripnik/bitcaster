function get_data(coin) {
	var xhr = new XMLHttpRequest();
	var url="https://api.mlab.com/api/1/databases/heroku_3k196wp1/collections/pairs?apiKey=pF4oYYSvYct2JeTyEYnMO-eSmmm1Cgqm&q={'coin':'"+coin+"'}";
	xhr.open('GET', url, false);
	xhr.send();
    if (xhr.status != 200) {
     alert( xhr.status + ': ' + xhr.statusText ); 
     } 
	 else {
      return xhr.responseText; 
      }
}

function f_window(pair){
	console.log(pair);
}

function insert_row (dt) {
	var cl;
	tb=document.getElementById(dt.type).getElementsByTagName('tbody')[0];
	if (dt.forecast>0) {
		cl='hi_pred';
	}
	else if(dt.forecast<0){
		cl='l_pred';
	}

	n_row=tb.insertRow();
	var att = document.createAttribute("onclick"); 
	att.value="f_window('"+dt.pair+"')";
	n_row.setAttributeNode(att);
    n_cell=n_row.insertCell(0);
    n_cell.textContent=dt.exchange;
    n_cell=n_row.insertCell(1);			
    n_cell.textContent =dt.pair;
	n_cell=n_row.insertCell(2);
	n_cell.textContent =(+dt.hight).toFixed(5);
	n_cell=n_row.insertCell(3);
	n_cell.textContent =(+dt.low).toFixed(5);
	n_cell=n_row.insertCell(4);
	n_cell.textContent =(+dt.last).toFixed(5);
	n_cell=n_row.insertCell(5);
	n_cell.textContent =(+dt.volume).toFixed(5);
	n_cell=n_row.insertCell(6);
	if (dt.forecast) {
	    n_cell.innerHTML='<div class="'+cl+'"></div>'+Math.abs(dt.forecast)+' %';
	}
	else {
		n_cell.textContent='None';
	}
}

function clear_rows() {
	var tb1=document.getElementById('quote').getElementsByTagName('tr');
	var tb2=document.getElementById('base').getElementsByTagName('tr');
	document.getElementById('quote').getElementsByTagName('tbody')[0].innerHTML='';
	document.getElementById('base').getElementsByTagName('tbody')[0].innerHTML='';
	
	while (tb1.length!=0){
	document.getElementById('quote').deleteRow(-1);
	}
	while (tb2.length!=0){
	document.getElementById('base').deleteRow(-1);
	}
	
}

function head_width() {
	var wth=0;
	var tb1=document.getElementById('quote').rows[0];
	var tb2=document.getElementById('base').rows[0];
	var h_tb1=document.getElementById('qh').rows[0];
	var h_tb2=document.getElementById('bh').rows[0];

	for (var i=0; i<7;i++) {
		wth=tb1.cells[i].clientWidth;
		h_tb1.cells[i].style.width=wth+'px';
	}
	for (var i=0; i<7;i++) {
		wth=tb2.cells[i].clientWidth;
		h_tb2.cells[i].style.width=wth+'px';
	}

}

function build_table(coin) {
	var bs=false;
	var qs=false;
	var vsum=0;
	var raw=get_data(coin);
	var data=JSON.parse(raw);
	document.getElementById('coin_name').innerHTML='<h2>'+coin+'</h2>'
	for (var i in data) {
		if (data[i].type=='base'){
            bs=true;}
			
		else if (data[i].type=='quote'){
			qs=true;
			}
		
		insert_row(data[i]);
		vsum+=Number(data[i].volume);
		
	}
	if (!bs) {
		document.getElementById('base').getElementsByTagName('tbody')[0].innerHTML='<span class="f_coin">No Coin Data</span>';
	}
	if (!qs) {
		document.getElementById('quote').getElementsByTagName('tbody')[0].innerHTML='<span class="f_coin">No Coin Data</span>';
	}
	    document.getElementById('coin_data').innerHTML='Total Volume: '+vsum.toFixed(5)
    setTimeout(head_width, 1000);	
		}


function pp_window(state,coin) {
		if (state=='block') {
			build_table(coin);
		}
		else {
			 clear_rows();
		}
		document.getElementsByClassName('wrap')[0].style.display = state;
		document.getElementsByClassName('pp_window')[0].style.display = state;
	}
