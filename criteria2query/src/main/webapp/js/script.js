// define variable
var ohdsi_json_orig;
var ohdsi_json;
var ohdsi_counts;
var selectAlls = [];
var nct_eli = {};
var xml_text = "";

function findCount(counts, id) {
	for (var i = 0; i < counts.length; i++) {
		if (counts[i]['key'] == id) {
			return counts[i]['value'];
		}
	}
	return [ 0, 0 ];
}

function getCT() {
	var ct_num = document.getElementById("ct_num").value;
	console.log("the ct_num is: " + ct_num);
	if (ct_num.substring(0, 3) != "NCT" && ct_num.substring(0, 3) != "nct") {
		// the input string is not valid
		alert("please enter valid ClinicalTrials.gov Identifier! \n e.g. NCT01136369");
	} else {
		window.location.href = "/EliIE/" + ct_num;
	}
}

function onLoadEliIE() {
	// set the ClinicalTrial.gov free text if provided
	var freetxt_area = document.getElementById("eliieinput");
	if ('text' in nct_eli) {
		freetxt_area.value = nct_eli['text'];
	} else {
		freetxt_area.placeholder = "e.g. Has a known history of HIV, multiple or severe drug allergies, or severe post-treatment hypersensitivity reactions.";
	}
}

// on load funciton for the EliIEx, initiate the input text when loading the
// index page
function onLoadEvent() {
	var xmltext = document.getElementById("xmlinput");
	if (xml_text == "") {
		xmltext.placeholder = 'e.g. \n \
		<root>\n\
			<sent>\n\
				<text>Has a known history of HIV , multiple or severe drug allergies , or severe post-treatment hypersensitivity reactions .</text>\n\
				<entity class="Condition" index="T1" negated="N" relation="T3:modified_by|T2:modified_by" start="5"> HIV </entity>\n\
				 <attribute class="Qualifier" index="T2" start="7"> multiple </attribute>\n\
				 <attribute class="Qualifier" index="T3" start="9"> severe </attribute>\n\
				 <entity class="Condition" index="T4" negated="N" relation="T5:modified_by|T2:modified_by|T3:modified_by" start="10"> drug allergies </entity>\n\
				 <attribute class="Qualifier" index="T5" start="14"> severe </attribute>\n\
				 <entity class="Condition" index="T6" negated="N" relation="T5:modified_by" start="15"> post-treatment hypersensitivity reactions </entity>\n\
			</sent>\n\
		</root>';
	}
}

// load the concept matched list
function onLoadConceptEvent() {
	onChangeConcept();
}

// sort the concept list via count array order
function sortConcept(concept, count) {
	// change the items order according to the sorted counts array
	for (var k = count.length - 1; k >= 0; k--) {
		for (var l = 0; l < concept.length; l++) {
			if (concept[l]['concept']['CONCEPT_ID'] == count[k]['key']) {
				var temp = concept[l];
				concept.splice(l, 1);
				concept.unshift(temp);
				break;
			}
		}
	}
}

function selectAll(idx) {
	var ancestor = document.getElementById("collapseExample" + idx);
	var tbody = ancestor.childNodes[0].childNodes[0].childNodes[0].childNodes;
	var checked = true;
	var checklabel = document.getElementById("sel" + idx);
	if (selectAlls[idx] == 1) {
		checked = false;
		selectAlls[idx] = 0;
		checklabel.innerHTML = "Select All";
	} else {
		selectAlls[idx] = 1;
		checklabel.innerHTML = "Unselect All";
	}
	// the first row is heading of table, start from 2nd row
	for (var j = 1; j < tbody.length; ++j) {
		var tmp = tbody[j].childNodes[0].childNodes[0];
		tmp.checked = checked;
	}

}

