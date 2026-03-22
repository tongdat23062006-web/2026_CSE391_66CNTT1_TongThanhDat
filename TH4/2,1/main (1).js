$().ready(function() {
	 $.validator.addMethod("validatePassword", function (value, element) {
	 	return this.optional(element) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/i.test(value);
	 }, "Hãy nhập password từ 8 đến 16 ký tự bao gồm chữ hoa, chữ thường và ít nhất một chữ số");
     $.validator.addMethod("validateEmail", function(value, element) {
        return this.optional(element) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value);
     }, "Hãy nhập email với đúng định dạng name@domain.com");
     $.validator.addMethod("validateName", function(value, element) {
        return this.optional(element) || /^[a-zA-ZÀ-ỹ\s]+$/i.test(value);
     }, "Chỉ nhập chữ cái");
     $.validator.addMethod("validatePhone", function(value, element) {
        return this.optional(element) || /^0[0-9]{9}$/i.test(value);
     }, "Chỉ nhập số bắt đầu bằng số 0");
	$("#sign-in").validate({
		onfocusout: false,
		onkeyup: function(element){
            $(element).next("label.error").hide();
        },
		onclick: false,
		rules: {
            "nameInput": {
                required: true,
                validateName: true,
                minlength: 3
            },
			"emailInput": {
				required: true,
				validateEmail :true,
			},
            "phoneInput": {
                required: true,
                validatePhone: true,
                minlength: 10
            },
			"pwInput": {
				required: true,
				validatePassword: true,
				minlength: 8
			},
			"repwInput": {
				equalTo: "#pwInput",
				minlength: 8
			},
            "policyInput": {
                required: true
            },
            "genderInput": {
                required: true
            }
		},
		messages: {
            "nameInput": {
                required: "Bắt buộc nhập họ tên",
                minlength: "Hãy nhập tối thiểu 3 ký tự"
            },
			"emailInput": {
				required: "Bắt buộc nhập email",
			},
            "phoneInput": {
                required: "Bắt buộc nhập số điện thoại",
                maxlength: "Hãy nhập đúng 10 ký tự"
            },
			"pwInput": {
				required: "Bắt buộc nhập password",
				minlength: "Hãy nhập ít nhất 8 ký tự"
			},
			"repwInput": {
				equalTo: "Hai password phải giống nhau",
				minlength: "Hãy nhập ít nhất 8 ký tự"
			},
            "policyInput": {
                required: "Vui lòng đánh dấu vào ô này"
            },
            "genderInput": {
                required: "Bắt buộc phải điền một trong hai mục này"
            }
		},
        submitHandler: function(form){
            Swal.fire({
                title: "Đăng ký thành công",
                icon: "success"
            });
            form.reset();
        }
	});
});