export const dateCompare = (ev1, ev2) => {
  let {startDate, startTime} = ev1;
  let ev1Time = Date.parse(`${startDate} ${startTime}`);
  let {startDate2, startTime2} = ev2;
  let ev2Time = Date.parse(`${startDate} ${startTime}`);
  let diff = ev1Time - ev2Time;
  return diff;
};