function onChangeConcept() {
	var ohdsi_div = document.getElementById("transform");
	ohdsi_div.innerHTML = "";
	var ohdsi_div = document.getElementById("transform");
	ohdsi_div.innerHTML = "";

	ohdsi_json = JSON.parse(JSON.stringify(ohdsi_json_orig));
	var conceptsets = ohdsi_json['ConceptSets'];
	var form = document.createElement("div");
	form.id = "concept_form";

	var conceptclass = document.createElement("div");
	// conceptclass.className = "";
	for (var i = 0; i < conceptsets.length; i++) {
		var items = conceptsets[i]['expression']['items'];
		// change the order of conceptsets items according to the count array
		sortConcept(items, ohdsi_counts['count'][i]);

		console.log("coming to the conceptset loop " + i + " item length"
				+ items.length);

		var conceptname = '<a class="btn btn-primary btn-block" role="button" data-toggle="collapse" \
		href="#collapseExample'
				+ i
				+ '" aria-expanded="false" aria-controls="collapseExample">'
				+ conceptsets[i]['name'] + " [length " + items.length + ']</a>';
		// var parser = new DOMParser();
		// var doc = parser.parseFromString(conceptname, "text/xml");
		var stat = document.getElementById("stat");
		if (items.length == 0) {
			var tr = '<tr><td>' + conceptsets[i]['name'] + '</td><td>'
					+ conceptsets[i]['domain'] + '</td>' + '</tr>';
			stat.insertAdjacentHTML('beforeend', tr);
		}

		conceptclass.insertAdjacentHTML('beforeend', conceptname);

		var conceptdiv = document.createElement("div");
		conceptdiv.className = "collapse";
		conceptdiv.id = "collapseExample" + i;
		var conceptwell = document.createElement("div");
		conceptwell.className = "well";
		var concepttbl = document.createElement("table");
		concepttbl.className = "table table-bordered .table-striped";
		var th = '<tr><th><button id="sel'
				+ i
				+ '" class="btn btn-success pull-right" onclick="selectAll('
				+ i
				+ ')">Unselect All</button></th><th>ID</th><th>Code</th><th>Name</th><th>Class</th><th>RC</th><th>DRC</th><th>Domain</th><th>Vocabulary</th></tr>';
		// selectAll array save the state of select/unselect all of each concept
		// sets
		selectAlls.push(1);

		concepttbl.insertAdjacentHTML('beforeend', th);

		for (var j = 0; j < items.length; j++) {
			// var concept = "test for items";
			var input = document.createElement("input");
			input.type = "checkbox";
			input.name = "conceptsets";
			input.value = conceptsets[i]['name'];
			input.checked = "checked";

			// show the conceptsets information via table
			var td2 = document
					.createTextNode(items[j]['concept']['CONCEPT_ID']);
			// td2.innerHTML = ;
			var td3 = document
					.createTextNode(items[j]['concept']['CONCEPT_CODE']);
			// td3.innerHTML = ;
			var td4 = document
					.createTextNode(items[j]['concept']['CONCEPT_NAME']);
			// td4.innerHTML = ;
			var td5 = document
					.createTextNode(items[j]['concept']['CONCEPT_CLASS_ID']);
			// td5.innerHTML = ;
			// console.log("DC is:
			// "+getCountsByKey(ohdsi_counts['count'][i],items[j]['concept']['CONCEPT_ID']));
			// var td6 =
			// document.createTextNode(getCountsByKey(ohdsi_counts['count'][i],items[j]['concept']['CONCEPT_ID'])["value"][0]);

			var DC = findCount(ohdsi_counts['count'][i],
					items[j]['concept']['CONCEPT_ID']);
			var td6 = document.createTextNode(DC[0]);

			// td6.innerHTML = ;
			// var td7 =
			// document.createTextNode(getCountsByKey(ohdsi_counts['count'][i],items[j]['concept']['CONCEPT_ID'])["value"][1]);
			var td7 = document.createTextNode(DC[1]);

			// td7.innerHTML = ;
			var td8 = document.createTextNode(items[j]['concept']['DOMAIN_ID']);

			// td8.innerHTML = ;
			var td9 = document
					.createTextNode(items[j]['concept']['VOCABULARY_ID']);
			// td9.innerHTML = ;

			// var concept = JSON.stringify(items[j]['concept']);
			// var concept_txt = document.createTextNode(concept);

			var tblrow = concepttbl.getElementsByTagName('tbody')[0];
			var newrow = tblrow.insertRow(tblrow.rows.length);
			var newcell = newrow.insertCell(0);
			newcell.appendChild(input);
			var newcell2 = newrow.insertCell(1);
			newcell2.appendChild(td2);
			var newcell3 = newrow.insertCell(2);
			newcell3.appendChild(td3);
			var newcell4 = newrow.insertCell(3);
			newcell4.appendChild(td4);
			var newcell5 = newrow.insertCell(4);
			newcell5.appendChild(td5);
			var newcell6 = newrow.insertCell(5);
			newcell6.appendChild(td6);
			var newcell7 = newrow.insertCell(6);
			newcell7.appendChild(td7);
			var newcell8 = newrow.insertCell(7);
			newcell8.appendChild(td8);
			var newcell9 = newrow.insertCell(8);
			newcell9.appendChild(td9);

		}
		conceptwell.appendChild(concepttbl);
		conceptdiv.appendChild(conceptwell);

		conceptclass.appendChild(conceptdiv);
	}
	form.appendChild(conceptclass);

	var submit = '<button class="btn btn-default pull-right" onclick="onSubmitConcept()">Apply</button>';

	var prev = '<button class="btn btn-default pull-left" action="" onclick="history.go(-1)">Previous</button>';

	var ohdsi_form = document.getElementById("ohdsi");
	ohdsi_form.innerHTML = "";
	ohdsi_form.appendChild(form);
	ohdsi_form.insertAdjacentHTML('beforeend', prev);
	ohdsi_form.insertAdjacentHTML('beforeend', submit);
}

