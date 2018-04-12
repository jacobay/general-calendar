import moment from 'moment';
import assign from 'object-assign';
import { toDouble } from './tool';

class SingleMonth {
  static defaultOptions = {
    startDate: '',
    endDate: '',
  }
  constructor(options) {
    this.options = assign({}, SingleMonth.defaultOptions, options);

    this.init();
  }

  init() {
    // 开始、结束日期
    let oStartDate = moment(this.options.startDate);
    let oEndDate = moment(this.options.endDate);

    // 本月第一天、本月最后一天
    let oFirstDate = oStartDate.clone().startOf('month');
    let oLastDate = oStartDate.clone().endOf('month');

    // 本周第一天、本周最后一天
    let oFirstWeekDate = oFirstDate.clone().startOf('week');
    let oLastWeekDate = oLastDate.clone().endOf('week');

    // 上月的最后一天、下月的第一天
    let oPrevMonthLastDate = oFirstWeekDate.clone().endOf('month');
    let oNextMonthFirstDate = oLastWeekDate.clone().startOf('month');

    // 本月第一天 和 本周第一天 是同一天 不存在上个月
    if (!oFirstDate.isSame(oFirstWeekDate)) {
      this.existPrevMonthDays = true;
    }

    // 本月第一天 和 开始日期 是同一天 不存在当月开始disable
    if (!oFirstDate.isSame(oStartDate)) {
      this.existStartDisableDays = true;
    }

    // 本月最后一天 和 结束日期 是同一天 不存在当月结束disable
    if (!oLastDate.isSame(oEndDate)) {
      this.existEndDisableDays = true;
    }

    // 本月最后一天 和 本周最后一天 是同一天 不存在下个月
    if (!oLastDate.isSame(oLastWeekDate)) {
      this.existNextMonthDays = true;
    }

    // 12 18
    this.startDate = oStartDate.date();
    this.endDate = oEndDate.date();

    // 当月第一天 最后一天
    this.firstDate = oFirstDate.date();
    this.lastDate = oLastDate.date();

    // 本周第一天 上月最后一天 本周最后一天
    this.prevMonthFirstDate = oFirstWeekDate.date();
    this.prevMonthLastDate = oPrevMonthLastDate.date();
    this.nextMonthLastDate = oLastWeekDate.date();

    this.YYYY = oStartDate.format('YYYY');          // 年 2018
    this.MM = oStartDate.format('MM');              // 月 04
    this.prevMM = oFirstWeekDate.format('MM');      // 本周第一天月份 04
    this.nextMM = oLastWeekDate.format('MM');       // 本周最后一天月份 05
    this.todayDate = moment().format('YYYY-MM-DD'); // 当前时间 2018-04-02

    /**
     * 遍历组装数据
     */
    this.getDateCell = function (
      existPrevMonthDays,
      existStartDisableDays,
      existEndDisableDays,
      existNextMonthDays,
      startDate,
      endDate,
      cells,
      isCurrent) {

      let weekTitle = '日一二三四五六'.split('');
      let weekIndex = 0;
      let i = 0;

      for (i = startDate; i <= endDate; i++) {
        let day = toDouble(i);
        let date = this.YYYY + '-' + this.prevMM + '-' + day;
        let week = weekTitle[weekIndex];
        let item = {
          date: date,
          weekday: weekIndex,
          week: week,
          year: this.YYYY,
          month: this.prevMM,
          day: day,
          enabled: isCurrent,
        };
        if (isCurrent && date === this.todayDate) {
          this.existToday = true;
          item.isToday = true;
        }
        if (existPrevMonthDays && !isCurrent) {
          item.isPrevMonth = true;
          item.disabled = true;
        }
        if (existStartDisableDays && !isCurrent) {
          item.disabled = true;
        }

        if (existEndDisableDays && !isCurrent) {
          item.disabled = true;
        }
        if (existNextMonthDays && !isCurrent) {
          item.isNextMonth = true;
          item.disabled = true;
        }

        cells.push(item);

        weekIndex++;

        if (weekIndex === 7) weekIndex = 0;
      }
    }
  }


  // 获取所有日期数据
  getTotalDateCell() {
    let cells = [];
    // prev month disabled days
    if (this.existPrevMonthDays) {

      // 本周第一天 到 上月最后一天
      this.getDateCell(
        this.existPrevMonthDays,
        this.existStartDisableDays,
        this.existEndDisableDays,
        this.existNextMonthDays,
        this.prevMonthFirstDate,
        this.prevMonthLastDate,
        cells)
    }

    // current month disabled days `start`
    if (this.existStartDisableDays) {

      // 选择的日期区间之前的disabled日期
      this.getDateCell(
        this.existPrevMonthDays,
        this.existStartDisableDays,
        this.existEndDisableDays,
        this.existNextMonthDays,
        1,
        this.startDate - 1,
        cells)
    }

    // current month enabled days
    // 选择的日期区间
    this.isCurrent = true;
    this.getDateCell(
      this.existPrevMonthDays,
      this.existStartDisableDays,
      this.existEndDisableDays,
      this.existNextMonthDays,
      this.startDate,
      this.endDate,
      cells,
      this.isCurrent)

    // current month disabled days `end`
    // 选择的日期区间之后的disabled日期
    if (this.existEndDisableDays) {

      this.getDateCell(
        this.existPrevMonthDays,
        this.existStartDisableDays,
        this.existEndDisableDays,
        this.existNextMonthDays,
        this.endDate + 1,
        this.lastDate,
        cells)
    }

    // next month disabled days
    // 下月disabled日期
    if (this.existNextMonthDays) {

      this.getDateCell(
        this.existPrevMonthDays,
        this.existStartDisableDays,
        this.existEndDisableDays,
        this.existNextMonthDays,
        1,
        this.nextMonthLastDate,
        cells)
    }

    return cells;
  }
}

module.exports = SingleMonth;