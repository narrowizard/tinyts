class DatetimePicker extends TextBox {
    picker: any;

    DatePicker(config?: any) {
        this.picker = this.target.datetimepicker(config);
    }
}