function onSubmitConcept() {
	console.log("come in onSubmitConcept");
	var ohdsi = {
		"ConceptSets" : []
	};

	var ancestor = document.getElementById("concept_form");
	descendents0 = ancestor.childNodes[0];
	descendents = descendents0.childNodes;
	var i, a, div1;
	for (i = 0; i < descendents.length; ++i) {
		// the 'a' tagname, get the concept name
		a = descendents[i];
		var conceptsets = {
			"expression" : {
				"item" : []
			},
			"id" : i / 2,
			"name" : a.value
		};
		// the 'div' of collapse class
		div0 = descendents[++i];
		// the 'div' of well class, the table, the tbody, the tr
		div1 = div0.childNodes[0].childNodes[0].childNodes[0].childNodes;

		// div2 = div1.getElementsByTagName('div');
		var remove = [];
		var j;
		// the first row is heading of table, start from 2nd row
		for (j = 1; j < div1.length; ++j) {
			var div2 = div1[j].childNodes[0].childNodes[0];
			if (!div2.checked) {
				// console.log("deleting "+j+ "'s childnode");
				remove.push(j - 1);
			}
		}
		for (j = remove.length - 1; j >= 0; j--) {
			// console.log("deleting (i-1)/2= "+(i-1)/2+" j= "+j);
			ohdsi_json["ConceptSets"][(i - 1) / 2]["expression"]["items"]
					.splice(remove[j], 1);
		}
	}
	var ohdsi_submit = document.createElement("div");
	ohdsi_submit.className = "well";
	var json_pretty = JSON.stringify(ohdsi_json, null, 2);

	ohdsi_submit.appendChild(document.createTextNode(json_pretty));

	var copy = '<button id="copy_txt" class="btn btn-success btn-block">Click to Copy</button>'
	var prev = '<button class="btn btn-default btn-block" action="" onclick="onChangeConcept()">Previous</button>';

	var ohdsi_form = document.getElementById("ohdsi");
	ohdsi_form.innerHTML = "";
	var ohdsi_div = document.getElementById("transform");
	var textarea = document.createElement("textarea");
	textarea.rows = "20";
	textarea.className = "form-control span6";
	var pre = '<pre id="json_txt">' + json_pretty + '</pre>';
	var title = '<h3>OHDSI json format of eligibility criteria text</h3><p>please copy and paste to <a href="http://www.ohdsi.org/web/atlas/#/cohortdefinition/0" target="_blanket">OHDSI ATLAS</a> platform\'s json text field and generate the cohort for further research.</p>'
	ohdsi_div.insertAdjacentHTML('beforeend', title);
	// ohdsi_div.insertAdjacentHTML('beforeend',copy);
	// textarea.insertAdjacentHTML('beforeend',pre);
	textarea.innerHTML = json_pretty;
	ohdsi_div.appendChild(textarea);
	ohdsi_div.insertAdjacentHTML('beforeend', prev);

}

