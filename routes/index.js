
/*
 * GET home page.
 */


var mysql = require('mysql');
var cfg = {
		  host     : '10.30.36.166',
		  user     : 'root',
		  password : 'boll64mAuL!@X1',
		  insecureAuth: true
		};

var redis = require("redis");
var cfg2 = {
		host : "10.30.36.166",
		port : 6379,
		prefix: "KP_201307031900"
};

exports.index = function(req, res){
  res.render('index', {title: 'Express', action: ''});
};

exports.action1 = function(req, res) {
	var rows   = [];
		
	var connection = mysql.createConnection(cfg);
	var query = connection.query("select count(*) c, (case f_value when 798000501 then '榜单正版' when 798000101 then '官网' when 798000303 then '91积金' when 798000411 then '91越狱' when 798000412 then '同步推越狱' when 798000601 then '91联运' when 798000602 then 'UC联运' when 798000603 then 'PP助手联运' when 798000604 then '同步助手联运' when 798000413 then '越狱备用' else f_value end) n, f_value f from games_kp.user_account_info group by f_value");
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action1', data: rows});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

exports.action2 = function(req, res) {
	var date = new Date(req.params.year, req.params.month - 1, req.params.day);
	var pages = getPages(date);
	console.log(pages);
	
	var rows   = [];
	
	var connection = mysql.createConnection(cfg);
	var query = connection.query("select count(*) c, (case f_value when 798000501 then '榜单正版' when 798000101 then '官网' when 798000303 then '91积金' when 798000411 then '91越狱' when 798000412 then '同步推越狱' when 798000601 then '91联运' when 798000602 then 'UC联运' when 798000603 then 'PP助手联运' when 798000604 then '同步助手联运' when 798000413 then '越狱备用' else f_value end) n, f_value f from games_kp.user_account_info where date(create_time)=? group by f_value", [req.params.year + "-" + req.params.month + "-" + req.params.day]);
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action2', data: rows, dt: pages});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

exports.action3 = function(req, res) {
	var rurl = req.url.split("/");
	var date = new Date(rurl[2], rurl[3] - 1, rurl[4]);
	var pages = getPages(date);
	console.log(pages);
	
	var rows   = [];
	var connection = mysql.createConnection(cfg);
	var query = connection.query("select char_id, char_name, add_gem, param, reason_name, t1.log_time log_time from lyz_log.gem_log_" + rurl[2] + "_" + rurl[3] + "_" + rurl[4] + " t1, games_kp.reason_list t2 where t1.reason=t2.reason and t1.reason in (5002,5028,5029,5030) order by log_time desc");
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action3', data: rows, dt: pages});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

exports.action4 = function(req, res) {
	var rows   = [];
	
	var connection = mysql.createConnection(cfg);
	var query = connection.query("SELECT map_chapter_id cid, COUNT(user_id) c FROM games_kp.user_map_chapter GROUP BY map_chapter_id");
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action4', data: rows});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

exports.action5 = function(req, res) {
	var rows   = [];
	
	var connection = mysql.createConnection(cfg);
	var dt = new Date().toISOString().substring(0, 10).replace(/-/g, "_");
	var query = connection.query("SELECT countAAA tc, COUNT(char_id) pc FROM (SELECT char_id,COUNT(*) AS countAAA FROM lyz_log.money_log_" + dt + " WHERE reason = 4005 GROUP BY char_id) AS table_temp1 GROUP BY countAAA");
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action5', data: rows});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

exports.action6 = function(req, res) {
	var rurl = req.url.split("/");
	var date = new Date(rurl[2], rurl[3] - 1, rurl[4]);
	var pages = getPages(date);
	console.log(pages);
	
	var rows   = [];
	
	var connection = mysql.createConnection(cfg);
	var query = connection.query("select t1.char_id, t1.char_name, t1.add_gem, t1.log_time, t2.reason_name from lyz_log.gem_log_" + rurl[2] + "_" + rurl[3] + "_" + rurl[4] + " t1, games_kp.reason_list t2 where t1.reason=t2.reason and t1.reason in (5005,5010) order by t1.log_time desc");
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action6', data: rows, dt: pages});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

exports.action7 = function(req, res) {
	var rows   = [];
	
	var connection = mysql.createConnection(cfg);
	var query = connection.query("select t.user_id, t2.name, t.recharge_gem from games_kp.rec_user_info t, games_kp.user_info t2 where t.user_id=t2.user_id and t.recharge_gem > 0 order by t.recharge_gem desc;");
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action7', data: rows});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

exports.action8 = function(req, res) {
	var rows   = [];
	
	var client = redis.createClient(cfg2.port, cfg2.host, {});
	client.zrevrangebyscore(cfg2.prefix + ":arena_rank:2:4:0", "+inf", "-inf", "withscores", function(err, reply) {
	    // reply is null when the key is missing
		rows = reply;
	});
	client
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action8', data: rows});
	  });
	client.quit(function (err, res) {
	    console.log("Exiting from quit command.");
	});
};

exports.action9 = function(req, res) {
	var rows   = [];
	
	var client = redis.createClient(cfg2.port, cfg2.host, {});
	client.zrevrangebyscore(cfg2.prefix + ":arena_rank:2:4:0", "+inf", "-inf", "withscores", function(err, reply) {
	    // reply is null when the key is missing
		rows = reply;
		
		var keys = [];
		for (var i = 0; i < reply.length / 2; i++) {
			keys.push(cfg2.prefix + ":basic_user_info:" + reply[i * 2]);
		}
		
	});
	client
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action9', data: rows});
	  });
	client.quit(function (err, res) {
	    console.log("Exiting from quit command.");
	});
};

exports.action10 = function(req, res) {
	var date = new Date(req.params.year, req.params.month - 1, req.params.day);
	var pages = getPages(date);
	console.log(pages);
	
	var rows   = [];
	
	var connection = mysql.createConnection(cfg);
	var query = connection.query("select t1.user_id, t1.name, t1.create_time, t2.add_gem, t3.reason_name, t2.log_time from games_kp.user_info t1, lyz_log.gem_log_" + req.params.year + "_" + req.params.month + "_" + req.params.day + " t2, games_kp.reason_list t3 where t1.user_id=t2.char_id and t2.reason=t3.reason and t2.reason in (5002,5028,5029,5030) and date(create_time)=? order by t2.log_time desc", [req.params.year + "-" + req.params.month + "-" + req.params.day]);
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action10', data: rows, dt: pages});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

exports.action11 = function(req, res) {
	var activityID = req.params.activityID;
	
	var data = {}, keys = {};
	var client = redis.createClient(cfg2.port, cfg2.host, {});
	client.zrevrangebyscore(activityID, "+inf", "-inf", "withscores", function(err, reply) {
	    // reply is null when the key is missing
		data = reply;
		
	});
	client.keys(cfg2.prefix + ":map_activity_rank_key:*", function(err, reply) {
	    // reply is null when the key is missing
		keys = reply;
		
	});
	client
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(data);
		  console.log(keys);
		  res.render('index', {title: 'Express', action: 'action11', keys: keys.sort(), data: data, req: req});
	  });
	client.quit(function (err, res) {
	    console.log("Exiting from quit command.");
	});
};

exports.action12 = function(req, res) {
	var date = new Date(req.params.year, req.params.month - 1, req.params.day);
	var pages = getPages(date);
	console.log(pages);
	
	var rows   = [];
	
	var connection = mysql.createConnection(cfg);
	var query = connection.query("select sum(add_gem) g, t2.reason_name n from lyz_log.gem_log_" + req.params.year + "_" + req.params.month + "_" + req.params.day + " t1, games_kp.reason_list t2 where t1.reason=t2.reason group by t1.reason;");
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
		  console.log(err);
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    connection.pause();

	    setTimeout(function() {
	        connection.resume();

	        rows.push(row);
	     }, 10);
	  })
	  .on('end', function() {
	    // all rows have been received
		  console.log(rows);
		  res.render('index', {title: 'Express', action: 'action12', data: rows, dt: pages});
	  });
	connection.end(function(err) {
		connection.destroy();
	});
};

function getPages(date) {
	date.setHours(9);
	
	  var ret = {
	    pre: getDate(date, 3),
	    pages: [],
	    next: getDate(date, -3),
	    ct: getDate(date, 0)
	  };

	  ret.pages.push(getDate(date, 1));
      ret.pages.push(getDate(date, 0));
      ret.pages.push(getDate(date, -1));

	  return ret;
	}

	function getDate(d, day) {
	  var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9);
	  date.setDate(d.getDate() + day);
	  var da = date.toISOString().substring(0, 10).split("-");
	  return {
	    y: da[0],
	    m: da[1],
	    d: da[2]
	  };
	}