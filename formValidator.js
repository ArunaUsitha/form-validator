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
var validator = function validateForm(parameters) {


    let formID = parameters.formID;
    let animate = parameters.animate;
    let cssClass = 'animate shake';

    function shake(formID) {
        if (animate !== undefined) {
            $(formID).addClass(cssClass).delay(1000).queue(function (next) {
                $(this).removeClass(cssClass);
                next();
            });
        }
    }


    var results = {};
    var status = true;

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


    // check and validate
    function checkAndValidate(dataAttributes, element) {


        if (element[0].id !== '') {

            var attributes = dataAttributes.split(',');

            $.each(attributes, function (index, value) {

                //required
                if (value === 'required') {

                    // added support for text area propper validation
                    if (element[0].tagName && element[0].tagName.toLowerCase() == "textarea") {

                        if (/^\s*$/g.test(element.val())) {
                            addStyles(element, 'This field is required!');
                            results[element[0].id] = false;
                        } else {
                            removeStyles(element);
                            results[element[0].id] = true;
                        }

                    } else {
                        if (element.val() == '') {
                            addStyles(element, 'This field is required!');
                            results[element[0].id] = false;
                        } else {
                            removeStyles(element);
                            results[element[0].id] = true;
                        }
                    }

                }


                //length
                if ((/length/).test(value)) {
                    var length = value.split('=')[1];
                    if (!(element.val().length > length)) {
                        addStyles(element, 'This value should be ' + length + ' characters');
                        results[element[0].id] = false;
                    } else {
                        // removeStyles(element);
                        results[element[0].id] = true;
                    }
                }

                //telephone no
                if (value === 'telephone') {

                    var regx = /^[0-9]+$/;
                    if (element.val().length > 0) {
                        if (element.val().length < 10 || element.val().length > 10 || !(element.val().match(regx))) {
                            addStyles(element, 'Enter a valid phone No (10 characters excluding +94)');
                            results[element[0].id] = false;
                        } else {
                            removeStyles(element);
                            results[element[0].id] = true;
                        }
                    } else {
                        // removeStyles(element);
                        // results[element[0].id] = true;
                    }
                }

                //email
                if (value === 'email') {

                    if (element.val().length > 0) {
                        var emil = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!(element.val().match(emil))) {
                            addStyles(element, 'Enter valid Email Address');
                            results[element[0].id] = false;
                        } else {
                            removeStyles(element);
                            results[element[0].id] = true;
                        }
                    } else {
                        // removeStyles(element);
                        // results[element[0].id] = true;
                    }
                }


                //password
                if (value === 'password') {

                    if (element.val() !== '') {
                        var conf = $(element).parent().parent().parent().find('[data-validate*="passwordconfirm"]');
                        if (!(element.val() === conf.val())) {
                            addStyles(element, 'Passwords doesn\'t match');
                            addStyles(conf, 'Passwords doesn\'t match');
                            results[element[0].id] = false;
                        } else {
                            removeStyles(element);
                            removeStyles(conf);
                            results[element[0].id] = true;
                        }
                    }

                }

                //number
                if (value === 'number') {


                    if (element.val() !== '') {
                        var num = /^\d*$/;

                        if (!(element.val().match(num))) {
                            addStyles(element, 'Please enter only numbers');
                            results[element[0].id] = false;
                        } else {
                            removeStyles(element);
                            results[element[0].id] = true;
                        }
                    }

                }

            });

        } else {
            throw "Critical error, Elements ID not defined in : " + element.attr('name') + ". validation falied.!";
            status = false
        }

    }

    var clss = '.validate';

    var inputs = $(formID + ' ' + clss);

    if (inputs.length > 0) {

        // noinspection JSAnnotator
        $.each(inputs, function (index, value) {

            var selector = $(this);
            try {
                checkAndValidate($(this).data('validate'), selector);
            } catch (e) {
                console.error(e)
                return false;
            }

        })
    }


    $.each(results, function (index, value) {

        console.log(value)


        if (value == false) {
            status = false;
            shake(formID);
            return false
        }
    });


    return status;


};


