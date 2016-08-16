$(document).ready(function() {
	var w = document.documentElement.clientWidth;
	$("html").css({
		fontSize: w / 7.19
	});
})


// document.addEventListener("plusready",function(){

$(function() {

	function User() {};

	User.prototype = {
		checkUser: function(ob) {
			return $.get('/checkUser', ob).then(function(data) {
				return data;
			});
		},
		addUser: function() {
			return $.get('/addUser').then(function(data) {
				return data;
			})
		},
		deleteUserById: function(id) {
			return $.get('/deleteUserById', {
				uid: id
			}).then(function(data) {
				return data;
			})
		},
		updateUserById: function(data) {
			return $.get('/updateUserById', {
				uid: data.uid,
				uname: data.uname,
				phone: data.phone,
				tel: data.tel,
			}).then(function(data) {
				return data;
			})
		},
		getAllUser: function() {
			return $.get('/getAllUser').then(function(data) {
				return data;
			}, 'json');
		},
		getUserById: function(id) {
			return $.get('/getUserById', {
				uid: id
			}).then(function(data) {
				return data;
			}, 'json');
		},
		getAuthById: function(id) {
			return $.get('/getAuthById', {
				uid: id
			}).done(function(data) {
				return data;
			}, 'json')
		},
		setPassword: function(obj) {
			return $.get('/setPassword', obj).done(function(data) {
				return data;
			}, 'json')
		}
	}
	var u = new User();

	var cw = document.documentElement.clientWidth;
	var ch = document.documentElement.clientHeight;
	$(".wlh-loginbox").css({
		width: cw,
		height: ch
	});

	$(function() {
		$(".mylogin").validate({
			rules: {
				username: {
					required: true,
					maxlength: 15,
					minlength: 5
				},
				userps: {
					required: true,
					maxlength: 15,
					minlength: 6
				}
			},
			messages: {
				username: {
					required: "请输入账号！"
				},
				userps: {
					required: "请输入密码！"
				}
			}
		})

	})
	if(localStorage.sgqphone){
		$("[name='username']").val(JSON.parse(localStorage.sgqphone).phone);

	}

	var wlh_num = 0;

	$(".wlh-sub").click(function() {

		var us = $("[name='username']").val();
		var up = $("[name='userps']").val();


		$.ajax({
			url: "/checkUser",
			data: "account=" + us + "&password=" + up,
			dataType:"jsonp",
			success: function(sdata) {
				console.log(sdata)
				if(sdata) {
					if(sdata.password=="e10adc3949ba59abbe56e057f20f883e"){
						localStorage.sgqphone=JSON.stringify(sdata);
						// var sgq_reset=plus.webview.create("./reset","sgq_reset");
            location.href="/app";
						sgq_reset.show();
						sgq_reset.onclose=function(){
							$(".wlh-ps>label.error").css("display", "none");
							$('#username').val(JSON.parse(localStorage.sgqphone).phone);
							$("[name='userps']").val("");
						}

					}else{

//							document.cookie = "__uek__=" + sdata.phone;
//							document.cookie = "___uek___=" + sdata.password;



							Cookies.set('__uek__', data.phone, { expires: 100 });
							Cookies.set('___uek___', data.password, { expires: 100 });
              location.href="/app";
							//将uid存储到localStorage.sgqphone中，uid读取方法：JSON.parse(localStorage.sgqphone).uid
							localStorage.sgqphone=JSON.stringify(sdata);
							plus.webview.close("sgq_index");
						 	var sgq_index=plus.webview.create("http://192.167.1.111:3000/app/","sgq_index");
							plus.webview.show(sgq_index)
							plus.webview.close("sgq_login");
					}

				} else {


					$(".wlh-login").addClass("wlh-loginmove");
					var t = setTimeout(function() {
							$(".wlh-login").removeClass("wlh-loginmove");
							clearTimeout(t);
						}, 600)

					if(us === '') {
						$(".wlh-text>label.error").css("display", "block").text("您的账号不能为空！");
					}

					$(".wlh-ps>label.error").css("display", "block").text("您输入的密码有误！");

				}
			}
		})

		return false;
	})

	$(".wlh-zhezhao").click(function() {
		$(this).fadeOut(200);
	})

//	$(".wlh-res").click(function() {
//		if($("[name='username']").val() == "") {
//			$("<label class='error' for='#username'>您的账号为空！</label>").appendTo(".wlh-text");
//			var t = setTimeout(function() {
//				$("label.error").css("display", "none");
//				clearTimeout(t);
//			}, 500)
//
//		} else {
//			$(".wlh-login").fadeOut(200);
//			$(".wlh-reset").addClass("wlh-resetmove");
//			$("#username2").val($("#username").val());
//			$(".myreset").submit(function() {
//					var us2 = $("[name='username2']").val();
//					var up2 = $("[name='userps1']").val();
//
//					$.ajax({
//						url: "/setPassword",
//						dataType: "jsonp",
//						data: "account=" + us2 + "&password=" + up2
//
//					})
//					$(".wlh-reset").removeClass("wlh-resetmove");
//					$(".wlh-zhezhao").fadeIn(200);
//					$(".wlh-resetbox2").fadeIn(200);
//					$(".wlh-zhezhao").delay(800).fadeOut(200);
//					$(".wlh-login").delay(1000).fadeIn(200);
//					$(".mylogin>input").val("");
//					return false;
//				})
//		}
//
//	})


})
//})