$(document).ajaxStop($.unblockUI);
var $intable = $('#intable');
var $extable = $('#extable');
var $initialeventtable = $('#initialeventtable');
var basePath = "./";
$(function() {
	$("#startdatepicker").datepicker({
		dateFormat : 'yy-mm-dd'
	});
	$("#enddatepicker").datepicker({
		dateFormat : 'yy-mm-dd'
	});
	$("#total").hide();
	$("#format").click(function() {
		formatdata();
	});
	$("#reset").click(function() {
		$("#abbr").attr("checked", false);
	});

	$("#fbsubmit").click(function() {
		sendFeedback();
	});
	// Cong Liu
	$("#nesubmit").click(function() {
		editTermsInSession();
	});
	$("#fetchct").click(function() {
		if ($("#nctid").val() == '') {
			alert('Please input a nctid!');
			return;
		}
		getCTinfo();
	});
	$('#nctid').bind('keypress', function(event) {
		if (event.keyCode == "13") {
			if ($("#nctid").val() == '') {
				alert('Please input a nctid!');
				return;
			}
			getCTinfo();

		}
	});
	$("#starttoinput").click(function() {
		var t = $(window).scrollTop();
		$('body,html').animate({
			'scrollTop' : t + 450
		}, 200)
	})
	$("#mapping").click(function() {
		mapping();
	});
	$("#downloadfile").click(function() {
		downloadfile();
	});
	$("#start").click(function() {
		parse2();
	});
	$("#auto").click(function() {
		autoparse();
	});
	$("#test").click(function() {
		testsys();
	});
})
function downloadfile() {
	openNewWin(basePath + "ie/download", "download");
}
function openNewWin(url, title) {
	window.open(url);
}
function sendFeedback() {
	var email = $("#fbemail").val();
	var content = $("#fbcontent").val();
	$.ajax({
		type : 'POST',
		url : basePath + "nlpmethod/feedback",
		data : {
			'email' : email,
			'content' : content
		},
		dataType : "json",
		success : function(data) {
			alert('Sent Successful!');
			$("#fbemail").val('');
			$("#fbcontent").val('');
		},
		error : function(data) {
			alert('Sent failed!');
		}
	})
	$('#myModal').modal('hide');
}
function formatdata() {
	var inc = $("#incriteria").val();
	var exc = $("#excriteria").val();
	$.blockUI({
		message : '<h3><img src="' + basePath
				+ '/img/squares.gif" /> Formatting...</h3>',
		css : {
			border : '1px solid khaki'
		}
	});
	$.ajax({
		type : 'POST',
		url : basePath + "nlpmethod/formatdata",
		data : {
			'inc' : inc,
			'exc' : exc
		},
		dataType : "json",
		success : function(data) {
			$("#incriteria").val(data["afterinc"]);
			$("#excriteria").val(data["afterexc"]);
		}
	})
}
function getCTinfo() {
	var nctid = $("#nctid").val();
	$.blockUI({
		message : '<h3><img src="' + basePath
				+ '/img/squares.gif" /> Data Loading...</h3>',
		css : {
			border : '1px solid khaki'
		}
	});
	$.ajax({
		type : 'POST',
		url : basePath + "ie/getct",
		data : {
			'nctid' : nctid
		},
		dataType : "json",
		success : function(data) {
			/* alert("Success!"); */
			$("#incriteria").val(data["inc"]);
			$("#excriteria").val(data["exc"]);

		},
		error : function() {
			$(document).ajaxStop($.unblockUI);
			alert("Please check your NCTID");
		}

	});
}
function autoparse() {
	var inc = $("#incriteria").val();
	var exc = $("#excriteria").val();
	var initialevent = $("#initialevent").val();
	var rule = $("#rule").is(':checked');
	var ml = $("#ml").is(':checked');
	var abb = $("#abbr").is(':checked');
	var recon = $("#recon").is(':checked');
	var obstart = $("#startdatepicker").val();
	var obend = $("#enddatepicker").val();
	var daysbefore = $("#obstart").val();
	var daysafter = $("#obend").val();
	var limitto = $("#limitto").val();
	$.blockUI({
		message : '<h3><img src="' + basePath
				+ '/img/squares.gif" /> Information Extracting...</h3>',
		css : {
			border : '1px solid khaki'
		}
	});
	$.ajax({
		type : 'POST',
		url : basePath + "main/autoparse",
		data : {
			'inc' : inc,
			'exc' : exc,
			'initialevent' : initialevent,
			'rule' : rule,
			'ml' : ml,
			'abb' : abb,
			'recon' : recon,
			'obstart' : obstart,
			'obend' : obend,
			'daysbefore' : daysbefore,
			'daysafter' : daysafter,
			'limitto' : limitto
		},
		dataType : "json",
		timeout : 300000,
		success : function(data) {
			window.location.href = basePath + "main/gojson";
		},
		error : function(e) {
			alert("Oppps....");
		}
	})
}

function testsys() {
	var inc = $("#incriteria").val();
	var exc = $("#excriteria").val();
	var initialevent = $("#initialevent").val();
	var rule = $("#rule").is(':checked');
	var ml = $("#ml").is(':checked');
	var abb = $("#abbr").is(':checked');

	$.blockUI({
		message : '<h3><img src="' + basePath
				+ '/img/squares.gif" /> Information Extracting...</h3>',
		css : {
			border : '1px solid khaki'
		}
	});
	$.ajax({
		type : 'POST',
		url : basePath + "main/testsys",// nlpmethod/parsebycdm
		data : {
			'inc' : inc,
			'exc' : exc,
			'initialevent' : initialevent,
			'rule' : rule,
			'ml' : ml,
			'abb' : abb

		},
		dataType : "json",
		success : function(data) {
			window.location.href = basePath + "main/gojson";
		},
		error : function(e) {
			alert("Oppps....");
		}
	})
}

