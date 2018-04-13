import moment from 'moment';
import assign from 'object-assign';
import { toDouble } from './tool';
import SingleMonth from './SingleMonth';

class GeneralCalendar {
  static defaultOptions = {
    startDate: '',
    endDate: '',
    format: 'YYYY-MM-DD'
  }
  constructor(options) {
    this.options = Object.assign({}, GeneralCalendar.defaultOptions, options);
  }

  // 无效对象
  isInvalidDate(){
    let startDate = this.options.startDate;
    let endDate = this.options.endDate;

    let valid = (date) => {
      
      date = date.split(/\D/);

      // ["2018", "04", "12"]
      return date.length === 3;
    }

    return valid(startDate)
      && valid(endDate)
      && moment(startDate).isValid()
      && moment(endDate).isValid()
  }
  getTotal() {
    let startDate = this.options.startDate;
    let endDate = this.options.endDate;
    let format = this.options.format;

    let oStartDate = moment(startDate);
    let oEndDate = moment(endDate);

    let monthData = [];
    let startEdgeDateOfStartDate = oStartDate.clone().startOf('month').format(format);
    let startEdgeDateOfEndDate = oEndDate.clone().startOf('month').format(format);

    let oMonth;

    // 1个月
    if (startEdgeDateOfStartDate === startEdgeDateOfEndDate) {
      oMonth = new SingleMonth({
        startDate: startDate,
        endDate: endDate
      });
      monthData.push({
        title: moment(startDate).format('YYYY-MM'),
        dates: oMonth.getTotalDateCell()
      });

      if (oMonth.existToday) {
        this.todayDate = {};
        this.todayDate.date = oMonth.todayDate;
        this.todayDate.monthIndex = monthData.length - 1;
      }
    } else {
      let _startDate = startDate;
      // 开始时间当月最后一天
      let _endDate = moment(startDate).endOf('month').format(format);

      // 下月第一天 结束时间当月第一天 不相等就创建一个日历对象
      while (_startDate !== startEdgeDateOfEndDate) {
        console.warn(_startDate)
        console.warn(startEdgeDateOfEndDate)
        oMonth = new SingleMonth({
          startDate: _startDate,
          endDate: _endDate
        });

        monthData.push({
          title: moment(_startDate).format('YYYY-MM'),
          dates: oMonth.getTotalDateCell()
        });

        if (oMonth.existToday) {
          this.todayDate = {};
          this.todayDate.date = oMonth.todayDate;
          this.todayDate.monthIndex = monthData.length - 1;
        }
        console.log(_endDate)
        let nextMonth = moment(_endDate).subtract(-1, "days");
        console.log(nextMonth)

        _startDate = nextMonth.startOf('month').format(format);
        _endDate = nextMonth.endOf('month').format(format);
        console.log(_startDate)
        console.log(_endDate)
      }

      oMonth = new SingleMonth({
        startDate: startEdgeDateOfEndDate,
        endDate: endDate
      });

      monthData.push({
        title: moment(startEdgeDateOfEndDate).format('YYYY-MM'),
        dates: oMonth.getTotalDateCell()
      });

      if (oMonth.existToday) {
        this.todayDate = {};
        this.todayDate.date = oMonth.todayDate;
        this.todayDate.monthIndex = monthData.length - 1;
      }
    }

    return monthData;
  }
  getToday(){
    return this.todayDate;
  }
};

module.exports = GeneralCalendar;