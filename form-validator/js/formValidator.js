/**
 * @Author :Aruna|Killer
 * used to validate html input elements on the fly
 * of a form
 *
 * required Jquery library 2.00 or higher
 *
 * usage :
 *  inputs should be in a form group, the bootstrap way. as example
 *   <form id="form-to-validate">
 *  <div class="custom-form-user">
 *  <div class="form-group">
 *  <label for="testInput" class="col-sm-2 control-label">test input</label>
 *  <div class="col-sm-8">
 *  <input type="text" class="form-control validate"  name="testInput" id="testInput" placeholder="testInput" data-validate="required">
 *  <span class="verror"></span>
 *  </div>
 *  </div>
 *  </div>
 *  </form>
 *
 *  for the input field that you want to validate add the class 'validate'
 *   then add the types you want to validate Ex: password,required,length as comma seperated data attributes
 *
 *   data-validate = 'required,length=10,password'
 *
 *  then call the method using the form id
 *
 *  validateForm('#form-to-validate');
 *
 *  and the script shoud be included on the bottom of the page
 *
 *
 *
 */
var validator = function validateForm(formID) {


    function addStyles(selector, response) {
        selector.parent().find('.verror').html(response).css({
            'font-size': '11px',
            // 'color': '#D81159'
        });
        selector.parent().parent().addClass('has-error');
    }

    function removeStyles(selector) {
        selector.parent().find('.verror').html('').css({
            'font-size': '11px',
            // 'color': '#D81159'
        });
        selector.parent().parent().removeClass('has-error');
    }

    var requiredState = true;
    var lengthState = true;
    var telephoneState = true;
    var emailState = true;
    var passwordState = true;

    // check and validate
    function checkAndValidate(dataAttributes, element) {


        var attributes = dataAttributes.split(',');

        $.each(attributes, function (index, value) {



            //required
            if (value === 'required') {

                if (element.val() === '') {
                    addStyles(element, 'This field is required!')
                    requiredState = false;

                } else {
                    removeStyles(element)
                    requiredState = true;
                }
                // return false;

            }


            //length
            if ((/length/).test(value)) {
                var length = value.split('=')[1];
                if (!(element.val().length > length)) {
                    addStyles(element, 'This value should be ' + length + ' characters');
                    lengthState = false;
                } else {
                    removeStyles(element);
                    lengthState = true;
                }
            }

            //telephone no
            if (value === 'telephone') {
                var regx = /^[0-9]+$/;
                if (element.val().length < 10 || element.val().length > 10 || !(element.val().match(regx))) {
                    addStyles(element, 'Enter a valid phone No (10 characters excluding +94)');
                    telephoneState = false;
                } else {
                    removeStyles(element);
                    telephoneState = true;
                }
            }

            //email
            if (value === 'email') {
                var emil = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!(element.val().match(emil))) {
                    addStyles(element, 'Enter valid Email Address');
                    emailState = false;

                } else {
                    removeStyles(element);
                    emailState = true;
                }
            }


            //password
            if (value === 'password') {
                if (element.val() !== '') {

                    var conf = $(element).parent().parent().parent().find('[data-validate*="passwordconfirm"]');
                    if (!(element.val() === conf.val())) {
                        addStyles(element, 'Passwords doesn\'t match');
                        addStyles(conf, 'Passwords doesn\'t match');
                        passwordState = false;
                    } else {
                        removeStyles(element);
                        removeStyles(conf);
                        passwordState = true;
                    }
                }
            }

        });


        return requiredState === true && lengthState === true && telephoneState === true && emailState === true && passwordState === true;
    }


    var clss = '.validate';
    // data attribute that used for the validation 'data-validate';


    var inputs = $(formID + ' ' + clss);
    var status = true;
    if (inputs.length > 1) {
        status = false;
        $.each(inputs, function (index, value) {
            var selector = $(this);
            status = checkAndValidate($(this).data('validate'), selector);
        })
    }

    return status;
}