function parse() {
	var inc = $("#incriteria").val().trim().replace(/^\s+|\s+$/g, '').trim();
	var exc = $("#excriteria").val().trim().replace(/^\s+|\s+$/g, '').trim();
	var initialevent = $("#initialevent").val().trim()
			.replace(/^\s+|\s+$/g, '').trim();
	var rule = $("#rule").is(':checked');
	var ml = $("#ml").is(':checked');
	var abb = $("#abbr").is(':checked');
	var recon = $("#recon").is(':checked');
	var obstart = $("#startdatepicker").val();
	var obend = $("#enddatepicker").val();
	var daysbefore = $("#obstart").val();
	var daysafter = $("#obend").val();
	var limitto = $("#limitto").val();
	$.blockUI({
		message : '<h3><img src="' + basePath
				+ '/img/squares.gif" /> Information Extracting...</h3>',
		css : {
			border : '1px solid khaki'
		}
	});
	$.ajax({
		type : 'POST',
		url : basePath + "ie/parse",// nlpmethod/parsebycdm
		data : {
			'inc' : inc,
			'exc' : exc,
			'initialevent' : initialevent,
			'rule' : rule,
			'ml' : ml,
			'abb' : abb,
			'recon' : recon,
			'obstart' : obstart,
			'obend' : obend,
			'daysbefore' : daysbefore,
			'daysafter' : daysafter,
			'limitto' : limitto
		},
		dataType : "json",
		success : function(data) {
			$('#initialeventtable').bootstrapTable('destroy');
			$('#initialeventtable').bootstrapTable({
				data : data["initial_event"],
				columns : [ {
					field : 'id',
					title : '#',
					width : '5%'
				}, {
					field : 'criterion',
					width : '70%',
					title : 'Initial Events:'
				}, {
					field : 'ehrstatus',
					width : '5%',
					title : 'EHR Status',
					formatter : function(value, row, index) {
						if (value == true) {
							return "<label style=\"color:green\">YES</label>";
						} else {
							return "<label style=\"color:red\">NO</label>";
						}
					}
				}, ]
			});
			$('#intable').bootstrapTable('destroy');
			$('#intable').bootstrapTable({
				data : data["include"],
				columns : [ {
					field : 'id',
					title : '#',
					width : '5%'
				}, {
					field : 'criterion',
					width : '70%',
					title : 'Inclusion Criteria:'
				}, {
					field : 'ehrstatus',
					width : '5%',
					title : 'EHR Status',
					formatter : function(value, row, index) {
						if (value == true) {
							return "<label style=\"color:green\">YES</label>";
						} else {
							return "<label style=\"color:red\">NO</label>";
						}
					}
				}, ]
			});
			$('#extable').bootstrapTable('destroy');
			$('#extable').bootstrapTable({
				data : data["exclude"],
				columns : [ {
					field : 'id',
					title : '#',
					width : '5%'
				}, {
					field : 'criterion',
					width : '70%',
					title : 'Exclusion Criteria:'
				}, {
					field : 'ehrstatus',
					width : '5%',
					title : 'EHR Status',
					formatter : function(value, row, index) {
						if (value == true) {
							return "<label style=\"color:green\">YES</label>";
						} else {
							return "<label style=\"color:red\">NO</label>";
						}
					}
				}, ]
			});
			var t = $(window).scrollTop();
			$('body,html').animate({
				'scrollTop' : t + 1000
			}, 200)
			$("#mapping").show();
			$("#downloadfile").show();
		},
		error : function(e) {
			alert('Parsing Error...');
		}
	});
}

function mapping() {
	window.location.href = basePath + "nlpmethod/conceptset";
}

