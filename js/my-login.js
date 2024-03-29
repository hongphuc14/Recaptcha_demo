/******************************************
 * My Login
 *
 * Bootstrap 4 Login Page
 *
 * @author          Muhamad Nauval Azhar
 * @uri 			https://nauval.in
 * @copyright       Copyright (c) 2018 Muhamad Nauval Azhar
 * @license         My Login is licensed under the MIT license.
 * @github          https://github.com/nauvalazhar/my-login
 * @version         1.2.0
 *
 * Help me to keep this project alive
 * https://www.buymeacoffee.com/mhdnauvalazhar
 * 
 ******************************************/

'use strict';

$(function() {
	// Gọi reCAPTCHA ngay sau khi trang được tải
	grecaptcha.ready(function() {
		executeRecaptcha();
	});
	
	// Thêm hàm gọi reCAPTCHA
	function executeRecaptcha() {
		grecaptcha.execute('6Lf8tzEpAAAAAN6TF5OBKPQ9yA41tB5G2W9sAoyX', { action: 'login' })
		  .then(function(token) {
			// Token này cần được gửi cùng với yêu cầu đăng nhập đến máy chủ của bạn
			// Xử lý đăng nhập và kiểm tra token tại máy chủ
			// Thêm mã xử lý đăng nhập của bạn ở đây
			console.log("reCAPTCHA token:", token);
		  });
	}

	// var author = '<div style="position: fixed;bottom: 0;right: 20px;background-color: #fff;box-shadow: 0 4px 8px rgba(0,0,0,.05);border-radius: 3px 3px 0 0;font-size: 12px;padding: 5px 10px;">By <a href="https://twitter.com/mhdnauvalazhar">@mhdnauvalazhar</a> &nbsp;&bull;&nbsp; <a href="https://www.buymeacoffee.com/mhdnauvalazhar">Buy me a Coffee</a></div>';
	// $("body").append(author);

	$("input[type='password'][data-eye]").each(function(i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-'+i,
		}).css({
				position: 'absolute',
				right: 10,
				top: ($this.outerHeight() / 2) - 12,
				padding: '2px 7px',
				fontSize: 12,
				cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if(invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function() {
			$("#passeye-"+i).val($(this).val());
		});
		$("#passeye-toggle-"+i).on("click", function() {
			if($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			}else{
				$this.attr('type', 'text');
				$this.val($("#passeye-"+i).val());				
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function(event) {
		var form = $(this);
        if (form[0].checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
		// Lấy giá trị của token reCAPTCHA từ trình duyệt
		var recaptchaToken = grecaptcha.getResponse();

		// Thêm mã xử lý đăng nhập của bạn tại đây, bao gồm cả token reCAPTCHA
		// Gửi dữ liệu đăng nhập và token đến máy chủ để xác thực
		// Xử lý kết quả trả về từ máy chủ
		console.log("Form submitted with reCAPTCHA token:", recaptchaToken);
		form.addClass('was-validated');
	});
});
