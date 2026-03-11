const sortChronological = (a, b) => Number(a.week) - Number(b.week) || Number(a.day) - Number(b.day);

export function getCurrentLecture({ days = [], progressState = {}, lecturesByDayId = {} } = {}) {
  const completedSet = new Set(progressState.completedDays || []);
  const blockedSet = new Set(progressState.blockedDays || []);

  const lectureDays = [...days]
    .filter((day) => {
      const lecture = lecturesByDayId?.[day.id] || lecturesByDayId?.[day.dayId];
      return day.session_type !== 'Rest' || Boolean(lecture);
    })
    .sort(sortChronological);

  if (lectureDays.length === 0) {
    return {
      currentDayId: null,
      currentWeekNumber: null,
      currentDayNumber: null,
      isBlocked: false,
      isComplete: false,
      isCourseComplete: false,
      lecture: null,
      currentDay: null,
      previousDayId: null,
      nextDayId: null
    };
  }

  const firstUnfinishedIndex = lectureDays.findIndex((day) => !completedSet.has(day.id));
  const currentIndex = firstUnfinishedIndex === -1 ? lectureDays.length - 1 : firstUnfinishedIndex;
  const currentDay = lectureDays[currentIndex];
  const lecture = lecturesByDayId?.[currentDay.id] || lecturesByDayId?.[currentDay.dayId] || null;

  return {
    currentDayId: currentDay.id,
    currentWeekNumber: Number(currentDay.week),
    currentDayNumber: Number(currentDay.day),
    isBlocked: blockedSet.has(currentDay.id),
    isComplete: completedSet.has(currentDay.id),
    isCourseComplete: firstUnfinishedIndex === -1,
    lecture,
    currentDay,
    previousDayId: lectureDays[currentIndex - 1]?.id || null,
    nextDayId: lectureDays[currentIndex + 1]?.id || null
  };
}
