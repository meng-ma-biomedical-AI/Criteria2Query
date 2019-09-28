<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>

<head>
<meta charset="utf-8">
<title>Criteria2Query</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="keywords" content="Clinical trial,NLP">
<meta name="author"
	content="Chi Yuan, Patrick Ryan, Yixuan Guo, Chunhua Weng">
<meta name="robots" content="index,follow">

<!-- Site CSS -->
<!--  <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"> -->
<link href="./css/bootstrap.min.css" rel="stylesheet">
<link href="./css/font-awesome.min.css" rel="stylesheet">
<link href="./css/site.min.css?v5" rel="stylesheet">
<style>
.job-hot {
	position: absolute;
	color: #d9534f;
	right: 0;
	top: 15px;
}

.foot-wrap {
	background-color: #f5f5f5;
}

.eliback {
	color: white;
	background-color: #1E90FF;
	position: relative;
}

.navback {
	background-color: #428bca;
	color: white;
}

.gradient {
	background: #428bca;
	background: -moz-linear-gradient(top, #428bca 0%, #4169E1 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #428bca),
		color-stop(100%, #4169E1));
	background: -webkit-linear-gradient(top, #428bca 0%, #4169E1 100%);
	background: -o-linear-gradient(top, #428bca 0%, #4169E1 100%);
	background: -ms-linear-gradient(top, #428bca 0%, #4169E1 100%);
	background: linear-gradient(to bottom, #428bca 0%, #4169E1 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#428bca',
		endColorstr='#4169E1', GradientType=0);
}

.modal-backdrop {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 0;
	background-color: #000;
}
</style>

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<!-- Custom styles for this template -->
<link href="./css/dashboard.css" rel="stylesheet">
<link href="./css/ner.css" rel="stylesheet">
<link href="./css/font-awesome.min.css" rel="stylesheet">
<link href="./css/site.min.css?v5" rel="stylesheet">
<link rel="stylesheet" href="./css/bootstrap-table.min.css">
<link rel="stylesheet"
	href="//apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery-ui.min.css">
<script src="//apps.bdimg.com/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="//apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="./js/ie-emulation-modes-warning.js"></script>
<!-- <script src="./js/jquery.min.js"></script> -->
<script src="./js/bootstrap.min.js"></script>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="./js/ie10-viewport-bug-workaround.js"></script>
<script src="./js/bootstrap-table.min.js"></script>
<script type="text/javascript" src="./js/jquery.blockUI.js"></script>
<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.es6.min.js"></script>
<style>
a {
	TEXT-DECORATION: none
}
</style>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async
	src="https://www.googletagmanager.com/gtag/js?id=UA-118282453-1"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag('js', new Date());
	gtag('config', 'UA-118282453-1');
</script>
</head>
<body>

	<div class="navbar navbar-inverse navbar-fixed-top navback">
		<div class="container">
			<div class="navbar-header">
				<a class="navbar-brand hidden-sm" href="./" style="color: white"
					onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'navbar-mainpage'])">Criteria2Query</a>
			</div>
			<div class="navbar-collapse collapse" role="navigation">
				<ul class="nav navbar-nav">

				</ul>
				<ul class="nav navbar-nav navbar-right hidden-sm">
					<li><a style="color: white" data-toggle="modal"
						data-target="#myModal">Support</a></li>
				</ul>
			</div>
		</div>
	</div>

	<div class="gradient masthead">
		<div class="container">
			<h1 style="font-size: 300%">Criteria2Query</h1>
			<h3>A system for automatically transforming clinical research
				eligibility criteria to OMOP Common Data Model-based executable
				cohort queries.</h3>
			<p class="masthead-button-links">
				<a class="btn btn-lg btn-success" id="starttoinput" target="_blank"
					role="button">&nbsp;&nbsp;Start&nbsp;&nbsp;</a> <a
					class="btn btn-lg btn-info" id="feedback" data-toggle="modal"
					data-target="#myModal" role="button">&nbsp;&nbsp;FeedBack&nbsp;&nbsp;</a>
			</p>
		</div>
	</div>


	<div class="container projects">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">Comments &
							Suggestions</h4>
					</div>
					<div class="modal-body">
						<form role="form" name="form1" id="myForm" class="form-horizontal"
							action="">
							<fieldset>
								<div class="form-group">
									<label class="col-sm-2 control-label">Email</label>
									<div class="col-sm-4">
										<input type="text" class="form-control col-sm-4" id="fbemail"
											name="newconceptname" placeholder="">
									</div>

								</div>
								<div class="form-group">
									<label for="IDCard" class="col-sm-2 control-label">FeedBack</label>
									<div class="col-sm-10">
										<textarea id="fbcontent" class="form-control" rows="12" id=""
											name="">
							</textarea>
									</div>
								</div>
						</form>
						</fieldset>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button id="fbsubmit" type="button" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="nodeEditModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="nodeEditModal">Edit Tag
					</div>
					<div class="modal-body">
						<form role="form" name="form1" id="myForm" class="form-horizontal"
							action="">
							<fieldset>
								<div class="form-group">
									<label class="col-sm-2 control-label">I want to</label>
									<div class="col-sm-4">
										<select class="form-control" id="nodeEditOption">
											<option value='1'>Delete the term</option>
											<option value='2'>Change the domain to demographic</option>
											<option value='3'>Change the domain to condition</option>
											<option value='4'>Change the domain to observation</option>
											<option value='5'>Change the domain to procedure</option>
											<option value='6'>Change the domain to measurement</option>
											<option value='7'>Change the domain to drug</option>
											<option value='8'>Change the domain to device</option>
											<option value='9'>Change the modifier to value</option>
											<option value='10'>Change the modifier to temporal</option>
											<option value='11'>Change the modifier to negation_cue</option>


										</select>
									</div>

								</div>

							</fieldset>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button id="nesubmit" type="button" class="btn btn-primary"
							key0="" key1="" key2="" key3="">Submit</button>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="projects-header"></div>

			<div class="col-sm-12 col-md-12 col-lg-12">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#collapseNCT"><span
								class="glyphicon glyphicon-download-alt"></span> Criteria
								Resource </a>
						</h4>
					</div>
					<div id="collapseNCT" class="panel-collapse collapse in">
						<div class="panel-body">
							<div class="form-group col-sm-12 col-md-12 col-lg-12">
								<form class="form-inline">
									<div class="form-group">
										<label>Please input a NCTID :</label> <input class="input-sm"
											type="text" id="nctid" name="nctid"
											placeholder="e.g., NCT01640873"> <a
											class="btn btn-primary" id="fetchct" role="button">Fetch</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-12">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#collapseOne"><span
								class="glyphicon glyphicon-dashboard"></span> Cohort Entry
								Events (Optional) </a>
						</h4>
					</div>
					<div id="collapseOne" class="panel-collapse collapse in">
						<div class="panel-body">
							<div class="form-group">
								<span class="help-block"><strong>Initial event
										cohort:</strong> Events are recorded time-stamped observations for the
									persons, such as drug exposures, conditions, procedures,
									measurements and visits. All events have a start date and end
									date, though some events may have a start date and end date
									with the same value (such as procedures or measurements). The
									event index date is set to be equal to the event start date.</span>
								<textarea class="form-control" rows="5" id="initialevent"></textarea>
							</div>
							<div class="form-group">
								<span>restrict observation duration from</span> <input
									class="input-sm" type="text" id="startdatepicker"> <span>to</span>
								<input class="input-sm" type="text" id="enddatepicker">
							</div>
							<div class="form-group">
								<span>with continuous observation of at least</span> <select
									name="obstart" id="obstart">
									<option value="0">0</option>
									<option value="1">1</option>
									<option value="7">7</option>
									<option value="14">14</option>
									<option value="21">21</option>
									<option value="30">30</option>
									<option value="60">60</option>
									<option value="90">90</option>
									<option value="120">120</option>
									<option value="180">180</option>
									<option value="365">365</option>
									<option value="548">548</option>
									<option value="730">730</option>
									<option value="1095">1095</option>
								</select> <span>days before and </span> <select name="obend" id="obend">
									<option value="0">0</option>
									<option value="1">1</option>
									<option value="7">7</option>
									<option value="14">14</option>
									<option value="21">21</option>
									<option value="30">30</option>
									<option value="60">60</option>
									<option value="90">90</option>
									<option value="120">120</option>
									<option value="180">180</option>
									<option value="365">365</option>
									<option value="548">548</option>
									<option value="730">730</option>
									<option value="1095">1095</option>
								</select> <span>days after event index date </span>
							</div>
							<div class="form-group">
								<span>Limit initial events to:</span> <select name="limitto"
									id="limitto">
									<option value="All">all events</option>
									<option value="First">earliest event</option>
									<option value="Last">latest event</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#collapseTwo"><span class="glyphicon glyphicon-ok"></span>
								Inclusion Criteria </a>
						</h4>
					</div>
					<div id="collapseTwo" class="panel-collapse collapse in">
						<div class="panel-body">
							<div class="form-group">
								<span class="help-block">Tips: Please input criteria line
									by line</span>
								<textarea class="form-control" rows="12" id="incriteria"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#collapseThree"><span
								class="glyphicon glyphicon-remove"></span> Exclusion Criteria </a>
						</h4>
					</div>
					<div id="collapseThree" class="panel-collapse collapse in">
						<div class="panel-body">
							<div class="form-group">
								<span class="help-block">Tips: Please input criteria line
									by line</span>
								<textarea class="form-control" rows="12" id="excriteria"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-12">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#collapseConfig" aria-expanded="false" class="collapsed"><span
								class="glyphicon glyphicon-cog"></span> Configuration </a>
						</h4>
					</div>
					<div id="collapseConfig" class="panel-collapse collapse"
						aria-expanded="false" style="height: 0px;">
						<div class="panel-body">
							<div class="form-group col-sm-12 col-md-12 col-lg-12">
								<form class="form-inline">
									<div class="form-group col-sm-4 col-md-4 col-lg-4">
										<div class="checkbox">
											<label> <input id="ml" type="checkbox" checked
												disabled> Machine Learning-based Model (CRF model)
											</label>
										</div>
									</div>
									<div class="form-group col-sm-4 col-md-4 col-lg-4">
										<div class="checkbox">
											<label> <input id="rule" type="checkbox" checked
												disabled> Rule-based Model (OHDSI Usagi)
											</label>
										</div>
									</div>
									<div class="form-group col-sm-4 col-md-4 col-lg-4">
										<div class="checkbox">
											<label> <input id="abbr" type="checkbox" checked>
												Abbreviation Extension (UMLS)
											</label>
										</div>
									</div>
								</form>
							</div>
							<div class="form-group col-sm-12 col-md-12 col-lg-12">
								<form class="form-inline">
									<div class="form-group col-sm-4 col-md-4 col-lg-4">
										<div class="checkbox">
											<label> <input id="recon" type="checkbox">
												Coordination Ellipsis Reconstruction
											</label>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-12">
				<p class="masthead-button-links">
					<a class="btn btn-success" id="start" target="_blank" role="button">&nbsp;&nbsp;Parse&nbsp;&nbsp;</a>
					<a class="btn btn-info" id="reset" role="button">&nbsp;&nbsp;&nbsp;Reset&nbsp;&nbsp;&nbsp;</a>
					<a class="btn btn-warning" id="auto" role="button">&nbsp;&nbsp;Generate
						Query&nbsp;&nbsp;</a>
				</p>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-12">
				<table id="initialeventtable"
					class="table table-bordered col-sm-12 col-md-12 col-lg-12">
				</table>
				<table id="intable"
					class="table table-bordered col-sm-12 col-md-12 col-lg-12">
				</table>
				<table id="extable"
					class="table table-bordered col-sm-12 col-md-12 col-lg-12">
				</table>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-12">
				<p class="masthead-button-links">
					<a class="btn btn-primary" id="mapping" style="display: none"
						role="button">&nbsp;&nbsp;Next&nbsp;&nbsp;</a> <a
						class="btn btn-success" id="downloadfile" style="display: none"
						role="button">&nbsp;&nbsp;Download&nbsp;&nbsp;</a>
				</p>
			</div>
		</div>
	</div>

	<!-- /.container -->
	<footer class="footer foot-wrap">
	<div class="container">
		<div class="row footer-top">
			<div class="col-sm-6 col-lg-6">
				<p>
					<strong>Criteria2query v0.8.5.1</strong>
				</p>
				<p>This website was developed by Chi Yuan,Patrick Ryan, Yixuan
					Guo, Chunhua Weng</p>
			</div>
		</div>
	</div>
	</footer>

	<script type="text/javascript" src="./js/script.js"></script>

</body>


</html>
