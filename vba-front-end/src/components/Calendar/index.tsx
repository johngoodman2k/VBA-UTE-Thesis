import React, { useState, useEffect } from "react";
import styles from "./calendar.module.scss";
import classNames from "classnames/bind";
import moment from "moment";
import {
  setup,
  dayStyle,
  weekStyle,
  dayOfWeekStyle,
  daySelectedStyle,
  formatMonthAndYear,
} from "./setup";

import { ReactComponent as NavigateBeforeIcon } from "../../assets/svg/navigateBefore.svg";
import { ReactComponent as NavigateNextIcon } from "../../assets/svg/navigateBefore.svg";

type CalendarProps = {
  data: Date;
  action?: (payload: Object) => void;
};

const cx = classNames.bind(styles);

const weekDay = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const Calendar = ({ data, action }: CalendarProps) => {
  const [calendar, setCalendar] = useState<any>([]);
  const [value, setValue] = useState(moment(data));
  const [valueSave, setValueSave] = useState(moment(data));
  const [buttonRadio, setButtonRadio] = useState<string>("theongay");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setButtonRadio(event.target.value);
  };
  const handleChangeNextMonth = () => {
    setValue(value.clone().add(1, "month"));
  };
  const handleChangePrevMonth = () => {
    setValue(value.clone().subtract(1, "month"));
  };

  const handleDayClick = (day: any) => {
    const dateValue = {
      year: day.year(),
      month: day.month(),
      date: day.date(),
    };
    setValue(day);
    setValueSave(day);
  };
  useEffect(() => {
    setCalendar(setup(value));
  }, [value]);

  return (
    <>
      <div className={cx("Calendar")}>
        <div className={cx("Calendar__wrap__month")}>
          <NavigateBeforeIcon
            className="w-[20px] h-[20px]"
            onClick={handleChangePrevMonth}
          />
          <div className={cx("Calendar__month")}>
            {formatMonthAndYear(value)}
          </div>
          <NavigateNextIcon
            className="w-[20px] h-[20px]"
            onClick={handleChangeNextMonth}
          />
        </div>
        {/* <RadioGroup
          row
          aria-labelledby="LocVeModal-group"
          name="row-radio-buttons-group"
          className="Calendar-wrap-radioButton"
          value={buttonRadio}
          onChange={handleChange}
          sx={{ width: "100%" }}
        >
          <FormControlLabel
            value="theongay"
            control={<StyleRadio />}
            label="Theo ngày"
          />
          <FormControlLabel
            value="theotuan"
            control={<StyleRadio />}
            label="Theo tuần"
          />
        </RadioGroup> */}
        <div className="Calendar__wrap__radioButton">
          <div>
            <input
              type="radio"
              name="calendar"
              value="theongay"
              onChange={handleChange}
            />
            <label htmlFor="calendar">Theo ngày</label>
          </div>
          <div>
            <input
              type="radio"
              name="calendar"
              value="theotuan"
              onChange={handleChange}
            />
            <label htmlFor="calendar">Theo tuần</label>
          </div>
        </div>

        <div className={cx("Calendar__wrap")}>
          <div className={cx("Calendar__header")}>
            {weekDay.map((day: any, index: number) => (
              <div
                key={index.toString()}
                className={cx("Calendar__header__item")}
              >
                {day}
              </div>
            ))}
          </div>

          {calendar.map((week: any, index: number) => (
            <div
              key={index.toString()}
              className={cx(
                "Calendar__week",
                `Calendar__week__${weekStyle(valueSave, week, buttonRadio)}`
              )}
            >
              {week.map((day: any, index: number) => (
                <div key={index.toString()} onClick={() => handleDayClick(day)}>
                  <div
                    className={cx(
                      "Calendar__day",
                      `Calendar__day__${dayStyle(value, day)}`,
                      `Calendar__day__${daySelectedStyle(
                        valueSave,
                        day,
                        buttonRadio
                      )}`,
                      `Calendar__week__${dayOfWeekStyle(
                        valueSave,
                        day,
                        buttonRadio
                      )} `
                    )}
                  >
                    {day.format("D").toString()}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