// Cong Liu
function parse2() {
	var inc = $("#incriteria").val().trim().replace(/^\s+|\s+$/g, '').trim();
	var exc = $("#excriteria").val().trim().replace(/^\s+|\s+$/g, '').trim();
	var initialevent = $("#initialevent").val().trim()
			.replace(/^\s+|\s+$/g, '').trim();
	var rule = $("#rule").is(':checked');
	var ml = $("#ml").is(':checked');
	var abb = $("#abbr").is(':checked');
	var recon = $("#recon").is(':checked');
	var obstart = $("#startdatepicker").val();
	var obend = $("#enddatepicker").val();
	var daysbefore = $("#obstart").val();
	var daysafter = $("#obend").val();
	var limitto = $("#limitto").val();
	$.blockUI({
		message : '<h3><img src="' + basePath
				+ '/img/squares.gif" /> Information Extracting...</h3>',
		css : {
			border : '1px solid khaki'
		}
	});
	$.ajax({
		type : 'POST',
		url : basePath + "ie/parse2",// nlpmethod/parsebycdm
		data : {
			'inc' : inc,
			'exc' : exc,
			'initialevent' : initialevent,
			'rule' : rule,
			'ml' : ml,
			'abb' : abb,
			'recon' : recon,
			'obstart' : obstart,
			'obend' : obend,
			'daysbefore' : daysbefore,
			'daysafter' : daysafter,
			'limitto' : limitto
		},
		dataType : "json",
		success : function(data) {
			refresh_table(data);

			var t = $(window).scrollTop();
			$('body,html').animate({
				'scrollTop' : t + 1000
			}, 200)
			$("#mapping").show();
			$("#downloadfile").show();
		},
		error : function(e) {
			alert('Parsing Error...');
		}
	});
}

function refresh_table(data) {
	console.log(data)
	$('#extable').bootstrapTable('destroy');
	$('#extable').bootstrapTable({
		columns : [ {
			field : 'id',
			title : '#',
			width : '5%'
		}, {
			field : 'criterion',
			width : '70%',
			title : 'Exclusion Criteria:'
		}, {
			field : 'ehrstatus',
			width : '5%',
			title : 'EHR Status',
			formatter : function(value, row, index) {
				if (value == true) {
					return "<label style=\"color:green\">YES</label>";
				} else {
					return "<label style=\"color:red\">NO</label>";
				}
			}
		} ]
	});
	var json = data['json'];
	var exclusion_criteria = json['exclusion_criteria'];
	var i = 0;
	for ( var key in exclusion_criteria) {
		var sents = exclusion_criteria[key]["sents"];
		for ( var key2 in sents) {
			var sent = sents[key2];
			text = sent['text'];
			i++;
			$('#extable').bootstrapTable('insertRow', {
				index : i,
				row : {
					id : i,
					criterion : text,
					ehrstatus : true
				}
			});
		}
	}

	// there is a bug while bootstrapTable insert rows.
	// It will clean the html.
	// therefore, insert raw text first, and highlight then.
	var i = 0;
	for ( var row_id in exclusion_criteria) {
		var sents = exclusion_criteria[row_id]["sents"];
		for ( var sent_id in sents) {
			i++;
			var sent = sents[sent_id];
			var terms = sent['terms'];
			var rangeArray = [];

			for ( var term_id in terms) {
				var term = terms[term_id];
				var start_index = term['start_index'];
				var end_index = term['end_index'];
				rangeArray.push({
					start : start_index,
					length : end_index - start_index
				});
			}
			var context = $("#extable")[0].rows[i].cells[1];
			var instance = new Mark(context);
			var options = {
				"element" : "mark",
				"className" : "",
				"exclude" : [],
				"iframes" : true,
				"iframesTimeout" : 5000,
				"each" : function(node, range) {
					// node is the marked DOM element
					// range is the corresponding range
					processEachTag(node, range, terms, 'exclusion_criteria',
							row_id, sent_id);
				},
				"filter" : function(textNode, range, term, counter) {
					// textNode is the text node which contains the
					// found term
					// range is the found range
					// term is the extracted term from the matching
					// range
					// counter is a counter indicating the number of
					// marks for the found
					// term
					return true; // must return either true or
					// false
				},
				"noMatch" : function(range) {
					// the not found range
				},
				"done" : function(counter) {
					// counter is a counter indicating the total
					// number of all marks
				},
				"debug" : false,
				"log" : window.console
			};
			instance.markRanges(rangeArray, options);
			highlightMouseSelected(i, 'exclusion_criteria', row_id, sent_id);

		}
	}
}

function processEachTag(node, range, terms, in_or_ex, row_id, sent_id) {
	for ( var term_id in terms) {
		if (terms.hasOwnProperty(term_id)) {
			// here you have access to
			var start = terms[term_id].start_index;
			var length = terms[term_id].end_index - terms[term_id].start_index;
			var categorey = terms[term_id].categorey.toLowerCase();

			if (start == range.start && length == range.length) {
				$(node).attr('data-entity', categorey)
				$(node).attr('in_or_ex', in_or_ex)
				$(node).attr('row_id', row_id)
				$(node).attr('sent_id', sent_id)
				$(node).attr('term_id', term_id)

				$(node).on('dblclick', function(e) {
					$('#nesubmit').attr('in_or_ex', $(this).attr('in_or_ex'));
					$('#nesubmit').attr('row_id', $(this).attr('row_id'));
					$('#nesubmit').attr('sent_id', $(this).attr('sent_id'));
					$('#nesubmit').attr('term_id', $(this).attr('term_id'));
					$('#nodeEditModal').modal('show');
				});
			}
		}
	}
}

