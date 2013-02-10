var Tour = function Tour(settings) {
   var _this = this;
   this._settings = $.extend({
      name: "Crimson Tour",
      labels: {
           next: "Next &raquo;",
           prev: "&laquo; Back",
           end: "Stop Tour"
       },
       dialogwidth: 200,
       keyboard: true,
       colorscheme: 'black'
   }, settings);

    this._steps = [];
    this._currentStep = 0;
    Tour.prototype.newStep = function(step) {
        return this._steps.push(step);
    }

    Tour.prototype.prev = function() {
        var _this = this;
        _this._currentStep--;
        if(_this._currentStep < 0) {
            _this._currentStep = 0;
        }
        _this.showStep(_this._steps[_this._currentStep]);
    }

    Tour.prototype.end = function() {
        $("#crimson-tour").addClass('hidden');
    }

    Tour.prototype.showNextStep = function() {
        var _this = this;
        _this._currentStep++;
        if(_this._currentStep >= _this._steps.length) {
            _this._currentStep = _this._steps.length - 1;
        }
        return _this.showStep(_this._steps[_this._currentStep]);
    }

    Tour.prototype.start = function() {
        var _this = this;
        //Create the tour box if it doesn't exist
        if(!$("#crimson-tour").length) { $('body').append('<div id="crimson-tour" class="hidden"></div>');}

        $(document).on('click', '.crimson-tour', function(e) {
            e.preventDefault;
            return _this.showStep(_this._steps[0]);
        });
        $(document).on('click', '#crimson-next', function(e) {
            e.preventDefault();
            return _this.showNextStep();
        });
        $(document).on('click', '#crimson-prev', function(e) {
            e.preventDefault();
            return _this.prev();
        });
        $(document).on('click', '#crimson-end', function(e) {
            e.preventDefault;
            return _this.end();
        });
        $(document).keydown( function(e) {
            switch(e.keyCode) {
                case 39:
                    return _this.showNextStep();
                    break;
                case 37:
                    return _this.prev();
                    break;
            }
        });
        //Start at beginning of tour if none of the above satisified
        //TODO: set and pull values from a cookie
        return _this.showStep(_this._steps[_this._currentStep]);
    }

    Tour.prototype.showStep = function (step) {
        var _this = step;
        options = $.extend({}, this._settings);

        //TODO: Move this to a function
        //TODO: allow + and - modifiers to be dynamic on step creation
        switch(_this.position) {
            case "s":
                _this.graphic = 'north-pointer';
                _this.x_loc = $(_this.placement).offset().left + ($(_this.placement).width() / 2) - (options.dialogwidth / 2);
                _this.y_loc = $(_this.placement).offset().top + $(_this.placement).height() + 20;
                break;
            case "se":
                _this.graphic = 'west-pointer';
                _this.x_loc = $(_this.placement).offset().left + $(_this.placement).width() + 20;
                _this.y_loc = $(_this.placement).offset().top + ($(_this.placement).height()) - 50;
                break;
            case "e":
                _this.graphic = 'west-pointer';
                _this.x_loc = $(_this.placement).offset().left + $(_this.placement).width() + 26;
                _this.y_loc = $(_this.placement).offset().top + ($(_this.placement).height() / 2) - 26; //26 is height of pointer
                break;
            case "ne":
                _this.graphic = 'west-pointer';
                _this.x_loc = $(_this.placement).offset().left + $(_this.placement).width() + 20;
                _this.y_loc = $(_this.placement).offset().top + ($(_this.placement).height() / 2) - 90;
                break;
            case "n":
                _this.graphic = 'south-pointer';
                _this.x_loc = $(_this.placement).offset().left + ($(_this.placement).width() / 2);
                _this.y_loc = $(_this.placement).offset().top - 110;
                break;
            case "nw":
                _this.graphic = 'east-pointer';
                _this.x_loc = $(_this.placement).offset().left - 205; //TODO: Move this over by the width of tour div
                _this.y_loc = $(_this.placement).offset().top;
                break;
            case "w":
                _this.graphic = 'east-pointer';
                _this.x_loc = $(_this.placement).offset().left - (options.dialogwidth);
                _this.y_loc = $(_this.placement).offset().top + ($(_this.placement).height() / 2) - 26; //26 is height of pointer
                break;
            case "sw":
                _this.graphic = 'east-pointer';
                _this.x_loc = $(_this.placement).offset().left - 205;
                _this.y_loc = $(_this.placement).offset().top + ($(_this.placement).height() / 2) + 80;
                break;
        }
        options = $.extend({}, this._settings);
        //Build The Dialog Box
        //TODO: make location of pointer graphics dynamic based on width of tour dialog
        var html = '<div class="'+ options.colorscheme + '-' +  _this.graphic + '">&nbsp</div>' +
            '<div class="crimson-title">' + _this.title + '</div>'+
            '<div class="crimson-content">' +  _this.content + '</div>'+
            '<div class="crimson-nav">';
        if(this._currentStep > 0) {
            html += '<div id="crimson-prev"> ' + options.labels.prev + '</div>';
        }
        if(this._steps[this._currentStep + 1] != undefined) {
            html += '<div id="crimson-next"> ' + options.labels.next + '</div>';
        }
        html += '<div id="crimson-end"> ' + options.labels.end + '</div>';
            '</div>';
        //Prevent out of bounds
        //TODO: Move to function
        if(_this.y_loc < 0) {
            _this.y_loc = 0;
            var hide_pointer = true;
        }
        if(_this.x_loc < 0) {
            _this.x_loc = 0;
            var hide_pointer = true;
        }
        $("#crimson-tour").removeClass('hidden').addClass('crimson-dialog').html(html).css('position', 'absolute').css('top', _this.y_loc).css('left', _this.x_loc);
        if(hide_pointer) {
            $('.'+ options.colorscheme + '-' +  _this.graphic).hide();
        }
    }
}
