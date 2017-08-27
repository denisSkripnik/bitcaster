
    function class_filter(cl) {
	    //TR Classes DOM Objects array 
		var table_objects =[];
		table_objects[0]=document.getElementsByClassName('coin_class1');
		table_objects[1]=document.getElementsByClassName('coin_class2');
		table_objects[2]=document.getElementsByClassName('coin_class3');
		table_objects[3]=document.getElementsByClassName('coin_class4');
	    //Filter 
		switch(cl) {
		    case 'cl1':
			    iterator(table_objects[0],'table-row');
				iterator(table_objects[1],'none');
				iterator(table_objects[2],'none');
				iterator(table_objects[3],'none');
				break
			case 'cl2':
			    iterator(table_objects[0],'none');
				iterator(table_objects[1],'table-row');
				iterator(table_objects[2],'none');
				iterator(table_objects[3],'none');
				break
			case 'cl3':
			    iterator(table_objects[0],'none');
				iterator(table_objects[1],'none');
				iterator(table_objects[2],'table-row');
				iterator(table_objects[3],'none');
				break
		    case 'cl4':
			    iterator(table_objects[0],'none');
				iterator(table_objects[1],'none');
				iterator(table_objects[2],'none');
				iterator(table_objects[3],'table-row');
				break
		}
	}
    function iterator(obj,val) {
		for (var i=0;i<obj.length;i+=1){
            obj[i].style.display =val;
        }
	}
var btn=document.getElementById('find1');
console.log(btn);
btn.oninput=find_coin;

    function find_coin() {
	    var coin=this.value;
		var tb=document.getElementsByClassName('sortable')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		for (var i in tb) {
			c_row=tb[i].childNodes[0].textContent.toLowerCase();
		    is_finded=c_row.indexOf(coin.toLowerCase());
			if (coin.length==0){
				tb[i].style.display ='table-row';
			}
			else if (is_finded ==-1){
				tb[i].style.display ='none';
			}
			else {
				tb[i].style.display ='table-row';
			}
		} 
		
		}
		
	