var keys = {};
window.onkeydown = function(e) {
	keys[e.keyCode] = true;
}
window.onkeyup = function(e) {
	keys[e.keyCode] = false;
}
function highlightMouseSelected(i, in_or_ex, row_id, sent_id) {
	if (in_or_ex == 'exclusion_criteria') {
		var context = $("#extable")[0].rows[i].cells[1];
	}

	$(context).bind(
			'mouseup',
			function(e) {
				if (keys[81]) {
					// Press Q
					if (typeof window.getSelection != "undefined") {
						sel = window.getSelection();
						text = sel + '';
						// if (text.length < 5) {
						// return;
						// }
					} else if (typeof document.selection != "undefined"
							&& (sel = document.selection).type != "Control") {
						text = sel + '';
						if (text.length < 5) {
							return;
						}
					}
					var start = 0;
					var end = 0;
					var sel, range, priorRange, text;

					if (typeof window.getSelection != "undefined") {
						sel = window.getSelection();
						text = sel + '';
						range = window.getSelection().getRangeAt(0);
						ref = document.getElementById("parsingResults")
						priorRange = range.cloneRange();
						priorRange.selectNodeContents(context);
						priorRange.setEnd(range.startContainer,
								range.startOffset);
						start = priorRange.toString().length;
						end = start + (sel + '').length - 1;

					} else if (typeof document.selection != "undefined"
							&& (sel = document.selection).type != "Control") {
						text = sel + '';
						range = sel.createRange();
						priorRange = document.body.createTextRange();
						priorRange.moveToElementText(context);
						priorRange.setEndPoint("EndToStart", range);
						start = priorRange.text.length;
						end = start + (sel + '').length - 1;

					}
					length = end - start + 1;
					addTermsInSessionWithHighlight(start, end + 1, in_or_ex,
							row_id, sent_id);
				}

			});
}

