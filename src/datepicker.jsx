var React = require('react');
var Popover = require('./popover');
var DateUtil = require('./util/date');
var Calendar = require('./calendar');
var DateInput = require('./date_input');
var moment = require('moment');

var DatePicker = React.createClass({
  getDefaultProps: function() {
    return {
      weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      locale: 'en',
      dateFormatCallendar: "MMMM YYYY",
      moment: moment
    };
  },

  getInitialState: function() {
    return {
      focus: false
    };
  },

  handleFocus: function(e) {
    this.setState({
      focus: true
    });

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  },

  handleBlur: function(e) {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  },

  hideCalendar: function() {
    setTimeout(function() {
      this.setState({
        focus: false
      });
    }.bind(this), 0);
  },

  handleSelect: function(date) {
    this.setSelected(date);

    setTimeout(function(){
      this.hideCalendar();
    }.bind(this), 200);
  },

  setSelected: function(date) {
    this.props.onChange(date.moment());
  },

  clearSelected: function() {
    this.props.onChange(null);
  },  

  onInputClick: function() {
    this.setState({
      focus: true
    });
  },

  calendar: function() {
    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            weekdays={this.props.weekdays}
            locale={this.props.locale}
            moment={this.props.moment}
            dateFormat={this.props.dateFormatCallendar}
            selected={this.props.value}
            onSelect={this.handleSelect}
            hideCalendar={this.hideCalendar}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            weekStart={this.props.weekStart} />
        </Popover>
      );
    }
  },

  render: function() {

    return (
      <div>
        <DateInput
          {...this.props}
          name={this.props.name}
          date={this.props.value}
          dateFormat={this.props.dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          handleClick={this.onInputClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          clearSelected={this.clearSelected}
          hideCalendar={this.hideCalendar} />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