function addTermsInSessionWithHighlight(start, end, in_or_ex, row_id, sent_id) {
	alert('addTerm');
	$.blockUI({
		message : '<h3><img src="' + basePath
				+ '/img/squares.gif" /> Update Session...</h3>',
		css : {
			border : '1px solid khaki'
		}
	});
	$.ajax({
		type : 'POST',
		url : basePath + "session/get_current",
		dataType : "json",
		success : function(data) {
			alert('Get current session successful!');
			var json = data["json"];
			// alert('Add term in session');
			// alert("start is" + start);
			// alert("end is " + end);
			// alert("in_or_ex: " + in_or_ex);
			// alert("row_id: " + row_id);
			// alert("sent_id: " + sent_id);
			console.log("===first json");
			console.log(json);
			json = JSON.parse(JSON.stringify(json));
			var max_term_id = 0;
			var terms = json[in_or_ex][parseInt(row_id)]['sents'][parseInt(sent_id)]['terms'];
			for (term in terms) {
				if(terms[term]['termId'] > max_term_id){
					max_term_id = terms[term]['termId']
				}
			}
			var new_text = json[in_or_ex][parseInt(row_id)]['sents'][parseInt(sent_id)]["text"].substring(start, end);
					
			var new_term = {
				"categorey" : "Condition",
				"end_index" : end,
				"neg" : false,
				"start_index" : start,
				"termId" : max_term_id + 1,
				"relations": null,
				"vocabularyId": null,
				"text" : new_text
			};
			json[in_or_ex][parseInt(row_id)]['sents'][parseInt(sent_id)]['terms'].push(new_term);
			console.log("===new json");
			console.log(json);
			$.ajax({
				headers : {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				data : JSON.stringify(json),
				type: 'POST',
				url: basePath + 'session/set_current',
				dataType: "json",
				success : function(data) {
					refresh_table(data);

					var t = $(window).scrollTop();
					$('body,html').animate({
						'scrollTop' : t + 1000
					}, 200)
					$("#mapping").show();
					$("#downloadfile").show();
				},
				error : function(e) {
					alert('Parsing Error...');
				}
			})
		},
		error : function(data) {
			alert('Get current session failed!');
		}
	})
}

function editTermsInSession() {
	var in_or_ex = $('#nesubmit').attr("in_or_ex");
	var row_id = $('#nesubmit').attr("row_id");
	var sent_id = $('#nesubmit').attr("sent_id");
	var term_id = $('#nesubmit').attr("term_id");
	var option = $('#nodeEditOption').val();

	// <option value='1'>Delete the term</option>
	// <option value='2'>Change the domain to demographic</option>
	// <option value='3'>Change the domain to condition</option>
	// <option value='4'>Change the domain to observation</option>
	// <option value='5'>Change the domain to procedure</option>
	// <option value='6'>Change the domain to measurement</option>
	// <option value='7'>Change the domain to drug</option>
	// <option value='8'>Change the domain to device</option>
	// <option value='9'>Change the modifier to value</option>
	// <option value='10'>Change the modifier to temporal</option>
	// <option value='11'>Change the modifier to negation_cue</option>
	//	
	if (option == '1') {
		// ajax to be implemented.
		alert('deleteTerm');
		$.blockUI({
			message : '<h3><img src="' + basePath
					+ '/img/squares.gif" /> Update Session...</h3>',
			css : {
				border : '1px solid khaki'
			}
		});
		$.ajax({
			type : 'POST',
			url : basePath + "session/get_current",
			dataType : "json",
			success : function(data) {
				alert('Get current session successful!');
				var json = data["json"];
//				alert('delete term in session');
//				alert("in_or_ex: " + in_or_ex);
//				alert("row_id: " + row_id);
//				alert("sent_id: " + sent_id);
//				alert("term_id: " + term_id);
				console.log("===first json");
				console.log(json);
				json = JSON.parse(JSON.stringify(json));
				json[in_or_ex][parseInt(row_id)]['sents'][parseInt(sent_id)]['terms'].splice(term_id,1);
				console.log("===new json");
				console.log(json);
				$.ajax({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					data : JSON.stringify(json),
					type: 'POST',
					url: basePath + 'session/set_current',
					dataType: "json",
					success : function(data) {
						refresh_table(data);

						var t = $(window).scrollTop();
						$('body,html').animate({
							'scrollTop' : t + 1000
						}, 200)
						$("#mapping").show();
						$("#downloadfile").show();
						$('#nodeEditModal').modal('hide');
					},
					error : function(e) {
						alert('Parsing Error...');
					}
				})
			},
			error : function(data) {
				alert('Get current session failed!');
			}
		})
	} else {
		if (option == '2') {
			var category = "demographic";
		}
		if (option == '3') {
			var category = "condition";

		}
		if (option == '4') {
			var category = "observation";

		}
		if (option == '5') {
			var category = "procedure";

		}
		if (option == '6') {
			var category = "measurement";

		}
		if (option == '7') {
			var category = "drug";

		}
		if (option == '8') {
			var category = "device";

		}
		if (option == '9') {
			var category = "value";

		}
		if (option == '10') {
			var category = "temporal";

		}
		if (option == '10') {
			var category = "negation_cue";

		}
		
		// ajax to be implemented.
		alert('change Category');
		$.blockUI({
			message : '<h3><img src="' + basePath
					+ '/img/squares.gif" /> Update Session...</h3>',
			css : {
				border : '1px solid khaki'
			}
		});
		$.ajax({
			type : 'POST',
			url : basePath + "session/get_current",
			dataType : "json",
			success : function(data) {
				alert('Get current session successful!');
				var json = data["json"];
//				alert("in_or_ex: " + in_or_ex);
//				alert("row_id: " + row_id);
//				alert("sent_id: " + sent_id);
//				alert("term_id: " + term_id);
//				alert("categroy: " + category);
				console.log("===first json");
				console.log(json);
				json = JSON.parse(JSON.stringify(json));
				json[in_or_ex][parseInt(row_id)]['sents'][parseInt(sent_id)]['terms'][term_id]['categorey'] = category;
				console.log("===new json");
				console.log(json);
				$.ajax({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					data : JSON.stringify(json),
					type: 'POST',
					url: basePath + 'session/set_current',
					dataType: "json",
					success : function(data) {
						refresh_table(data);

						var t = $(window).scrollTop();
						$('body,html').animate({
							'scrollTop' : t + 1000
						}, 200)
						$("#mapping").show();
						$("#downloadfile").show();
						$('#nodeEditModal').modal('hide');
					},
					error : function(e) {
						alert('Parsing Error...');
					}
				})
			},
			error : function(data) {
				alert('Get current session failed!');
			}
		})
	}
}
